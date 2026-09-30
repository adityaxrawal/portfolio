import * as fs from 'fs';
import * as path from 'path';

import { chromium, type Page, type BrowserContext } from 'playwright';

interface FrameMeasurements {
  width: number;
  height: number;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
}

interface ViewportConfig {
  name: string;
  width: number;
  height: number;
  isLandscape?: boolean;
  category:
    | 'mobile-portrait'
    | 'mobile-landscape'
    | 'tablet-portrait'
    | 'tablet-landscape'
    | 'laptop'
    | 'desktop'
    | 'ultrawide';
}

const VIEWPORT_MATRIX: ViewportConfig[] = [
  // ── Ultra-compact / Folded ──
  {
    name: 'Galaxy-Fold-Folded',
    width: 280,
    height: 653,
    category: 'mobile-portrait',
  },
  {
    name: 'Min-Width-320',
    width: 320,
    height: 568,
    category: 'mobile-portrait',
  },
  {
    name: 'Min-Width-320-Short',
    width: 320,
    height: 480,
    category: 'mobile-portrait',
  },

  // ── Standard Mobile ──
  {
    name: 'Galaxy-S20-S23',
    width: 360,
    height: 800,
    category: 'mobile-portrait',
  },
  { name: 'iPhone-SE', width: 375, height: 667, category: 'mobile-portrait' },
  {
    name: 'iPhone-12-13-14',
    width: 390,
    height: 844,
    category: 'mobile-portrait',
  },
  { name: 'Pixel-7', width: 412, height: 915, category: 'mobile-portrait' },
  {
    name: 'iPhone-14-15-Pro-Max',
    width: 430,
    height: 932,
    category: 'mobile-portrait',
  },
  { name: 'Mobile-480', width: 480, height: 854, category: 'mobile-portrait' },
  { name: 'Mobile-540', width: 540, height: 960, category: 'mobile-portrait' },
  { name: 'Phablet-600', width: 600, height: 960, category: 'mobile-portrait' },
  {
    name: 'Phablet-640',
    width: 640,
    height: 1024,
    category: 'mobile-portrait',
  },

  // ── Mobile Landscape (Short Height - High Risk for Snap Scroll) ──
  {
    name: 'iPhone-SE-Landscape',
    width: 667,
    height: 375,
    isLandscape: true,
    category: 'mobile-landscape',
  },
  {
    name: 'Galaxy-S23-Landscape',
    width: 800,
    height: 360,
    isLandscape: true,
    category: 'mobile-landscape',
  },
  {
    name: 'iPhone-14-Pro-Landscape',
    width: 852,
    height: 393,
    isLandscape: true,
    category: 'mobile-landscape',
  },
  {
    name: 'Pixel-7-Landscape',
    width: 915,
    height: 412,
    isLandscape: true,
    category: 'mobile-landscape',
  },
  {
    name: 'Landscape-1024x600',
    width: 1024,
    height: 600,
    isLandscape: true,
    category: 'mobile-landscape',
  },

  // ── Tablets Portrait ──
  {
    name: 'iPad-Mini-Portrait',
    width: 744,
    height: 1133,
    category: 'tablet-portrait',
  },
  {
    name: 'Galaxy-Fold-Unfolded',
    width: 768,
    height: 1072,
    category: 'tablet-portrait',
  },
  {
    name: 'iPad-Standard-Portrait',
    width: 768,
    height: 1024,
    category: 'tablet-portrait',
  },
  {
    name: 'iPad-Air-Portrait',
    width: 820,
    height: 1180,
    category: 'tablet-portrait',
  },
  {
    name: 'iPad-Pro-11-Portrait',
    width: 834,
    height: 1194,
    category: 'tablet-portrait',
  },
  {
    name: 'Surface-Pro-Portrait',
    width: 912,
    height: 1368,
    category: 'tablet-portrait',
  },
  {
    name: 'iPad-Pro-12.9-Portrait',
    width: 1024,
    height: 1366,
    category: 'tablet-portrait',
  },

  // ── Tablets Landscape & Small Laptops ──
  {
    name: 'iPad-Mini-Landscape',
    width: 1133,
    height: 744,
    isLandscape: true,
    category: 'tablet-landscape',
  },
  {
    name: 'iPad-Air-Landscape',
    width: 1180,
    height: 820,
    isLandscape: true,
    category: 'tablet-landscape',
  },
  {
    name: 'iPad-Pro-11-Landscape',
    width: 1194,
    height: 834,
    isLandscape: true,
    category: 'tablet-landscape',
  },
  {
    name: 'Surface-Pro-Landscape',
    width: 1368,
    height: 912,
    isLandscape: true,
    category: 'tablet-landscape',
  },
  {
    name: 'iPad-Pro-12.9-Landscape',
    width: 1366,
    height: 1024,
    isLandscape: true,
    category: 'tablet-landscape',
  },
  { name: 'Laptop-1112', width: 1112, height: 834, category: 'laptop' },
  { name: 'Laptop-1280x800', width: 1280, height: 800, category: 'laptop' },
  { name: 'Laptop-1366x768', width: 1366, height: 768, category: 'laptop' },
  { name: 'MacBook-14-1440x900', width: 1440, height: 900, category: 'laptop' },
  { name: 'MacBook-14-1512x982', width: 1512, height: 982, category: 'laptop' },
  { name: 'Laptop-1536x864', width: 1536, height: 864, category: 'laptop' },
  {
    name: 'MacBook-16-1728x1117',
    width: 1728,
    height: 1117,
    category: 'laptop',
  },

  // ── Desktop & Large Displays ──
  {
    name: 'Desktop-1080p-1920x1080',
    width: 1920,
    height: 1080,
    category: 'desktop',
  },
  {
    name: 'Desktop-1440p-2560x1440',
    width: 2560,
    height: 1440,
    category: 'desktop',
  },
  {
    name: 'Ultrawide-3440x1440',
    width: 3440,
    height: 1440,
    category: 'ultrawide',
  },
  {
    name: '4K-Monitor-3840x2160',
    width: 3840,
    height: 2160,
    category: 'desktop',
  },
];

