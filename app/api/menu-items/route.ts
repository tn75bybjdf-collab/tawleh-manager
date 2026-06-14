import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type BusinessRow = {
  id: string;
  auth_user_id: string;
  username: string | null;
};

type MenuItemPayload = {
  name?: unknown;
  nameAr?: unknown;
  desc?: unknown;
  price?: unknown;
  icon?: unknown;
  available?: unknown;
  categoryId?: unknown;
  categoryName?: unknown;
  availableAllDay?: unknown;
  availableFrom?: unknown;
  availableTo?: unknown;
  imageThumbUrl?: unknown;
  imageFullUrl?: unknown;
  optionGroups?: unknown;
};

type CleanMenuOptionChoice = {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  subOptionGroups: CleanMenuOptionGroup[];
};

type CleanMenuOptionGroup = {
  id: string;
  name: string;
  nameAr: string;
  required: boolean;
  multiple: boolean;
  choices: CleanMenuOptionChoice[];
};

function isCleanMenuOptionChoice(choice: CleanMenuOptionChoice | null): choice is CleanMenuOptionChoice {
  return choice !== null;
}

function isCleanMenuOptionGroup(group: CleanMenuOptionGroup | null): group is CleanMenuOptionGroup {
  return group !== null;
}

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

function cleanTime(value: unknown, fallback: string) {
  const text = cleanText(value, fallback);
  return /^\d{2}:\d{2}$/.test(text) ? text : fallback;
}

function cleanOptionGroups(value: unknown): CleanMenuOptionGroup[] {
  let raw = value;

  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw) as unknown;
    } catch {
      raw = [];
    }
  }

  if (!Array.isArray(raw)) return [];

  return raw
    .map((group, groupIndex): CleanMenuOptionGroup | null => {
      const source = group && typeof group === "object" ? (group as Record<string, unknown>) : {};
      const choicesRaw = Array.isArray(source.choices) ? source.choices : [];
      const choices = choicesRaw
        .map((choice, choiceIndex): CleanMenuOptionChoice | null => {
          const choiceSource = choice && typeof choice === "object" ? (choice as Record<string, unknown>) : {};
          const name = cleanText(choiceSource.name);
          const nameAr = cleanText(choiceSource.nameAr);
          const price = moneyNumber(choiceSource.price || 0);
          const subOptionGroups = cleanOptionGroups(choiceSource.subOptionGroups || choiceSource.sub_option_groups || []);

          if (!name && !nameAr && !subOptionGroups.length) return null;

          return {
            id: cleanText(choiceSource.id, `choice_${groupIndex}_${choiceIndex}`),
            name: name || nameAr,
            nameAr,
            price: Math.max(0, price),
            subOptionGroups,
          };
        })
        .filter(isCleanMenuOptionChoice);

      const name = cleanText(source.name);
      const nameAr = cleanText(source.nameAr);

      if (!name && !nameAr && !choices.length) return null;

      return {
        id: cleanText(source.id, `group_${groupIndex}`),
        name: name || nameAr || "Options",
        nameAr,
        required: source.required === true,
        multiple: source.multiple === true,
        choices,
      };
    })
    .filter(isCleanMenuOptionGroup);
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

const MENU_SELECT = "id, business_account_id, auth_user_id, category_id, category_name, item_name, item_name_ar, description, price_jod, short_code, available, available_all_day, available_from, available_to, image_url, image_path, image_thumb_url, image_full_url, option_groups, sort_order, created_at";

