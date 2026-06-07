import React from 'react';
import { ShieldCheck, FileText, Globe, Award, Users, ExternalLink } from 'lucide-react';

export default function ProfileMainDetails({
  startup,
  editForm,
  isEditing,
  handleInputChange,
  handleAiGeneratedChange
}) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Company Overview */}
      <div className="glass-panel rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-850 pb-2.5 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Company Overview</span>
        </h3>
        {isEditing ? (
          <textarea
            value={editForm.aiGenerated.overview}
            onChange={(e) => handleAiGeneratedChange("overview", e.target.value)}
            rows="3"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
          ></textarea>
        ) : (
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            {startup.aiGenerated.overview}
          </p>
        )}
      </div>

      {/* Problem & Solution Split Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Statement */}
        <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-rose-500/50 shadow-md">
          <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Problem Statement</span>
          </h3>
          {isEditing ? (
            <textarea
              value={editForm.aiGenerated.problemStatement}
              onChange={(e) => handleAiGeneratedChange("problemStatement", e.target.value)}
              rows="5"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            ></textarea>
          ) : (
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {startup.aiGenerated.problemStatement}
            </p>
          )}
        </div>

        {/* Solution */}
        <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-emerald-500/50 shadow-md">
          <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>The Solution</span>
          </h3>
          {isEditing ? (
            <textarea
              value={editForm.aiGenerated.solutionDetails}
              onChange={(e) => handleAiGeneratedChange("solutionDetails", e.target.value)}
              rows="5"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            ></textarea>
          ) : (
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {startup.aiGenerated.solutionDetails}
            </p>
          )}
        </div>
      </div>

      {/* Product Overview (Screenshots and customer details) */}
      <div className="glass-panel rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-850 pb-2.5 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>Product Interface & Market Validation</span>
        </h3>

        {/* Screenshots Grid */}
        {startup.screenshots && startup.screenshots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {startup.screenshots.map((url, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden border border-slate-900 group aspect-video bg-slate-950">
                <img 
                  src={url} 
                  alt={`Product demo interface ${i + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent flex items-end p-3">
                  <span className="text-[10px] font-semibold text-slate-200 uppercase tracking-wider">
                    Screenshot {i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Customers & Partners traction text */}
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Current Customer Traction & Validation
          </h4>
          {isEditing ? (
            <input
              type="text"
              name="customers"
              value={editForm.customers}
              onChange={handleInputChange}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            />
          ) : (
            <p className="text-xs md:text-sm text-slate-400">
              {startup.customers || "Active testing and preliminary feedback loops."}
            </p>
          )}
          
          <div className="mt-3 pt-3 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Active Products</span>
              {isEditing ? (
                <input
                  type="number"
                  name="activeProducts"
                  value={editForm.activeProducts}
                  onChange={handleInputChange}
                  className="bg-slate-950 border border-slate-800 rounded w-16 px-2 py-0.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <span className="text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded">{startup.activeProducts || 0}</span>
              )}
            </h4>
          </div>
        </div>
      </div>

      {/* Market Opportunity & Business Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Opportunity */}
        <div className="glass-panel rounded-2xl p-6 shadow-md">
          <h3 className="text-base font-bold text-white mb-3.5 flex items-center space-x-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Market Opportunity</span>
          </h3>
          {isEditing ? (
            <textarea
              value={editForm.aiGenerated.marketOpportunity}
              onChange={(e) => handleAiGeneratedChange("marketOpportunity", e.target.value)}
              rows="4"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            ></textarea>
          ) : (
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {startup.aiGenerated.marketOpportunity}
            </p>
          )}
        </div>

        {/* Business Model */}
        <div className="glass-panel rounded-2xl p-6 shadow-md">
          <h3 className="text-base font-bold text-white mb-3.5 flex items-center space-x-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Business Model & Revenue</span>
          </h3>
          {isEditing ? (
            <textarea
              value={editForm.aiGenerated.businessModelDetails}
              onChange={(e) => handleAiGeneratedChange("businessModelDetails", e.target.value)}
              rows="4"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            ></textarea>
          ) : (
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {startup.aiGenerated.businessModelDetails}
            </p>
          )}
        </div>
      </div>

      {/* Competitive Advantage */}
      <div className="glass-panel rounded-2xl p-6 shadow-md">
        <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Competitive Advantage</span>
        </h3>
        {isEditing ? (
          <textarea
            name="competitiveAdvantage"
            value={editForm.competitiveAdvantage || editForm.aiGenerated.competitiveAdvantage}
            onChange={handleInputChange}
            rows="3"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          ></textarea>
        ) : (
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {startup.competitiveAdvantage || startup.aiGenerated.competitiveAdvantage}
          </p>
        )}
      </div>

      {/* Milestones & Timeline */}
      <div className="glass-panel rounded-2xl p-6 shadow-md">
        <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>Milestones & Timeline</span>
        </h3>
        {isEditing ? (
          <textarea
            name="milestones"
            value={editForm.milestones}
            onChange={handleInputChange}
            rows="3"
            placeholder="e.g. 2022 - Founded, 2023 - MVP Released, 2024 - 10k Customers"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          ></textarea>
        ) : (
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {startup.milestones || "No milestones recorded yet."}
          </p>
        )}
      </div>

      {/* Team Information */}
      <div className="glass-panel rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-850 pb-2.5 flex items-center space-x-2">
          <Users className="w-4 h-4 text-indigo-400" />
          <span>Founding Team & Directors</span>
        </h3>
        {isEditing ? (
          <textarea
            name="teamInfo"
            value={editForm.teamInfo}
            onChange={handleInputChange}
            rows="3"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          ></textarea>
        ) : (
          <div className="space-y-4">
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {startup.teamInfo}
            </p>
            {startup.linkedin && (
              <a
                href={startup.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-300 border border-slate-850 bg-slate-900/60 px-3 py-1.5 rounded-lg"
              >
                <svg className="w-3.5 h-3.5 text-indigo-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>Company Linkedin Profile</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
