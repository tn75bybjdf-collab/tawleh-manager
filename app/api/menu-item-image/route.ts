import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "menu-images";
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

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

/**
 * Correct UUID pattern is:
 * 8-4-4-4-12
 *
 * Previous route had the last part wrong and rejected real Supabase UUIDs,
 * which caused "Invalid business account" during image upload.
 */
function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function normalizeUsername(value: string) {
  return cleanText(value).toLowerCase().replace(/[^a-z0-9_]/g, "");
}

function slugifyFilePart(value: string) {
  return cleanText(value, "menu-item")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "menu-item";
}

function extensionFromMime(mime: string) {
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
    // Fallback protects old browser/localStorage state if businessId is stale.
    query = query.eq("username", username);
  } else if (authUserId && isUuid(authUserId)) {
    // Last safe fallback: logged-in Supabase user owns one restaurant account.
    query = query.eq("auth_user_id", authUserId);
  } else if (businessId) {
    throw new Error("Invalid business account. Login again, then upload the image.");
  } else {
    throw new Error("Missing business account. Login again, then upload the image.");
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
      response: NextResponse.json({ error: "Login again, then upload item images" }, { status: 401 }),
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

  if (userData.user.id !== business.auth_user_id) {
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

async function validateImageFile(value: FormDataEntryValue | null, label: string) {
  if (!(value instanceof File)) {
    throw new Error(`${label} image is missing`);
  }

  if (!ALLOWED_IMAGE_TYPES.has(value.type)) {
    throw new Error(`${label} must be JPG, PNG, or WEBP`);
  }

  if (value.size <= 0) {
    throw new Error(`${label} image is empty`);
  }

  if (value.size > MAX_IMAGE_BYTES) {
    throw new Error(`${label} image is too large. Max is 10 MB.`);
  }

  return value;
}

async function uploadImage(admin: SupabaseClient, file: File, path: string) {
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await admin.storage.from(BUCKET).upload(path, bytes, {
    contentType: file.type,
    cacheControl: "31536000",
    upsert: true,
  });

  if (error) throw error;

  const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function POST(request: NextRequest) {
  try {
    const admin = adminClient();
    const formData = await request.formData();

    const businessId = cleanText(formData.get("businessId"));
    const username = normalizeUsername(cleanText(formData.get("username")));
    const itemName = slugifyFilePart(cleanText(formData.get("itemName"), "menu-item"));

    const owner = await requireBusinessAccess(request, admin, businessId, username);
    if (!owner.ok) return owner.response;

    const thumb = await validateImageFile(formData.get("thumb"), "Thumbnail");
    const full = await validateImageFile(formData.get("full"), "Full size");

    const businessFolder = slugifyFilePart(owner.business.username || username || owner.business.id);
    const stamp = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const thumbPath = `${businessFolder}/${itemName}-${stamp}-thumb.${extensionFromMime(thumb.type)}`;
    const fullPath = `${businessFolder}/${itemName}-${stamp}-full.${extensionFromMime(full.type)}`;

    const [imageThumbUrl, imageFullUrl] = await Promise.all([
      uploadImage(admin, thumb, thumbPath),
      uploadImage(admin, full, fullPath),
    ]);

    return NextResponse.json({
      ok: true,
      bucket: BUCKET,
      imageThumbUrl,
      imageFullUrl,
      imageThumbPath: thumbPath,
      imageFullPath: fullPath,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image upload failed" },
      { status: 500 }
    );
  }
}
