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

function normalizeUsername(value: string) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9_\-.]/g, "")
    .slice(0, 80);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function cleanToken(value: unknown) {
  return String(value || "").trim();
}

function makeToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function requireLoggedInUser(request: NextRequest) {
  const authorization = request.headers.get("authorization") || request.headers.get("Authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    throw new Error("Restaurant login required");
  }

  const anon = getAnonClient();
  const { data, error } = await anon.auth.getUser(token);

  if (error || !data.user?.id) {
    throw new Error("Invalid restaurant login session");
  }

  return data.user;
}

export async function GET(request: NextRequest) {
  try {
    await requireLoggedInUser(request);

    const admin = getAdminClient();
    const businessId = String(request.nextUrl.searchParams.get("businessId") || "").trim();
    const username = normalizeUsername(request.nextUrl.searchParams.get("username") || "");

    let query = admin
      .from("business_accounts")
      .select("id, username, restaurant_name, branch_name, print_bridge_token")
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
      throw new Error("Business account not found");
    }

    let token = cleanToken((business as { print_bridge_token?: unknown }).print_bridge_token);

    if (!token) {
      token = makeToken();

      const { data: updated, error: updateError } = await admin
        .from("business_accounts")
        .update({
          print_bridge_token: token,
          print_bridge_token_created_at: new Date().toISOString(),
        })
        .eq("id", String(business.id))
        .select("print_bridge_token")
        .maybeSingle();

      if (updateError) {
        throw new Error(updateError.message);
      }

      token = cleanToken((updated as { print_bridge_token?: unknown } | null)?.print_bridge_token || token);
    }

    return json({
      ok: true,
      businessId: String(business.id),
      username: String((business as { username?: unknown }).username || ""),
      restaurantName: String((business as { restaurant_name?: unknown }).restaurant_name || ""),
      branchName: String((business as { branch_name?: unknown }).branch_name || ""),
      printBridgeToken: token,
    });
  } catch (error) {
    return json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Could not load bridge token",
      },
      400
    );
  }
}
