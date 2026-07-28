import { embedMany } from "ai";
import { embeddingModel } from "@/lib/ai/model";

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const { embeddings } = await embedMany({ model: embeddingModel, values: texts });
  return embeddings;
}
