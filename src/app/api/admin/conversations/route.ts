import { NextResponse } from "next/server";
import { sql } from "@/lib/db/client";

const PAGE_SIZE = 10;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  try {
    const [{ rows }, countResult] = await Promise.all([
      sql`
        select
          c.id,
          c.created_at,
          (select count(*) from messages m where m.conversation_id = c.id) as message_count,
          (select content from messages m where m.conversation_id = c.id order by m.created_at desc limit 1) as last_message
        from conversations c
        order by c.created_at desc
        limit ${PAGE_SIZE} offset ${offset}
      `,
      sql`select count(*) as count from conversations`,
    ]);

    const total = Number(countResult.rows[0].count);
    return NextResponse.json({
      conversations: rows,
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    });
  } catch (error) {
    console.error("Error listing conversations", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
