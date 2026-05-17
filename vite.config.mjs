import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// Import GitHub logic for the dev server proxy
// We'll define it inside the config or import it if we had a shared utility

export default defineConfig({
  assetsInclude: ['**/*.glb'],
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      template: 'treemap',
    }),
    // Custom plugin to handle /api/github-stats during local development
    {
      name: 'github-stats-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && (req.url === '/api/github-stats' || req.url.startsWith('/api/github-stats?'))) {
            const env = loadEnv(server.config.mode, process.cwd(), '');
            const GITHUB_TOKEN = env.GITHUB_TOKEN;
            const GITHUB_USERNAME = env.GITHUB_USERNAME;

            if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'GitHub credentials not configured in .env' }));
              return;
            }

            try {
              const QUERY = `
                query($username: String!) {
                  user(login: $username) {
                    contributionsCollection {
                      totalPullRequestContributions
                      contributionCalendar {
                        totalContributions
                        weeks {
                          contributionDays {
                            contributionCount
                            date
                          }
                        }
                      }
                    }
                    repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
                      nodes {
                        stargazerCount
                        isArchived
                        isTemplate
                        name
                        description
                      }
                    }
                  }
                }
              `;

              const response = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${GITHUB_TOKEN}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  query: QUERY,
                  variables: { username: GITHUB_USERNAME },
                }),
              });

              const json = await response.json();
              if (!json.data || !json.data.user) {
                res.statusCode = 502;
                res.end(JSON.stringify({ error: 'Failed to fetch from GitHub' }));
                return;
              }

              const { user } = json.data;
              const { contributionCalendar } = user.contributionsCollection;
              const { nodes: repos } = user.repositories;

              const meaningfulRepos = repos.filter(
                (r) => !r.isArchived && !r.isTemplate && (r.stargazerCount > 0 || (r.description && r.description.length > 20))
              );

              const totalStars = repos.reduce((acc, r) => acc + r.stargazerCount, 0);

              // Simple streak calculation for dev server
              const days = contributionCalendar.weeks
                .flatMap((w) => w.contributionDays)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

              let streak = 0;
              let activeDaysCount = 0;
              let foundStart = false;
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              for (const day of days) {
                const dayDate = new Date(day.date);
                dayDate.setHours(0, 0, 0, 0);
                if (day.contributionCount > 0) {
                  activeDaysCount++;
                  if (!foundStart) {
                    const diff = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
                    if (diff <= 1) { foundStart = true; streak = 1; }
                  } else { streak++; }
                } else if (foundStart || Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24)) > 1) {
                  break;
                }
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                totalContributions: contributionCalendar.totalContributions,
                totalStars,
                projectsShipped: meaningfulRepos.length,
                pullRequests: user.contributionsCollection.totalPullRequestContributions,
                updatedAt: new Date().toISOString(),
              }));
            } catch (error) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Internal server error' }));
            }
            return;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    tsconfigPaths: true,
    extensions: ['.jsx', '.js', '.ts', '.tsx', '.json'],
  },
  server: {
    open: true,
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-core';
            if (id.includes('three') || id.includes('@react-three') || id.includes('@dimforge/rapier')) {
              return '3d-engine';
            }
            if (
              id.includes('gsap') ||
              id.includes('lenis') ||
              id.includes('tinycolor2')
            ) {
              return 'libs';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
