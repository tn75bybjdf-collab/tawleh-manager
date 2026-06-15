import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || "";

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
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

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function cleanSortOrder(value: unknown, fallback: number) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(0, Math.min(999999, Math.floor(number)));
}

async function requireRestaurantManager(request: NextRequest, businessId: string) {
  const authorization = request.headers.get("authorization") || request.headers.get("Authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    throw new Error("Restaurant login required");
  }

  if (!isUuid(businessId)) {
    throw new Error("Invalid business id");
  }

  const anon = getAnonClient();
  const admin = getAdminClient();

  const { data: userData, error: userError } = await anon.auth.getUser(token);
  const user = userData?.user;

  if (userError || !user?.id) {
    throw new Error("Invalid restaurant session");
  }

  const { data: business, error: businessError } = await admin
    .from("business_accounts")
    .select("id, auth_user_id, username")
    .eq("id", businessId)
    .maybeSingle();

  if (businessError) {
    throw new Error(businessError.message);
  }

  if (!business?.id) {
    throw new Error("Business not found");
  }

  if (String(business.auth_user_id || "") !== user.id) {
    throw new Error("You are not allowed to reorder this restaurant menu");
  }

  return { admin, userId: user.id, business };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const businessId = String(body.businessId || "").trim();
    const categories = Array.isArray(body.categories) ? body.categories : [];

    if (!businessId) {
      throw new Error("businessId is required");
    }

    if (!categories.length) {
      throw new Error("No categories were sent");
    }

    const { admin } = await requireRestaurantManager(request, businessId);

    const cleanedCategories = categories
      .map((category: Record<string, unknown>, index: number) => ({
        id: String(category.id || "").trim(),
        sort_order: cleanSortOrder(category.sortOrder, (index + 1) * 10),
      }))
      .filter((category) => isUuid(category.id));

    if (!cleanedCategories.length) {
      throw new Error("No valid categories were sent");
    }

    for (const category of cleanedCategories) {
      const { error } = await admin
        .from("menu_categories")
        .update({ sort_order: category.sort_order })
        .eq("id", category.id)
        .eq("business_account_id", businessId);

      if (error) {
        throw new Error(error.message);
      }
    }

    const { data, error } = await admin
      .from("menu_categories")
      .select("id, business_account_id, auth_user_id, name, name_ar, sort_order, created_at")
      .eq("business_account_id", businessId)
      .order("sort_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return json({ ok: true, categories: data || [] });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "Could not reorder categories" }, 400);
  }
}
