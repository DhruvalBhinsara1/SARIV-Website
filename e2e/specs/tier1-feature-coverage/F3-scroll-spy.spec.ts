import { test, expect } from "@playwright/test";
import { getSidebarActiveIndex } from "../../helpers/dom-assertions";
import { scrollToSectionId } from "../../helpers/scroll-helpers";
import { clickSidebarItem } from "../../helpers/navigation-helpers";

test.describe("Tier 1 - Feature F3: Scroll Spy Tracking", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/identity");
    await expect(page.locator("nav.line-sidebar")).toBeVisible();
  });

  test("T1-F3-01: Section 0 -> Section 1 Spy Transition", async ({ page }) => {
    expect(await getSidebarActiveIndex(page)).toBe(0);

    await scrollToSectionId(page, "Logomark");
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(1);
  });

  test("T1-F3-02: Section 1 -> Section 2 (Principles) Spy Transition", async ({ page }) => {
    await scrollToSectionId(page, "Principles");
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(2);
  });

  test("T1-F3-03: Section 2 -> Section 3 (Typography) Spy Transition", async ({ page }) => {
    await scrollToSectionId(page, "Typography");
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(3);
  });

  test("T1-F3-04: Section 3 -> Section 4 (Color) Spy Transition", async ({ page }) => {
    await scrollToSectionId(page, "Color");
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(4);
  });

  test("T1-F3-05: Section 4 -> Section 5 (Geometry) Spy Transition", async ({ page }) => {
    await clickSidebarItem(page, 5);
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(5);
  });

  test("T1-F3-06: Reverse Upward Scroll Spy Tracking", async ({ page }) => {
    // Scroll to bottom section
    await clickSidebarItem(page, 5);
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(5);

    // Scroll up section by section
    await scrollToSectionId(page, "Typography");
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(3);

    await scrollToSectionId(page, "Overview");
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(0);
  });

  test("T1-F3-07: Sidebar Item Click Scroll Spy Sync", async ({ page }) => {
    // Click index 3 ("Typography")
    await clickSidebarItem(page, 3);
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(3);
  });
});
