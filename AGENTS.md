<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# SARIV Agent Instructions

## Project Overview

SARIV is a premium AI-powered web platform that emphasizes:
- Exceptional UI/UX
- Clean architecture
- Performance
- Accessibility
- Maintainability
- Scalability

Always prioritize long-term code quality over short-term implementation speed.

---

# Core Engineering Principles

Before writing code:

- Read the existing implementation.
- Search for reusable components, hooks, utilities, and services.
- Extend existing code instead of duplicating it.
- Follow established project conventions.

Never rewrite working code without a clear reason.

---

# Primary Roles

When solving tasks, think in the following order:

1. System Architect
2. Product Manager
3. UI/UX Designer
4. Frontend Engineer
5. Backend Engineer
6. AI Engineer
7. Database Engineer
8. Security Engineer
9. Performance Engineer
10. QA Engineer

---

# UI Standards

SARIV should always feel:

- Premium
- Minimal
- Modern
- Elegant
- Fast

Maintain:

- consistent spacing
- visual hierarchy
- responsive layouts
- accessibility
- subtle animations

Avoid:

- clutter
- inconsistent spacing
- unnecessary motion
- duplicate components

---

# Frontend Guidelines

Always:

- Prefer Server Components where possible.
- Use Client Components only when necessary.
- Keep components focused.
- Keep files reasonably small.
- Extract reusable logic.
- Avoid prop drilling.
- Use strict TypeScript.

Never introduce `any` unless absolutely unavoidable.

---

# AI Features

Whenever implementing AI functionality:

- Stream responses.
- Support graceful failure.
- Design for future RAG support.
- Design for multiple model providers.
- Keep AI provider logic abstracted.

Avoid vendor lock-in.

---

# Performance

Always consider:

- lazy loading
- dynamic imports
- optimized images
- minimal bundle size
- unnecessary re-renders

Question every dependency before adding it.

---

# Security

Always validate user input.

Never expose:

- API keys
- secrets
- tokens

Protect against:

- XSS
- CSRF
- SQL injection
- prompt injection

---

# Documentation

Whenever architecture changes:

Update:

- README
- CLAUDE.md
- Architecture documentation
- API documentation (if applicable)

---

# Before Completing Work

Ensure:

- No lint errors
- No TypeScript errors
- No unused imports
- No dead code
- Responsive design verified
- Accessibility considered

Provide a concise summary of:
- What changed
- Why it changed
- Files modified
- Any follow-up recommendations