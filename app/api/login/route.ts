import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function normalizeUsername(value: string) {
  return String(value || "").toLowerCase().trim().replace(/[^a-z0-9_]/g, "");
}

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Missing Supabase environment keys" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const username = normalizeUsername(body.username);
    const password = String(body.password || "");

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: business, error: businessError } = await admin
      .from("business_accounts")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (businessError) {
      return NextResponse.json({ error: businessError.message }, { status: 500 });
    }

    if (!business?.email) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const authClient = createClient(supabaseUrl, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
      email: business.email,
      password,
    });

    if (authError || !authData.session) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      session: {
        access_token: authData.session.access_token,
        refresh_token: authData.session.refresh_token,
      },
      business,
    });
  } catch {
    return NextResponse.json({ error: "Invalid login request" }, { status: 400 });
  }
}
