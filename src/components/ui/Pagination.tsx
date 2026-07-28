"use client";

import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

// Adapted from a TailAdmin-style pagination component, restyled to SARIV's tokens.
export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => i + Math.max(Math.min(currentPage - 1, totalPages - 2), 1)
  );

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 px-3 flex items-center justify-center rounded-full border border-border text-sm text-secondary hover:bg-surface-elevated hover:text-primary transition-colors disabled:opacity-40 disabled:pointer-events-none"
      >
        Previous
      </button>
      <div className="flex items-center gap-1">
        {currentPage > 2 && <span className="px-1 text-muted text-sm">…</span>}
        {pagesAroundCurrent.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors",
              currentPage === page
                ? "bg-primary text-surface"
                : "text-secondary hover:bg-surface-elevated hover:text-primary"
            )}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages - 1 && <span className="px-1 text-muted text-sm">…</span>}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 px-3 flex items-center justify-center rounded-full border border-border text-sm text-secondary hover:bg-surface-elevated hover:text-primary transition-colors disabled:opacity-40 disabled:pointer-events-none"
      >
        Next
      </button>
    </div>
  );
}
