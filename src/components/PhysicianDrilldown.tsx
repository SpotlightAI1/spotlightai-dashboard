
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Award, Calendar, DollarSign } from 'lucide-react';

interface PhysicianDrilldownProps {
  serviceLine: string;
  onPhysicianSelect: (physician: string) => void;
  selectedPhysician: string | null;
}

export const PhysicianDrilldown = ({ serviceLine, onPhysicianSelect, selectedPhysician }: PhysicianDrilldownProps) => {
  // Mock physician data based on service line
  const getPhysicianData = (serviceLine: string) => {
    const baseData = {
      'Cardiology': [
        { name: 'Dr. Sarah Johnson', specialty: 'Interventional Cardiology', patients: 234, revenue: 2.8, satisfaction: 4.8, procedures: 145 },
        { name: 'Dr. Michael Chen', specialty: 'Cardiac Surgery', patients: 189, revenue: 3.2, satisfaction: 4.7, procedures: 98 },
        { name: 'Dr. Emily Rodriguez', specialty: 'Electrophysiology', patients: 156, revenue: 2.1, satisfaction: 4.9, procedures: 67 },
        { name: 'Dr. David Thompson', specialty: 'Heart Failure', patients: 298, revenue: 1.9, satisfaction: 4.6, procedures: 0 }
      ],
      'Orthopedics': [
        { name: 'Dr. James Wilson', specialty: 'Joint Replacement', patients: 167, revenue: 2.9, satisfaction: 4.8, procedures: 123 },
        { name: 'Dr. Lisa Park', specialty: 'Sports Medicine', patients: 245, revenue: 1.8, satisfaction: 4.7, procedures: 89 },
        { name: 'Dr. Robert Garcia', specialty: 'Spine Surgery', patients: 134, revenue: 3.1, satisfaction: 4.5, procedures: 76 },
        { name: 'Dr. Amanda Lee', specialty: 'Trauma', patients: 189, revenue: 2.2, satisfaction: 4.6, procedures: 145 }
      ],
      'Oncology': [
        { name: 'Dr. Jennifer Kim', specialty: 'Medical Oncology', patients: 178, revenue: 4.2, satisfaction: 4.9, procedures: 0 },
        { name: 'Dr. Christopher Brown', specialty: 'Radiation Oncology', patients: 134, revenue: 3.8, satisfaction: 4.7, procedures: 167 },
        { name: 'Dr. Maria Gonzalez', specialty: 'Surgical Oncology', patients: 98, revenue: 3.5, satisfaction: 4.8, procedures: 89 },
        { name: 'Dr. Kevin Wang', specialty: 'Hematology', patients: 145, revenue: 2.9, satisfaction: 4.6, procedures: 0 }
      ]
    };

    return baseData[serviceLine as keyof typeof baseData] || [];
  };

  const physicians = getPhysicianData(serviceLine);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {serviceLine} - Physician Performance
        </CardTitle>
        <p className="text-sm text-gray-600">Individual physician metrics and performance indicators</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {physicians.map((physician, index) => (
            <div 
              key={index}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedPhysician === physician.name 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
              onClick={() => onPhysicianSelect(physician.name)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">{physician.name}</h3>
                    <p className="text-sm text-gray-600">{physician.specialty}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Award className="h-3 w-3 mr-1" />
                  {physician.satisfaction}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="text-gray-600">Patients</div>
                    <div className="font-medium">{physician.patients}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-gray-600">Revenue</div>
                    <div className="font-medium">${physician.revenue}M</div>
                  </div>
                </div>
                
                {physician.procedures > 0 && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <div>
                      <div className="text-gray-600">Procedures</div>
                      <div className="font-medium">{physician.procedures}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {selectedPhysician && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Selected: {selectedPhysician}</h4>
            <p className="text-sm text-gray-600">
              Detailed analytics and performance trends for this physician would be displayed here, 
              including month-over-month comparisons, patient outcomes, and financial metrics.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
