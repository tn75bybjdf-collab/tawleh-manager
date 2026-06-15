import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "";

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  "";

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

function adminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase service configuration");
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function cleanText(value: unknown, max = 500) {
  return String(value || "").trim().slice(0, max);
}

function normalizeUsername(value: unknown) {
  return cleanText(value, 80)
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9_\-.]/g, "");
}

function normalizePhone(value: unknown) {
  return cleanText(value, 80).replace(/[^\d+]/g, "");
}

function monthlyTableFee(tableCount: number) {
  return Math.max(25, Math.min(999, Number(tableCount || 25)));
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    ""
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({} as Record<string, unknown>));
    const admin = adminClient();

    const username = normalizeUsername(body.username);
    const email = cleanText(body.email, 250).toLowerCase();
    const restaurantName = cleanText(body.restaurantName, 250);
    const branchName = cleanText(body.branchName, 250);
    const businessPhone = normalizePhone(body.businessPhone);
    const signupSource = cleanText(body.signupSource, 40) === "salesperson" ? "salesperson" : "self";
    const salespersonUsername = signupSource === "salesperson" ? normalizeUsername(body.salespersonUsername) : "";
    const tableCount = Math.max(25, Math.min(999, Number(body.tableCount || 25)));
    const locationCount = Math.max(1, Math.min(25, Number(body.locationCount || 1)));
    const locations = Array.isArray(body.locations)
      ? (body.locations as unknown[])
          .map((item: unknown) => cleanText(item, 500))
          .filter((item: string) => Boolean(item))
          .slice(0, 25)
      : [];

    if (!restaurantName || !branchName) {
      throw new Error("Restaurant name and branch are required");
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      throw new Error("Valid business email is required");
    }

    if (!username || username.length < 4) {
      throw new Error("Username must be at least 4 characters");
    }

    if (!businessPhone || businessPhone.length < 8) {
      throw new Error("Business phone is required");
    }

    if (!locations.length || locations.length !== locationCount) {
      throw new Error("Every location must be filled");
    }

    if (signupSource === "salesperson") {
      if (!salespersonUsername) {
        throw new Error("Salesperson username is required");
      }

      const { data: salesperson, error: salespersonError } = await admin
        .from("platform_salespeople")
        .select("id, username, active")
        .eq("username", salespersonUsername)
        .eq("active", true)
        .maybeSingle();

      if (salespersonError) {
        throw new Error(salespersonError.message);
      }

      if (!salesperson?.id) {
        throw new Error("Salesperson username was not found or is inactive");
      }
    }

    const { data: existingBusiness, error: existingBusinessError } = await admin
      .from("business_accounts")
      .select("id")
      .or(`username.eq.${username},email.eq.${email}`)
      .limit(1);

    if (existingBusinessError) {
      throw new Error(existingBusinessError.message);
    }

    if ((existingBusiness || []).length) {
      throw new Error("A business already exists with this username or email");
    }

    const { data: existingApplication, error: existingApplicationError } = await admin
      .from("business_applications")
      .select("id, status")
      .or(`username.eq.${username},business_email.eq.${email}`)
      .in("status", ["pending", "approved"])
      .limit(1);

    if (existingApplicationError) {
      throw new Error(existingApplicationError.message);
    }

    if ((existingApplication || []).length) {
      throw new Error("An application already exists with this username or email");
    }

    const { data: application, error: insertError } = await admin
      .from("business_applications")
      .insert({
        signup_source: signupSource,
        salesperson_username: salespersonUsername || null,
        restaurant_name: restaurantName,
        branch_name: branchName,
        business_type: cleanText(body.businessType, 120),
        business_email: email,
        business_phone: businessPhone,
        username,
        table_count: tableCount,
        location_count: locationCount,
        locations,
        service_monthly_fee_jod: monthlyTableFee(tableCount),
        welcome_message: cleanText(body.welcomeMessage, 1000),
        brand_color: cleanText(body.brandColor, 50) || "#6b7a3d",
        logo_data_url: cleanText(body.logoDataUrl, 200000),
        status: "pending",
        trial_days: 7,
        signup_ip: getClientIp(request),
      })
      .select("*")
      .single();

    if (insertError) {
      throw new Error(insertError.message);
    }

    return json({
      ok: true,
      application,
      message: "Application submitted. Tawleh will call before activation.",
    });
  } catch (error) {
    return json(
      { ok: false, error: error instanceof Error ? error.message : "Could not submit application" },
      400
    );
  }
}
