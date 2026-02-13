import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Strategy } from '@/types/strategy';

interface VisionStepProps {
  strategy: Strategy;
  onUpdate: (data: Partial<Strategy>) => void;
}

export default function VisionStep({ strategy, onUpdate }: VisionStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">Vision</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Your vision describes the future state you're building toward. Think 3-5 years out. 
          What will success look like for each of these key groups?
        </p>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900 flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-semibold">C</span>
              </div>
              For Our Clients
            </CardTitle>
            <CardDescription className="text-blue-700">
              What will your clients' world look like? How will their experience be transformed? 
              What problems will be solved that don't get solved today?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={strategy.visionClients}
              onChange={(e) => onUpdate({ visionClients: e.target.value })}
              placeholder="e.g., Our clients will have complete confidence in their project outcomes. They'll spend 80% less time on status updates and administrative overhead, allowing them to focus on strategic work that drives their business forward."
              rows={3}
              className="text-base bg-white border-blue-200 focus:border-blue-400"
            />
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg text-green-900 flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-semibold">P</span>
              </div>
              For Our People
            </CardTitle>
            <CardDescription className="text-green-700">
              What will your employees experience? How will they grow? 
              What kind of culture and opportunities will they have?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={strategy.visionPeople}
              onChange={(e) => onUpdate({ visionPeople: e.target.value })}
              placeholder="e.g., Our team will be recognized as industry experts who continuously learn and grow. They'll have autonomy to solve complex problems, access to cutting-edge tools, and clear paths for career advancement in a supportive, innovative environment."
              rows={3}
              className="text-base bg-white border-green-200 focus:border-green-400"
            />
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg text-purple-900 flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-semibold">S</span>
              </div>
              For Our Stakeholders
            </CardTitle>
            <CardDescription className="text-purple-700">
              What value will stakeholders (investors, partners, community) see? 
              What impact will you have on the broader ecosystem?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={strategy.visionStakeholders}
              onChange={(e) => onUpdate({ visionStakeholders: e.target.value })}
              placeholder="e.g., We'll be the trusted partner that consistently delivers profitable growth while contributing to our community. Investors will see sustainable returns, partners will benefit from our innovation, and we'll set new standards for responsible business practices."
              rows={3}
              className="text-base bg-white border-purple-200 focus:border-purple-400"
            />
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900">Vision Writing Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-amber-800">
            <ul className="space-y-2 text-sm">
              <li>• <strong>Be specific:</strong> Avoid generic statements. What exactly will be different?</li>
              <li>• <strong>Think outcomes:</strong> Focus on the end state, not the activities to get there.</li>
              <li>• <strong>Make it inspiring:</strong> This should motivate your team and excite stakeholders.</li>
              <li>• <strong>Keep it realistic:</strong> Ambitious but achievable within 3-5 years.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Validation */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <h4 className="font-medium text-slate-800 mb-2">Required to Continue:</h4>
          <ul className="space-y-1 text-sm text-slate-600">
            <li className={`flex items-center ${strategy.visionClients ? 'text-green-700' : ''}`}>
              <span className={`mr-2 ${strategy.visionClients ? '✓' : '○'}`}></span>
              Vision for clients
            </li>
            <li className={`flex items-center ${strategy.visionPeople ? 'text-green-700' : ''}`}>
              <span className={`mr-2 ${strategy.visionPeople ? '✓' : '○'}`}></span>
              Vision for people
            </li>
            <li className={`flex items-center ${strategy.visionStakeholders ? 'text-green-700' : ''}`}>
              <span className={`mr-2 ${strategy.visionStakeholders ? '✓' : '○'}`}></span>
              Vision for stakeholders
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}