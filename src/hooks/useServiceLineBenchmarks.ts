
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ServiceLineBenchmark, ServiceLineBenchmarkInsert, ServiceLineBenchmarkUpdate } from '@/types/healthcare';

export const useServiceLineBenchmarks = () => {
  return useQuery({
    queryKey: ['service-line-benchmarks'],
    queryFn: async (): Promise<ServiceLineBenchmark[]> => {
      const { data, error } = await supabase
        .from('service_line_benchmarks')
        .select('*')
        .order('service_line', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useServiceLineBenchmarksByType = (organizationType: string) => {
  return useQuery({
    queryKey: ['service-line-benchmarks', organizationType],
    queryFn: async (): Promise<ServiceLineBenchmark[]> => {
      const { data, error } = await supabase
        .from('service_line_benchmarks')
        .select('*')
        .eq('organization_type', organizationType)
        .order('service_line', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useCreateServiceLineBenchmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (benchmark: ServiceLineBenchmarkInsert): Promise<ServiceLineBenchmark> => {
      const { data, error } = await supabase
        .from('service_line_benchmarks')
        .insert(benchmark)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-line-benchmarks'] });
    },
  });
};

export const useUpdateServiceLineBenchmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ServiceLineBenchmarkUpdate }): Promise<ServiceLineBenchmark> => {
      const { data, error } = await supabase
        .from('service_line_benchmarks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-line-benchmarks'] });
    },
  });
};
