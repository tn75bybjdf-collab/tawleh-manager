import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const PAYMENT_SELECT =
  "id, business_account_id, auth_user_id, username, restaurant_name, branch_name, months, monthly_fee_jod, amount_jod, payment_due_date, reference_number, sender_cliq_name, sender_cliq_phone, status, created_at";

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

function cleanText(value: unknown, fallback = "") {
  return String(value ?? fallback).trim();
}

function cleanMoney(value: unknown, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.round(number * 1000) / 1000) : fallback;
}

function cleanMonths(value: unknown) {
  const months = Number(value);
  return Number.isFinite(months) ? Math.max(1, Math.min(24, Math.round(months))) : 1;
}

function cleanDate(value: unknown) {
  const text = cleanText(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : null;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/i.test(value);
}

function getBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

async function getAuthUser(admin: SupabaseClient, request: NextRequest) {
  const token = getBearerToken(request);

  if (!token) return null;

  const { data, error } = await admin.auth.getUser(token);

  if (error || !data.user) return null;

  return data.user;
}

async function requirePlatformAdmin(admin: SupabaseClient, request: NextRequest) {
  const user = await getAuthUser(admin, request);

  if (!user) {
    return {
      ok: false as const,
      response: jsonError("Admin login required", 401),
    };
  }

  const email = (user.email || "").toLowerCase();

  const { data: adminUser, error: adminError } = await admin
    .from("platform_admin_users")
    .select("id, auth_user_id, email, active")
    .eq("active", true)
    .or(`auth_user_id.eq.${user.id},email.eq.${email}`)
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
    user,
  };
}

async function findBusiness(admin: SupabaseClient, businessId: string, username = "") {
  let query = admin
    .from("business_accounts")
    .select("id, auth_user_id, username, restaurant_name, branch_name, service_payment_due_date, service_monthly_fee_jod, service_balance_due_jod");

  if (businessId) {
    if (!isUuid(businessId)) throw new Error("Invalid business account");
    query = query.eq("id", businessId);
  } else if (username) {
    query = query.eq("username", username.toLowerCase());
  } else {
    throw new Error("Missing business account");
  }

  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Restaurant account was not found");

  return data as {
    id: string;
    auth_user_id: string;
    username: string | null;
    restaurant_name: string | null;
    branch_name: string | null;
    service_payment_due_date: string | null;
    service_monthly_fee_jod: number | string | null;
    service_balance_due_jod: number | string | null;
  };
}

export async function GET(request: NextRequest) {
  try {
    const admin = adminClient();
    const gate = await requirePlatformAdmin(admin, request);

    if (!gate.ok) return gate.response;

    const { data, error } = await admin
      .from("cliq_payment_requests")
      .select(PAYMENT_SELECT)
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      return jsonError(error.message, 500);
    }

    return NextResponse.json(
      { payments: data || [] },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not load CliQ payments");
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = adminClient();
    const user = await getAuthUser(admin, request);

    if (!user) {
      return jsonError("Login required before sending a CliQ payment notification", 401);
    }

    const body = await request.json();
    const businessId = cleanText(body.businessId);
    const username = cleanText(body.username).toLowerCase();

    const business = await findBusiness(admin, businessId, username);

    if (business.auth_user_id !== user.id) {
      return jsonError("You do not own this restaurant account", 403);
    }

    const months = cleanMonths(body.months);
    const monthlyFeeJod = cleanMoney(body.monthlyFeeJod, Number(business.service_monthly_fee_jod || 25));
    const amountJod = cleanMoney(body.amountJod, monthlyFeeJod * months);
    const referenceNumber = cleanText(body.referenceNumber).slice(0, 120);
    const senderCliqName = cleanText(body.senderCliqName).slice(0, 160);
    const senderCliqPhone = cleanText(body.senderCliqPhone).replace(/[^0-9+]/g, "").slice(0, 40);
    const paymentDueDate = cleanDate(body.paymentDueDate) || cleanDate(business.service_payment_due_date);

    if (!referenceNumber) {
      return jsonError("CliQ reference number is required", 400);
    }

    if (!senderCliqName) {
      return jsonError("CliQ sender name is required", 400);
    }

    if (!senderCliqPhone || senderCliqPhone.length < 8) {
      return jsonError("CliQ sender phone is required", 400);
    }

    if (amountJod <= 0) {
      return jsonError("Payment amount must be more than zero", 400);
    }

    const { data, error } = await admin
      .from("cliq_payment_requests")
      .insert({
        business_account_id: business.id,
        auth_user_id: business.auth_user_id,
        username: business.username || username,
        restaurant_name: business.restaurant_name || "Restaurant",
        branch_name: business.branch_name || "Main Branch",
        months,
        monthly_fee_jod: monthlyFeeJod,
        amount_jod: amountJod,
        payment_due_date: paymentDueDate,
        reference_number: referenceNumber,
        sender_cliq_name: senderCliqName,
        sender_cliq_phone: senderCliqPhone,
        status: "pending",
      })
      .select(PAYMENT_SELECT)
      .single();

    if (error) {
      return jsonError(error.message, 500);
    }

    return NextResponse.json({ payment: data });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not submit CliQ payment");
  }
}
