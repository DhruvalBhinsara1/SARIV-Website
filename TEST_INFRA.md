# E2E Test Infrastructure & Testing Architecture (`TEST_INFRA.md`)

## 1. Testing Philosophy
- **Opaque-Box E2E Testing**: Tests treat the Next.js App Router application as a black box running via HTTP (`http://localhost:3000`).
- **Requirement-Driven**: Every test case directly maps to specific functional requirements (R1, R2, R3) and acceptance criteria.
- **Zero Mocking of Navigation/GSAP**: Tests interact with live DOM elements, true window scroll events, and genuine App Router soft transitions.

## 2. Directory Structure
```
e2e/
├── config/
│   └── playwright.config.ts      # Main Playwright configuration (webServer, viewports, browsers)
├── helpers/
│   ├── scroll-helpers.ts          # Helpers for programmatic wheel events & scroll assertions
│   ├── navigation-helpers.ts      # Helpers for soft routing & browser back/forward buttons
│   └── dom-assertions.ts          # Custom assertions for line-sidebar active state & pins
├── specs/
│   ├── tier1-feature-coverage/
│   │   ├── F1-build-integration.spec.ts
│   │   ├── F2-soft-navigation.spec.ts
│   │   ├── F3-scroll-spy.spec.ts
│   │   ├── F4-multi-transition.spec.ts
│   │   └── F5-sticky-pinning.spec.ts
│   ├── tier2-boundary-corner/
│   │   ├── fast-scrolling.spec.ts
│   │   ├── rapid-navigation.spec.ts
│   │   ├── deep-linking.spec.ts
│   │   ├── window-resizing.spec.ts
│   │   └── scroll-restoration.spec.ts
│   ├── tier3-cross-feature/
│   │   └── cross-feature-combinations.spec.ts
│   └── tier4-real-world/
│       └── user-journeys.spec.ts
```

## 3. Playwright Configuration (`playwright.config.ts`)
- `webServer`: `{ command: process.env.CI ? 'npm run build && npm run start' : 'npm run dev', url: 'http://localhost:3000', reuseExistingServer: !process.env.CI, timeout: 120 * 1000 }`
- `use`: `{ baseURL: 'http://localhost:3000', trace: 'on-first-retry', screenshot: 'only-on-failure' }`
- `projects`: Desktop Chrome (Chromium), Desktop Firefox, Desktop Safari (WebKit), Mobile Chrome (Pixel 5).

## 4. Helper Utilities Specifications
- `getSidebarActiveIndex(page)`: Evaluates `page.locator('li.line-sidebar__item[aria-current="true"]')` and returns item index.
- `getSidebarActiveText(page)`: Returns text content of the active sidebar item.
- `isSidebarPinned(page)`: Checks if `aside` or `.pin-spacer` has fixed positioning styles active.
- `scrollToSectionId(page, sectionId)`: Dispatches smooth scroll or locator click to target section.
- `scrollToY(page, y)`: Evaluates `window.scrollTo(0, y)` and waits for scroll.
- `getScrollY(page)`: Returns `window.scrollY`.
- `countActiveScrollTriggers(page)`: Evaluates `window.ScrollTrigger.getAll().length` inside browser context.
- `softNavigate(page, href)`: Clicks header nav link and waits for target URL.
- `clickSidebarItem(page, index)`: Clicks the N-th `li.line-sidebar__item` in desktop sidebar.

## 5. Feature & Tier Matrix
| Feature | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Cross) | Tier 4 (Journeys) | Total Tests |
|---|---|---|---|---|---|
| F1: App Build & `@gsap/react` | 5 | — | 1 | — | 6 |
| F2: Soft Navigation | 5 | 5 | 3 | 2 | 15 |
| F3: Scroll Spy Tracking | 7 | 5 | 3 | 2 | 17 |
| F4: Multi-transition & Memory | 5 | 5 | 2 | 1 | 13 |
| F5: Sticky Sidebar Pinning | 5 | 5 | 2 | 1 | 13 |
| **Total** | **27** | **25** | **10** | **5** | **67** |
