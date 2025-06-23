
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, DollarSign, Bed, Plus } from 'lucide-react';
import { useHealthcareOrganizations, HealthcareOrganization } from '@/hooks/useHealthcareOrganizations';
import { OrganizationForm } from './OrganizationForm';

export const HealthcareOrganizations = () => {
  const { data: organizations, isLoading, error } = useHealthcareOrganizations();
  const [showForm, setShowForm] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<HealthcareOrganization | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Healthcare Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Healthcare Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-600">Error loading organizations</div>
        </CardContent>
      </Card>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Independent': return 'bg-blue-100 text-blue-800';
      case 'Regional': return 'bg-green-100 text-green-800';
      case 'Specialty': return 'bg-purple-100 text-purple-800';
      case 'Critical Access': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatRevenue = (revenue?: number) => {
    if (!revenue) return 'N/A';
    return `$${(revenue / 1000000).toFixed(1)}M`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900">Healthcare Organizations</CardTitle>
        <Button onClick={() => setShowForm(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Organization
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {organizations?.map((org) => (
            <Card key={org.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedOrg(org)}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-sm truncate flex-1">{org.name}</h3>
                    <Badge className={`text-xs ${getTypeColor(org.type)}`}>
                      {org.type}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-green-600" />
                      <span>{formatRevenue(org.revenue)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bed className="h-3 w-3 text-blue-600" />
                      <span>{org.beds || 'N/A'}</span>
                    </div>
                  </div>
                  
                  {org.market && (
                    <div className="flex items-center space-x-1 text-xs">
                      <Building2 className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-600 truncate">{org.market}</span>
                    </div>
                  )}
                  
                  {org.strategic_priorities && org.strategic_priorities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {org.strategic_priorities.slice(0, 2).map((priority, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {priority}
                        </Badge>
                      ))}
                      {org.strategic_priorities.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{org.strategic_priorities.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!organizations || organizations.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No healthcare organizations found</p>
            <Button onClick={() => setShowForm(true)} className="mt-2">
              Add Your First Organization
            </Button>
          </div>
        )}

        {showForm && (
          <OrganizationForm
            organization={selectedOrg}
            onClose={() => {
              setShowForm(false);
              setSelectedOrg(null);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};
