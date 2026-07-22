# Handoff Report: Codebase Structure & Opaque-Box E2E Target Selectors for SARIV-Website

## 1. Observation

### Codebase Routes
From inspection of `src/app/`:
- **Home Page (`/`)**: Defined in `src/app/page.tsx`. Renders `<HeroScene />`, Visual Showcase section, Features grid, `<CurvedLoop />` marquee, How it Works steps, and CTA section.
- **Identity Page (`/identity`)**: Defined in `src/app/identity/page.tsx`. Renders sticky section navigation (`LineSidebar`), 6 major system design sections with explicit section IDs, swatch grids, typography samples, and geometry cards.
- **Work Page (`/work`)**: Defined in `src/app/work/page.tsx`. Includes project case study cards (FreeFlow, Atlas).
- **Product Detail Page (`/products/freeflow`)**: Defined in `src/app/products/freeflow/page.tsx`. Features hero, visual demo showcase, problem/solution, card grid, accordion FAQ (`#technical-specs`), and CTA.
- **About Page (`/about`)**: Defined in `src/app/about/page.tsx`. Principles list and `<Keyboard />` interactive preview.
- **Contact Page (`/contact`)**: Defined in `src/app/contact/page.tsx`. Contact form (`#name`, `#email`, `#message`, `button[type="submit"]`), honeypot field (`input[name="bot_field"]`), submit POST to `/api/contact`, toast notifications.
- **Start Project Page (`/start-project`)**: Defined in `src/app/start-project/page.tsx`. Project inquiry form (`#name`, `#email`, `#company`, Radix Select triggers for projectType, budget, timeline, `#description`), POST to `/api/start-project`, toast notifications.
- **Journal Pages (`/journal`, `/journal/[slug]`)**: Defined in `src/app/journal/page.tsx` and `src/app/journal/[slug]/page.tsx`. Category filter links, article cards.

---

### Layout & Smooth Scroll Container Architecture
From `src/app/layout.tsx` (lines 93–113) and `src/components/SmoothScrolling.tsx` (lines 11–42):
- **Root Wrapper Hierarchy**:
  ```html
  <html lang="en">
    <body class="min-h-full flex flex-col bg-background text-primary font-body">
      <!-- ToastProvider -->
      <header class="fixed top-0 z-[10000] ...">...</header>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <!-- Page children (e.g. <main className="flex-1 w-full ...">) -->
          <div className="relative">
            <footer className="...">...</footer>
            <!-- GradualBlur -->
          </div>
        </div>
      </div>
      <!-- ToastViewport -->
    </body>
  </html>
  ```
- **Scroll Container Elements**:
  - Outer Wrapper: `#smooth-wrapper`
  - Scroll Content: `#smooth-content`
- **GSAP ScrollSmoother Integration**:
  - `SmoothScrolling` (client component) initializes `ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1, effects: false })`.
  - Disables native scroll restoration: `history.scrollRestoration = "manual"` in `useEffect`.
  - On soft route navigation (triggered by `usePathname()` dependency), schedules `ScrollTrigger.refresh()` inside `requestAnimationFrame`.

---

### `IdentityPage` (`src/app/identity/page.tsx`) & `LineSidebar` Components
From `src/app/identity/page.tsx` (lines 11–285) & `src/components/ui/LineSidebar.tsx` (lines 37–195):
- **Section Navigation Map**:
  | Index | Label | DOM Section ID (`id`) | Ref Binding |
  |---|---|---|---|
  | 0 | `Identity System` | `Overview` | `section#Overview` |
  | 1 | `Logomark` | `Logomark` | `section#Logomark` |
  | 2 | `Principles` | `Principles` | `section#Principles` |
  | 3 | `Typography` | `Typography` | `section#Typography` |
  | 4 | `Color` | `Color` | `section#Color` |
  | 5 | `Geometry` | `Geometry` | `section#Geometry` |

- **Sidebar Layout & Viewport Visibility**:
  - Sidebar container in `IdentityPage`: `<aside ref={asideRef} className="hidden lg:block">` (visible on viewports `≥ 1024px`).
  - GSAP Pinning: On `min-width: 1024px`, pinned via `ScrollTrigger.create({ trigger: columnRef.current, pin: asideRef.current, start: "top 160", end: "bottom bottom" })`.
  - Scroll Spy Logic: `ScrollTrigger.create` per section with `start: "top 160"`, `end: "bottom 160"`, updating `activeIndex` state on `onEnter` and `onEnterBack`.
  - Programmatic Scroll: `scrollToSection(id)` calls `ScrollSmoother.get().scrollTo(smoother.offset(el, "top top") - 128, true)`.

