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

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function cleanMoney(value: unknown) {
  const number = Number(value || 0);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.round(number * 1000) / 1000);
}

function monthlyTableFee(tableCount: unknown, fallbackMonthlyFee?: unknown) {
  const explicit = Number(fallbackMonthlyFee || 0);
  if (Number.isFinite(explicit) && explicit > 0) return Math.round(explicit * 1000) / 1000;

  const tables = Number(tableCount || 25);
  return Math.max(25, Math.min(999, Number.isFinite(tables) ? Math.floor(tables) : 25));
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
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

  return {
    admin,
    userId: user.id,
    email,
  };
}

function normalizeBusiness(row: Record<string, unknown>) {
  const tableCount = Number(row.table_count || 25);
  const monthlyFee = monthlyTableFee(tableCount, row.service_monthly_fee_jod);

  return {
    ...row,
    table_count: tableCount,
    service_monthly_fee_jod: monthlyFee,
    service_balance_due_jod: Math.max(Number(row.service_balance_due_jod || 0), monthlyFee),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { admin } = await requirePlatformAdmin(request);

    const { data, error } = await admin
      .from("business_accounts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return json({
      ok: true,
      businesses: ((data || []) as unknown as Record<string, unknown>[]).map(normalizeBusiness),
    });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "Could not load businesses" }, 400);
  }
}

async function insertManualPayment(args: {
  admin: ReturnType<typeof getAdminClient>;
  business: Record<string, unknown>;
  paidAmountJod: number;
  monthsPaid: number;
  monthlyFeeJod: number;
  dueDate: string;
  userId: string;
}) {
  const { admin, business, paidAmountJod, monthsPaid, monthlyFeeJod, dueDate, userId } = args;

  const authUserId = cleanText(business.auth_user_id) || cleanText(userId);

  const insertPayload = {
    business_account_id: String(business.id || ""),
    auth_user_id: authUserId,
    months: monthsPaid,
    monthly_fee_jod: monthlyFeeJod,
    amount_jod: paidAmountJod,
    payment_due_date: dueDate,
    reference_number: `ADMIN-${Date.now()}`,
    sender_cliq_name: "Admin manual payment",
    sender_cliq_phone: "Admin",
    status: "paid",
    paid_at: new Date().toISOString(),
    admin_marked_paid: true,
    paid_months: monthsPaid,
    paid_by_admin_user_id: userId,
  };

  const { data, error } = await admin
    .from("cliq_payment_requests")
    .insert(insertPayload)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Payment record failed: ${error.message}`);
  }

  return data as Record<string, unknown>;
}

export async function PATCH(request: NextRequest) {
  try {
    const { admin, userId } = await requirePlatformAdmin(request);
    const body = await request.json().catch(() => ({}));

    const businessId = cleanText(body.businessId);
    if (!businessId || !isUuid(businessId)) {
      return json({ ok: false, error: "Invalid business account id" }, 400);
    }

    const { data: existing, error: existingError } = await admin
      .from("business_accounts")
      .select("*")
      .eq("id", businessId)
      .maybeSingle();

    if (existingError) throw new Error(existingError.message);
    if (!existing?.id) return json({ ok: false, error: "Business not found" }, 404);

    const existingBusiness = existing as unknown as Record<string, unknown>;
    const action = cleanText(body.action).toLowerCase();

    if (action === "markpaid" || action === "mark_paid") {
      const monthlyFeeJod = monthlyTableFee(existingBusiness.table_count, existingBusiness.service_monthly_fee_jod);
      const paidAmountJod = cleanMoney(body.paidAmountJod);

      if (paidAmountJod <= 0) {
        return json({ ok: false, error: "Paid amount must be greater than 0" }, 400);
      }

      const monthsPaid = Math.max(1, Math.floor((paidAmountJod + 0.0001) / monthlyFeeJod));
      const paidAt = new Date();
      const expiresAt = toDateOnly(addDays(paidAt, monthsPaid * 30));

      const updatePayload = {
        service_status: "active",
        service_expires_at: expiresAt,
        service_payment_due_date: expiresAt,
        service_balance_due_jod: monthlyFeeJod,
        service_monthly_fee_jod: monthlyFeeJod,
        service_suspended_reason: "",
        service_admin_note: [
          cleanText(existingBusiness.service_admin_note),
          `Marked paid ${paidAmountJod.toFixed(3)} JOD on ${paidAt.toISOString().slice(0, 10)} for ${monthsPaid} month${monthsPaid === 1 ? "" : "s"}.`,
        ]
          .filter(Boolean)
          .join("\n")
          .slice(0, 2000),
        updated_at: paidAt.toISOString(),
      };

      const { data: updated, error: updateError } = await admin
        .from("business_accounts")
        .update(updatePayload)
        .eq("id", businessId)
        .select("*")
        .single();

      if (updateError) throw new Error(updateError.message);

      const payment = await insertManualPayment({
        admin,
        business: existingBusiness,
        paidAmountJod,
        monthsPaid,
        monthlyFeeJod,
        dueDate: expiresAt,
        userId,
      });

      return json({
        ok: true,
        business: normalizeBusiness(updated as unknown as Record<string, unknown>),
        payment: {
          ...payment,
          username: String(updated.username || ""),
          restaurant_name: String(updated.restaurant_name || "Restaurant"),
          branch_name: String(updated.branch_name || "Main Branch"),
        },
        monthsPaid,
        paidAmountJod,
        expiresAt,
      });
    }

    const tableCount = Number(existingBusiness.table_count || 25);
    const monthlyFeeJod = cleanMoney(body.serviceMonthlyFeeJod || monthlyTableFee(tableCount, existingBusiness.service_monthly_fee_jod));

    const updatePayload = {
      service_status: cleanText(body.serviceStatus || existingBusiness.service_status || "active"),
      service_expires_at: body.serviceExpiresAt || null,
      service_payment_due_date: body.servicePaymentDueDate || null,
      service_balance_due_jod: Math.max(cleanMoney(body.serviceBalanceDueJod), monthlyFeeJod),
      service_monthly_fee_jod: monthlyFeeJod,
      service_suspended_reason: cleanText(body.serviceSuspendedReason),
      service_admin_note: cleanText(body.serviceAdminNote).slice(0, 2000),
      updated_at: new Date().toISOString(),
    };

    const { data: updated, error: updateError } = await admin
      .from("business_accounts")
      .update(updatePayload)
      .eq("id", businessId)
      .select("*")
      .single();

    if (updateError) throw new Error(updateError.message);

    return json({
      ok: true,
      business: normalizeBusiness(updated as unknown as Record<string, unknown>),
    });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "Could not update business" }, 400);
  }
}
