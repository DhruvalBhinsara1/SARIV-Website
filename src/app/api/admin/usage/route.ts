import { NextResponse } from "next/server";
import { sql } from "@/lib/db/client";

export async function GET() {
  try {
    const [conversations, messages, chunks, last24h] = await Promise.all([
      sql`select count(*) as count from conversations`,
      sql`select count(*) as count from messages`,
      sql`select count(*) as count from document_chunks`,
      sql`select count(*) as count from messages where created_at > now() - interval '24 hours'`,
    ]);

    return NextResponse.json({
      conversations: Number(conversations.rows[0].count),
      messages: Number(messages.rows[0].count),
      documentChunks: Number(chunks.rows[0].count),
      messagesLast24h: Number(last24h.rows[0].count),
    });
  } catch (error) {
    console.error("Error loading usage stats", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
