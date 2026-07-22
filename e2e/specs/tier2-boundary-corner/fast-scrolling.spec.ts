import { test, expect } from "@playwright/test";
import { getSidebarActiveIndex } from "../../helpers/dom-assertions";
import { dispatchFastScrollWheel, scrollToY } from "../../helpers/scroll-helpers";

test.describe("Tier 2 - Boundary/Corner: Fast Scrolling", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/identity");
    await expect(page.locator("nav.line-sidebar")).toBeVisible();
  });

  test("T2-BS-01: High-Velocity Wheel Fling (3000px in 150ms)", async ({ page }) => {
    await dispatchFastScrollWheel(page, 3000, 10);
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBeGreaterThanOrEqual(4);
  });

  test("T2-BS-02: Instant Scroll Jump via window.scrollTo(0, 2500)", async ({ page }) => {
    await scrollToY(page, 2500);
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBeGreaterThanOrEqual(2);
  });

  test("T2-BS-03: Rapid Direction Reversal (Zig-Zag Scroll)", async ({ page }) => {
    await scrollToY(page, 1500);
    await page.waitForTimeout(50);
    await scrollToY(page, 500);
    await page.waitForTimeout(50);
    await scrollToY(page, 2000);

    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBeGreaterThanOrEqual(2);
  });

  test("T2-BS-04: Bottom Rubber-Band Overscroll Handling", async ({ page }) => {
    await scrollToY(page, 10000);

    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(5); // Geometry (last section)
  });

  test("T2-BS-05: Fast Scroll During Section Entry Animations", async ({ page }) => {
    await scrollToY(page, 1200);

    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBeGreaterThan(0);
  });
});
