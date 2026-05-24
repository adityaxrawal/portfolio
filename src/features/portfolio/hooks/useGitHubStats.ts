import { useCallback, useEffect, useState } from 'react';

import { fetchGitHubStats } from '../services/githubStats.service';
import type { GitHubStatsResponse } from '../types/github.types';

export interface UseGitHubStatsOptions {
  /** When true, surfaces fetch errors as a user-facing message (GithubMetrics). */
  reportError?: boolean;
}

export function useGitHubStats(options: UseGitHubStatsOptions = {}) {
  const { reportError = false } = options;
  const [stats, setStats] = useState<GitHubStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await fetchGitHubStats();

    if (fetchError) {
      console.error('GitHub Metrics Error:', fetchError);
      if (reportError) {
        setError('Metrics temporarily unavailable');
      }
      setStats(null);
    } else {
      setStats(data);
    }

    setLoading(false);
  }, [reportError]);

  useEffect(() => {
    void load();
  }, [load]);

  return { stats, loading, error, refetch: load };
}
