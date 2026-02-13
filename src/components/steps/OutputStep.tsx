import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Strategy } from '@/types/strategy';
import { Printer, Edit, RotateCcw } from 'lucide-react';

interface OutputStepProps {
  strategy: Strategy;
  onUpdate: (data: Partial<Strategy>) => void;
  onEdit: () => void;
  onReset: () => void;
}

export default function OutputStep({ strategy, onUpdate, onEdit, onReset }: OutputStepProps) {
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar - Hidden in Print */}
      <div className="print:hidden bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Your Strategy is Complete! 🎉</h2>
            <p className="text-slate-600">Review, print, or make edits to your one-page strategy.</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onEdit} className="flex items-center">
              <Edit className="w-4 h-4 mr-2" />
              Edit Strategy
            </Button>
            <Button variant="outline" onClick={onReset} className="flex items-center text-red-600 border-red-200 hover:bg-red-50">
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
            <Button onClick={handlePrint} className="bg-slate-800 hover:bg-slate-900 text-white flex items-center">
              <Printer className="w-4 h-4 mr-2" />
              Print Strategy
            </Button>
          </div>
        </div>
      </div>

      {/* One-Page Strategy Output */}
      <div className="bg-white p-8 print:p-6 rounded-lg border print:border-none print:rounded-none print:shadow-none shadow-lg max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center border-b-2 border-slate-800 pb-6 mb-8">
          <h1 className="text-4xl print:text-3xl font-bold text-slate-800 mb-2">
            Strategy on a Page
          </h1>
          <h2 className="text-2xl print:text-xl text-slate-600 font-medium mb-3">
            {strategy.companyName}
          </h2>
          <div className="flex justify-center items-center space-x-6 text-sm text-slate-500">
            <span><strong>Industry:</strong> {strategy.industry}</span>
            <span><strong>Created:</strong> {formatDate(strategy.createdAt)}</span>
          </div>
        </div>

        {/* Business Context */}
        {strategy.businessBackground && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Business Context</h3>
            <p className="text-slate-700 leading-relaxed">{strategy.businessBackground}</p>
          </div>
        )}

        {/* Vision */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">Our Vision</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">C</span>
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">For Our Clients</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{strategy.visionClients}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">P</span>
              </div>
              <h4 className="font-semibold text-green-900 mb-2">For Our People</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{strategy.visionPeople}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">S</span>
              </div>
              <h4 className="font-semibold text-purple-900 mb-2">For Our Stakeholders</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{strategy.visionStakeholders}</p>
            </div>
          </div>
        </div>

        {/* Strategic Pillars */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Strategic Pillars</h3>
          <div className={`grid gap-6 ${strategy.pillars.length <= 2 ? 'md:grid-cols-2' : strategy.pillars.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
            {strategy.pillars.map((pillar, index) => (
              <div key={pillar.id} className="space-y-4">
                {/* Pillar Header */}
                <div className="text-center">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">{pillar.name}</h4>
                  <p className="text-sm text-slate-600 leading-tight">{pillar.description}</p>
                </div>

                {/* Initiatives */}
                {pillar.initiatives.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-slate-700 text-sm mb-2">Key Initiatives:</h5>
                    <ul className="space-y-1">
                      {pillar.initiatives.map((initiative, idx) => (
                        <li key={idx} className="text-xs text-slate-600 leading-tight flex items-start">
                          <span className="text-slate-400 mr-1 mt-0.5">•</span>
                          <span>{initiative}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stories (3 Cs) */}
                <div className="space-y-2">
                  <h5 className="font-semibold text-slate-700 text-sm">The 3 Cs:</h5>
                  
                  {pillar.stories.communication && (
                    <div>
                      <h6 className="text-xs font-medium text-blue-700 mb-1">Communication</h6>
                      <p className="text-xs text-slate-600 leading-tight">{pillar.stories.communication}</p>
                    </div>
                  )}
                  
                  {pillar.stories.connection && (
                    <div>
                      <h6 className="text-xs font-medium text-green-700 mb-1">Connection</h6>
                      <p className="text-xs text-slate-600 leading-tight">{pillar.stories.connection}</p>
                    </div>
                  )}
                  
                  {pillar.stories.consistency && (
                    <div>
                      <h6 className="text-xs font-medium text-purple-700 mb-1">Consistency</h6>
                      <p className="text-xs text-slate-600 leading-tight">{pillar.stories.consistency}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 pt-4 text-center">
          <p className="text-xs text-slate-500">
            Created with Strategy on a Page • {formatDate(strategy.updatedAt)}
          </p>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          body { 
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:p-6 {
            padding: 1.5rem !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:text-3xl {
            font-size: 1.875rem !important;
          }
          .print\\:text-xl {
            font-size: 1.25rem !important;
          }
          @page {
            margin: 0.5in;
            size: letter landscape;
          }
        }
      `}</style>
    </div>
  );
}