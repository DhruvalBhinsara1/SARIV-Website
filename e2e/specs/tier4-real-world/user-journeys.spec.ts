import { test, expect } from "@playwright/test";
import { getSidebarActiveIndex } from "../../helpers/dom-assertions";
import { scrollToSectionId, scrollToY, dispatchFastScrollWheel } from "../../helpers/scroll-helpers";
import { softNavigate, clickSidebarItem } from "../../helpers/navigation-helpers";

test.describe("Tier 4 - Real-World Application Scenarios", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("T4-RW-01: Full User Exploration Journey", async ({ page }) => {
    // 1. Start at Home page
    await page.goto("/");

    // 2. Click "Identity" in header
    await softNavigate(page, "/identity");

    // 3. Verify arrival at /identity with section 0 active
    expect(await getSidebarActiveIndex(page)).toBe(0);

    // 4 & 5. Scroll down sequentially through all 6 sections
    const sectionIds = ["Overview", "Logomark", "Principles", "Typography", "Color", "Geometry"];
    for (let i = 0; i < sectionIds.length; i++) {
      if (i === 5) {
        await clickSidebarItem(page, 5);
      } else {
        await scrollToSectionId(page, sectionIds[i]);
      }
      await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(i);
    }

    // 6. Click SARIV logo in header to soft navigate to /
    const logoLink = page.locator('header a[href="/"]').first();
    await logoLink.click();
    await page.waitForURL(/\/$/);

    // 7. Click Identity link in header to return to /identity
    await softNavigate(page, "/identity");
    expect(await getSidebarActiveIndex(page)).toBe(0);
  });

  test("T4-RW-02: Interactive Section Jump & Form Navigation Journey", async ({ page }) => {
    // 1. Direct load to /identity
    await page.goto("/identity");

    // 2. Click "Color" in LineSidebar (index 4)
    await clickSidebarItem(page, 4);
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(4);

    // 3. Click "Principles" in LineSidebar (index 2)
    await clickSidebarItem(page, 2);
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(2);

    // 4. Click "Start Project" button in header
    const startProjectBtn = page.locator('header a[href="/start-project"]').first();
    await startProjectBtn.click();
    await page.waitForURL(/\/start-project$/);

    // 5. Click browser Back button to return to /identity
    await page.goBack();
    await page.waitForURL(/\/identity$/);
    await expect(page.locator("nav.line-sidebar")).toBeVisible();
  });

  test("T4-RW-03: Responsive Mobile-to-Desktop Workflow Journey", async ({ page }) => {
    // 1. Open at mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/identity");

    // 2. Verify LineSidebar is hidden
    await expect(page.locator("aside nav.line-sidebar")).toBeHidden();

    // 3. Scroll down 800px
    await scrollToY(page, 800);

    // 4. Resize to desktop width
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(200);

    // 5. Verify LineSidebar becomes visible
    await expect(page.locator("aside nav.line-sidebar")).toBeVisible();

    // 6. Soft navigate to /work and back to /identity
    await softNavigate(page, "/work");
    await softNavigate(page, "/identity");
    await expect(page.locator("aside nav.line-sidebar")).toBeVisible();
  });

  test("T4-RW-04: High-Stress Rapid Navigation & Heavy Scroll Journey", async ({ page }) => {
    // 1. Rapid route navigations between / and /identity
    for (let i = 0; i < 5; i++) {
      await page.goto("/");
      await softNavigate(page, "/identity");
    }

    // 2. Heavy scroll flings up and down
    await dispatchFastScrollWheel(page, 2500, 5);
    await page.waitForTimeout(200);
    await dispatchFastScrollWheel(page, -1500, 3);
    await page.waitForTimeout(200);

    // 3. Click sidebar items in rapid sequence
    await clickSidebarItem(page, 1);
    await clickSidebarItem(page, 4);
    await clickSidebarItem(page, 0);

    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(0);
  });

  test("T4-RW-05: Deep Link Direct Entry & Section Jump Journey", async ({ page }) => {
    // 1. Direct deep link to /identity#Typography
    await page.goto("/identity#Typography");
    await page.waitForTimeout(300);

    // 2. Verify section Typography visible
    await expect(page.locator("section#Typography")).toBeVisible();

    // 3. Click "Logomark" (index 1) in sidebar
    await clickSidebarItem(page, 1);
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(1);

    // 4. Soft navigate to / and back to /identity
    const logoLink = page.locator('header a[href="/"]').first();
    await logoLink.click();
    await page.waitForURL(/\/$/);

    await softNavigate(page, "/identity");
    expect(await getSidebarActiveIndex(page)).toBe(0);
  });
});
