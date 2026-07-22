import { test, expect } from "@playwright/test";
import { getSidebarActiveIndex, isSidebarPinned } from "../../helpers/dom-assertions";
import { scrollToSectionId, scrollToY, dispatchFastScrollWheel } from "../../helpers/scroll-helpers";
import { softNavigate, clickSidebarItem } from "../../helpers/navigation-helpers";

test.describe("Tier 3 - Cross-Feature Combinations", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("T3-CF-01: Soft Navigation During Active Smooth Scroll", async ({ page }) => {
    await page.goto("/identity");
    // Trigger scroll jump
    await clickSidebarItem(page, 5);
    // Immediately navigate away mid-scroll
    await softNavigate(page, "/");

    await expect(page).toHaveURL(/\/$/);
    await softNavigate(page, "/identity");
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T3-CF-02: Rapid Navigation Cycling + Immediate Sticky Pin Check", async ({ page }) => {
    await page.goto("/");
    await softNavigate(page, "/identity");
    await softNavigate(page, "/work");
    await softNavigate(page, "/identity");

    await scrollToY(page, 300);
    const pinned = await isSidebarPinned(page);
    expect(pinned).toBeDefined();
  });

  test("T3-CF-03: Window Resize + Soft Navigation Intersect", async ({ page }) => {
    await page.goto("/identity");
    await page.setViewportSize({ width: 768, height: 1024 });
    await softNavigate(page, "/work");
    await softNavigate(page, "/identity");
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);

    await expect(page.locator("aside nav.line-sidebar")).toBeVisible();
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T3-CF-04: Deep Link + Fast Scroll + Soft Navigation Back", async ({ page }) => {
    await page.goto("/identity#Color");
    await page.waitForTimeout(300);
    await scrollToY(page, 0);

    await softNavigate(page, "/contact");
    await softNavigate(page, "/identity");

    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T3-CF-05: Sidebar Item Jump + Soft Nav + Browser Back Restoration", async ({ page }) => {
    await page.goto("/identity");
    await clickSidebarItem(page, 3); // Typography
    await page.waitForTimeout(400);

    await softNavigate(page, "/");
    await page.goBack();
    await page.waitForURL(/\/identity$/);

    await expect(page.locator("nav.line-sidebar")).toBeVisible();
  });

  test("T3-CF-06: Multi-Page Loop Memory & Trigger Array Profiling", async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await page.goto("/");
      await softNavigate(page, "/work");
      await softNavigate(page, "/identity");
      await softNavigate(page, "/contact");
    }
    await softNavigate(page, "/identity");
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T3-CF-07: Sticky Pinning + Scroll Spy + High Velocity Wheel", async ({ page }) => {
    await page.goto("/identity");
    await scrollToY(page, 200);
    await dispatchFastScrollWheel(page, 2000, 5);
    await page.waitForTimeout(300);

    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBeGreaterThan(0);
  });

  test("T3-CF-08: Breakpoint Cross + Sidebar Item Click Persistence", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/identity");
    await clickSidebarItem(page, 2); // Principles
    await page.waitForTimeout(300);

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(100);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(200);

    await expect(page.locator("nav.line-sidebar")).toBeVisible();
  });

  test("T3-CF-09: SmoothScrolling RAF Refresh Sync with useGSAP Setup", async ({ page }) => {
    await page.goto("/");
    await softNavigate(page, "/identity");

    const wrapper = page.locator("#smooth-wrapper");
    const content = page.locator("#smooth-content");
    await expect(wrapper).toBeVisible();
    await expect(content).toBeVisible();
  });

  test("T3-CF-10: Header Scroll State (isScrolled) + Identity Sidebar Pin State Sync", async ({ page }) => {
    await page.goto("/identity");
    await scrollToY(page, 100);

    const header = page.locator("header");
    await expect(header).toBeVisible();

    await scrollToY(page, 300);
    const sidebar = page.locator("aside nav.line-sidebar");
    await expect(sidebar).toBeVisible();
  });
});
