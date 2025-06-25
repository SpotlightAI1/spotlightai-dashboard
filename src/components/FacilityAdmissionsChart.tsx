
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFacilityAdmissions } from '@/hooks/useFacilityAdmissions';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export const FacilityAdmissionsChart = () => {
  const { data: response, isLoading, error } = useFacilityAdmissions();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Top 10 Texas Facilities - Total Admissions (2018)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <LoadingSpinner className="mr-2" />
          <span>Loading facility admissions data...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Top 10 Texas Facilities - Total Admissions (2018)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-red-600">
            Error loading data: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!response?.success || !response.data || response.data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Top 10 Texas Facilities - Total Admissions (2018)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-gray-600">No facility data found</div>
        </CardContent>
      </Card>
    );
  }

  const { data: facilityData, metadata } = response;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Top 10 Texas Facilities - Total Admissions (2018)
        </CardTitle>
        <p className="text-sm text-gray-600">
          Ranked by total admission volume from Texas State Inpatient data
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-96 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={facilityData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }} 
                angle={-45} 
                textAnchor="end" 
                height={120}
                interval={0}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value.toLocaleString(), 'Total Admissions']}
                labelFormatter={(label) => {
                  const item = facilityData.find(d => d.name === label);
                  return item ? item.fullName : label;
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#3b82f6" 
                name="admissions"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {metadata.totalFacilities}
            </div>
            <div className="text-sm text-gray-600">Total Facilities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {metadata.totalAdmissions.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Admissions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.max(...facilityData.map(item => item.value)).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Highest Volume</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
