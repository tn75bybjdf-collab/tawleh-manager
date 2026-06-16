import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "";

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  "";

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function getAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase service configuration");
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getAnonClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase anon configuration");
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function makeTemporaryPassword() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let token = "";

  for (let index = 0; index < 10; index += 1) {
    token += alphabet[crypto.randomInt(0, alphabet.length)];
  }

  return `Tawleh@${token}`;
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

export async function POST(request: NextRequest) {
  try {
    const { admin } = await requirePlatformAdmin(request);
    const body = await request.json().catch(() => ({} as Record<string, unknown>));
    const businessId = String(body.businessId || "").trim();

    if (!isUuid(businessId)) {
      throw new Error("Valid business ID is required");
    }

    const { data: business, error: businessError } = await admin
      .from("business_accounts")
      .select("*")
      .eq("id", businessId)
      .maybeSingle();

    if (businessError) {
      throw new Error(businessError.message);
    }

    if (!business?.id) {
      throw new Error("Business not found");
    }

    const authUserId = String(business.auth_user_id || "");

    if (!isUuid(authUserId)) {
      throw new Error("Business is missing a valid auth user ID");
    }

    const temporaryPassword = makeTemporaryPassword();

    const { error: authError } = await admin.auth.admin.updateUserById(authUserId, {
      password: temporaryPassword,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    const { data: updatedBusiness, error: updateError } = await admin
      .from("business_accounts")
      .update({
        force_password_change: true,
        temporary_password_set_at: new Date().toISOString(),
        password_changed_at: null,
      })
      .eq("id", businessId)
      .select("*")
      .single();

    if (updateError) {
      throw new Error(updateError.message);
    }

    return json({
      ok: true,
      temporaryPassword,
      business: updatedBusiness,
    });
  } catch (error) {
    return json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Could not reset temporary password",
      },
      400
    );
  }
}
