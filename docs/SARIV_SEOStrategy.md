# SARIV SEO Strategy

**Version:** 1.0  
**Status:** Canonical Reference

---

## 1. Purpose

This document defines the search visibility strategy for the SARIV website.

At SARIV, SEO is not about forcefully ranking for keywords or gaming algorithms. It is about becoming the most authoritative, trustworthy answer to a user's question. 

Our strategy is designed to optimize SARIV for modern discovery engines, including:
- Traditional Search (Google, Bing, DuckDuckGo)
- AI Overviews (Google SGE)
- Conversational AI (ChatGPT, Claude, Gemini)
- Answer Engines (Perplexity)

Every page must exist to answer a real question clearly and definitively.

---

## 2. Core SEO Principles

1. **Write for Humans First:** Prioritize readability, clarity, and narrative.
2. **Structure for Machines Second:** Use semantic HTML and robust schema markup so engines easily parse the content.
3. **Demonstrate Expertise:** Authoritative, deeply technical content wins over shallow marketing copy.
4. **Show Evidence:** Support claims with hard data, case studies, and exact specifications.
5. **Build Topical Authority:** Do not rely on a few pages to rank; build a comprehensive library of knowledge (The Journal).
6. **Eliminate Thin Content:** Every URL must provide substantial value. If a page is thin, it must be expanded or merged.
7. **Intent Over Keywords:** Ensure the content perfectly matches what the user is actually trying to accomplish.

---

## 3. Search Intent Mapping

Every page created must target one specific user intent.

### 3.1 Informational Intent
The user is looking for knowledge.
- **Target Pages:** Journal Articles, About Page.
- **Examples:** *"What is AI product engineering?"*, *"How to design a scalable software architecture?"*

### 3.2 Commercial Intent
The user is researching potential vendors or solutions.
- **Target Pages:** Homepage, Studio, Case Studies.
- **Examples:** *"AI software development company"*, *"Product engineering studio"*

### 3.3 Navigational Intent
The user is specifically looking for SARIV.
- **Target Pages:** Homepage, Product detail pages.
- **Examples:** *"SARIV"*, *"SARIV Flow product"*

### 3.4 Transactional Intent
The user is ready to engage or hire.
- **Target Pages:** Contact Page, specific CTA landing pages.
- **Examples:** *"Hire AI engineers"*, *"Book software consultation"*

---

## 4. Website SEO Architecture

Information must flow logically, creating a tight semantic web.
`Homepage` → `Products` → `Product Detail` → `Related Case Study` → `Related Journal Article` → `Contact`

### 4.1 Homepage Strategy
- **Primary Target:** *AI Product Engineering*
- **Secondary Targets:** *Software Engineering Studio, AI Development Company, Custom Software Development.*
- **Objective:** Introduce SARIV and establish foundational topical relevance.

### 4.2 Product Pages
- Each product page must target one primary keyword and 3–5 supporting keywords.
- Must include a dedicated FAQ section to capture long-tail and AI conversational queries.
- Must link aggressively to related Case Studies and Journal articles.

### 4.3 Work (Case Studies)
- Case studies should rank independently for commercial/informational crossover queries (e.g., *"How to scale enterprise AI infrastructure"*).
- **Required Elements:** Clear statement of the Problem, Technical Approach, Technology Stack, and Measurable Outcomes.

### 4.4 The Journal
The Journal is the primary engine for organic growth and topical authority.
- Content will be grouped into **Clusters** (see Section 5).
- Internal linking between Journal articles and core Product pages is mandatory.

---

## 5. Content Clusters (The Journal)

By organizing content into thematic clusters, we signal deep expertise to search engines.

### 5.1 Cluster 1: Artificial Intelligence
- **Topics:** LLMs, Autonomous Agents, RAG (Retrieval-Augmented Generation), Fine-tuning, Evaluation Metrics, Prompt Engineering, Inference Optimization, Deployment.

