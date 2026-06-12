import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSignupIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "local-dev-ip";
}

function normalizeUsername(value: string) {
  return String(value || "").toLowerCase().trim().replace(/[^a-z0-9_]/g, "");
}

function cleanText(value: unknown) {
  return String(value || "").trim();
}

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Missing Supabase server environment keys" },
      { status: 500 }
    );
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  try {
    const body = await request.json();

    const email = cleanText(body.email).toLowerCase();
    const password = String(body.password || "");
    const username = normalizeUsername(body.username);
    const restaurantName = cleanText(body.restaurantName);
    const branchName = cleanText(body.branchName);
    const businessType = cleanText(body.businessType) || "Cafe";
    const businessPhone = cleanText(body.businessPhone);
    const tableCount = Math.max(1, Math.min(999, Number(body.tableCount || 1)));
    const locationCount = Math.max(1, Math.min(25, Number(body.locationCount || 1)));
    const locations: string[] = Array.isArray(body.locations)
      ? body.locations.map((item: unknown) => cleanText(item)).filter(Boolean)
      : [];
    const location = locations[0] || "";
    const welcomeMessage = cleanText(body.welcomeMessage);
    const brandColor = cleanText(body.brandColor) || "#c8613f";
    const logoDataUrl = String(body.logoDataUrl || "");
    const signupIp = getSignupIp(request);

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    if (!username || username.length < 4) {
      return NextResponse.json({ error: "Username must be at least 4 characters" }, { status: 400 });
    }

    if (!restaurantName || !branchName || !businessPhone) {
      return NextResponse.json({ error: "Restaurant, branch, and phone are required" }, { status: 400 });
    }

    if (locations.length !== locationCount || locations.some((item) => !item)) {
      return NextResponse.json({ error: "Every location tab must be filled" }, { status: 400 });
    }

    const { data: existingIp, error: existingIpError } = await admin
      .from("business_accounts")
      .select("id, restaurant_name")
      .eq("signup_ip", signupIp)
      .maybeSingle();

    if (existingIpError) {
      return NextResponse.json({ error: existingIpError.message }, { status: 500 });
    }

    if (existingIp) {
      return NextResponse.json(
        { error: `This IP address already created a free trial for ${existingIp.restaurant_name}` },
        { status: 409 }
      );
    }

    const { data: existingUsername, error: existingUsernameError } = await admin
      .from("business_accounts")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (existingUsernameError) {
      return NextResponse.json({ error: existingUsernameError.message }, { status: 500 });
    }

    if (existingUsername) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }

    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        app: "tawleh_manager",
        username,
        restaurant_name: restaurantName,
      },
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: authError?.message || "Could not create auth user" },
        { status: 400 }
      );
    }

    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 30);

    const { data: business, error: insertError } = await admin
      .from("business_accounts")
      .insert({
        auth_user_id: authData.user.id,
        email,
        username,
        restaurant_name: restaurantName,
        branch_name: branchName,
        business_type: businessType,
        business_phone: businessPhone,
        table_count: tableCount,
        location_count: locationCount,
        location,
        locations,
        signup_ip: signupIp,
        welcome_message: welcomeMessage,
        brand_color: brandColor,
        logo_data_url: logoDataUrl,
        trial_started_at: new Date().toISOString(),
        trial_ends_at: trialEndsAt.toISOString(),
        subscription_status: "trial",
      })
      .select("*")
      .single();

    if (insertError) {
      await admin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      business,
      signupIp,
    });
  } catch {
    return NextResponse.json({ error: "Invalid signup request" }, { status: 400 });
  }
}
