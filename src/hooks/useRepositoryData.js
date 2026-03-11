import { useState } from 'react';
import { fetchGitHubRepo } from '../utils/fetchGitHubRepo';

export function useRepositoryData(repoPath) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData(path) {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const repoData = await fetchGitHubRepo(path);
      setData(repoData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, getData };
}