import { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

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

interface GitHubGraphQLResponse {
  data: {
    user: {
      contributionsCollection: {
        totalPullRequestContributions: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionCount: number;
              date: string;
            }[];
          }[];
        };
      };
      repositories: {
        nodes: {
          stargazerCount: number;
          isArchived: boolean;
          isTemplate: boolean;
          name: string;
          description: string;
        }[];
      };
    };
  };
}

function calculateStreak(
  weeks: Array<{ contributionDays: Array<{ contributionCount: number; date: string }> }>,
) {
  const days = weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let streak = 0;
  let activeDaysCount = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find the start of the streak
  // If today has no contributions, check yesterday
  let foundStart = false;
  
  for (const day of days) {
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);

    if (day.contributionCount > 0) {
      activeDaysCount++;
      if (!foundStart) {
        // Only start counting streak if it's today or yesterday
        const diff = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diff <= 1) {
          foundStart = true;
          streak = 1;
        }
      } else {
        streak++;
      }
    } else {
      if (foundStart) break; // End of streak
      
      // If it's not today and we haven't found a start, and it's older than yesterday, streak is 0
      const diff = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 1 && !foundStart) break;
    }
  }

  return { streak, activeDaysCount };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const fallbackData = {
    totalContributions: 0,
    totalStars: 0,
    projectsShipped: 0,
    pullRequests: 0,
    streak: 0,
    activeDaysCount: 0,
    updatedAt: new Date().toISOString(),
  };

  if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    console.error('GitHub credentials not configured');
    return res.status(200).json(fallbackData);
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
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

    const json = (await response.json()) as GitHubGraphQLResponse;

    if (!json.data || !json.data.user) {
      console.error('GitHub API error:', json);
      return res.status(200).json(fallbackData);
    }

    const { user } = json.data;
    const { contributionCalendar } = user.contributionsCollection;
    const { nodes: repos } = user.repositories;

    // Filter meaningful repos
    const meaningfulRepos = repos.filter(
      (r) => !r.isArchived && !r.isTemplate && (r.stargazerCount > 0 || (r.description && r.description.length > 20))
    );

    const totalStars = repos.reduce((acc, r) => acc + r.stargazerCount, 0);
    const { streak, activeDaysCount } = calculateStreak(contributionCalendar.weeks);

    // Set cache headers (1 hour)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    return res.status(200).json({
      totalContributions: contributionCalendar.totalContributions,
      totalStars,
      projectsShipped: meaningfulRepos.length,
      pullRequests: user.contributionsCollection.totalPullRequestContributions,
      streak,
      activeDaysCount,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return res.status(200).json(fallbackData);
  }
}
