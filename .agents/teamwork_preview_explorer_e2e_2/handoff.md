# E2E Testing Infrastructure & Playwright Configuration Analysis

## 1. Observation

### 1.1 Existing Project Configuration & Dependencies
- **`package.json`** (`/Users/dhruvalbhinsara/SARIV-Website/package.json`):
  - Next.js Version: `16.2.11` (line 31)
  - React Version: `19.2.4` (line 34)
  - TypeScript: `^5` (line 49)
  - Tailwind CSS: `^4` (line 48)
  - Scripts (lines 5-10):
    ```json
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "eslint"
    }
    ```
  - Test framework status: **No testing framework or test runner** (`@playwright/test`, `cypress`, `jest`, `vitest`) is currently installed in `dependencies` or `devDependencies`.
  - Zero test scripts exist in `package.json`.
- **`tsconfig.json`** (`/Users/dhruvalbhinsara/SARIV-Website/tsconfig.json`):
  - Target: `ES2017` (line 3)
  - Module Resolution: `bundler` (line 11)
  - Path Mapping (lines 21-23): `"@/*": ["./src/*"]`
  - Includes (lines 25-32): `"**/*.ts"`, `"**/*.tsx"`, `"next-env.d.ts"`
  - Note: Playwright test files placed in `e2e/**/*.ts` or `tests/**/*.ts` will naturally align with the TypeScript compiler settings.
- **`next.config.ts`** (`/Users/dhruvalbhinsara/SARIV-Website/next.config.ts`):
  - Configured with Turbopack root (`root: path.resolve(__dirname)`).

### 1.2 Key Application Interactive Patterns
- **`src/components/Header.tsx`**:
  - Scroll state listener (lines 33-36): `window.scrollY > 20` sets `isScrolled = true`.
  - Class toggling on scroll (lines 49-53): Toggles `"border-b border-white/10 bg-black/20 backdrop-blur-md"` when `isScrolled` is true.
  - Mobile Sidebar trigger & links (lines 101-114): Uses Radix / custom sidebar context for responsive screens (`md:hidden`).
- **`src/components/SmoothScrolling.tsx`**:
  - Uses GSAP `ScrollSmoother` plugin wrapping children in `#smooth-wrapper` and `#smooth-content` (lines 21-26 & 38-40).
  - Sets `history.scrollRestoration = "manual"` and `window.scrollTo(0, 0)` on mount (lines 18-19).

---

## 2. Logic Chain

1. **Framework Selection**:
   - The project is built on Next.js 16 (App Router), React 19, and Tailwind CSS v4.
   - For end-to-end testing of full user workflows, routing, client-side hydration, GSAP smooth scrolling, and mobile responsiveness, Playwright (`@playwright/test`) is the industry standard for Next.js applications due to fast execution, native multi-browser support (Chromium, Firefox, WebKit), built-in auto-waiting, and seamless server management (`webServer`).

2. **Package Additions & Script Enhancements**:
   - Installing `@playwright/test` as a `devDependency` allows running E2E tests without affecting production bundles.
   - Adding standard scripts (`"test:e2e"`, `"test:e2e:ui"`, `"test:e2e:debug"`, `"test:e2e:report"`) in `package.json` gives developers and CI uniform invocation entry points.

3. **Local Server Strategy (`webServer`)**:
   - Playwright needs a running web server to test against.
   - *Local Development*: Reusing an already running Next.js dev server (`npm run dev` on `http://localhost:3000`) speeds up test cycles. `reuseExistingServer: !process.env.CI` achieves this.
   - *CI / Automated Pipelines*: Building and starting the production server (`npm run build && npm run start`) ensures tests run against actual production assets, eliminating dev-mode overhead and catching hydration or build-time issues.
   - *Alternate Port Strategy*: In case port 3000 is occupied or dedicated test isolation is required, `webServer` can launch Next.js on port 3001 using `npm run dev -- -p 3001` or `PORT=3001 npm run start`.

4. **Browser Automation & Assertion Strategy**:
   - *Multi-Browser Matrix*: Test Chromium, Firefox, WebKit, and Mobile Chrome (e.g. Pixel 5 / iPhone 12 viewport).
   - *Scroll Assertions with GSAP*: Because `SmoothScrolling.tsx` initializes GSAP `ScrollSmoother`, native `window.scrollY` and DOM element bounding boxes (`element.getBoundingClientRect()`) must be asserted carefully. Playwright's `page.evaluate()` or `locator.evaluate()` combined with `scrollIntoViewIfNeeded()` or `window.scrollTo()` provides reliable verification of scroll states and header backdrop transitions.

---

## 3. Caveats

- **CI Environment Installation**: Playwright browser binaries must be downloaded via `npx playwright install --with-deps` in headless CI environments.
- **GSAP Smooth Scroll timing**: GSAP smooth scrolling introduces a non-instant scroll interpolation delay (`smooth: 1`). Assertions on scroll position should use `expect.poll()` or `waitForFunction` rather than immediate synchronous checks.
- **Turbopack Dev Server Compilation**: Next.js 16 with Turbopack compiles pages on first request during `npm run dev`. The `webServer.timeout` in `playwright.config.ts` should be set to at least 120 seconds to prevent cold-start timeouts.

---

## 4. Conclusion

To set up end-to-end testing for SARIV-Website, execute the following additions and configurations:

### 4.1 Package Additions
Install `@playwright/test` and browser binaries:
```bash
npm install --save-dev @playwright/test
npx playwright install
```

### 4.2 Script Additions (`package.json`)
Add the following to `scripts` in `package.json`:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:debug": "playwright test --debug",
  "test:e2e:report": "playwright show-report"
}
```

### 4.3 `playwright.config.ts` Configuration Recommendation
Create `/Users/dhruvalbhinsara/SARIV-Website/playwright.config.ts`:

```typescript
import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

### 4.4 Browser Automation & Assertion Patterns
1. **Header Scroll Assertion Pattern**:
   ```typescript
   import { test, expect } from "@playwright/test";

   test("header transforms on page scroll", async ({ page }) => {
     await page.goto("/");
     
     // Scroll down past 20px threshold
     await page.evaluate(() => window.scrollTo(0, 100));
     
     // Wait for GSAP smooth scroll / scroll listener update
     await expect.poll(async () => {
       return page.evaluate(() => window.scrollY);
     }).toBeGreaterThan(20);

     // Verify header background layer activates backdrop-blur-md
     const headerBg = page.locator("header > div.absolute");
     await expect(headerBg).toHaveClass(/backdrop-blur-md/);
   });
   ```

2. **Mobile Sidebar Assertion Pattern**:
   ```typescript
   test("mobile navigation sidebar opens and closes", async ({ page, isMobile }) => {
     test.skip(!isMobile, "Mobile menu test only runs on mobile viewports");
     await page.goto("/");

     const menuTrigger = page.locator("header button");
     await menuTrigger.click();

     const navLink = page.locator('nav a[href="/work"], div[role="dialog"] a[href="/work"]');
     await expect(navLink).toBeVisible();
   });
   ```

---

## 5. Verification Method

1. **Package Verification**:
   Inspect `package.json` to confirm `@playwright/test` is listed under `devDependencies` and the `test:e2e*` scripts are present.
2. **Config Verification**:
   Ensure `playwright.config.ts` exists in the repository root and resolves `testDir: "./e2e"`.
3. **Execution Verification**:
   - Run `npx playwright test` (or `npm run test:e2e`).
   - Playwright will automatically start `npm run dev` (or connect to `http://localhost:3000`), execute specs in `e2e/`, and output test results.
