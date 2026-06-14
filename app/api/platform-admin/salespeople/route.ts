import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const SALESPERSON_SELECT = "id, username, full_name, phone, active, created_at";

function normalizeUsername(value: unknown) {
  return String(value || "").toLowerCase().trim().replace(/[^a-z0-9_]/g, "");
}

function cleanText(value: unknown) {
  return String(value || "").trim();
}

function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

function getBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

async function requirePlatformAdmin(admin: any, request: NextRequest) {
  const token = getBearerToken(request);

  if (!token) {
    return {
      ok: false as const,
      response: jsonError("Admin login required", 401),
    };
  }

  const { data, error } = await admin.auth.getUser(token);

  if (error || !data.user) {
    return {
      ok: false as const,
      response: jsonError("Admin login required", 401),
    };
  }

  const email = (data.user.email || "").toLowerCase();

  const { data: adminUser, error: adminError } = await admin
    .from("platform_admin_users")
    .select("id, auth_user_id, email, active")
    .eq("active", true)
    .or(`auth_user_id.eq.${data.user.id},email.eq.${email}`)
    .maybeSingle();

  if (adminError) {
    return {
      ok: false as const,
      response: jsonError(adminError.message, 500),
    };
  }

  if (!adminUser) {
    return {
      ok: false as const,
      response: jsonError("This login is not allowed to access platform admin", 403),
    };
  }

  return {
    ok: true as const,
    user: data.user,
  };
}

export async function GET(request: NextRequest) {
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonError("Missing Supabase server environment keys", 500);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const gate = await requirePlatformAdmin(admin, request);
  if (!gate.ok) return gate.response;

  const { data, error } = await admin
    .from("platform_salespeople")
    .select(SALESPERSON_SELECT)
    .order("created_at", { ascending: false });

  if (error) return jsonError(error.message, 500);

  return NextResponse.json(
    { salespeople: data || [] },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonError("Missing Supabase server environment keys", 500);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const gate = await requirePlatformAdmin(admin, request);
  if (!gate.ok) return gate.response;

  try {
    const body = await request.json();
    const username = normalizeUsername(body.username);
    const fullName = cleanText(body.fullName);
    const phone = cleanText(body.phone).replace(/[^0-9+]/g, "");

    if (!username || username.length < 3) {
      return jsonError("Salesperson username must be at least 3 characters", 400);
    }

    const { data, error } = await admin
      .from("platform_salespeople")
      .upsert(
        {
          username,
          full_name: fullName || username,
          phone,
          active: true,
        },
        {
          onConflict: "username",
        }
      )
      .select(SALESPERSON_SELECT)
      .single();

    if (error) return jsonError(error.message, 500);

    return NextResponse.json({ salesperson: data });
  } catch {
    return jsonError("Invalid salesperson request", 400);
  }
}
