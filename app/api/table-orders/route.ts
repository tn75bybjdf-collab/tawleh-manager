import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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
  price?: unknown;
  quantity?: unknown;
};

type TableOrderInsertRow = {
  business_account_id: string;
  auth_user_id: string;
  order_ticket_id: string;
  ticket_number: number;
  table_number: number;
  guest_name: string;
  item_id: string;
  item_name: string;
  quantity: number;
  price_jod: number;
  line_total_jod: number;
  status: "New";
};

type KitchenPrintPayloadItem = {
  itemId: string;
  itemName: string;
  quantity: number;
  priceJod: number;
  lineTotalJod: number;
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

function normalizeUsername(value: unknown) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "");
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

function money(value: number) {
  return Math.round(Number(value || 0) * 1000) / 1000;
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
    query = query.eq("username", normalizeUsername(username));
  } else {
    throw new Error("Missing business account");
  }

  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Restaurant account was not found");

  return data as BusinessRow;
}

async function nextTicketNumber(db: SupabaseClient) {
  const { data, error } = await db.rpc("next_table_order_ticket_number");

  if (error) {
    throw new Error(`Ticket number failed: ${error.message}`);
  }

  const value = Number(data);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error("Ticket number failed");
  }

  return value;
}

function buildKitchenPayload(args: {
  business: BusinessRow;
  orderTicketId: string;
  ticketNumber: number;
  tableNumber: number;
  guestName: string;
  items: KitchenPrintPayloadItem[];
}) {
  const subtotal = money(args.items.reduce((sum, item) => sum + item.lineTotalJod, 0));

  return {
    kind: "kitchen_ticket",
    version: 1,
    restaurantUsername: args.business.username || "restaurant",
    businessAccountId: args.business.id,
    authUserId: args.business.auth_user_id,
    orderTicketId: args.orderTicketId,
    ticketNumber: args.ticketNumber,
    tableNumber: args.tableNumber,
    guestName: args.guestName,
    subtotalJod: subtotal,
    currency: "JOD",
    createdAt: new Date().toISOString(),
    items: args.items,
    receiptText: [
      "ZUWAR",
      "KITCHEN TICKET",
      `Ticket #${args.ticketNumber}`,
      `Table ${args.tableNumber}`,
      `Guest: ${args.guestName}`,
      "------------------------------",
      ...args.items.map((item) => `${item.quantity}x ${item.itemName}`),
      "------------------------------",
    ].join("\n"),
  };
}

async function createKitchenPrintJob(
  db: SupabaseClient,
  args: {
    business: BusinessRow;
    orderTicketId: string;
    ticketNumber: number;
    tableNumber: number;
    guestName: string;
    items: KitchenPrintPayloadItem[];
  }
) {
  const payload = buildKitchenPayload(args);

  const { data, error } = await db
    .from("table_print_jobs")
    .insert({
      business_account_id: args.business.id,
      auth_user_id: args.business.auth_user_id,
      order_ticket_id: args.orderTicketId,
      ticket_number: args.ticketNumber,
      table_number: args.tableNumber,
      guest_name: args.guestName,
      job_type: "kitchen_ticket",
      printer_target: "kitchen",
      status: "pending",
      payload,
    })
    .select("id, business_account_id, order_ticket_id, ticket_number, table_number, guest_name, job_type, printer_target, status, payload, created_at")
    .single();

  if (error) throw error;

  return data;
}

async function fetchOrders(db: SupabaseClient, businessId: string, tableNumber?: number | null) {
  let query = db
    .from("table_orders")
    .select("id, business_account_id, auth_user_id, order_ticket_id, ticket_number, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod, status, kitchen_print_job_id, customer_bill_print_job_id, kitchen_printed_at, customer_bill_printed_at, print_note, created_at")
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

    const orderTicketId = randomUUID();
    const ticketNumber = await nextTicketNumber(db);

    const printItems: KitchenPrintPayloadItem[] = [];

    const rows: TableOrderInsertRow[] = items
      .map((item): TableOrderInsertRow | null => {
        const itemId = cleanText(item.itemId);
        const itemName = cleanText(item.itemName, "Menu item");
        const quantity = cleanQuantity(item.quantity);
        const price = cleanPrice(item.price);
        const lineTotal = money(price * quantity);

        if (!itemName || price <= 0) return null;

        printItems.push({
          itemId,
          itemName,
          quantity,
          priceJod: price,
          lineTotalJod: lineTotal,
        });

        return {
          business_account_id: business.id,
          auth_user_id: business.auth_user_id,
          order_ticket_id: orderTicketId,
          ticket_number: ticketNumber,
          table_number: tableNumber,
          guest_name: guestName,
          item_id: itemId,
          item_name: itemName,
          quantity,
          price_jod: price,
          line_total_jod: lineTotal,
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
      .select("id, business_account_id, auth_user_id, order_ticket_id, ticket_number, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod, status, kitchen_print_job_id, customer_bill_print_job_id, kitchen_printed_at, customer_bill_printed_at, print_note, created_at");

    if (error) {
      return jsonError(`Supabase insert failed: ${error.message}`, 500);
    }

    let printJob = null;
    let printWarning = "";

    try {
      printJob = await createKitchenPrintJob(db, {
        business,
        orderTicketId,
        ticketNumber,
        tableNumber,
        guestName,
        items: printItems,
      });

      await db
        .from("table_orders")
        .update({
          kitchen_print_job_id: printJob.id,
        })
        .eq("business_account_id", business.id)
        .eq("order_ticket_id", orderTicketId);
    } catch (printError) {
      printWarning = printError instanceof Error ? printError.message : "Could not create print job";

      await db
        .from("table_orders")
        .update({
          print_note: `Print job warning: ${printWarning}`,
        })
        .eq("business_account_id", business.id)
        .eq("order_ticket_id", orderTicketId);
    }

    return NextResponse.json(
      {
        ok: true,
        mode: usingServiceRole() ? "service_role" : "anon_fallback",
        orderTicketId,
        ticketNumber,
        printJob,
        printWarning,
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
      .select("id, business_account_id, auth_user_id, order_ticket_id, ticket_number, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod, status, kitchen_print_job_id, customer_bill_print_job_id, kitchen_printed_at, customer_bill_printed_at, print_note, created_at")
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
