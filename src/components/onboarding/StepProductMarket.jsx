import React from 'react';
import { Briefcase } from 'lucide-react';

export default function StepProductMarket({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white border-b border-slate-850 pb-3 flex items-center space-x-2">
        <Briefcase className="w-5 h-5 text-indigo-400" />
        <span>Step 2: Value Proposition & Market Mechanics</span>
      </h3>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="problem">
            Problem Being Solved <span className="text-indigo-400">*</span>
          </label>
          <span className="text-[10px] text-slate-500">{formData.problem.length} chars</span>
        </div>
        <textarea
          id="problem"
          name="problem"
          value={formData.problem}
          onChange={handleInputChange}
          rows="3"
          placeholder="What critical market gap or customer pain points are you addressing? Be specific."
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-y"
        ></textarea>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="solution">
            Solution Description <span className="text-indigo-400">*</span>
          </label>
          <span className="text-[10px] text-slate-500">{formData.solution.length} chars</span>
        </div>
        <textarea
          id="solution"
          name="solution"
          value={formData.solution}
          onChange={handleInputChange}
          rows="3"
          placeholder="How does your product solve the problem? What is the product experience and technical approach?"
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-y"
        ></textarea>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="targetMarket">
          Target Market & Demographics <span className="text-indigo-400">*</span>
        </label>
        <input
          type="text"
          id="targetMarket"
          name="targetMarket"
          value={formData.targetMarket}
          onChange={handleInputChange}
          placeholder="e.g. Mid-market healthcare providers, global remote-first tech companies (TAM $10B)"
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="revenueModel">
          Revenue Model <span className="text-indigo-400">*</span>
        </label>
        <input
          type="text"
          id="revenueModel"
          name="revenueModel"
          value={formData.revenueModel}
          onChange={handleInputChange}
          placeholder="e.g. SaaS subscription starting at $49/seat/month, 2% transaction commission"
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="activeProducts">
          Active Products <span className="text-slate-400">(Optional)</span>
        </label>
        <input
          type="number"
          id="activeProducts"
          name="activeProducts"
          value={formData.activeProducts}
          onChange={handleInputChange}
          placeholder="e.g. 2"
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="competitiveAdvantage">
          Competitive Advantage <span className="text-indigo-400">*</span>
        </label>
        <textarea
          id="competitiveAdvantage"
          name="competitiveAdvantage"
          value={formData.competitiveAdvantage}
          onChange={handleInputChange}
          rows="3"
          placeholder="Why does your company win against competitors?"
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-y"
        ></textarea>
      </div>
    </div>
  );
}
