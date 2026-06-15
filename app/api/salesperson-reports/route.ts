import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || "";

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

function getAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase service configuration");
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function cleanText(value: unknown) {
  return String(value ?? "").trim();
}

function cleanKey(value: unknown) {
  return cleanText(value).toLowerCase();
}

function cleanMonth(value: unknown) {
  const text = cleanText(value);
  return /^\d{4}-\d{2}$/.test(text) ? text : new Date().toISOString().slice(0, 7);
}

function numberFrom(value: unknown) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? number : 0;
}

function monthlyTableFee(tableCount: unknown, explicitFee?: unknown) {
  const explicit = Number(explicitFee || 0);
  if (Number.isFinite(explicit) && explicit > 0) return Math.round(explicit * 1000) / 1000;

  const tables = Number(tableCount || 25);
  return Math.max(25, Math.min(999, Number.isFinite(tables) ? Math.floor(tables) : 25));
}

function dateTime(value: unknown) {
  const text = cleanText(value);
  if (!text) return null;
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

function inRange(date: Date | null, start: Date, end: Date) {
  if (!date) return false;
  return date >= start && date < end;
}

function monthRange(month: string) {
  const [yearRaw, monthRaw] = month.split("-");
  const year = Number(yearRaw);
  const monthIndex = Number(monthRaw) - 1;
  const start = new Date(Date.UTC(year, monthIndex, 1, 0, 0, 0));
  const end = new Date(Date.UTC(year, monthIndex + 1, 1, 0, 0, 0));
  const yearStart = new Date(Date.UTC(year, 0, 1, 0, 0, 0));

  return { start, end, yearStart };
}

function paymentDate(payment: Record<string, unknown>) {
  return (
    dateTime(payment.paid_at) ||
    dateTime(payment.approved_at) ||
    dateTime(payment.verified_at) ||
    dateTime(payment.updated_at) ||
    dateTime(payment.created_at)
  );
}

function isCollectedPayment(payment: Record<string, unknown>) {
  const status = cleanKey(payment.status);
  return ["paid", "approved", "verified", "collected", "completed"].includes(status);
}

function businessName(business: Record<string, unknown>) {
  return (
    cleanText(business.restaurant_name) ||
    cleanText(business.business_name) ||
    cleanText(business.display_name) ||
    cleanText(business.username) ||
    "Restaurant"
  );
}

function branchName(business: Record<string, unknown>) {
  return cleanText(business.branch_name || business.branch || business.location_name);
}

export async function GET(request: NextRequest) {
  try {
    const admin = getAdminClient();
    const month = cleanMonth(request.nextUrl.searchParams.get("month"));
    const username = cleanKey(request.nextUrl.searchParams.get("username"));
    const commissionRate = Math.max(0, Math.min(100, numberFrom(request.nextUrl.searchParams.get("commissionRate") || 33)));

    if (!username) {
      return json({ ok: false, error: "Salesperson username is required" }, 400);
    }

    const { start, end, yearStart } = monthRange(month);

    const [salespersonResult, businessResult, paymentsResult] = await Promise.all([
      admin.from("platform_salespeople").select("*").eq("username", username).maybeSingle(),
      admin.from("business_accounts").select("*").eq("salesperson_username", username).order("created_at", { ascending: false }),
      admin.from("cliq_payment_requests").select("*").order("created_at", { ascending: false }),
    ]);

    if (salespersonResult.error && salespersonResult.error.code !== "PGRST116" && salespersonResult.error.code !== "42P01") {
      throw new Error(salespersonResult.error.message);
    }

    if (businessResult.error) throw new Error(businessResult.error.message);
    if (paymentsResult.error) throw new Error(paymentsResult.error.message);

    const salesperson = (salespersonResult.data || {}) as Record<string, unknown>;
    const rawBusinesses = ((businessResult.data || []) as unknown as Record<string, unknown>[]).filter((business) => cleanKey(business.salesperson_username) === username);

    const businesses = rawBusinesses.map((business) => {
      const monthlyFee = monthlyTableFee(business.table_count, business.service_monthly_fee_jod);
      return {
        ...business,
        service_monthly_fee_jod: monthlyFee,
        service_balance_due_jod: Math.max(numberFrom(business.service_balance_due_jod), 0),
      } as Record<string, unknown>;
    });

    const businessIds = new Set(businesses.map((business) => cleanText(business.id)).filter(Boolean));
    const allCollectedPayments = ((paymentsResult.data || []) as unknown as Record<string, unknown>[]).filter((payment) => {
      return isCollectedPayment(payment) && businessIds.has(cleanText(payment.business_account_id));
    });

    const monthlyPayments = allCollectedPayments.filter((payment) => inRange(paymentDate(payment), start, end));
    const ytdPayments = allCollectedPayments.filter((payment) => inRange(paymentDate(payment), yearStart, end));
    const newAccountsMonth = businesses.filter((business) => inRange(dateTime(business.created_at), start, end));
    const newAccountsYtd = businesses.filter((business) => inRange(dateTime(business.created_at), yearStart, end));

    const monthlyCollectedJod = monthlyPayments.reduce((sum, payment) => sum + numberFrom(payment.amount_jod), 0);
    const ytdCollectedJod = ytdPayments.reduce((sum, payment) => sum + numberFrom(payment.amount_jod), 0);
    const portfolioMonthlyRecurringJod = businesses.reduce((sum, business) => sum + numberFrom(business.service_monthly_fee_jod), 0);
    const monthlyRecurringAddedJod = newAccountsMonth.reduce((sum, business) => sum + numberFrom(business.service_monthly_fee_jod), 0);
    const ytdMonthlyRecurringAddedJod = newAccountsYtd.reduce((sum, business) => sum + numberFrom(business.service_monthly_fee_jod), 0);
    const totalBalanceDueJod = businesses.reduce((sum, business) => sum + numberFrom(business.service_balance_due_jod), 0);

    const paymentsByBusiness = new Map<string, Record<string, unknown>[]>();
    for (const payment of allCollectedPayments) {
      const businessId = cleanText(payment.business_account_id);
      paymentsByBusiness.set(businessId, [...(paymentsByBusiness.get(businessId) || []), payment]);
    }

    const restaurants = businesses.map((business) => {
      const id = cleanText(business.id);
      const payments = paymentsByBusiness.get(id) || [];
      const monthlyBusinessPayments = payments.filter((payment) => inRange(paymentDate(payment), start, end));
      const ytdBusinessPayments = payments.filter((payment) => inRange(paymentDate(payment), yearStart, end));
      const latestPayment = [...payments].sort((a, b) => Number(paymentDate(b)?.getTime() || 0) - Number(paymentDate(a)?.getTime() || 0))[0];

      return {
        id,
        username: cleanText(business.username),
        restaurantName: businessName(business),
        branchName: branchName(business),
        contactName: cleanText(business.owner_name || business.contact_name || business.manager_name),
        phone: cleanText(business.phone || business.phone_number || business.contact_phone),
        createdAt: cleanText(business.created_at),
        serviceStatus: cleanText(business.service_status || business.status || "trial"),
        serviceExpiresAt: cleanText(business.service_expires_at || business.subscription_expires_at || business.expires_at),
        monthlyFeeJod: numberFrom(business.service_monthly_fee_jod),
        balanceDueJod: numberFrom(business.service_balance_due_jod),
        collectedMonthJod: monthlyBusinessPayments.reduce((sum, payment) => sum + numberFrom(payment.amount_jod), 0),
        collectedYtdJod: ytdBusinessPayments.reduce((sum, payment) => sum + numberFrom(payment.amount_jod), 0),
        lifetimeCollectedJod: payments.reduce((sum, payment) => sum + numberFrom(payment.amount_jod), 0),
        lastPaymentAt: latestPayment ? cleanText(paymentDate(latestPayment)?.toISOString()) : "",
      };
    });

    return json({
      ok: true,
      report: {
        month,
        generatedAt: new Date().toISOString(),
        salesperson: {
          username,
          fullName: cleanText(salesperson.full_name || salesperson.name) || username,
          phone: cleanText(salesperson.phone || salesperson.phone_number),
          active: salesperson.active !== false,
        },
        summary: {
          newAccountsMonth: newAccountsMonth.length,
          newAccountsYtd: newAccountsYtd.length,
          portfolioBusinesses: businesses.length,
          portfolioMonthlyRecurringJod,
          monthlyRecurringAddedJod,
          ytdMonthlyRecurringAddedJod,
          monthlyCollectedJod,
          ytdCollectedJod,
          totalBalanceDueJod,
          commissionRate,
          estimatedCommissionMonthJod: monthlyCollectedJod * (commissionRate / 100),
          estimatedCommissionYtdJod: ytdCollectedJod * (commissionRate / 100),
        },
        restaurants,
      },
    });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "Could not load salesperson report" }, 400);
  }
}
