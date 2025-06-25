
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, Users, Bed, TrendingUp, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOptimizedOrganizations } from '@/hooks/useOptimizedOrganizations';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { DataTableWithLoading } from '@/components/ui/data-table-with-loading';

const OrganizationsList = () => {
  const { data: organizations, isLoading, error, refetch } = useOptimizedOrganizations();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Healthcare Organizations</h1>
            <p className="text-gray-600 mt-2">Manage and analyze your healthcare organization portfolio</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isLoading}
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Link to="/organizations/new">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Organization
              </Button>
            </Link>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <LoadingSpinner size="lg" />
              <p className="text-gray-600">Loading organizations...</p>
            </div>
          </div>
        )}

        {error && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="text-red-600 text-center">
                <p className="font-medium">Failed to load organizations</p>
                <p className="text-sm text-gray-600 mt-1">{error.message}</p>
              </div>
              <Button onClick={() => refetch()} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try again
              </Button>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && organizations && organizations.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Organizations Yet</h3>
              <p className="text-gray-600 text-center mb-6">
                Get started by adding your first healthcare organization to begin strategic analysis.
              </p>
              <Link to="/organizations/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Organization
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && organizations && organizations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <Card key={org.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <span className="truncate">{org.name}</span>
                      </CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {org.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Market:</span>
                      <span className="font-medium truncate ml-2">{org.market || 'N/A'}</span>
                    </div>
                    
                    {org.beds && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Bed className="h-3 w-3" />
                          Beds:
                        </span>
                        <span className="font-medium">{org.beds}</span>
                      </div>
                    )}
                    
                    {org.employee_count && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Employees:
                        </span>
                        <span className="font-medium">{org.employee_count.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {org.annual_revenue_range && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Revenue:
                        </span>
                        <span className="font-medium text-xs">{org.annual_revenue_range}</span>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {org.onboarding_completed_at ? 'Onboarded' : 'Setup in progress'}
                        </span>
                        <Link to={`/organizations/${org.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { OrganizationsList };
