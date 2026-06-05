import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { executeWorkflows } from "@/lib/workflows";

// GET all records for an app
export async function GET(
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

    const { searchParams } = new URL(req.url);
    const entity = searchParams.get("entity");

    const records = await prisma.record.findMany({
      where: {
        appId,
        ...(entity ? { entityName: entity } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error("GET records error:", error);
    return NextResponse.json({ error: "Failed to fetch records" }, { status: 500 });
  }
}

// POST create a new record
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { appId } = await params;
    const app = await prisma.app.findUnique({
      where: { id: appId },
      include: { workflows: true },
    });

    if (!app || app.userId !== (session.user as any).id) {
      return NextResponse.json({ error: "App not found or access denied" }, { status: 404 });
    }

    const body = await req.json();
    const { data, entityName } = body;

    if (!entityName) {
      return NextResponse.json({ error: "entityName is required" }, { status: 400 });
    }

    const record = await prisma.record.create({
      data: {
        appId,
        entityName,
        data: data ?? {},
      } as any,
    });

    // Execute workflows via dedicated lib
    await executeWorkflows({
      appId,
      appName: app.name,
      userId: (session.user as any).id,
      trigger: "RECORD_CREATED",
      entityName,
      data: data ?? {},
    });

    return NextResponse.json({ ...record, data });
  } catch (error) {
    console.error("POST record error:", error);
    return NextResponse.json({ error: "Failed to create record" }, { status: 500 });
  }
}
