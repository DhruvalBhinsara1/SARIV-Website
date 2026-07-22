# SARIV Technical Architecture

**Version:** 1.0  
**Status:** Canonical Reference

---

## 1. Core Engineering Philosophy

The SARIV website is engineered as a zero-technical-debt application. 

It must be fast, secure, strictly typed, highly scalable, and exceptionally maintainable. We do not use cutting-edge tools simply because they are new; we use them because they solve specific problems. 

This architecture must support not only the initial marketing surface but also future authenticated portals and interactive product demos without requiring a rewrite.

---

## 2. The Technology Stack

### 2.1 Core Framework
- **Next.js (App Router):** Selected for hybrid rendering (Server Components + Client Components), nested routing, and aggressive performance optimizations.
- **React:** For component composition.
- **TypeScript:** Strict type-checking is mandatory. Any use of `any` or bypassing the compiler will result in a failed build.

### 2.2 Styling & Theming
- **Tailwind CSS (v4):** Selected for utility-first constraints, atomic CSS generation, and colocation of styles with markup. Custom values must be mapped to our precise Design System tokens.
- **CSS Modules (Optional):** Strictly limited to complex animations or specific third-party overrides where Tailwind is insufficient.
- *(For the visual constraints applied to this stack, refer to **[SARIV_DesignSystem.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_DesignSystem.md)**).*

### 2.3 Motion & Animation
- **Framer Motion:** Used for all complex, spring-based, and scroll-linked animations. 
- **CSS Transitions:** Used for simple micro-interactions (hover, focus states).
- *(For technical animation constraints and easing curves, refer to **[SARIV_MotionSystem.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_MotionSystem.md)**).*

### 2.4 Data & Content
- **Sanity / Contentful (Headless CMS):** To decouple content from code, specifically for the Journal, Case Studies, and Products.
- **Zod:** For runtime schema validation of all external data inputs (API responses, CMS payloads, form submissions).

---

## 3. Architecture & Rendering Strategy

We utilize the Next.js App Router to maximize performance by shifting work to the server.

### 3.1 React Server Components (RSC)
By default, all components are Server Components. This eliminates the client-side JavaScript bundle for UI structure, typography, and static layouts.

### 3.2 Client Components (`"use client"`)
Client components must be pushed to the absolute leaves of the component tree.
- **When to use:** Only when a component requires state (`useState`), effects (`useEffect`), browser APIs (`window`, `localStorage`), event listeners (`onClick`), or complex client-side motion (Framer Motion).

### 3.3 Data Fetching
- **Static Content (e.g., About Page):** Pre-rendered at build time (SSG).
- **Dynamic Content (e.g., Forms, Portals):** Rendered dynamically (SSR).
- **CMS Content (e.g., Journal):** Utilizing Incremental Static Regeneration (ISR) to ensure high performance while allowing content editors to publish without triggering full developer builds.

---

## 4. Codebase Organization

The repository is organized by feature, not merely by file type.

```text
src/
├── app/                  # Next.js App Router (Routes & Layouts)
│   ├── (marketing)/      # Route group for marketing pages
│   ├── (legal)/          # Route group for legal pages
│   └── api/              # API Routes (Serverless Functions)
│
├── components/           # UI Components
│   ├── ui/               # Reusable atomic elements (Buttons, Inputs)
│   ├── layout/           # Structural elements (Navigation, Footer)
│   └── features/         # Complex, domain-specific components
│
├── lib/                  # Utilities & Configurations
│   ├── utils/            # Helper functions (clsx, twMerge)
│   ├── constants/        # Global constants
│   └── validations/      # Zod schemas
│
├── types/                # Global TypeScript definitions
│
└── styles/               # Global CSS & Tailwind config
    └── globals.css
```

---

## 5. Security Architecture

1. **Environment Variables:** Must be strictly validated using Zod at startup. The application should refuse to boot if required secrets are missing.
2. **API Routes:** All API endpoints must include rate limiting and rigorous input validation (Zod).
3. **Content Security Policy (CSP):** Strict CSP headers implemented in `next.config.js` to prevent XSS attacks and unauthorized resource loading.
4. **Forms:** Honeypots and server-side validation to eliminate spam without degrading the user experience.

---

## 6. Performance Engineering

Performance is an architectural requirement, not an afterthought.

- **Images:** All images must use the `next/image` component to automatically convert formats (WebP/AVIF), optimize sizing, and prevent Cumulative Layout Shift (CLS).
- **Fonts:** Core typefaces (Instrument Serif, Inter) must be self-hosted and loaded via `next/font` to eliminate layout shift and remove external DNS lookups.
- **Bundle Size:** Heavily scrutinize dependencies. Tree-shaking is mandatory. Do not install massive libraries (e.g., Lodash, Moment) when native JavaScript suffices.
- **Lighthouse Goals:** `98+` across Performance, Accessibility, Best Practices, and SEO.

---

## 7. Developer Experience (DX) & Tooling

A clean repository is a fast repository.

### 7.1 Linting & Formatting
- **ESLint:** Strict configuration extending Next.js and standard TS rules.
- **Prettier:** Enforced automatically on pre-commit hooks to eliminate stylistic debates.

### 7.2 Git & CI/CD
- **Branching Strategy:** Trunk-based development or a strict `main` / `feature/*` workflow.
- **Conventional Commits:** Mandatory format (e.g., `feat:`, `fix:`, `docs:`, `chore:`).
- **CI/CD Pipeline (GitHub Actions):** Every pull request must pass:
  1. TypeScript compilation (`tsc --noEmit`).
  2. ESLint checks.
  3. Unit tests (if applicable).
  4. Build validation.
- **Deployment:** Vercel (preferred for Next.js native support) with automatic preview deployments for every PR.

---

## 8. Definition of "Done"

A feature or page is not considered complete until:
- [ ] It is fully typed in TypeScript (no `any` or `ts-ignore`).
- [ ] It passes all ESLint and Prettier checks.
- [ ] It adheres perfectly to the Design System and Motion System.
- [ ] It scores `98+` on Lighthouse.
- [ ] It renders flawlessly on a 320px mobile viewport and a 1440px desktop viewport.
- [ ] It passes WCAG AA accessibility checks (keyboard nav, ARIA, focus rings).
- [ ] It has been reviewed and approved by engineering leadership.
