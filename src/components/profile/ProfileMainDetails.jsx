import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, Globe, Award, Users, ExternalLink, 
  IndianRupee, Activity, Image as ImageIcon, Briefcase, Plus, TrendingUp, Info
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, BarChart, Bar, Legend, PieChart, Pie, Cell 
} from 'recharts';

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

export default function ProfileMainDetails({
  startup,
  editForm,
  isEditing,
  handleInputChange,
  handleAiGeneratedChange
}) {
  const [activeTab, setActiveTab] = useState("overview");

  // Construct chart data dynamically from startup metricsConfig
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const metrics = startup.metricsConfig || [];
  
  const chartData = months.map((m, idx) => {
    const point = { name: m };
    metrics.forEach(metric => {
      point[metric.name] = metric.monthlyData[idx] || 0;
    });
    return point;
  });

  // Check if we have custom metrics (anything other than Revenue/Expenses)
  const customMetrics = metrics.filter(m => m.name !== "Revenue" && m.name !== "Expenses");

  // Calculate allocation breakdown for PieChart
  const askYears = Number(startup.askYears) || 1;
  const utilizationItems = startup.utilizationItems || [];
  
  const pieData = utilizationItems.map(item => {
    const totalCost = item.isMonthly ? item.amount * 12 * askYears : item.amount;
    return {
      name: item.category,
      value: totalCost
    };
  });

  const totalAllocated = pieData.reduce((sum, item) => sum + item.value, 0);
  const askAmount = Number(startup.askAmount) || 0;
  const remainingAsk = askAmount - totalAllocated;

  return (
    <div className="lg:col-span-2 space-y-8">
      
      {/* SECTION 1: IDENTITY DETAILS BANNER */}
      <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-5">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-indigo-650 uppercase tracking-widest block">
              SEC {startup.id || "OQX-2026"}
            </span>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              {startup.name}
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              {startup.companyType} • {startup.segment}
            </p>
          </div>
          
          {startup.tags && startup.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 md:justify-end max-w-sm">
              {startup.tags.map(t => (
                <span key={t} className="bg-indigo-50 text-indigo-605 border border-indigo-200 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-slate-700">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">HQ Address</span>
            <span className="text-xs font-semibold">{startup.address || startup.location || "N/A"}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Contact Email</span>
            <a href={`mailto:${startup.contactEmail}`} className="text-xs font-semibold text-indigo-600 hover:underline">{startup.contactEmail || "N/A"}</a>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Contact Phone</span>
            <span className="text-xs font-semibold">{startup.contactPhone || "N/A"}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Founded</span>
            <span className="text-xs font-semibold">{startup.foundedYear || startup.founded || "N/A"}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Pitch Deck</span>
            <span className="text-xs font-semibold text-emerald-600">{startup.pitchDeckName || "Uploaded"}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Website</span>
            {startup.website ? (
              <a href={startup.website} target="_blank" rel="noreferrer" className="text-xs font-semibold text-indigo-600 flex items-center hover:underline">
                <span>Visit site</span> <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            ) : "N/A"}
          </div>
        </div>
      </div>

      {/* TABS SELECTOR FOR INNER VIEWS */}
      <div className="flex border border-slate-200 bg-slate-100 p-1 rounded-2xl space-x-1.5 max-w-lg shadow-inner">
        <button onClick={() => setActiveTab("overview")} className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}>Overview</button>
        <button onClick={() => setActiveTab("products")} className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'products' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}>Products ({startup.products?.length || 0})</button>
        <button onClick={() => setActiveTab("dashboard")} className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}>Dashboard & Projections</button>
      </div>

      {/* TAB 1: STORY, TEAM, GALLERY, FINANCIAL SUMMARY */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Brand Mission & Tagline */}
          <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200 bg-gradient-to-r from-indigo-50/30 to-slate-50/50">
            <p className="text-indigo-600 text-sm font-black uppercase tracking-widest mb-1.5">{startup.tagline || "Brand Promise"}</p>
            <h4 className="text-lg md:text-xl font-bold text-slate-800 leading-tight">
              "{startup.vision || startup.aiGenerated.overview.substring(0, 100)}"
            </h4>
            {startup.mission && (
              <p className="text-xs text-slate-600 mt-2 font-medium border-t border-slate-200 pt-2.5">
                <strong>Our Mission:</strong> {startup.mission}
              </p>
            )}
          </div>

          {/* Section 2: Capital Deployment & Metrics */}
          <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
                <IndianRupee className="w-4.5 h-4.5 text-indigo-600" />
                <span>Historical Deployment</span>
              </h3>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Seed Capital Deployed</span>
                <span className="font-mono text-xl font-black text-slate-900">
                  ₹{startup.seedCapitalDeployed ? Number(startup.seedCapitalDeployed).toLocaleString('en-IN') : "0"}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
                <Activity className="w-4.5 h-4.5 text-indigo-600" />
                <span>Current Operational Metrics</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 p-3.5 rounded-2xl shadow-sm">
                {startup.currentMetricsSummary || "No operational metrics recorded yet."}
              </p>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2.5 flex items-center space-x-2">
              <ShieldCheck className="w-4.5 h-4.5 text-indigo-600" />
              <span>Startup Overview & Core Narrative</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {startup.overview || startup.aiGenerated.overview}
            </p>
          </div>

          {/* Section 4: Founding Team */}
          {startup.founders && startup.founders.length > 0 && (
            <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200">
              <h3 className="text-base font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2.5 flex items-center space-x-2">
                <Users className="w-4.5 h-4.5 text-indigo-600" />
                <span>Founding Team & Directors</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {startup.founders.map((founder, idx) => (
                  <div key={founder.id || idx} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex gap-4 shadow-sm">
                    <img src={founder.photo} alt={founder.name} className="w-14 h-14 rounded-full object-cover shrink-0 border border-slate-200" />
                    <div className="space-y-1.5 min-w-0">
                      <div>
                        <h4 className="text-sm font-black text-slate-900 truncate">{founder.name}</h4>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest truncate">{founder.position}</p>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-medium">
                        {founder.description}
                      </p>
                      <div className="text-[10px] text-slate-500 font-bold space-y-0.5 border-t border-slate-200 pt-1.5">
                        <p className="truncate"><strong>Edu:</strong> {founder.education}</p>
                        <p className="truncate"><strong>Creds:</strong> {founder.qualifications}</p>
                        <p className="truncate"><strong>Exp:</strong> {founder.experience}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Company Gallery */}
          {startup.gallery && startup.gallery.length > 0 && (
            <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200">
              <h3 className="text-base font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2.5 flex items-center space-x-2">
                <ImageIcon className="w-4.5 h-4.5 text-indigo-600" />
                <span>Showcase Portfolio Gallery</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {startup.gallery.map((img, idx) => (
                  <div key={img.id || idx} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex flex-col justify-between shadow-sm">
                    <div className="aspect-video relative bg-slate-100">
                      <img src={img.url} alt={img.heading} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{img.heading}</h4>
                      <p className="text-[10px] text-slate-600 mt-1 leading-normal font-medium">{img.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRODUCTS & COMPETITIVE LANDSCAPE */}
      {activeTab === "products" && (
        <div className="space-y-8">
          {startup.products && startup.products.length > 0 ? (
            startup.products.map((p, idx) => (
              <div key={p.id || idx} className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200 space-y-6">
                <div className="flex flex-col md:flex-row gap-5 border-b border-slate-200 pb-5">
                  <img src={p.imageUrl} alt={p.name} className="w-24 h-24 rounded-2xl object-cover shrink-0 bg-slate-100 border border-slate-200" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{p.name}</h3>
                      <p className="text-xs font-semibold text-slate-500">Business Model: {p.businessModel}</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      {p.description}
                    </p>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 inline-block shadow-sm">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Revenue Streams</p>
                      <p className="text-xs text-slate-700 font-semibold">{p.revenueStreams}</p>
                    </div>
                  </div>
                </div>

                {/* Competitive landscape mapping */}
                <div className="bg-slate-55 p-5 rounded-2xl border border-slate-200 space-y-3.5 shadow-sm">
                  <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center">
                    <Briefcase className="w-4 h-4 mr-1.5" /> Competitive Landscape Map
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 shadow-sm">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Competitor</span>
                      <p className="text-xs font-black text-slate-900">{p.competitorCompany}</p>
                      <p className="text-[10px] text-slate-600">Product: {p.competitorProduct}</p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100/50">
                      <span className="text-[9px] text-indigo-600 font-bold uppercase tracking-wider block mb-0.5">Our USP</span>
                      <p className="text-xs font-black text-slate-900 leading-relaxed">{p.usp}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold">No product profiles loaded yet.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FINANCIAL PLOTS, MILESTONES & UTILIZATION */}
      {activeTab === "dashboard" && (
        <div className="space-y-8">
          
          {/* Revenue vs Expenses Chart */}
          <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <TrendingUp className="w-4.5 h-4.5 text-indigo-600" />
                <span>Monthly Revenue vs Expense Projections</span>
              </h3>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">12-Month Outlook</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a' }} />
                  <Area type="monotone" dataKey="Revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue (₹)" />
                  <Area type="monotone" dataKey="Expenses" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" name="Expenses (₹)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Custom Metrics Line Chart (if present) */}
          {customMetrics.length > 0 && (
            <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Activity className="w-4.5 h-4.5 text-indigo-600" />
                  <span>Custom Operational Traction Analytics</span>
                </h3>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                    <YAxis stroke="#64748b" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a' }} />
                    {customMetrics.map((metric, idx) => (
                      <Line 
                        key={metric.name} 
                        type="monotone" 
                        dataKey={metric.name} 
                        stroke={COLORS[idx % COLORS.length]} 
                        strokeWidth={2.5} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6 }} 
                      />
                    ))}
                    <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '10px' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Section 7 Milestones */}
          {startup.milestones && startup.milestones.length > 0 && (
            <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2.5 flex items-center space-x-2">
                <Award className="w-4.5 h-4.5 text-indigo-600" />
                <span>Yearwise Milestones roadmap</span>
              </h3>
              <div className="relative border-l border-slate-200 ml-3.5 pl-6 space-y-6 my-2">
                {startup.milestones.map((m, idx) => (
                  <div key={m.id || idx} className="relative">
                    <span className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-indigo-600 bg-white shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    </span>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black text-indigo-600 font-mono bg-indigo-50 px-2 py-0.5 rounded-lg">{m.year}</span>
                      <p className="text-xs font-semibold text-slate-650 pt-1">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Investment utilization plan */}
          {utilizationItems.length > 0 && (
            <div className="glass-panel rounded-3xl p-6 shadow-md border border-slate-200 grid grid-cols-1 md:grid-cols-5 gap-6">
              
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2.5 flex items-center space-x-2">
                  <IndianRupee className="w-4.5 h-4.5 text-indigo-600" />
                  <span>Capital Allocation</span>
                </h3>
                
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 gap-4 shadow-sm">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Target Ask</span>
                    <span className="font-mono text-sm font-black text-slate-900">₹{askAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Stage</span>
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{startup.fundingStage}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Equity Offered</span>
                    <span className="font-mono text-sm font-black text-slate-900">{startup.equityOffered}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Years Run-rate</span>
                    <span className="text-xs font-black text-slate-800">{askYears} Yrs</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-600 leading-normal flex items-start gap-1.5 p-3 rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    Monthly expenses (like salaries) are automatically compiled over the full {askYears}-year runtime requested.
                  </span>
                </div>
              </div>

              <div className="md:col-span-3 flex flex-col items-center justify-center">
                <div className="w-full h-48 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val) => `₹${val.toLocaleString('en-IN')}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Utilization list legend */}
                <div className="w-full grid grid-cols-2 gap-2 mt-4">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate flex-1">{entry.name}</span>
                      <span className="text-[10px] font-mono font-black text-slate-900">₹{entry.value.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
