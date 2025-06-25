
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TooltipProvider, Tooltip as UITooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Loader2 } from 'lucide-react';
import { useStrategicInitiatives } from '@/hooks/useStrategicInitiatives';

const getDisruptionColor = (disruption: number) => {
  if (disruption <= 2) return '#22c55e'; // green - low
  if (disruption <= 3) return '#eab308'; // yellow - medium
  return '#ef4444'; // red - high
};

const getDisruptionLevel = (disruption: number) => {
  if (disruption <= 2) return 'low';
  if (disruption <= 3) return 'medium';
  return 'high';
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg min-w-64">
        <h3 className="font-semibold text-gray-900 mb-2">{data.initiative_name}</h3>
        <p className="text-sm text-gray-600 mb-3">{data.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Financial Impact:</span>
            <span className="ml-1">{data.financial_impact}/5</span>
          </div>
          <div>
            <span className="font-medium">Complexity:</span>
            <span className="ml-1">{data.operational_complexity}/5</span>
          </div>
          <div>
            <span className="font-medium">Urgency:</span>
            <span className="ml-1">{data.time_urgency}/5</span>
          </div>
          <div>
            <span className="font-medium">Disruption:</span>
            <span className="ml-1 capitalize">{getDisruptionLevel(data.competitive_disruption)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const StrategicImpactMatrix = () => {
  const { data: initiatives, isLoading, error } = useStrategicInitiatives();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Strategic Impact Matrix (SIM)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading strategic initiatives...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Strategic Impact Matrix (SIM)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-red-600">Error loading initiatives: {error.message}</div>
        </CardContent>
      </Card>
    );
  }

  if (!initiatives || initiatives.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Strategic Impact Matrix (SIM)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-gray-600">No strategic initiatives found</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Strategic Impact Matrix (SIM)
            </CardTitle>
            <UITooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-xs">
                  <p className="font-medium mb-2">Strategic Impact Matrix</p>
                  <p className="text-sm">Plots initiatives by financial impact vs operational complexity. 
                  Dot size indicates urgency, color shows competitive disruption level.</p>
                </div>
              </TooltipContent>
            </UITooltip>
          </div>
          <p className="text-sm text-gray-600">
            Evaluate strategic initiatives across key dimensions to prioritize investments ({initiatives.length} initiatives)
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-96 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  type="number" 
                  dataKey="financial_impact" 
                  domain={[0.5, 5.5]}
                  tick={{ fontSize: 12 }}
                  tickCount={6}
                  label={{ 
                    value: 'Financial Impact →', 
                    position: 'insideBottom', 
                    offset: -40,
                    style: { textAnchor: 'middle', fontSize: '14px', fontWeight: 500 }
                  }}
                />
                <YAxis 
                  type="number" 
                  dataKey="operational_complexity" 
                  domain={[0.5, 5.5]}
                  tick={{ fontSize: 12 }}
                  tickCount={6}
                  label={{ 
                    value: 'Operational Complexity →', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fontSize: '14px', fontWeight: 500 }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter data={initiatives}>
                  {initiatives.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getDisruptionColor(entry.competitive_disruption)}
                      r={4 + (entry.time_urgency * 3)} // Size based on urgency (4-19px radius)
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Legend & Scoring Guide</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Competitive Disruption Legend */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Competitive Disruption</h5>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Low (1-2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Medium (3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">High (4-5)</span>
                  </div>
                </div>
              </div>

              {/* Dot Size Legend */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Time Urgency</h5>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Low (1-2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Medium (3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm">High (4-5)</span>
                  </div>
                </div>
              </div>

              {/* Financial Impact Scale */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Financial Impact</h5>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>1: Minimal (&lt;$100K)</div>
                  <div>2: Low ($100K-$500K)</div>
                  <div>3: Moderate ($500K-$1M)</div>
                  <div>4: High ($1M-$5M)</div>
                  <div>5: Very High (&gt;$5M)</div>
                </div>
              </div>

              {/* Operational Complexity Scale */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Operational Complexity</h5>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>1: Simple (1-3 months)</div>
                  <div>2: Easy (3-6 months)</div>
                  <div>3: Moderate (6-12 months)</div>
                  <div>4: Complex (12-24 months)</div>
                  <div>5: Very Complex (&gt;24 months)</div>
                </div>
              </div>
            </div>

            {/* Strategic Quadrants */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Strategic Quadrants</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-700">Quick Wins:</span>
                  <span className="text-gray-600"> High Impact, Low Complexity</span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Strategic Bets:</span>
                  <span className="text-gray-600"> High Impact, High Complexity</span>
                </div>
                <div>
                  <span className="font-medium text-yellow-700">Fill-ins:</span>
                  <span className="text-gray-600"> Low Impact, Low Complexity</span>
                </div>
                <div>
                  <span className="font-medium text-red-700">Money Pits:</span>
                  <span className="text-gray-600"> Low Impact, High Complexity</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
