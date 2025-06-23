
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StrategicInsight, StrategicInsightInsert, StrategicInsightUpdate } from '@/types/healthcare';

export const useStrategicInsights = () => {
  return useQuery({
    queryKey: ['strategic-insights'],
    queryFn: async (): Promise<StrategicInsight[]> => {
      const { data, error } = await supabase
        .from('strategic_insights')
        .select('*')
        .order('generated_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useStrategicInsightsByOrganization = (organizationId: string) => {
  return useQuery({
    queryKey: ['strategic-insights', organizationId],
    queryFn: async (): Promise<StrategicInsight[]> => {
      const { data, error } = await supabase
        .from('strategic_insights')
        .select('*')
        .eq('organization_id', organizationId)
        .order('generated_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useStrategicInsightsByType = (insightType: string) => {
  return useQuery({
    queryKey: ['strategic-insights', 'type', insightType],
    queryFn: async (): Promise<StrategicInsight[]> => {
      const { data, error } = await supabase
        .from('strategic_insights')
        .select('*')
        .eq('insight_type', insightType)
        .order('generated_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useCreateStrategicInsight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (insight: StrategicInsightInsert): Promise<StrategicInsight> => {
      const { data, error } = await supabase
        .from('strategic_insights')
        .insert(insight)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategic-insights'] });
    },
  });
};

export const useUpdateStrategicInsight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: StrategicInsightUpdate }): Promise<StrategicInsight> => {
      const { data, error } = await supabase
        .from('strategic_insights')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategic-insights'] });
    },
  });
};
