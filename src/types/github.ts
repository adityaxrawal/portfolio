export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
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