const SECTIONS = [
  { index: 0, id: 'hero', selector: '.hero-section-wrapper', name: 'Hero' },
  {
    index: 1,
    id: 'work',
    selector: '.work-v2-section',
    name: 'Work Experience',
  },
  { index: 2, id: 'project', selector: '.proj-v2-section', name: 'Projects' },
  { index: 3, id: 'technology', selector: '.tech-v2-section', name: 'Skills' },
  { index: 4, id: 'footer', selector: '.footer-v3-root', name: 'Footer' },
];

export interface LayoutDefect {
  id: string;
  viewport: string;
  width: number;
  height: number;
  section: string;
  type: string;
  description: string;
  screenshotFile: string;
  rootCause: string;
  severity: 'blocker' | 'major' | 'minor';
  status: 'open' | 'fixed';
}

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function auditFrame(
  page: Page,
  viewport: ViewportConfig,
  section: (typeof SECTIONS)[0],
  screenshotPath: string,
): Promise<{
  defects: LayoutDefect[];
  measurements: FrameMeasurements | null;
}> {
  const defects: LayoutDefect[] = [];

  const auditData = await page.evaluate((selector) => {
    const vw = window.innerWidth;
    const body = document.body;
    const docEl = document.documentElement;

    const issues: {
      type: string;
      desc: string;
      cause: string;
      severity: 'blocker' | 'major' | 'minor';
    }[] = [];

    // Check page horizontal overflow
    const scrollW = Math.max(body.scrollWidth, docEl.scrollWidth);
    if (scrollW > vw + 2) {
      issues.push({
        type: 'HORIZONTAL_SCROLL',
        desc: `Document scrollWidth (${scrollW}px) exceeds innerWidth (${vw}px) by ${scrollW - vw}px`,
        cause:
          'Unconstrained element width, 100vw unit, or unpadded child exceeding viewport bounds',
        severity: 'blocker',
      });
    }

    const secEl = document.querySelector(selector) as HTMLElement | null;
    if (!secEl) {
      issues.push({
        type: 'SECTION_NOT_FOUND',
        desc: `Target selector ${selector} not found in DOM`,
        cause: 'Component failed to mount or selector mismatch',
        severity: 'blocker',
      });
      return { issues, measurements: null };
    }

    const secRect = secEl.getBoundingClientRect();

    // Check elements overflowing right
    const allDescendants = secEl.querySelectorAll('*');
    const overflowingElements: string[] = [];
    allDescendants.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 4 && r.width > 0 && r.height > 0) {
        let p = el.parentElement;
        let isClipped = false;
        while (p && p !== secEl) {
          const s = window.getComputedStyle(p);
          if (s.overflowX === 'hidden' || s.overflow === 'hidden') {
            isClipped = true;
            break;
          }
          p = p.parentElement;
        }
        if (!isClipped) {
          const tag = el.tagName.toLowerCase();
          const cls =
            el.className && typeof el.className === 'string'
              ? '.' + el.className.trim().split(/\s+/)[0]
              : '';
          overflowingElements.push(
            `${tag}${cls} (${Math.round(r.right)}px > ${vw}px)`,
          );
        }
      }
    });

    if (overflowingElements.length > 0) {
      issues.push({
        type: 'ELEMENT_OVERFLOW_RIGHT',
        desc: `${overflowingElements.length} element(s) protrude past right edge: ${overflowingElements.slice(0, 3).join(', ')}`,
        cause: 'Fixed pixel widths or missing flex-wrap / overflow containment',
        severity: 'major',
      });
    }

    // Check interactive tap targets on touch/mobile
    if (vw <= 820) {
      const buttons = secEl.querySelectorAll('button, a, [role="button"]');
      let smallTapCount = 0;
      buttons.forEach((btn) => {
        const s = window.getComputedStyle(btn);
        if (
          s.display === 'none' ||
          s.visibility === 'hidden' ||
          s.opacity === '0'
        )
          return;
        const r = btn.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && (r.width < 32 || r.height < 32)) {
          smallTapCount++;
        }
      });
      if (smallTapCount > 3) {
        issues.push({
          type: 'TAP_TARGET_TOO_SMALL',
          desc: `${smallTapCount} interactive target(s) smaller than recommended 32-44px threshold`,
          cause: 'Sub-scale button or icon hit area on touch screens',
          severity: 'minor',
        });
      }
    }

    // Check text clipping
    const textEls = secEl.querySelectorAll('h1, h2, h3, p, span');
    let clippedCount = 0;
    textEls.forEach((txt) => {
      const el = txt as HTMLElement;
      if (el.offsetWidth > 0 && el.scrollWidth > el.clientWidth + 6) {
        const style = window.getComputedStyle(el);
        if (
          style.overflowX === 'hidden' &&
          style.textOverflow !== 'ellipsis' &&
          style.whiteSpace === 'nowrap'
        ) {
          clippedCount++;
        }
      }
    });
    if (clippedCount > 0) {
      issues.push({
        type: 'TEXT_CLIPPED',
        desc: `${clippedCount} text element(s) clipped horizontally with overflow hidden and no ellipsis`,
        cause: 'white-space: nowrap with fixed container width',
        severity: 'minor',
      });
    }

    const compStyle = window.getComputedStyle(secEl);
    return {
      issues,
      measurements: {
        width: Math.round(secRect.width),
        height: Math.round(secRect.height),
        paddingLeft: compStyle.paddingLeft,
        paddingRight: compStyle.paddingRight,
        paddingTop: compStyle.paddingTop,
        paddingBottom: compStyle.paddingBottom,
      },
    };
  }, section.selector);

  if (auditData?.issues) {
    auditData.issues.forEach((iss, i) => {
      defects.push({
        id: `DEF-${viewport.width}-${section.id}-${i + 1}`,
        viewport: `${viewport.name} (${viewport.width}x${viewport.height})`,
        width: viewport.width,
        height: viewport.height,
        section: section.name,
        type: iss.type,
        description: iss.desc,
        screenshotFile: path.basename(screenshotPath),
        rootCause: iss.cause,
        severity: iss.severity,
        status: 'open',
      });
    });
  }

  return { defects, measurements: auditData?.measurements };
}

