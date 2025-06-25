
import { useMemo } from 'react';
import { useStrategicInitiatives } from './useStrategicInitiatives';

export interface QuadrantCount {
  quickWins: number;
  strategicBets: number;
  fillIns: number;
  moneyPits: number;
}

export interface UrgentInitiative {
  id: string;
  initiative_name: string;
  time_urgency: number;
  financial_impact: number;
  operational_complexity: number;
  organization_id: string | null;
  quadrant: string;
  daysOld: number;
}

export interface SIMSummaryData {
  totalInitiatives: number;
  quadrantCounts: QuadrantCount;
  urgentInitiatives: UrgentInitiative[];
  alertCount: number;
  avgPriorityScore: number;
}

const determineQuadrant = (financial_impact: number, complexity: number): string => {
  const highImpact = financial_impact >= 3.5;
  const highComplexity = complexity >= 3.5;
  
  if (highImpact && !highComplexity) return 'Quick Wins';
  if (highImpact && highComplexity) return 'Strategic Bets';
  if (!highImpact && !highComplexity) return 'Fill-ins';
  return 'Money Pits';
};

const calculatePriorityScore = (initiative: any): number => {
  return (
    initiative.financial_impact * 0.4 +
    initiative.time_urgency * 0.3 +
    initiative.competitive_disruption * 0.2 -
    initiative.operational_complexity * 0.1
  );
};

export const useSIMSummary = (): { data: SIMSummaryData | null; isLoading: boolean; error: any } => {
  const { data: initiatives, isLoading, error } = useStrategicInitiatives();

  const summaryData = useMemo(() => {
    if (!initiatives || initiatives.length === 0) return null;

    // Calculate quadrant counts
    const quadrantCounts: QuadrantCount = {
      quickWins: 0,
      strategicBets: 0,
      fillIns: 0,
      moneyPits: 0
    };

    // Process initiatives
    const processedInitiatives = initiatives.map(initiative => {
      const quadrant = determineQuadrant(initiative.financial_impact, initiative.operational_complexity);
      const priorityScore = calculatePriorityScore(initiative);
      const daysOld = Math.floor((Date.now() - new Date(initiative.created_at).getTime()) / (1000 * 60 * 60 * 24));

      // Count by quadrant
      switch (quadrant) {
        case 'Quick Wins':
          quadrantCounts.quickWins++;
          break;
        case 'Strategic Bets':
          quadrantCounts.strategicBets++;
          break;
        case 'Fill-ins':
          quadrantCounts.fillIns++;
          break;
        case 'Money Pits':
          quadrantCounts.moneyPits++;
          break;
      }

      return {
        ...initiative,
        quadrant,
        priorityScore,
        daysOld
      };
    });

    // Get top 3 most urgent initiatives (high urgency + high impact)
    const urgentInitiatives: UrgentInitiative[] = processedInitiatives
      .filter(init => init.time_urgency >= 4 || init.financial_impact >= 4)
      .sort((a, b) => (b.time_urgency + b.financial_impact) - (a.time_urgency + a.financial_impact))
      .slice(0, 3)
      .map(init => ({
        id: init.id,
        initiative_name: init.initiative_name,
        time_urgency: init.time_urgency,
        financial_impact: init.financial_impact,
        operational_complexity: init.operational_complexity,
        organization_id: init.organization_id,
        quadrant: init.quadrant,
        daysOld: init.daysOld
      }));

    // Calculate alerts (high urgency + no recent progress + money pits)
    const alertCount = processedInitiatives.filter(init => 
      init.time_urgency >= 4 && init.daysOld > 30 ||
      init.quadrant === 'Money Pits' && init.daysOld > 14
    ).length;

    // Calculate average priority score
    const avgPriorityScore = processedInitiatives.reduce((sum, init) => sum + init.priorityScore, 0) / processedInitiatives.length;

    return {
      totalInitiatives: initiatives.length,
      quadrantCounts,
      urgentInitiatives,
      alertCount,
      avgPriorityScore: parseFloat(avgPriorityScore.toFixed(1))
    };
  }, [initiatives]);

  return {
    data: summaryData,
    isLoading,
    error
  };
};
