import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, MapPin, DollarSign, 
  Sparkles, Award, ArrowRight, ExternalLink, Filter 
} from 'lucide-react';

export default function InvestorDirectory({ startups, onSelectStartup, onToggleToFounder }) {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [minScore, setMinScore] = useState(70);
  const [maxFunding, setMaxFunding] = useState(6000000); // 6M max limit

  const industries = [
    "All",
    "SaaS & Enterprise Software",
    "FinTech & Blockchain",
    "ClimateTech & AgriTech",
    "HealthTech & BioTech",
    "Cybersecurity & Infrastructure",
    "AI & DeepTech",
    "Consumer Tech & E-Commerce"
  ];

  const stages = ["All", "Pre-seed", "Seed", "Series A", "Series B", "Bootstrapped"];

  // Filter logic
  const filteredStartups = startups.filter(startup => {
    // Only show published startups in the directory
    if (!startup.published) return false;

    // Search query
    const matchesSearch = 
      startup.name.toLowerCase().includes(search.toLowerCase()) ||
      startup.category.toLowerCase().includes(search.toLowerCase()) ||
      startup.aiGenerated.overview.toLowerCase().includes(search.toLowerCase()) ||
      startup.industry.toLowerCase().includes(search.toLowerCase());

    // Industry filter
    const matchesIndustry = selectedIndustry === "All" || startup.industry.includes(selectedIndustry);

    // Stage filter
    const matchesStage = selectedStage === "All" || startup.fundingStage === selectedStage;

    // Funding limit (clean up funding requirement from string)
    const rawRequirement = parseFloat(startup.fundingRequirement.replace(/[^0-9.]/g, "")) || 0;
    const matchesFunding = rawRequirement <= maxFunding;

    // Minimum Score filter (average of scorecards)
    const scores = startup.scorecards;
    const avgScore = (scores.marketPotential + scores.scalability + scores.innovationLevel + scores.readiness) / 4;
    const matchesScore = avgScore >= minScore;

    return matchesSearch && matchesIndustry && matchesStage && matchesFunding && matchesScore;
  });

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-0">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display m-0">
            Investor Discovery Portal
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Browse and filter verified, AI-analyzed startups currently raising capital.
          </p>
        </div>

        <button
          onClick={onToggleToFounder}
          className="self-start md:self-auto flex items-center space-x-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-indigo-300 hover:text-white text-xs font-bold rounded-xl transition-all duration-300"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Publish Your Startup</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filter Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-2xl p-5 space-y-5 shadow-lg relative overflow-hidden">
            {/* Design accents */}
            <div className="absolute -left-16 -top-16 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl"></div>

            <div className="flex items-center space-x-2 border-b border-slate-850 pb-3">
              <Filter className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Filter Directory
              </h3>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Search Keywords
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Company, product, keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Industry Vertical
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {industries.map((ind, i) => (
                  <option key={i} value={ind} className="bg-slate-950 text-slate-300">
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage */}
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Funding Stage
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {stages.map((stg, i) => (
                  <option key={i} value={stg} className="bg-slate-950 text-slate-300">
                    {stg}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Capital Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <span>Max Raising Limit</span>
                <span className="font-mono text-cyan-400 font-bold">${(maxFunding / 1000).toFixed(0)}k</span>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={maxFunding}
                onChange={(e) => setMaxFunding(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-1.5 rounded-full"
              />
            </div>

            {/* Minimum AI Score Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <span>Min AI Score Avg</span>
                <span className="font-mono text-cyan-400 font-bold">{minScore}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="1"
                value={minScore}
                onChange={(e) => setMinScore(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-1.5 rounded-full"
              />
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearch("");
                setSelectedIndustry("All");
                setSelectedStage("All");
                setMinScore(70);
                setMaxFunding(6000000);
              }}
              className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-[10.5px] font-bold text-slate-400 hover:text-white rounded-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Startup Grid (Right) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Matches Count bar */}
          <div className="flex justify-between items-center bg-slate-900/60 border border-slate-850 px-4 py-3 rounded-xl">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {filteredStartups.length} startup{filteredStartups.length !== 1 ? 's' : ''} matched your search
            </span>
            <span className="text-[10px] text-slate-500 font-medium italic">
              Showing published templates
            </span>
          </div>

          {filteredStartups.length === 0 ? (
            <div className="border border-slate-850 bg-slate-950/40 rounded-2xl py-16 px-6 text-center">
              <SlidersHorizontal className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-300 font-display">
                No matching profiles found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-normal">
                Try loosening your filters, reducing the minimum AI score requirement, or searching for other industries.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredStartups.map(startup => {
                // Calculate average scorecard
                const scores = startup.scorecards;
                const avgScore = Math.round((scores.marketPotential + scores.scalability + scores.innovationLevel + scores.readiness) / 4);

                return (
                  <div
                    key={startup.id}
                    onClick={() => onSelectStartup(startup)}
                    className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between shadow-md relative overflow-hidden cursor-pointer"
                  >
                    {/* Glowing card border overlay */}
                    <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

                    {/* Top Row: Logo & Score */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-black text-white text-base shadow-md">
                          {startup.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white leading-tight font-display m-0 group-hover:text-indigo-400 transition-colors">
                            {startup.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-0.5 leading-none">
                            {startup.location}
                          </span>
                        </div>
                      </div>

                      {/* Score Badge */}
                      <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800/80 px-2.5 py-1 rounded-lg">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span className="font-mono text-[11px] font-bold text-white">
                          {avgScore}%
                        </span>
                      </div>
                    </div>

                    {/* Middle: Description & Category */}
                    <div className="mb-5 flex-1">
                      <p className="text-xs font-semibold text-cyan-400 mb-1.5 font-display">
                        {startup.category}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {startup.aiGenerated.overview}
                      </p>
                    </div>

                    {/* Bottom: Meta and action */}
                    <div className="pt-4 border-t border-slate-850 flex items-center justify-between text-[11px]">
                      <div className="space-y-1">
                        <div className="flex items-center text-slate-500 font-medium">
                          <DollarSign className="w-3 h-3" />
                          <span className="font-semibold text-slate-300">
                            {parseInt(startup.fundingRequirement).toLocaleString()}
                          </span>
                          <span className="mx-1">•</span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-indigo-950/40 text-indigo-400 border border-indigo-500/15 rounded font-bold uppercase tracking-wider">
                            {startup.fundingStage}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-indigo-400 font-semibold group-hover:translate-x-1.5 transition-transform duration-300">
                        <span>Evaluate</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
