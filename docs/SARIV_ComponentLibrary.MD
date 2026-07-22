# SARIV Component Library

**Version:** 1.0  
**Status:** Canonical Reference

---

## 1. Purpose

The SARIV Component Library defines every reusable interface element used across our digital ecosystem. 

Components are not isolated pieces of UI; they are the atomic building blocks of a cohesive, premium experience. Every component must look, feel, and function unmistakably like SARIV. When a user interacts with a button, a form, or a navigation bar, the interaction should build trust through consistency and polish.

---

## 2. Core Principles

Before building or modifying any component, ensure it adheres to these principles:

- **Reusable:** Never create a single-use component if an existing one can be naturally evolved.
- **Accessible:** WCAG AA compliance by default. Proper contrast, semantic markup, focus states, and ARIA labels are non-negotiable.
- **Responsive:** Layouts must gracefully scale from a `320px` viewport up to `1440px+`.
- **Minimal:** Remove any border, gradient, or background that does not communicate function or state.
- **Performant:** Components must render smoothly. Avoid heavy client-side computations for purely visual effects.
- **Predictable:** Interaction patterns should match user expectations based on the rest of the application.

---

## 3. Component Architecture

We structure our components using a modified Atomic Design methodology.

1. **Atoms:** Foundational elements (Buttons, Inputs, Labels, Icons).
2. **Molecules:** Simple UI groups (Search Forms, Statistic Blocks, Toast Notifications).
3. **Organisms:** Complex UI groups (Navigation Bars, Hero Components, Product Showcases).
4. **Templates:** Page-level structural layouts (Blog Layout, Product Page Layout).
5. **Pages:** Specific instances containing actual content.

---

## 4. Design Tokens & Primitives

All components must source their sizing, typography, and colors from the canonical Design System. Do not hardcode values.

