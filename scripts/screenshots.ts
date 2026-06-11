import * as fs from 'fs';
import * as path from 'path';

import { chromium, Page } from 'playwright';

import { config } from './screenshot.config';

/**
 * Ensures a directory exists, creating it if necessary.
 */
function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Scrolls the page progressively to trigger lazy loading,
 * animations, and ensure all assets are fetched.
 */
async function progressiveScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0); // Scroll back to top
          resolve();
        }
      }, 50); // 50ms interval
    });
  });
}

/**
 * Auto-discovers sections using the user's preferred order:
 * 1. data-section
 * 2. data-testid
 * 3. id
 * 4. section tag
 */
async function autoDiscoverSections(page: Page): Promise<string[]> {
  const discoveredSelectors = await page.evaluate(() => {
    const getSelectors = (elements: NodeListOf<Element> | Element[]): string[] => {
      return Array.from(elements).map((el, index) => {
        if (el.hasAttribute('data-section')) return `[data-section="${el.getAttribute('data-section')}"]`;
        if (el.hasAttribute('data-testid')) return `[data-testid="${el.getAttribute('data-testid')}"]`;
        if (el.id) return `#${el.id}`;
        return `${el.tagName.toLowerCase()}:nth-of-type(${index + 1})`;
      });
    };

    // Attempt 1: data-section
    let elements = document.querySelectorAll('[data-section]');
    if (elements.length >= 8) return getSelectors(elements).slice(0, 8);

    // Attempt 2: data-testid containing 'section'
    elements = document.querySelectorAll('[data-testid*="section"]');
    if (elements.length >= 8) return getSelectors(elements).slice(0, 8);

    // Attempt 3: section tags
    elements = document.querySelectorAll('section');
    if (elements.length >= 8) return getSelectors(elements).slice(0, 8);

    // Attempt 4: main children or large divs
    elements = document.querySelectorAll('main > div, main > section');
    if (elements.length >= 8) return getSelectors(elements).slice(0, 8);

    // Fallback: collect largest elements that look like sections
    const allDivsAndSections = Array.from(document.querySelectorAll('div, section')).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.height > 300 && rect.width > 300;
    });

    return getSelectors(allDivsAndSections).slice(0, 8);
  });

  return discoveredSelectors;
}

/**
 * Main execution function.
 */
async function runScreenshots() {
  console.log('Starting screenshot automation...\n');
  const browser = await chromium.launch({ headless: true });
  let totalScreenshots = 0;
  
  const outputBaseDir = path.join(process.cwd(), config.outputDir);

  try {
    for (const viewport of config.viewports) {
      console.log(`Processing viewport: ${viewport.name} (${viewport.width}x${viewport.height})`);
      
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: config.deviceScaleFactor,
      });

      const page = await context.newPage();
      
      // Error handling and Retry logic for page load
      let loaded = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await page.goto(config.url, { waitUntil: 'networkidle', timeout: 30000 });
          loaded = true;
          break;
        } catch (e) {
          console.warn(`  Attempt ${attempt} failed to load URL. Retrying...`);
        }
      }

      if (!loaded) {
        console.error(`  Failed to load ${config.url} for viewport ${viewport.name}. Skipping...`);
        await context.close();
        continue;
      }

      await page.waitForLoadState('domcontentloaded');
      
      // Wait for 5 seconds for initial first load of the website
      await page.waitForTimeout(5000);
      
      // Hide sticky elements to prevent overlaps during section screenshots
      if (config.hideSelectors.length > 0) {
        await page.evaluate((selectors) => {
          selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
              (el as HTMLElement).style.opacity = '0';
              (el as HTMLElement).style.pointerEvents = 'none';
            });
          });
        }, config.hideSelectors);
      }
      
      // Trigger lazy loading and animations on standard scrolling pages
      await progressiveScroll(page);
      
      // Wait for any final layout shifts or animations to settle
      await page.waitForTimeout(2000); 

      // Section detection
      let sectionsToScreenshot = config.sectionSelectors;
      if (!sectionsToScreenshot || sectionsToScreenshot.length === 0) {
        sectionsToScreenshot = await autoDiscoverSections(page);
        if (sectionsToScreenshot.length === 0) {
          console.error(`  Failed to auto-discover sections. Skipping...`);
          await context.close();
          continue;
        }
      }
      
      const viewportDir = path.join(outputBaseDir, viewport.name);
      ensureDir(viewportDir);

      const hasSnapNav = await page.locator('.snap-dot-btn').count() > 0;

      let sectionCount = 0;
      for (let i = 0; i < sectionsToScreenshot.length; i++) {
        const selector = sectionsToScreenshot[i];

        // Specific to the current codebase: use SnapLayout's dot navigation if it exists
        // to correctly trigger lazy loading and framer-motion whileInView animations.
        if (hasSnapNav) {
          const dotButton = page.locator('.snap-dot-btn').nth(i);
          if (await dotButton.count() > 0) {
            // Use DOM click to bypass pointer-events:none which was applied globally to hide sticky UI
            await dotButton.evaluate(node => (node as HTMLElement).click());
            // Wait for slide transition (transform) and subsequent animations to settle
            await page.waitForTimeout(2500); 
          }
        }

        try {
          const element = await page.locator(selector).first();
          
          if (await element.isVisible()) {
            if (!hasSnapNav) {
              await element.scrollIntoViewIfNeeded();
            }
            
            // Deterministic wait for potential layout shifts after scrolling
            await page.waitForTimeout(1000);

            const fileName = `section-0${i + 1}.png`;
            const filePath = path.join(viewportDir, fileName);

            // Hide sticky elements globally right before snapping if desired, 
            // but since we applied it previously they stay hidden.
            
            // Capture screenshot of the specific section element
            await element.screenshot({ path: filePath, type: 'png' });
            sectionCount++;
          } else {
            console.warn(`  Section ${i + 1} (${selector}) is not visible on ${viewport.name}.`);
          }
        } catch (err) {
          console.error(`  Failed to capture section ${i + 1} (${selector}):`, (err as Error).message);
        }
      }

      console.log(`✓ ${viewport.name} → ${sectionCount} screenshots`);
      totalScreenshots += sectionCount;

      await context.close();
    }
    
    console.log(`\nTotal screenshots generated: ${totalScreenshots}`);
  } catch (error) {
    console.error('An error occurred during screenshot generation:', error);
  } finally {
    await browser.close();
  }
}

runScreenshots().catch(console.error);
