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

type OrderItemPayload = {
  itemId?: unknown;
  itemName?: unknown;
  basePrice?: unknown;
  price?: unknown;
  addonsTotal?: unknown;
  quantity?: unknown;
  specialInstructions?: unknown;
  modifiers?: unknown;
};

type OrderModifierPayload = {
  groupId?: unknown;
  groupName?: unknown;
  choiceId?: unknown;
  choiceName?: unknown;
  price?: unknown;
  parentChoiceId?: unknown;
  parentChoiceName?: unknown;
  level?: unknown;
};

type TableOrderInsertRow = {
  business_account_id: string;
  auth_user_id: string;
  table_number: number;
  guest_name: string;
  item_id: string;
  item_name: string;
  quantity: number;
  price_jod: number;
  line_total_jod: number;
  special_instructions: string | null;
  modifiers: OrderModifierPayload[];
  modifiers_total_jod: number;
  base_price_jod: number;
  unit_total_jod: number;
  status: "New";
};

function isTableOrderInsertRow(row: TableOrderInsertRow | null): row is TableOrderInsertRow {
  return row !== null;
}

const allowedStatuses = new Set(["New", "Preparing", "Ready", "Picked up", "Served"]);

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

function cleanPrice(value: unknown) {
  const price = Number(value || 0);
  return Number.isFinite(price) ? Math.round(price * 1000) / 1000 : 0;
}

function cleanQuantity(value: unknown) {
  const quantity = Number(value || 1);
  return Math.max(1, Math.min(99, Number.isFinite(quantity) ? Math.floor(quantity) : 1));
}

function cleanSpecialInstructions(value: unknown) {
  const text = cleanText(value).replace(/\s+/g, " ").slice(0, 240);
  return text || null;
}

function cleanModifiers(value: unknown): OrderModifierPayload[] {
  let raw = value;

  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      raw = [];
    }
  }

  if (!Array.isArray(raw)) return [];

  return raw
    .map((modifier): OrderModifierPayload | null => {
      const source = modifier && typeof modifier === "object" ? (modifier as Record<string, unknown>) : {};
      const choiceName = cleanText(source.choiceName);
      const groupName = cleanText(source.groupName, "Option");
      const parentChoiceName = cleanText(source.parentChoiceName);
      const price = cleanPrice(source.price || 0);
      const level = Number(source.level || 0);

      if (!choiceName) return null;

      return {
        groupId: cleanText(source.groupId),
        groupName,
        choiceId: cleanText(source.choiceId),
        choiceName,
        price: Math.max(0, price),
        parentChoiceId: cleanText(source.parentChoiceId),
        parentChoiceName,
        level: Number.isFinite(level) ? Math.max(0, Math.floor(level)) : 0,
      };
    })
    .filter((modifier): modifier is OrderModifierPayload => Boolean(modifier));
}

