import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, MapPin, IndianRupee, Building2 } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function HomeHub({ startups = [] }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'auth', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().userid) {
            setCompanyId(docSnap.data().userid);
          }
        } catch (err) {
          console.error('Error fetching company mapping:', err);
        }
      } else {
        setCompanyId(null);
      }
    });
    return () => unsubscribe();
  }, []);
  
  // Show up to 5 featured companies
  const featuredStartups = startups.slice(0, 5);

  return (
    <div className="w-full">
      {/* Hero Section — Dark gradient */}
      <div className="relative w-screen -ml-[50vw] left-[50%] overflow-hidden" style={{ minHeight: '420px' }}>
        {/* Base gradient background */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #b8c0e8 0%, #8b8ec7 15%, #6366a8 25%, #3b3d8f 40%, #1e1b5e 60%, #0f0d3d 80%, #0a0825 100%)'
        }}></div>

        {/* Curved sweep overlay */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 420" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M600,0 Q750,200 900,300 Q1050,400 1440,350 L1440,420 L0,420 L0,350 Q200,380 400,300 Q500,250 600,0 Z" fill="rgba(10,8,37,0.6)"/>
        </svg>

        {/* Subtle radial glow */}
        <div className="absolute top-0 left-0 w-[60%] h-full" style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(139,142,199,0.25) 0%, transparent 70%)'
        }}></div>

        {/* Purple accent line */}
        <div className="absolute right-[35%] top-0 bottom-0 w-[2px] opacity-30" style={{
          background: 'linear-gradient(to bottom, transparent, #6366f1, #6366f1, transparent)'
        }}></div>

        {/* Floating dashboard card mockups */}
        <div className="absolute left-[8%] bottom-[15%] flex items-end gap-3 opacity-[0.15]">
          <div className="w-20 h-24 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10 p-2.5 flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full border-[3px] border-white/50 border-t-transparent mb-1.5"></div>
            <div className="w-8 h-1 bg-white/30 rounded"></div>
          </div>
          <div className="w-22 h-28 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10 p-2.5 flex flex-col justify-end items-center gap-1">
            <div className="flex items-end gap-1">
              <div className="w-2 h-6 bg-white/40 rounded-sm"></div>
              <div className="w-2 h-10 bg-white/40 rounded-sm"></div>
              <div className="w-2 h-8 bg-white/40 rounded-sm"></div>
              <div className="w-2 h-12 bg-white/40 rounded-sm"></div>
            </div>
            <div className="w-12 h-1 bg-white/30 rounded"></div>
          </div>
          <div className="w-24 h-32 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10 p-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-10 h-1.5 bg-white/40 rounded"></div>
              <div className="w-14 h-1 bg-white/25 rounded"></div>
            </div>
            <div className="flex items-end gap-1">
              <div className="w-2 h-4 bg-indigo-400/40 rounded-sm"></div>
              <div className="w-2 h-7 bg-indigo-400/40 rounded-sm"></div>
              <div className="w-2 h-5 bg-indigo-400/40 rounded-sm"></div>
              <div className="w-2 h-9 bg-indigo-400/40 rounded-sm"></div>
              <div className="w-2 h-6 bg-indigo-400/40 rounded-sm"></div>
            </div>
          </div>
          <div className="w-20 h-28 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10 p-2.5 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="w-8 h-1.5 bg-white/40 rounded"></div>
              <div className="w-12 h-1 bg-white/25 rounded"></div>
            </div>
            <svg className="w-full h-10 opacity-50" viewBox="0 0 60 30">
              <polyline points="0,25 10,20 20,15 30,18 40,10 50,12 60,5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Interlix Logo — Right side */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:block">
          <img 
            src="/interlixlogo.webp" 
            alt="Interlix" 
            className="w-32 h-32 object-contain drop-shadow-2xl opacity-90"
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col justify-center" style={{ minHeight: '420px' }}>
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-[2.8rem] font-black tracking-tight text-white font-display leading-[1.15] mb-6">
              Venture-Grade Profiles,<br />
              Generated by <span style={{ color: '#818cf8' }}>AI</span>
            </h2>
            <p className="text-[15px] text-slate-300 font-medium leading-relaxed mb-2 max-w-md">
              Interlix transforms raw startup metrics into investor-ready profiles in minutes.
            </p>
            <p className="text-[15px] text-slate-400 font-medium leading-relaxed max-w-md mb-8">
              Empowering founders with automated pitch storytelling and helping investors screen deals at scale.
            </p>
            <div className="flex flex-wrap gap-3">
              {user && companyId ? (
                <Link
                  to={`/companies/${companyId}`}
                  className="inline-flex items-center space-x-2 px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-sm font-black tracking-wider uppercase rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300"
                >
                  <Building2 className="w-4 h-4" />
                  <span>My Company</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center space-x-2 px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-black tracking-wider uppercase rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Partner Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center space-x-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300"
                  >
                    <span>List Your Company</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Companies Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Discover</span>
            <h3 className="text-2xl font-black text-slate-900 font-display tracking-tight">Featured Companies</h3>
          </div>
          <Link
            to="/investor/directory"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300"
          >
            <span>View All Companies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {featuredStartups.length === 0 ? (
          <div className="border border-slate-200 bg-slate-50 rounded-2xl py-16 px-6 text-center shadow-sm">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 font-display">No Companies Listed Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-normal font-medium">
              Company profiles will appear here once they are registered on the platform.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredStartups.map(startup => {
              const scores = startup.scorecards;
              const avgScore = Math.round((scores.marketPotential + scores.scalability + scores.innovationLevel + scores.readiness) / 4);

              return (
                <div
                  key={startup.id}
                  onClick={() => navigate(`/companies/${startup.id}`)}
                  className="bg-white rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden cursor-pointer border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 group"
                >
                  {/* Glowing card accent */}
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
                      {startup.aiGenerated?.overview || ''}
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
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA — View All */}
        {featuredStartups.length > 0 && (
          <div className="text-center mt-10">
            <Link
              to="/investor/directory"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:brightness-105 text-white text-sm font-black tracking-wider uppercase rounded-xl shadow-md shadow-indigo-500/15 transition-all duration-300"
            >
              <span>View All Companies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
