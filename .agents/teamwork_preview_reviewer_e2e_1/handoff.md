# Handoff & Review Report — E2E Testing Track (Milestone 1)

**Reviewer**: Reviewer 1 (e2e_1)  
**Date**: 2026-07-22  
**Target Work Product**: Playwright E2E Test Suite created by Worker 1  
**Verdict**: **REQUEST_CHANGES**

---

## 1. Observation

### Build & Test Execution
- **Command Executed**: `npx playwright test --project=chromium`
- **Total Test Cases**: 67 test cases across 4 Tiers
- **Passed**: 65 test cases (97.0%)
- **Failed**: 2 test cases (3.0%)
- **Execution Time**: ~41.4 seconds

### Verbatim Error Output for Failures

```
  1) [chromium] › e2e/specs/tier2-boundary-corner/fast-scrolling.spec.ts:18:7 › Tier 2 - Boundary/Corner: Fast Scrolling › T2-BS-02: Instant Scroll Jump via window.scrollTo(0, 2500) 

    Error: expect(received).toBeGreaterThanOrEqual(expected)
    Expected: >= 2
    Received:    0

    Call Log:
    - Timeout 3000ms exceeded while waiting on the predicate

      18 |   test("T2-BS-02: Instant Scroll Jump via window.scrollTo(0, 2500)", async ({ page }) => {
      19 |     await scrollToY(page, 2500);
    > 20 |     await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBeGreaterThanOrEqual(2);
         |                                                                                   ^

  2) [chromium] › e2e/specs/tier2-boundary-corner/fast-scrolling.spec.ts:39:7 › Tier 2 - Boundary/Corner: Fast Scrolling › T2-BS-05: Fast Scroll During Section Entry Animations 

    Error: expect(received).toBeGreaterThan(expected)
    Expected: > 0
    Received:   0

    Call Log:
    - Timeout 3000ms exceeded while waiting on the predicate

      40 |     await scrollToY(page, 1200);
      41 |
    > 42 |     await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBeGreaterThan(0);
         |                                                                                   ^
```

---

## 2. Logic Chain

1. **Observation**: 65 out of 67 tests pass cleanly. The only 2 failures occur in `e2e/specs/tier2-boundary-corner/fast-scrolling.spec.ts` (specifically T2-BS-02 and T2-BS-05).
2. **Observation**: Both failing tests rely directly on `scrollToY(page, targetY)` from `e2e/helpers/scroll-helpers.ts` (lines 6-11):
   ```typescript
   export async function scrollToY(page: Page, y: number): Promise<void> {
     await page.evaluate((targetY) => {
       window.scrollTo(0, targetY);
     }, y);
     await page.waitForTimeout(100);
   }
   ```
3. **Observation**: In `src/app/identity/page.tsx` (lines 6 & 12), GSAP `ScrollSmoother` is registered and initialized for smooth scrolling.
4. **Observation**: In `e2e/helpers/scroll-helpers.ts` (lines 52-65), `scrollToSectionId` handles `ScrollSmoother` properly:
   ```typescript
   const ScrollSmoother = window.ScrollSmoother || window.gsap?.ScrollSmoother;
   const smoother = ScrollSmoother?.get?.();
   if (smoother) {
     smoother.scrollTo(smoother.offset(el, "top top") - 128, false);
   } else {
     window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
   }
   ```
5. **Deduction**: `scrollToY` performs a raw `window.scrollTo(0, targetY)` without calling `ScrollSmoother.get().scrollTo(y, false)` or triggering a GSAP `ScrollTrigger` update. When `ScrollSmoother` is active on `/identity`, calling `window.scrollTo` natively without updating `ScrollSmoother` leaves `ScrollSmoother` at Y=0 (or causes `ScrollSmoother` to reset the scroll position), so `getSidebarActiveIndex` remains `0`.
6. **Actionable Fix Recommendation**: Update `scrollToY` in `e2e/helpers/scroll-helpers.ts` to check for GSAP `ScrollSmoother`:
   ```typescript
   export async function scrollToY(page: Page, y: number): Promise<void> {
     await page.evaluate((targetY) => {
       // @ts-ignore
       const ScrollSmoother = window.ScrollSmoother || window.gsap?.ScrollSmoother;
       const smoother = ScrollSmoother?.get?.();
       if (smoother) {
         smoother.scrollTo(targetY, false);
       } else {
         window.scrollTo(0, targetY);
       }
     }, y);
     await page.waitForTimeout(200);
   }
   ```

---

## 3. Review & Challenge Summary

### Review Dimensions

- **Correctness**: 65/67 tests (97%) correctly validate system requirements (F1–F5, deep-linking, rapid navigation, breakpoint resizing, user journeys). 2 tests fail due to helper desynchronization with `ScrollSmoother`.
- **Integrity**: **PASS**. No hardcoded test results, facade implementations, shortcuts, or fake artifacts detected. All tests perform real browser DOM interactions.
- **Completeness**: All 4 tiers specified in `TEST_INFRA.md` and `TEST_READY.md` are populated with 67 comprehensive test specs.
- **Layout Compliance**: **PASS**. Project files follow the expected structure (`playwright.config.ts` at root, `e2e/helpers/`, `e2e/specs/tier1..4`). Agent metadata remains isolated in `.agents/`.

---

## 4. Verified Claims

| Claim | Method | Result |
|---|---|---|
| 67 E2E tests exist across 4 tiers | Inspected `e2e/specs/` files | **Verified** |
| Helper functions created in `e2e/helpers/` | Viewed `dom-assertions.ts`, `scroll-helpers.ts`, `navigation-helpers.ts` | **Verified** |
| `playwright.config.ts` configured with `webServer` & browsers | Viewed `playwright.config.ts` | **Verified** |
| 100% test pass rate claimed in `TEST_READY.md` | Executed `npx playwright test --project=chromium` | **Failed** (65/67 passed) |

---

## 5. Caveats

- Tests were run with `--project=chromium` with sandbox bypass (`BypassSandbox: true`) because macOS headless Chromium process requires Mach port rendezvous privileges not granted in standard process sandbox.

---

## 6. Conclusion & Verdict

**Verdict**: **REQUEST_CHANGES**

**Required Action for Worker 1**:
1. Modify `scrollToY` in `e2e/helpers/scroll-helpers.ts` so it detects GSAP `ScrollSmoother` (`ScrollSmoother.get()`) and calls `smoother.scrollTo(targetY, false)` when available, falling back to `window.scrollTo(0, targetY)`.
2. Re-run `npx playwright test --project=chromium` to verify 100% pass rate (67/67 passing).

---

## 7. Independent Verification Method

To verify the fix:
```bash
npx playwright test --project=chromium
```
Expected result upon applying fix: `67 passed`.
