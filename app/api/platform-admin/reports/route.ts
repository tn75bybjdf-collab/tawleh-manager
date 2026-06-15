import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
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

function getAnonClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase anon configuration");
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function cleanText(value: unknown) {
  return String(value ?? "").trim();
}

function cleanMonth(value: unknown) {
  const text = cleanText(value);
  return /^\d{4}-\d{2}$/.test(text) ? text : new Date().toISOString().slice(0, 7);
}

function monthlyTableFee(tableCount: unknown, explicitFee?: unknown) {
  const explicit = Number(explicitFee || 0);
  if (Number.isFinite(explicit) && explicit > 0) return Math.round(explicit * 1000) / 1000;

  const tables = Number(tableCount || 25);
  return Math.max(25, Math.min(999, Number.isFinite(tables) ? Math.floor(tables) : 25));
}

function numberFrom(value: unknown) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? number : 0;
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

async function requirePlatformAdmin(request: NextRequest) {
  const authorization = request.headers.get("authorization") || request.headers.get("Authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    throw new Error("Platform admin login required");
  }

  const anon = getAnonClient();
  const admin = getAdminClient();

  const { data: userData, error: userError } = await anon.auth.getUser(token);
  const user = userData?.user;

  if (userError || !user?.id) {
    throw new Error("Invalid platform admin session");
  }

  const email = String(user.email || "").toLowerCase();

  const { data: adminRow, error: adminError } = await admin
    .from("platform_admin_users")
    .select("id, auth_user_id, email, active")
    .or(`auth_user_id.eq.${user.id},email.eq.${email}`)
    .maybeSingle();

  if (adminError) {
    throw new Error(`Platform admin check failed: ${adminError.message}`);
  }

  if (!adminRow?.id || adminRow.active === false) {
    throw new Error("This account is not allowed to use Platform Admin");
  }

  return { admin };
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
  const status = cleanText(payment.status).toLowerCase();
  return ["paid", "approved", "verified", "collected", "completed"].includes(status);
}

function salespersonKey(value: unknown) {
  return cleanText(value).toLowerCase();
}

