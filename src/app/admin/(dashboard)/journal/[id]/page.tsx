import { JournalEditor } from "@/components/admin/journal/JournalEditor";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";

export default async function EditJournalPostPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  let post = null;
  
  try {
    const { rows } = await sql`SELECT * FROM journal_posts WHERE id = ${id}`;
    if (rows.length > 0) {
      post = rows[0];
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full">
      <JournalEditor initialData={post as any} />
    </div>
  );
}
