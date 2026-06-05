import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { appId } = await params;
    const app = await prisma.app.findUnique({ where: { id: appId } });

    if (!app || app.userId !== (session.user as any).id) {
      return NextResponse.json({ error: "App not found or access denied" }, { status: 404 });
    }

    // Cascade deletes records and workflows via Prisma schema relations
    await prisma.app.delete({ where: { id: appId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE app error:", error);
    return NextResponse.json({ error: "Failed to delete app" }, { status: 500 });
  }
}
