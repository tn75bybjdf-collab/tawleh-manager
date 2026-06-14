import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type PrinterPayload = {
  id?: string;
  printerName?: string;
  printerRole?: string;
  printerIp?: string;
  printerPort?: number | string;
  paperWidth?: string;
  autoPrint?: boolean;
  copies?: number | string;
  isActive?: boolean;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || "";

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, { status });
}

function getAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase service configuration");
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function getAnonClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase anon configuration");
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function normalizeUsername(value: string) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9_\-.]/g, "")
    .slice(0, 60);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function cleanPrinterName(value: unknown) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 80);
}

function cleanPrinterRole(value: unknown) {
  const clean = String(value || "kitchen").trim().toLowerCase();
  const allowed = new Set(["kitchen", "cashier", "bar", "expo", "backup"]);
  return allowed.has(clean) ? clean : "kitchen";
}

function cleanPaperWidth(value: unknown) {
  const clean = String(value || "80mm").trim().toLowerCase();
  return clean === "58mm" ? "58mm" : "80mm";
}

function cleanPrinterIp(value: unknown) {
  const clean = String(value || "").trim();
  const parts = clean.split(".");

  if (parts.length !== 4) return "";

  const valid = parts.every((part) => {
    if (!/^\d+$/.test(part)) return false;
    const number = Number(part);
    return number >= 0 && number <= 255;
  });

  return valid ? clean : "";
}

function cleanPort(value: unknown) {
  const port = Number(value || 9100);
  if (!Number.isFinite(port)) return 9100;
  return Math.max(1, Math.min(65535, Math.round(port)));
}

function cleanCopies(value: unknown) {
  const copies = Number(value || 1);
  if (!Number.isFinite(copies)) return 1;
  return Math.max(1, Math.min(10, Math.round(copies)));
}

function cleanPrinterPayload(payload: PrinterPayload) {
  const printerName = cleanPrinterName(payload.printerName);
  const printerIp = cleanPrinterIp(payload.printerIp);

  if (!printerName) {
    throw new Error("Printer name is required");
  }

  if (!printerIp) {
    throw new Error("Valid printer IP address is required. Example: 192.168.1.45");
  }

  return {
    printer_name: printerName,
    printer_role: cleanPrinterRole(payload.printerRole),
    printer_ip: printerIp,
    printer_port: cleanPort(payload.printerPort),
    paper_width: cleanPaperWidth(payload.paperWidth),
    auto_print: payload.autoPrint !== false,
    copies: cleanCopies(payload.copies),
    is_active: payload.isActive !== false,
  };
}

async function requireBusinessAccess(request: NextRequest, businessIdRaw: string, usernameRaw: string) {
  const authorization = request.headers.get("authorization") || request.headers.get("Authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    throw new Error("Login required before editing printer settings");
  }

  const anon = getAnonClient();
  const admin = getAdminClient();
  const { data: userData, error: userError } = await anon.auth.getUser(token);
  const user = userData?.user;

  if (userError || !user?.id) {
    throw new Error("Invalid login session");
  }

  const businessId = String(businessIdRaw || "").trim();
  const username = normalizeUsername(usernameRaw);

  let query = admin
    .from("business_accounts")
    .select("id, auth_user_id, username, restaurant_name, branch_name")
    .limit(1);

  if (isUuid(businessId)) {
    query = query.eq("id", businessId);
  } else if (username) {
    query = query.eq("username", username);
  } else {
    throw new Error("Business account is required");
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.id) {
    throw new Error("Business account not found");
  }

  if (String(data.auth_user_id || "") !== String(user.id)) {
    throw new Error("Not allowed to edit this business printer settings");
  }

  return {
    admin,
    userId: user.id,
    business: data,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get("businessId") || "";
    const username = searchParams.get("username") || "";
    const { admin, business } = await requireBusinessAccess(request, businessId, username);

    const { data, error } = await admin
      .from("business_printer_settings")
      .select("*")
      .eq("business_account_id", business.id)
      .order("printer_role", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return json({ printers: data || [] });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Could not load printer settings" }, 400);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { admin, userId, business } = await requireBusinessAccess(
      request,
      String(body.businessId || ""),
      String(body.username || "")
    );

    const payload = cleanPrinterPayload((body.printer || {}) as PrinterPayload);

    const { data, error } = await admin
      .from("business_printer_settings")
      .insert({
        business_account_id: business.id,
        auth_user_id: userId,
        ...payload,
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    return json({ printer: data });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Could not save printer settings" }, 400);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const printerId = String(body.printerId || body.printer?.id || "").trim();

    if (!isUuid(printerId)) {
      throw new Error("Valid printer ID is required");
    }

    const { admin, business } = await requireBusinessAccess(
      request,
      String(body.businessId || ""),
      String(body.username || "")
    );

    const payload = cleanPrinterPayload((body.printer || {}) as PrinterPayload);

    const { data, error } = await admin
      .from("business_printer_settings")
      .update({
        ...payload,
        updated_at: new Date().toISOString(),
      })
      .eq("id", printerId)
      .eq("business_account_id", business.id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    return json({ printer: data });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Could not update printer settings" }, 400);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const printerId = String(body.printerId || "").trim();

    if (!isUuid(printerId)) {
      throw new Error("Valid printer ID is required");
    }

    const { admin, business } = await requireBusinessAccess(
      request,
      String(body.businessId || ""),
      String(body.username || "")
    );

    const { error } = await admin
      .from("business_printer_settings")
      .delete()
      .eq("id", printerId)
      .eq("business_account_id", business.id);

    if (error) throw new Error(error.message);

    return json({ ok: true });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Could not delete printer settings" }, 400);
  }
}
