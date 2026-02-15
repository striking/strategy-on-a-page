'use client';

import { useReducer, useEffect } from 'react';
import { Strategy, WizardState, STEPS } from '@/types/strategy';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Step Components
import WelcomeStep from '@/components/steps/WelcomeStep';
import ContextStep from '@/components/steps/ContextStep';
import VisionStep from '@/components/steps/VisionStep';
import PillarsStep from '@/components/steps/PillarsStep';
import InitiativesStep from '@/components/steps/InitiativesStep';
import StoriesStep from '@/components/steps/StoriesStep';
import OutputStep from '@/components/steps/OutputStep';

const initialStrategy: Strategy = {
  companyName: '',
  industry: '',
  businessBackground: '',
  visionClients: '',
  visionPeople: '',
  visionStakeholders: '',
  pillars: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const initialState: WizardState = {
  currentStep: 1,
  strategy: initialStrategy,
  isComplete: false,
};

function wizardReducer(state: WizardState, action: any): WizardState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.step };
    case 'UPDATE_STRATEGY':
      const updatedStrategy = {
        ...state.strategy,
        ...action.data,
        updatedAt: new Date().toISOString(),
      };
      return { ...state, strategy: updatedStrategy };
    case 'LOAD_STRATEGY':
      return { ...state, strategy: action.strategy };
    case 'RESET':
      return initialState;
    case 'COMPLETE':
      return { ...state, isComplete: true };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && (state.strategy.companyName || state.strategy.industry || state.strategy.businessBackground)) {
      localStorage.setItem('strategy-wizard', JSON.stringify(state));
    }
  }, [state]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('strategy-wizard');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          dispatch({ type: 'LOAD_STRATEGY', strategy: parsed.strategy });
          dispatch({ type: 'SET_STEP', step: parsed.currentStep });
        } catch (e) {
          console.warn('Failed to parse saved strategy:', e);
        }
      }
    }
  }, []);

  const nextStep = () => {
    if (state.currentStep < STEPS.length) {
      dispatch({ type: 'SET_STEP', step: state.currentStep + 1 });
    }
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      dispatch({ type: 'SET_STEP', step: state.currentStep - 1 });
    }
  };

  const updateStrategy = (data: Partial<Strategy>) => {
    dispatch({ type: 'UPDATE_STRATEGY', data });
  };

  const resetStrategy = () => {
    if (confirm('Are you sure you want to start over? This will delete all your current work.')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('strategy-wizard');
      }
      dispatch({ type: 'RESET' });
    }
  };

  const goToStep = (step: number) => {
    dispatch({ type: 'SET_STEP', step });
  };

  const currentStepData = STEPS[state.currentStep - 1];
  const progressPercentage = (state.currentStep / STEPS.length) * 100;

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <WelcomeStep
            onStart={nextStep}
            hasSavedData={typeof window !== 'undefined' ? !!localStorage.getItem('strategy-wizard') : false}
            onContinue={() => {
              if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('strategy-wizard');
                if (saved) {
                  const parsed = JSON.parse(saved);
                  dispatch({ type: 'SET_STEP', step: parsed.currentStep });
                }
              }
            }}
          />
        );
      case 2:
        return (
          <ContextStep
            strategy={state.strategy}
            onUpdate={updateStrategy}
            onAiDraft={(data) => {
              updateStrategy(data);
              dispatch({ type: 'SET_STEP', step: 7 });
            }}
          />
        );
      case 3:
        return (
          <VisionStep
            strategy={state.strategy}
            onUpdate={updateStrategy}
          />
        );
      case 4:
        return (
          <PillarsStep
            strategy={state.strategy}
            onUpdate={updateStrategy}
          />
        );
      case 5:
        return (
          <InitiativesStep
            strategy={state.strategy}
            onUpdate={updateStrategy}
          />
        );
      case 6:
        return (
          <StoriesStep
            strategy={state.strategy}
            onUpdate={updateStrategy}
          />
        );
      case 7:
        return (
          <OutputStep
            strategy={state.strategy}
            onUpdate={updateStrategy}
            onEdit={() => goToStep(2)}
            onReset={resetStrategy}
          />
        );
      default:
        return null;
    }
  };

  const canGoNext = () => {
    switch (state.currentStep) {
      case 2:
        return state.strategy.companyName && state.strategy.industry;
      case 3:
        return state.strategy.visionClients && state.strategy.visionPeople && state.strategy.visionStakeholders;
      case 4:
        return state.strategy.pillars.length >= 2;
      case 5:
        return state.strategy.pillars.every(pillar => pillar.initiatives.length > 0);
      case 6:
        return state.strategy.pillars.every(pillar => 
          pillar.stories.communication && pillar.stories.connection && pillar.stories.consistency
        );
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Progress Bar - Hidden on Welcome and Output steps */}
      {state.currentStep !== 1 && state.currentStep !== 7 && (
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-slate-800">
                Step {currentStepData.number}: {currentStepData.name}
              </h2>
              <span className="text-sm text-slate-500">
                {state.currentStep} of {STEPS.length}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between mt-2">
              {STEPS.map((step) => (
                <button
                  key={step.key}
                  onClick={() => step.number <= state.currentStep && goToStep(step.number)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    step.number === state.currentStep
                      ? 'bg-slate-800 text-white'
                      : step.number < state.currentStep
                      ? 'bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer'
                      : 'text-slate-400 cursor-not-allowed'
                  }`}
                  disabled={step.number > state.currentStep}
                >
                  {step.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {renderStep()}

        {/* Navigation - Hidden on Welcome and Output steps */}
        {state.currentStep !== 1 && state.currentStep !== 7 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={state.currentStep === 1}
                >
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={state.currentStep === STEPS.length || !canGoNext()}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  {state.currentStep === STEPS.length - 1 ? 'Complete Strategy' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-6 print:hidden">
        <div className="max-w-4xl mx-auto text-center text-sm text-slate-500">
          <span>Powered by </span>
          <a 
            href="https://grapl.ai" 
            className="text-blue-600 hover:text-blue-700 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Grapl
          </a>
        </div>
      </footer>
    </div>
  );
}