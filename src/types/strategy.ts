export interface Strategy {
  // Business Context
  companyName: string;
  industry: string;
  businessBackground: string;
  
  // Vision
  visionClients: string;
  visionPeople: string;
  visionStakeholders: string;
  
  // Strategic Pillars
  pillars: Pillar[];
  
  // Meta
  createdAt: string;
  updatedAt: string;
}

export interface Pillar {
  id: string;
  name: string;
  description: string;
  initiatives: string[];
  stories: {
    communication: string;
    connection: string;
    consistency: string;
  };
}

export interface WizardState {
  currentStep: number;
  strategy: Strategy;
  isComplete: boolean;
}

export const STEPS = [
  { number: 1, name: 'Welcome', key: 'welcome' },
  { number: 2, name: 'Context', key: 'context' },
  { number: 3, name: 'Vision', key: 'vision' },
  { number: 4, name: 'Pillars', key: 'pillars' },
  { number: 5, name: 'Initiatives', key: 'initiatives' },
  { number: 6, name: 'Stories', key: 'stories' },
  { number: 7, name: 'Output', key: 'output' }
] as const;

export type StepKey = typeof STEPS[number]['key'];