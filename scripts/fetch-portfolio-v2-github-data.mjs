import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'adityaxrawal';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional but recommended

const REPOSITORIES = [
  'financial-tracker',
  'trade-simulator',
  'realtime-market-events',
  'credit-cards-dashboard',
  'delta-exchange-dashboard',
  'macos-battery-monitor',
  'macos-antigravity-quota-monitor',
  'user-management',
  'stock-data-filtering',
  'ecommerce-app',
];

const headers = {
  Accept: 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
};

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, { headers });
    if (res.status === 202) {
      // GitHub is calculating stats, wait and retry
      console.log(`[GitHub API] 202 Accepted for ${url}. Retrying in 2s...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      continue;
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries.`);
}

function extractLast12WeeksSparkline(commitActivity) {
  if (!commitActivity || !Array.isArray(commitActivity)) return Array(12).fill(0);
  
  // GitHub returns 52 weeks of data. We want the last 12 weeks.
  const last12Weeks = commitActivity.slice(-12);
  return last12Weeks.map(week => week.total);
}

async function fetchRepoData(repoName) {
  console.log(`[GitHub API] Fetching data for ${repoName}...`);
  let repoInfo = null;
  let commitActivity = null;

  try {
    repoInfo = await fetchWithRetry(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
  } catch (error) {
    console.warn(`[Warning] Could not fetch repo info for ${repoName}:`, error.message);
  }

  try {
    commitActivity = await fetchWithRetry(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/stats/commit_activity`);
  } catch (error) {
    console.warn(`[Warning] Could not fetch commit activity for ${repoName}:`, error.message);
  }

  if (!repoInfo) {
    return null; // Repo probably doesn't exist
  }

  return {
    id: repoName,
    stars: repoInfo.stargazers_count,
    forks: repoInfo.forks_count,
    updatedAt: repoInfo.updated_at,
    sparklineData: extractLast12WeeksSparkline(commitActivity),
  };
}

async function fetchRecentCommits() {
  console.log(`[GitHub API] Fetching recent public events for ${GITHUB_USERNAME}...`);
  try {
    const events = await fetchWithRetry(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
    
    // Filter PushEvents to get commits
    const pushEvents = events.filter(e => e.type === 'PushEvent' && REPOSITORIES.includes(e.repo.name.split('/')[1]));
    
    const recentCommits = [];
    for (const event of pushEvents) {
      if (recentCommits.length >= 3) break;
      
      const repoName = event.repo.name.split('/')[1];
      const commits = event.payload.commits || [];
      
      for (const commit of commits) {
        if (recentCommits.length >= 3) break;
        recentCommits.push({
          repo: repoName,
          repoLabel: repoName,
          message: commit.message.split('\n')[0], // First line of commit message
          time: event.created_at,
          color: '', // Will be mapped on the frontend
        });
      }
    }
    
    return recentCommits;
  } catch (error) {
    console.error(`[Error] Could not fetch recent commits:`, error.message);
    return [];
  }
}

async function main() {
  console.log('Starting GitHub Data Fetch...');
  
  const results = await Promise.all(REPOSITORIES.map(repo => fetchRepoData(repo)));
  
  const repoDataMap = {};
  let totalStars = 0;
  let totalForks = 0;
  
  results.forEach(data => {
    if (data) {
      repoDataMap[data.id] = data;
      totalStars += data.stars || 0;
      totalForks += data.forks || 0;
    }
  });
  
  const recentCommits = await fetchRecentCommits();
  
  const outputData = {
    repositories: repoDataMap,
    impact: {
      totalStars,
      totalForks,
    },
    commits: recentCommits,
    lastUpdated: new Date().toISOString()
  };
  
  const outputPath = path.join(__dirname, '..', 'src', 'features', 'portfolio', 'data', 'github-v2-data.json');
  
  // Ensure directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
  console.log(`Successfully wrote GitHub data to ${outputPath}`);
}

main().catch(console.error);
