import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type BusinessRow = {
  id: string;
  auth_user_id: string;
  username: string | null;
};

function serverClient() {
  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  const key = serviceRoleKey || anonKey;

  if (!key) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

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

function cleanGuestName(value: unknown) {
  return cleanText(value)
    .replace(/\s+/g, " ")
    .slice(0, 40);
}

function cleanTable(value: unknown) {
  const table = Number(value || 1);
  return Math.max(1, Math.min(999, Number.isFinite(table) ? table : 1));
}

function jsonError(message: string, status = 500) {
  return NextResponse.json(
    {
      error: message,
      mode: usingServiceRole() ? "service_role" : "anon_fallback",
    },
    { status }
  );
}

async function findBusiness(
  db: SupabaseClient,
  businessId: string,
  username = "",
  fallbackAuthUserId = ""
) {
  if (businessId && !isUuid(businessId)) {
    throw new Error("Invalid business account id");
  }

  if (!usingServiceRole() && businessId && fallbackAuthUserId) {
    return {
      id: businessId,
      auth_user_id: fallbackAuthUserId,
      username: username || null,
    } as BusinessRow;
  }

  let query = db
    .from("business_accounts")
    .select("id, auth_user_id, username");

  if (businessId) {
    query = query.eq("id", businessId);
  } else if (username) {
    query = query.eq("username", username.toLowerCase());
  } else {
    throw new Error("Missing business account");
  }

  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Restaurant account was not found");

  return data as BusinessRow;
}

async function fetchGuests(db: SupabaseClient, businessId: string, tableNumber: number) {
  const { data, error } = await db
    .from("table_guests")
    .select("id, business_account_id, auth_user_id, table_number, guest_name, active, created_at, last_seen_at")
    .eq("business_account_id", businessId)
    .eq("table_number", tableNumber)
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data || [];
}

export async function GET(request: NextRequest) {
  try {
    const db = serverClient();
    const businessId = cleanText(request.nextUrl.searchParams.get("businessId"));
    const authUserId = cleanText(request.nextUrl.searchParams.get("authUserId"));
    const username = cleanText(request.nextUrl.searchParams.get("username"));
    const tableNumber = cleanTable(request.nextUrl.searchParams.get("table"));

    if (!businessId && !username) {
      return jsonError("Missing business account for seated guests", 400);
    }

    const business = await findBusiness(db, businessId, username, authUserId);
    const guests = await fetchGuests(db, business.id, tableNumber);

    return NextResponse.json(
      {
        ok: true,
        mode: usingServiceRole() ? "service_role" : "anon_fallback",
        guests,
        table: tableNumber,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not load seated guests");
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = serverClient();
    const body = await request.json();

    const businessId = cleanText(body.businessId);
    const authUserId = cleanText(body.authUserId);
    const username = cleanText(body.username);
    const tableNumber = cleanTable(body.table);
    const guestName = cleanGuestName(body.guestName);

    if (!businessId || !isUuid(businessId)) {
      return jsonError("Missing or invalid businessId. Create a fresh QR code.", 400);
    }

    if (!authUserId || !isUuid(authUserId)) {
      return jsonError("Missing restaurant owner id. Refresh the QR page.", 400);
    }

    if (!guestName) {
      return jsonError("Guest name is required", 400);
    }

    const business = await findBusiness(db, businessId, username, authUserId);
    const existingGuests = await fetchGuests(db, business.id, tableNumber);
    const existingGuest = existingGuests.find(
      (guest: { id?: string; guest_name?: string }) =>
        cleanGuestName(guest.guest_name).toLowerCase() === guestName.toLowerCase()
    );

    if (existingGuest?.id) {
      const { error } = await db
        .from("table_guests")
        .update({
          active: true,
          last_seen_at: new Date().toISOString(),
        })
        .eq("id", existingGuest.id)
        .eq("business_account_id", business.id)
        .eq("table_number", tableNumber);

      if (error) {
        return jsonError(`Supabase guest update failed: ${error.message}`, 500);
      }
    } else {
      const { error } = await db
        .from("table_guests")
        .insert({
          business_account_id: business.id,
          auth_user_id: business.auth_user_id || authUserId,
          table_number: tableNumber,
          guest_name: guestName,
          active: true,
          last_seen_at: new Date().toISOString(),
        });

      if (error) {
        return jsonError(`Supabase guest insert failed: ${error.message}`, 500);
      }
    }

    const guests = await fetchGuests(db, business.id, tableNumber);

    return NextResponse.json(
      {
        ok: true,
        mode: usingServiceRole() ? "service_role" : "anon_fallback",
        guests,
        table: tableNumber,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not save seated guest");
  }
}
