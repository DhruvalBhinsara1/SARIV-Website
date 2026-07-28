"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";

export type JournalPostDraft = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  content: string;
  published: boolean;
  date: string;
};

export function JournalEditor({ initialData }: { initialData?: JournalPostDraft }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [post, setPost] = useState<JournalPostDraft>(
    initialData || {
      title: "",
      slug: "",
      description: "",
      category: "Design",
      content: "",
      published: false,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
  );
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      if (!post.title || !post.slug || !post.content) {
        throw new Error("Title, slug, and content are required.");
      }

      const url = post.id ? `/api/journal/${post.id}` : '/api/journal';
      const method = post.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save post");
      }

      router.push("/admin/journal");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save post");
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to upload image");
      }

      const { url } = await res.json();

      // Insert image markdown at cursor
      const textarea = contentTextareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const imageMarkdown = `\n![${file.name}](${url})\n`;
        
        const newContent = post.content.substring(0, start) + imageMarkdown + post.content.substring(end);
        setPost({ ...post, content: newContent });
        
        // Reset cursor position
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
        }, 0);
      } else {
        setPost({ ...post, content: post.content + `\n![${file.name}](${url})\n` });
      }

    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          icon={<ArrowLeft className="w-4 h-4" />} 
          onClick={() => router.back()}
        >
          Back
        </Button>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-secondary hover:text-primary transition-colors">
            <input 
              type="checkbox" 
              checked={post.published}
              onChange={(e) => setPost({...post, published: e.target.checked})}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            Published
          </label>
          <Button 
            onClick={handleSave} 
            disabled={loading} 
            icon={<Save className="w-4 h-4" />}
          >
            {loading ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-error/10 text-error rounded-xl text-sm font-medium border border-error/20">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Main Editor */}
          <div className="bg-surface rounded-3xl p-6 shadow-sm border border-border/50 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Title</label>
              <Input 
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
                placeholder="Post title..."
                className="text-lg font-medium"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-primary">Content (Markdown)</label>
                <div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                  <Button 
                    variant="secondary" 
                    size="small" 
                    icon={<ImageIcon className="w-4 h-4" />}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? "Uploading..." : "Insert Image"}
                  </Button>
                </div>
              </div>
              <textarea
                ref={contentTextareaRef}
                value={post.content}
                onChange={(e) => setPost({...post, content: e.target.value})}
                placeholder="Write your post in Markdown here..."
                className="w-full min-h-[500px] p-4 rounded-xl bg-background border border-border text-primary font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-1 flex flex-col gap-6">
          {/* Meta Information */}
          <div className="bg-surface rounded-3xl p-6 shadow-sm border border-border/50 flex flex-col gap-6">
            <Typography variant="subheading" className="text-lg">Metadata</Typography>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Slug</label>
              <Input 
                value={post.slug}
                onChange={(e) => setPost({...post, slug: e.target.value})}
                placeholder="url-friendly-slug"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Category</label>
              <select 
                value={post.category}
                onChange={(e) => setPost({...post, category: e.target.value})}
                className="w-full bg-background border border-border text-primary rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
              >
                <option value="Design">Design</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Updates">Updates</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Display Date</label>
              <Input 
                value={post.date}
                onChange={(e) => setPost({...post, date: e.target.value})}
                placeholder="Oct 23, 2024"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary">Description</label>
              <textarea
                value={post.description}
                onChange={(e) => setPost({...post, description: e.target.value})}
                placeholder="Brief summary for the journal feed..."
                className="w-full h-32 p-3 rounded-xl bg-background border border-border text-primary text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
