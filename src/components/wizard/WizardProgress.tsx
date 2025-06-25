
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface WizardProgressProps {
  steps: Step[];
  currentStep: number;
  progress: number;
}

export const WizardProgress: React.FC<WizardProgressProps> = ({ steps, currentStep, progress }) => {
  return (
    <div className="space-y-4">
      <Progress value={progress} className="w-full" />
      <div className="flex justify-between text-sm text-gray-600">
        {steps.map((step) => (
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
  );
};
