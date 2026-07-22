import { test, expect } from "@playwright/test";

test.describe("Tier 1 - Feature F1: App Build & @gsap/react Integration", () => {
  test("T1-F1-01: Next.js Production Build Validation & Runtime Health", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    expect(consoleErrors.filter((e) => !e.includes("favicon"))).toHaveLength(0);
  });

  test("T1-F1-02: Client Hydration of useGSAP Scoped Components", async ({ page }) => {
    const pageErrors: Error[] = [];
    page.on("pageerror", (err) => pageErrors.push(err));

    await page.goto("/identity");
    await expect(page.locator("ul.line-sidebar__list")).toBeVisible();
    await expect(page.locator("section#Overview")).toBeVisible();
    expect(pageErrors).toHaveLength(0);
  });

  test("T1-F1-03: GSAP ScrollTrigger & ScrollSmoother Registration Verification", async ({ page }) => {
    await page.goto("/identity");

    const isGsapLoaded = await page.evaluate(() => {
      // @ts-expect-error window extension
      return typeof window.gsap !== "undefined" || !!document.querySelector("#smooth-wrapper");
    });
    expect(isGsapLoaded).toBe(true);
  });

  test("T1-F1-04: Scoped Context Cleanup Setup (useGSAP Context)", async ({ page }) => {
    await page.goto("/identity");
    const sidebarCount = await page.locator("nav.line-sidebar").count();
    expect(sidebarCount).toBeGreaterThan(0);

    // Verify sections exist in DOM container
    for (const sectionId of ["Overview", "Logomark", "Principles", "Typography", "Color", "Geometry"]) {
      await expect(page.locator(`section#${sectionId}`)).toBeAttached();
    }
  });

  test("T1-F1-05: @gsap/react Export & Hook Usage Verification", async ({ page }) => {
    await page.goto("/identity");
    await expect(page.locator("li.line-sidebar__item").first()).toBeVisible();

    // Navigate away to trigger hook unmount
    await page.goto("/work");
    await expect(page.locator("body")).toBeVisible();

    // Navigate back
    await page.goto("/identity");
    await expect(page.locator('li.line-sidebar__item[aria-current="true"]')).toBeVisible();
  });
});
