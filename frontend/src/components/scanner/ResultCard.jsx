import React from 'react';
import { Leaf, AlertTriangle, Recycle, Trash2, CheckCircle2 } from 'lucide-react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-[0_5px_30px_rgba(0,0,0,0.3)] overflow-hidden rounded-2xl">
      <div className="bg-primary-900/20 p-6 border-b border-primary-900/50 relative overflow-hidden">
        {/* Subtle grid background for terminal effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{result.category_icon}</span>
            <div>
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wide break-words">{result.item}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-primary-900/40 border border-primary-500/30 text-primary-400 rounded-md font-mono text-xs font-bold tracking-tight uppercase">
                  {result.category}
                </span>
                {result.is_recyclable && (
                  <span className="px-3 py-1 bg-green-900/40 border border-green-500/30 text-green-400 rounded-md font-mono text-xs font-bold tracking-tight uppercase flex items-center gap-1">
                    <Recycle className="w-3 h-3" /> Recyclable
                  </span>
                )}
                {result.is_hazardous && (
                  <span className="px-3 py-1 bg-red-900/40 border border-red-500/30 text-red-400 rounded-md font-mono text-xs font-bold tracking-tight uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Hazardous
                  </span>
                )}
                {result.is_reusable && (
                  <span className="px-3 py-1 bg-blue-900/40 border border-blue-500/30 text-blue-400 rounded-md font-mono text-xs font-bold tracking-tight uppercase flex items-center gap-1">
                    <Leaf className="w-3 h-3" /> Reusable
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-white dark:bg-zinc-900/90">
        {/* Disposal Instructions */}
        <div>
          <h4 className="flex items-center gap-2 text-xl font-heading font-semibold text-gray-900 dark:text-zinc-100 mb-2 uppercase tracking-wide">
            <Trash2 className="w-5 h-5 text-primary-500" />
            Disposal Instructions
          </h4>
          <p className="text-gray-700 dark:text-zinc-300 font-sans bg-white dark:bg-zinc-950 p-4 rounded-lg border border-gray-200 dark:border-zinc-800 leading-relaxed break-words">
            {result.disposal_instructions}
          </p>
        </div>

        {/* Recycling Steps */}
        {result.recycling_steps && result.recycling_steps.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-xl font-heading font-semibold text-gray-900 dark:text-zinc-100 mb-2 uppercase tracking-wide">
              <Recycle className="w-5 h-5 text-primary-500" />
              Recycling Steps
            </h4>
            <ul className="space-y-2">
              {result.recycling_steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-zinc-300 font-sans leading-relaxed break-words">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hazard Warning */}
        {result.hazard_warning && (
          <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-heading font-bold text-red-400 uppercase tracking-wide text-lg">Hazard Warning</h4>
              <p className="text-red-300 font-sans text-sm mt-1 leading-relaxed break-words">{result.hazard_warning}</p>
            </div>
          </div>
        )}

        {/* Eco Suggestions */}
        {result.eco_suggestions && result.eco_suggestions.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-xl font-heading font-semibold text-gray-900 dark:text-zinc-100 mb-2 uppercase tracking-wide">
              <Leaf className="w-5 h-5 text-primary-500" />
              Eco Suggestions
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-zinc-300 font-sans marker:text-primary-600">
              {result.eco_suggestions.map((sug, idx) => (
                <li key={idx} className="pl-1 leading-relaxed break-words">{sug}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Accepted Facilities */}
        {result.accepted_at && result.accepted_at.length > 0 && (
          <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 mt-6">
            <h4 className="text-sm font-mono font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-4">
              Accepted Facilities
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.accepted_at.map((facility, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 rounded-md font-mono text-xs uppercase tracking-tight">
                  {facility}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
