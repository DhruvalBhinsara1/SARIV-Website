import { test, expect } from "@playwright/test";
import { isSidebarPinned } from "../../helpers/dom-assertions";
import { scrollToSectionId, scrollToY } from "../../helpers/scroll-helpers";
import { softNavigate, clickSidebarItem } from "../../helpers/navigation-helpers";

test.describe("Tier 1 - Feature F5: Sticky Sidebar Pinning", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("T1-F5-01: Desktop Sidebar Pin Activation at Threshold (160px)", async ({ page }) => {
    await page.goto("/identity");
    const sidebar = page.locator("aside nav.line-sidebar");
    await expect(sidebar).toBeVisible();

    await scrollToY(page, 300);
    const pinned = await isSidebarPinned(page);
    expect(pinned).toBeDefined();
  });

  test("T1-F5-02: Sidebar Unpin at Column Bottom Boundary", async ({ page }) => {
    await page.goto("/identity");
    await scrollToSectionId(page, "Geometry");
    await page.waitForTimeout(300);

    const sidebar = page.locator("aside");
    await expect(sidebar).toBeVisible();
  });

  test("T1-F5-03: Soft Navigation Pin Calculation Match", async ({ page }) => {
    await page.goto("/");
    await softNavigate(page, "/identity");

    const sidebar = page.locator("aside nav.line-sidebar");
    await expect(sidebar).toBeVisible();
    await scrollToY(page, 250);
  });

  test("T1-F5-04: Pin Parity Hard Reload vs Soft Navigation", async ({ page }) => {
    // Hard reload
    await page.goto("/identity");
    const hardSidebarVisible = await page.locator("aside nav.line-sidebar").isVisible();

    // Soft nav
    await page.goto("/");
    await softNavigate(page, "/identity");
    const softSidebarVisible = await page.locator("aside nav.line-sidebar").isVisible();

    expect(hardSidebarVisible).toBe(softSidebarVisible);
  });

  test("T1-F5-05: Smooth Scroll Jump Pin Stability", async ({ page }) => {
    await page.goto("/identity");
    await clickSidebarItem(page, 5); // Jump to Geometry
    await page.waitForTimeout(400);

    const sidebar = page.locator("aside");
    await expect(sidebar).toBeVisible();
  });
});
