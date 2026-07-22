import { test, expect } from "@playwright/test";
import { getSidebarActiveIndex } from "../../helpers/dom-assertions";
import { softNavigate, clickSidebarItem } from "../../helpers/navigation-helpers";
import { scrollToSectionId } from "../../helpers/scroll-helpers";

test.describe("Tier 2 - Boundary/Corner: Rapid Navigation", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("T2-RN-01: 5x Navigation Link Clicking (<1s)", async ({ page }) => {
    await page.goto("/");
    const identityLink = page.locator('header a[href="/identity"]').first();
    for (let i = 0; i < 5; i++) {
      await identityLink.click({ force: true });
    }
    await page.waitForURL(/\/identity$/);
    await expect(page.locator("nav.line-sidebar")).toBeVisible();
  });

  test("T2-RN-02: Rapid Inter-Route Cycling (/ -> /identity -> /work -> /identity)", async ({ page }) => {
    await page.goto("/");
    await softNavigate(page, "/identity");
    await softNavigate(page, "/work");
    await softNavigate(page, "/identity");

    await expect(page).toHaveURL(/\/identity$/);
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T2-RN-03: Aborted Navigation Mid-Transition", async ({ page }) => {
    await page.goto("/");
    const identityLink = page.locator('header a[href="/identity"]').first();
    const homeLink = page.locator('header a[href="/"]').first();

    await identityLink.click();
    await homeLink.click();

    await page.waitForTimeout(200);
    await expect(page.locator("body")).toBeVisible();
  });

  test("T2-RN-04: Rapid Sidebar Item Multi-Click", async ({ page }) => {
    await page.goto("/identity");
    await clickSidebarItem(page, 0);
    await clickSidebarItem(page, 5);
    await clickSidebarItem(page, 2);

    await scrollToSectionId(page, "Principles");
    await expect.poll(async () => getSidebarActiveIndex(page), { timeout: 3000 }).toBe(2);
  });

  test("T2-RN-05: Rapid Browser Back/Forward Button Stress", async ({ page }) => {
    await page.goto("/");
    await softNavigate(page, "/identity");
    await page.goBack();
    await page.waitForURL(/\/$/);
    await page.goForward();
    await page.waitForURL(/\/identity$/);

    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });
});
