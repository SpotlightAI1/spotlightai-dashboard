
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { WizardData } from './types';
import { generateMasterPrompt } from './utils';

export const useWizardSubmission = (
  wizardData: WizardData,
  onComplete?: (organizationId: string) => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const saveOrganizationData = async (includeCompletionTimestamp = false) => {
    console.log('Starting saveOrganizationData with wizardData:', wizardData);
    
    const masterPrompt = generateMasterPrompt(wizardData);
    
    const organizationData = {
      name: wizardData.name,
      type: wizardData.type as 'Independent' | 'Regional' | 'Specialty' | 'Critical Access',
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
      setup_wizard_version: 1,
      ...(includeCompletionTimestamp && { onboarding_completed_at: new Date().toISOString() })
    };

    console.log('Submitting organization data:', organizationData);

    const { data: organization, error } = await supabase
      .from('healthcare_organizations')
      .insert(organizationData)
      .select()
      .single();

    if (error) {
      console.error('Database error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        organizationData: organizationData
      });
      throw error;
    }

    console.log('Organization created successfully:', organization);

    // Save stakeholders
    if (wizardData.stakeholders.length > 0) {
      console.log('Saving stakeholders:', wizardData.stakeholders);
      const stakeholdersData = wizardData.stakeholders.map(stakeholder => ({
        name: stakeholder.name,
        title: stakeholder.title,
        email: stakeholder.email,
        phone: stakeholder.phone,
        role_type: stakeholder.role_type,
        primary_contact: Boolean(stakeholder.primary_contact),
        organization_id: organization.id
      }));

      const { error: stakeholdersError } = await supabase
        .from('stakeholders')
        .insert(stakeholdersData);

      if (stakeholdersError) {
        console.error('Stakeholders error:', stakeholdersError);
        throw stakeholdersError;
      }
      console.log('Stakeholders saved successfully');
    }

    // Save priorities
    if (wizardData.strategic_priorities.length > 0) {
      console.log('Saving priorities:', wizardData.strategic_priorities);
      const prioritiesData = wizardData.strategic_priorities.map((priority, index) => ({
        organization_id: organization.id,
        priority_name: priority,
        priority_rank: index + 1
      }));

      const { error: prioritiesError } = await supabase
        .from('organization_priorities')
        .insert(prioritiesData);

      if (prioritiesError) {
        console.error('Priorities error:', prioritiesError);
        throw prioritiesError;
      }
      console.log('Priorities saved successfully');
    }

    // Save challenges
    if (wizardData.current_challenges.length > 0) {
      console.log('Saving challenges:', wizardData.current_challenges);
      const challengesData = wizardData.current_challenges.map(challenge => ({
        organization_id: organization.id,
        challenge_name: challenge,
        severity_level: 3
      }));

      const { error: challengesError } = await supabase
        .from('organization_challenges')
        .insert(challengesData);

      if (challengesError) {
        console.error('Challenges error:', challengesError);
        throw challengesError;
      }
      console.log('Challenges saved successfully');
    }

    return organization;
  };

  const handleSaveDraft = async () => {
    console.log('Saving draft...');
    try {
      await saveOrganizationData(false);
      toast({
        title: "Draft Saved",
        description: "Your organization profile has been saved as a draft.",
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error",
        description: `Failed to save draft: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const handleComplete = async () => {
    console.log('Completing onboarding...');
    setIsSubmitting(true);
    try {
      const organization = await saveOrganizationData(true);
      toast({
        title: "Organization Onboarded",
        description: `${wizardData.name} has been successfully onboarded!`,
      });
      onComplete?.(organization.id);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error",
        description: `Failed to complete onboarding: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSaveDraft, handleComplete, isSubmitting };
};
