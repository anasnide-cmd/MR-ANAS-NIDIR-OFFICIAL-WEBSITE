const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to a standard 1200x630 (Facebook/Twitter recommended OG image size)
  await page.setViewport({ width: 1200, height: 630 });
  
  // Navigate to the local server
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Ensure any animations or dynamic content has time to load
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Take screenshot
  await page.screenshot({ path: 'public/assets/site-preview.png' });
  
  await browser.close();
  console.log('Screenshot captured at public/assets/site-preview.png');
})();
