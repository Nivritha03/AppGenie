import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function getVerifiedApp(appId: string, userId: string) {
  const app = await prisma.app.findUnique({ where: { id: appId } });
  if (!app || app.userId !== userId) return null;
  return app;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string; recordId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { appId, recordId } = await params;
    const app = await getVerifiedApp(appId, (session.user as any).id);
    if (!app) {
      return NextResponse.json({ error: "App not found or access denied" }, { status: 404 });
    }

    const data = await req.json();
    const record = await prisma.record.update({
      where: { id: recordId },
      data: { data } as any,
    });

    return NextResponse.json({ ...record, data });
  } catch (error) {
    console.error("PUT record error:", error);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string; recordId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { appId, recordId } = await params;
    const app = await getVerifiedApp(appId, (session.user as any).id);
    if (!app) {
      return NextResponse.json({ error: "App not found or access denied" }, { status: 404 });
    }

    await prisma.record.delete({ where: { id: recordId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE record error:", error);
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
  }
}
