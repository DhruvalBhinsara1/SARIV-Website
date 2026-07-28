import { getJournalPosts } from "@/lib/journal";
import type { DocumentSource, SourceDocument } from "@/lib/ingest/types";

export const journalSource: DocumentSource = {
  name: "journal",
  async load(): Promise<SourceDocument[]> {
    const posts = await getJournalPosts();
    return posts.map((post) => ({
      id: `journal:${post.slug}`,
      title: post.title,
      url: `/journal/${post.slug}`,
      content: post.content,
    }));
  },
};
