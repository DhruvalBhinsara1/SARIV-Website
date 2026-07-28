"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { PenTool, Trash2 } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";

const POSTS_PER_PAGE = 10;

export function AdminJournalClient({ initialPosts }: { initialPosts: any[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/journal/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) throw new Error("Failed to delete post");
      
      setPosts(posts.filter(p => p.id !== id));
      
      // Adjust page if we deleted the last item on the current page
      if (currentPosts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    } finally {
      setIsDeleting(null);
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-surface rounded-3xl p-6 shadow-sm border border-border/50">
        <div className="text-center py-12 text-muted">
          <PenTool className="w-8 h-8 mx-auto mb-4 opacity-50" />
          <p>No posts yet. Create your first one!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-3xl p-6 shadow-sm border border-border/50 flex flex-col gap-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted font-semibold">
              <th className="pb-3 font-medium">Title</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id} className="border-b border-border/50 last:border-0 group">
                <td className="py-4 font-medium text-primary">
                  {post.title}
                </td>
                <td className="py-4 text-secondary text-sm">
                  {post.category}
                </td>
                <td className="py-4">
                  {post.published ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-success/10 text-success text-xs font-bold">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-surface-elevated text-muted text-xs font-bold">
                      Draft
                    </span>
                  )}
                </td>
                <td className="py-4 text-muted text-sm whitespace-nowrap">
                  {post.date}
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/journal/${post.id}`}>
                      <Button variant="outline" size="small">Edit</Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="small" 
                      onClick={() => handleDelete(post.id)}
                      disabled={isDeleting === post.id}
                      className="text-error hover:bg-error/10 hover:text-error"
                      icon={<Trash2 className="w-4 h-4" />}
                    >
                      {isDeleting === post.id ? "..." : ""}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 border-t border-border/50 pt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
