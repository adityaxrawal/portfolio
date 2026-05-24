export interface GitHubRepo {
  id: string;
  name: string;
  description: string | null;
  stargazerCount: number;
  isArchived: boolean;
  isFork: boolean;
  isTemplate: boolean;
  primaryLanguage: {
    name: string;
  } | null;
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface GitHubStatsResponse {
  totalContributions: number;
  totalStars: number;
  projectsShipped: number;
  pullRequests: number;
  updatedAt: string;
}

export interface GitHubStats {
  commits: number;
  issues: number;
  pullRequests: number;
  linesOfCode: number;
}

export interface GitHubContributorStats {
  total: number;
  weeks: Array<{
    w: number;
    a: number;
    d: number;
    c: number;
  }>;
  author: {
    login: string;
    id: number;
  };
}
