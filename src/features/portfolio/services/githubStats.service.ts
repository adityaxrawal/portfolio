import type { GitHubStatsResponse } from '../types/github.types';

import { parseJsonResponse } from '@/types';

const GITHUB_STATS_ENDPOINT = '/api/github-stats';

export async function fetchGitHubStats(): Promise<{
  data: GitHubStatsResponse | null;
  error: string | null;
}> {
  try {
    const response = await fetch(GITHUB_STATS_ENDPOINT);
    const result = await parseJsonResponse<GitHubStatsResponse>(response);

    if (!result.ok) {
      return { data: null, error: result.error };
    }

    return { data: result.data, error: null };
  } catch {
    return { data: null, error: 'Failed to fetch GitHub metrics' };
  }
}
