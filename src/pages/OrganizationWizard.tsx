
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrganizationWizard } from '@/components/OrganizationWizard';

const OrganizationWizardPage = () => {
  const navigate = useNavigate();

  const handleComplete = (organizationId: string) => {
    // Redirect to the specific organization's dashboard
    navigate(`/organizations/${organizationId}`);
  };

  const handleCancel = () => {
    // Go back to the organizations list
    navigate('/organizations');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <OrganizationWizard 
        onComplete={handleComplete}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default OrganizationWizardPage;
