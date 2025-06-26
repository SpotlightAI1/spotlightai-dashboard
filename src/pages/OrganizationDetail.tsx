import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, DollarSign, Bed, MapPin, Target } from 'lucide-react';
import { EnhancedStrategicImpactMatrix } from '@/components/EnhancedStrategicImpactMatrix';
import { StrategicReportGenerator } from '@/components/StrategicReportGenerator';

// Mock organization data - in a real app, this would come from an API
const mockOrganizations = {
  'org-1': {
    id: 'org-1',
    name: 'Regional Medical Center',
    type: 'Regional',
    beds: 275,
    revenue: 185000000,
    market: 'Metro Area',
    strategic_priorities: ['Patient Experience', 'Technology Modernization', 'Cost Reduction'],
    current_challenges: ['Staffing Shortages', 'Supply Chain', 'Cybersecurity']
  },
  'org-2': {
    id: 'org-2',
    name: 'Community Health System',
    type: 'Independent',
    beds: 150,
    revenue: 95000000,
    market: 'Rural Community',
    strategic_priorities: ['Rural Access', 'Telehealth', 'Financial Sustainability'],
    current_challenges: ['Remote Locations', 'Technology Gap', 'Physician Recruitment']
  }
};

export const OrganizationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const organization = id ? mockOrganizations[id as keyof typeof mockOrganizations] : null;

  if (!organization) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Organization Not Found</h2>
              <p className="text-gray-600">The requested organization could not be found.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock last report date for demonstration
  const lastReportDate = "December 15, 2024";

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Organization Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                {organization.name}
              </CardTitle>
              <Badge variant="outline" className="mt-2">
                {organization.type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Bed className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Bed Count</p>
                <p className="font-semibold">{organization.beds} beds</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Annual Revenue</p>
                <p className="font-semibold">${Math.round(organization.revenue / 1000000)}M</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Market</p>
                <p className="font-semibold">{organization.market}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Priorities</p>
                <p className="font-semibold">{organization.strategic_priorities?.length || 0} active</p>
              </div>
            </div>
          </div>

          {/* Strategic Priorities */}
          {organization.strategic_priorities && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Strategic Priorities</h3>
              <div className="flex flex-wrap gap-2">
                {organization.strategic_priorities.map((priority, index) => (
                  <Badge key={index} variant="secondary">
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Current Challenges */}
          {organization.current_challenges && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Current Challenges</h3>
              <div className="flex flex-wrap gap-2">
                {organization.current_challenges.map((challenge, index) => (
                  <Badge key={index} variant="outline" className="border-orange-200 text-orange-800">
                    {challenge}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Strategic Report Generator - Prominent placement */}
      <StrategicReportGenerator 
        organizationName={organization.name}
        organizationId={organization.id}
        lastReportDate={lastReportDate}
      />

      {/* Strategic Impact Matrix */}
      <EnhancedStrategicImpactMatrix 
        organizationId={organization.id}
        organizationName={organization.name}
      />
    </div>
  );
};
