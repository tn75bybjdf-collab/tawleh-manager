import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type BusinessRow = {
  id: string;
  auth_user_id: string;
  username: string | null;
};

type ServiceItemPayload = {
  name?: unknown;
  nameAr?: unknown;
  icon?: unknown;
  imageUrl?: unknown;
  active?: unknown;
  sortOrder?: unknown;
};

const SERVICE_ITEM_SELECT =
  "id, business_account_id, auth_user_id, item_name, item_name_ar, short_code, image_url, active, sort_order, created_at";

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

function cleanShortCode(value: unknown, fallback = "SV") {
  return cleanText(value, fallback).replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase() || fallback;
}

function getBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
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

async function requireBusinessAccess(request: NextRequest, businessId: string, username = "") {
  const admin = adminClient();
  const business = await findBusiness(admin, businessId, username);
  const token = getBearerToken(request);

  if (token) {
    const { data: userData } = await admin.auth.getUser(token);

    if (userData.user && userData.user.id !== business.auth_user_id) {
      return {
        ok: false as const,
        response: NextResponse.json({ error: "You do not own this restaurant account" }, { status: 403 }),
      };
    }
  }

  return {
    ok: true as const,
    admin,
    business,
    userId: business.auth_user_id,
  };
}

function buildServiceItemUpdate(item: ServiceItemPayload) {
  const name = cleanText(item.name);
  const nameAr = cleanText(item.nameAr);
  const icon = cleanShortCode(item.icon, name ? name.slice(0, 2).toUpperCase() : "SV");
  const sortOrder = Number(item.sortOrder || Date.now());

  return {
    item_name: name || nameAr,
    item_name_ar: nameAr || null,
    short_code: icon,
    image_url: cleanText(item.imageUrl) || null,
    active: item.active !== false,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : Date.now(),
  };
}

async function fetchServiceItems(admin: SupabaseClient, businessId: string) {
  const { data, error } = await admin
    .from("service_request_items")
    .select(SERVICE_ITEM_SELECT)
    .eq("business_account_id", businessId)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function GET(request: NextRequest) {
  try {
    const businessId = cleanText(request.nextUrl.searchParams.get("businessId"));
    const username = cleanText(request.nextUrl.searchParams.get("username"));

    const owner = await requireBusinessAccess(request, businessId, username);
    if (!owner.ok) return owner.response;

    const serviceItems = await fetchServiceItems(owner.admin, owner.business.id);

    return NextResponse.json(
      { serviceItems },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Waiter button load failed" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const businessId = cleanText(body.businessId);
    const username = cleanText(body.username);
    const item = (body.item || {}) as ServiceItemPayload;

    const owner = await requireBusinessAccess(request, businessId, username);
    if (!owner.ok) return owner.response;

    const update = buildServiceItemUpdate(item);

    if (!update.item_name) {
      return NextResponse.json({ error: "Button name is required" }, { status: 400 });
    }

    const { data, error } = await owner.admin
      .from("service_request_items")
      .insert({
        business_account_id: owner.business.id,
        auth_user_id: owner.userId,
        ...update,
      })
      .select(SERVICE_ITEM_SELECT)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ item: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Waiter button save failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const businessId = cleanText(body.businessId);
    const username = cleanText(body.username);
    const itemId = cleanText(body.itemId);
    const item = (body.item || {}) as ServiceItemPayload;

    const owner = await requireBusinessAccess(request, businessId, username);
    if (!owner.ok) return owner.response;

    if (!itemId || !isUuid(itemId)) {
      return NextResponse.json({ error: "Invalid waiter button" }, { status: 400 });
    }

    const update = buildServiceItemUpdate(item);

    if (!update.item_name) {
      return NextResponse.json({ error: "Button name is required" }, { status: 400 });
    }

    const { data, error } = await owner.admin
      .from("service_request_items")
      .update({
        ...update,
        updated_at: new Date().toISOString(),
      })
      .eq("id", itemId)
      .eq("business_account_id", owner.business.id)
      .select(SERVICE_ITEM_SELECT)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ item: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Waiter button update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const businessId = cleanText(body.businessId);
    const username = cleanText(body.username);
    const itemId = cleanText(body.itemId);

    const owner = await requireBusinessAccess(request, businessId, username);
    if (!owner.ok) return owner.response;

    if (!itemId || !isUuid(itemId)) {
      return NextResponse.json({ error: "Invalid waiter button" }, { status: 400 });
    }

    const { error } = await owner.admin
      .from("service_request_items")
      .delete()
      .eq("id", itemId)
      .eq("business_account_id", owner.business.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Waiter button delete failed" },
      { status: 500 }
    );
  }
}
