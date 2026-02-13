import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Strategy } from '@/types/strategy';

interface ContextStepProps {
  strategy: Strategy;
  onUpdate: (data: Partial<Strategy>) => void;
}

export default function ContextStep({ strategy, onUpdate }: ContextStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">Business Context</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Let's start with the basics about your business. This context will frame your entire strategy.
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Company Name</CardTitle>
            <CardDescription>
              What's the name of your company or organization?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              value={strategy.companyName}
              onChange={(e) => onUpdate({ companyName: e.target.value })}
              placeholder="e.g., Acme Corporation"
              className="text-lg"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Industry</CardTitle>
            <CardDescription>
              What industry or sector do you operate in?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              value={strategy.industry}
              onChange={(e) => onUpdate({ industry: e.target.value })}
              placeholder="e.g., Software Technology, Healthcare, Manufacturing"
              className="text-lg"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Business Background</CardTitle>
            <CardDescription>
              Provide a brief description of your business, its purpose, and current state. 
              Keep it to 2-3 sentences that capture the essence of what you do.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={strategy.businessBackground}
              onChange={(e) => onUpdate({ businessBackground: e.target.value })}
              placeholder="e.g., We provide cloud-based project management software for small to medium businesses. Founded in 2018, we serve over 5,000 customers across North America and are looking to expand internationally while improving our product offering."
              rows={4}
              className="text-base"
            />
            <div className="flex justify-between text-sm text-slate-500">
              <span>Aim for 2-3 sentences that provide essential context</span>
              <span>{strategy.businessBackground.length} characters</span>
            </div>
          </CardContent>
        </Card>

        {/* Validation Hints */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <h4 className="font-medium text-slate-800 mb-2">Required to Continue:</h4>
          <ul className="space-y-1 text-sm text-slate-600">
            <li className={`flex items-center ${strategy.companyName ? 'text-green-700' : ''}`}>
              <span className={`mr-2 ${strategy.companyName ? '✓' : '○'}`}></span>
              Company name
            </li>
            <li className={`flex items-center ${strategy.industry ? 'text-green-700' : ''}`}>
              <span className={`mr-2 ${strategy.industry ? '✓' : '○'}`}></span>
              Industry
            </li>
            <li className={`flex items-center ${strategy.businessBackground ? 'text-green-700' : 'text-slate-400'}`}>
              <span className={`mr-2 ${strategy.businessBackground ? '✓' : '○'}`}></span>
              Business background (recommended)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}