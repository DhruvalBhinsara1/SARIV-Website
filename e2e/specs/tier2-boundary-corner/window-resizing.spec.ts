import { test, expect } from "@playwright/test";
import { getSidebarActiveIndex } from "../../helpers/dom-assertions";
import { scrollToY } from "../../helpers/scroll-helpers";
import { clickSidebarItem } from "../../helpers/navigation-helpers";

test.describe("Tier 2 - Boundary/Corner: Window Resizing", () => {
  test("T2-WR-01: Desktop Width Expansion (1200px -> 1920px) While Pinned", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/identity");
    await scrollToY(page, 400);

    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(200);

    await expect(page.locator("aside nav.line-sidebar")).toBeVisible();
  });

  test("T2-WR-02: Viewport Height Contraction (800px -> 500px) During Active Scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/identity");
    await scrollToY(page, 600);

    await page.setViewportSize({ width: 1280, height: 500 });
    await page.waitForTimeout(200);

    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBeGreaterThanOrEqual(0);
  });

  test("T2-WR-03: Desktop to Mobile Breakpoint Collapse (1200px -> 768px)", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/identity");
    await expect(page.locator("aside nav.line-sidebar")).toBeVisible();

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(200);

    // Sidebar has `hidden lg:block` (lg is 1024px), so on 768px it is hidden
    await expect(page.locator("aside nav.line-sidebar")).toBeHidden();
  });

  test("T2-WR-04: Mobile to Desktop Breakpoint Expansion (768px -> 1200px)", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/identity");
    await expect(page.locator("aside nav.line-sidebar")).toBeHidden();

    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(200);

    await expect(page.locator("aside nav.line-sidebar")).toBeVisible();
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T2-WR-05: Window Resize During Active Smooth Scroll Animation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/identity");

    await clickSidebarItem(page, 4);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(400);

    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(4);
  });
});
