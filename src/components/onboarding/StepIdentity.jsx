import React from 'react';
import { Building2, Globe, MapPin, Link2 } from 'lucide-react';

export default function StepIdentity({ formData, handleInputChange, industries }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white border-b border-slate-850 pb-3 flex items-center space-x-2">
        <Building2 className="w-5 h-5 text-indigo-400" />
        <span>Step 1: Startup Basics & Brand</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="name">
            Company Name <span className="text-indigo-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. AcmeCorp"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="website">
            Website URL <span className="text-indigo-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              <Globe className="w-4 h-4" />
            </span>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://acmecorp.com"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="industry">
            Industry Vertical <span className="text-indigo-400">*</span>
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 cursor-pointer"
          >
            {industries.map((ind, i) => (
              <option key={i} value={ind} className="bg-slate-950 text-slate-300">
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="companyType">
            Company Type <span className="text-indigo-400">*</span>
          </label>
          <select
            id="companyType"
            name="companyType"
            value={formData.companyType}
            onChange={handleInputChange}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 cursor-pointer"
          >
            <option value="Startup">Startup</option>
            <option value="SME">SME</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Non-Profit">Non-Profit</option>
            <option value="Research Venture">Research Venture</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="foundedYear">
            Founded Year <span className="text-indigo-400">*</span>
          </label>
          <input
            type="number"
            id="foundedYear"
            name="foundedYear"
            value={formData.foundedYear}
            onChange={handleInputChange}
            placeholder="e.g. 2024"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="teamSize">
            Team Size <span className="text-indigo-400">*</span>
          </label>
          <input
            type="text"
            id="teamSize"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleInputChange}
            placeholder="e.g. 1-10"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="location">
            Company Headquarters <span className="text-indigo-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              <MapPin className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g. San Francisco, CA or London, UK"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="category">
          Product Category / Core Technology <span className="text-indigo-400">*</span>
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="e.g. AI-powered cybersecurity scanner, decentralized billing engine"
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
        />
        <span className="text-[11px] text-slate-500 mt-1 block">A brief 4-7 word summary of your core tech or tool category.</span>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="linkedin">
          Social Links <span className="text-slate-400">(Optional)</span>
        </label>
        <div className="space-y-3">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              <Link2 className="w-4 h-4" />
            </span>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/company/acmecorp"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              <Link2 className="w-4 h-4" />
            </span>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
              placeholder="https://twitter.com/acmecorp"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              <Link2 className="w-4 h-4" />
            </span>
            <input
              type="url"
              id="github"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
              placeholder="https://github.com/acmecorp"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
