import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const IDLE_SESSION_MINUTES = 45;

type BusinessRow = {
  id: string;
  auth_user_id: string;
  username: string | null;
};

type TableSessionRow = {
  id: string;
  business_account_id: string;
  table_number: number;
  session_token: string;
  status: string;
  expires_at: string | null;
  idle_expires_at: string | null;
};

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

function cleanGuestName(value: unknown) {
  return cleanText(value).replace(/\s+/g, " ").slice(0, 40);
}

function cleanToken(value: unknown) {
  return cleanText(value).replace(/[^a-zA-Z0-9_\-:.]/g, "").slice(0, 220);
}

function cleanTable(value: unknown) {
  const table = Number(value || 1);
  return Math.max(1, Math.min(999, Number.isFinite(table) ? Math.floor(table) : 1));
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

async function findBusiness(admin: SupabaseClient, businessId: string, username = "") {
  let query = admin.from("business_accounts").select("id, auth_user_id, username");

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

  return data as unknown as BusinessRow;
}

async function fetchGuests(admin: SupabaseClient, businessId: string, tableNumber: number) {
  const { data, error } = await admin
    .from("table_guests")
    .select("id, business_account_id, table_session_id, table_number, guest_name, active, created_at, last_seen_at")
    .eq("business_account_id", businessId)
    .eq("table_number", tableNumber)
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

async function expireOldSessions(admin: SupabaseClient, businessId: string, tableNumber: number) {
  const now = new Date().toISOString();
  const { error } = await admin
    .from("table_sessions")
    .update({ status: "expired", closed_at: now, updated_at: now })
    .eq("business_account_id", businessId)
    .eq("table_number", tableNumber)
    .in("status", ["pending", "active"])
    .or(`expires_at.lt.${now},idle_expires_at.lt.${now}`);

  if (error && error.code !== "42P01" && error.code !== "42703") throw error;
}

async function requireJoinableSession(admin: SupabaseClient, businessId: string, tableNumber: number, sessionToken: string) {
  if (!sessionToken) throw new Error("This QR page is missing its table session. Please scan the table QR again.");

  await expireOldSessions(admin, businessId, tableNumber);

  const { data, error } = await admin
    .from("table_sessions")
    .select("id, business_account_id, table_number, session_token, status, expires_at, idle_expires_at")
    .eq("business_account_id", businessId)
    .eq("table_number", tableNumber)
    .eq("session_token", sessionToken)
    .maybeSingle();

  if (error) throw error;
  if (!data?.id) throw new Error("This table session is no longer valid. Please scan the table QR again.");

  const session = data as unknown as TableSessionRow;
  if (!["pending", "active"].includes(String(session.status || ""))) {
    throw new Error("This table session is closed. Please ask the waiter to reset or approve the table again.");
  }

  const now = new Date();
  await admin
    .from("table_sessions")
    .update({
      last_seen_at: now.toISOString(),
      idle_expires_at: addMinutes(now, IDLE_SESSION_MINUTES).toISOString(),
      updated_at: now.toISOString(),
    })
    .eq("id", session.id);

  return session;
}

export async function GET(request: NextRequest) {
  try {
    const admin = adminClient();
    const businessId = cleanText(request.nextUrl.searchParams.get("businessId"));
    const username = cleanText(request.nextUrl.searchParams.get("username"));
    const tableNumber = cleanTable(request.nextUrl.searchParams.get("table"));

    const business = await findBusiness(admin, businessId, username);
    const guests = await fetchGuests(admin, business.id, tableNumber);

    return NextResponse.json(
      { guests, table: tableNumber },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load seated guests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = adminClient();
    const body = await request.json();

    const businessId = cleanText(body.businessId);
    const username = cleanText(body.username);
    const tableNumber = cleanTable(body.table);
    const guestName = cleanGuestName(body.guestName);
    const sessionToken = cleanToken(body.sessionToken);

    if (!guestName) return NextResponse.json({ error: "Guest name is required" }, { status: 400 });

    const business = await findBusiness(admin, businessId, username);
    const session = await requireJoinableSession(admin, business.id, tableNumber, sessionToken);
    const existingGuests = await fetchGuests(admin, business.id, tableNumber);
    const existingGuest = existingGuests.find(
      (guest: { guest_name?: string }) => cleanGuestName(guest.guest_name).toLowerCase() === guestName.toLowerCase()
    );

    if (existingGuest?.id) {
      const { error: updateError } = await admin
        .from("table_guests")
        .update({ active: true, table_session_id: session.id, last_seen_at: new Date().toISOString() })
        .eq("id", existingGuest.id);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await admin
        .from("table_guests")
        .insert({
          business_account_id: business.id,
          auth_user_id: business.auth_user_id,
          table_session_id: session.id,
          table_number: tableNumber,
          guest_name: guestName,
          active: true,
          last_seen_at: new Date().toISOString(),
        });

      if (insertError) throw insertError;
    }

    await admin
      .from("table_sessions")
      .update({ guest_name: guestName, last_seen_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq("id", session.id);

    const guests = await fetchGuests(admin, business.id, tableNumber);

    return NextResponse.json(
      { guests, table: tableNumber },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save seated guest" },
      { status: 500 }
    );
  }
}
