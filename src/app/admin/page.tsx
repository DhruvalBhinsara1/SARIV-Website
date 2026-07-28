"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLiveInterval } from "@/lib/useLiveInterval";
import { AdminMetrics } from "@/components/admin/dashboard/AdminMetrics";
import { Search, User, Hash } from "lucide-react";

const POLL_MS = 10_000;

type UsageStats = {
  conversations: number;
  messages: number;
  documentChunks: number;
  messagesLast24h: number;
};
type ReindexSummary = { source: string; documentId: string; chunkCount: number };
type RetrievedChunk = { content: string; metadata: Record<string, unknown>; distance: number };
type ConversationRow = {
  id: string;
  created_at: string;
  message_count: number;
  last_message: string | null;
};
type Message = { role: "user" | "assistant"; content: string };

async function safeJson(res: Response): Promise<Record<string, unknown> | null> {
  try { return await res.json(); } catch { return null; }
}

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 mt-2">
      <ErrorBoundary label="Usage">
        <UsageSection />
      </ErrorBoundary>
      
      <ErrorBoundary label="Reindex">
        <ReindexSection />
      </ErrorBoundary>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        <ErrorBoundary label="Conversations">
          <ConversationsSection />
        </ErrorBoundary>
        <ErrorBoundary label="Debug Retrieval">
          <RetrievalSection />
        </ErrorBoundary>
      </div>
    </div>
  );
}

