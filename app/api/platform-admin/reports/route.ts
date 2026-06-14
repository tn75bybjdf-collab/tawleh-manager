import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

function getBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

function cleanMonth(value: string | null) {
  const text = String(value || "").trim();
  if (/^\d{4}-\d{2}$/.test(text)) return text;

  return new Date().toISOString().slice(0, 7);
}

function moneyNumber(value: unknown) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? Math.max(0, Math.round(number * 1000) / 1000) : 0;
}

function dateMs(value: unknown) {
  const ms = Date.parse(String(value || ""));
  return Number.isFinite(ms) ? ms : 0;
}

function inRange(value: unknown, startMs: number, endMs: number) {
  const ms = dateMs(value);
  return ms >= startMs && ms < endMs;
}

function rowMonthlyFee(row: Record<string, unknown>) {
  return moneyNumber(row.service_monthly_fee_jod || Math.max(25, Number(row.table_count || 25)));
}

function rowBalanceDue(row: Record<string, unknown>) {
  return Math.max(moneyNumber(row.service_balance_due_jod), rowMonthlyFee(row));
}

async function requirePlatformAdmin(admin: any, request: NextRequest) {
  const token = getBearerToken(request);

  if (!token) {
    return {
      ok: false as const,
      response: jsonError("Admin login required", 401),
    };
  }

  const { data, error } = await admin.auth.getUser(token);

  if (error || !data.user) {
    return {
      ok: false as const,
      response: jsonError("Admin login required", 401),
    };
  }

  const email = (data.user.email || "").toLowerCase();

  const { data: adminUser, error: adminError } = await admin
    .from("platform_admin_users")
    .select("id, auth_user_id, email, active")
    .eq("active", true)
    .or(`auth_user_id.eq.${data.user.id},email.eq.${email}`)
    .maybeSingle();

  if (adminError) {
    return {
      ok: false as const,
      response: jsonError(adminError.message, 500),
    };
  }

  if (!adminUser) {
    return {
      ok: false as const,
      response: jsonError("This login is not allowed to access platform admin", 403),
    };
  }

  return {
    ok: true as const,
    user: data.user,
  };
}

