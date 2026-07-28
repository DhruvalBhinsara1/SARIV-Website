import { sql } from "@/lib/db/client";

// ponytail: session_id is a fresh uuid per new conversation, not a real
// visitor identity yet — add cookie-based session tracking when something
// (e.g. an admin "conversations by visitor" view) actually needs it.
export async function getOrCreateConversation(conversationId?: string) {
  if (conversationId) {
    const existing = await sql`select id from conversations where id = ${conversationId}`;
    if (existing.rows.length > 0) return conversationId;
  }

  const created = await sql`
    insert into conversations (session_id) values (${crypto.randomUUID()})
    returning id
  `;
  return created.rows[0].id as string;
}

export async function appendMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string
) {
  await sql`
    insert into messages (conversation_id, role, content)
    values (${conversationId}, ${role}, ${content})
  `;
}

export type StoredMessage = { role: "user" | "assistant"; content: string };

export async function getRecentMessages(
  conversationId: string,
  limit = 10
): Promise<StoredMessage[]> {
  const { rows } = await sql`
    select role, content from messages
    where conversation_id = ${conversationId}
    order by created_at desc
    limit ${limit}
  `;
  return rows.reverse() as StoredMessage[];
}
