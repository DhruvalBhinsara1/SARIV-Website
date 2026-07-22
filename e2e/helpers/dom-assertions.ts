import { Page, expect } from "@playwright/test";

export const SECTION_IDS = [
  "Overview",
  "Logomark",
  "Principles",
  "Typography",
  "Color",
  "Geometry",
];

export const SECTION_LABELS = [
  "Identity System",
  "Logomark",
  "Principles",
  "Typography",
  "Color",
  "Geometry",
];

/**
 * Gets the 0-based index of the currently active LineSidebar item, or -1 if none is active.
 */
export async function getSidebarActiveIndex(page: Page): Promise<number> {
  const activeItem = page.locator('li.line-sidebar__item[aria-current="true"]').first();
  try {
    await activeItem.waitFor({ state: "attached", timeout: 2000 });
  } catch (e) {
    return -1;
  }

  const items = page.locator("li.line-sidebar__item");
  const totalCount = await items.count();

  for (let i = 0; i < totalCount; i++) {
    const isCurrent = await items.nth(i).getAttribute("aria-current");
    if (isCurrent === "true") {
      return i;
    }
  }
  return -1;
}

/**
 * Gets the text content of the currently active LineSidebar item.
 */
export async function getSidebarActiveText(page: Page): Promise<string> {
  const activeItem = page.locator('li.line-sidebar__item[aria-current="true"] .line-sidebar__text');
  if ((await activeItem.count()) === 0) return "";
  return (await activeItem.textContent())?.trim() || "";
}

/**
 * Checks if the sidebar container is currently pinned (either has position: fixed or is wrapped in GSAP pin-spacer).
 */
export async function isSidebarPinned(page: Page): Promise<boolean> {
  return await page.evaluate(() => {
    const aside = document.querySelector("aside");
    if (!aside) return false;
    const pinSpacer = aside.closest(".pin-spacer");
    if (pinSpacer) return true;
    const style = window.getComputedStyle(aside);
    return style.position === "fixed";
  });
}
