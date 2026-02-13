import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Strategy } from '@/types/strategy';
import { MessageCircle, Users, Clock } from 'lucide-react';

interface StoriesStepProps {
  strategy: Strategy;
  onUpdate: (data: Partial<Strategy>) => void;
}

export default function StoriesStep({ strategy, onUpdate }: StoriesStepProps) {
  const updatePillarStory = (pillarId: string, storyType: 'communication' | 'connection' | 'consistency', value: string) => {
    const updatedPillars = strategy.pillars.map(pillar => {
      if (pillar.id === pillarId) {
        return {
          ...pillar,
          stories: {
            ...pillar.stories,
            [storyType]: value
          }
        };
      }
      return pillar;
    });

    onUpdate({ pillars: updatedPillars });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">Stories (The 3 Cs)</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          For each pillar, define how it will come alive through Communication, Connection, and Consistency. 
          These are the stories that make your strategy memorable and actionable.
        </p>
      </div>

      {/* The 3 Cs Overview */}
      <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-900">Communication</h4>
            <p className="text-sm text-blue-700">What story will people remember?</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-green-900">Connection</h4>
            <p className="text-sm text-green-700">How does every role connect?</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-900">Consistency</h4>
            <p className="text-sm text-purple-700">How will this show up daily?</p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue={strategy.pillars[0]?.id} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-auto">
            {strategy.pillars.map((pillar, index) => {
              const storiesComplete = pillar.stories.communication && pillar.stories.connection && pillar.stories.consistency;
              return (
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
                    variant={storiesComplete ? "default" : "secondary"}
                    className={`mt-1 text-xs ${storiesComplete ? 'bg-green-600' : ''}`}
                  >
                    {storiesComplete ? 'Complete' : 'In Progress'}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {strategy.pillars.map((pillar) => (
            <TabsContent key={pillar.id} value={pillar.id} className="space-y-6">
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
              </Card>

              {/* Communication */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900 flex items-center">
                    <MessageCircle className="w-6 h-6 mr-3" />
                    Communication Story
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    What story will you tell that people remember? How will you communicate this pillar 
                    in a way that sticks and inspires action?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={pillar.stories.communication}
                    onChange={(e) => updatePillarStory(pillar.id, 'communication', e.target.value)}
                    placeholder="e.g., 'We're building the Netflix of project management - where every interaction feels magical and effortless. When clients think about project tools, they'll think about the joy and simplicity we bring to their daily work.'"
                    rows={3}
                    className="text-base bg-white border-blue-200 focus:border-blue-400"
                  />
                </CardContent>
              </Card>

              {/* Connection */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg text-green-900 flex items-center">
                    <Users className="w-6 h-6 mr-3" />
                    Connection Point
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    How does every role in your organization connect to this pillar? 
                    What's the clear line from individual work to this strategic priority?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={pillar.stories.connection}
                    onChange={(e) => updatePillarStory(pillar.id, 'connection', e.target.value)}
                    placeholder="e.g., 'Engineers see their code quality reflected in customer happiness scores. Sales feels customer excitement in every demo. Support agents become product champions who shape our roadmap. Everyone owns a piece of the customer experience.'"
                    rows={3}
                    className="text-base bg-white border-green-200 focus:border-green-400"
                  />
                </CardContent>
              </Card>

              {/* Consistency */}
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-900 flex items-center">
                    <Clock className="w-6 h-6 mr-3" />
                    Consistency Ritual
                  </CardTitle>
                  <CardDescription className="text-purple-700">
                    How will this pillar show up in every meeting, decision, and daily routine? 
                    What habits and rituals will keep this top of mind?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={pillar.stories.consistency}
                    onChange={(e) => updatePillarStory(pillar.id, 'consistency', e.target.value)}
                    placeholder="e.g., Every feature discussion starts with 'How does this improve the customer's day?' We review NPS scores in weekly all-hands. Customer stories open every quarterly review. Our office walls display customer success stories, not just metrics."
                    rows={3}
                    className="text-base bg-white border-purple-200 focus:border-purple-400"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Tips */}
      <Card className="border-amber-200 bg-amber-50 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg text-amber-900">Story Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-amber-800">
          <ul className="space-y-2 text-sm">
            <li>• <strong>Communication:</strong> Make it memorable and emotional, not just logical</li>
            <li>• <strong>Connection:</strong> Show how daily work ladders up to strategic impact</li>
            <li>• <strong>Consistency:</strong> Create systems that reinforce the message repeatedly</li>
            <li>• <strong>Authenticity:</strong> Ensure these stories reflect your actual culture and values</li>
          </ul>
        </CardContent>
      </Card>

      {/* Validation */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-2xl mx-auto">
        <h4 className="font-medium text-slate-800 mb-2">Required to Continue:</h4>
        <ul className="space-y-1 text-sm text-slate-600">
          {strategy.pillars.map((pillar) => {
            const storiesComplete = pillar.stories.communication && pillar.stories.connection && pillar.stories.consistency;
            return (
              <li key={pillar.id} className={`flex items-center ${storiesComplete ? 'text-green-700' : ''}`}>
                <span className={`mr-2 ${storiesComplete ? '✓' : '○'}`}></span>
                {pillar.name}: All 3 Cs defined
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}