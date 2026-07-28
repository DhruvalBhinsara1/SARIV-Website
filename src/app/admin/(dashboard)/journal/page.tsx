import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { sql } from "@vercel/postgres";
import { AdminJournalClient } from "@/components/admin/journal/AdminJournalClient";

export default async function AdminJournalPage() {
  let posts: any[] = [];
  let error = null;

  try {
    const result = await sql`
      SELECT id, title, category, date, published 
      FROM journal_posts 
      ORDER BY created_at DESC
    `;
    posts = result.rows;
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return (
      <div className="text-error bg-error/10 p-4 rounded-xl">
        Error loading posts: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="heading" className="text-2xl mb-1">Journal</Typography>
          <Typography variant="body" className="text-muted-foreground text-sm">
            Manage your blog posts, case studies, and updates.
          </Typography>
        </div>
        <Link href="/admin/journal/new">
          <Button icon={<Plus className="w-4 h-4" />}>
            New Post
          </Button>
        </Link>
      </div>

      <AdminJournalClient initialPosts={posts} />
    </div>
  );
}
