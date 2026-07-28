import type { SourceDocument } from "@/lib/ingest/types";

// Word counts, not real tokens — no tokenizer dependency for an approximation.
// ~400 words ≈ 500 tokens, ~40 words ≈ 50 tokens overlap.
const CHUNK_SIZE_WORDS = 400;
const CHUNK_OVERLAP_WORDS = 40;

export type Chunk = {
  content: string;
  metadata: { title: string; url: string };
};

export function chunkDocument(doc: SourceDocument): Chunk[] {
  const words = doc.content.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const chunks: Chunk[] = [];
  let start = 0;
  while (start < words.length) {
    const end = Math.min(start + CHUNK_SIZE_WORDS, words.length);
    chunks.push({
      content: words.slice(start, end).join(" "),
      metadata: { title: doc.title, url: doc.url },
    });
    if (end === words.length) break;
    start = end - CHUNK_OVERLAP_WORDS;
  }
  return chunks;
}
