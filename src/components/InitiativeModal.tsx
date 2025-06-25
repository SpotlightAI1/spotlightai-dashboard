
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface InitiativeModalProps {
  organizationId?: string;
  onInitiativeAdded?: () => void;
}

export const InitiativeModal = ({ organizationId, onInitiativeAdded }: InitiativeModalProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    initiative_name: '',
    description: '',
    financial_impact: [3],
    operational_complexity: [3],
    competitive_disruption: [3],
    time_urgency: [3]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('strategic_initiatives')
        .insert({
          initiative_name: formData.initiative_name,
          description: formData.description,
          financial_impact: formData.financial_impact[0],
          operational_complexity: formData.operational_complexity[0],
          competitive_disruption: formData.competitive_disruption[0],
          time_urgency: formData.time_urgency[0],
          organization_id: organizationId
        });

      if (error) throw error;

      toast({
        title: "Initiative Added",
        description: "Strategic initiative has been successfully added.",
      });

      setOpen(false);
      setFormData({
        initiative_name: '',
        description: '',
        financial_impact: [3],
        operational_complexity: [3],
        competitive_disruption: [3],
        time_urgency: [3]
      });
      
      onInitiativeAdded?.();
    } catch (error) {
      console.error('Error adding initiative:', error);
      toast({
        title: "Error",
        description: "Failed to add initiative. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getQuadrantFromScores = (financial: number, complexity: number) => {
    if (financial >= 3.5 && complexity < 3.5) return 'Quick Wins';
    if (financial >= 3.5 && complexity >= 3.5) return 'Strategic Bets';
    if (financial < 3.5 && complexity < 3.5) return 'Fill-ins';
    return 'Money Pits';
  };

  const currentQuadrant = getQuadrantFromScores(
    formData.financial_impact[0], 
    formData.operational_complexity[0]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Initiative
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Strategic Initiative</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Initiative Name</Label>
            <Input
              id="name"
              value={formData.initiative_name}
              onChange={(e) => setFormData(prev => ({ ...prev, initiative_name: e.target.value }))}
              placeholder="Enter initiative name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the initiative and its goals"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Financial Impact: {formData.financial_impact[0]}/5</Label>
                <Slider
                  value={formData.financial_impact}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, financial_impact: value }))}
                  max={5}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
                <div className="text-xs text-gray-600 mt-1">
                  1: Minimal (&lt;$100K) → 5: Very High (&gt;$5M)
                </div>
              </div>

              <div>
                <Label>Operational Complexity: {formData.operational_complexity[0]}/5</Label>
                <Slider
                  value={formData.operational_complexity}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, operational_complexity: value }))}
                  max={5}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
                <div className="text-xs text-gray-600 mt-1">
                  1: Simple (1-3 months) → 5: Very Complex (&gt;24 months)
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Competitive Disruption: {formData.competitive_disruption[0]}/5</Label>
                <Slider
                  value={formData.competitive_disruption}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, competitive_disruption: value }))}
                  max={5}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
                <div className="text-xs text-gray-600 mt-1">
                  1: Low disruption → 5: High market disruption
                </div>
              </div>

              <div>
                <Label>Time Urgency: {formData.time_urgency[0]}/5</Label>
                <Slider
                  value={formData.time_urgency}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, time_urgency: value }))}
                  max={5}
                  min={1}
                  step={0.5}
                  className="mt-2"
                />
                <div className="text-xs text-gray-600 mt-1">
                  1: Low urgency → 5: Critical urgency
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-blue-50">
            <CardContent className="pt-4">
              <div className="text-sm">
                <span className="font-medium">Current Quadrant: </span>
                <span className={`font-semibold ${
                  currentQuadrant === 'Quick Wins' ? 'text-green-700' :
                  currentQuadrant === 'Strategic Bets' ? 'text-blue-700' :
                  currentQuadrant === 'Fill-ins' ? 'text-yellow-700' : 'text-red-700'
                }`}>
                  {currentQuadrant}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !formData.initiative_name.trim()}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add Initiative
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
