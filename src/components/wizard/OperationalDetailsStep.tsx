import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WizardData } from './types';

interface OperationalDetailsStepProps {
  data: WizardData;
  onUpdate: (data: Partial<WizardData>) => void;
}

const MARKET_POSITIONS = [
  'Market Leader',
  'Strong Regional Player',
  'Challenger',
  'Niche Player',
  'Struggling Competitor'
];

const EHR_SYSTEMS = [
  'Epic',
  'Cerner (Oracle Health)',
  'Meditech',
  'allscripts',
  'athenahealth',
  'NextGen',
  'eClinicalWorks',
  'CPSI',
  'Evident (MEDITECH Expanse)',
  'Other',
  'Multiple Systems',
  'None/Paper-based'
];

export const OperationalDetailsStep: React.FC<OperationalDetailsStepProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Step 2: Operational Details</h3>
        <p className="text-gray-600 mb-6">
          Help us understand your organization's operational capacity and technology infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="beds">Licensed Bed Count</Label>
          <Input
            id="beds"
            type="number"
            value={data.beds || ''}
            onChange={(e) => onUpdate({ beds: e.target.value ? parseInt(e.target.value) : null })}
            placeholder="Enter number of licensed beds"
            min="0"
            max="10000"
          />
          <p className="text-xs text-gray-500">Leave blank if not applicable (e.g., outpatient-only facilities)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees">Employee Count</Label>
          <Input
            id="employees"
            type="number"
            value={data.employee_count || ''}
            onChange={(e) => onUpdate({ employee_count: e.target.value ? parseInt(e.target.value) : null })}
            placeholder="Total number of employees"
            min="1"
            max="500000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="market-position">Market Position *</Label>
          <Select value={data.market_position} onValueChange={(value) => onUpdate({ market_position: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select market position" />
            </SelectTrigger>
            <SelectContent>
              {MARKET_POSITIONS.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ehr">Electronic Health Record System *</Label>
          <Select value={data.ehr_system} onValueChange={(value) => onUpdate({ ehr_system: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select EHR system" />
            </SelectTrigger>
            <SelectContent>
              {EHR_SYSTEMS.map((ehr) => (
                <SelectItem key={ehr} value={ehr}>
                  {ehr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg">
        <h4 className="font-medium text-amber-900 mb-2">Market Position Definitions</h4>
        <ul className="text-sm text-amber-800 space-y-1">
          <li><strong>Market Leader:</strong> Dominant market share, sets pricing and standards</li>
          <li><strong>Strong Regional Player:</strong> Significant presence with competitive advantages</li>
          <li><strong>Challenger:</strong> Growing market share, pursuing aggressive strategies</li>
          <li><strong>Niche Player:</strong> Focused on specific services or patient populations</li>
          <li><strong>Struggling Competitor:</strong> Facing market pressures or financial challenges</li>
        </ul>
      </div>
    </div>
  );
};
