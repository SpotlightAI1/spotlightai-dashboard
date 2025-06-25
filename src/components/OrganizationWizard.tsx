
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { BasicInformationStep } from './wizard/BasicInformationStep';
import { OperationalDetailsStep } from './wizard/OperationalDetailsStep';
import { StrategicContextStep } from './wizard/StrategicContextStep';
import { StakeholderInformationStep } from './wizard/StakeholderInformationStep';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WizardData {
  // Step 1 - Basic Information
  name: string;
  type: string;
  annual_revenue_range: string;
  market: string;
  
  // Step 2 - Operational Details
  beds: number | null;
  employee_count: number | null;
  market_position: string;
  ehr_system: string;
  
  // Step 3 - Strategic Context
  strategic_priorities: string[];
  current_challenges: string[];
  technology_maturity_level: number;
  change_management_capability: number;
  
  // Step 4 - Stakeholder Information
  stakeholders: Array<{
    name: string;
    title: string;
    email: string;
    phone: string;
    role_type: string;
    primary_contact: boolean;
  }>;
  board_composition_type: string;
  strategic_decision_timeline: string;
}

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [wizardData, setWizardData] = useState<WizardData>({
    name: '',
    type: '',
    annual_revenue_range: '',
    market: '',
    beds: null,
    employee_count: null,
    market_position: '',
    ehr_system: '',
    strategic_priorities: [],
    current_challenges: [],
    technology_maturity_level: 1,
    change_management_capability: 1,
    stakeholders: [],
    board_composition_type: '',
    strategic_decision_timeline: ''
  });

  const updateWizardData = (stepData: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...stepData }));
  };

  const generateMasterPrompt = (data: WizardData): string => {
    const stakeholdersList = data.stakeholders
      .map(s => `${s.name} (${s.title})`)
      .join(', ');

    return `You are analyzing ${data.name}, a ${data.type} with ${data.annual_revenue_range} in annual revenue, operating ${data.beds || 'N/A'} beds and employing ${data.employee_count || 'N/A'} people in the ${data.market} market.

Their market position is ${data.market_position} and their top strategic priorities are: ${data.strategic_priorities.join(', ')}. Key challenges include: ${data.current_challenges.join(', ')}. Technology maturity is level ${data.technology_maturity_level}/5 and change management capability is level ${data.change_management_capability}/5.

Key stakeholders include: ${stakeholdersList}. Board composition is ${data.board_composition_type} and typical strategic decisions take ${data.strategic_decision_timeline}.

When providing strategic recommendations, consider their specific constraints and capabilities based on the profile data. Tailor all analysis to their organizational context, resource constraints, and strategic priorities. Focus on initiatives that align with their technology maturity level and change management capabilities.`;
  };

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

  const handleSaveDraft = async () => {
    try {
      const masterPrompt = generateMasterPrompt(wizardData);
      
      // Map organization type to match database enum if needed
      const organizationType = wizardData.type;
      
      // Create the organization record with proper type casting
      const organizationData = {
        name: wizardData.name,
        type: organizationType as any, // Type assertion for now since generated types may be outdated
        annual_revenue_range: wizardData.annual_revenue_range,
        market: wizardData.market,
        beds: wizardData.beds,
        employee_count: wizardData.employee_count,
        market_position: wizardData.market_position,
        ehr_system: wizardData.ehr_system,
        strategic_priorities: wizardData.strategic_priorities,
        current_challenges: wizardData.current_challenges,
        technology_maturity_level: wizardData.technology_maturity_level,
        change_management_capability: wizardData.change_management_capability,
        board_composition_type: wizardData.board_composition_type,
        strategic_decision_timeline: wizardData.strategic_decision_timeline,
        master_prompt: masterPrompt,
        setup_wizard_version: 1
      };

      const { data: organization, error } = await supabase
        .from('healthcare_organizations')
        .insert(organizationData as any) // Type assertion since generated types may be outdated
        .select()
        .single();

      if (error) throw error;

      // Save stakeholders
      if (wizardData.stakeholders.length > 0) {
        const stakeholdersData = wizardData.stakeholders.map(stakeholder => ({
          ...stakeholder,
          organization_id: organization.id
        }));

        await supabase.from('stakeholders').insert(stakeholdersData);
      }

      // Save priorities
      if (wizardData.strategic_priorities.length > 0) {
        const prioritiesData = wizardData.strategic_priorities.map((priority, index) => ({
          organization_id: organization.id,
          priority_name: priority,
          priority_rank: index + 1
        }));

        await supabase.from('organization_priorities').insert(prioritiesData);
      }

      // Save challenges
      if (wizardData.current_challenges.length > 0) {
        const challengesData = wizardData.current_challenges.map(challenge => ({
          organization_id: organization.id,
          challenge_name: challenge,
          severity_level: 3 // Default severity
        }));

        await supabase.from('organization_challenges').insert(challengesData);
      }

      toast({
        title: "Draft Saved",
        description: "Your organization profile has been saved as a draft.",
      });

    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleComplete = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      const masterPrompt = generateMasterPrompt(wizardData);
      
      // Map organization type to match database enum if needed
      const organizationType = wizardData.type;
      
      // Create the organization record with onboarding completion timestamp
      const organizationData = {
        name: wizardData.name,
        type: organizationType as any, // Type assertion for now
        annual_revenue_range: wizardData.annual_revenue_range,
        market: wizardData.market,
        beds: wizardData.beds,
        employee_count: wizardData.employee_count,
        market_position: wizardData.market_position,
        ehr_system: wizardData.ehr_system,
        strategic_priorities: wizardData.strategic_priorities,
        current_challenges: wizardData.current_challenges,
        technology_maturity_level: wizardData.technology_maturity_level,
        change_management_capability: wizardData.change_management_capability,
        board_composition_type: wizardData.board_composition_type,
        strategic_decision_timeline: wizardData.strategic_decision_timeline,
        master_prompt: masterPrompt,
        onboarding_completed_at: new Date().toISOString(),
        setup_wizard_version: 1
      };

      const { data: organization, error } = await supabase
        .from('healthcare_organizations')
        .insert(organizationData as any) // Type assertion since generated types may be outdated
        .select()
        .single();

      if (error) throw error;

      // Save stakeholders
      if (wizardData.stakeholders.length > 0) {
        const stakeholdersData = wizardData.stakeholders.map(stakeholder => ({
          ...stakeholder,
          organization_id: organization.id
        }));

        await supabase.from('stakeholders').insert(stakeholdersData);
      }

      // Save priorities
      if (wizardData.strategic_priorities.length > 0) {
        const prioritiesData = wizardData.strategic_priorities.map((priority, index) => ({
          organization_id: organization.id,
          priority_name: priority,
          priority_rank: index + 1
        }));

        await supabase.from('organization_priorities').insert(prioritiesData);
      }

      // Save challenges
      if (wizardData.current_challenges.length > 0) {
        const challengesData = wizardData.current_challenges.map(challenge => ({
          organization_id: organization.id,
          challenge_name: challenge,
          severity_level: 3 // Default severity
        }));

        await supabase.from('organization_challenges').insert(challengesData);
      }

      toast({
        title: "Organization Onboarded",
        description: `${wizardData.name} has been successfully onboarded!`,
      });

      onComplete?.(organization.id);

    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    currentStep >= step.id ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-1 ${
                    currentStep >= step.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                  }`}>
                    {step.id}
                  </div>
                  <span className="text-xs text-center max-w-24">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="min-h-96">
            {renderStep()}
          </div>
          
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
                onClick={handleSaveDraft}
                disabled={isSubmitting}
              >
                Save Draft
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!validateCurrentStep()}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={!validateCurrentStep() || isSubmitting}
                >
                  Complete Onboarding
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
