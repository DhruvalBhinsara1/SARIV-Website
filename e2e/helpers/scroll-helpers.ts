import { Page } from "@playwright/test";

/**
 * Programmatically scrolls the page to a specific Y coordinate using GSAP ScrollSmoother or window.scrollTo.
 */
export async function scrollToY(page: Page, y: number): Promise<void> {
  await page.evaluate((targetY) => {
    // @ts-ignore
    const ScrollSmoother = window.ScrollSmoother || window.gsap?.ScrollSmoother;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger || window.gsap?.ScrollTrigger;
    const smoother = ScrollSmoother?.get?.();
    if (smoother) {
      smoother.scrollTo(targetY, false);
    } else {
      window.scrollTo(0, targetY);
    }
    if (ScrollTrigger && typeof ScrollTrigger.update === "function") {
      ScrollTrigger.update();
    }
  }, y);
  await page.waitForTimeout(200);
}

/**
 * Returns the current window scroll Y position.
 */
export async function getScrollY(page: Page): Promise<number> {
  return await page.evaluate(() => window.scrollY || document.documentElement.scrollTop || 0);
}

/**
 * Returns the count of registered GSAP ScrollTrigger instances in the window context.
 */
export async function countActiveScrollTriggers(page: Page): Promise<number> {
  return await page.evaluate(() => {
    // @ts-expect-error window extension
    const ScrollTrigger = window.ScrollTrigger || window.gsap?.ScrollTrigger;
    if (ScrollTrigger && typeof ScrollTrigger.getAll === "function") {
      return ScrollTrigger.getAll().length;
    }
    return 0;
  });
}

/**
 * Simulates high-velocity scroll wheel events down to totalDeltaY in step increments.
 */
export async function dispatchFastScrollWheel(
  page: Page,
  totalDeltaY: number,
  steps: number = 5
): Promise<void> {
  const deltaPerStep = totalDeltaY / steps;
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, deltaPerStep);
    await page.waitForTimeout(20);
  }
}

/**
 * Programmatically scrolls to a section element by ID with header offset clearance.
 */
export async function scrollToSectionId(page: Page, sectionId: string): Promise<void> {
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    // @ts-ignore
    const ScrollSmoother = window.ScrollSmoother || window.gsap?.ScrollSmoother;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger || window.gsap?.ScrollTrigger;
    const smoother = ScrollSmoother?.get?.();
    if (smoother) {
      smoother.scrollTo(smoother.offset(el, "top top") - 128, false);
    } else {
      const top = el.getBoundingClientRect().top + (window.scrollY || document.documentElement.scrollTop || 0) - 128;
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    }
    if (ScrollTrigger && typeof ScrollTrigger.update === "function") {
      ScrollTrigger.update();
    }
  }, sectionId);
  await page.waitForTimeout(300);
}
