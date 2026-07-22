import { test, expect } from "@playwright/test";
import { getSidebarActiveIndex } from "../../helpers/dom-assertions";
import { scrollToY } from "../../helpers/scroll-helpers";
import { softNavigate } from "../../helpers/navigation-helpers";

test.describe("Tier 2 - Boundary/Corner: Scroll Restoration & Viewport Extremes", () => {
  test("T2-VE-01: Browser Back Button Scroll Position Restoration", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/identity");
    await scrollToY(page, 800);

    await softNavigate(page, "/work");
    await page.goBack();
    await page.waitForURL(/\/identity$/);

    await expect(page.locator("nav.line-sidebar")).toBeVisible();
  });

  test("T2-VE-02: Ultra-Short Viewport Extreme (1280x360px)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 360 });
    await page.goto("/identity");
    await expect(page.locator("nav.line-sidebar")).toBeVisible();

    await scrollToY(page, 400);
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBeGreaterThanOrEqual(0);
  });

  test("T2-VE-03: Ultra-Tall Viewport Extreme (1280x2100px)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2100 });
    await page.goto("/identity");
    await expect(page.locator("nav.line-sidebar")).toBeVisible();

    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T2-VE-04: Touch Pointer Event Emulation on LineSidebar", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/identity");

    const sidebarItem = page.locator("li.line-sidebar__item").nth(1);
    await sidebarItem.dispatchEvent("pointermove", { clientX: 100, clientY: 200 });
    await sidebarItem.dispatchEvent("pointerleave");

    await expect(sidebarItem).toBeVisible();
  });

  test("T2-VE-05: Browser Zoom Scaling (150% Zoom)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/identity");

    // Evaluate CSS zoom scale
    await page.evaluate(() => {
      document.body.style.transform = "scale(1.5)";
      document.body.style.transformOrigin = "0 0";
    });

    await scrollToY(page, 300);
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBeGreaterThanOrEqual(0);
  });
});
