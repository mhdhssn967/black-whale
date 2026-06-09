import React from 'react';
import { Sparkles, Award, IndianRupee, X } from 'lucide-react';

export default function ProfileSidebar({
  startup,
  editForm,
  isEditing,
  handleInputChange,
  handleScoreChange,
  handleAiGeneratedChange,
  handleAddHighlight,
  handleRemoveHighlight,
  newHighlight,
  setNewHighlight
}) {
  const renderScorecardGauge = (label, score, colorClass = "from-indigo-500 to-indigo-600", key = "") => {
    return (
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-3.5 flex flex-col relative overflow-hidden shadow-sm">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
          <span>{label}</span>
          <span className="font-mono text-sm text-slate-900 font-bold">{score}%</span>
        </div>
        
        {isEditing ? (
          <div className="mt-1">
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={score} 
              onChange={(e) => handleScoreChange(key, e.target.value)}
              className="w-full accent-indigo-500 cursor-pointer h-1.5 rounded-full"
            />
          </div>
        ) : (
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-350">
            <div 
              className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-500`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* AI Scorecard panel */}
      <div className="glass-panel rounded-2xl p-6 shadow-md relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 border-b border-slate-200 pb-3">
          <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2 font-display">
            <Sparkles className="w-4.5 h-4.5 text-indigo-600 animate-pulse" />
            <span>AI Scorecard</span>
          </h3>
          <span className="text-[10px] text-slate-500 uppercase font-semibold">
            Guidance Metrics
          </span>
        </div>

        {/* Gauges */}
        <div className="space-y-4">
          {renderScorecardGauge("Market Potential", isEditing ? editForm.scorecards.marketPotential : startup.scorecards.marketPotential, "from-indigo-500 to-indigo-600", "marketPotential")}
          {renderScorecardGauge("Scalability", isEditing ? editForm.scorecards.scalability : startup.scorecards.scalability, "from-indigo-500 to-cyan-500", "scalability")}
          {renderScorecardGauge("Innovation Level", isEditing ? editForm.scorecards.innovationLevel : startup.scorecards.innovationLevel, "from-cyan-500 to-cyan-400", "innovationLevel")}
          {renderScorecardGauge("Investor Readiness", isEditing ? editForm.scorecards.readiness : startup.scorecards.readiness, "from-emerald-500 to-teal-400", "readiness")}
        </div>

        <div className="mt-5 p-3 rounded-lg bg-slate-100 border border-slate-200 text-[10px] text-slate-500 text-center leading-normal">
          Disclaimer: Scores are generated from algorithmic assessment of profile completion, team depth, category density, and description sentiment.
        </div>
      </div>

      {/* Investment Highlights */}
      <div className="glass-panel rounded-2xl p-6 shadow-md">
        <h3 className="text-base font-bold text-slate-800 mb-4 border-b border-slate-200 pb-3 flex items-center space-x-2">
          <Award className="w-4 h-4 text-cyan-600" />
          <span>Investment Highlights</span>
        </h3>

        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              {editForm.aiGenerated.investmentHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2 bg-slate-100 p-2 border border-slate-200 rounded-lg text-xs">
                  <span className="flex-1 text-slate-700">{hl}</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveHighlight(idx)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                placeholder="Add highlight..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded text-xs font-bold"
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <ul className="space-y-3.5 pl-0 m-0 list-none">
            {startup.aiGenerated.investmentHighlights.map((hl, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs md:text-sm text-slate-700">
                <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-cyan-500"></span>
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Funding Information */}
      <div className="glass-panel rounded-2xl p-6 shadow-md">
        <h3 className="text-base font-bold text-slate-800 mb-4 border-b border-slate-200 pb-3 flex items-center space-x-2">
          <IndianRupee className="w-4 h-4 text-cyan-600" />
          <span>Funding Requirements</span>
        </h3>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                TARGET CAPITAL
              </span>
              <span className="font-mono text-base font-bold text-slate-900 flex items-center">
                ₹{isEditing ? (
                  <input
                    type="text"
                    name="fundingRequirement"
                    value={editForm.fundingRequirement || editForm.askAmount || ""}
                    onChange={handleInputChange}
                    className="bg-transparent border-b border-slate-300 w-full text-slate-900 focus:outline-none ml-1"
                  />
                ) : (
                  Number(startup.fundingRequirement || startup.askAmount || 0).toLocaleString('en-IN')
                )}
              </span>
            </div>

            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                FUNDING STAGE
              </span>
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wide">
                {startup.fundingStage || startup.stage}
              </span>
            </div>

            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 col-span-2 grid grid-cols-2 gap-4 shadow-sm">
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                  CAPITAL RAISED
                </span>
                <span className="font-mono text-sm font-bold text-emerald-600 flex items-center">
                  ₹{isEditing ? (
                    <input
                      type="text"
                      name="capitalRaised"
                      value={editForm.capitalRaised || ""}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-slate-300 w-full text-slate-900 focus:outline-none ml-1"
                    />
                  ) : (
                    startup.capitalRaised ? Number(startup.capitalRaised).toLocaleString('en-IN') : "0"
                  )}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                  CURRENT REVENUE
                </span>
                <span className="font-mono text-sm font-bold text-slate-800">
                  {isEditing ? (
                    <input
                      type="text"
                      name="currentRevenue"
                      value={editForm.currentRevenue || ""}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-slate-300 w-full text-slate-900 focus:outline-none"
                    />
                  ) : (
                    startup.currentRevenue ? `${startup.currentRevenue.toString().startsWith('₹') ? '' : '₹'}${startup.currentRevenue}` : "Pre-Revenue"
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Use of Funds details */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
              Intended Capital Allocation
            </span>
            
            {isEditing ? (
              <textarea
                value={editForm.aiGenerated?.intendedUseOfFunds || ""}
                onChange={(e) => handleAiGeneratedChange("intendedUseOfFunds", e.target.value)}
                rows="4"
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-indigo-500"
              ></textarea>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">
                {startup.aiGenerated?.intendedUseOfFunds || "Capital allocation plan generated automatically from budget projections."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
