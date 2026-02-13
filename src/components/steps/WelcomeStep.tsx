import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WelcomeStepProps {
  onStart: () => void;
  hasSavedData: boolean;
  onContinue: () => void;
}

export default function WelcomeStep({ onStart, hasSavedData, onContinue }: WelcomeStepProps) {
  return (
    <div className="text-center space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-slate-800 tracking-tight">
          Strategy on a Page
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Transform your business strategy into a clear, one-page plan that guides every decision and aligns your entire team.
        </p>
      </div>

      {/* Framework Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
              <span className="text-white font-bold text-lg">1</span>
            </div>
            <CardTitle className="text-lg text-blue-900">Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-blue-700">
              Define the future you're building for clients, people, and stakeholders.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2">
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <CardTitle className="text-lg text-green-900">Pillars</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-green-700">
              Choose 3-4 strategic priorities that move you toward your vision.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
              <span className="text-white font-bold text-lg">3</span>
            </div>
            <CardTitle className="text-lg text-purple-900">Initiatives</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-purple-700">
              Identify key moves that will advance each strategic pillar.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-2">
              <span className="text-white font-bold text-lg">4</span>
            </div>
            <CardTitle className="text-lg text-amber-900">Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-amber-700">
              Craft the 3 Cs: Communication, Connection, and Consistency.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="space-y-6">
        {hasSavedData && (
          <Card className="bg-blue-50 border-blue-200 max-w-md mx-auto">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Draft Found
                  </Badge>
                  <span className="text-sm text-blue-700">Continue where you left off</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onContinue}
                  className="border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  Continue Strategy
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Button 
          size="lg" 
          onClick={onStart}
          className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg font-semibold"
        >
          Create Your Strategy
        </Button>

        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          This wizard will guide you through Alex Brueckmann's proven framework for creating a one-page business strategy. 
          Your progress is automatically saved as you work.
        </p>
      </div>
    </div>
  );
}