import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  await prisma.homeContent.update({
    where: { id: 1 },
    data: { totalViews: { increment: 1 } },
  });
  return NextResponse.json({ ok: true });
}
