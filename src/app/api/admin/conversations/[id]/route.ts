import { NextResponse } from "next/server";
import { getRecentMessages } from "@/lib/db/conversations";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const messages = await getRecentMessages(id, 100);
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error loading conversation", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
