
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { BasicInformationStep } from './wizard/BasicInformationStep';
import { OperationalDetailsStep } from './wizard/OperationalDetailsStep';
import { StrategicContextStep } from './wizard/StrategicContextStep';
import { StakeholderInformationStep } from './wizard/StakeholderInformationStep';
import { WizardNavigation } from './wizard/WizardNavigation';
import { WizardProgress } from './wizard/WizardProgress';
import { useWizardData } from './wizard/useWizardData';
import { useWizardSubmission } from './wizard/useWizardSubmission';
import { WizardData } from './wizard/types';

const STEPS = [
  { id: 1, title: 'Basic Information', description: 'Organization details and type' },
  { id: 2, title: 'Operational Details', description: 'Capacity and systems information' },
  { id: 3, title: 'Strategic Context', description: 'Priorities and capabilities' },
  { id: 4, title: 'Stakeholder Information', description: 'Key decision makers' }
];

interface OrganizationWizardProps {
  onComplete?: (organizationId: string) => void;
  onCancel?: () => void;
}

export const OrganizationWizard: React.FC<OrganizationWizardProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { wizardData, updateWizardData } = useWizardData();
  const { handleSaveDraft, handleComplete, isSubmitting } = useWizardSubmission(wizardData, onComplete);

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(wizardData.name && wizardData.type && wizardData.annual_revenue_range && wizardData.market);
      case 2:
        return !!(wizardData.market_position && wizardData.ehr_system);
      case 3:
        return wizardData.strategic_priorities.length > 0 && wizardData.current_challenges.length > 0;
      case 4:
        return wizardData.stakeholders.length > 0 && wizardData.board_composition_type && wizardData.strategic_decision_timeline;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformationStep
            data={wizardData}
            onUpdate={updateWizardData}
          />
        );
      case 2:
        return (
          <OperationalDetailsStep
            data={wizardData}
            onUpdate={updateWizardData}
          />
        );
      case 3:
        return (
          <StrategicContextStep
            data={wizardData}
            onUpdate={updateWizardData}
          />
        );
      case 4:
        return (
          <StakeholderInformationStep
            data={wizardData}
            onUpdate={updateWizardData}
          />
        );
      default:
        return null;
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-blue-600" />
            Organization Onboarding Wizard
          </CardTitle>
          <WizardProgress steps={STEPS} currentStep={currentStep} progress={progress} />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="min-h-96">
            {renderStep()}
          </div>
          
          <WizardNavigation
            currentStep={currentStep}
            totalSteps={4}
            isValid={validateCurrentStep()}
            isSubmitting={isSubmitting}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSaveDraft={handleSaveDraft}
            onComplete={handleComplete}
            onCancel={onCancel}
          />
        </CardContent>
      </Card>
    </div>
  );
};
