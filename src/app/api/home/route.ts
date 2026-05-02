import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    let home = await prisma.homeContent.findUnique({ where: { id: 1 } });
    if (!home) {
      home = await prisma.homeContent.create({ data: { id: 1 } });
    }
    return NextResponse.json(home);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      name,
      title,
      bio,
      githubUrl,
      linkedinUrl,
      email,
      resumeUrl,
      profileImage,
    } = body;

    const home = await prisma.homeContent.upsert({
      where: { id: 1 },
      update: {
        name,
        title,
        bio,
        githubUrl,
        linkedinUrl,
        email,
        resumeUrl,
        profileImage,
      },
      create: {
        id: 1,
        name,
        title,
        bio,
        githubUrl,
        linkedinUrl,
        email,
        resumeUrl,
        profileImage,
      },
    });

    return NextResponse.json(home);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
