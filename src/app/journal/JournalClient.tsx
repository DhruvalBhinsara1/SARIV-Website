"use client";

import { useState } from "react";
import Link from "next/link";
import { Pagination } from "@/components/ui/Pagination";
import { cn } from "@/lib/utils";

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

type JournalClientProps = {
  initialCategory: string;
  categories: string[];
  allPosts: Post[];
};

const POSTS_PER_PAGE = 7;

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function readingTime(text: string) {
  return `${Math.max(2, Math.round(text.split(/\s+/).length / 40))} min read`;
}

function Meta({ post, className }: { post: Post; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-muted", className)}>
      <span>{post.category}</span>
      <span className="w-3 h-px bg-border" />
      <span>{formatDate(post.date)}</span>
    </div>
  );
}

// ── Lead story — full-bleed editorial opener, typography-first ──────────────
function LeadStory({ post }: { post: Post }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group block border-b border-border pb-16 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-end gap-6 md:gap-16">
        <div className="max-w-3xl">
          <Meta post={post} className="mb-8" />
          <h2 className="font-display font-normal text-primary text-[clamp(34px,5.2vw,68px)] leading-[1.02] tracking-[-0.02em] mb-6">
            <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_1px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_1px] transition-[background-size] duration-500">
              {post.title}
            </span>
          </h2>
          <p className="font-body text-secondary text-lg md:text-xl leading-relaxed max-w-xl">
            {post.description}
          </p>
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase text-muted whitespace-nowrap">
          {readingTime(post.description)}
        </span>
      </div>
    </Link>
  );
}

// ── Wide story — horizontal, index-numbered, quiet ─────────────────────────
function WideStory({ post, index }: { post: Post; index: number }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group grid grid-cols-1 md:grid-cols-[64px_1fr_1fr] gap-4 md:gap-12 items-start border-b border-border py-10 md:py-12"
    >
      <span className="font-mono text-xs text-muted tracking-widest pt-2">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <Meta post={post} className="mb-4" />
        <h3 className="font-display font-normal text-primary text-2xl md:text-[32px] leading-[1.15] group-hover:text-secondary transition-colors">
          {post.title}
        </h3>
      </div>
      <p className="font-body text-secondary text-[15px] leading-relaxed md:pt-8 max-w-md">
        {post.description}
      </p>
    </Link>
  );
}

// ── Tall story — vertical, dense, tinted panel ─────────────────────────────
const TINTS = ["bg-mist-blue", "bg-warm-sand", "bg-pale-lavender", "bg-fog-green", "bg-soft-peach"];

function TallStory({ post, tint }: { post: Post; tint: string }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className={cn(
        "group flex flex-col justify-between rounded-2xl p-8 md:p-10 min-h-[320px] transition-transform duration-500 hover:-translate-y-1",
        tint
      )}
    >
      <Meta post={post} />
      <div>
        <h3 className="font-display font-normal text-primary text-2xl md:text-[28px] leading-[1.15] mb-4">
          {post.title}
        </h3>
        <p className="font-body text-secondary text-sm leading-relaxed line-clamp-3">
          {post.description}
        </p>
        <span className="font-mono text-[10px] tracking-widest uppercase text-primary mt-6 inline-flex items-center gap-2">
          Read
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </div>
    </Link>
  );
}

// ── Quiet story — title only, maximum negative space ──────────────────────
function QuietStory({ post }: { post: Post }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group flex flex-col justify-center border-b border-border py-10 md:py-14"
    >
      <Meta post={post} className="mb-4" />
      <h3 className="font-display font-normal text-primary text-2xl md:text-4xl leading-[1.1] max-w-2xl group-hover:translate-x-2 transition-transform duration-500">
        {post.title}
      </h3>
    </Link>
  );
}

export function JournalClient({ initialCategory, categories, allPosts }: JournalClientProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts =
    activeCategory === "All"
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Deliberate, repeating rhythm — variety without randomness. Only page 1
  // gets a lead story; later pages continue as a run of stories.
  const lead = currentPage === 1 ? currentPosts[0] : undefined;
  const rest = currentPage === 1 ? currentPosts.slice(1) : currentPosts;
  const pair = rest.slice(0, 2);
  const wide = rest.slice(2, 4);
  const quiet = rest.slice(4);

  return (
    <div className="w-full flex flex-col">
      {/* Category filters */}
      <div className="flex flex-wrap items-center gap-6 border-b border-border pb-6 mb-16 md:mb-24">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
                window.history.pushState(
                  null,
                  "",
                  category === "All" ? "/journal" : `/journal?category=${encodeURIComponent(category)}`
                );
              }}
              className={cn(
                "font-mono text-[11px] tracking-widest uppercase transition-colors cursor-pointer",
                isActive ? "text-primary" : "text-muted hover:text-secondary"
              )}
            >
              {category}
              {isActive && <span className="block h-px bg-primary mt-1.5" />}
            </button>
          );
        })}
      </div>

      {lead && <LeadStory post={lead} />}

      {pair.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 py-16 md:py-24">
          {pair.map((post, i) => (
            <TallStory key={post.slug} post={post} tint={TINTS[i % TINTS.length]} />
          ))}
        </div>
      )}

      {wide.length > 0 && (
        <div className="flex flex-col border-t border-border">
          {wide.map((post, i) => (
            <WideStory key={post.slug} post={post} index={i + 1} />
          ))}
        </div>
      )}

      {quiet.length > 0 && (
        <div className="flex flex-col pt-16 md:pt-24">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-8">
            More writing
          </span>
          {quiet.map((post) => (
            <QuietStory key={post.slug} post={post} />
          ))}
        </div>
      )}

      {currentPosts.length === 0 && (
        <p className="font-body text-muted py-24">No articles in this category yet.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center pt-20">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}
    </div>
  );
}
