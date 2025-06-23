
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, MapPin, Bed, DollarSign } from 'lucide-react';

export const HospitalSystemOverview = () => {
  const hospitalData = [
    { 
      id: 1, 
      name: 'Memorial Medical Center', 
      location: 'Downtown', 
      beds: 450, 
      utilization: 87.3, 
      revenue: 125.6, 
      admissions: 12450, 
      trend: 'up',
      change: 8.2 
    },
    { 
      id: 2, 
      name: 'Northside Regional Hospital', 
      location: 'North District', 
      beds: 320, 
      utilization: 92.1, 
      revenue: 98.4, 
      admissions: 9823, 
      trend: 'up',
      change: 12.5 
    },
    { 
      id: 3, 
      name: 'Westfield Community Hospital', 
      location: 'West Side', 
      beds: 280, 
      utilization: 78.9, 
      revenue: 76.3, 
      admissions: 8147, 
      trend: 'down',
      change: -3.1 
    },
    { 
      id: 4, 
      name: 'Eastgate Medical Complex', 
      location: 'East District', 
      beds: 380, 
      utilization: 89.5, 
      revenue: 110.2, 
      admissions: 11234, 
      trend: 'up',
      change: 6.8 
    },
    { 
      id: 5, 
      name: 'Southview General Hospital', 
      location: 'South End', 
      beds: 240, 
      utilization: 84.2, 
      revenue: 68.9, 
      admissions: 7456, 
      trend: 'up',
      change: 4.3 
    },
    { 
      id: 6, 
      name: 'Central Valley Medical', 
      location: 'Central', 
      beds: 195, 
      utilization: 91.7, 
      revenue: 58.7, 
      admissions: 6789, 
      trend: 'up',
      change: 9.1 
    },
    { 
      id: 7, 
      name: 'Riverside Healthcare Center', 
      location: 'Riverside', 
      beds: 160, 
      utilization: 88.4, 
      revenue: 45.2, 
      admissions: 5234, 
      trend: 'up',
      change: 7.2 
    },
    { 
      id: 8, 
      name: 'Highland Specialty Hospital', 
      location: 'Highland', 
      beds: 120, 
      utilization: 94.6, 
      revenue: 52.8, 
      admissions: 4567, 
      trend: 'up',
      change: 15.3 
    },
    { 
      id: 9, 
      name: 'Lakeside Medical Center', 
      location: 'Lakeside', 
      beds: 200, 
      utilization: 81.3, 
      revenue: 61.4, 
      admissions: 6123, 
      trend: 'down',
      change: -1.8 
    },
    { 
      id: 10, 
      name: 'Summit Regional Hospital', 
      location: 'Summit', 
      beds: 300, 
      utilization: 86.9, 
      revenue: 89.3, 
      admissions: 8976, 
      trend: 'up',
      change: 5.4 
    }
  ];

  const systemTotals = {
    totalBeds: hospitalData.reduce((sum, h) => sum + h.beds, 0),
    avgUtilization: hospitalData.reduce((sum, h) => sum + h.utilization, 0) / hospitalData.length,
    totalRevenue: hospitalData.reduce((sum, h) => sum + h.revenue, 0),
    totalAdmissions: hospitalData.reduce((sum, h) => sum + h.admissions, 0)
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">10-Hospital System Performance</CardTitle>
        <p className="text-sm text-gray-600">Individual facility performance and system-wide metrics</p>
      </CardHeader>
      <CardContent>
        {/* System Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Bed className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-sm font-medium text-gray-700">Total Beds</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{systemTotals.totalBeds.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-gray-700">Avg Utilization</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{systemTotals.avgUtilization.toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-gray-700">Total Revenue</span>
            </div>
            <div className="text-xl font-bold text-gray-900">${systemTotals.totalRevenue.toFixed(1)}M</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <MapPin className="h-4 w-4 text-purple-600 mr-1" />
              <span className="text-sm font-medium text-gray-700">Total Admissions</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{systemTotals.totalAdmissions.toLocaleString()}</div>
          </div>
        </div>

        {/* Individual Hospital Performance */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Individual Hospital Performance</h3>
          <div className="grid gap-3">
            {hospitalData.map((hospital) => (
              <div key={hospital.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{hospital.name}</h4>
                    <p className="text-xs text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {hospital.location}
                    </p>
                  </div>
                  <div className={`flex items-center text-xs font-medium ${
                    hospital.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {hospital.trend === 'up' ? 
                      <TrendingUp className="h-3 w-3 mr-1" /> : 
                      <TrendingDown className="h-3 w-3 mr-1" />
                    }
                    {hospital.change > 0 ? '+' : ''}{hospital.change}%
                  </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500">Beds:</span>
                    <div className="font-medium">{hospital.beds}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Utilization:</span>
                    <div className="font-medium">{hospital.utilization}%</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Revenue:</span>
                    <div className="font-medium">${hospital.revenue}M</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Admissions:</span>
                    <div className="font-medium">{hospital.admissions.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
