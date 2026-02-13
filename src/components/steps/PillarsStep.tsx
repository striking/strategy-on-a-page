import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Strategy, Pillar } from '@/types/strategy';
import { Trash2, Plus } from 'lucide-react';

interface PillarsStepProps {
  strategy: Strategy;
  onUpdate: (data: Partial<Strategy>) => void;
}

export default function PillarsStep({ strategy, onUpdate }: PillarsStepProps) {
  const [newPillarName, setNewPillarName] = useState('');

  const addPillar = () => {
    if (newPillarName.trim() && strategy.pillars.length < 4) {
      const newPillar: Pillar = {
        id: Date.now().toString(),
        name: newPillarName.trim(),
        description: '',
        initiatives: [],
        stories: {
          communication: '',
          connection: '',
          consistency: '',
        },
      };

      onUpdate({ pillars: [...strategy.pillars, newPillar] });
      setNewPillarName('');
    }
  };

  const updatePillar = (id: string, updates: Partial<Pillar>) => {
    const updatedPillars = strategy.pillars.map(pillar =>
      pillar.id === id ? { ...pillar, ...updates } : pillar
    );
    onUpdate({ pillars: updatedPillars });
  };

  const deletePillar = (id: string) => {
    const updatedPillars = strategy.pillars.filter(pillar => pillar.id !== id);
    onUpdate({ pillars: updatedPillars });
  };

  const canAddMore = strategy.pillars.length < 4;
  const needsMorePillars = strategy.pillars.length < 2;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">Strategic Pillars</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Choose 3-4 strategic priorities that move you toward your vision. 
          They must reinforce each other, not compete for resources.
        </p>
      </div>

      {/* Pillar Count Status */}
      <div className="flex justify-center">
        <Badge 
          variant={needsMorePillars ? "destructive" : "secondary"} 
          className="px-4 py-1"
        >
          {strategy.pillars.length} of 4 pillars defined
          {needsMorePillars && " (minimum 2 recommended)"}
        </Badge>
      </div>

      {/* Add New Pillar */}
      {canAddMore && (
        <Card className="border-dashed border-2 border-slate-300 bg-slate-50 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-slate-400 mr-2" />
                <h3 className="text-lg font-medium text-slate-600">Add Strategic Pillar</h3>
              </div>
              <div className="flex space-x-3">
                <Input
                  value={newPillarName}
                  onChange={(e) => setNewPillarName(e.target.value)}
                  placeholder="e.g., Customer Experience, Product Innovation, Operational Excellence"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addPillar()}
                />
                <Button 
                  onClick={addPillar}
                  disabled={!newPillarName.trim()}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Add Pillar
                </Button>
              </div>
              {!canAddMore && (
                <p className="text-sm text-amber-600 text-center">
                  Maximum of 4 pillars reached
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Pillars */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {strategy.pillars.map((pillar, index) => (
          <Card key={pillar.id} className="border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">Pillar {index + 1}</CardTitle>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deletePillar(pillar.id)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Pillar Name *
                </label>
                <Input
                  value={pillar.name}
                  onChange={(e) => updatePillar(pillar.id, { name: e.target.value })}
                  placeholder="Name your strategic pillar"
                  className="font-medium"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Description *
                </label>
                <Textarea
                  value={pillar.description}
                  onChange={(e) => updatePillar(pillar.id, { description: e.target.value })}
                  placeholder="Briefly describe what this pillar means and why it's critical to your vision."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Guidance */}
      {strategy.pillars.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900">Pillar Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="text-amber-800">
            <ul className="space-y-2 text-sm">
              <li>• <strong>Mutually reinforcing:</strong> Each pillar should support the others, not compete</li>
              <li>• <strong>Strategic, not tactical:</strong> These are big themes, not specific projects</li>
              <li>• <strong>Connected to vision:</strong> Each pillar should clearly advance your vision</li>
              <li>• <strong>Memorable:</strong> Your team should be able to recall and explain each pillar</li>
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Validation */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-2xl mx-auto">
        <h4 className="font-medium text-slate-800 mb-2">Required to Continue:</h4>
        <ul className="space-y-1 text-sm text-slate-600">
          <li className={`flex items-center ${strategy.pillars.length >= 2 ? 'text-green-700' : ''}`}>
            <span className={`mr-2 ${strategy.pillars.length >= 2 ? '✓' : '○'}`}></span>
            At least 2 pillars defined ({strategy.pillars.length}/4)
          </li>
          <li className={`flex items-center ${strategy.pillars.every(p => p.name && p.description) ? 'text-green-700' : ''}`}>
            <span className={`mr-2 ${strategy.pillars.every(p => p.name && p.description) ? '✓' : '○'}`}></span>
            All pillars have names and descriptions
          </li>
        </ul>
      </div>
    </div>
  );
}