*(For the complete scale, refer to **[SARIV_DesignSystem.md](file:///Users/dhruvalbhinsara/SARIV-Website/docs/SARIV_DesignSystem.md)**).*

### 4.1 Spacing Scale
`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`, `160px`

### 4.2 Border Radius
- **Small:** `8px` (Inputs, Badges, Tooltips)
- **Medium:** `16px` (Buttons, Small Cards)
- **Large:** `24px` (Feature Cards, Modals, Showcases)
- **Pill:** `999px` (Status indicators, highly specific buttons)

---

## 5. Foundational Elements (Atoms)

### 5.1 Buttons
Buttons must communicate hierarchy. Only one Primary button should exist in a single viewport or section.

**Anatomy:** `Icon (optional)` → `Label` → `Trailing Icon (optional)`

**Variants:**
- **Primary:** Black background, White text. Reserved for the primary call-to-action (CTA).
- **Secondary:** Transparent background, subtle border, Black text. For alternative actions.
- **Ghost:** No border or background until hover. Used for low-priority actions.
- **Text:** No border. An underline appears on hover. Used for inline links.
- **Danger:** Red styling (`#DB4437`). Used exclusively for destructive actions.

**Sizes:**
- **Small:** `36px` height (dense tables, metadata)
- **Medium:** `48px` height (default forms, cards)
- **Large:** `56px` height (Hero CTAs, global emphasis)

**Interactive States:**
- **Default:** Standard styling.
- **Hover:** Primary lifts `2px`, background lightens slightly; Ghost/Secondary fill subtly.
- **Pressed:** Scale down to `0.98`.
- **Disabled:** Opacity reduced to `40%`, cursor set to `not-allowed`.
- **Loading:** Label is maintained; a minimal spinner replaces the trailing icon.

### 5.2 Forms & Inputs
Forms should feel effortless. Use generous padding, clear validation, and avoid overly harsh error colors where possible.

- **Maximum Form Width:** `640px` (to ensure readability).
- **Field Anatomy:** `Label` → `Input Field` → `Helper/Validation Text`.
- **Field Spacing:** `24px` between inputs.

**Text Input & Select:**
- **Height:** `56px`
- **Border Radius:** `16px`
- **Border:** `1px solid #E7E7E4` (Default)
- **Focus State:** Border transitions to `Black` (`#111111`); no heavy glowing rings.
- **Select fields:** Hide native browser styling; use custom, keyboard-accessible dropdowns.

**Textarea:**
- **Minimum Height:** `160px`
- **Resizability:** Vertical only.

**Toggles & Checkboxes:**
- **Checkbox:** `20px` square with rounded corners. Checkmark fades in softly.
- **Toggle:** Physical sliding switch. Avoid excessive neon colors; use the success token sparingly.
- **Radio Button:** `18px` circle. Label must be vertically aligned with the circle center.

---

## 6. Structural Components (Molecules & Organisms)

### 6.1 Navigation Bar
The top-level anchor for user orientation. Must remain unobtrusive.

**Desktop (`72px` height):**
- Layout: `Logo (Left)` → `Links (Center/Right)` → `Primary CTA (Right)`
- Behavior: Sticky positioning. Background is transparent at the top, transitioning to an acrylic blur with a subtle `1px` bottom border upon scroll.

**Mobile:**
- Layout: `Logo (Left)` → `Hamburger Menu (Right)`
- Menu behavior: Opens a fullscreen or drawer overlay.

### 6.2 Hero Component
The first impression. It must prioritize typography and atmosphere over information density.
- **Layout:** Centered vertically, maximum text width of `720px`.
- **Hierarchy:** `Headline` (Display type) → `Supporting Text` (Body type) → `Primary CTA` → `Secondary CTA` (Ghost or Text variant).
- **Visuals:** May include a product preview or abstract cinematic background, but never clutter.

### 6.3 Section Header
Used to introduce new conceptual chapters on a page.
- **Layout:** Left-aligned. Maximum width of `720px`.
- **Hierarchy:** `Eyebrow/Caption` (optional) → `Heading` → `Supporting Text` → `CTA` (optional).

### 6.4 Cards
Cards group related information into digestible units. They must feel like high-quality sheets of paper, not floating plastic.
- **Variants:** Feature, Product, Case Study, Blog, Statistic, Team.
- **Padding:** `32px`
- **Radius:** `24px`
- **Border:** `1px` subtle stroke (`#E7E7E4`).
- **Hover State:** Lift `2px`, shadow deepens softly, border darkens slightly.
- **Anatomy:** `Icon/Image (Top)` → `Title` → `Description (Max 3 lines)` → `CTA/Link (Bottom)`.

### 6.5 Grids & Layouts
- **Feature Grid:** 3 columns on Desktop, 2 on Tablet, 1 on Mobile. Maximum of 6 items per grid. If more are required, split into a new section.
- **Product Showcase:** Two-column desktop layout. `Text/CTA (Left)` and a `Large Interface Preview (Right)`. Stacks to a single column on mobile.
- **Timeline:** Horizontal on Desktop; vertical on Mobile. Used for processes (Research → Strategy → Design...).

---

## 7. Interactive Overlays & Notifications

### 7.1 Modal
Used for critical focus or isolated interactions.
- **Maximum Width:** `720px`.
- **Anatomy:** `Title (Header)` → `Content Body` → `Actions (Footer)`.
- **Dismissal:** Must support "Escape" key, background click, and a dedicated close button.
- **Animation:** Background dims and blurs; Modal scales from `0.96` to `1` and fades in (`300ms`).

### 7.2 Drawer
Used primarily for mobile navigation or complex filter panels on desktop.
- **Behavior:** Slides in from the right.
- **Width:** `80%` of viewport on mobile; fixed max-width on desktop.
- **Backdrop:** Dimmed with subtle blur.

### 7.3 Toast Notifications
For non-blocking system feedback.
- **Position:** Bottom Right (Desktop), Bottom Center (Mobile).
- **Stacking:** Maximum of three toasts visible simultaneously.
- **Animation:** Slide up smoothly. Automatically dismiss after 4 seconds unless hovered.

### 7.4 Tabs & Accordions
- **Tabs:** Used to switch between related content views without leaving the page. Maximum of 5 tabs. If more are needed, use side navigation.
- **Accordion:** Used for FAQs, dense documentation, or policies. Only one section should be open by default. The height and opacity should animate smoothly (`300ms`, no bounce).

---

## 8. Implementation Guidelines

- **Prop Structure:** Components must use TypeScript interfaces for robust type checking.
- **Accessibility:** Use Radix UI, Headless UI, or native ARIA attributes to ensure screen reader support and keyboard navigability.
- **Overrides:** Do not expose `className` overrides recklessly. If a component requires a custom override, it likely means the Design System needs a new variant.

> [!IMPORTANT]
> A component is never truly finished. It must evolve with the product, but it must never fracture. If a designer proposes a new button style, we do not add it; we question whether it replaces the current style, or if the design itself is flawed. Consistency is our highest priority.
