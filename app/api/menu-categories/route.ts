import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type BusinessRow = {
  id: string;
  auth_user_id: string;
  username: string | null;
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

async function fetchCategories(admin: SupabaseClient, businessId: string) {
  const { data, error } = await admin
    .from("menu_categories")
    .select("id, business_account_id, auth_user_id, name, name_ar, sort_order, created_at")
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

    const categories = await fetchCategories(owner.admin, owner.business.id);

    return NextResponse.json(
      { categories },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Category load failed" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const businessId = cleanText(body.businessId);
    const username = cleanText(body.username);
    const name = cleanText(body.name);
    const nameAr = cleanText(body.nameAr);

    const owner = await requireBusinessAccess(request, businessId, username);
    if (!owner.ok) return owner.response;

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const { data, error } = await owner.admin
      .from("menu_categories")
      .insert({
        business_account_id: owner.business.id,
        auth_user_id: owner.userId,
        name,
        name_ar: nameAr || null,
        sort_order: Date.now(),
      })
      .select("id, business_account_id, auth_user_id, name, name_ar, sort_order, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ category: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Category save failed" },
      { status: 500 }
    );
  }
}
