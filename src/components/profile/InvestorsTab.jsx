import React from 'react';
import { Sparkles } from 'lucide-react';
import { mockInvestors, calculateMatchScore } from '../../data/mockInvestors';

export default function InvestorsTab({ startup, setActiveInvestor }) {
  return (
    <div className="space-y-6">
      <div className="p-5 bg-indigo-50 border border-indigo-100/50 rounded-2xl animate-fade-in shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center space-x-1.5 font-display">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Venture Capital Matchmaking Engine</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
          These institutional investors are selected based on sector affinity ({startup.industry || startup.segment}), funding stages ({startup.fundingStage}), target checks, and geographic markets. Click to visit their profile and submit a direct pitch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockInvestors
          .map(inv => ({
            ...inv,
            matchScore: calculateMatchScore(startup, inv)
          }))
          .sort((a, b) => b.matchScore - a.matchScore)
          .map((inv) => (
            <div key={inv.id} className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between border border-slate-200 relative overflow-hidden min-h-[240px] shadow-sm">
              <div className="absolute -right-12 -top-12 w-28 h-28 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-700 flex items-center justify-center font-black text-white text-base shadow-sm font-display">
                    {inv.avatar}
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10.5px] font-bold">
                    {inv.matchScore}% Match
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display m-0 leading-snug">{inv.name}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold m-0 mt-1">{inv.location}</p>
                </div>

                <p className="text-xs text-slate-650 line-clamp-2 leading-relaxed">
                  {inv.thesis}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {inv.focusSectors.slice(0, 2).map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 text-[9px] font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveInvestor(inv)}
                className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Visit Investor Profile
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
