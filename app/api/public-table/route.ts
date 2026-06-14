import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type BusinessRow = {
  id: string;
  auth_user_id: string;
  username: string | null;
  restaurant_name: string | null;
  branch_name: string | null;
  business_type: string | null;
  table_count: number | null;
  location_count: number | null;
  location: string | null;
  locations: string[] | null;
  welcome_message: string | null;
  brand_color: string | null;
  logo_data_url: string | null;
};

const BUSINESS_SELECT =
  "id, auth_user_id, username, restaurant_name, branch_name, business_type, table_count, location_count, location, locations, welcome_message, brand_color, logo_data_url";

const MENU_SELECT =
  "id, business_account_id, auth_user_id, category_id, category_name, item_name, item_name_ar, description, price_jod, short_code, available, available_all_day, available_from, available_to, image_url, image_path, image_thumb_url, image_full_url, option_groups, sort_order, created_at";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function clean(value: string | null) {
  return String(value || "").trim();
}

function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

function createAdmin() {
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

async function loadBusinessById(admin: SupabaseClient, businessId: string) {
  if (!businessId) return null;

  if (!isUuid(businessId)) {
    throw new Error("Invalid restaurant QR link");
  }

  const { data, error } = await admin
    .from("business_accounts")
    .select(BUSINESS_SELECT)
    .eq("id", businessId)
    .maybeSingle();

  if (error) throw error;
  return (data || null) as BusinessRow | null;
}

async function loadBusinessByUsername(admin: SupabaseClient, username: string) {
  if (!username) return null;

  const { data, error } = await admin
    .from("business_accounts")
    .select(BUSINESS_SELECT)
    .eq("username", username.toLowerCase())
    .maybeSingle();

  if (error) throw error;
  return (data || null) as BusinessRow | null;
}

async function loadCategories(admin: SupabaseClient, businessId: string) {
  const { data, error } = await admin
    .from("menu_categories")
    .select("id, business_account_id, auth_user_id, name, name_ar, sort_order, created_at")
    .eq("business_account_id", businessId)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

async function loadMenu(admin: SupabaseClient, businessId: string) {
  const { data, error } = await admin
    .from("menu_items")
    .select(MENU_SELECT)
    .eq("business_account_id", businessId)
    .or("available.eq.true,available.is.null")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

async function loadGuests(admin: SupabaseClient, businessId: string, table: number) {
  const { data, error } = await admin
    .from("table_guests")
    .select("id, business_account_id, auth_user_id, table_number, guest_name, active, created_at, last_seen_at")
    .eq("business_account_id", businessId)
    .eq("table_number", table)
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

async function loadOrders(admin: SupabaseClient, businessId: string, table: number) {
  const { data, error } = await admin
    .from("table_orders")
    .select("id, business_account_id, auth_user_id, table_number, guest_name, item_id, item_name, quantity, price_jod, line_total_jod, status, modifiers, special_instructions, modifiers_total_jod, base_price_jod, unit_total_jod, created_at")
    .eq("business_account_id", businessId)
    .eq("table_number", table)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

async function loadServiceItems(admin: SupabaseClient, businessId: string) {
  const { data, error } = await admin
    .from("service_request_items")
    .select("id, business_account_id, auth_user_id, item_name, item_name_ar, short_code, image_url, active, sort_order, created_at")
    .eq("business_account_id", businessId)
    .eq("active", true)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error && error.code !== "42P01") throw error;
  return data || [];
}

export async function GET(request: NextRequest) {
  try {
    const admin = createAdmin();

    const searchParams = request.nextUrl.searchParams;
    const businessId = clean(searchParams.get("businessId") || searchParams.get("business"));
    const username = clean(searchParams.get("username")).toLowerCase();
    const table = Math.max(1, Math.min(999, Number(searchParams.get("table") || 1)));
    const token = clean(searchParams.get("token"));

    if (!businessId && !username) {
      return jsonError("This QR code is missing the restaurant account. Please create a fresh QR code from Tawleh Manager.", 400);
    }

    const businessById = await loadBusinessById(admin, businessId);
    const businessByUsername = username ? await loadBusinessByUsername(admin, username) : null;

    let business = businessById || businessByUsername;

    if (!business) {
      return jsonError("Restaurant was not found", 404);
    }

    let menu = await loadMenu(admin, business.id);
    let menuSource = businessById ? "businessId" : "username";

    // Multi-restaurant safety:
    // Older printed QR codes may contain a stale businessId plus the correct username.
    // If the businessId account has no menu, but the username account has menu,
    // use the username restaurant instead of showing an empty menu.
    if (!menu.length && businessByUsername && businessByUsername.id !== business.id) {
      const usernameMenu = await loadMenu(admin, businessByUsername.id);

      if (usernameMenu.length) {
        business = businessByUsername;
        menu = usernameMenu;
        menuSource = "username_fallback";
      }
    }

    const [categories, guests, orders, serviceItems] = await Promise.all([
      loadCategories(admin, business.id),
      loadGuests(admin, business.id, table),
      loadOrders(admin, business.id, table),
      loadServiceItems(admin, business.id),
    ]);

    return NextResponse.json(
      {
        business,
        categories,
        menu,
        guests,
        orders,
        serviceItems,
        table,
        token,
        menuSource,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not load table QR");
  }
}
