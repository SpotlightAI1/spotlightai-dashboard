import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WizardData } from './types';

interface BasicInformationStepProps {
  data: WizardData;
  onUpdate: (data: Partial<WizardData>) => void;
}

const ORGANIZATION_TYPES = [
  'Independent Health System',
  'Regional Network',
  'Specialty Provider',
  'Critical Access Hospital',
  'Academic Medical Center'
];

const REVENUE_RANGES = [
  'Under $10M',
  '$10M - $50M',
  '$50M - $100M',
  '$100M - $250M',
  '$250M - $500M',
  '$500M - $1B',
  '$1B - $2.5B',
  '$2.5B - $5B',
  'Over $5B'
];

export const BasicInformationStep: React.FC<BasicInformationStepProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Step 1: Basic Information</h3>
        <p className="text-gray-600 mb-6">
          Please provide the fundamental details about your healthcare organization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Organization Name *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Enter organization name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Organization Type *</Label>
          <Select value={data.type} onValueChange={(value) => onUpdate({ type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select organization type" />
            </SelectTrigger>
            <SelectContent>
              {ORGANIZATION_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="revenue">Annual Revenue Range *</Label>
          <Select value={data.annual_revenue_range} onValueChange={(value) => onUpdate({ annual_revenue_range: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select revenue range" />
            </SelectTrigger>
            <SelectContent>
              {REVENUE_RANGES.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="market">Geographic Market *</Label>
          <Input
            id="market"
            value={data.market}
            onChange={(e) => onUpdate({ market: e.target.value })}
            placeholder="e.g., Dallas-Fort Worth, Rural Texas, etc."
            required
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Why we need this information</h4>
        <p className="text-sm text-blue-800">
          This basic information helps us understand your organization's size, complexity, and market context, 
          which allows us to provide more relevant strategic recommendations and benchmarks.
        </p>
      </div>
    </div>
  );
};
