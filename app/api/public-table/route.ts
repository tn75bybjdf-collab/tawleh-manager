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

  /*
    Important:
    Older menu rows may have available = null from early test builds.
    The manager treats null as available, but the old public QR route only fetched available = true,
    so saved items could appear in the manager and disappear on the customer QR menu.
    This query includes both true and null.
  */
  const { data: menu, error: menuError } = await admin
    .from("menu_items")
    .select("id, business_account_id, auth_user_id, item_name, item_name_ar, description, price_jod, short_code, available, image_thumb_url, image_full_url, sort_order, created_at")
    .eq("business_account_id", business.id)
    .or("available.eq.true,available.is.null")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (menuError) {
    return NextResponse.json({ error: menuError.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      business,
      menu: menu || [],
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
