
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type HealthcareOrganization = {
  id: string;
  name: string;
  type: 'Independent' | 'Regional' | 'Specialty' | 'Critical Access';
  revenue?: number;
  beds?: number;
  market?: string;
  strategic_priorities?: string[];
  current_challenges?: string[];
  created_at: string;
  updated_at: string;
};

export const useHealthcareOrganizations = () => {
  return useQuery({
    queryKey: ['healthcare-organizations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('healthcare_organizations')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as HealthcareOrganization[];
    },
  });
};

export const useCreateHealthcareOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (organization: Omit<HealthcareOrganization, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('healthcare_organizations')
        .insert([organization])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['healthcare-organizations'] });
    },
  });
};

export const useUpdateHealthcareOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<HealthcareOrganization> & { id: string }) => {
      const { data, error } = await supabase
        .from('healthcare_organizations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['healthcare-organizations'] });
    },
  });
};
