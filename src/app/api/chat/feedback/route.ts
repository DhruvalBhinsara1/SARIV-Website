import { NextResponse } from "next/server";
import { z } from "zod";
import { recordFeedback } from "@/lib/db/feedback";
import { isRateLimited, getClientKey } from "@/lib/rateLimit";

const feedbackSchema = z.object({
  conversationId: z.string().uuid().optional(),
  question: z.string().min(1).max(2000),
  answer: z.string().min(1).max(4000),
  rating: z.enum(["up", "down"]),
});

export async function POST(req: Request) {
  if (await isRateLimited(`feedback:${getClientKey(req)}`, 30)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const result = feedbackSchema.safeParse(await req.json());
  if (!result.success) {
    return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 });
  }

  try {
    const { conversationId, question, answer, rating } = result.data;
    await recordFeedback(conversationId, question, answer, rating);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error recording chat feedback", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
