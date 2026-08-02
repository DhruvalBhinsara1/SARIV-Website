import { sql } from "@/lib/db/client";

export async function recordFeedback(
  conversationId: string | undefined,
  question: string,
  answer: string,
  rating: "up" | "down"
) {
  await sql`
    insert into message_feedback (conversation_id, question, answer, rating)
    values (${conversationId ?? null}, ${question}, ${answer}, ${rating})
  `;
}
