import { loadEnv } from 'vite';

const GITHUB_STATS_QUERY = `
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

function buildStatsPayload(user) {
  const { contributionCalendar } = user.contributionsCollection;
  const { nodes: repos } = user.repositories;

  const meaningfulRepos = repos.filter(
    (r) =>
      !r.isArchived &&
      !r.isTemplate &&
      (r.stargazerCount > 0 || (r.description && r.description.length > 20)),
  );

  const totalStars = repos.reduce((acc, r) => acc + r.stargazerCount, 0);

  const days = contributionCalendar.weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let streak = 0;
  let foundStart = false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const day of days) {
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);
    if (day.contributionCount > 0) {
      if (!foundStart) {
        const diff = Math.floor(
          (today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (diff <= 1) {
          foundStart = true;
          streak = 1;
        }
      } else {
        streak++;
      }
    } else if (
      foundStart ||
      Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24)) >
        1
    ) {
      break;
    }
  }

  return {
    totalContributions: contributionCalendar.totalContributions,
    totalStars,
    projectsShipped: meaningfulRepos.length,
    pullRequests: user.contributionsCollection.totalPullRequestContributions,
    updatedAt: new Date().toISOString(),
  };
}

export function createGitHubStatsDevMiddleware(mode) {
  return async (req, res, next) => {
    if (
      !req.url ||
      (req.url !== '/api/github-stats' &&
        !req.url.startsWith('/api/github-stats?'))
    ) {
      next();
      return;
    }

    const env = loadEnv(mode, process.cwd(), '');
    const GITHUB_TOKEN = env.GITHUB_TOKEN;
    const GITHUB_USERNAME = env.GITHUB_USERNAME;

    if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: 'GitHub credentials not configured in .env',
        }),
      );
      return;
    }

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GITHUB_STATS_QUERY,
          variables: { username: GITHUB_USERNAME },
        }),
      });

      const json = await response.json();
      if (!json.data || !json.data.user) {
        res.statusCode = 502;
        res.end(JSON.stringify({ error: 'Failed to fetch from GitHub' }));
        return;
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(buildStatsPayload(json.data.user)));
    } catch {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  };
}
