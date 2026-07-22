# SARIV Information Architecture

**Version:** 1.0  
**Status:** Canonical Reference

---

## 1. Purpose

This document defines the structural blueprint of the SARIV website.

Our objective is to ensure that every visitor can effortlessly discover:
- Who we are.
- What we build.
- Why it matters.
- Why they should trust us.
- What they should do next.

Information architecture at SARIV must feel invisible. Users should never experience friction or wonder, *"Where do I click next?"*

---

## 2. Core Architectural Principles

### 2.1 Clarity Over Cleverness
Navigation labels must be immediately understandable to any user. Never sacrifice comprehension for creative or abstract naming conventions. "Products" is always better than "Innovations."

### 2.2 Progressive Disclosure
Users should never receive all information at once. Reveal complexity gradually. A user's natural curiosity should lead them from high-level summaries down to technical specifications.

### 2.3 Story Before Structure
Every page is a narrative. Navigation exists to support that story, not to interrupt it or provide random exit points.

### 2.4 The Three-Click Rule
Users must be able to reach any critical piece of information (a specific product, a case study, or the contact form) within a maximum of three interactions from the homepage.

### 2.5 Strict Consistency
Navigation paradigms, layout structures, and page hierarchies must remain highly predictable across the entire site.

---

## 3. Global Sitemap

The site is divided into six primary pillars:

```text
SARIV (Root)
│
├── Home (/)
│
├── Products (/products)
│   ├── Product Detail (/products/[slug])
│   └── (Future Products...)
│
├── Studio (/studio)
│   ├── Philosophy
│   ├── Process
│   └── Team
│
├── Work (/work)
│   ├── Case Study Listing
│   └── Case Study Detail (/work/[slug])
│
├── Journal (/journal)
│   ├── Engineering
│   ├── Artificial Intelligence
│   ├── Design
│   └── Product
│
├── About (/about)
│
├── Contact (/contact)
│
└── Legal
    ├── Privacy Policy (/privacy)
    ├── Terms of Service (/terms)
    └── Cookie Policy (/cookies)
```

---

## 4. Navigation Design

### 4.1 Desktop Navigation
- **Structure:** `[Logo] -> [Products] [Studio] [Work] [Journal] [About] [Contact] -> [Primary CTA: Start a Project]`
- **Behavior:** The navigation bar is sticky. It is transparent at the top of the viewport and gains an acrylic blur background immediately upon scrolling.

### 4.2 Mobile Navigation
- **Structure:** `[Logo] -> [Hamburger Menu Icon]`
- **Behavior:** Tapping the menu icon opens a full-screen overlay or drawer. The Primary CTA must remain highly visible at the top or bottom of the mobile menu.

---

## 5. Page-Level Architecture

### 5.1 Homepage Structure
Every section of the homepage must answer exactly one user question, in a specific sequence:

1. **Hero:** *Creates emotion and intrigue.*
2. **Identity:** *Who are you?* (A single sentence definition).
3. **Products:** *What do you build?* (High-level product showcases).
4. **Philosophy:** *Why do you work this way?* (Our engineering ethos).
5. **Process:** *How do you work?* (Discover → Design → Engineer → Launch).
6. **Selected Work:** *Can I trust you?* (Featured case studies).
7. **Journal Preview:** *Are you experts?* (Latest technical thinking).
8. **Primary CTA:** *What's next?* (Start a project).
9. **Footer:** *Standard site navigation and legal.*

### 5.2 Product Detail Pages
Every product page follows a consistent narrative structure:
1. **Hero:** Product Name and primary value proposition.
2. **Overview:** High-level summary of the product's capabilities.
3. **Problem / Solution:** The specific challenge it addresses, and how it solves it.
4. **Features & Workflow:** Meaningful capabilities and how the user interacts with them (heavily visual).
5. **Screenshots / Technical Specs:** Proof of execution.
6. **FAQ:** Overcoming technical objections.
7. **CTA:** E.g., "Book a Demo" or "Contact Us".

### 5.3 Work (Case Studies)
- **Listing Page:** A scannable grid of case studies with optional category filters.
- **Detail Page Structure:** Overview → Challenge → Research → Design → Engineering → Launch → Outcome → Lessons Learned.

### 5.4 Studio Page
Focuses on how SARIV operates.
- **Sections:** Mission, Values, Process, Design Philosophy, Engineering Philosophy, Technology Stack.

### 5.5 Journal
Designed to build SEO authority and demonstrate technical expertise.
- **Categories:** Engineering, AI, Design, Product, Research.
- *(For the technical SEO application of the Journal, refer to **[SARIV_SEOStrategy.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_SEOStrategy.md)**).*

### 5.6 About Page
Focuses on the company, not individual founder biographies.
- **Sections:** Mission, Vision, Principles, Culture, Timeline, Future.

### 5.7 Contact Page
Designed to strictly minimize friction.
- **Form Fields:** Name, Email, Company, Project Description, Timeline. (Budget is optional).
- **Rule:** Do not add unnecessary fields that drop conversion rates.

---

## 6. Internal Linking Strategy

Pages must never act as dead ends. Every page must link naturally to the next logical step in the user's journey.

- **From a Product Page:** Link to a related Case Study showing that product in action, or the Contact page.
- **From a Case Study:** Link to the specific Products utilized, or the Contact page.
- **From a Journal Article:** Link to related articles, or the relevant Product.

---

## 7. URL Structure & Breadcrumbs

### 7.1 URL Guidelines
URLs must be clean, semantic, and human-readable. Do not use query parameters for primary navigation.
- **Good:** `/products/sariv-flow`, `/work/enterprise-ai-platform`
- **Bad:** `/products?id=14`, `/work?category=ai`

### 7.2 Breadcrumbs
Breadcrumbs are required on deep structural pages to aid navigation and SEO.
- **Required on:** Product Details, Case Study Details, Journal Articles.
- **Format:** `Home > Products > SARIV Flow`

---

## 8. Search Architecture

The implementation of site search will follow a phased approach:
- **Phase 1 (Launch):** No global search. The architecture relies on clear, intuitive navigation.
- **Phase 2 (Growth):** Implement search restricted to the Journal to handle growing article volume.
- **Phase 3 (Scale):** Implement Global Search indexing Articles, Products, Case Studies, and Documentation.

---

## 9. User Flows

We optimize for specific user personas to ensure they reach their goals effortlessly.

- **The Founder Flow:** Landing → Products → Case Study → Contact.
- **The Technical Lead Flow:** Landing → Engineering Philosophy (Studio) → Product (Tech Specs) → Contact.
- **The Recruiter/Applicant Flow:** Landing → About → Journal (to assess expertise) → Contact.
- **The Designer Flow:** Landing → Work (Case Studies) → Journal (Design category).

---

## 10. Calls To Action (CTA) Hierarchy

A page must never have multiple competing primary CTAs. Establish a clear hierarchy.

- **Homepage:** *Start a Project*
- **Products:** *Book a Demo*
- **Work:** *View Case Study*
- **Journal:** *Read More*
- **About:** *Learn More*
- **Contact:** *Send Message*
