import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/api';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000 // 30 minutes
  });
};
