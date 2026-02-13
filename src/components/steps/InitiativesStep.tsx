import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Strategy } from '@/types/strategy';
import { Plus, X } from 'lucide-react';

interface InitiativesStepProps {
  strategy: Strategy;
  onUpdate: (data: Partial<Strategy>) => void;
}

export default function InitiativesStep({ strategy, onUpdate }: InitiativesStepProps) {
  const [newInitiatives, setNewInitiatives] = useState<{ [pillarId: string]: string }>({});

  const addInitiative = (pillarId: string) => {
    const initiativeText = newInitiatives[pillarId]?.trim();
    if (!initiativeText) return;

    const updatedPillars = strategy.pillars.map(pillar => {
      if (pillar.id === pillarId) {
        return {
          ...pillar,
          initiatives: [...pillar.initiatives, initiativeText]
        };
      }
      return pillar;
    });

    onUpdate({ pillars: updatedPillars });
    setNewInitiatives({ ...newInitiatives, [pillarId]: '' });
  };

  const removeInitiative = (pillarId: string, initiativeIndex: number) => {
    const updatedPillars = strategy.pillars.map(pillar => {
      if (pillar.id === pillarId) {
        return {
          ...pillar,
          initiatives: pillar.initiatives.filter((_, index) => index !== initiativeIndex)
        };
      }
      return pillar;
    });

    onUpdate({ pillars: updatedPillars });
  };

  const updateNewInitiative = (pillarId: string, value: string) => {
    setNewInitiatives({ ...newInitiatives, [pillarId]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">Key Initiatives</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          For each strategic pillar, identify the key moves that will advance your progress. 
          Focus on significant initiatives, not detailed project lists.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue={strategy.pillars[0]?.id} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-auto">
            {strategy.pillars.map((pillar, index) => (
              <TabsTrigger 
                key={pillar.id} 
                value={pillar.id} 
                className="flex flex-col items-start p-3 h-auto data-[state=active]:bg-blue-50 data-[state=active]:border-blue-200"
              >
                <div className="flex items-center w-full">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="font-medium text-sm truncate">{pillar.name}</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className="mt-1 text-xs"
                >
                  {pillar.initiatives.length} initiatives
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {strategy.pillars.map((pillar) => (
            <TabsContent key={pillar.id} value={pillar.id} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">
                        {strategy.pillars.findIndex(p => p.id === pillar.id) + 1}
                      </span>
                    </div>
                    {pillar.name}
                  </CardTitle>
                  <CardDescription className="ml-11">
                    {pillar.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="ml-11">
                  {/* Existing Initiatives */}
                  {pillar.initiatives.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-slate-700">Current Initiatives:</h4>
                      <div className="space-y-2">
                        {pillar.initiatives.map((initiative, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border"
                          >
                            <span className="text-sm flex-1">{initiative}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeInitiative(pillar.id, index)}
                              className="text-red-600 hover:bg-red-50 ml-2"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add New Initiative */}
                  {pillar.initiatives.length < 5 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-700 flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Initiative
                        {pillar.initiatives.length >= 5 && (
                          <Badge variant="secondary" className="ml-2">Max reached</Badge>
                        )}
                      </h4>
                      <div className="flex space-x-2">
                        <Input
                          value={newInitiatives[pillar.id] || ''}
                          onChange={(e) => updateNewInitiative(pillar.id, e.target.value)}
                          placeholder="e.g., Launch customer feedback platform, Implement AI chatbot, Redesign onboarding flow"
                          className="flex-1"
                          onKeyPress={(e) => e.key === 'Enter' && addInitiative(pillar.id)}
                        />
                        <Button
                          onClick={() => addInitiative(pillar.id)}
                          disabled={!newInitiatives[pillar.id]?.trim()}
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Add
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        Maximum 5 initiatives per pillar. Focus on the most impactful moves.
                      </p>
                    </div>
                  )}

                  {pillar.initiatives.length >= 5 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-sm text-amber-800">
                        You've reached the maximum of 5 initiatives for this pillar. 
                        Consider if any can be combined or if some are less critical.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Guidelines */}
      <Card className="border-amber-200 bg-amber-50 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg text-amber-900">Initiative Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-amber-800">
          <ul className="space-y-2 text-sm">
            <li>• <strong>Strategic moves:</strong> Each initiative should meaningfully advance the pillar</li>
            <li>• <strong>Specific enough:</strong> Clear what needs to happen, but not overly detailed</li>
            <li>• <strong>Limited scope:</strong> 2-5 initiatives per pillar keeps focus sharp</li>
            <li>• <strong>Resource conscious:</strong> Consider if your team can realistically execute these</li>
          </ul>
        </CardContent>
      </Card>

      {/* Validation */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-2xl mx-auto">
        <h4 className="font-medium text-slate-800 mb-2">Required to Continue:</h4>
        <ul className="space-y-1 text-sm text-slate-600">
          {strategy.pillars.map((pillar, index) => (
            <li key={pillar.id} className={`flex items-center ${pillar.initiatives.length > 0 ? 'text-green-700' : ''}`}>
              <span className={`mr-2 ${pillar.initiatives.length > 0 ? '✓' : '○'}`}></span>
              {pillar.name}: {pillar.initiatives.length} initiative{pillar.initiatives.length !== 1 ? 's' : ''}
            </li>
          ))}
        </ul>
        {strategy.pillars.every(pillar => pillar.initiatives.length > 0) && (
          <p className="text-green-700 text-sm mt-2 font-medium">✓ All pillars have initiatives defined</p>
        )}
      </div>
    </div>
  );
}