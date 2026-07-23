import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1500, height: 500 },
    deviceScaleFactor: 3, // Retina quality 4500x1500 export
  });
  const page = await context.newPage();
  
  // Go to the dedicated banner route
  await page.goto('http://localhost:3000/export-banner');
  
  // Hide the custom cursor so it doesn't appear in the screenshot
  await page.evaluate(() => {
    const cursor = document.querySelector('.mix-blend-difference');
    if (cursor) cursor.style.display = 'none';
  });
  
  // Wait for the intro animations to settle
  await page.waitForTimeout(2500);
  
  // Take a screenshot of the hero view
  await page.screenshot({ path: 'twitter-banner.png' });
  
  await browser.close();
  console.log('Successfully generated twitter-banner.png');
})();
