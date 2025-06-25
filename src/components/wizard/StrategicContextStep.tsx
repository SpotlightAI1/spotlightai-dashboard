import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { WizardData } from './types';

interface StrategicContextStepProps {
  data: WizardData;
  onUpdate: (data: Partial<WizardData>) => void;
}

const STRATEGIC_PRIORITIES = [
  'Revenue Growth & Market Expansion',
  'Quality & Patient Safety Improvement',
  'Operational Efficiency & Cost Reduction',
  'Technology Modernization & Digital Transformation',
  'Physician Recruitment & Retention',
  'Staff Development & Workforce Optimization',
  'Patient Experience Enhancement',
  'Population Health Management',
  'Value-Based Care Transition',
  'Facility Expansion or Renovation',
  'Service Line Development',
  'Regulatory Compliance & Risk Management',
  'Community Outreach & Public Health',
  'Financial Sustainability & Margin Improvement',
  'Strategic Partnerships & Acquisitions'
];

const COMMON_CHALLENGES = [
  'Physician Shortage',
  'Nursing Shortage',
  'Rising Labor Costs',
  'Declining Reimbursements',
  'Increased Competition',
  'Regulatory Burden',
  'Technology Integration Issues',
  'Patient Acquisition Challenges',
  'Quality Metrics Performance',
  'Financial Pressures',
  'Aging Infrastructure',
  'Cybersecurity Threats',
  'Supply Chain Disruptions',
  'Population Health Demands',
  'Value-Based Care Transition',
  'Patient Experience Expectations',
  'Data Analytics Capabilities',
  'Interoperability Challenges'
];

const TECHNOLOGY_LEVELS = [
  { value: 1, label: 'Basic', description: 'Limited technology, mostly paper-based processes' },
  { value: 2, label: 'Developing', description: 'Basic EHR, some digital processes' },
  { value: 3, label: 'Intermediate', description: 'Integrated EHR, some analytics capabilities' },
  { value: 4, label: 'Advanced', description: 'Comprehensive digital ecosystem, strong analytics' },
  { value: 5, label: 'Leading Edge', description: 'AI/ML capabilities, fully integrated digital platform' }
];

const CHANGE_LEVELS = [
  { value: 1, label: 'Limited', description: 'Resistance to change, slow adoption' },
  { value: 2, label: 'Developing', description: 'Some change initiatives, mixed results' },
  { value: 3, label: 'Moderate', description: 'Structured change process, moderate success' },
  { value: 4, label: 'Strong', description: 'Effective change management, good adoption' },
  { value: 5, label: 'Excellent', description: 'Agile organization, rapid successful changes' }
];

export const StrategicContextStep: React.FC<StrategicContextStepProps> = ({ data, onUpdate }) => {
  const handlePriorityChange = (priority: string, checked: boolean) => {
    const updated = checked
      ? [...data.strategic_priorities, priority]
      : data.strategic_priorities.filter(p => p !== priority);
    onUpdate({ strategic_priorities: updated });
  };

  const handleChallengeChange = (challenge: string, checked: boolean) => {
    const updated = checked
      ? [...data.current_challenges, challenge]
      : data.current_challenges.filter(c => c !== challenge);
    onUpdate({ current_challenges: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Step 3: Strategic Context</h3>
        <p className="text-gray-600 mb-6">
          Help us understand your strategic priorities, challenges, and organizational capabilities.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium">Top Strategic Priorities (Select up to 5) *</Label>
          <p className="text-sm text-gray-600 mb-4">Choose the most important strategic priorities for your organization</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border rounded-lg p-4">
            {STRATEGIC_PRIORITIES.map((priority) => (
              <div key={priority} className="flex items-center space-x-2">
                <Checkbox
                  id={priority}
                  checked={data.strategic_priorities.includes(priority)}
                  onCheckedChange={(checked) => handlePriorityChange(priority, checked as boolean)}
                  disabled={!data.strategic_priorities.includes(priority) && data.strategic_priorities.length >= 5}
                />
                <Label htmlFor={priority} className="text-sm cursor-pointer">
                  {priority}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Selected: {data.strategic_priorities.length}/5
          </p>
        </div>

        <div>
          <Label className="text-base font-medium">Current Major Challenges (Select all that apply) *</Label>
          <p className="text-sm text-gray-600 mb-4">Identify the key challenges your organization is facing</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border rounded-lg p-4">
            {COMMON_CHALLENGES.map((challenge) => (
              <div key={challenge} className="flex items-center space-x-2">
                <Checkbox
                  id={challenge}
                  checked={data.current_challenges.includes(challenge)}
                  onCheckedChange={(checked) => handleChallengeChange(challenge, checked as boolean)}
                />
                <Label htmlFor={challenge} className="text-sm cursor-pointer">
                  {challenge}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label className="text-base font-medium">Technology Maturity Level</Label>
            <p className="text-sm text-gray-600 mb-4">Rate your organization's technology capabilities</p>
            <div className="space-y-4">
              <Slider
                value={[data.technology_maturity_level]}
                onValueChange={(value) => onUpdate({ technology_maturity_level: value[0] })}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-center">
                <span className="font-medium">
                  {TECHNOLOGY_LEVELS[data.technology_maturity_level - 1]?.label}
                </span>
                <p className="text-sm text-gray-600">
                  {TECHNOLOGY_LEVELS[data.technology_maturity_level - 1]?.description}
                </p>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Change Management Capability</Label>
            <p className="text-sm text-gray-600 mb-4">Rate your organization's ability to implement change</p>
            <div className="space-y-4">
              <Slider
                value={[data.change_management_capability]}
                onValueChange={(value) => onUpdate({ change_management_capability: value[0] })}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-center">
                <span className="font-medium">
                  {CHANGE_LEVELS[data.change_management_capability - 1]?.label}
                </span>
                <p className="text-sm text-gray-600">
                  {CHANGE_LEVELS[data.change_management_capability - 1]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
