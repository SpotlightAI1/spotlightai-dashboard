import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, User } from 'lucide-react';
import { WizardData } from './types';

interface StakeholderInformationStepProps {
  data: WizardData;
  onUpdate: (data: Partial<WizardData>) => void;
}

const ROLE_TYPES = [
  'CEO/President',
  'CFO',
  'COO',
  'CNO/Chief Nursing Officer',
  'CMO/Chief Medical Officer',
  'CIO/Chief Information Officer',
  'Board Chair',
  'Board Member',
  'Department Head',
  'Medical Staff Leader',
  'Other Executive'
];

const BOARD_COMPOSITIONS = [
  'Independent/Community Board',
  'Physician-Led Board',
  'Corporate/System Board',
  'Faith-Based Board',
  'Public/Government Board',
  'Mixed Composition'
];

const DECISION_TIMELINES = [
  'Less than 30 days',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'More than 12 months'
];

interface Stakeholder {
  name: string;
  title: string;
  email: string;
  phone: string;
  role_type: string;
  primary_contact: boolean;
}

export const StakeholderInformationStep: React.FC<StakeholderInformationStepProps> = ({ data, onUpdate }) => {
  const [newStakeholder, setNewStakeholder] = useState<Stakeholder>({
    name: '',
    title: '',
    email: '',
    phone: '',
    role_type: '',
    primary_contact: false
  });

  const addStakeholder = () => {
    if (newStakeholder.name && newStakeholder.title && newStakeholder.role_type) {
      const updatedStakeholders = [...data.stakeholders, newStakeholder];
      onUpdate({ stakeholders: updatedStakeholders });
      setNewStakeholder({
        name: '',
        title: '',
        email: '',
        phone: '',
        role_type: '',
        primary_contact: false
      });
    }
  };

  const removeStakeholder = (index: number) => {
    const updatedStakeholders = data.stakeholders.filter((_, i) => i !== index);
    onUpdate({ stakeholders: updatedStakeholders });
  };

  const updateStakeholder = (index: number, field: keyof Stakeholder, value: string | boolean) => {
    const updatedStakeholders = [...data.stakeholders];
    updatedStakeholders[index] = { ...updatedStakeholders[index], [field]: value };
    onUpdate({ stakeholders: updatedStakeholders });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Step 4: Stakeholder Information</h3>
        <p className="text-gray-600 mb-6">
          Identify key decision makers and provide information about your governance structure.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-4 block">Key Decision Makers *</Label>
          
          {/* Existing stakeholders */}
          {data.stakeholders.length > 0 && (
            <div className="space-y-4 mb-6">
              {data.stakeholders.map((stakeholder, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {stakeholder.name} - {stakeholder.title}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStakeholder(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs">Email</Label>
                        <Input
                          value={stakeholder.email}
                          onChange={(e) => updateStakeholder(index, 'email', e.target.value)}
                          placeholder="Email address"
                          type="email"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Phone</Label>
                        <Input
                          value={stakeholder.phone}
                          onChange={(e) => updateStakeholder(index, 'phone', e.target.value)}
                          placeholder="Phone number"
                        />
                      </div>
                      <div className="flex items-center space-x-2 pt-4">
                        <Checkbox
                          checked={stakeholder.primary_contact}
                          onCheckedChange={(checked) => updateStakeholder(index, 'primary_contact', checked as boolean)}
                        />
                        <Label className="text-xs">Primary Contact</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Add new stakeholder form */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Plus className="h-4 w-4" />
                Add Key Decision Maker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Name *</Label>
                  <Input
                    value={newStakeholder.name}
                    onChange={(e) => setNewStakeholder(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label className="text-xs">Title *</Label>
                  <Input
                    value={newStakeholder.title}
                    onChange={(e) => setNewStakeholder(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <Label className="text-xs">Role Type *</Label>
                  <Select 
                    value={newStakeholder.role_type} 
                    onValueChange={(value) => setNewStakeholder(prev => ({ ...prev, role_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_TYPES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Email</Label>
                  <Input
                    value={newStakeholder.email}
                    onChange={(e) => setNewStakeholder(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Email address"
                    type="email"
                  />
                </div>
                <div>
                  <Label className="text-xs">Phone</Label>
                  <Input
                    value={newStakeholder.phone}
                    onChange={(e) => setNewStakeholder(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Phone number"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox
                    checked={newStakeholder.primary_contact}
                    onCheckedChange={(checked) => setNewStakeholder(prev => ({ ...prev, primary_contact: checked as boolean }))}
                  />
                  <Label className="text-xs">Primary Contact</Label>
                </div>
              </div>
              <Button 
                onClick={addStakeholder}
                className="mt-4"
                disabled={!newStakeholder.name || !newStakeholder.title || !newStakeholder.role_type}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Stakeholder
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="board-composition">Board Composition Type *</Label>
            <Select 
              value={data.board_composition_type} 
              onValueChange={(value) => onUpdate({ board_composition_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select board composition" />
              </SelectTrigger>
              <SelectContent>
                {BOARD_COMPOSITIONS.map((composition) => (
                  <SelectItem key={composition} value={composition}>
                    {composition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="decision-timeline">Strategic Decision Timeline *</Label>
            <Select 
              value={data.strategic_decision_timeline} 
              onValueChange={(value) => onUpdate({ strategic_decision_timeline: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Typical time from analysis to approval" />
              </SelectTrigger>
              <SelectContent>
                {DECISION_TIMELINES.map((timeline) => (
                  <SelectItem key={timeline} value={timeline}>
                    {timeline}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">Privacy & Security</h4>
        <p className="text-sm text-green-800">
          All stakeholder information is securely stored and used only for internal strategic analysis 
          and communication purposes. Contact information helps us tailor recommendations and ensure 
          appropriate stakeholders receive relevant updates.
        </p>
      </div>
    </div>
  );
};