### 5.2 Cluster 2: Software Engineering
- **Topics:** System Architecture, Testing Methodologies, Performance Optimization, Scalability, Backend/Frontend Systems, Cloud Infrastructure.

### 5.3 Cluster 3: Product Design
- **Topics:** UX Principles, Accessibility, Interaction Design, Design Systems, Motion Design, User Research.

### 5.4 Cluster 4: Startup Engineering
- **Topics:** Building MVPs, Scaling Teams, Managing Technical Debt, Product Strategy.

---

## 6. Article Structure Requirements

Every Journal article must follow a strict, scannable structure:
1. **Title:** Clear and keyword-optimized.
2. **Introduction:** State the problem immediately.
3. **Explanation:** Deep technical breakdown.
4. **Examples:** Real-world applications or code snippets.
5. **Key Takeaways:** A bulleted summary (highly favored by AI Overviews).
6. **FAQ:** Answering specific long-tail questions.
7. **Related Content:** Internal links to 2–3 related articles.
8. **CTA:** Soft invitation to explore our Products or Contact us.

---

## 7. Technical SEO Requirements

### 7.1 Metadata Strict Rules
Every single indexable page must contain:
- **Title Tag:** Max `60` characters. Format: `[Primary Keyword] | SARIV`.
- **Meta Description:** Max `155` characters. Must provide a compelling reason to click.
- **Canonical URL:** Self-referencing to prevent duplicate content issues.
- **Open Graph & Twitter Cards:** Complete metadata including a specific `1200x630` image.
- **Robots Tag:** Explicit `index, follow` (unless specifically hidden).

### 7.2 Structured Data (Schema.org / JSON-LD)
Schema must be implemented to help engines parse entities.
- **Sitewide:** `Organization`, `WebSite`.
- **Navigation:** `BreadcrumbList` (on deep pages).
- **Content:** `Article` (Journal), `Product` (Products), `FAQPage` (Where applicable).

### 7.3 Core Web Vitals (Performance Budget)
Search engines penalize slow sites. We must strictly adhere to:
- **LCP (Largest Contentful Paint):** `< 2.0s`
- **CLS (Cumulative Layout Shift):** `< 0.05`
- **INP (Interaction to Next Paint):** `< 150ms`
- **Lighthouse Target:** `98+` across all metrics.

### 7.4 URLs & Media
- **URLs:** Must be clean, semantic, and hyphen-separated. No query strings for primary content. (e.g., `/journal/ai-product-engineering`).
- **Images:** Every image requires descriptive `alt` text, explicit `width`/`height` attributes, and must be served in modern formats (`AVIF`/`WebP`) with meaningful filenames (e.g., `product-dashboard.webp`, not `img_01.webp`).

---

## 8. AI Search Optimization Tactics

To optimize for LLMs (ChatGPT, Perplexity, Google SGE):
- **Write in complete, definitive thoughts.** LLMs extract direct answers.
- **Define concepts clearly.** Provide a clear "What is X?" sentence early in the content.
- **Prefer short paragraphs and bulleted lists.** These are easily parsed by retrieval systems.
- **Support claims.** LLMs look for consensus; linking to authoritative external sources or providing hard internal data increases the likelihood of citation.

---

## 9. Governance & Maintenance

- **Content Refresh:** Review top-performing content every 6 months to update statistics, screenshots, and broken links.
- **Redirects:** Never delete a URL that has traffic or backlinks. Always use a `301 Redirect` to the most relevant active page.
- **Analytics:** Continuously track Organic Traffic, CTR, Average Position, Core Web Vitals, and Conversions via Search Console and PostHog.

---

## 10. Final Principle

Search engines should easily understand SARIV. AI systems should trust SARIV to cite us. People should remember SARIV. 

Every page we publish should aim to become the definitive best answer to a specific question on the internet, rather than simply a vehicle to rank for a keyword.
