
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Clock, 
  BarChart3,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useSIMSummary } from '@/hooks/useSIMSummary';
import { Link } from 'react-router-dom';

const getQuadrantColor = (quadrant: string) => {
  switch (quadrant) {
    case 'Quick Wins': return 'bg-green-100 text-green-800 border-green-200';
    case 'Strategic Bets': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Fill-ins': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Money Pits': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getUrgencyLevel = (urgency: number) => {
  if (urgency >= 4) return 'High';
  if (urgency >= 3) return 'Medium';
  return 'Low';
};

const getUrgencyColor = (urgency: number) => {
  if (urgency >= 4) return 'text-red-600';
  if (urgency >= 3) return 'text-yellow-600';
  return 'text-green-600';
};

export const SIMSummaryWidget = () => {
  const { data, isLoading, error } = useSIMSummary();

  if (isLoading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Strategic Impact Matrix Portfolio Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading portfolio summary...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Strategic Impact Matrix Portfolio Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-gray-500">
            {error ? 'Error loading portfolio data' : 'No initiative data available'}
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalQuadrantInitiatives = data.quadrantCounts.quickWins + 
    data.quadrantCounts.strategicBets + 
    data.quadrantCounts.fillIns + 
    data.quadrantCounts.moneyPits;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Strategic Impact Matrix Portfolio Summary
          </CardTitle>
          <div className="flex items-center gap-2">
            {data.alertCount > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {data.alertCount} Alert{data.alertCount !== 1 ? 's' : ''}
              </Badge>
            )}
            <Link to="/organizations">
              <Button variant="outline" size="sm">
                View All Organizations
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Total Initiatives</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{data.totalInitiatives}</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Avg Priority Score</span>
            </div>
            <div className="text-2xl font-bold text-green-900">{data.avgPriorityScore}</div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-900">High Urgency</span>
            </div>
            <div className="text-2xl font-bold text-yellow-900">{data.urgentInitiatives.length}</div>
          </div>
          
          <div className={`p-4 rounded-lg ${data.alertCount > 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`h-4 w-4 ${data.alertCount > 0 ? 'text-red-600' : 'text-gray-600'}`} />
              <span className={`text-sm font-medium ${data.alertCount > 0 ? 'text-red-900' : 'text-gray-900'}`}>
                Alerts
              </span>
            </div>
            <div className={`text-2xl font-bold ${data.alertCount > 0 ? 'text-red-900' : 'text-gray-900'}`}>
              {data.alertCount}
            </div>
          </div>
        </div>

        {/* Quadrant Distribution */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Initiative Distribution by Quadrant</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">Quick Wins</span>
                <span className="text-sm text-gray-600">{data.quadrantCounts.quickWins}</span>
              </div>
              <Progress 
                value={totalQuadrantInitiatives > 0 ? (data.quadrantCounts.quickWins / totalQuadrantInitiatives) * 100 : 0} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">Strategic Bets</span>
                <span className="text-sm text-gray-600">{data.quadrantCounts.strategicBets}</span>
              </div>
              <Progress 
                value={totalQuadrantInitiatives > 0 ? (data.quadrantCounts.strategicBets / totalQuadrantInitiatives) * 100 : 0} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-700">Fill-ins</span>
                <span className="text-sm text-gray-600">{data.quadrantCounts.fillIns}</span>
              </div>
              <Progress 
                value={totalQuadrantInitiatives > 0 ? (data.quadrantCounts.fillIns / totalQuadrantInitiatives) * 100 : 0} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-700">Money Pits</span>
                <span className="text-sm text-gray-600">{data.quadrantCounts.moneyPits}</span>
              </div>
              <Progress 
                value={totalQuadrantInitiatives > 0 ? (data.quadrantCounts.moneyPits / totalQuadrantInitiatives) * 100 : 0} 
                className="h-2"
              />
            </div>
          </div>
        </div>

        {/* Top Urgent Initiatives */}
        {data.urgentInitiatives.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Top 3 Most Urgent Initiatives</h4>
            <div className="space-y-2">
              {data.urgentInitiatives.map((initiative, index) => (
                <div key={initiative.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full text-xs font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{initiative.initiative_name}</div>
                      <div className="text-xs text-gray-600">
                        Created {initiative.daysOld} days ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getQuadrantColor(initiative.quadrant)} variant="outline">
                      {initiative.quadrant}
                    </Badge>
                    <div className={`text-sm font-medium ${getUrgencyColor(initiative.time_urgency)}`}>
                      {getUrgencyLevel(initiative.time_urgency)} Urgency
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio Health Indicators */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Portfolio Health Insights</h4>
          <div className="space-y-1 text-sm text-blue-800">
            <div>• {((data.quadrantCounts.quickWins / totalQuadrantInitiatives) * 100).toFixed(0)}% of initiatives are Quick Wins</div>
            <div>• {((data.quadrantCounts.moneyPits / totalQuadrantInitiatives) * 100).toFixed(0)}% are in Money Pits quadrant</div>
            {data.avgPriorityScore >= 3.5 ? (
              <div>• Portfolio shows strong strategic alignment</div>
            ) : (
              <div>• Consider reviewing low-priority initiatives</div>
            )}
            {data.alertCount > 0 && (
              <div className="text-red-700">• {data.alertCount} initiative{data.alertCount !== 1 ? 's' : ''} require immediate attention</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
