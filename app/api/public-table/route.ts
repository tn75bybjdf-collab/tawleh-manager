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
  service_status: string | null;
  service_expires_at: string | null;
  service_payment_due_date: string | null;
  service_balance_due_jod: number | string | null;
  service_suspended_reason: string | null;
};

const BUSINESS_SELECT =
  "id, auth_user_id, username, restaurant_name, branch_name, business_type, table_count, location_count, location, locations, welcome_message, brand_color, logo_data_url, service_status, service_expires_at, service_payment_due_date, service_balance_due_jod, service_suspended_reason";

const MENU_SELECT =
  "id, business_account_id, auth_user_id, category_id, category_name, item_name, item_name_ar, description, price_jod, short_code, available, available_all_day, available_from, available_to, image_url, image_path, image_thumb_url, image_full_url, option_groups, sort_order, created_at";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function clean(value: string | null) {
  return String(value || "").trim();
}

function slugify(value: string) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueBusinesses(input: Array<BusinessRow | null | undefined>) {
  const seen = new Set<string>();
  const output: BusinessRow[] = [];

  input.forEach((business) => {
    if (!business?.id || seen.has(business.id)) return;
    seen.add(business.id);
    output.push(business);
  });

  return output;
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

function todayDateOnly() {
  return new Date().toISOString().slice(0, 10);
}

function isBusinessSuspended(business: BusinessRow) {
  const status = String(business.service_status || "active").toLowerCase();
  const expiresAt = String(business.service_expires_at || "").slice(0, 10);
  const expired = Boolean(expiresAt && expiresAt < todayDateOnly());

  return status === "suspended" || expired;
}

function suspensionMessage(business: BusinessRow) {
  const custom = String(business.service_suspended_reason || "").trim();

  if (custom) return custom;

  const due = Number(business.service_balance_due_jod || 0);
  const dueText = due > 0 ? ` Amount due: ${due.toFixed(2)} JOD.` : "";
  const dateText = business.service_payment_due_date ? ` Payment due date: ${business.service_payment_due_date}.` : "";

  return `Subscription expired. Please make payment to restore service.${dueText}${dateText}`;
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

async function loadBusinessCandidatesByRestaurantSlug(admin: SupabaseClient, restaurantSlug: string, username: string) {
  const slug = slugify(restaurantSlug);
  const words = slug.split("-").filter((word) => word.length >= 3);

  if (!slug && !username) return [];

  const { data, error } = await admin
    .from("business_accounts")
    .select(BUSINESS_SELECT)
    .limit(250);

  if (error) throw error;

  return ((data || []) as BusinessRow[])
    .map((business) => {
      const businessUsername = slugify(business.username || "");
      const restaurantNameSlug = slugify(business.restaurant_name || "");
      const branchNameSlug = slugify(business.branch_name || "");
      const combined = `${restaurantNameSlug}-${branchNameSlug}`;
      let score = 0;

      if (username && businessUsername === username) score += 1000;
      if (businessUsername && slug.includes(businessUsername)) score += 400;
      if (restaurantNameSlug && slug.includes(restaurantNameSlug)) score += 250;
      if (combined && slug.includes(combined)) score += 300;
      if (words.some((word) => businessUsername === word)) score += 180;
      if (words.some((word) => restaurantNameSlug.split("-").includes(word))) score += 80;

      return { business, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.business);
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

async function loadMenu(admin: SupabaseClient, businessId: string, includeUnavailable = false) {
  let query = admin
    .from("menu_items")
    .select(MENU_SELECT)
    .eq("business_account_id", businessId)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (!includeUnavailable) {
    query = query.or("available.eq.true,available.is.null");
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

async function loadBestBusinessAndMenu(admin: SupabaseClient, candidates: BusinessRow[]) {
  const unique = uniqueBusinesses(candidates);

  for (const business of unique) {
    const menu = await loadMenu(admin, business.id, false);

    if (menu.length) {
      return {
        business,
        menu,
        menuSource: `available:${business.username || business.id}`,
      };
    }
  }

  for (const business of unique) {
    const menu = await loadMenu(admin, business.id, true);

    if (menu.length) {
      return {
        business,
        menu,
        menuSource: `all_items:${business.username || business.id}`,
      };
    }
  }

  const fallbackBusiness = unique[0] || null;

  return {
    business: fallbackBusiness,
    menu: fallbackBusiness ? await loadMenu(admin, fallbackBusiness.id, true) : [],
    menuSource: "empty",
  };
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
    const restaurantSlug = clean(searchParams.get("restaurant")).toLowerCase();
    const table = Math.max(1, Math.min(999, Number(searchParams.get("table") || 1)));
    const token = clean(searchParams.get("token"));

    if (!businessId && !username && !restaurantSlug) {
      return jsonError("This QR code is missing the restaurant account. Please create a fresh QR code from Tawleh Manager.", 400);
    }

    const businessById = await loadBusinessById(admin, businessId);
    const businessByUsername = username ? await loadBusinessByUsername(admin, username) : null;
    const slugBusinesses = await loadBusinessCandidatesByRestaurantSlug(admin, restaurantSlug, username);

    const resolved = await loadBestBusinessAndMenu(admin, [
      businessById,
      businessByUsername,
      ...slugBusinesses,
    ]);

    const business = resolved.business;

    if (!business) {
      return jsonError("Restaurant was not found", 404);
    }

    const suspended = isBusinessSuspended(business);

    const [categories, guests, orders, serviceItems] = suspended
      ? [[], [], [], []]
      : await Promise.all([
          loadCategories(admin, business.id),
          loadGuests(admin, business.id, table),
          loadOrders(admin, business.id, table),
          loadServiceItems(admin, business.id),
        ]);

    return NextResponse.json(
      {
        business,
        categories,
        menu: suspended ? [] : resolved.menu,
        guests,
        orders,
        serviceItems,
        table,
        token,
        menuSource: resolved.menuSource,
        suspended,
        suspensionMessage: suspended ? "Subscription expired. Please make payment to restore service." : "",
        paymentDueDate: business.service_payment_due_date || "",
        balanceDueJod: Number(business.service_balance_due_jod || 0),
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