function UsageSection() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [error, setError] = useState("");
  const isFetchingRef = useRef(false);

  const load = useCallback(async () => {
    if (isFetchingRef.current) return; 
    isFetchingRef.current = true;
    try {
      const res = await fetch("/api/admin/usage");
      const data = await safeJson(res);
      if (!res.ok || !data) throw new Error((data?.error as string) || "Failed to load usage");
      setStats(data as unknown as UsageStats);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load usage");
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  useLiveInterval(load, POLL_MS);

  return (
    <section id="usage" className="scroll-mt-24">
      {error && <p className="text-error text-sm mb-4">{error}</p>}
      <div className="w-full">
        <AdminMetrics stats={stats} loading={stats === null} />
      </div>
    </section>
  );
}

function ReindexSection() {
  const [summary, setSummary] = useState<ReindexSummary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    setLoading(true);
    setError("");
    setSummary(null);
    try {
      const res = await fetch("/api/admin/reindex", { method: "POST" });
      const data = await safeJson(res);
      if (!res.ok || !data) throw new Error((data?.error as string) || "Reindex failed");
      setSummary(data.summary as ReindexSummary[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reindex failed");
    } finally {
      setLoading(false);
    }
  }

  // Find max chunks for progress bar scaling
  const maxChunks = summary ? Math.max(...summary.map(s => s.chunkCount), 1) : 1;

  return (
    <section id="reindex" className="scroll-mt-24">
      <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col border border-border/50">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-medium text-secondary">Document Processing</h3>
          <button 
            onClick={run} 
            disabled={loading}
            className="text-xs font-medium bg-primary text-surface px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Reindexing..." : "Reindex Now"}
          </button>
        </div>
        
        {error && <p className="text-error text-sm mb-4">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full rounded-full" />
              </div>
            ))
          ) : summary && summary.length > 0 ? (
            summary.map((row, i) => {
              const percentage = Math.round((row.chunkCount / maxChunks) * 100);
              const isHigh = percentage > 80;
              const isMedium = percentage > 40 && percentage <= 80;
              
              return (
                <div key={i} className="flex flex-col gap-3 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-8 rounded-lg bg-surface-elevated flex items-center justify-center shrink-0 border border-border">
                      <Hash className="w-4 h-4 text-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-primary truncate">{row.documentId}</h4>
                      <p className="text-xs text-muted truncate">{row.source}</p>
                    </div>
                    <div className="text-xs font-bold text-secondary text-right shrink-0">
                      {row.chunkCount} <span className="text-muted font-normal ml-1">Chunks</span>
                    </div>
                  </div>
                  
                  <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isHigh ? "bg-success/80" : isMedium ? "bg-warning/80" : "bg-error/80"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
             <div className="col-span-full text-center py-8 text-sm text-muted">
               Run reindex to populate document processing data.
             </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ConversationsSection() {
  const [conversations, setConversations] = useState<ConversationRow[] | null>(null);
  const [error, setError] = useState("");
  const isFetchingRef = useRef(false);

  const load = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      const res = await fetch(`/api/admin/conversations?page=1`);
      const data = await safeJson(res);
      if (!res.ok || !data) throw new Error((data?.error as string) || "Failed to load conversations");
      setConversations(data.conversations as ConversationRow[]);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load conversations");
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  useLiveInterval(load, POLL_MS);

  return (
    <section id="conversations" className="scroll-mt-24 h-full">
      <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col h-full border border-border/50">
        <h3 className="text-sm font-medium text-secondary mb-6">Recent Conversations</h3>
        
        {error && <p className="text-error text-sm mb-4">{error}</p>}
        
        <div className="flex flex-col gap-5 flex-1">
          {conversations === null ? (
             Array.from({ length: 5 }).map((_, i) => (
               <div key={i} className="flex items-center gap-3">
                 <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                 <div className="flex flex-col gap-2 flex-1">
                   <Skeleton className="h-4 w-32" />
                   <Skeleton className="h-3 w-48" />
                 </div>
               </div>
             ))
          ) : conversations.length === 0 ? (
             <div className="text-sm text-muted py-8 text-center">No active conversations.</div>
          ) : (
            conversations.slice(0, 5).map((c, i) => (
              <div key={c.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-primary truncate">User {c.id.slice(0, 6)}</h4>
                    <p className="text-xs text-muted truncate pr-4">{c.last_message || "Started a session"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold text-primary">{c.message_count}</span>
                  {i === 0 ? (
                    <span className="text-success text-xs">▲</span>
                  ) : (
                    <span className="text-error text-xs">▼</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function RetrievalSection() {
  const [query, setQuery] = useState("");
  const [chunks, setChunks] = useState<RetrievedChunk[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search() {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setChunks(null);
    try {
      const res = await fetch("/api/admin/debug-retrieval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, k: 3 }),
      });
      const data = await safeJson(res);
      if (!res.ok || !data) throw new Error((data?.error as string) || "Retrieval failed");
      setChunks(data.chunks as RetrievedChunk[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Retrieval failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="retrieval" className="scroll-mt-24 h-full">
      <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col h-full border border-border/50">
        <h3 className="text-sm font-medium text-secondary mb-6">Semantic Search</h3>
        
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            className="flex-1 rounded-xl bg-surface-elevated/50 border-transparent focus:bg-surface"
          />
          <Button onClick={search} disabled={loading || !query.trim()} size="medium" icon={<Search className="w-4 h-4" />}>
            Search
          </Button>
        </div>
        
        {error && <p className="text-error text-sm mb-4">{error}</p>}
        
        <div className="flex flex-col gap-4 flex-1">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2 p-3 rounded-xl border border-border/50">
                   <Skeleton className="h-3 w-1/3" />
                   <Skeleton className="h-3 w-full" />
                </div>
             ))
          ) : chunks ? (
            chunks.length === 0 ? (
              <div className="text-sm text-muted py-8 text-center">No chunks found.</div>
            ) : (
              chunks.map((chunk, i) => (
                <div key={i} className="border border-border/50 bg-surface-elevated/30 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary truncate max-w-[70%]">
                      {String(chunk.metadata.title ?? "Untitled")}
                    </span>
                    <span className="text-[10px] text-muted font-medium bg-surface-elevated px-2 py-1 rounded-full">
                      {(chunk.distance * 100).toFixed(1)}% Match
                    </span>
                  </div>
                  <p className="text-xs text-secondary line-clamp-2 leading-relaxed">{chunk.content}</p>
                </div>
              ))
            )
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted">
              <p className="text-xs">Query chunks from index.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
