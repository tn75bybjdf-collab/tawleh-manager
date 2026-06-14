import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const BUSINESS_SELECT =
  "id, auth_user_id, email, username, restaurant_name, branch_name, business_phone, table_count, location_count, created_at, service_status, service_expires_at, service_payment_due_date, service_balance_due_jod, service_monthly_fee_jod, service_suspended_reason, service_admin_note, service_updated_at";

function adminClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase server environment keys");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function cleanText(value: unknown, fallback = "") {
  return String(value ?? fallback).trim();
}

function cleanDate(value: unknown) {
  const text = cleanText(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : null;
}

function cleanMoney(value: unknown, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.round(number * 1000) / 1000) : fallback;
}

function getBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

async function requirePlatformAdmin(request: NextRequest) {
  const admin = adminClient();
  const token = getBearerToken(request);

  if (!token) {
    return {
      ok: false as const,
      response: jsonError("Admin login required", 401),
    };
  }

  const { data: userData, error: userError } = await admin.auth.getUser(token);

  if (userError || !userData.user) {
    return {
      ok: false as const,
      response: jsonError("Invalid admin session", 401),
    };
  }

  const email = (userData.user.email || "").toLowerCase();

  const { data: adminUser, error: adminError } = await admin
    .from("platform_admin_users")
    .select("id, auth_user_id, email, active")
    .eq("active", true)
    .or(`auth_user_id.eq.${userData.user.id},email.eq.${email}`)
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
    admin,
    user: userData.user,
  };
}

export async function GET(request: NextRequest) {
  try {
    const gate = await requirePlatformAdmin(request);
    if (!gate.ok) return gate.response;

    const { data, error } = await gate.admin
      .from("business_accounts")
      .select(BUSINESS_SELECT)
      .order("created_at", { ascending: false });

    if (error) {
      return jsonError(error.message, 500);
    }

    return NextResponse.json(
      { businesses: data || [] },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not load companies");
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const gate = await requirePlatformAdmin(request);
    if (!gate.ok) return gate.response;

    const body = await request.json();
    const businessId = cleanText(body.businessId);

    if (!businessId || !isUuid(businessId)) {
      return jsonError("Invalid business id", 400);
    }

    const serviceStatus = cleanText(body.serviceStatus || "active").toLowerCase();
    const safeStatus = ["active", "trial", "suspended"].includes(serviceStatus) ? serviceStatus : "active";

    const update = {
      service_status: safeStatus,
      service_expires_at: cleanDate(body.serviceExpiresAt),
      service_payment_due_date: cleanDate(body.servicePaymentDueDate),
      service_balance_due_jod: cleanMoney(body.serviceBalanceDueJod, 0),
      service_monthly_fee_jod: cleanMoney(body.serviceMonthlyFeeJod, 100),
      service_suspended_reason: cleanText(body.serviceSuspendedReason).slice(0, 500) || null,
      service_admin_note: cleanText(body.serviceAdminNote).slice(0, 1000) || null,
      service_updated_at: new Date().toISOString(),
    };

    const { data, error } = await gate.admin
      .from("business_accounts")
      .update(update)
      .eq("id", businessId)
      .select(BUSINESS_SELECT)
      .single();

    if (error) {
      return jsonError(error.message, 500);
    }

    return NextResponse.json({ business: data });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not update company");
  }
}
