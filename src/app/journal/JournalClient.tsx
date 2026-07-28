"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";

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

const POSTS_PER_PAGE = 6;

export function JournalClient({ initialCategory, categories, allPosts }: JournalClientProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter posts based on active category
  const filteredPosts =
    activeCategory === "All"
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  
  // Ensure current page is valid when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                // Optional: update URL silently for shareability
                window.history.pushState(null, '', category === "All" ? "/journal" : `/journal?category=${encodeURIComponent(category)}`);
              }}
              className={buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "small" })}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px] content-start">
        {currentPosts.map((post, i) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="group h-full block">
            <Card className="h-full flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-elevation animate-fade-up" style={{ animationDelay: `${0.15 + (i * 0.05)}s` }}>
              <CardHeader>
                <Typography variant="caption" transform="uppercase" muted className="mb-4">
                  {post.category}
                </Typography>
                <CardTitle className="group-hover:text-secondary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-4 flex flex-col justify-end">
                <CardDescription className="mb-6">
                  {post.description}
                </CardDescription>
                <Typography variant="caption" muted>
                  {post.date}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
        {currentPosts.length === 0 && isClient && (
          <div className="col-span-full py-20 text-center">
            <Typography variant="body" muted>No articles found for this category.</Typography>
          </div>
        )}
      </div>

      {/* Custom Pagination options nicely placed */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 animate-fade-up border-t border-border/50 pt-8" style={{ animationDelay: "0.3s" }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}
    </div>
  );
}
