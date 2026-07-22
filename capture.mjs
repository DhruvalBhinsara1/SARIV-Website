import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://www.core-defenses.com/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/core-defenses.png' });
  await browser.close();
  console.log("Screenshot saved!");
})();
