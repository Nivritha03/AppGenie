import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const apps = await prisma.app.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(apps);
  } catch (error) {
    console.error("GET apps error:", error);
    return NextResponse.json({ error: "Failed to fetch apps" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, config } = await req.json();

    if (!name || !config) {
      return NextResponse.json({ error: "name and config are required" }, { status: 400 });
    }

    const app = await prisma.app.create({
      data: {
        name,
        config,
        userId: (session.user as any).id,
      },
    });

    return NextResponse.json(app);
  } catch (error) {
    console.error("POST app error:", error);
    return NextResponse.json({ error: "Failed to create app" }, { status: 500 });
  }
}
