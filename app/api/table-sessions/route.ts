import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const HARD_SESSION_HOURS = 3;
const IDLE_SESSION_MINUTES = 45;

type BusinessRow = {
  id: string;
  auth_user_id: string;
  username: string | null;
  restaurant_name?: string | null;
  branch_name?: string | null;
};

type TableSessionRow = {
  id: string;
  business_account_id: string;
  auth_user_id: string | null;
  table_number: number;
  session_token: string;
  qr_token: string | null;
  status: "pending" | "active" | "closed" | "expired" | "blocked";
  guest_name: string | null;
  created_at: string;
  updated_at: string;
  last_seen_at: string;
  approved_at: string | null;
  closed_at: string | null;
  expires_at: string;
  idle_expires_at: string;
  last_order_at: string | null;
};

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

function jsonError(message: string, status = 400) {
  return json({ error: message }, status);
}

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

function anonClient() {
  if (!supabaseUrl || !anonKey) {
    throw new Error("Missing Supabase anon environment key");
  }

  return createClient(supabaseUrl, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function cleanText(value: unknown, fallback = "") {
  return String(value ?? fallback).trim();
}

function cleanTable(value: unknown) {
  const table = Number(value || 1);
  return Math.max(1, Math.min(999, Number.isFinite(table) ? Math.floor(table) : 1));
}

function cleanToken(value: unknown) {
  return cleanText(value).replace(/[^a-zA-Z0-9_\-:.]/g, "").slice(0, 180);
}

function normalizeUsername(value: unknown) {
  return cleanText(value)
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9_\-.]/g, "")
    .slice(0, 60);
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60_000);
}

function newSessionToken() {
  return `twl_sess_${randomUUID().replace(/-/g, "")}_${Math.random().toString(36).slice(2, 10)}`;
}

async function findBusiness(admin: SupabaseClient, businessId: string, username = "", fallbackAuthUserId = "") {
  if (businessId && !isUuid(businessId)) {
    throw new Error("Invalid business account id");
  }

  let query = admin
    .from("business_accounts")
    .select("id, auth_user_id, username, restaurant_name, branch_name")
    .limit(1);

  if (businessId) {
    query = query.eq("id", businessId);
  } else if (username) {
    query = query.eq("username", normalizeUsername(username));
  } else {
    throw new Error("Missing business account");
  }

  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  if (!data?.id) throw new Error("Restaurant account was not found");

  if (fallbackAuthUserId && data.auth_user_id && String(data.auth_user_id) !== String(fallbackAuthUserId)) {
    // Keep this soft. Public QR links may carry stale authUserId, but the business id is the source of truth.
  }

  return data as unknown as BusinessRow;
}

async function expireOldSessions(admin: SupabaseClient, businessId: string, tableNumber?: number) {
  const now = new Date().toISOString();
  let query = admin
    .from("table_sessions")
    .update({
      status: "expired",
      closed_at: now,
      updated_at: now,
    })
    .eq("business_account_id", businessId)
    .in("status", ["pending", "active"])
    .or(`expires_at.lt.${now},idle_expires_at.lt.${now}`);

  if (tableNumber) query = query.eq("table_number", tableNumber);

  const { error } = await query;
  if (error && error.code !== "42P01" && error.code !== "42703") throw error;
}

