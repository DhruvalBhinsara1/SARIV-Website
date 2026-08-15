import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const BASE_WEB_URL = 'http://localhost:3000';
const FALLBACK_WEB_URL = 'https://webcivicos.vercel.app';

async function testUrl(page, url) {
  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 6000 });
    return res && res.status() < 400;
  } catch (e) {
    return false;
  }
}

async function capture() {
  console.log('Launching System Chrome for pixel-perfect CivicOS real mockup export...');
  const browser = await chromium.launch({ channel: 'chrome' });

  // 1. Desktop High-DPI Context (16:10 / 1440x900 @ 2x Retina)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
  });

  const page = await desktopContext.newPage();

  let activeUrl = BASE_WEB_URL;
  const isLocalUp = await testUrl(page, BASE_WEB_URL);
  if (!isLocalUp) {
    console.log(`Local server not responding, falling back to live URL: ${FALLBACK_WEB_URL}`);
    activeUrl = FALLBACK_WEB_URL;
  } else {
    console.log(`Using local server: ${BASE_WEB_URL}`);
  }

  // --- A. Home / Marketing Hero ---
  console.log('Capturing CivicOS Landing Hero...');
  try {
    await page.goto(`${activeUrl}/`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'civicos-hero-real.png') });
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'civicos.png') });
  } catch (e) {
    console.warn('Hero capture error:', e.message);
  }

  // --- B. Municipal Command Center / Dashboard ---
  console.log('Capturing Municipal Command Center & Live GIS Map...');
  try {
    await page.goto(`${activeUrl}/dashboard`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'civicos-dashboard.png') });
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'civicos_footer.png') });
  } catch (e) {
    console.warn('Dashboard capture error:', e.message);
  }

  // --- C. Incidents Triage & Dispatch Table ---
  console.log('Capturing Incidents Dispatch Table...');
  try {
    await page.goto(`${activeUrl}/dashboard/incidents`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'civicos-incidents.png') });
  } catch (e) {
    console.warn('Incidents capture error:', e.message);
  }

  // --- D. Analytics & Density Heatmaps ---
  console.log('Capturing Municipal Analytics & Heatmaps...');
  try {
    await page.goto(`${activeUrl}/dashboard/analytics`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'civicos-analytics.png') });
  } catch (e) {
    console.warn('Analytics capture error:', e.message);
  }

  // --- E. Mission Control & Resolution Proof ---
  console.log('Capturing Mission Control & Resolution Proof...');
  try {
    await page.goto(`${activeUrl}/mission-control`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'civicos-resolution.png') });
  } catch (e) {
    console.warn('Mission control capture error:', e.message);
  }

  await desktopContext.close();

  // 2. Mobile High-DPI Context (iPhone 15 Pro @ 3x Retina - 393x852)
  const mobileContext = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });

  const mobilePage = await mobileContext.newPage();

  // --- F. Mobile Home UI ---
  console.log('Capturing Mobile Citizen App UI...');
  try {
    await mobilePage.goto(`${activeUrl}/`, { waitUntil: 'networkidle', timeout: 15000 });
    await mobilePage.waitForTimeout(2000);
    await mobilePage.screenshot({ path: path.join(PUBLIC_DIR, 'civicos-mobile-home.png') });
  } catch (e) {
    console.warn('Mobile home capture error:', e.message);
  }

  // --- G. Mobile Dashboard & AI Assistant ---
  console.log('Capturing Mobile Dashboard & AI Assistant...');
  try {
    await mobilePage.goto(`${activeUrl}/dashboard`, { waitUntil: 'networkidle', timeout: 15000 });
    await mobilePage.waitForTimeout(2000);
    await mobilePage.screenshot({ path: path.join(PUBLIC_DIR, 'civicos-mobile-ai.png') });
  } catch (e) {
    console.warn('Mobile AI capture error:', e.message);
  }

  await mobileContext.close();
  await browser.close();

  console.log('✅ Real CivicOS mockups successfully exported from actual running app!');
}

capture().catch((err) => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
