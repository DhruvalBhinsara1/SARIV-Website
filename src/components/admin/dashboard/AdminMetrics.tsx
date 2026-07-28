"use client";
import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

type UsageStats = {
  conversations: number;
  messages: number;
  documentChunks: number;
  messagesLast24h: number;
};

// Dummy sparklines for aesthetic
const sparklines = [
  "M0 20 Q 10 10 20 20 T 40 15 T 60 20 T 80 10 T 100 20",
  "M0 15 Q 15 5 30 15 T 50 10 T 70 20 T 90 5 T 100 15",
  "M0 25 Q 10 15 25 25 T 45 15 T 65 25 T 85 10 T 100 25",
  "M0 10 Q 20 25 40 10 T 60 25 T 80 10 T 100 15",
];

export function AdminMetrics({ stats, loading }: { stats: UsageStats | null; loading: boolean }) {
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-3xl border border-border/50 bg-surface p-5 sm:p-6 shadow-sm flex flex-col justify-between aspect-[4/3] lg:aspect-auto">
            <Skeleton className="h-3 w-16 sm:w-20 mb-4" />
            <Skeleton className="h-8 sm:h-10 w-16 sm:w-24 mb-4" />
            <Skeleton className="h-6 w-full mt-auto lg:mt-6" />
          </div>
        ))}
      </div>
    );
  }

  const items = [
    { title: "Active Conversations", value: stats.conversations },
    { title: "Messages Answered", value: stats.messages },
    { title: "Messages (24h)", value: stats.messagesLast24h },
    { title: "Document Chunks", value: stats.documentChunks },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div key={index} className="rounded-3xl border border-border/50 bg-surface p-5 sm:p-6 shadow-sm flex flex-col relative overflow-hidden group">
          <span className="text-[11px] sm:text-xs text-muted font-medium mb-3">
            {item.title}
          </span>
          <div className="flex items-end gap-2 mt-2">
            <h4 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              {item.value.toLocaleString()}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
