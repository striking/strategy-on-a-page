'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Strategy } from '@/types/strategy';

interface ContextStepProps {
  strategy: Strategy;
  onUpdate: (data: Partial<Strategy>) => void;
  onAiDraft?: (data: Partial<Strategy>) => void;
}

export default function ContextStep({ strategy, onUpdate, onAiDraft }: ContextStepProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = strategy.companyName.trim() && strategy.industry.trim();

  const handleAiDraft = async () => {
    if (!canGenerate) return;
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: strategy.companyName,
          industry: strategy.industry,
          businessBackground: strategy.businessBackground,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const aiStrategy = await res.json();

      // Merge AI-generated fields with existing context
      const merged: Partial<Strategy> = {
        visionClients: aiStrategy.visionClients,
        visionPeople: aiStrategy.visionPeople,
        visionStakeholders: aiStrategy.visionStakeholders,
        pillars: aiStrategy.pillars,
      };

      if (onAiDraft) {
        onAiDraft(merged);
      } else {
        onUpdate(merged);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">Business Context</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Let&apos;s start with the basics about your business. This context will frame your entire strategy.
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Company Name</CardTitle>
            <CardDescription>
              What&apos;s the name of your company or organization?
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

        {/* AI Draft Card */}
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <span className="mr-2">✨</span> AI-Powered Draft
            </CardTitle>
            <CardDescription>
              Let AI generate a complete strategy draft based on your business context.
              You can review and edit every section before printing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={handleAiDraft}
              disabled={!canGenerate || isGenerating}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 text-base disabled:bg-slate-300"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating your strategy...
                </span>
              ) : (
                'Generate AI Draft →'
              )}
            </Button>
            {!canGenerate && (
              <p className="text-xs text-slate-500 text-center">
                Fill in company name and industry above to enable AI generation.
              </p>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Validation Hints */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <h4 className="font-medium text-slate-800 mb-2">Required to Continue:</h4>
          <ul className="space-y-1 text-sm text-slate-600">
            <li className={`flex items-center ${strategy.companyName ? 'text-green-700' : ''}`}>
              <span className={`mr-2`}>{strategy.companyName ? '✓' : '○'}</span>
              Company name
            </li>
            <li className={`flex items-center ${strategy.industry ? 'text-green-700' : ''}`}>
              <span className={`mr-2`}>{strategy.industry ? '✓' : '○'}</span>
              Industry
            </li>
            <li className={`flex items-center ${strategy.businessBackground ? 'text-green-700' : 'text-slate-400'}`}>
              <span className={`mr-2`}>{strategy.businessBackground ? '✓' : '○'}</span>
              Business background (recommended)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