function modifierTotal(modifiers: OrderModifierPayload[]) {
  return Math.round(modifiers.reduce((sum, modifier) => sum + cleanPrice(modifier.price || 0), 0) * 1000) / 1000;
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

async function fetchOrders(db: SupabaseClient, businessId: string, tableNumber?: number | null) {
  let query = db
    .from("table_orders")
    .select("id, business_account_id, auth_user_id, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod, special_instructions, modifiers, modifiers_total_jod, base_price_jod, unit_total_jod, status, created_at")
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
    const db = serverClient();
    const businessId = cleanText(request.nextUrl.searchParams.get("businessId"));
    const username = cleanText(request.nextUrl.searchParams.get("username"));
    const authUserId = cleanText(request.nextUrl.searchParams.get("authUserId"));
    const wantsAll = request.nextUrl.searchParams.get("all") === "1";
    const tableNumber = wantsAll ? null : cleanTable(request.nextUrl.searchParams.get("table"));

    if (!businessId && !username) {
      return jsonError("Missing business account for kitchen order lookup", 400);
    }

    const business = await findBusiness(db, businessId, username, authUserId);
    const orders = await fetchOrders(db, business.id, tableNumber);

    return NextResponse.json(
      {
        ok: true,
        mode: usingServiceRole() ? "service_role" : "anon_fallback",
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
    return jsonError(error instanceof Error ? error.message : "Could not load orders");
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
    const items = Array.isArray(body.items) ? (body.items as OrderItemPayload[]) : [];

    if (!businessId || !isUuid(businessId)) {
      return jsonError("Missing or invalid businessId. Create a fresh QR code.", 400);
    }

    if (!guestName) {
      return jsonError("Guest name is required", 400);
    }

    if (!items.length) {
      return jsonError("At least one item is required", 400);
    }

    const business = await findBusiness(db, businessId, username, authUserId);

    if (!business.auth_user_id) {
      return jsonError("Missing auth_user_id for restaurant. Refresh the QR page.", 400);
    }

    const rows: TableOrderInsertRow[] = items
      .map((item): TableOrderInsertRow | null => {
        const itemId = cleanText(item.itemId);
        const itemName = cleanText(item.itemName, "Menu item");
        const quantity = cleanQuantity(item.quantity);
        const basePrice = cleanPrice(item.basePrice || item.price);
        const modifiers = cleanModifiers(item.modifiers || []);
        const modifiersTotal = item.addonsTotal === undefined
          ? modifierTotal(modifiers)
          : cleanPrice(item.addonsTotal);
        const price = cleanPrice(item.price || basePrice + modifiersTotal);
        const unitTotal = Math.round(price * 1000) / 1000;

        if (!itemName || unitTotal <= 0) return null;

        return {
          business_account_id: business.id,
          auth_user_id: business.auth_user_id,
          table_number: tableNumber,
          guest_name: guestName,
          item_id: itemId,
          item_name: itemName,
          quantity,
          price_jod: unitTotal,
          line_total_jod: Math.round(unitTotal * quantity * 1000) / 1000,
          special_instructions: cleanSpecialInstructions(item.specialInstructions),
          modifiers,
          modifiers_total_jod: Math.max(0, modifiersTotal),
          base_price_jod: basePrice,
          unit_total_jod: unitTotal,
          status: "New",
        };
      })
      .filter(isTableOrderInsertRow);

    if (!rows.length) {
      return jsonError("No valid items to send", 400);
    }

    const { data: orders, error } = await db
      .from("table_orders")
      .insert(rows)
      .select("id, business_account_id, auth_user_id, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod, special_instructions, modifiers, modifiers_total_jod, base_price_jod, unit_total_jod, status, created_at");

    if (error) {
      return jsonError(`Supabase insert failed: ${error.message}`, 500);
    }

    return NextResponse.json(
      {
        ok: true,
        mode: usingServiceRole() ? "service_role" : "anon_fallback",
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
    return jsonError(error instanceof Error ? error.message : "Could not send order");
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const db = serverClient();
    const body = await request.json();

    const businessId = cleanText(body.businessId);
    const authUserId = cleanText(body.authUserId);
    const username = cleanText(body.username);
    const orderId = cleanText(body.orderId);
    const status = cleanText(body.status, "New");

    if (!businessId || !isUuid(businessId)) {
      return jsonError("Missing or invalid businessId", 400);
    }

    if (!orderId || !isUuid(orderId)) {
      return jsonError("Invalid order", 400);
    }

    if (!allowedStatuses.has(status)) {
      return jsonError("Invalid order status", 400);
    }

    const business = await findBusiness(db, businessId, username, authUserId);

    const { data: order, error } = await db
      .from("table_orders")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .eq("business_account_id", business.id)
      .select("id, business_account_id, auth_user_id, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod, special_instructions, modifiers, modifiers_total_jod, base_price_jod, unit_total_jod, status, created_at")
      .single();

    if (error) {
      return jsonError(`Supabase update failed: ${error.message}`, 500);
    }

    return NextResponse.json(
      {
        ok: true,
        mode: usingServiceRole() ? "service_role" : "anon_fallback",
        order,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not update order");
  }
}
