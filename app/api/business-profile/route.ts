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

  if (!businessId && !username) {
    return NextResponse.json({ error: "Missing restaurant account" }, { status: 400 });
  }

  if (businessId && !isUuid(businessId)) {
    return NextResponse.json({ error: "Invalid restaurant account" }, { status: 400 });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  let query = admin
    .from("business_accounts")
    .select("id, auth_user_id, email, username, restaurant_name, branch_name, business_type, business_phone, table_count, location_count, location, locations, signup_ip, welcome_message, brand_color, logo_data_url");

  if (businessId) {
    query = query.eq("id", businessId);
  } else {
    query = query.eq("username", username);
  }

  const { data: business, error } = await query.maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!business) {
    return NextResponse.json({ error: "Restaurant account was not found" }, { status: 404 });
  }

  return NextResponse.json(
    { business },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
