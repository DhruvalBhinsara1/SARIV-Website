# SARIV Website: Product Requirements Document (PRD)

**Version:** 1.0  
**Status:** Approved  
**Owner:** SARIV Product Leadership  

---

## 1. Executive Summary

SARIV’s website is our primary product. It is the definitive online presence for the company. 

It must feel less like a marketing page and more like a carefully engineered application. Visitors should leave with a singular impression: *"These people build software differently."*

The website will serve to explain who we are, demonstrate our engineering capabilities, showcase our portfolio, build undeniable trust, and seamlessly convert qualified visitors into clients. It is the foundational architecture upon which future SARIV digital products will be deployed.

---

## 2. Product Goals & Objectives

1. **Immediate Comprehension:** Visitors must understand exactly what SARIV does within the first 10 seconds.
2. **Demonstrate Quality:** The site itself must serve as proof of our engineering and design capabilities.
3. **Build Trust:** Replace traditional sales tactics with technical credibility, architectural transparency, and high-fidelity case studies.
4. **Lead Generation:** Convert high-quality technical and business leads without employing aggressive CTA strategies.
5. **Technical Foundation:** Establish a scalable, zero-technical-debt architecture that will support a future authenticated portal and expanding product lines.

---

## 3. Target Audience

### 3.1 Primary Audience
- **Founders & Startup Teams:** Looking for robust, scalable product engineering to take their vision to market.
- **Enterprise Innovators & Technical Executives:** Seeking reliable, high-tier external engineering teams to tackle complex, AI-driven, or architectural challenges.

### 3.2 Secondary Audience
- **Developers & Designers:** Visiting to study our open-source tools, methodologies, and design system.
- **Potential Hires:** Assessing our technical culture and engineering standards.
- **Investors:** Evaluating the quality and execution capability of the studio.

---

## 4. Key Performance Indicators (KPIs) & Success Metrics

### 4.1 Primary Metrics
- **Time to Comprehension:** Qualitative/Session-recording metric; users navigate to product details or case studies within 15 seconds.
- **Conversion Rate:** Percentage of qualified visitors submitting the Contact form.
- **Core Web Vitals:** Strict adherence to Lighthouse 98+ (Desktop), 95+ (Mobile), LCP < 2.0s, CLS < 0.05.

### 4.2 Secondary Metrics
- Average Session Duration.
- Scroll Depth on key pages (Homepage, Case Studies).
- Bounce Rate reduction compared to industry standards.
- Organic Search Traffic (Non-branded keywords).

---

## 5. High-Level Requirements

### 5.1 Design & User Experience Requirements
- **Timeless Aesthetics:** The interface must rely on structural typography, generous whitespace, and strict grids. It must avoid short-lived design trends (e.g., heavy glassmorphism, neon lighting). *(See [SARIV_DesignSystem.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_DesignSystem.md))*
- **Cinematic Motion:** Animations must be physical, smooth, and serve a functional purpose (e.g., establishing hierarchy). Never bouncy or flashy. *(See [SARIV_MotionSystem.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_MotionSystem.md))*
- **Information Architecture:** Navigation must follow the principle of progressive disclosure. The sitemap will include: Home, Products, Studio, Work, Journal, About, and Contact. *(See [SARIV_InformationArchitecture.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_InformationArchitecture.md))*

### 5.2 Technical & Performance Requirements
- **Framework:** Next.js (App Router) with React and TypeScript.
- **Styling:** Tailwind CSS v4.
- **Accessibility:** Must meet WCAG AA standards. This includes full keyboard navigation, screen reader compatibility (ARIA labels), proper focus management, and support for `prefers-reduced-motion`.
- **Performance Budget:** Zero client-side computation for purely visual effects that block the main thread.
- **SEO Architecture:** Automatic generation of sitemaps, robots.txt, canonical URLs, and structured data (JSON-LD) for all indexable pages. *(See [SARIV_SEOStrategy.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_SEOStrategy.md))*

### 5.3 Functional Requirements by Section

#### Homepage
- **Hero Sequence:** A cinematic, motion-driven introduction combining the logo reveal, ambient background, and primary value proposition.
- **Identity & Products:** Clear statement of purpose followed immediately by high-fidelity product previews.
- **Social Proof:** Selected case studies and journal previews.

#### Product Pages
- Detailed overviews of specific software offerings. Must include problem/solution structures, visual workflows, technical specifications, and a clear CTA.

#### Studio & About
- Articulating the SARIV philosophy, mission, and culture. Focuses on the engineering ethos rather than individual founder biographies.

#### Work (Case Studies)
- Detailed, narrative-driven project breakdowns. Must move beyond generic screenshots to explain the technical challenge, the architectural approach, and the measurable outcome.

#### Journal
- A CMS-driven publishing platform for long-form technical articles, engineering research, and design thinking. Crucial for establishing topical authority and SEO.

#### Contact
- A highly optimized, low-friction inquiry form featuring server-side validation, spam protection, and immediate, polite feedback.

---

## 6. Content & Copywriting Strategy

All copy must be professional, calm, technical, and confident.
- **Prohibitions:** Strictly forbid marketing jargon, buzzwords, and exaggerated claims.
- **Structure:** Sentences must be short and direct. Every section must answer exactly one user question.
- *(For comprehensive copywriting rules, refer to [SARIV_ContentStrategy.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_ContentStrategy.MD))*

---

## 7. Out of Scope (Phase 1)

The following features will not be included in the initial launch to maintain focus on the core experience:
- Global Search functionality (Search will be limited to the Journal in Phase 2).
- Authenticated user portals or dashboards.
- Multi-language localization (English only for launch).
- Native Dark Mode (Architecture will support it, but it will not be implemented in V1).

---

## 8. Implementation Roadmap

The project is divided into distinct, vertical slices to ensure quality at every step.
1. **Phase 0:** Technical Foundation (Next.js, CI/CD, Linting).
2. **Phase 1:** Design System & Component Library implementation.
3. **Phase 2:** Homepage build.
4. **Phase 3-8:** Products, Studio, Work, Journal, About, and Contact pages.
5. **Phase 9-12:** Motion polish, SEO execution, Performance auditing, and Accessibility compliance.

*(For detailed sprint milestones, refer to [SARIV_WebsiteImplementationRoadmap.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_WebsiteImplementationRoadmap.md))*