async function runAudit() {
  console.log(
    '🚀 Starting Comprehensive Responsive Audit across Viewport Matrix...\n',
  );

  const baseScreenshotDir = path.join(
    process.cwd(),
    'screenshots',
    'audit-baseline',
  );
  ensureDir(baseScreenshotDir);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const allDefects: LayoutDefect[] = [];
  const consistencyData: Record<string, Record<string, FrameMeasurements>> = {};

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  // Create single context and resize page to make it super fast and prevent memory leaks
  const context: BrowserContext = await browser.newContext();
  const page = await context.newPage();

  // Load the page once
  console.log(`Loading initial page at ${baseUrl}...`);
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  // Wait for initial boot and dismiss loader
  await page.waitForTimeout(4000);

  // Ensure loader is gone
  await page.evaluate(() => {
    const loader = document.querySelector(
      '.fixed.inset-0.z-\\[9999\\]',
    ) as HTMLElement | null;
    if (loader) loader.style.display = 'none';
  });

  for (const vp of VIEWPORT_MATRIX) {
    console.log(`\n==================================================`);
    console.log(
      `📱 Auditing Viewport: ${vp.name} [${vp.width}x${vp.height}] (${vp.category})`,
    );
    console.log(`==================================================`);

    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(500);

    const vpDir = path.join(baseScreenshotDir, vp.name);
    ensureDir(vpDir);

    consistencyData[vp.name] = {};

    // Audit each snap section frame
    for (const section of SECTIONS) {
      // Use window.__portfolioGoToSlide or fallback
      await page.evaluate((idx) => {
        const win = window as Window & {
          __portfolioGoToSlide?: (slideIdx: number) => void;
        };
        if (typeof win.__portfolioGoToSlide === 'function') {
          win.__portfolioGoToSlide(idx);
        } else {
          const dots = document.querySelectorAll('.snap-dot-btn');
          if (dots && dots[idx]) {
            (dots[idx] as HTMLElement).click();
          }
        }
      }, section.index);

      // Wait for transform animation to finish
      await page.waitForTimeout(700);

      const screenshotFileName = `section-0${section.index + 1}-${section.id}.png`;
      const screenshotPath = path.join(vpDir, screenshotFileName);

      await page.screenshot({ path: screenshotPath, type: 'png' });

      const { defects, measurements } = await auditFrame(
        page,
        vp,
        section,
        screenshotPath,
      );
      allDefects.push(...defects);
      consistencyData[vp.name][section.name] = measurements;

      const statusIcon = defects.length === 0 ? '✅' : '⚠️';
      console.log(
        `  ${statusIcon} Frame ${section.index + 1} (${section.name}): ${defects.length} defect(s)`,
      );
      if (defects.length > 0) {
        defects.forEach((d) =>
          console.log(
            `     -> [${d.severity.toUpperCase()}] ${d.type}: ${d.description}`,
          ),
        );
      }
    }

    // Audit /companies page
    await page.goto(`${baseUrl}/companies`, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });
    await page.waitForTimeout(1000);
    const companiesScreenshot = path.join(vpDir, 'page-companies.png');
    await page.screenshot({ path: companiesScreenshot, type: 'png' });

    const companiesOverflow = await page.evaluate(() => {
      return (
        Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
        ) >
        window.innerWidth + 2
      );
    });
    if (companiesOverflow) {
      allDefects.push({
        id: `DEF-${vp.width}-companies-overflow`,
        viewport: `${vp.name} (${vp.width}x${vp.height})`,
        width: vp.width,
        height: vp.height,
        section: 'Companies Page',
        type: 'HORIZONTAL_SCROLL',
        description: 'Companies page body overflows viewport width',
        screenshotFile: 'page-companies.png',
        rootCause: 'Unconstrained grid or search container padding',
        severity: 'blocker',
        status: 'open',
      });
      console.log(`  ⚠️  Companies Page: Horizontal overflow detected!`);
    } else {
      console.log(`  ✅ Companies Page: OK`);
    }

    // Navigate back to home for next viewport
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(800);
  }

  // ── Verification: Browser Zoom Levels ──
  console.log(`\n==================================================`);
  console.log(`🔍 Auditing Zoom Levels on Desktop (1440x900)`);
  console.log(`==================================================`);
  await page.setViewportSize({ width: 1440, height: 900 });
  const zoomLevels = [0.8, 1.0, 1.25, 1.5, 2.0];
  for (const zoom of zoomLevels) {
    await page.evaluate((z) => {
      document.body.style.zoom = `${z * 100}%`;
    }, zoom);
    await page.waitForTimeout(500);
    const zoomOverflow = await page.evaluate(() => {
      const docEl = document.documentElement;
      return docEl.scrollWidth > docEl.clientWidth + 2;
    });
    console.log(
      `  Zoom ${(zoom * 100).toFixed(0)}%: ${zoomOverflow ? '⚠️ Overflow detected' : '✅ Clean'}`,
    );
    if (zoomOverflow) {
      allDefects.push({
        id: `DEF-zoom-${(zoom * 100).toFixed(0)}`,
        viewport: `Desktop-1440x900 @ ${(zoom * 100).toFixed(0)}% zoom`,
        width: 1440,
        height: 900,
        section: 'Global Zoom',
        type: 'ZOOM_OVERFLOW',
        description: `Page overflows horizontally when browser zoom is set to ${(zoom * 100).toFixed(0)}%`,
        screenshotFile: `zoom-${(zoom * 100).toFixed(0)}.png`,
        rootCause:
          'Fixed pixel sizing or container widths without max-width: 100%',
        severity: 'minor',
        status: 'open',
      });
    }
  }
  await page.evaluate(() => {
    document.body.style.zoom = '100%';
  });

  await browser.close();

  // Save Defect Log
  writeDefectLog(allDefects);

  // Save Consistency Matrix
  writeConsistencyMatrix(consistencyData);

  console.log(`\n🎉 Audit Complete! Total defects found: ${allDefects.length}`);
  console.log(`Defect log saved to docs/responsive-audit/01-defects.md`);
  console.log(
    `Consistency matrix saved to docs/responsive-audit/04-consistency-matrix.md`,
  );
}

