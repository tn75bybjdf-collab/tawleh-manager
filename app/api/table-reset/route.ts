import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type BusinessRow = {
  id: string;
  auth_user_id: string;
  username: string | null;
};

function serverClient() {
  if (!supabaseUrl) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");

  const key = serviceRoleKey || anonKey;
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_ANON_KEY");

  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function usingServiceRole() {
  return Boolean(serviceRoleKey);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function cleanText(value: unknown, fallback = "") {
  return String(value ?? fallback).trim();
}

function cleanTable(value: unknown) {
  const table = Number(value || 1);
  return Math.max(1, Math.min(999, Number.isFinite(table) ? Math.floor(table) : 1));
}

function jsonError(message: string, status = 500) {
  return NextResponse.json(
    { error: message, mode: usingServiceRole() ? "service_role" : "anon_fallback" },
    { status }
  );
}

async function findBusiness(db: SupabaseClient, businessId: string, username = "", fallbackAuthUserId = "") {
  if (businessId && !isUuid(businessId)) throw new Error("Invalid business account id");

  if (!usingServiceRole() && businessId && fallbackAuthUserId) {
    return { id: businessId, auth_user_id: fallbackAuthUserId, username: username || null } as unknown as BusinessRow;
  }

  let query = db.from("business_accounts").select("id, auth_user_id, username");

  if (businessId) query = query.eq("id", businessId);
  else if (username) query = query.eq("username", username.toLowerCase());
  else throw new Error("Missing business account");

  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Restaurant account was not found");

  return data as unknown as BusinessRow;
}

export async function POST(request: NextRequest) {
  try {
    const db = serverClient();
    const body = await request.json();

    const businessId = cleanText(body.businessId);
    const authUserId = cleanText(body.authUserId);
    const username = cleanText(body.username);
    const tableNumber = cleanTable(body.table);

    if (!businessId || !isUuid(businessId)) return jsonError("Missing or invalid businessId", 400);

    const business = await findBusiness(db, businessId, username, authUserId);
    const now = new Date().toISOString();

    const { count: clearedGuests, error: guestError } = await db
      .from("table_guests")
      .update({ active: false, last_seen_at: now, updated_at: now }, { count: "exact" })
      .eq("business_account_id", business.id)
      .eq("table_number", tableNumber)
      .eq("active", true);

    if (guestError) return jsonError(`Guest reset failed: ${guestError.message}`, 500);

    const { count: clearedOrders, error: orderError } = await db
      .from("table_orders")
      .delete({ count: "exact" })
      .eq("business_account_id", business.id)
      .eq("table_number", tableNumber);

    if (orderError) return jsonError(`Order reset failed: ${orderError.message}`, 500);

    const { count: closedSessions, error: sessionError } = await db
      .from("table_sessions")
      .update({ status: "closed", closed_at: now, updated_at: now }, { count: "exact" })
      .eq("business_account_id", business.id)
      .eq("table_number", tableNumber)
      .in("status", ["pending", "active"]);

    if (sessionError && sessionError.code !== "42P01" && sessionError.code !== "42703") {
      return jsonError(`Table session reset failed: ${sessionError.message}`, 500);
    }

    const { error: printError } = await db
      .from("table_print_jobs")
      .update({ status: "cancelled", updated_at: now })
      .eq("business_account_id", business.id)
      .eq("table_number", tableNumber)
      .in("status", ["pending", "printing", "failed"]);

    if (printError && printError.code !== "42P01" && printError.code !== "42703") {
      console.warn("Table print job cancel failed", printError.message);
    }

    return NextResponse.json(
      {
        ok: true,
        mode: usingServiceRole() ? "service_role" : "anon_fallback",
        table: tableNumber,
        clearedGuests: clearedGuests || 0,
        clearedOrders: clearedOrders || 0,
        closedSessions: closedSessions || 0,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not reset table");
  }
}
