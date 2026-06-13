import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "restaurant-logos";
const MAX_LOGO_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

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

function cleanText(value: unknown, fallback = "") {
  return String(value ?? fallback).trim();
}

function normalizeUsername(value: unknown) {
  return cleanText(value).toLowerCase().replace(/[^a-z0-9_]/g, "");
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function slugify(value: string) {
  return cleanText(value, "restaurant")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "restaurant";
}

function extFromMime(mime: string) {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

function getBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

async function findBusiness(
  admin: SupabaseClient,
  args: {
    businessId: string;
    username: string;
    authUserId: string;
  }
) {
  const businessId = cleanText(args.businessId);
  const username = normalizeUsername(args.username);
  const authUserId = cleanText(args.authUserId);

  let query = admin
    .from("business_accounts")
    .select("id, auth_user_id, username");

  if (businessId && isUuid(businessId)) {
    query = query.eq("id", businessId);
  } else if (username) {
    query = query.eq("username", username);
  } else if (authUserId && isUuid(authUserId)) {
    query = query.eq("auth_user_id", authUserId);
  } else {
    throw new Error("Missing business account");
  }

  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Restaurant account was not found");

  return data as BusinessRow;
}

async function requireBusinessAccess(request: NextRequest, admin: SupabaseClient, businessId: string, username = "") {
  const token = getBearerToken(request);

  if (!token) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Login again, then upload the restaurant logo" }, { status: 401 }),
    };
  }

  const { data: userData, error: userError } = await admin.auth.getUser(token);

  if (userError || !userData.user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Login expired. Sign in again." }, { status: 401 }),
    };
  }

  const business = await findBusiness(admin, {
    businessId,
    username,
    authUserId: userData.user.id,
  });

  if (business.auth_user_id !== userData.user.id) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "You do not own this restaurant account" }, { status: 403 }),
    };
  }

  return {
    ok: true as const,
    business,
  };
}

function validateLogo(value: FormDataEntryValue | null) {
  if (!(value instanceof File)) {
    throw new Error("Logo image is missing");
  }

  if (!ALLOWED_TYPES.has(value.type)) {
    throw new Error("Logo must be JPG, PNG, or WEBP");
  }

  if (value.size <= 0) {
    throw new Error("Logo image is empty");
  }

  if (value.size > MAX_LOGO_BYTES) {
    throw new Error("Logo is too large. Max is 5 MB.");
  }

  return value;
}

export async function POST(request: NextRequest) {
  try {
    const admin = adminClient();
    const formData = await request.formData();

    const businessId = cleanText(formData.get("businessId"));
    const username = normalizeUsername(formData.get("username"));
    const logo = validateLogo(formData.get("logo"));

    const owner = await requireBusinessAccess(request, admin, businessId, username);
    if (!owner.ok) return owner.response;

    const folder = slugify(owner.business.username || username || owner.business.id);
    const path = `${folder}/restaurant-logo-${Date.now()}.${extFromMime(logo.type)}`;
    const bytes = Buffer.from(await logo.arrayBuffer());

    const { error: uploadError } = await admin.storage.from(BUCKET).upload(path, bytes, {
      contentType: logo.type,
      cacheControl: "31536000",
      upsert: true,
    });

    if (uploadError) throw uploadError;

    const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
    const logoUrl = data.publicUrl;

    const { error: updateError } = await admin
      .from("business_accounts")
      .update({
        logo_data_url: logoUrl,
        logo_path: path,
        logo_updated_at: new Date().toISOString(),
      })
      .eq("id", owner.business.id);

    if (updateError) throw updateError;

    return NextResponse.json({
      ok: true,
      logoUrl,
      logoPath: path,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Restaurant logo upload failed" },
      { status: 500 }
    );
  }
}
