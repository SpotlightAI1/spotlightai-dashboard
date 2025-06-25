
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export interface OptimizedQueryOptions<T> extends Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  showErrorToast?: boolean;
  errorMessage?: string;
}

export const useOptimizedQuery = <T>({
  queryKey,
  queryFn,
  showErrorToast = true,
  errorMessage = 'Failed to load data',
  ...options
}: OptimizedQueryOptions<T>) => {
  const { toast } = useToast();

  const query = useQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });

  // Handle errors using useEffect instead of onError callback
  useEffect(() => {
    if (query.error && showErrorToast) {
      console.error(`Query error for ${queryKey.join('-')}:`, query.error);
      toast({
        title: "Error",
        description: query.error.message || errorMessage,
        variant: "destructive",
      });
    }
  }, [query.error, showErrorToast, errorMessage, queryKey, toast]);

  return query;
};