- **`LineSidebar` DOM Structure & Attributes**:
  - Root nav: `<nav aria-label="Section navigation" class="line-sidebar line-sidebar--markers line-sidebar--scale-tick">`
  - Unordered list: `<ul class="line-sidebar__list">`
  - List items (6 items): `<li class="line-sidebar__item" aria-current="true" style="--effect: 1.0000">`
    - When active, item has `aria-current="true"`.
    - When inactive, `aria-current` attribute is absent (`undefined`).
    - Index span: `<span class="line-sidebar__index">00</span>` ... `<span class="line-sidebar__index">05</span>`
    - Text span: `<span class="line-sidebar__text">Identity System</span>` ... `<span class="line-sidebar__text">Geometry</span>`

---

### Primary Navigation & Interactive Link Elements
From `src/components/Header.tsx` (lines 56–117) and `src/components/Footer.tsx` (lines 25–72):
- **Header Elements**:
  - Logo Home Link: `header a[href="/"]` (contains span text `SARIV` and `<Mark />` SVG). Clicking on `/` invokes `window.scrollTo({ top: 0, behavior: "smooth" })`.
  - Navigation Links (Desktop `hidden md:flex`):
    - `header nav a[href="/work"]` (text: `Work`)
    - `header nav a[href="/identity"]` (text: `Identity`, CSS class `nav-link`)
    - `header nav a[href="/contact"]` (text: `Contact`)
  - Start Project CTA: `header a[href="/start-project"]` (text: `Start Project`)
  - Mobile Sidebar Toggle Button: `header button` inside `.md\:hidden` (toggles `MobileSidebar`).
- **Footer Links**:
  - `footer a[href="/"]` (text: `Home`)
  - `footer a[href="/work"]` (text: `Work`)
  - `footer a[href="/identity"]` (text: `Identity`)
  - `footer a[href="/contact"]` (text: `Contact`)
  - Social Links: `LinkPreview` components pointing to Twitter, LinkedIn, Instagram, GitHub.

---

### Interactive Forms & Toast Notifications
From `src/app/contact/page.tsx` and `src/app/start-project/page.tsx`:
- **Contact Form (`/contact`)**:
  - Inputs: `#name` (`input[name="name"]`), `#email` (`input[name="email"]`), `#message` (`textarea[name="message"]`), `input[name="bot_field"]` (honeypot).
  - Submit Button: `button[type="submit"]` (text: `Send Message` or `Sending...`).
- **Start Project Form (`/start-project`)**:
  - Inputs: `#name`, `#email`, `#company`, `#description`.
  - Radix Select Dropdowns:
    - `button[aria-label="Project type"]`
    - `button[aria-label="Budget range"]`
    - `button[aria-label="Timeline"]`
  - Submit Button: `button[type="submit"]` (text: `Submit Project Inquiry`).
- **Toast Notifications** (`src/components/ui/Toast.tsx`):
  - Viewport container: Radix `ToastViewport` rendered at root layout level.
  - Toast element: `[role="status"]` or Radix `ToastPrimitives.Root` with `data-state="open"`.

---

## 2. Logic Chain

1. **Soft Navigation Lifecycle Verification**:
   - In Next.js App Router, navigating between `/` and `/identity` using client-side `<Link href="/identity">` triggers soft navigation without full page reload.
   - `SmoothScrolling` detects path changes via `usePathname()` and invokes `ScrollTrigger.refresh()`.
   - On navigation to `/identity`, `IdentityPage` mounts `LineSidebar` and binds 6 `ScrollTrigger` instances to section elements `#Overview`, `#Logomark`, `#Principles`, `#Typography`, `#Color`, `#Geometry`.
   - E2E tests can verify soft navigation by checking that `window.__NEXT_DATA__` or page state does not hard refresh, and that `#smooth-content` updates content seamlessly while GSAP triggers successfully track scrolling.

2. **Active State Verification in `LineSidebar`**:
   - `LineSidebar` reflects the current active section via `aria-current="true"` on the active `li.line-sidebar__item`.
   - Initial state on `/identity` top: Index 0 (`Identity System`) is active -> `li.line-sidebar__item[aria-current="true"]` contains text `Identity System`.
   - Clicking item index 1 (`Logomark`) invokes `scrollToSection("Logomark")`.
   - `ScrollSmoother` scrolls `#smooth-content` so section `#Logomark` reaches top offset threshold (160px clearance), triggering `ScrollTrigger`'s `onEnter`/`onEnterBack` callback which calls `setActiveIndex(1)`.
   - Result: `li.line-sidebar__item` matching text `Logomark` updates to `aria-current="true"`.

3. **Viewport Responsiveness Constraints**:
   - `aside` holding `LineSidebar` has Tailwind class `hidden lg:block`.
   - E2E testing for `LineSidebar` interaction and section scroll spy must run on desktop viewports (`width >= 1024px`, e.g. 1280x800 or 1440x900).
   - Mobile viewports (`width < 768px`) hide desktop header nav and sidebar, rendering the hamburger toggle `button` for `MobileSidebar`.

