import type { DocumentSource } from "@/lib/ingest/types";
import { chunkDocument } from "@/lib/ingest/chunking";
import { journalSource } from "@/lib/ingest/sources/journal";
import { pagesSource } from "@/lib/ingest/sources/pages";
import { embedTexts } from "@/lib/ai/embeddings";
import { pgVectorStore } from "@/lib/db/pgVectorStore";

const SOURCES: DocumentSource[] = [journalSource, pagesSource];

export type IngestionResult = { source: string; documentId: string; chunkCount: number };

export async function runIngestion(): Promise<IngestionResult[]> {
  const results: IngestionResult[] = [];

  for (const source of SOURCES) {
    const docs = await source.load();

    for (const doc of docs) {
      const chunks = chunkDocument(doc);
      if (chunks.length > 0) {
        const embeddings = await embedTexts(chunks.map((chunk) => chunk.content));
        await pgVectorStore.replaceDocument(
          doc.id,
          source.name,
          chunks.map((chunk, i) => ({
            content: chunk.content,
            embedding: embeddings[i],
            metadata: chunk.metadata,
          }))
        );
      }
      results.push({ source: source.name, documentId: doc.id, chunkCount: chunks.length });
    }
  }

  return results;
}
