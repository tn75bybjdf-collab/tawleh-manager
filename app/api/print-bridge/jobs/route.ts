import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "";

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  "";

function db() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase server environment variables");
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function jsonError(message: string, status = 500) {
  return NextResponse.json(
    { ok: false, error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

function cleanText(value: unknown, fallback = "") {
  const text = String(value ?? fallback).trim();
  return text;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function normalizeJobType(value: unknown) {
  const text = cleanText(value).toLowerCase();

  if (text === "customer_bill" || text === "receipt" || text === "cashier" || text === "bill") {
    return "customer_bill";
  }

  return "kitchen_ticket";
}

function printerRoleFromJob(job: Record<string, unknown>) {
  const target = cleanText(job.printer_target || job.printerTarget).toLowerCase();
  const type = cleanText(job.job_type || job.jobType).toLowerCase();

  if (target.includes("receipt") || target.includes("cashier") || type.includes("bill")) return "cashier";
  if (target.includes("bar")) return "bar";
  if (target.includes("expo")) return "expo";
  if (target.includes("backup")) return "backup";

  return "kitchen";
}

function normalizePayload(job: Record<string, unknown>) {
  const payload = (job.payload && typeof job.payload === "object" ? job.payload : {}) as Record<string, unknown>;
  const items = Array.isArray(payload.items) ? payload.items : [];

  const normalizedItems = items.map((raw) => {
    const item = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

    return {
      itemId: cleanText(item.itemId || item.item_id),
      itemName: cleanText(item.itemName || item.item_name || item.name || "Item"),
      name: cleanText(item.name || item.itemName || item.item_name || "Item"),
      quantity: Number(item.quantity || 1),
      priceJod: Number(item.priceJod || item.price_jod || item.price || 0),
      lineTotalJod: Number(item.lineTotalJod || item.line_total_jod || item.total || 0),
      note: cleanText(item.note || item.specialInstructions || item.special_instructions),
      specialInstructions: cleanText(item.specialInstructions || item.special_instructions || item.note),
      modifiers: Array.isArray(item.modifiers) ? item.modifiers : [],
    };
  });

  return {
    ...payload,
    items: normalizedItems,
    businessName: cleanText(payload.businessName || payload.restaurantName || "Tawleh"),
    restaurantName: cleanText(payload.restaurantName || payload.businessName || "Tawleh"),
    tableNumber: Number(payload.tableNumber || job.table_number || job.tableNumber || 0),
    guestName: cleanText(payload.guestName || job.guest_name || job.guestName || "Guest"),
    ticketNumber: Number(payload.ticketNumber || job.ticket_number || job.ticketNumber || 0),
    totalJod: Number(payload.totalJod || payload.total_jod || payload.subtotalJod || 0),
    receiptText: cleanText(payload.receiptText),
  };
}

function normalizeJob(job: Record<string, unknown>) {
  const payload = normalizePayload(job);
  const printerRole = printerRoleFromJob(job);

  return {
    id: cleanText(job.id),
    businessAccountId: cleanText(job.business_account_id || job.businessAccountId),
    orderTicketId: cleanText(job.order_ticket_id || job.orderTicketId),
    ticketNumber: Number(job.ticket_number || job.ticketNumber || payload.ticketNumber || 0),
    tableNumber: Number(job.table_number || job.tableNumber || payload.tableNumber || 0),
    guestName: cleanText(job.guest_name || job.guestName || payload.guestName || "Guest"),
    jobType: normalizeJobType(job.job_type || job.jobType),
    type: printerRole,
    printerRole,
    printer_role: printerRole,
    printerTarget: cleanText(job.printer_target || job.printerTarget),
    status: cleanText(job.status),
    attemptCount: Number(job.attempt_count || job.attemptCount || 0),
    createdAt: cleanText(job.created_at || job.createdAt),
    payload,
  };
}

async function getBusinessByBridgeToken(client: ReturnType<typeof db>, bridgeToken: string) {
  if (!bridgeToken || bridgeToken.length < 24) {
    throw new Error("Missing or invalid bridge token");
  }

  const { data, error } = await client
    .from("business_accounts")
    .select("id, auth_user_id, username, business_name, restaurant_name, print_bridge_token")
    .eq("print_bridge_token", bridgeToken)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Bridge token was not found");

  return data as unknown as {
    id: string;
    auth_user_id: string | null;
    username: string | null;
    business_name?: string | null;
    restaurant_name?: string | null;
    print_bridge_token: string;
  };
}

async function markPrinted(client: ReturnType<typeof db>, jobId: string) {
  const rpc = await client.rpc("mark_table_print_job_printed", {
    p_job_id: jobId,
  });

  if (!rpc.error) return;

  const fallback = await client
    .from("table_print_jobs")
    .update({
      status: "printed",
      printed_at: new Date().toISOString(),
      last_error: null,
    })
    .eq("id", jobId);

  if (fallback.error) throw fallback.error;
}

async function markFailed(client: ReturnType<typeof db>, jobId: string, message: string) {
  const rpc = await client.rpc("mark_table_print_job_failed", {
    p_job_id: jobId,
    p_error: message || "Print failed",
  });

  if (!rpc.error) return;

  const fallback = await client
    .from("table_print_jobs")
    .update({
      status: "failed",
      last_error: message || "Print failed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId);

  if (fallback.error) throw fallback.error;
}

export async function GET(request: NextRequest) {
  try {
    const client = db();
    const bridgeToken = cleanText(request.nextUrl.searchParams.get("bridgeToken"));
    const limit = Math.max(1, Math.min(25, Number(request.nextUrl.searchParams.get("limit") || 10)));

    const business = await getBusinessByBridgeToken(client, bridgeToken);

    const { data, error } = await client
      .from("table_print_jobs")
      .select(
        "id, business_account_id, auth_user_id, order_ticket_id, ticket_number, table_number, guest_name, job_type, printer_target, status, payload, attempt_count, printed_at, last_error, created_at, updated_at"
      )
      .eq("business_account_id", business.id)
      .in("status", ["pending", "failed"])
      .lt("attempt_count", 5)
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) throw error;

    const jobs = ((data || []) as unknown as Record<string, unknown>[]).map(normalizeJob);

    if (jobs.length) {
      const ids = jobs.map((job) => job.id).filter(isUuid);

      if (ids.length) {
        await client
          .from("table_print_jobs")
          .update({
            status: "printing",
            updated_at: new Date().toISOString(),
          })
          .in("id", ids)
          .eq("business_account_id", business.id);
      }
    }

    return NextResponse.json(
      {
        ok: true,
        business: {
          id: business.id,
          username: business.username,
          name: business.business_name || business.restaurant_name || business.username || "Restaurant",
        },
        jobs,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not load print bridge jobs", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = db();
    const bridgeToken = cleanText(request.nextUrl.searchParams.get("bridgeToken"));
    const body = await request.json();

    const business = await getBusinessByBridgeToken(client, bridgeToken);

    const jobId = cleanText(body.jobId);
    const status = cleanText(body.status || body.action).toLowerCase();
    const message = cleanText(body.message || body.error || "");

    if (!jobId || !isUuid(jobId)) {
      return jsonError("Invalid print job id", 400);
    }

    const { data: job, error: jobError } = await client
      .from("table_print_jobs")
      .select("id, business_account_id")
      .eq("id", jobId)
      .eq("business_account_id", business.id)
      .maybeSingle();

    if (jobError) throw jobError;
    if (!job) {
      return jsonError("Print job was not found for this bridge token", 404);
    }

    if (status === "printed" || status === "done" || status === "success") {
      await markPrinted(client, jobId);
    } else if (status === "failed" || status === "error") {
      await markFailed(client, jobId, message || "Printer bridge failed");
    } else if (status === "printing") {
      const { error } = await client
        .from("table_print_jobs")
        .update({
          status: "printing",
          updated_at: new Date().toISOString(),
        })
        .eq("id", jobId)
        .eq("business_account_id", business.id);

      if (error) throw error;
    } else {
      return jsonError("Invalid print job status", 400);
    }

    return NextResponse.json(
      {
        ok: true,
        jobId,
        status,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not update print bridge job", 500);
  }
}
