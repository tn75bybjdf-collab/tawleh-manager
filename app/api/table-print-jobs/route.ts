import { createClient, type SupabaseClient } from "@supabase/supabase-js";
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

type TableOrderRow = {
  order_ticket_id: string;
  ticket_number: number;
  table_number: number;
  guest_name: string;
  item_id: string;
  item_name: string;
  quantity: number;
  price_jod: number;
  line_total_jod: number;
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

function normalizeUsername(value: unknown) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "");
}

function cleanInteger(value: unknown, fallback = 0) {
  const number = Number(value ?? fallback);
  return Number.isFinite(number) ? Math.floor(number) : fallback;
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

function buildPayloadFromOrders(args: {
  business: BusinessRow;
  orderTicketId: string;
  ticketNumber: number;
  tableNumber: number;
  guestName: string;
  orders: TableOrderRow[];
  jobType: "kitchen_ticket" | "customer_bill";
}) {
  const items = args.orders.map((order) => ({
    itemId: order.item_id,
    itemName: order.item_name,
    quantity: Number(order.quantity || 0),
    priceJod: money(Number(order.price_jod || 0)),
    lineTotalJod: money(Number(order.line_total_jod || 0)),
  }));

  const subtotal = money(items.reduce((sum, item) => sum + item.lineTotalJod, 0));

  const receiptLines =
    args.jobType === "customer_bill"
      ? [
          "ZUWAR",
          "CUSTOMER BILL",
          `Ticket #${args.ticketNumber}`,
          `Table ${args.tableNumber}`,
          `Guest: ${args.guestName}`,
          "------------------------------",
          ...items.map((item) => `${item.quantity}x ${item.itemName}  ${item.lineTotalJod.toFixed(3)}`),
          "------------------------------",
          `Total: ${subtotal.toFixed(3)} JOD`,
        ]
      : [
          "ZUWAR",
          "KITCHEN TICKET",
          `Ticket #${args.ticketNumber}`,
          `Table ${args.tableNumber}`,
          `Guest: ${args.guestName}`,
          "------------------------------",
          ...items.map((item) => `${item.quantity}x ${item.itemName}`),
          "------------------------------",
        ];

  return {
    kind: args.jobType,
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
    items,
    receiptText: receiptLines.join("\n"),
  };
}

export async function GET(request: NextRequest) {
  try {
    const db = serverClient();
    const businessId = cleanText(request.nextUrl.searchParams.get("businessId"));
    const username = cleanText(request.nextUrl.searchParams.get("username"));
    const authUserId = cleanText(request.nextUrl.searchParams.get("authUserId"));
    const jobType = cleanText(request.nextUrl.searchParams.get("jobType"));
    const status = cleanText(request.nextUrl.searchParams.get("status"));
    const limit = Math.max(1, Math.min(100, cleanInteger(request.nextUrl.searchParams.get("limit"), 50)));

    if (!businessId && !username) {
      return jsonError("Missing business account for print jobs", 400);
    }

    const business = await findBusiness(db, businessId, username, authUserId);

    let query = db
      .from("table_print_jobs")
      .select("id, business_account_id, auth_user_id, order_ticket_id, ticket_number, table_number, guest_name, job_type, printer_target, status, payload, attempt_count, printed_at, last_error, created_at, updated_at")
      .eq("business_account_id", business.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (jobType) {
      query = query.eq("job_type", jobType);
    }

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(
      {
        ok: true,
        mode: usingServiceRole() ? "service_role" : "anon_fallback",
        jobs: data || [],
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not load print jobs");
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = serverClient();
    const body = await request.json();

    const businessId = cleanText(body.businessId);
    const username = cleanText(body.username);
    const authUserId = cleanText(body.authUserId);
    const orderTicketId = cleanText(body.orderTicketId);
    const jobType = cleanText(body.jobType, "kitchen_ticket") as "kitchen_ticket" | "customer_bill";

    if (!businessId && !username) {
      return jsonError("Missing business account", 400);
    }

    if (!orderTicketId || !isUuid(orderTicketId)) {
      return jsonError("Invalid ticket", 400);
    }

    if (jobType !== "kitchen_ticket" && jobType !== "customer_bill") {
      return jsonError("Invalid print job type", 400);
    }

    const business = await findBusiness(db, businessId, username, authUserId);

    const { data: orders, error: orderError } = await db
      .from("table_orders")
      .select("order_ticket_id, ticket_number, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod")
      .eq("business_account_id", business.id)
      .eq("order_ticket_id", orderTicketId)
      .order("created_at", { ascending: true });

    if (orderError) throw orderError;
    if (!orders || !orders.length) {
      return jsonError("No order rows found for that ticket", 404);
    }

    const rows = orders as TableOrderRow[];
    const first = rows[0];

    const payload = buildPayloadFromOrders({
      business,
      orderTicketId,
      ticketNumber: Number(first.ticket_number),
      tableNumber: Number(first.table_number),
      guestName: first.guest_name,
      orders: rows,
      jobType,
    });

    const { data: job, error: printError } = await db
      .from("table_print_jobs")
      .insert({
        business_account_id: business.id,
        auth_user_id: business.auth_user_id,
        order_ticket_id: orderTicketId,
        ticket_number: Number(first.ticket_number),
        table_number: Number(first.table_number),
        guest_name: first.guest_name,
        job_type: jobType,
        printer_target: jobType === "customer_bill" ? "receipt" : "kitchen",
        status: "pending",
        payload,
      })
      .select("id, business_account_id, order_ticket_id, ticket_number, table_number, guest_name, job_type, printer_target, status, payload, created_at")
      .single();

    if (printError) throw printError;

    return NextResponse.json(
      {
        ok: true,
        mode: usingServiceRole() ? "service_role" : "anon_fallback",
        job,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not create print job");
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const db = serverClient();
    const body = await request.json();

    const jobId = cleanText(body.jobId);
    const action = cleanText(body.action);
    const errorText = cleanText(body.error, "Print failed");

    if (!jobId || !isUuid(jobId)) {
      return jsonError("Invalid print job", 400);
    }

    if (action === "printed") {
      const { error } = await db.rpc("mark_table_print_job_printed", {
        p_job_id: jobId,
      });

      if (error) throw error;
    } else if (action === "failed") {
      const { error } = await db.rpc("mark_table_print_job_failed", {
        p_job_id: jobId,
        p_error: errorText,
      });

      if (error) throw error;
    } else if (action === "printing") {
      const { error } = await db
        .from("table_print_jobs")
        .update({
          status: "printing",
          attempt_count: 0,
          last_error: null,
        })
        .eq("id", jobId);

      if (error) throw error;
    } else {
      return jsonError("Invalid print action", 400);
    }

    return NextResponse.json(
      {
        ok: true,
        mode: usingServiceRole() ? "service_role" : "anon_fallback",
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not update print job");
  }
}