export async function GET(request: NextRequest) {
  try {
    const { admin } = await requirePlatformAdmin(request);
    const month = cleanMonth(request.nextUrl.searchParams.get("month"));
    const { start, end, yearStart } = monthRange(month);

    const [businessResult, paymentsResult, salespeopleResult] = await Promise.all([
      admin.from("business_accounts").select("*").order("created_at", { ascending: false }),
      admin.from("cliq_payment_requests").select("*").order("created_at", { ascending: false }),
      admin.from("platform_salespeople").select("*").order("created_at", { ascending: false }),
    ]);

    if (businessResult.error) throw new Error(businessResult.error.message);
    if (paymentsResult.error) throw new Error(paymentsResult.error.message);
    if (salespeopleResult.error && salespeopleResult.error.code !== "42P01") {
      throw new Error(salespeopleResult.error.message);
    }

    const businesses: Array<Record<string, unknown>> = ((businessResult.data || []) as unknown as Record<string, unknown>[]).map((business) => {
      const monthlyFee = monthlyTableFee(business.table_count, business.service_monthly_fee_jod);

      return {
        ...business,
        service_monthly_fee_jod: monthlyFee,
        service_balance_due_jod: Math.max(numberFrom(business.service_balance_due_jod), monthlyFee),
      } as Record<string, unknown>;
    });

    const businessById = new Map(businesses.map((business) => [cleanText(business.id), business]));
    const collectedPayments = ((paymentsResult.data || []) as unknown as Record<string, unknown>[]).filter(isCollectedPayment);
    const salespeopleRows = ((salespeopleResult.data || []) as unknown as Record<string, unknown>[]);

    const newAccountsMonth = businesses.filter((business) => inRange(dateTime(business.created_at), start, end));
    const newAccountsYtd = businesses.filter((business) => inRange(dateTime(business.created_at), yearStart, end));

    const monthlyPayments = collectedPayments.filter((payment) => inRange(paymentDate(payment), start, end));
    const ytdPayments = collectedPayments.filter((payment) => inRange(paymentDate(payment), yearStart, end));

    const company = {
      month,
      totalBusinesses: businesses.length,
      activeBusinesses: businesses.filter((business) => cleanText(business.service_status).toLowerCase() === "active").length,
      trialBusinesses: businesses.filter((business) => cleanText(business.service_status).toLowerCase() === "trial").length,
      suspendedBusinesses: businesses.filter((business) => cleanText(business.service_status).toLowerCase() === "suspended").length,
      newAccountsMonth: newAccountsMonth.length,
      newAccountsYtd: newAccountsYtd.length,
      monthlyRecurringJod: businesses.reduce((sum, business) => sum + numberFrom(business.service_monthly_fee_jod), 0),
      monthlyRecurringAddedJod: newAccountsMonth.reduce((sum, business) => sum + numberFrom(business.service_monthly_fee_jod), 0),
      ytdMonthlyRecurringAddedJod: newAccountsYtd.reduce((sum, business) => sum + numberFrom(business.service_monthly_fee_jod), 0),
      monthlyCollectedJod: monthlyPayments.reduce((sum, payment) => sum + numberFrom(payment.amount_jod), 0),
      ytdCollectedJod: ytdPayments.reduce((sum, payment) => sum + numberFrom(payment.amount_jod), 0),
      totalBalanceDueJod: businesses.reduce((sum, business) => sum + numberFrom(business.service_balance_due_jod), 0),
    };

    const knownSalespeople = new Map<string, Record<string, unknown>>();

    for (const salesperson of salespeopleRows) {
      const id = cleanText(salesperson.id);
      const username = salespersonKey(salesperson.username);

      if (id) knownSalespeople.set(id, salesperson);
      if (username) knownSalespeople.set(username, salesperson);
    }

    for (const business of businesses) {
      const id = cleanText(business.salesperson_id);
      const username = salespersonKey(business.salesperson_username);

      if ((id || username) && !knownSalespeople.has(id || username)) {
        const synthetic = {
          id: id || username,
          username: username || cleanText(business.salesperson_username),
          full_name: cleanText(business.salesperson_username) || "Salesperson",
          phone: "",
          active: true,
          created_at: business.created_at,
        };

        if (id) knownSalespeople.set(id, synthetic);
        if (username) knownSalespeople.set(username, synthetic);
      }
    }

    const uniqueSalespeople = Array.from(
      new Map(
        Array.from(knownSalespeople.values()).map((person) => [
          cleanText(person.id) || salespersonKey(person.username),
          person,
        ])
      ).values()
    );

    const salespeople = uniqueSalespeople.map((person) => {
      const personId = cleanText(person.id);
      const username = salespersonKey(person.username);

      const portfolio = businesses.filter((business) => {
        const businessSalespersonId = cleanText(business.salesperson_id);
        const businessSalespersonUsername = salespersonKey(business.salesperson_username);
        return (personId && businessSalespersonId === personId) || (username && businessSalespersonUsername === username);
      });

      const portfolioIds = new Set(portfolio.map((business) => cleanText(business.id)));

      const monthlyPersonPayments = monthlyPayments.filter((payment) => {
        const business = businessById.get(cleanText(payment.business_account_id));
        return business ? portfolioIds.has(cleanText(business.id)) : false;
      });

      const ytdPersonPayments = ytdPayments.filter((payment) => {
        const business = businessById.get(cleanText(payment.business_account_id));
        return business ? portfolioIds.has(cleanText(business.id)) : false;
      });

      const portfolioNewMonth = portfolio.filter((business) => inRange(dateTime(business.created_at), start, end));
      const portfolioNewYtd = portfolio.filter((business) => inRange(dateTime(business.created_at), yearStart, end));

      return {
        salespersonId: personId || username,
        username: cleanText(person.username),
        fullName: cleanText(person.full_name || person.name),
        phone: cleanText(person.phone),
        active: person.active !== false,
        newAccountsMonth: portfolioNewMonth.length,
        newAccountsYtd: portfolioNewYtd.length,
        portfolioBusinesses: portfolio.length,
        portfolioMonthlyRecurringJod: portfolio.reduce((sum, business) => sum + numberFrom(business.service_monthly_fee_jod), 0),
        monthlyRecurringAddedJod: portfolioNewMonth.reduce((sum, business) => sum + numberFrom(business.service_monthly_fee_jod), 0),
        ytdMonthlyRecurringAddedJod: portfolioNewYtd.reduce((sum, business) => sum + numberFrom(business.service_monthly_fee_jod), 0),
        monthlyCollectedJod: monthlyPersonPayments.reduce((sum, payment) => sum + numberFrom(payment.amount_jod), 0),
        ytdCollectedJod: ytdPersonPayments.reduce((sum, payment) => sum + numberFrom(payment.amount_jod), 0),
        totalBalanceDueJod: portfolio.reduce((sum, business) => sum + numberFrom(business.service_balance_due_jod), 0),
      };
    });

    return json({
      ok: true,
      report: {
        month,
        generatedAt: new Date().toISOString(),
        company,
        salespeople,
      },
    });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "Could not load reports" }, 400);
  }
}