function writeDefectLog(defects: LayoutDefect[]) {
  const defectDocPath = path.join(
    process.cwd(),
    'docs',
    'responsive-audit',
    '01-defects.md',
  );

  const blockers = defects.filter((d) => d.severity === 'blocker');
  const majors = defects.filter((d) => d.severity === 'major');
  const minors = defects.filter((d) => d.severity === 'minor');

  let md = `# Responsive Audit — Defect Log\n\n`;
  md += `> Generated: ${new Date().toISOString()} | Phase 1 & 2 Execution\n\n`;
  md += `## Defect Summary\n\n`;
  md += `| Severity | Count | Status |\n`;
  md += `|---|---|---|\n`;
  md += `| **Blocker** (horizontal scroll / unusable) | ${blockers.length} | Open |\n`;
  md += `| **Major** (protruding elements / broken layouts) | ${majors.length} | Open |\n`;
  md += `| **Minor** (text clip / sub-target touch) | ${minors.length} | Open |\n`;
  md += `| **Total** | **${defects.length}** | Open |\n\n`;

  md += `## Defect Details\n\n`;
  md += `| ID | Viewport | Section | Issue Type | Description | Root Cause | Severity | Status |\n`;
  md += `|---|---|---|---|---|---|---|---|\n`;

  defects.forEach((d) => {
    md += `| **${d.id}** | ${d.viewport} | ${d.section} | \`${d.type}\` | ${d.description.replace(/\|/g, '\\|')} | ${d.rootCause.replace(/\|/g, '\\|')} | **${d.severity.toUpperCase()}** | ${d.status} |\n`;
  });

  md += `\n---\n*Log auto-generated by Playwright test harness.*\n`;

  fs.writeFileSync(defectDocPath, md, 'utf-8');
}

