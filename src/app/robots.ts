import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/export-banner"],
    },
    sitemap: "https://sariv-web.vercel.app/sitemap.xml",
  };
}
