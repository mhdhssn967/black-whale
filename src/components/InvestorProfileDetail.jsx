import React, { useState } from 'react';
import { 
  Building2, Globe, MapPin, ArrowLeft, Mail, 
  ExternalLink, Sparkles, Award, ShieldCheck, Send, CheckCircle2 
} from 'lucide-react';

export default function InvestorProfileDetail({ 
  investor, 
  startupContext, 
  matchScore, 
  onBack 
}) {
  const [pitchMessage, setPitchMessage] = useState(
    `Hi ${investor.contactPartner.split(' ')[0]},\n\nWe have compiled our investor-ready metrics for ${startupContext?.name || 'our startup'} on Interlix. Given your active thesis in ${investor.focusSectors.slice(0, 2).join(' & ')} and investment stage preference, we believe there is a strong alignment. We would love to share our pitch deck and walk you through our product category: ${startupContext?.category || 'our technology'}.\n\nLooking forward to your feedback.`
  );
  const [isSending, setIsSending] = useState(false);
  const [pitchSent, setPitchSent] = useState(false);

  const handleSendPitch = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setPitchSent(true);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 text-xs font-semibold tracking-wide transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Matched Investors</span>
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Investor Profile Brief */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card Wrapper */}
          <div className="glass-panel rounded-2xl p-6 shadow-md border border-slate-200 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-28 h-28 bg-indigo-500/5 rounded-full blur-xl pointer-events-none"></div>
            
            {/* Logo Badge */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-700 flex items-center justify-center text-white font-extrabold text-2xl shadow-sm mb-4 font-display">
              {investor.avatar}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-slate-900 font-display mb-1">{investor.name}</h2>
            <a 
              href={investor.website} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 text-xs font-semibold mb-4"
            >
              <span>{investor.website.replace('https://', '')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Basic Info */}
            <div className="space-y-3 pt-3 border-t border-slate-200 text-xs font-semibold text-slate-600 font-medium">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-indigo-650 shrink-0" />
                <span className="text-slate-700">{investor.location}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Building2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span className="text-slate-700">Ticket: {investor.ticketSize}</span>
              </div>
            </div>

            {/* Match Score Indicator */}
            <div className="mt-6 p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Match Score</p>
                <p className="text-2xl font-black text-indigo-650 font-display mt-0.5">{matchScore}%</p>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-indigo-200 bg-white flex items-center justify-center font-bold text-xs text-indigo-600 font-mono" style={{ borderColor: '#e0e7ff #e0e7ff #6366f1 #6366f1' }}>
                ✓
              </div>
            </div>
          </div>

          {/* Sector focus Card */}
          <div className="glass-panel rounded-2xl p-6 shadow-md border border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Investment Focus</h3>
            <div className="flex flex-wrap gap-2">
              {investor.focusSectors.map((sector, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100/50 text-indigo-600 text-[10.5px] font-bold">
                  {sector}
                </span>
              ))}
            </div>

            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-4">Target Stages</h3>
            <div className="flex flex-wrap gap-2">
              {investor.stages.map((stage, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-cyan-50 border border-cyan-100/50 text-cyan-600 text-[10.5px] font-bold">
                  {stage}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed thesis & pitch action */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investment Thesis */}
          <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-md border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 font-display mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <span>Investment Thesis</span>
            </h3>
            <p className="text-sm text-slate-650 leading-relaxed font-semibold">
              {investor.thesis}
            </p>

            {/* Portfolio */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Active Portfolio Companies</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {investor.portfolio.map((item, i) => (
                  <div key={i} className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-center text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lead Contact Partner */}
          <div className="glass-panel rounded-2xl p-6 shadow-md border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-slate-105 border border-slate-200 flex items-center justify-center font-bold text-indigo-600 text-sm">
                {investor.contactPartner.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 m-0">{investor.contactPartner}</h4>
                <p className="text-xs text-slate-500 m-0 font-medium">Lead Deal Partner</p>
              </div>
            </div>
            <a 
              href={`mailto:${investor.email}`}
              className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-250 rounded-xl text-slate-600 hover:text-indigo-650 transition-all shadow-sm"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Direct Pitch Portal */}
          <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-md border border-slate-200 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <h3 className="text-lg font-bold text-slate-900 font-display mb-2 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-650 animate-pulse" />
              <span>Direct Pitch Room</span>
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Pitch {investor.name} directly. When submitted, your verified startup profile highlights and metric scorecards will be attached automatically.
            </p>

            {pitchSent ? (
              <div className="p-8 border border-emerald-200 bg-emerald-50 rounded-2xl text-center space-y-4 animate-fade-in shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Pitch Submitted Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto font-semibold">
                  Your profile and deck have been sent to the desk of **{investor.contactPartner}**. They will review the data benchmarks and get back to you at **{investor.email}**.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendPitch} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Outreach Message
                  </label>
                  <textarea
                    rows="5"
                    value={pitchMessage}
                    onChange={(e) => setPitchMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-805 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-y"
                    required
                  ></textarea>
                </div>

                <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl flex items-center space-x-2 text-[10.5px] text-slate-600 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Enclosed: Verified AI Scorecard (Innovation: {startupContext?.scorecards?.innovationLevel || 90}%, Readiness: {startupContext?.scorecards?.readiness || 85}%)</span>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full flex items-center justify-center space-x-2 px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-md"
                >
                  {isSending ? (
                    <span>Sending Pitch...</span>
                  ) : (
                    <>
                      <span>Submit Pitch to {investor.contactPartner.split(' ')[0]}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
