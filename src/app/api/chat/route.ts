import { NextResponse } from "next/server";
import { z } from "zod";
import { streamText } from "ai";
import { chatModel } from "@/lib/ai/model";
import { SYSTEM_PROMPT, buildContextBlock } from "@/lib/ai/prompt";
import { retrieveRelevantChunks } from "@/lib/ai/retrieval";
import { getOrCreateConversation, appendMessage, getRecentMessages } from "@/lib/db/conversations";
import { isRateLimited, getClientKey } from "@/lib/rateLimit";

const chatSchema = z.object({
  conversationId: z.string().uuid().optional(),
  message: z.string().min(1, "Message is required").max(2000, "Message is too long"),
});

export async function POST(req: Request) {
  if (await isRateLimited(`chat:${getClientKey(req)}`)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();

  const result = chatSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.format() },
      { status: 400 }
    );
  }

  try {
    const conversationId = await getOrCreateConversation(result.data.conversationId);
    const history = await getRecentMessages(conversationId);
    await appendMessage(conversationId, "user", result.data.message);

    const chunks = await retrieveRelevantChunks(result.data.message);
    const contextBlock = buildContextBlock(chunks);
    const currentTurn = contextBlock
      ? `${contextBlock}\n\nQuestion: ${result.data.message}`
      : result.data.message;

    const streamResult = streamText({
      model: chatModel,
      system: SYSTEM_PROMPT,
      messages: [...history, { role: "user", content: currentTurn }],
      onError: ({ error }) => console.error("Error streaming chat reply", error),
      onEnd: ({ text }) => {
        appendMessage(conversationId, "assistant", text).catch((error) =>
          console.error("Error saving assistant message", error)
        );
      },
    });

    const sources = chunks.map((chunk) => ({
      title: chunk.metadata.title,
      url: chunk.metadata.url,
    }));

    return streamResult.toTextStreamResponse({
      headers: {
        "X-Conversation-Id": conversationId,
        "X-Sources": JSON.stringify(sources),
      },
    });
  } catch (error) {
    console.error("Error starting chat stream", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
