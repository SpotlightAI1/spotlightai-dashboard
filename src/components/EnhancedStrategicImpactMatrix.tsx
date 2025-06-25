import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TooltipProvider, Tooltip as UITooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, Loader2, Filter, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useStrategicInitiatives } from '@/hooks/useStrategicInitiatives';
import { InitiativeModal } from './InitiativeModal';
import { SIMExporter } from './SIMExporter';
import { QuadrantMoverModal } from './QuadrantMoverModal';

const getDisruptionColor = (disruption: number) => {
  if (disruption <= 2) return '#22c55e';
  if (disruption <= 3) return '#eab308';
  return '#ef4444';
};

const getDisruptionLevel = (disruption: number) => {
  if (disruption <= 2) return 'low';
  if (disruption <= 3) return 'medium';
  return 'high';
};

const getQuadrant = (financial: number, complexity: number) => {
  if (financial >= 3.5 && complexity < 3.5) return 'Quick Wins';
  if (financial >= 3.5 && complexity >= 3.5) return 'Strategic Bets';
  if (financial < 3.5 && complexity < 3.5) return 'Fill-ins';
  return 'Money Pits';
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const quadrant = getQuadrant(data.financial_impact, data.operational_complexity);
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg min-w-64">
        <h3 className="font-semibold text-gray-900 mb-2">{data.initiative_name}</h3>
        <p className="text-sm text-gray-600 mb-3">{data.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
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
        <div className="text-xs text-gray-500 border-t pt-2">
          <span className="font-medium">Quadrant:</span> {quadrant}
        </div>
      </div>
    );
  }
  return null;
};

interface EnhancedStrategicImpactMatrixProps {
  organizationId?: string;
  organizationName?: string;
}

export const EnhancedStrategicImpactMatrix = ({ 
  organizationId, 
  organizationName = 'Organization' 
}: EnhancedStrategicImpactMatrixProps) => {
  const { data: allInitiatives, isLoading, error, refetch } = useStrategicInitiatives();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInitiative, setSelectedInitiative] = useState<any>(null);
  const [targetQuadrant, setTargetQuadrant] = useState<string>('');
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Filter initiatives by organization if provided
  const initiatives = organizationId 
    ? allInitiatives?.filter(initiative => initiative.organization_id === organizationId) || []
    : allInitiatives || [];

  const handleQuadrantMove = (initiative: any, quadrant: string) => {
    const currentQuadrant = getQuadrant(initiative.financial_impact, initiative.operational_complexity);
    setSelectedInitiative({
      ...initiative,
      currentQuadrant
    });
    setTargetQuadrant(quadrant);
    setMoveModalOpen(true);
  };

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

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <SIMExporter chartRef={chartRef} organizationName={organizationName} />
              <InitiativeModal organizationId={organizationId} onInitiativeAdded={refetch} />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Evaluate strategic initiatives across key dimensions to prioritize investments ({initiatives.length} initiatives)
          </p>
        </CardHeader>
        
        <CardContent>
          <div ref={chartRef} className="bg-white">
            <div className="h-96 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  
                  {/* Quadrant dividers */}
                  <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5,5" />
                  <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5,5" />
                  
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
                        r={4 + (entry.time_urgency * 3)}
                        onClick={() => console.log('Clicked initiative:', entry)}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Quadrant Labels */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="relative h-96">
                <div className="absolute top-4 right-4 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded">
                  Quick Wins
                </div>
                <div className="absolute top-4 left-4 text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">
                  Strategic Bets
                </div>
                <div className="absolute bottom-16 right-4 text-xs font-medium text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                  Fill-ins
                </div>
                <div className="absolute bottom-16 left-4 text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded">
                  Money Pits
                </div>
              </div>
            </div>
          </div>

          {/* Initiative List with Quick Actions */}
          {initiatives.length > 0 && (
            <div className="mt-6 space-y-2">
              <h4 className="font-medium text-sm">Quick Actions</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {initiatives.slice(0, 10).map((initiative) => {
                  const currentQuadrant = getQuadrant(initiative.financial_impact, initiative.operational_complexity);
                  return (
                    <div key={initiative.id} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{initiative.initiative_name}</div>
                        <div className="text-xs text-gray-600">{currentQuadrant}</div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleQuadrantMove(initiative, 'Quick Wins')}>
                            Move to Quick Wins
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleQuadrantMove(initiative, 'Strategic Bets')}>
                            Move to Strategic Bets
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleQuadrantMove(initiative, 'Fill-ins')}>
                            Move to Fill-ins
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleQuadrantMove(initiative, 'Money Pits')}>
                            Move to Money Pits
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          
          <div className="space-y-4 mt-6">
            <h4 className="font-medium text-gray-900">Legend & Scoring Guide</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </div>
        </CardContent>
      </Card>

      <QuadrantMoverModal
        open={moveModalOpen}
        onOpenChange={setMoveModalOpen}
        initiative={selectedInitiative}
        targetQuadrant={targetQuadrant}
        onMove={refetch}
      />
    </TooltipProvider>
  );
};
