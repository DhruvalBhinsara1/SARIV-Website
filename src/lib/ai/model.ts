import { openai } from "@ai-sdk/openai";

// Single swap point for the LLM provider — change these lines (and the package
// installed) to move off OpenAI, nothing else in the app imports @ai-sdk/openai directly.
export const chatModel = openai(process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini");
export const embeddingModel = openai.textEmbeddingModel(
  process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small"
);
