import { embedTexts } from "@/lib/ai/embeddings";
import { pgVectorStore } from "@/lib/db/pgVectorStore";
import type { RetrievedChunk } from "@/lib/db/vectorStore";

export async function retrieveRelevantChunks(query: string, k = 5): Promise<RetrievedChunk[]> {
  const [embedding] = await embedTexts([query]);
  return pgVectorStore.search(embedding, k);
}
