import type { MetadataRoute } from "next";
import { getJournalPosts } from "@/lib/journal";

const BASE_URL = "https://sariv-web.vercel.app";

const STATIC_ROUTES = [
  "",
  "/work",
  "/identity",
  "/about",
  "/contact",
  "/start-project",
  "/journal",
  "/products/freeflow",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const journalEntries = getJournalPosts().map((post) => ({
    url: `${BASE_URL}/journal/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  return [...staticEntries, ...journalEntries];
}