---

## 3. Caveats

1. **Viewport Breakpoints**:
   - `LineSidebar` is hidden on mobile/tablet viewports (`< 1024px`) due to `hidden lg:block`. Tests targetting `LineSidebar` MUST set viewport width >= 1024px.
   - Desktop header nav links are hidden below 768px (`hidden md:flex`).
2. **GSAP Transform vs Window Scroll**:
   - `ScrollSmoother` translates `#smooth-content` via CSS `transform: matrix(...)` / `translate3d(...)` while keeping `#smooth-wrapper` fixed or handling custom scroll bounds.
   - Standard Playwright `window.scrollY` assertions might return zero or non-standard values depending on whether native window scroll or transformed element offsets are measured. Testing section scroll position should rely on `getBoundingClientRect()` of section elements (e.g., `#Logomark`, `#Typography`) or checking `li[aria-current="true"]` attributes.
3. **Animation Delays**:
   - CSS animations (`animate-fade-up`) use staggered inline `animationDelay` (e.g. `0.1s`, `0.2s`). E2E element interaction should wait for actionability/visibility or standard Playwright auto-waiting.

---

## 4. Conclusion

### E2E Selector & Assertion Reference Table

| Target Feature | Recommended CSS / Attribute Selector | Verification Assertion |
|---|---|---|
| **Scroll Wrapper** | `#smooth-wrapper` | `toBeVisible()` |
| **Scroll Content** | `#smooth-content` | `toBeVisible()` |
| **Header Logo Link** | `header a[href="/"]` | `toHaveAttribute('href', '/')` |
| **Header Nav Links** | `header nav a[href="/work"]`, `header nav a[href="/identity"]`, `header nav a[href="/contact"]` | `toBeVisible()` (viewport >= 768px) |
| **Header CTA** | `header a[href="/start-project"]` | `toHaveText('Start Project')` |
| **Mobile Menu Toggle** | `header .md\:hidden button` | `toBeVisible()` (viewport < 768px) |
| **Identity Sidebar Nav** | `aside nav[aria-label="Section navigation"]` | `toBeVisible()` (viewport >= 1024px) |
| **Sidebar Items** | `li.line-sidebar__item` | `toHaveCount(6)` |
| **Active Sidebar Item** | `li.line-sidebar__item[aria-current="true"]` | Text matches expected active section label |
| **Section 1: Overview** | `section#Overview` | `toBeVisible()` |
| **Section 2: Logomark** | `section#Logomark` | `toBeVisible()` |
| **Section 3: Principles** | `section#Principles` | `toBeVisible()` |
| **Section 4: Typography** | `section#Typography` | `toBeVisible()` |
| **Section 5: Color** | `section#Color` | `toBeVisible()` |
| **Section 6: Geometry** | `section#Geometry` | `toBeVisible()` |
| **Contact Name Input** | `input#name` / `input[name="name"]` | `toBeVisible()`, fillable |
| **Contact Email Input** | `input#email` / `input[name="email"]` | `toBeVisible()`, fillable |
| **Contact Message Input**| `textarea#message` / `textarea[name="message"]` | `toBeVisible()`, fillable |
| **Start Project Selects** | `button[aria-label="Project type"]`, `button[aria-label="Budget range"]`, `button[aria-label="Timeline"]` | `toBeVisible()`, clickable |
| **Toast Container** | `[role="status"]` / Radix Toast | Appears upon form submission |

---

## 5. Verification Method

To independently verify these findings:

1. **Verify Files & Code Locations**:
   - View `src/app/identity/page.tsx` lines 11-18 & 146-285 to confirm section IDs `#Overview`, `#Logomark`, `#Principles`, `#Typography`, `#Color`, `#Geometry`.
   - View `src/components/ui/LineSidebar.tsx` lines 168-193 to confirm `<nav aria-label="Section navigation">` and `li.line-sidebar__item[aria-current="true"]`.
   - View `src/components/SmoothScrolling.tsx` lines 21-40 to confirm `#smooth-wrapper` and `#smooth-content`.
   - View `src/components/Header.tsx` lines 57-98 to confirm nav links (`/work`, `/identity`, `/contact`, `/start-project`).

2. **Validate Section Targets & Selectors**:
   - Run grep search on `id="` across `src/app/` to verify section IDs:
     `grep -rn 'id=' src/app/`
   - Verify `aria-current` usage in `LineSidebar`:
     `grep -rn 'aria-current' src/components/`

3. **Invalidation Conditions**:
   - The analysis would be invalidated if component class names or section IDs were renamed, or if `SmoothScrolling` wrappers were altered.
