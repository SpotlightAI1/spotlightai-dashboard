
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

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

  return useQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onError: (error: Error) => {
      console.error(`Query error for ${queryKey.join('-')}:`, error);
      if (showErrorToast) {
        toast({
          title: "Error",
          description: error.message || errorMessage,
          variant: "destructive",
        });
      }
    },
    ...options,
  });
};
