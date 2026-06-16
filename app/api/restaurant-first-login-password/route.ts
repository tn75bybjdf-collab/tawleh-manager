import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

function normalizeUsername(value: unknown) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9_\-.]/g, "")
    .slice(0, 80);
}

function getAnonClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase anon configuration");
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase service configuration");
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function getUserFromRequest(request: NextRequest) {
  const authorization = request.headers.get("authorization") || request.headers.get("Authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    throw new Error("Restaurant login required");
  }

  const anon = getAnonClient();
  const { data, error } = await anon.auth.getUser(token);

  if (error || !data.user?.id) {
    throw new Error("Invalid restaurant session");
  }

  return data.user;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    const body = await request.json().catch(() => ({} as Record<string, unknown>));
    const businessId = String(body.businessId || "").trim();
    const username = normalizeUsername(body.username);

    const admin = getAdminClient();

    let query = admin
      .from("business_accounts")
      .select("id, auth_user_id, username")
      .limit(1);

    if (isUuid(businessId)) {
      query = query.eq("id", businessId);
    } else if (username) {
      query = query.eq("username", username);
    } else {
      throw new Error("Business account is required");
    }

    const { data: business, error: businessError } = await query.maybeSingle();

    if (businessError) {
      throw new Error(businessError.message);
    }

    if (!business?.id) {
      throw new Error("Business not found");
    }

    if (String(business.auth_user_id || "") !== user.id) {
      throw new Error("You are not allowed to update this business");
    }

    const { error: updateError } = await admin
      .from("business_accounts")
      .update({
        force_password_change: false,
        password_changed_at: new Date().toISOString(),
      })
      .eq("id", String(business.id));

    if (updateError) {
      throw new Error(updateError.message);
    }

    return json({ ok: true });
  } catch (error) {
    return json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Could not complete password change",
      },
      400
    );
  }
}
