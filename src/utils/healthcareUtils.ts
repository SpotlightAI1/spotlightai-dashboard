
import { ServiceLineBenchmark, StrategicInsight, OrganizationType, MarketPosition } from '@/types/healthcare';

/**
 * Calculate performance score based on benchmark comparison
 */
export const calculatePerformanceScore = (
  actualRevenue: number,
  benchmarkRevenue: number
): number => {
  if (benchmarkRevenue === 0) return 0;
  return Math.round(((actualRevenue / benchmarkRevenue) * 100));
};

/**
 * Determine market position based on performance score
 */
export const getMarketPosition = (performanceScore: number): MarketPosition => {
  if (performanceScore >= 120) return 'Leader';
  if (performanceScore >= 100) return 'Challenger';
  if (performanceScore >= 80) return 'Follower';
  return 'Niche';
};

/**
 * Format confidence score as percentage
 */
export const formatConfidenceScore = (score: number | null): string => {
  if (score === null) return 'N/A';
  return `${Math.round(score * 100)}%`;
};

/**
 * Get color class for performance indicators
 */
export const getPerformanceColor = (performanceScore: number): string => {
  if (performanceScore >= 120) return 'text-green-600';
  if (performanceScore >= 100) return 'text-blue-600';
  if (performanceScore >= 80) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * Filter benchmarks by organization type and region
 */
export const filterBenchmarks = (
  benchmarks: ServiceLineBenchmark[],
  organizationType?: string,
  region?: string
): ServiceLineBenchmark[] => {
  return benchmarks.filter(benchmark => {
    const typeMatch = !organizationType || benchmark.organization_type === organizationType;
    const regionMatch = !region || benchmark.region === region;
    return typeMatch && regionMatch;
  });
};

/**
 * Get high-confidence insights
 */
export const getHighConfidenceInsights = (
  insights: StrategicInsight[],
  threshold: number = 0.8
): StrategicInsight[] => {
  return insights.filter(insight => 
    insight.confidence_score !== null && insight.confidence_score >= threshold
  );
};

/**
 * Group insights by type
 */
export const groupInsightsByType = (insights: StrategicInsight[]): Record<string, StrategicInsight[]> => {
  return insights.reduce((acc, insight) => {
    if (!acc[insight.insight_type]) {
      acc[insight.insight_type] = [];
    }
    acc[insight.insight_type].push(insight);
    return acc;
  }, {} as Record<string, StrategicInsight[]>);
};
