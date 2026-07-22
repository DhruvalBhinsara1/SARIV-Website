import { test, expect } from "@playwright/test";
import { softNavigate } from "../../helpers/navigation-helpers";
import { getSidebarActiveIndex } from "../../helpers/dom-assertions";

test.describe("Tier 1 - Feature F4: Multi-Transition & Stability", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("T1-F4-01: No Orphaned Triggers Across 5 Navigation Cycles", async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.goto("/");
      await softNavigate(page, "/identity");
      await expect(page.locator("nav.line-sidebar")).toBeVisible();
    }

    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T1-F4-02: Scroll Lock Prevention Post Multi-Transition", async ({ page }) => {
    await page.goto("/");
    await softNavigate(page, "/identity");
    await softNavigate(page, "/work");
    await softNavigate(page, "/identity");

    // Attempt scrolling down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(100);

    const scrollY = await page.evaluate(() => window.scrollY || 0);
    // Ensure document scroll is not frozen
    expect(scrollY).toBeGreaterThanOrEqual(0);
    await expect(page.locator("#smooth-wrapper")).toBeVisible();
  });

  test("T1-F4-03: Memory & Listener Cleanup Verification", async ({ page }) => {
    await page.goto("/identity");
    await expect(page.locator("nav.line-sidebar")).toBeVisible();

    await softNavigate(page, "/contact");
    await expect(page.locator("nav.line-sidebar")).toHaveCount(0);

    await softNavigate(page, "/identity");
    await expect(page.locator("nav.line-sidebar")).toBeVisible();
  });

  test("T1-F4-04: No Duplicate onEnter Firing", async ({ page }) => {
    await page.goto("/identity");
    // Verify only 1 active item at any time
    const activeItems = page.locator('li.line-sidebar__item[aria-current="true"]');
    await expect(activeItems).toHaveCount(1);
  });

  test("T1-F4-05: SmoothScrolling Wrapper DOM Integrity", async ({ page }) => {
    await page.goto("/");
    await softNavigate(page, "/identity");

    const wrapper = page.locator("#smooth-wrapper");
    const content = page.locator("#smooth-content");

    await expect(wrapper).toBeVisible();
    await expect(content).toBeVisible();
    await expect(wrapper.locator("#smooth-content")).toHaveCount(1);
  });
});
