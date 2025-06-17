
import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change, trend, icon }: MetricCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className={`text-xs flex items-center mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
        {change} from last month
      </div>
    </CardContent>
  </Card>
);

export const MetricsOverview = () => {
  const metrics = [
    {
      title: 'Total Admissions',
      value: '2,847',
      change: '+12.3%',
      trend: 'up' as const,
      icon: <Users className="h-4 w-4 text-blue-500" />
    },
    {
      title: 'Revenue (YTD)',
      value: '$247.2M',
      change: '+8.7%',
      trend: 'up' as const,
      icon: <DollarSign className="h-4 w-4 text-green-500" />
    },
    {
      title: 'Surgeries',
      value: '1,234',
      change: '+15.2%',
      trend: 'up' as const,
      icon: <Stethoscope className="h-4 w-4 text-purple-500" />
    },
    {
      title: 'Avg Length of Stay',
      value: '3.2 days',
      change: '-5.1%',
      trend: 'down' as const,
      icon: <Calendar className="h-4 w-4 text-orange-500" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};
