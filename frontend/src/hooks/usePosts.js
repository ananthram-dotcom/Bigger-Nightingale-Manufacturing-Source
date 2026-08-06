import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../services/api';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 10 * 60 * 1000,
    cacheTime: 30 * 60 * 1000
  });
};
