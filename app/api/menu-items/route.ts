import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type MenuItemPayload = {
  name?: unknown;
  nameAr?: unknown;
  desc?: unknown;
  price?: unknown;
  icon?: unknown;
  available?: unknown;
  imageThumbUrl?: unknown;
  imageFullUrl?: unknown;
};

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

function cleanShortCode(value: unknown, fallback: string) {
  return cleanText(value, fallback).replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase() || fallback;
}

function moneyNumber(value: unknown) {
  const price = Number(value);
  return Number.isFinite(price) ? Math.round(price * 1000) / 1000 : 0;
}

function getBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

async function requireBusinessOwner(request: NextRequest, businessId: string) {
  if (!businessId || !isUuid(businessId)) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Invalid business account" }, { status: 400 }),
    };
  }

  const token = getBearerToken(request);

  if (!token) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Login again before editing menu" }, { status: 401 }),
    };
  }

  const admin = adminClient();

  const { data: userData, error: userError } = await admin.auth.getUser(token);

  if (userError || !userData.user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Login session expired. Login again." }, { status: 401 }),
    };
  }

  const { data: business, error: businessError } = await admin
    .from("business_accounts")
    .select("id, auth_user_id")
    .eq("id", businessId)
    .maybeSingle();

  if (businessError) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: businessError.message }, { status: 500 }),
    };
  }

  if (!business || business.auth_user_id !== userData.user.id) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "You do not own this restaurant account" }, { status: 403 }),
    };
  }

  return {
    ok: true as const,
    admin,
    business,
    user: userData.user,
  };
}

async function fetchMenu(admin: ReturnType<typeof adminClient>, businessId: string) {
  const { data, error } = await admin
    .from("menu_items")
    .select("id, business_account_id, auth_user_id, item_name, item_name_ar, description, price_jod, short_code, available, image_thumb_url, image_full_url, sort_order, created_at")
    .eq("business_account_id", businessId)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function GET(request: NextRequest) {
  try {
    const businessId = cleanText(request.nextUrl.searchParams.get("businessId"));
    const owner = await requireBusinessOwner(request, businessId);

    if (!owner.ok) return owner.response;

    const menu = await fetchMenu(owner.admin, businessId);

    return NextResponse.json(
      { menu },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Menu load failed" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const businessId = cleanText(body.businessId);
    const item = (body.item || {}) as MenuItemPayload;

    const owner = await requireBusinessOwner(request, businessId);
    if (!owner.ok) return owner.response;

    const itemName = cleanText(item.name);
    const itemNameAr = cleanText(item.nameAr);
    const price = moneyNumber(item.price);

    if (!itemName) {
      return NextResponse.json({ error: "English item name is required" }, { status: 400 });
    }

    if (!itemNameAr) {
      return NextResponse.json({ error: "Arabic item name is required" }, { status: 400 });
    }

    if (price <= 0) {
      return NextResponse.json({ error: "Valid item price is required" }, { status: 400 });
    }

    const { data, error } = await owner.admin
      .from("menu_items")
      .insert({
        business_account_id: businessId,
        auth_user_id: owner.user.id,
        item_name: itemName,
        item_name_ar: itemNameAr,
        description: cleanText(item.desc, "Menu item") || "Menu item",
        price_jod: price,
        short_code: cleanShortCode(item.icon, "IT"),
        available: item.available !== false,
        image_thumb_url: cleanText(item.imageThumbUrl) || null,
        image_full_url: cleanText(item.imageFullUrl) || null,
        sort_order: Date.now(),
      })
      .select("id, business_account_id, auth_user_id, item_name, item_name_ar, description, price_jod, short_code, available, image_thumb_url, image_full_url, sort_order, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ item: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Menu save failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const businessId = cleanText(body.businessId);
    const itemId = cleanText(body.itemId);
    const available = body.available !== false;

    const owner = await requireBusinessOwner(request, businessId);
    if (!owner.ok) return owner.response;

    if (!itemId || !isUuid(itemId)) {
      return NextResponse.json({ error: "Invalid menu item" }, { status: 400 });
    }

    const { error } = await owner.admin
      .from("menu_items")
      .update({
        available,
        updated_at: new Date().toISOString(),
      })
      .eq("id", itemId)
      .eq("business_account_id", businessId)
      .eq("auth_user_id", owner.user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Menu update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const businessId = cleanText(body.businessId);
    const itemId = cleanText(body.itemId);

    const owner = await requireBusinessOwner(request, businessId);
    if (!owner.ok) return owner.response;

    if (!itemId || !isUuid(itemId)) {
      return NextResponse.json({ error: "Invalid menu item" }, { status: 400 });
    }

    const { error } = await owner.admin
      .from("menu_items")
      .delete()
      .eq("id", itemId)
      .eq("business_account_id", businessId)
      .eq("auth_user_id", owner.user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Menu delete failed" },
      { status: 500 }
    );
  }
}
