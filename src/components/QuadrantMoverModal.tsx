
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Save, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface QuadrantMoverModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initiative: {
    id: string;
    initiative_name: string;
    financial_impact: number;
    operational_complexity: number;
    currentQuadrant: string;
  } | null;
  targetQuadrant: string;
  onMove?: () => void;
}

const getQuadrantColor = (quadrant: string) => {
  switch (quadrant) {
    case 'Quick Wins': return 'bg-green-100 text-green-800';
    case 'Strategic Bets': return 'bg-blue-100 text-blue-800';
    case 'Fill-ins': return 'bg-yellow-100 text-yellow-800';
    case 'Money Pits': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const QuadrantMoverModal = ({ 
  open, 
  onOpenChange, 
  initiative, 
  targetQuadrant, 
  onMove 
}: QuadrantMoverModalProps) => {
  const [justification, setJustification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleMove = async () => {
    if (!initiative || !justification.trim()) return;

    setIsSubmitting(true);
    try {
      // Calculate new scores based on target quadrant
      let newFinancialImpact = initiative.financial_impact;
      let newComplexity = initiative.operational_complexity;

      switch (targetQuadrant) {
        case 'Quick Wins':
          newFinancialImpact = Math.max(3.5, newFinancialImpact);
          newComplexity = Math.min(3.4, newComplexity);
          break;
        case 'Strategic Bets':
          newFinancialImpact = Math.max(3.5, newFinancialImpact);
          newComplexity = Math.max(3.5, newComplexity);
          break;
        case 'Fill-ins':
          newFinancialImpact = Math.min(3.4, newFinancialImpact);
          newComplexity = Math.min(3.4, newComplexity);
          break;
        case 'Money Pits':
          newFinancialImpact = Math.min(3.4, newFinancialImpact);
          newComplexity = Math.max(3.5, newComplexity);
          break;
      }

      const { error } = await supabase
        .from('strategic_initiatives')
        .update({
          financial_impact: newFinancialImpact,
          operational_complexity: newComplexity,
          description: `${initiative.description || ''}\n\n[Quadrant Change] Moved to ${targetQuadrant}: ${justification}`.trim()
        })
        .eq('id', initiative.id);

      if (error) throw error;

      toast({
        title: "Initiative Moved",
        description: `Successfully moved "${initiative.initiative_name}" to ${targetQuadrant}.`,
      });

      onOpenChange(false);
      setJustification('');
      onMove?.();
    } catch (error) {
      console.error('Error moving initiative:', error);
      toast({
        title: "Error",
        description: "Failed to move initiative. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initiative) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Move Initiative</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Initiative</h4>
            <p className="text-sm text-gray-600">{initiative.initiative_name}</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={getQuadrantColor(initiative.currentQuadrant)} variant="outline">
              {initiative.currentQuadrant}
            </Badge>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <Badge className={getQuadrantColor(targetQuadrant)} variant="outline">
              {targetQuadrant}
            </Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justification">Justification for Move</Label>
            <Textarea
              id="justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Explain why this initiative should be moved to this quadrant..."
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleMove} 
              disabled={isSubmitting || !justification.trim()}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Moving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Move Initiative
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
