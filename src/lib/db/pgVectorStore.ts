import { sql } from "@/lib/db/client";
import type { VectorStore, RetrievedChunk } from "@/lib/db/vectorStore";

// pgvector reads/writes its vector type as a string like "[0.1,0.2,...]",
// which is exactly what JSON.stringify gives us for a number array.
function toVectorLiteral(embedding: number[]): string {
  return JSON.stringify(embedding);
}

export const pgVectorStore: VectorStore = {
  async replaceDocument(documentId, source, chunks) {
    await sql`delete from document_chunks where metadata->>'documentId' = ${documentId}`;

    for (const chunk of chunks) {
      const metadata = JSON.stringify({ ...chunk.metadata, documentId });
      await sql`
        insert into document_chunks (source, content, embedding, metadata)
        values (${source}, ${chunk.content}, ${toVectorLiteral(chunk.embedding)}::vector, ${metadata}::jsonb)
      `;
    }
  },

  async search(embedding, k): Promise<RetrievedChunk[]> {
    const { rows } = await sql`
      select content, metadata, embedding <=> ${toVectorLiteral(embedding)}::vector as distance
      from document_chunks
      order by distance asc
      limit ${k}
    `;
    return rows.map((row) => ({
      content: row.content as string,
      metadata: row.metadata as Record<string, unknown>,
      distance: Number(row.distance),
    }));
  },
};
