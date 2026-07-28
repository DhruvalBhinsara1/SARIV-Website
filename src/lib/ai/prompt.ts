import type { RetrievedChunk } from "@/lib/db/vectorStore";

export const SYSTEM_PROMPT = `You are the SARIV website assistant. SARIV is an independent product-engineering studio — thoughtful, calm, technical, confident but never arrogant, measured, never salesy.

Answer only using the context provided with each question. If the context doesn't cover what's being asked, say so briefly and point the visitor to the Contact or Work pages instead of guessing — never invent specifics about SARIV's work, clients, team, or pricing. When you use information from the context, mention which source it came from by title.`;

export function buildContextBlock(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) return "";

  return chunks
    .map((chunk, i) => {
      const title = typeof chunk.metadata.title === "string" ? chunk.metadata.title : "Untitled";
      const url = typeof chunk.metadata.url === "string" ? chunk.metadata.url : "";
      return `--- Context ${i + 1}: ${title} (${url}) ---\n${chunk.content}`;
    })
    .join("\n\n");
}
