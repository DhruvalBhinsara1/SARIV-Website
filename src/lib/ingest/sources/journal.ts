import { getJournalPosts } from "@/lib/journal";
import type { DocumentSource, SourceDocument } from "@/lib/ingest/types";

export const journalSource: DocumentSource = {
  name: "journal",
  async load(): Promise<SourceDocument[]> {
    return getJournalPosts().map((post) => ({
      id: `journal:${post.slug}`,
      title: post.title,
      url: `/journal/${post.slug}`,
      content: post.content,
    }));
  },
};
