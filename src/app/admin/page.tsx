"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mark } from "@/components/Mark";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLiveInterval } from "@/lib/useLiveInterval";
import { cn } from "@/lib/utils";

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

// Every fetch response is parsed defensively — a non-JSON error page (a
// platform hiccup, a timeout) shouldn't throw and blank a section.
async function safeJson(res: Response): Promise<Record<string, unknown> | null> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

const NAV_ITEMS = [
  { id: "usage", label: "Usage" },
  { id: "reindex", label: "Reindex" },
  { id: "retrieval", label: "Debug Retrieval" },
  { id: "conversations", label: "Conversations" },
];

export default function AdminPage() {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-[100dvh] flex bg-background">
      <aside className="hidden md:flex w-60 shrink-0 border-r border-border flex-col py-8 px-5 gap-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Mark className="w-4 h-4 text-surface" />
          </div>
          <span className="font-display text-lg text-primary">SARIV Admin</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-lg px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-elevated transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-border">
          <h1 className="font-display text-xl text-primary md:hidden">SARIV Admin</h1>
          <span className="hidden md:block" />
          <Button variant="ghost" size="small" onClick={logout}>
            Log out
          </Button>
        </div>

        <div className="px-6 md:px-10 py-10 flex flex-col gap-16 max-w-3xl">
          <ErrorBoundary label="Usage">
            <UsageSection />
          </ErrorBoundary>
          <ErrorBoundary label="Reindex">
            <ReindexSection />
          </ErrorBoundary>
          <ErrorBoundary label="Debug Retrieval">
            <RetrievalSection />
          </ErrorBoundary>
          <ErrorBoundary label="Conversations">
            <ConversationsSection />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}

function LiveIndicator({ lastUpdated }: { lastUpdated: number | null }) {
  if (!lastUpdated) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
      Live · updated {new Date(lastUpdated).toLocaleTimeString()}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border rounded-xl p-4">
      <p className="text-2xl font-display text-primary">{value}</p>
      <p className="text-muted text-xs uppercase tracking-wide mt-1">{label}</p>
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="border border-border rounded-xl p-4">
      <Skeleton className="h-7 w-10 mb-3" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

function TableSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-10" />
        </div>
      ))}
    </div>
  );
}

function ChunkSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="border border-border rounded-xl p-4">
          <Skeleton className="h-3 w-48 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}

function ConversationRowSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

function MessageSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded-full shrink-0" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  );
}