export async function GET(request: NextRequest) {
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonError("Missing Supabase server environment keys", 500);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const gate = await requirePlatformAdmin(admin, request);
  if (!gate.ok) return gate.response;

  const url = new URL(request.url);
  const month = cleanMonth(url.searchParams.get("month"));
  const [yearText, monthText] = month.split("-");
  const year = Number(yearText);
  const monthIndex = Number(monthText) - 1;

  const monthStart = Date.UTC(year, monthIndex, 1, 0, 0, 0);
  const monthEnd = Date.UTC(year, monthIndex + 1, 1, 0, 0, 0);
  const yearStart = Date.UTC(year, 0, 1, 0, 0, 0);
  const yearEnd = Date.UTC(year + 1, 0, 1, 0, 0, 0);

  const [businessesResult, salespeopleResult, paymentsResult] = await Promise.all([
    admin
      .from("business_accounts")
      .select("id, username, restaurant_name, branch_name, table_count, service_status, service_monthly_fee_jod, service_balance_due_jod, created_at, signup_source, salesperson_id, salesperson_username"),
    admin
      .from("platform_salespeople")
      .select("id, username, full_name, phone, active, created_at")
      .order("created_at", { ascending: false }),
    admin
      .from("cliq_payment_requests")
      .select("id, business_account_id, amount_jod, status, created_at")
      .gte("created_at", new Date(yearStart).toISOString())
      .lt("created_at", new Date(yearEnd).toISOString())
      .order("created_at", { ascending: false }),
  ]);

  if (businessesResult.error) return jsonError(businessesResult.error.message, 500);
  if (salespeopleResult.error) return jsonError(salespeopleResult.error.message, 500);
  if (paymentsResult.error) return jsonError(paymentsResult.error.message, 500);

  const businesses = (businessesResult.data || []) as Record<string, unknown>[];
  const salespeople = (salespeopleResult.data || []) as Record<string, unknown>[];
  const payments = ((paymentsResult.data || []) as Record<string, unknown>[])
    .filter((payment) => String(payment.status || "pending").toLowerCase() !== "rejected");

  const businessById = new Map<string, Record<string, unknown>>();
  businesses.forEach((business) => {
    businessById.set(String(business.id || ""), business);
  });

  const totalBusinesses = businesses.length;
  const activeBusinesses = businesses.filter((business) => String(business.service_status || "active") === "active").length;
  const trialBusinesses = businesses.filter((business) => String(business.service_status || "") === "trial").length;
  const suspendedBusinesses = businesses.filter((business) => String(business.service_status || "") === "suspended").length;
  const newAccountsMonth = businesses.filter((business) => inRange(business.created_at, monthStart, monthEnd)).length;
  const newAccountsYtd = businesses.filter((business) => inRange(business.created_at, yearStart, yearEnd)).length;
  const monthlyRecurringJod = businesses.reduce((sum, business) => sum + rowMonthlyFee(business), 0);
  const monthlyRecurringAddedJod = businesses
    .filter((business) => inRange(business.created_at, monthStart, monthEnd))
    .reduce((sum, business) => sum + rowMonthlyFee(business), 0);
  const ytdMonthlyRecurringAddedJod = businesses
    .filter((business) => inRange(business.created_at, yearStart, yearEnd))
    .reduce((sum, business) => sum + rowMonthlyFee(business), 0);
  const monthlyCollectedJod = payments
    .filter((payment) => inRange(payment.created_at, monthStart, monthEnd))
    .reduce((sum, payment) => sum + moneyNumber(payment.amount_jod), 0);
  const ytdCollectedJod = payments.reduce((sum, payment) => sum + moneyNumber(payment.amount_jod), 0);
  const totalBalanceDueJod = businesses.reduce((sum, business) => sum + rowBalanceDue(business), 0);

  const salespeopleReport = salespeople.map((salesperson) => {
    const salespersonId = String(salesperson.id || "");
    const salespersonUsername = String(salesperson.username || "").toLowerCase();

    const ownedBusinesses = businesses.filter((business) => {
      const businessSalespersonId = String(business.salesperson_id || "");
      const businessSalespersonUsername = String(business.salesperson_username || "").toLowerCase();

      return Boolean(
        (salespersonId && businessSalespersonId && salespersonId === businessSalespersonId) ||
        (salespersonUsername && businessSalespersonUsername && salespersonUsername === businessSalespersonUsername)
      );
    });

    const ownedBusinessIds = new Set(ownedBusinesses.map((business) => String(business.id || "")));

    // Important: every renewal payment follows the restaurant's original salesperson assignment.
    // We do NOT use who submitted the payment. We join each payment back to the restaurant,
    // then the restaurant back to business_accounts.salesperson_id / salesperson_username.
    const ownedPayments = payments.filter((payment) => ownedBusinessIds.has(String(payment.business_account_id || "")));
    const ownedMonthPayments = ownedPayments.filter((payment) => inRange(payment.created_at, monthStart, monthEnd));

    return {
      salespersonId,
      username: salespersonUsername,
      fullName: String(salesperson.full_name || ""),
      phone: String(salesperson.phone || ""),
      active: salesperson.active !== false,
      newAccountsMonth: ownedBusinesses.filter((business) => inRange(business.created_at, monthStart, monthEnd)).length,
      newAccountsYtd: ownedBusinesses.filter((business) => inRange(business.created_at, yearStart, yearEnd)).length,
      portfolioBusinesses: ownedBusinesses.length,
      portfolioMonthlyRecurringJod: ownedBusinesses.reduce((sum, business) => sum + rowMonthlyFee(business), 0),
      monthlyRecurringAddedJod: ownedBusinesses
        .filter((business) => inRange(business.created_at, monthStart, monthEnd))
        .reduce((sum, business) => sum + rowMonthlyFee(business), 0),
      ytdMonthlyRecurringAddedJod: ownedBusinesses
        .filter((business) => inRange(business.created_at, yearStart, yearEnd))
        .reduce((sum, business) => sum + rowMonthlyFee(business), 0),
      monthlyCollectedJod: ownedMonthPayments.reduce((sum, payment) => sum + moneyNumber(payment.amount_jod), 0),
      ytdCollectedJod: ownedPayments.reduce((sum, payment) => sum + moneyNumber(payment.amount_jod), 0),
      totalBalanceDueJod: ownedBusinesses.reduce((sum, business) => sum + rowBalanceDue(business), 0),
    };
  });

  salespeopleReport.sort((a, b) => b.monthlyCollectedJod - a.monthlyCollectedJod);

  return NextResponse.json(
    {
      report: {
        month,
        generatedAt: new Date().toISOString(),
        company: {
          month,
          totalBusinesses,
          activeBusinesses,
          trialBusinesses,
          suspendedBusinesses,
          newAccountsMonth,
          newAccountsYtd,
          monthlyRecurringJod: moneyNumber(monthlyRecurringJod),
          monthlyRecurringAddedJod: moneyNumber(monthlyRecurringAddedJod),
          ytdMonthlyRecurringAddedJod: moneyNumber(ytdMonthlyRecurringAddedJod),
          monthlyCollectedJod: moneyNumber(monthlyCollectedJod),
          ytdCollectedJod: moneyNumber(ytdCollectedJod),
          totalBalanceDueJod: moneyNumber(totalBalanceDueJod),
        },
        salespeople: salespeopleReport.map((row) => ({
          ...row,
          portfolioMonthlyRecurringJod: moneyNumber(row.portfolioMonthlyRecurringJod),
          monthlyRecurringAddedJod: moneyNumber(row.monthlyRecurringAddedJod),
          ytdMonthlyRecurringAddedJod: moneyNumber(row.ytdMonthlyRecurringAddedJod),
          monthlyCollectedJod: moneyNumber(row.monthlyCollectedJod),
          ytdCollectedJod: moneyNumber(row.ytdCollectedJod),
          totalBalanceDueJod: moneyNumber(row.totalBalanceDueJod),
        })),
      },
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