async function fetchMenu(admin: SupabaseClient, businessId: string) {
  const { data, error } = await admin
    .from("menu_items")
    .select(MENU_SELECT)
    .eq("business_account_id", businessId)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

async function getCategory(admin: SupabaseClient, businessId: string, categoryId: string) {
  if (!categoryId || !isUuid(categoryId)) return null;

  const { data, error } = await admin
    .from("menu_categories")
    .select("id, name")
    .eq("id", categoryId)
    .eq("business_account_id", businessId)
    .maybeSingle();

  if (error) throw error;
  return data as { id: string; name: string } | null;
}

async function buildItemUpdate(admin: SupabaseClient, businessId: string, item: MenuItemPayload) {
  const requestedCategoryId = cleanText(item.categoryId);
  const category = await getCategory(admin, businessId, requestedCategoryId);
  const categoryName = category?.name || cleanText(item.categoryName, "Uncategorized") || "Uncategorized";

  return {
    category_id: category?.id || null,
    category_name: categoryName,
    item_name: cleanText(item.name),
    item_name_ar: cleanText(item.nameAr),
    description: cleanText(item.desc, "Menu item") || "Menu item",
    price_jod: moneyNumber(item.price),
    short_code: cleanShortCode(item.icon, "IT"),
    available: item.available !== false,
    available_all_day: item.availableAllDay !== false,
    available_from: cleanTime(item.availableFrom, "09:00"),
    available_to: cleanTime(item.availableTo, "23:00"),
    image_thumb_url: cleanText(item.imageThumbUrl) || null,
    image_full_url: cleanText(item.imageFullUrl) || null,
    option_groups: cleanOptionGroups(item.optionGroups || []),
  };
}

function validateItemUpdate(update: Awaited<ReturnType<typeof buildItemUpdate>>) {
  if (!update.item_name) return "English item name is required";
  if (!update.item_name_ar) return "Arabic item name is required";
  if (update.price_jod <= 0) return "Valid item price is required";
  return "";
}

export async function GET(request: NextRequest) {
  try {
    const businessId = cleanText(request.nextUrl.searchParams.get("businessId"));
    const username = cleanText(request.nextUrl.searchParams.get("username"));

    const owner = await requireBusinessAccess(request, businessId, username);
    if (!owner.ok) return owner.response;

    const menu = await fetchMenu(owner.admin, owner.business.id);

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
    const username = cleanText(body.username);
    const item = (body.item || {}) as MenuItemPayload;

    const owner = await requireBusinessAccess(request, businessId, username);
    if (!owner.ok) return owner.response;

    const update = await buildItemUpdate(owner.admin, owner.business.id, item);
    const validationError = validateItemUpdate(update);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { data, error } = await owner.admin
      .from("menu_items")
      .insert({
        business_account_id: owner.business.id,
        auth_user_id: owner.userId,
        ...update,
        sort_order: Date.now(),
      })
      .select(MENU_SELECT)
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
    const username = cleanText(body.username);
    const itemId = cleanText(body.itemId);

    const owner = await requireBusinessAccess(request, businessId, username);
    if (!owner.ok) return owner.response;

    if (!itemId || !isUuid(itemId)) {
      return NextResponse.json({ error: "Invalid menu item" }, { status: 400 });
    }

    if (body.item) {
      const update = await buildItemUpdate(owner.admin, owner.business.id, body.item as MenuItemPayload);
      const validationError = validateItemUpdate(update);

      if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 400 });
      }

      const { data, error } = await owner.admin
        .from("menu_items")
        .update({
          ...update,
          updated_at: new Date().toISOString(),
        })
        .eq("id", itemId)
        .eq("business_account_id", owner.business.id)
        .select(MENU_SELECT)
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ item: data });
    }

    const available = body.available !== false;

    const { data, error } = await owner.admin
      .from("menu_items")
      .update({
        available,
        updated_at: new Date().toISOString(),
      })
      .eq("id", itemId)
      .eq("business_account_id", owner.business.id)
      .select(MENU_SELECT)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ item: data, ok: true });
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
    const username = cleanText(body.username);
    const itemId = cleanText(body.itemId);

    const owner = await requireBusinessAccess(request, businessId, username);
    if (!owner.ok) return owner.response;

    if (!itemId || !isUuid(itemId)) {
      return NextResponse.json({ error: "Invalid menu item" }, { status: 400 });
    }

    const { error } = await owner.admin
      .from("menu_items")
      .delete()
      .eq("id", itemId)
      .eq("business_account_id", owner.business.id);

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
