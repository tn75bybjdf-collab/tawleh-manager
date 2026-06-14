import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function clean(value: string | null) {
  return String(value || "").trim();
}

const MENU_SELECT =
  "id, business_account_id, auth_user_id, category_id, category_name, item_name, item_name_ar, description, price_jod, short_code, available, available_all_day, available_from, available_to, image_url, image_path, image_thumb_url, image_full_url, option_groups, sort_order, created_at";

export async function GET(request: NextRequest) {
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Missing Supabase server environment keys" },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const businessId = clean(searchParams.get("businessId") || searchParams.get("business"));
  const username = clean(searchParams.get("username")).toLowerCase();
  const table = Math.max(1, Math.min(999, Number(searchParams.get("table") || 1)));
  const token = clean(searchParams.get("token"));

  if (!businessId && !username) {
    return NextResponse.json(
      { error: "This QR code is missing the restaurant account. Please create a fresh QR code from Tawleh Manager." },
      { status: 400 }
    );
  }

  if (businessId && !isUuid(businessId)) {
    return NextResponse.json({ error: "Invalid restaurant QR link" }, { status: 400 });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  let businessQuery = admin
    .from("business_accounts")
    .select("id, auth_user_id, username, restaurant_name, branch_name, business_type, table_count, location_count, location, locations, welcome_message, brand_color, logo_data_url");

  if (businessId) {
    businessQuery = businessQuery.eq("id", businessId);
  } else {
    businessQuery = businessQuery.eq("username", username);
  }

  const { data: business, error: businessError } = await businessQuery.maybeSingle();

  if (businessError) {
    return NextResponse.json({ error: businessError.message }, { status: 500 });
  }

  if (!business) {
    return NextResponse.json({ error: "Restaurant was not found" }, { status: 404 });
  }

  const { data: categories, error: categoryError } = await admin
    .from("menu_categories")
    .select("id, business_account_id, auth_user_id, name, name_ar, sort_order, created_at")
    .eq("business_account_id", business.id)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (categoryError) {
    return NextResponse.json({ error: categoryError.message }, { status: 500 });
  }

  const { data: menu, error: menuError } = await admin
    .from("menu_items")
    .select(MENU_SELECT)
    .eq("business_account_id", business.id)
    .or("available.eq.true,available.is.null")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (menuError) {
    return NextResponse.json({ error: menuError.message }, { status: 500 });
  }

  const { data: guests, error: guestError } = await admin
    .from("table_guests")
    .select("id, business_account_id, auth_user_id, table_number, guest_name, active, created_at, last_seen_at")
    .eq("business_account_id", business.id)
    .eq("table_number", table)
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (guestError) {
    return NextResponse.json({ error: guestError.message }, { status: 500 });
  }

  const { data: orders, error: orderError } = await admin
    .from("table_orders")
    .select("id, business_account_id, auth_user_id, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod, status, created_at")
    .eq("business_account_id", business.id)
    .eq("table_number", table)
    .order("created_at", { ascending: false });

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      business,
      categories: categories || [],
      menu: menu || [],
      guests: guests || [],
      orders: orders || [],
      table,
      token,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
