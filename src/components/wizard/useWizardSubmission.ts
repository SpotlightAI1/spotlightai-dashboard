
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
    const masterPrompt = generateMasterPrompt(wizardData);
    
    const organizationData = {
      name: wizardData.name,
      type: wizardData.type as any,
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

    const { data: organization, error } = await supabase
      .from('healthcare_organizations')
      .insert(organizationData as any)
      .select()
      .single();

    if (error) throw error;

    // Save stakeholders
    if (wizardData.stakeholders.length > 0) {
      const stakeholdersData = wizardData.stakeholders.map(stakeholder => ({
        name: stakeholder.name,
        title: stakeholder.title,
        email: stakeholder.email,
        phone: stakeholder.phone,
        role_type: stakeholder.role_type,
        primary_contact: Boolean(stakeholder.primary_contact),
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
        severity_level: 3
      }));

      await supabase.from('organization_challenges').insert(challengesData);
    }

    return organization;
  };

  const handleSaveDraft = async () => {
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
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleComplete = async () => {
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
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSaveDraft, handleComplete, isSubmitting };
};
