import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Users, Rocket, Compass } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const isFounderActive = location.pathname.startsWith('/founder');
  const isInvestorActive = location.pathname.startsWith('/investor');

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-700/40 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Brand Logo - Links to Home Hub */}
      <Link 
        to="/" 
        className="flex items-center space-x-3 group cursor-pointer no-underline select-none"
      >
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 shadow-lg shadow-indigo-500/15 group-hover:scale-105 transition-transform duration-300">
          <Shield className="w-5 h-5 text-white" />
          <div className="absolute inset-0 w-full h-full rounded-xl bg-indigo-500 blur-md opacity-25 -z-10 group-hover:opacity-45 transition-opacity duration-300"></div>
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight font-display bg-gradient-to-r from-indigo-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent m-0 leading-none">
            BlackWhale
          </h1>
          <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase m-0 leading-none mt-1">
            Investor Platform
          </p>
        </div>
      </Link>

      {/* Navigation & Controls */}
      <div className="flex items-center space-x-6">
        {/* Router Nav Buttons */}
        <div className="flex items-center bg-slate-800 border border-slate-700/50 p-1 rounded-xl shadow-sm">
          <Link
            id="role-btn-founder"
            to="/founder/onboarding"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 ${
              isFounderActive
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/15'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Founder Hub</span>
          </Link>
          
          <Link
            id="role-btn-investor"
            to="/investor/directory"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 ${
              isInvestorActive
                ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-md shadow-cyan-600/15'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Investor Portal</span>
          </Link>
        </div>

        {/* Small Platform Guidelines indicator */}
        <div className="hidden md:flex items-center text-xs text-slate-500 space-x-1.5 border-l border-slate-700/50 pl-6">
          <Users className="w-3.5 h-3.5 text-indigo-500" />
          <span className="font-semibold text-slate-400">Workspace:</span>
          <span className={`font-bold ${isFounderActive ? 'text-indigo-600' : isInvestorActive ? 'text-cyan-600' : 'text-slate-400'}`}>
            {isFounderActive ? 'Startup Founder' : isInvestorActive ? 'Investor View' : 'Not Selected'}
          </span>
        </div>
      </div>
    </header>
  );
}
