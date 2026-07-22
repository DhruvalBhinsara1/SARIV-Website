import { Page, expect } from "@playwright/test";

/**
 * Performs client-side soft navigation by clicking a header link matching href.
 */
export async function softNavigate(page: Page, href: string): Promise<void> {
  const link = page.locator(`header a[href="${href}"]`).first();
  await expect(link).toBeVisible();
  await link.click();
  await page.waitForURL(`**${href}`);
  await page.waitForTimeout(100);
}

/**
 * Clicks the N-th sidebar item in desktop section navigation (0-indexed).
 */
export async function clickSidebarItem(page: Page, index: number): Promise<void> {
  const sidebarItems = page.locator("li.line-sidebar__item");
  const count = await sidebarItems.count();
  if (index < 0 || index >= count) {
    throw new Error(`Sidebar item index ${index} out of bounds (total items: ${count})`);
  }
  await sidebarItems.nth(index).click({ force: true });
  await page.waitForTimeout(300);
}
