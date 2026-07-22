import { test, expect } from "@playwright/test";
import { getSidebarActiveIndex } from "../../helpers/dom-assertions";
import { softNavigate } from "../../helpers/navigation-helpers";

test.describe("Tier 1 - Feature F2: Soft Navigation to /identity", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("T1-F2-01: Soft Navigation Home -> Identity Active State Initialization", async ({ page }) => {
    await page.goto("/");
    await softNavigate(page, "/identity");

    await expect(page).toHaveURL(/\/identity$/);
    await expect(page.locator("section#Overview")).toBeVisible();

    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T1-F2-02: Soft Navigation Work -> Identity ScrollTrigger Binding", async ({ page }) => {
    await page.goto("/work");
    await softNavigate(page, "/identity");

    await expect(page).toHaveURL(/\/identity$/);
    await expect(page.locator("nav.line-sidebar")).toBeVisible();
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T1-F2-03: Soft Navigation Contact -> Identity Offset Precision", async ({ page }) => {
    await page.goto("/contact");
    await softNavigate(page, "/identity");

    const overviewSection = page.locator("section#Overview");
    await expect(overviewSection).toBeVisible();

    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });

  test("T1-F2-04: ScrollTrigger Refresh Execution on Soft Arrival", async ({ page }) => {
    await page.goto("/");
    await softNavigate(page, "/identity");

    // Check that sidebar item active state works immediately on arrival
    const activeItem = page.locator('li.line-sidebar__item[aria-current="true"]');
    await expect(activeItem).toBeVisible();
    await expect(activeItem.locator(".line-sidebar__text")).toHaveText("Identity System");
  });

  test("T1-F2-05: Scroll Reset to Top on Soft Arrival", async ({ page }) => {
    await page.goto("/");
    // Scroll down on homepage
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(100);

    // Soft navigate to /identity
    await softNavigate(page, "/identity");

    const scrollY = await page.evaluate(() => window.scrollY || 0);
    expect(scrollY).toBeLessThanOrEqual(50);
    const activeIndex = await getSidebarActiveIndex(page);
    expect(activeIndex).toBe(0);
  });
});