async function requireBusinessOwner(request: NextRequest, admin: SupabaseClient, businessIdRaw: string, usernameRaw: string) {
  const authorization = request.headers.get("authorization") || request.headers.get("Authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "").trim();

  if (!token) throw new Error("Login required");

  const anon = anonClient();
  const { data: userData, error: userError } = await anon.auth.getUser(token);
  const user = userData?.user;

  if (userError || !user?.id) throw new Error("Invalid login session");

  const business = await findBusiness(admin, businessIdRaw, usernameRaw);

  if (String(business.auth_user_id || "") !== String(user.id)) {
    throw new Error("Not allowed to manage this table session");
  }

  return { business, userId: user.id };
}

function sessionSelect() {
  return "id, business_account_id, auth_user_id, table_number, session_token, qr_token, status, guest_name, created_at, updated_at, last_seen_at, approved_at, closed_at, expires_at, idle_expires_at, last_order_at";
}

export async function GET(request: NextRequest) {
  try {
    const admin = adminClient();
    const searchParams = request.nextUrl.searchParams;
    const businessId = cleanText(searchParams.get("businessId"));
    const username = normalizeUsername(searchParams.get("username"));
    const tableNumber = searchParams.get("table") ? cleanTable(searchParams.get("table")) : null;
    const includeAll = searchParams.get("all") === "1";

    const { business } = await requireBusinessOwner(request, admin, businessId, username);
    await expireOldSessions(admin, business.id, tableNumber || undefined);

    let query = admin
      .from("table_sessions")
      .select(sessionSelect())
      .eq("business_account_id", business.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (tableNumber) query = query.eq("table_number", tableNumber);
    if (!includeAll) query = query.in("status", ["pending", "active"]);

    const { data, error } = await query;
    if (error) throw error;

    return json({ sessions: data || [] });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not load table sessions", 400);
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = adminClient();
    const body = await request.json().catch(() => ({}));
    const businessId = cleanText(body.businessId);
    const authUserId = cleanText(body.authUserId);
    const username = normalizeUsername(body.username);
    const tableNumber = cleanTable(body.table);
    const qrToken = cleanToken(body.qrToken);
    const guestName = cleanText(body.guestName).replace(/\s+/g, " ").slice(0, 40);
    const now = new Date();
    const nowIso = now.toISOString();

    const business = await findBusiness(admin, businessId, username, authUserId);
    await expireOldSessions(admin, business.id, tableNumber);

    const { data: existingRows, error: existingError } = await admin
      .from("table_sessions")
      .select(sessionSelect())
      .eq("business_account_id", business.id)
      .eq("table_number", tableNumber)
      .in("status", ["pending", "active"])
      .order("created_at", { ascending: false })
      .limit(1);

    if (existingError) throw existingError;

    const existing = ((existingRows || []) as unknown as TableSessionRow[])[0];

    if (existing?.id) {
      const nextIdle = addMinutes(now, IDLE_SESSION_MINUTES).toISOString();
      const { data, error } = await admin
        .from("table_sessions")
        .update({
          last_seen_at: nowIso,
          idle_expires_at: nextIdle,
          guest_name: guestName || existing.guest_name || null,
          updated_at: nowIso,
        })
        .eq("id", existing.id)
        .select(sessionSelect())
        .single();

      if (error) throw error;
      return json({ session: data, reused: true });
    }

    const token = newSessionToken();
    const { data, error } = await admin
      .from("table_sessions")
      .insert({
        business_account_id: business.id,
        auth_user_id: business.auth_user_id,
        table_number: tableNumber,
        session_token: token,
        qr_token: qrToken || null,
        status: "pending",
        guest_name: guestName || null,
        last_seen_at: nowIso,
        expires_at: addHours(now, HARD_SESSION_HOURS).toISOString(),
        idle_expires_at: addMinutes(now, IDLE_SESSION_MINUTES).toISOString(),
      })
      .select(sessionSelect())
      .single();

    if (error) throw error;

    return json({ session: data, reused: false });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not start table session", 400);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = adminClient();
    const body = await request.json().catch(() => ({}));
    const sessionId = cleanText(body.sessionId);
    const status = cleanText(body.status).toLowerCase();
    const businessId = cleanText(body.businessId);
    const username = normalizeUsername(body.username);
    const now = new Date();
    const nowIso = now.toISOString();

    if (!isUuid(sessionId)) throw new Error("Valid table session ID is required");
    if (!["active", "closed", "blocked"].includes(status)) throw new Error("Invalid table session status");

    const { business, userId } = await requireBusinessOwner(request, admin, businessId, username);

    const patch: Record<string, unknown> = {
      status,
      updated_at: nowIso,
      last_seen_at: nowIso,
    };

    if (status === "active") {
      patch.approved_at = nowIso;
      patch.approved_by = userId;
      patch.closed_at = null;
      patch.idle_expires_at = addMinutes(now, IDLE_SESSION_MINUTES).toISOString();
    }

    if (status === "closed" || status === "blocked") {
      patch.closed_at = nowIso;
    }

    const { data, error } = await admin
      .from("table_sessions")
      .update(patch)
      .eq("id", sessionId)
      .eq("business_account_id", business.id)
      .select(sessionSelect())
      .single();

    if (error) throw error;

    return json({ session: data });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not update table session", 400);
  }
}
