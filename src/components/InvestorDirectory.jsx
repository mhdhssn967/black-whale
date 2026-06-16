import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, MapPin, IndianRupee, 
  Sparkles, Award, ArrowRight, ExternalLink, Filter 
} from 'lucide-react';

export default function InvestorDirectory({ startups, onSelectStartup, onToggleToFounder }) {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [minScore, setMinScore] = useState(0);
  const [maxFunding, setMaxFunding] = useState(100000000); // 10 Cr max limit initially

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
    const reqString = String(startup.fundingRequirement || startup.askAmount || "0");
    const rawRequirement = parseFloat(reqString.replace(/[^0-9.]/g, "")) || 0;
    const matchesFunding = rawRequirement <= maxFunding;

    // Minimum Score filter (average of scorecards)
    const scores = startup.scorecards;
    const avgScore = (scores.marketPotential + scores.scalability + scores.innovationLevel + scores.readiness) / 4;
    const matchesScore = avgScore >= minScore;

    return matchesSearch && matchesIndustry && matchesStage && matchesFunding && matchesScore;
  });

  const formatFundingLabel = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    }
    return `₹${(amount / 100000).toFixed(0)} Lakhs`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-0">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display m-0">
            Investor Discovery Portal
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Browse and filter verified, AI-analyzed startups currently raising capital.
          </p>
        </div>

        <button
          onClick={onToggleToFounder}
          className="self-start md:self-auto flex items-center space-x-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-250 text-indigo-600 hover:text-indigo-755 text-xs font-bold rounded-xl transition-all duration-300 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Publish Your Startup</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filter Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-2xl p-5 space-y-5 shadow-md relative overflow-hidden">
            {/* Design accents */}
            <div className="absolute -left-16 -top-16 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl"></div>

            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
              <Filter className="w-4 h-4 text-cyan-600" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-display">
                Filter Directory
              </h3>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Search Keywords
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Company, product, keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Industry Vertical
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {industries.map((ind, i) => (
                  <option key={i} value={ind} className="bg-white text-slate-700">
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage */}
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Funding Stage
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {stages.map((stg, i) => (
                  <option key={i} value={stg} className="bg-white text-slate-700">
                    {stg}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Capital Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                <span>Max Raising Limit</span>
                <span className="font-mono text-cyan-600 font-bold">{formatFundingLabel(maxFunding)}</span>
              </div>
              <input
                type="range"
                min="1000000"
                max="500000000"
                step="1000000"
                value={maxFunding}
                onChange={(e) => setMaxFunding(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-1.5 rounded-full"
              />
            </div>

            {/* Minimum AI Score Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                <span>Min AI Score Avg</span>
                <span className="font-mono text-cyan-600 font-bold">{minScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
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
                setMinScore(0);
                setMaxFunding(100000000);
              }}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[10.5px] font-bold text-slate-600 hover:text-slate-900 rounded-xl transition-all shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Startup Grid (Right) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Matches Count bar */}
          <div className="flex justify-between items-center bg-slate-100 border border-slate-200 px-4 py-3 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              {filteredStartups.length} startup{filteredStartups.length !== 1 ? 's' : ''} matched your search
            </span>
            <span className="text-[10px] text-slate-500 font-semibold italic">
              Showing published templates
            </span>
          </div>

          {filteredStartups.length === 0 ? (
            <div className="border border-slate-200 bg-slate-50 rounded-2xl py-16 px-6 text-center shadow-sm">
              <SlidersHorizontal className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 font-display">
                No matching profiles found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-normal font-medium">
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
                    className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden cursor-pointer border border-slate-200"
                  >
                    {/* Glowing card border overlay */}
                    <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

                    {/* Top Row: Logo & Score */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        {startup.logo ? (
                          <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm overflow-hidden border border-slate-200">
                            <img src={startup.logo} alt={startup.name} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-black text-white text-base shadow-sm">
                            {startup.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 leading-tight font-display m-0 group-hover:text-indigo-600 transition-colors">
                            {startup.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5 leading-none">
                            {startup.location}
                          </span>
                        </div>
                      </div>

                      {/* Score Badge */}
                      <div className="flex items-center space-x-1 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                        <Sparkles className="w-3 h-3 text-cyan-600" />
                        <span className="font-mono text-[11px] font-bold text-slate-800">
                          {avgScore}%
                        </span>
                      </div>
                    </div>

                    {/* Middle: Description & Category */}
                    <div className="mb-5 flex-1">
                      <p className="text-xs font-semibold text-cyan-600 mb-1.5 font-display">
                        {startup.category}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                        {startup.aiGenerated.overview}
                      </p>
                    </div>

                    {/* Bottom: Meta and action */}
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px]">
                      <div className="space-y-1">
                        <div className="flex items-center text-slate-500 font-semibold">
                          <IndianRupee className="w-3 h-3 text-slate-550 mr-0.5" />
                          <span className="font-mono text-slate-800">
                            {parseInt(String(startup.fundingRequirement || startup.askAmount || "0").replace(/[^0-9.]/g, "")).toLocaleString('en-IN')}
                          </span>
                          <span className="mx-1">•</span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-indigo-50 text-indigo-650 border border-indigo-200 rounded font-black uppercase tracking-wider">
                            {startup.fundingStage}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-indigo-600 font-bold group-hover:translate-x-1.5 transition-transform duration-300">
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
