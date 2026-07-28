export type StoredChunk = {
  content: string;
  embedding: number[];
  metadata: Record<string, unknown>;
};

export type RetrievedChunk = {
  content: string;
  metadata: Record<string, unknown>;
  distance: number;
};

export interface VectorStore {
  // Replaces all chunks previously stored for this document (re-ingestion safe).
  replaceDocument(documentId: string, source: string, chunks: StoredChunk[]): Promise<void>;
  search(embedding: number[], k: number): Promise<RetrievedChunk[]>;
}
