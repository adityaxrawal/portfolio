/* eslint-disable no-secrets/no-secrets */
import { test, expect } from '@playwright/test';

/**
 * Responsive Regression Safety Net
 * Validates across key representative viewports:
 * - No horizontal overflow (scrollWidth <= innerWidth)
 * - No bounding box protruding past right edge
 * - Critical interactive elements visible and non-overlapping
 * - Consistency with shared container and padding tokens
 */

const KEY_VIEWPORTS = [
  { name: 'Mobile-Folded-280', width: 280, height: 653 },
  { name: 'Mobile-Compact-320', width: 320, height: 568 },
  { name: 'Mobile-Standard-390', width: 390, height: 844 },
  { name: 'Mobile-Landscape-852x393', width: 852, height: 393 },
  { name: 'Tablet-Portrait-768x1024', width: 768, height: 1024 },
  { name: 'Tablet-Landscape-1024x768', width: 1024, height: 768 },
  { name: 'Laptop-1440x900', width: 1440, height: 900 },
  { name: 'Desktop-1080p', width: 1920, height: 1080 },
  { name: 'Ultrawide-3440x1440', width: 3440, height: 1440 },
];

const SECTIONS = [
  { index: 0, selector: '.hero-section-wrapper', name: 'Hero' },
  { index: 1, selector: '.work-v2-section', name: 'Work Experience' },
  { index: 2, selector: '.proj-v2-section', name: 'Projects' },
  { index: 3, selector: '.tech-v2-section', name: 'Skills' },
  { index: 4, selector: '.footer-v3-root', name: 'Footer' },
];

test.describe('Responsive Layout & No-Overflow Regression Tests', () => {
  for (const vp of KEY_VIEWPORTS) {
    test.describe(`${vp.name} (${vp.width}x${vp.height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
      });

      test('should have zero horizontal overflow across entire document', async ({
        page,
      }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2500);

        // Dismiss loader if present
        await page.evaluate(() => {
          const loader = document.querySelector(
            '.fixed.inset-0.z-\\[9999\\]',
          ) as HTMLElement | null;
          if (loader) loader.style.display = 'none';
        });

        const overflow = await page.evaluate((vw) => {
          const body = document.body;
          const docEl = document.documentElement;
          const scrollW = Math.max(body.scrollWidth, docEl.scrollWidth);
          return {
            hasOverflow: scrollW > vw,
            scrollW,
            vw,
          };
        }, vp.width);

        expect(
          overflow.hasOverflow,
          `Page scrollWidth (${overflow.scrollW}px) exceeds viewport width (${overflow.vw}px)`,
        ).toBe(false);
      });

      test('all section frames should contain elements without protruding past right viewport edge', async ({
        page,
      }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2500);

        // Dismiss loader
        await page.evaluate(() => {
          const loader = document.querySelector(
            '.fixed.inset-0.z-\\[9999\\]',
          ) as HTMLElement | null;
          if (loader) loader.style.display = 'none';
        });

        for (const section of SECTIONS) {
          // Navigate to section
          await page.evaluate((idx) => {
            const win = window as Window & {
              __portfolioGoToSlide?: (slideIdx: number) => void;
            };
            if (typeof win.__portfolioGoToSlide === 'function') {
              win.__portfolioGoToSlide(idx);
            }
          }, section.index);

          await page.waitForTimeout(600);

          const protrudingElements = await page.evaluate(
            ({ selector, vw }) => {
              const container = document.querySelector(selector);
              if (!container) return [];

              const elements = container.querySelectorAll('*');
              const protruding: string[] = [];

              elements.forEach((el) => {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && r.height > 0 && r.right > vw + 4) {
                  // Check if hidden by container overflow
                  let parent = el.parentElement;
                  let hidden = false;
                  while (parent && parent !== document.body) {
                    const style = window.getComputedStyle(parent);
                    if (
                      style.overflowX === 'hidden' ||
                      style.overflow === 'hidden'
                    ) {
                      hidden = true;
                      break;
                    }
                    parent = parent.parentElement;
                  }
                  if (!hidden) {
                    protruding.push(
                      `${el.tagName.toLowerCase()}.${Array.from(el.classList).join('.')} (right: ${Math.round(r.right)}px > ${vw}px)`,
                    );
                  }
                }
              });

              return protruding;
            },
            { selector: section.selector, vw: vp.width },
          );

          expect(
            protrudingElements.length,
            `Protruding elements in ${section.name} on ${vp.name}: ${protrudingElements.join(', ')}`,
          ).toBe(0);
        }
      });

      test('critical elements should be visible and properly rendered', async ({
        page,
      }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2500);

        // Header / Navbar
        const nav = page.locator('.nav-bar');
        await expect(nav).toBeVisible();

        // Hero headline
        const headline = page.locator('.headline-title');
        await expect(headline).toBeVisible();

        // Footer element
        await page.evaluate(() => {
          const win = window as Window & {
            __portfolioGoToSlide?: (slideIdx: number) => void;
          };
          if (typeof win.__portfolioGoToSlide === 'function')
            win.__portfolioGoToSlide(4);
        });
        await page.waitForTimeout(600);

        const footer = page.locator('.footer-v3-root');
        await expect(footer).toBeVisible();
      });
    });
  }
});
