
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, DollarSign, Bed, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const organizations = [
  {
    id: 'org-1',
    name: 'Regional Medical Center',
    type: 'Regional',
    beds: 275,
    revenue: 185000000,
    market: 'Metro Area',
    strategic_priorities: ['Patient Experience', 'Technology Modernization', 'Cost Reduction']
  },
  {
    id: 'org-2',
    name: 'Community Health System',
    type: 'Independent',
    beds: 150,
    revenue: 95000000,
    market: 'Rural Community',
    strategic_priorities: ['Rural Access', 'Telehealth', 'Financial Sustainability']
  }
];

export const OrganizationsList = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Healthcare Organizations</h1>
        <p className="text-gray-600">Manage and analyze strategic initiatives across your organization portfolio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {organizations.map((org) => (
          <Card key={org.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {org.name}
                  </CardTitle>
                  <Badge variant="outline" className="mt-2">
                    {org.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">{org.beds} beds</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">${Math.round(org.revenue / 1000000)}M</span>
                </div>
                
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-600">{org.market}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-gray-900 mb-2">Strategic Priorities</h4>
                <div className="flex flex-wrap gap-1">
                  {org.strategic_priorities.slice(0, 2).map((priority, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {priority}
                    </Badge>
                  ))}
                  {org.strategic_priorities.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{org.strategic_priorities.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <Link to={`/organizations/${org.id}`}>
                  <Button className="w-full">
                    View Details & SIM Analysis
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
