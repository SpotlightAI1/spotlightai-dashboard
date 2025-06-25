
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  isValid: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onComplete: () => void;
  onCancel?: () => void;
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  totalSteps,
  isValid,
  isSubmitting,
  onPrevious,
  onNext,
  onSaveDraft,
  onComplete,
  onCancel
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={onSaveDraft}
          disabled={isSubmitting}
        >
          Save Draft
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        {currentStep < totalSteps ? (
          <Button
            onClick={onNext}
            disabled={!isValid}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={onComplete}
            disabled={!isValid || isSubmitting}
          >
            Complete Onboarding
          </Button>
        )}
      </div>
    </div>
  );
};
