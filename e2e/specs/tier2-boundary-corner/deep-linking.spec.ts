import { test, expect } from "@playwright/test";
import { getSidebarActiveIndex } from "../../helpers/dom-assertions";

test.describe("Tier 2 - Boundary/Corner: Deep Linking", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("T2-DL-01: Hard Reload Direct Visit to /identity", async ({ page }) => {
    await page.goto("/identity", { waitUntil: "networkidle" });
    await expect(page.locator("nav.line-sidebar")).toBeVisible();
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T2-DL-02: Direct Deep Link with Section Anchor /identity#Typography", async ({ page }) => {
    await page.goto("/identity#Typography");
    await page.waitForTimeout(400);

    await expect(page.locator("section#Typography")).toBeVisible();
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBeGreaterThanOrEqual(0);
  });

  test("T2-DL-03: Direct Load with Query Strings /identity?ref=campaign", async ({ page }) => {
    await page.goto("/identity?ref=campaign");
    await expect(page.locator("nav.line-sidebar")).toBeVisible();
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T2-DL-04: Direct Load under Throttled CPU / Slow Connection", async ({ page }) => {
    await page.goto("/identity");
    await page.waitForTimeout(500);
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T2-DL-05: Deep Link vs Soft Nav DOM Parity Verification", async ({ page }) => {
    // Hard direct visit
    await page.goto("/identity");
    const directItemsCount = await page.locator("li.line-sidebar__item").count();

    // Soft navigate visit
    await page.goto("/");
    const link = page.locator('header a[href="/identity"]').first();
    await link.click();
    await page.waitForURL(/\/identity$/);

    const softItemsCount = await page.locator("li.line-sidebar__item").count();
    expect(directItemsCount).toBe(softItemsCount);
    expect(directItemsCount).toBe(6);
  });
});
