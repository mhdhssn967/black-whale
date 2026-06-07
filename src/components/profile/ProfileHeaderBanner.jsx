import React from 'react';
import { ArrowLeft, CheckCircle, FileText, Edit3, Award, Globe, ExternalLink, MapPin, Building2, Download, Mail, Users } from 'lucide-react';

export default function ProfileHeaderBanner({
  startup,
  editForm,
  isEditing,
  isOwner,
  onBack,
  setIsEditing,
  onPublish,
  handleInputChange,
  setInquiryModalOpen
}) {
  return (
    <>
      {/* Top Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-400 hover:text-white text-xs font-semibold tracking-wide transition-colors duration-300 self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>

        {isOwner && (
          <div className="flex items-center space-x-3">
            {startup.published ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Published on Platform</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>Draft Profile</span>
              </span>
            )}

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-all duration-300"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}

            {!startup.published && !isEditing && (
              <button
                onClick={onPublish}
                className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:brightness-110 text-white text-xs font-extrabold tracking-wider uppercase rounded-lg shadow-md shadow-emerald-600/20 transition-all duration-300"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Publish Profile</span>
              </button>
            )}
          </div>
        )}

        {!isOwner && (
          <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Investor View</span>
          </div>
        )}
      </div>

      {/* Main Profile Header Banner */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden mb-8">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
            {/* Startup Logo/Letter */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-indigo-600/25">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  maxLength="2"
                  className="w-16 bg-transparent text-center border-b border-white/40 focus:outline-none font-black text-white"
                />
              ) : (
                startup.name.substring(0, 2).toUpperCase()
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xl font-bold text-white focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <h2 className="text-2xl font-extrabold text-white leading-none font-display m-0">
                    {startup.name}
                  </h2>
                )}
                
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold tracking-wide uppercase">
                  {isEditing ? (
                    <select
                      name="fundingStage"
                      value={editForm.fundingStage}
                      onChange={handleInputChange}
                      className="bg-slate-950 text-indigo-400 border border-slate-800 text-[10px] rounded px-1 py-0.5 focus:outline-none"
                    >
                      <option value="Pre-seed">Pre-seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Series A">Series A</option>
                      <option value="Series B">Series B</option>
                      <option value="Bootstrapped">Bootstrapped</option>
                    </select>
                  ) : (
                    startup.fundingStage
                  )}
                </span>
              </div>

              {isEditing ? (
                <input
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleInputChange}
                  className="w-full sm:w-80 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <p className="text-sm font-semibold text-cyan-400 font-display">
                  {startup.category}
                </p>
              )}

              {/* Meta items */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-y-2 gap-x-4 text-xs text-slate-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleInputChange}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-300 focus:outline-none"
                    />
                  ) : (
                    <span>{startup.location}</span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="industry"
                      value={editForm.industry}
                      onChange={handleInputChange}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-300 focus:outline-none"
                    />
                  ) : (
                    <span>{startup.industry}</span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-slate-500 font-semibold">Type:</span>
                  {isEditing ? (
                    <select
                      name="companyType"
                      value={editForm.companyType}
                      onChange={handleInputChange}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-300 focus:outline-none"
                    >
                      <option value="Startup">Startup</option>
                      <option value="SME">SME</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Non-Profit">Non-Profit</option>
                      <option value="Research Venture">Research Venture</option>
                    </select>
                  ) : (
                    <span>{startup.companyType || "Startup"}</span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-slate-500 font-semibold">Founded:</span>
                  {isEditing ? (
                    <input
                      type="number"
                      name="foundedYear"
                      value={editForm.foundedYear}
                      onChange={handleInputChange}
                      className="bg-slate-950 border border-slate-800 rounded w-16 px-2 py-0.5 text-xs text-slate-300 focus:outline-none"
                    />
                  ) : (
                    <span>{startup.foundedYear || "N/A"}</span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="teamSize"
                      value={editForm.teamSize}
                      onChange={handleInputChange}
                      className="bg-slate-950 border border-slate-800 rounded w-16 px-2 py-0.5 text-xs text-slate-300 focus:outline-none"
                    />
                  ) : (
                    <span>{startup.teamSize || "N/A"}</span>
                  )}
                </div>
                {startup.website && (
                  <a 
                    href={startup.website} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{isEditing ? editForm.website : startup.website.replace(/^https?:\/\//, '')}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
                {startup.twitter && (
                  <a 
                    href={startup.twitter} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    <span>Twitter/X</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
                {startup.github && (
                  <a 
                    href={startup.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="w-full md:w-auto flex flex-row md:flex-col gap-3 justify-center">
            {startup.pitchDeckName && (
              <button
                onClick={() => alert(`[Simulated] Downloading pitch deck: ${startup.pitchDeckName}`)}
                className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all duration-300"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Pitch Deck PDF</span>
              </button>
            )}

            {!isOwner && (
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:brightness-110 text-white text-xs font-extrabold tracking-wider uppercase rounded-xl shadow-lg shadow-cyan-600/20 transition-all duration-300 glow-cyan"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Founder</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
