import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "";

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

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

function getAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase service configuration");
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getAnonClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase anon configuration");
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function requirePlatformAdmin(request: NextRequest) {
  const authorization = request.headers.get("authorization") || request.headers.get("Authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    throw new Error("Admin login required");
  }

  const anon = getAnonClient();
  const admin = getAdminClient();

  const { data: userData, error: userError } = await anon.auth.getUser(token);
  const user = userData?.user;

  if (userError || !user?.id) {
    throw new Error("Invalid admin session");
  }

  const { data: adminUser, error: adminError } = await admin
    .from("platform_admin_users")
    .select("id, auth_user_id, email, active")
    .or(`auth_user_id.eq.${user.id},email.eq.${user.email || ""}`)
    .eq("active", true)
    .maybeSingle();

  if (adminError) {
    throw new Error(adminError.message);
  }

  if (!adminUser?.id) {
    throw new Error("You are not allowed to manage platform applications");
  }

  return { admin, user };
}

function asText(value: unknown, max = 500) {
  return String(value || "").trim().slice(0, max);
}

function money(value: number) {
  return Math.max(0, Number(value || 0));
}

function monthlyTableFee(tableCount: number) {
  return Math.max(25, Math.min(999, Number(tableCount || 25)));
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function makeTemporaryPassword() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const suffix = Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 10);

  return `Tawleh@${suffix}`;
}

function makeToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function GET(request: NextRequest) {
  try {
    const { admin } = await requirePlatformAdmin(request);

    const status = request.nextUrl.searchParams.get("status") || "";

    let query = admin
      .from("business_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return json({ ok: true, applications: data || [] });
  } catch (error) {
    return json(
      { ok: false, error: error instanceof Error ? error.message : "Could not load applications" },
      400
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { admin, user } = await requirePlatformAdmin(request);
    const body = await request.json().catch(() => ({} as Record<string, unknown>));

    const applicationId = asText(body.applicationId, 80);
    const action = asText(body.action, 20);
    const adminNote = asText(body.adminNote, 1000);

    if (!applicationId) {
      throw new Error("applicationId is required");
    }

    if (action !== "approve" && action !== "reject") {
      throw new Error("Action must be approve or reject");
    }

    const { data: application, error: applicationError } = await admin
      .from("business_applications")
      .select("*")
      .eq("id", applicationId)
      .maybeSingle();

    if (applicationError) {
      throw new Error(applicationError.message);
    }

    if (!application?.id) {
      throw new Error("Application not found");
    }

    if (application.status !== "pending") {
      throw new Error("Application is not pending");
    }

    if (action === "reject") {
      const { data: rejected, error: rejectError } = await admin
        .from("business_applications")
        .update({
          status: "rejected",
          admin_note: adminNote,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          rejected_at: new Date().toISOString(),
        })
        .eq("id", applicationId)
        .select("*")
        .single();

      if (rejectError) {
        throw new Error(rejectError.message);
      }

      return json({ ok: true, application: rejected });
    }

    const email = asText(application.business_email, 250).toLowerCase();
    const username = asText(application.username, 80).toLowerCase();
    const tableCount = Math.max(25, Math.min(999, Number(application.table_count || 25)));
    const monthlyFee = monthlyTableFee(tableCount);
    const now = new Date();
    const expiresAt = isoDate(addDays(now, 7));
    const paymentDueDate = expiresAt;
    const temporaryPassword = makeTemporaryPassword();

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

    const { data: authUser, error: authError } = await admin.auth.admin.createUser({
      email,
      password: temporaryPassword,
      email_confirm: true,
      user_metadata: {
        role: "restaurant",
        username,
        restaurant_name: application.restaurant_name,
      },
    });

    if (authError || !authUser.user?.id) {
      throw new Error(authError?.message || "Could not create Supabase user");
    }

    const { data: business, error: businessError } = await admin
      .from("business_accounts")
      .insert({
        auth_user_id: authUser.user.id,
        email,
        username,
        restaurant_name: application.restaurant_name,
        branch_name: application.branch_name,
        business_type: application.business_type,
        business_phone: application.business_phone,
        table_count: tableCount,
        location_count: Number(application.location_count || 1),
        location: Array.isArray(application.locations) ? application.locations[0] || "" : "",
        locations: application.locations || [],
        signup_ip: application.signup_ip || null,
        welcome_message: application.welcome_message || "",
        brand_color: application.brand_color || "#6b7a3d",
        logo_data_url: application.logo_data_url || "",
        service_status: "trial",
        service_expires_at: expiresAt,
        service_payment_due_date: paymentDueDate,
        service_balance_due_jod: monthlyFee,
        service_monthly_fee_jod: monthlyFee,
        service_suspended_reason: "",
        service_admin_note: adminNote,
        signup_source: application.signup_source || "self",
        salesperson_username: application.salesperson_username || null,
        print_bridge_token: makeToken(),
        print_bridge_token_created_at: new Date().toISOString(),
        force_password_change: true,
        temporary_password_set_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (businessError) {
      await admin.auth.admin.deleteUser(authUser.user.id).catch(() => undefined);
      throw new Error(businessError.message);
    }

    const { data: approved, error: approveError } = await admin
      .from("business_applications")
      .update({
        status: "approved",
        admin_note: adminNote,
        approved_business_account_id: business.id,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
        approved_at: new Date().toISOString(),
      })
      .eq("id", applicationId)
      .select("*")
      .single();

    if (approveError) {
      throw new Error(approveError.message);
    }

    return json({
      ok: true,
      application: approved,
      business,
      temporaryPassword,
      trialDays: 7,
    });
  } catch (error) {
    return json(
      { ok: false, error: error instanceof Error ? error.message : "Could not review application" },
      400
    );
  }
}