function UsageSection() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const isFetchingRef = useRef(false);

  const load = useCallback(async () => {
    if (isFetchingRef.current) return; // a burst of poll ticks can never overlap
    isFetchingRef.current = true;
    try {
      const res = await fetch("/api/admin/usage");
      const data = await safeJson(res);
      if (!res.ok || !data) throw new Error((data?.error as string) || "Failed to load usage");
      setStats(data as unknown as UsageStats);
      setLastUpdated(Date.now());
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load usage");
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);
  useLiveInterval(load, POLL_MS);

  return (
    <section id="usage" className="scroll-mt-6">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="font-display text-xl text-primary">Usage</h2>
        <LiveIndicator lastUpdated={lastUpdated} />
      </div>
      {error && <p className="text-error text-sm mb-2">{error}</p>}
      {stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Conversations" value={stats.conversations} />
          <Stat label="Messages" value={stats.messages} />
          <Stat label="Messages (24h)" value={stats.messagesLast24h} />
          <Stat label="Document chunks" value={stats.documentChunks} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatSkeleton key={i} />
          ))}
        </div>
      )}
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

  return (
    <section id="reindex" className="scroll-mt-6">
      <h2 className="font-display text-xl mb-4 text-primary">Reindex</h2>
      <Button onClick={run} disabled={loading}>
        {loading ? "Running…" : "Run Reindex"}
      </Button>
      {error && <p className="text-error text-sm mt-3">{error}</p>}
      {loading ? (
        <TableSkeleton rows={3} />
      ) : (
        summary && (
          <table className="w-full text-sm mt-4 border-collapse">
            <thead>
              <tr className="text-left text-muted border-b border-border">
                <th className="py-2 font-medium">Source</th>
                <th className="py-2 font-medium">Document</th>
                <th className="py-2 font-medium">Chunks</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((row) => (
                <tr key={row.documentId} className="border-b border-border">
                  <td className="py-2 text-primary">{row.source}</td>
                  <td className="py-2 text-primary">{row.documentId}</td>
                  <td className="py-2 text-primary">{row.chunkCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
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
        body: JSON.stringify({ query, k: 5 }),
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
    <section id="retrieval" className="scroll-mt-6">
      <h2 className="font-display text-xl mb-4 text-primary">Debug Retrieval</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Ask a question…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <Button onClick={search} disabled={loading || !query.trim()}>
          {loading ? "Searching…" : "Search"}
        </Button>
      </div>
      {error && <p className="text-error text-sm mt-3">{error}</p>}
      {loading ? (
        <ChunkSkeleton items={3} />
      ) : (
        chunks && (
          <div className="flex flex-col gap-3 mt-4">
            {chunks.length === 0 && (
              <p className="text-muted text-sm">No chunks found — has reindex been run?</p>
            )}
            {chunks.map((chunk, i) => (
              <div key={i} className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between text-xs text-muted mb-2">
                  <span>
                    {String(chunk.metadata.title ?? "Untitled")} — {String(chunk.metadata.url ?? "")}
                  </span>
                  <span>distance: {chunk.distance.toFixed(4)}</span>
                </div>
                <p className="text-sm text-primary line-clamp-4">{chunk.content}</p>
              </div>
            ))}
          </div>
        )
      )}
    </section>
  );
}

function ConversationsSection() {
  const [conversations, setConversations] = useState<ConversationRow[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const isFetchingRef = useRef(false);
  const pageRef = useRef(page);
  pageRef.current = page;

  const load = useCallback(async () => {
    if (isFetchingRef.current) return; // a burst of poll ticks can never overlap
    isFetchingRef.current = true;
    try {
      const res = await fetch(`/api/admin/conversations?page=${pageRef.current}`);
      const data = await safeJson(res);
      if (!res.ok || !data) throw new Error((data?.error as string) || "Failed to load conversations");
      setConversations(data.conversations as ConversationRow[]);
      setTotalPages((data.totalPages as number) ?? 1);
      setLastUpdated(Date.now());
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load conversations");
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  async function openConversation(id: string) {
    setSelected(id);
    setMessages(null);
    try {
      const res = await fetch(`/api/admin/conversations/${id}`);
      const data = await safeJson(res);
      if (!res.ok || !data) throw new Error((data?.error as string) || "Failed to load conversation");
      setMessages(data.messages as Message[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load conversation");
    }
  }

  useEffect(() => {
    load();
  }, [load, page]);
  useLiveInterval(load, POLL_MS);

  function changePage(next: number) {
    if (next < 1 || next > totalPages) return;
    setSelected(null);
    setMessages(null);
    setPage(next);
  }

  return (
    <section id="conversations" className="scroll-mt-6">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="font-display text-xl text-primary">Conversations</h2>
        <LiveIndicator lastUpdated={lastUpdated} />
      </div>
      {error && <p className="text-error text-sm mb-3">{error}</p>}
      {conversations === null ? (
        <ConversationRowSkeleton />
      ) : (
        <div className="flex flex-col gap-2">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => openConversation(c.id)}
              className={cn(
                "text-left border border-border rounded-xl p-4 hover:bg-surface-elevated transition-colors",
                selected === c.id && "border-primary/40 bg-surface-elevated"
              )}
            >
              <div className="flex items-center justify-between text-xs text-muted mb-1">
                <span>{new Date(c.created_at).toLocaleString()}</span>
                <span>{c.message_count} messages</span>
              </div>
              <p className="text-sm text-primary truncate">{c.last_message ?? "(empty)"}</p>
            </button>
          ))}
          {conversations.length === 0 && <p className="text-muted text-sm">No conversations yet.</p>}
        </div>
      )}

      <div className="mt-4">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={changePage} />
      </div>

      {selected && (
        <div className="mt-6 border border-border rounded-xl p-4">
          <h3 className="text-sm font-semibold text-primary mb-3">Conversation {selected}</h3>
          {messages ? (
            <div className="flex flex-col gap-3">
              {messages.map((m, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Badge color={m.role === "assistant" ? "primary" : "muted"}>{m.role}</Badge>
                  <span className="text-primary">{m.content}</span>
                </div>
              ))}
            </div>
          ) : (
            <MessageSkeleton />
          )}
        </div>
      )}
    </section>
  );
}
