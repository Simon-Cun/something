import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const getSecret = () =>
  new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET || "dev-secret-change-in-production",
  );

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await jwtVerify(token, getSecret());
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file)
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const blob = await put(file.name, file, {
    access: "public",
    allowOverwrite: true,
  });
  return NextResponse.json({ url: blob.url });
}
