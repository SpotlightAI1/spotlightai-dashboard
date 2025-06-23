
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateHealthcareOrganization, useUpdateHealthcareOrganization, HealthcareOrganization } from '@/hooks/useHealthcareOrganizations';
import { useToast } from '@/hooks/use-toast';

interface OrganizationFormProps {
  organization?: HealthcareOrganization | null;
  onClose: () => void;
}

export const OrganizationForm: React.FC<OrganizationFormProps> = ({ organization, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '' as 'Independent' | 'Regional' | 'Specialty' | 'Critical Access' | '',
    revenue: '',
    beds: '',
    market: '',
    strategic_priorities: '',
    current_challenges: '',
  });

  const createMutation = useCreateHealthcareOrganization();
  const updateMutation = useUpdateHealthcareOrganization();
  const { toast } = useToast();

  useEffect(() => {
    if (organization) {
      setFormData({
        name: organization.name,
        type: organization.type,
        revenue: organization.revenue?.toString() || '',
        beds: organization.beds?.toString() || '',
        market: organization.market || '',
        strategic_priorities: organization.strategic_priorities?.join(', ') || '',
        current_challenges: organization.current_challenges?.join(', ') || '',
      });
    }
  }, [organization]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type) {
      toast({
        title: "Error",
        description: "Name and type are required fields",
        variant: "destructive",
      });
      return;
    }

    const submitData = {
      name: formData.name,
      type: formData.type as 'Independent' | 'Regional' | 'Specialty' | 'Critical Access',
      revenue: formData.revenue ? parseFloat(formData.revenue) : undefined,
      beds: formData.beds ? parseInt(formData.beds) : undefined,
      market: formData.market || undefined,
      strategic_priorities: formData.strategic_priorities 
        ? formData.strategic_priorities.split(',').map(s => s.trim()).filter(s => s)
        : undefined,
      current_challenges: formData.current_challenges
        ? formData.current_challenges.split(',').map(s => s.trim()).filter(s => s)
        : undefined,
    };

    try {
      if (organization) {
        await updateMutation.mutateAsync({ id: organization.id, ...submitData });
        toast({
          title: "Success",
          description: "Organization updated successfully",
        });
      } else {
        await createMutation.mutateAsync(submitData);
        toast({
          title: "Success",
          description: "Organization created successfully",
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save organization",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {organization ? 'Edit Organization' : 'Add New Organization'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Type *</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Independent">Independent</SelectItem>
                <SelectItem value="Regional">Regional</SelectItem>
                <SelectItem value="Specialty">Specialty</SelectItem>
                <SelectItem value="Critical Access">Critical Access</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="revenue">Revenue ($)</Label>
              <Input
                id="revenue"
                type="number"
                value={formData.revenue}
                onChange={(e) => handleChange('revenue', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="beds">Beds</Label>
              <Input
                id="beds"
                type="number"
                value={formData.beds}
                onChange={(e) => handleChange('beds', e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="market">Market</Label>
            <Input
              id="market"
              value={formData.market}
              onChange={(e) => handleChange('market', e.target.value)}
              placeholder="e.g., Dallas-Fort Worth"
            />
          </div>

          <div>
            <Label htmlFor="strategic_priorities">Strategic Priorities</Label>
            <Textarea
              id="strategic_priorities"
              value={formData.strategic_priorities}
              onChange={(e) => handleChange('strategic_priorities', e.target.value)}
              placeholder="Enter priorities separated by commas"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="current_challenges">Current Challenges</Label>
            <Textarea
              id="current_challenges"
              value={formData.current_challenges}
              onChange={(e) => handleChange('current_challenges', e.target.value)}
              placeholder="Enter challenges separated by commas"
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {organization ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
