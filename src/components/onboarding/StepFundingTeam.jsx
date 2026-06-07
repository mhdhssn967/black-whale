import React from 'react';
import { DollarSign, Upload } from 'lucide-react';

export default function StepFundingTeam({ formData, handleInputChange, fundingStages, pitchFile, handleFileChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white border-b border-slate-850 pb-3 flex items-center space-x-2">
        <DollarSign className="w-5 h-5 text-cyan-400" />
        <span>Step 3: Funding Metrics & Validation</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="fundingStage">
            Current Funding Stage <span className="text-cyan-400">*</span>
          </label>
          <select
            id="fundingStage"
            name="fundingStage"
            value={formData.fundingStage}
            onChange={handleInputChange}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 cursor-pointer"
          >
            {fundingStages.map((stage, i) => (
              <option key={i} value={stage} className="bg-slate-950 text-slate-300">
                {stage}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="fundingRequirement">
            Capital Requirement (USD) <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">
              $
            </span>
            <input
              type="text"
              id="fundingRequirement"
              name="fundingRequirement"
              value={formData.fundingRequirement}
              onChange={handleInputChange}
              placeholder="e.g. 1,500,000"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="capitalRaised">
            Capital Raised So Far (USD) <span className="text-slate-400">(Optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">
              $
            </span>
            <input
              type="text"
              id="capitalRaised"
              name="capitalRaised"
              value={formData.capitalRaised}
              onChange={handleInputChange}
              placeholder="e.g. 500,000"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="currentRevenue">
            Current Revenue (ARR/MRR) <span className="text-slate-400">(Optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">
              $
            </span>
            <input
              type="text"
              id="currentRevenue"
              name="currentRevenue"
              value={formData.currentRevenue}
              onChange={handleInputChange}
              placeholder="e.g. 10k MRR"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="teamInfo">
          Key Team Members & Bios <span className="text-cyan-400">*</span>
        </label>
        <textarea
          id="teamInfo"
          name="teamInfo"
          value={formData.teamInfo}
          onChange={handleInputChange}
          rows="3"
          placeholder="Share founders' names, roles, and quick highlights of their background (e.g. 'Jane Doe (CEO, ex-Google PM), John Doe (CTO, PhD at MIT)')"
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-y"
        ></textarea>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="customers">
          Traction, Existing Customers or Partnerships <span className="text-slate-400">(Optional)</span>
        </label>
        <input
          type="text"
          id="customers"
          name="customers"
          value={formData.customers}
          onChange={handleInputChange}
          placeholder="e.g. 15 pilot programs active, partnership with AWS, $5k monthly recurring revenue"
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="milestones">
          Milestones & Timeline <span className="text-slate-400">(Optional)</span>
        </label>
        <textarea
          id="milestones"
          name="milestones"
          value={formData.milestones}
          onChange={handleInputChange}
          rows="3"
          placeholder="e.g. 2022 - Founded, 2023 - MVP Released, 2024 - 10k Customers"
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-y"
        ></textarea>
      </div>

      {/* Pitch Deck Upload Section */}
      <div className="border border-dashed border-slate-850 bg-slate-950/40 rounded-xl p-6 flex flex-col items-center justify-center">
        <Upload className="w-8 h-8 text-cyan-400 mb-2.5" />
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
          Upload Pitch Deck (PDF)
        </p>
        <p className="text-[11px] text-slate-500 mb-4 text-center">
          Max file size 25MB. This file will be parsed to extract team and market data.
        </p>
        
        <label className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold rounded-lg cursor-pointer transition-all duration-300">
          <span>{pitchFile ? "Change Pitch Deck" : "Choose File"}</span>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {pitchFile && (
          <div className="mt-3 inline-flex items-center space-x-2 text-xs bg-cyan-950/40 text-cyan-300 border border-cyan-500/20 px-3 py-1.5 rounded-lg font-medium">
            <span>Attached: {pitchFile.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