function writeConsistencyMatrix(
  data: Record<string, Record<string, FrameMeasurements>>,
) {
  const matrixPath = path.join(
    process.cwd(),
    'docs',
    'responsive-audit',
    '04-consistency-matrix.md',
  );

  let md = `# Responsive Audit — Consistency Matrix\n\n`;
  md += `> Generated: ${new Date().toISOString()} | Phase 2.5 Consistency Verification\n\n`;
  md += `This matrix tracks horizontal gutters, vertical padding, container widths, and alignment across all frames for every viewport class.\n\n`;

  md += `| Viewport Class | Viewport | Section | Width | Height | Padding Left | Padding Right | Padding Top |\n`;
  md += `|---|---|---|---|---|---|---|---|\n`;

  for (const [vpName, sections] of Object.entries(data)) {
    for (const [secName, m] of Object.entries(sections)) {
      if (!m) continue;
      md += `| ${vpName.split('-')[0]} | ${vpName} | ${secName} | ${m.width}px | ${m.height}px | ${m.paddingLeft} | ${m.paddingRight} | ${m.paddingTop} |\n`;
    }
  }

  md += `\n## Consistency Analysis & Target Standards\n\n`;
  md += `- **Mobile (< 768px)**: Consistent 16px (1rem) or 20px (1.25rem) horizontal gutter across all frames.\n`;
  md += `- **Tablet (768px - 1024px)**: Consistent 24px (1.5rem) to 32px (2rem) horizontal padding across all frames.\n`;
  md += `- **Desktop (> 1024px)**: Consistent 40px (2.5rem) horizontal gutter, with max-width capped and centered.\n`;

  fs.writeFileSync(matrixPath, md, 'utf-8');
}

runAudit().catch(console.error);
