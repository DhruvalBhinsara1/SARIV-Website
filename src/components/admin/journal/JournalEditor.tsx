"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { ArrowLeft, Save, Image as ImageIcon, Eye, Edit2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

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
  const [mode, setMode] = useState<"write" | "preview">("write");

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
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-primary">Content</label>
                  <div className="flex bg-surface-elevated rounded-lg p-1">
                    <button 
                      onClick={() => setMode("write")} 
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-2 ${mode === "write" ? "bg-surface shadow-sm text-primary" : "text-muted hover:text-primary"}`}
                    >
                      <Edit2 className="w-3 h-3" />
                      Write
                    </button>
                    <button 
                      onClick={() => setMode("preview")} 
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-2 ${mode === "preview" ? "bg-surface shadow-sm text-primary" : "text-muted hover:text-primary"}`}
                    >
                      <Eye className="w-3 h-3" />
                      Preview
                    </button>
                  </div>
                </div>
                <div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                  {mode === "write" && (
                    <Button 
                      variant="secondary" 
                      size="small" 
                      icon={<ImageIcon className="w-4 h-4" />}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? "Uploading..." : "Insert Image"}
                    </Button>
                  )}
                </div>
              </div>
              
              {mode === "write" ? (
                <textarea
                  ref={contentTextareaRef}
                  value={post.content}
                  onChange={(e) => setPost({...post, content: e.target.value})}
                  placeholder="Write your post in Markdown here..."
                  className="w-full min-h-[500px] p-4 rounded-xl bg-background border border-border text-primary font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              ) : (
                <div className="w-full min-h-[500px] p-6 rounded-xl bg-background border border-border overflow-y-auto">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => <Typography variant="heading" className="mt-8 mb-6 text-3xl" {...props} />,
                      h2: ({ node, ...props }) => <Typography variant="heading" className="mt-8 mb-6 text-2xl" {...props} />,
                      h3: ({ node, ...props }) => <Typography variant="subheading" className="mt-6 mb-4 font-bold" {...props} />,
                      p: ({ node, ...props }) => <Typography variant="body" className="mb-6 leading-relaxed" {...props} />,
                      a: ({ node, ...props }) => <a className="text-secondary hover:underline underline-offset-4" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-6 space-y-2 text-muted-foreground" {...props} />,
                      li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-secondary pl-6 italic my-8 text-muted-foreground" {...props} />
                      ),
                      code: ({ node, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || "");
                        const isInline = !match && !className;
                        return isInline ? (
                          <code className="bg-surface-elevated px-1.5 py-0.5 rounded-md text-sm font-mono text-primary" {...props}>
                            {children}
                          </code>
                        ) : (
                          <div className="rounded-xl overflow-hidden my-6 border border-border shadow-sm">
                            <pre className="bg-surface-elevated p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          </div>
                        );
                      },
                      img: ({ node, ...props }) => (
                        <img className="rounded-xl border border-border my-8 w-full object-cover" {...props} />
                      )
                    }}
                  >
                    {post.content || "*Nothing to preview yet...*"}
                  </ReactMarkdown>
                </div>
              )}
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
