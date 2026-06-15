import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || "";

type ReorderCategoryInput = {
  id: string;
  sortOrder?: number | string | null;
  sort_order?: number | string | null;
};

type CleanedCategory = {
  id: string;
  sort_order: number;
};

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

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function cleanSortOrder(value: unknown, fallback: number) {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return fallback;
  return Math.max(0, Math.min(999999, Math.floor(numberValue)));
}

function parseCategoryInput(value: unknown, index: number): CleanedCategory | null {
  if (!value || typeof value !== "object") return null;

  const category = value as ReorderCategoryInput;
  const id = String(category.id || "").trim();

  if (!isUuid(id)) return null;

  const sortValue = category.sortOrder ?? category.sort_order;

  return {
    id,
    sort_order: cleanSortOrder(sortValue, (index + 1) * 10),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({} as Record<string, unknown>));
    const bodyRecord = body as Record<string, unknown>;

    const businessId = String(bodyRecord.businessId || "").trim();
    const categoriesValue = bodyRecord.categories;
    const categories: unknown[] = Array.isArray(categoriesValue) ? categoriesValue : [];

    if (!businessId || !isUuid(businessId)) {
      throw new Error("Valid businessId is required");
    }

    if (!categories.length) {
      throw new Error("No categories were sent");
    }

    const admin = getAdminClient();

    const { data: business, error: businessError } = await admin
      .from("business_accounts")
      .select("id, username")
      .eq("id", businessId)
      .maybeSingle();

    if (businessError) {
      throw new Error(businessError.message);
    }

    if (!business?.id) {
      throw new Error("Business not found");
    }

    const cleanedCategories: CleanedCategory[] = categories
      .map((category: unknown, index: number) => parseCategoryInput(category, index))
      .filter((category: CleanedCategory | null): category is CleanedCategory => category !== null);

    if (!cleanedCategories.length) {
      throw new Error("No valid categories were sent");
    }

    const categoryIds = cleanedCategories.map((category) => category.id);

    const { data: ownedCategories, error: ownedError } = await admin
      .from("menu_categories")
      .select("id")
      .eq("business_account_id", businessId)
      .in("id", categoryIds);

    if (ownedError) {
      throw new Error(ownedError.message);
    }

    const ownedIds = new Set((ownedCategories || []).map((category: { id: string }) => category.id));
    const safeCategories = cleanedCategories.filter((category) => ownedIds.has(category.id));

    if (!safeCategories.length) {
      throw new Error("No matching categories belong to this restaurant");
    }

    for (const category of safeCategories) {
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

    return json({
      ok: true,
      businessId,
      categories: data || [],
    });
  } catch (error) {
    return json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Could not reorder categories",
      },
      400
    );
  }
}
