export const config = {
  // Target URL to screenshot (Vite runs on 3000 by default in this project)
  url: process.env.URL || 'http://localhost:3000',
  
  // Output directory for the screenshots
  outputDir: 'screenshots',

  // Device scale factor (2 for Retina/high-res)
  deviceScaleFactor: 2,

  // Viewports as specified
  viewports: [
    { name: 'Min-Width',             width: 320,  height: 568  },
    { name: 'iPhone-SE',             width: 375,  height: 667  },
    { name: 'iPhone-15-Pro',         width: 393,  height: 852  },
    { name: 'iPhone-15-Pro-Land',    width: 852,  height: 393  },
    { name: 'Galaxy-S21',            width: 360,  height: 800  },
    { name: 'iPad-mini-Portrait',    width: 744,  height: 1133 },
    { name: 'iPad-mini-Landscape',   width: 1133, height: 744  },
    { name: 'MacBook-Pro-14',        width: 1512, height: 982  },
    { name: '27-inch-Monitor',       width: 2560, height: 1440 },
    { name: '4K-Monitor',            width: 3840, height: 2160 },
  ],

  // Explicit selectors for sections. 
  // If empty, the script will attempt automatic section discovery.
  sectionSelectors: [
    '.hero-section-wrapper',
    '.work-v2-section',
    '.proj-v2-section',
    '.tech-v2-section',
    '.footer-v3-root',
  ],

  // Elements to hide to prevent them from overlapping sections in screenshots (sticky headers, etc.)
  hideSelectors: [
    '.nav-bar',
    '.snap-dot-nav',
    '.easter-egg-container',
    '.app-update-prompt'
  ],
};
