
import { useState, useEffect } from 'react';
import { useStrategicInitiatives } from './useStrategicInitiatives';
import { generateSIMAnalysis, type SIMAnalysisResult, type OrganizationProfile, type ScoredInitiative } from '@/utils/simAnalysis';

export const useSIMAnalysis = (organizationId?: string) => {
  const { data: initiatives, isLoading: initiativesLoading } = useStrategicInitiatives();
  const [analysis, setAnalysis] = useState<SIMAnalysisResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAnalysis = async (organization: OrganizationProfile) => {
    try {
      setIsGenerating(true);
      setError(null);
      
      console.log('Starting SIM analysis generation...');
      
      // Convert strategic initiatives to scored initiatives format
      const existingInitiatives: ScoredInitiative[] = initiatives
        ?.filter(initiative => !organizationId || initiative.organization_id === organizationId)
        ?.map(initiative => ({
          initiative_name: initiative.initiative_name,
          financial_impact: initiative.financial_impact,
          operational_complexity: initiative.operational_complexity,
          competitive_disruption: initiative.competitive_disruption,
          time_urgency: initiative.time_urgency,
          description: initiative.description || '',
          priority_score: 0,
          quadrant: 'Fill-ins' as const,
          auto_generated: false
        })) || [];
      
      console.log('Existing initiatives:', existingInitiatives.length);
      
      const result = generateSIMAnalysis(organization, existingInitiatives);
      setAnalysis(result);
      
      console.log('SIM analysis completed:', result);
    } catch (err) {
      console.error('Error generating SIM analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate analysis');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    analysis,
    generateAnalysis,
    isGenerating,
    isLoading: initiativesLoading,
    error
  };
};
