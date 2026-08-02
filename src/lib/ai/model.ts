import { google } from "@ai-sdk/google";

// Single swap point for the LLM provider — change these lines (and the package
// installed) to move off Google, nothing else in the app imports @ai-sdk/google directly.
// gemini-1.5-pro and 2.5-flash are both retired for new API keys — 3.5-flash is the current stable replacement.
export const chatModel = google(process.env.GOOGLE_CHAT_MODEL || "gemini-3.5-flash");
export const embeddingModel = google.textEmbeddingModel(
  process.env.GOOGLE_EMBEDDING_MODEL || "gemini-embedding-2"
);
