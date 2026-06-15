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
    throw new Error(
      "Missing Supabase server environment variables. Check SUPABASE_SERVICE_ROLE_KEY in Vercel."
    );
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function cleanText(value: unknown, fallback = "") {
  return String(value ?? fallback).trim();
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

function jsonError(message: string, status = 500, detail?: unknown) {
  return NextResponse.json(
    {
      ok: false,
      error: message,
      detail:
        typeof detail === "string"
          ? detail
          : detail && typeof detail === "object" && "message" in detail
            ? String((detail as { message?: unknown }).message || "")
            : undefined,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

function getPrinterRole(job: Record<string, unknown>) {
  const target = cleanText(job.printer_target || job.printerTarget).toLowerCase();
  const type = cleanText(job.job_type || job.jobType).toLowerCase();

  if (target.includes("cashier") || target.includes("receipt") || target.includes("bill")) return "cashier";
  if (type.includes("bill") || type.includes("receipt")) return "cashier";
  if (target.includes("bar")) return "bar";
  if (target.includes("expo")) return "expo";
  if (target.includes("backup")) return "backup";

  return "kitchen";
}

function normalizePayload(job: Record<string, unknown>) {
  const payload =
    job.payload && typeof job.payload === "object"
      ? (job.payload as Record<string, unknown>)
      : {};

  const items = Array.isArray(payload.items) ? payload.items : [];

  const normalizedItems = items.map((raw) => {
    const item = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};

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
    tableLabel: cleanText((payload as Record<string, unknown>).tableLabel || payload.table_label || (job as Record<string, unknown>).table_label || (job as Record<string, unknown>).tableLabel || ""),
    tableDisplayName: cleanText((payload as Record<string, unknown>).tableDisplayName || (payload as Record<string, unknown>).locationName || (payload as Record<string, unknown>).tableLabel || payload.table_label || (job as Record<string, unknown>).table_label || (job as Record<string, unknown>).tableLabel || ""),
    guestName: cleanText(payload.guestName || job.guest_name || job.guestName || "Guest"),
    ticketNumber: Number(payload.ticketNumber || job.ticket_number || job.ticketNumber || 0),
    totalJod: Number(payload.totalJod || payload.total_jod || payload.subtotalJod || 0),
    receiptText: cleanText(payload.receiptText),
  };
}

function normalizeJob(job: Record<string, unknown>) {
  const payload = normalizePayload(job);
  const printerRole = getPrinterRole(job);

  return {
    id: cleanText(job.id),
    businessAccountId: cleanText(job.business_account_id || job.businessAccountId),
    tableNumber: Number(job.table_number || job.tableNumber || payload.tableNumber || 0),
    tableLabel: cleanText((job as Record<string, unknown>).table_label || (job as Record<string, unknown>).tableLabel || (payload as Record<string, unknown>).tableLabel || (payload as Record<string, unknown>).table_label || ""),
    tableDisplayName: cleanText((payload as Record<string, unknown>).tableDisplayName || (payload as Record<string, unknown>).locationName || (job as Record<string, unknown>).table_label || (job as Record<string, unknown>).tableLabel || (payload as Record<string, unknown>).tableLabel || (payload as Record<string, unknown>).table_label || ""),
    guestName: cleanText(job.guest_name || job.guestName || payload.guestName || "Guest"),
    jobType: cleanText(job.job_type || job.jobType || "kitchen_ticket"),
    type: printerRole,
    printerRole,
    printer_role: printerRole,
    printerTarget: cleanText(job.printer_target || job.printerTarget || printerRole),
    status: cleanText(job.status || "pending"),
    attemptCount: Number(job.attempt_count || job.attemptCount || 0),
    createdAt: cleanText(job.created_at || job.createdAt),
    payload,
  };
}

async function getBusinessByBridgeToken(client: ReturnType<typeof db>, bridgeToken: string) {
  if (!bridgeToken || bridgeToken.length < 24) {
    throw new Error("Missing or invalid bridge token.");
  }

  const { data, error } = await client
    .from("business_accounts")
    .select("id, username, restaurant_name, branch_name, print_bridge_token")
    .eq("print_bridge_token", bridgeToken)
    .maybeSingle();

  if (error) {
    throw new Error(`Business token lookup failed: ${error.message}`);
  }

  if (!data) {
    throw new Error("Bridge token was not found.");
  }

  return data as unknown as {
    id: string;
    username: string | null;
    restaurant_name: string | null;
    branch_name: string | null;
    print_bridge_token: string;
  };
}

async function safeUpdateJobStatus(
  client: ReturnType<typeof db>,
  businessAccountId: string,
  jobId: string,
  status: "pending" | "printing" | "printed" | "failed",
  message = ""
) {
  // Keep this update minimal because your table_print_jobs schema may not have
  // printed_at, updated_at, last_error, etc.
  const patch: Record<string, unknown> = {
    status,
  };

  if (status === "printing" || status === "failed") {
    // attempt_count is confirmed from your SQL output.
    const { data: existing } = await client
      .from("table_print_jobs")
      .select("attempt_count")
      .eq("id", jobId)
      .eq("business_account_id", businessAccountId)
      .maybeSingle();

    const currentAttempt = Number((existing as { attempt_count?: unknown } | null)?.attempt_count || 0);
    patch.attempt_count = currentAttempt + 1;
  }

  const { error } = await client
    .from("table_print_jobs")
    .update(patch)
    .eq("id", jobId)
    .eq("business_account_id", businessAccountId);

  if (error) {
    throw new Error(`Could not update print job ${jobId} to ${status}: ${error.message}`);
  }
}

export async function GET(request: NextRequest) {
  try {
    const client = db();
    const bridgeToken = cleanText(request.nextUrl.searchParams.get("bridgeToken"));
    const limit = Math.max(1, Math.min(25, Number(request.nextUrl.searchParams.get("limit") || 10)));

    const business = await getBusinessByBridgeToken(client, bridgeToken);

    // IMPORTANT:
    // This select only uses columns confirmed by your Supabase query:
    // id, business_account_id, table_number, guest_name, job_type,
    // printer_target, status, attempt_count, payload, created_at
    const { data, error } = await client
      .from("table_print_jobs")
      .select(
        "id, business_account_id, table_number, table_label, guest_name, job_type, printer_target, status, attempt_count, payload, created_at"
      )
      .eq("business_account_id", business.id)
      .in("status", ["pending", "failed"])
      .lt("attempt_count", 5)
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(`Print job lookup failed: ${error.message}`);
    }

    const jobs = ((data || []) as unknown as Record<string, unknown>[]).map(normalizeJob);

    // Mark as printing so multiple bridge apps do not grab the same jobs.
    for (const job of jobs) {
      if (isUuid(job.id)) {
        await safeUpdateJobStatus(client, business.id, job.id, "printing");
      }
    }

    return NextResponse.json(
      {
        ok: true,
        business: {
          id: business.id,
          username: business.username,
          name: business.restaurant_name || business.username || "Restaurant",
          branch: business.branch_name || "",
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
    return jsonError(
      "Could not load print bridge jobs",
      500,
      error instanceof Error ? error.message : String(error)
    );
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

    if (jobError) {
      throw new Error(`Print job verification failed: ${jobError.message}`);
    }

    if (!job) {
      return jsonError("Print job was not found for this bridge token", 404);
    }

    if (status === "printed" || status === "done" || status === "success") {
      await safeUpdateJobStatus(client, business.id, jobId, "printed", message);
    } else if (status === "failed" || status === "error") {
      await safeUpdateJobStatus(client, business.id, jobId, "failed", message || "Printer bridge failed");
    } else if (status === "printing") {
      await safeUpdateJobStatus(client, business.id, jobId, "printing", message);
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
    return jsonError(
      "Could not update print bridge job",
      500,
      error instanceof Error ? error.message : String(error)
    );
  }
}
