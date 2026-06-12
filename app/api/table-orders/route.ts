import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type BusinessRow = {
  id: string;
  auth_user_id: string;
  username: string | null;
};

type OrderItemPayload = {
  itemId?: unknown;
  itemName?: unknown;
  price?: unknown;
  quantity?: unknown;
};

const allowedStatuses = new Set(["New", "Preparing", "Ready", "Served"]);

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
  return cleanText(value)
    .replace(/\s+/g, " ")
    .slice(0, 40);
}

function cleanTable(value: unknown) {
  const table = Number(value || 1);
  return Math.max(1, Math.min(999, Number.isFinite(table) ? table : 1));
}

function cleanPrice(value: unknown) {
  const price = Number(value || 0);
  return Number.isFinite(price) ? Math.round(price * 1000) / 1000 : 0;
}

function cleanQuantity(value: unknown) {
  const quantity = Number(value || 1);
  return Math.max(1, Math.min(99, Number.isFinite(quantity) ? Math.floor(quantity) : 1));
}

async function findBusiness(admin: SupabaseClient, businessId: string, username = "") {
  let query = admin
    .from("business_accounts")
    .select("id, auth_user_id, username");

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

  return data as BusinessRow;
}

async function fetchOrders(admin: SupabaseClient, businessId: string, tableNumber?: number | null) {
  let query = admin
    .from("table_orders")
    .select("id, business_account_id, auth_user_id, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod, status, created_at")
    .eq("business_account_id", businessId)
    .order("created_at", { ascending: false });

  if (tableNumber) {
    query = query.eq("table_number", tableNumber);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data || [];
}

export async function GET(request: NextRequest) {
  try {
    const admin = adminClient();
    const businessId = cleanText(request.nextUrl.searchParams.get("businessId"));
    const username = cleanText(request.nextUrl.searchParams.get("username"));
    const wantsAll = request.nextUrl.searchParams.get("all") === "1";
    const tableNumber = wantsAll ? null : cleanTable(request.nextUrl.searchParams.get("table"));

    const business = await findBusiness(admin, businessId, username);
    const orders = await fetchOrders(admin, business.id, tableNumber);

    return NextResponse.json(
      {
        orders,
        table: tableNumber,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load orders" },
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
    const items = Array.isArray(body.items) ? (body.items as OrderItemPayload[]) : [];

    if (!guestName) {
      return NextResponse.json({ error: "Guest name is required" }, { status: 400 });
    }

    if (!items.length) {
      return NextResponse.json({ error: "At least one item is required" }, { status: 400 });
    }

    const business = await findBusiness(admin, businessId, username);

    const rows = items
      .map((item) => {
        const itemId = cleanText(item.itemId);
        const itemName = cleanText(item.itemName, "Menu item");
        const quantity = cleanQuantity(item.quantity);
        const price = cleanPrice(item.price);

        if (!itemName || price <= 0) return null;

        return {
          business_account_id: business.id,
          auth_user_id: business.auth_user_id,
          table_number: tableNumber,
          guest_name: guestName,
          item_id: itemId,
          item_name: itemName,
          quantity,
          price_jod: price,
          line_total_jod: Math.round(price * quantity * 1000) / 1000,
          status: "New",
        };
      })
      .filter(Boolean);

    if (!rows.length) {
      return NextResponse.json({ error: "No valid items to send" }, { status: 400 });
    }

    const { data: orders, error } = await admin
      .from("table_orders")
      .insert(rows)
      .select("id, business_account_id, auth_user_id, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod, status, created_at");

    if (error) throw error;

    return NextResponse.json(
      {
        orders: orders || [],
        table: tableNumber,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not send order" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = adminClient();
    const body = await request.json();

    const businessId = cleanText(body.businessId);
    const username = cleanText(body.username);
    const orderId = cleanText(body.orderId);
    const status = cleanText(body.status, "New");

    if (!orderId || !isUuid(orderId)) {
      return NextResponse.json({ error: "Invalid order" }, { status: 400 });
    }

    if (!allowedStatuses.has(status)) {
      return NextResponse.json({ error: "Invalid order status" }, { status: 400 });
    }

    const business = await findBusiness(admin, businessId, username);

    const { data: order, error } = await admin
      .from("table_orders")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .eq("business_account_id", business.id)
      .select("id, business_account_id, auth_user_id, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod, status, created_at")
      .single();

    if (error) throw error;

    return NextResponse.json(
      { order },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update order" },
      { status: 500 }
    );
  }
}
