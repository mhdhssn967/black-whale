import React, { useState } from 'react';
import { Rocket, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import StepIdentity from './onboarding/StepIdentity';
import StepProductMarket from './onboarding/StepProductMarket';
import StepFundingTeam from './onboarding/StepFundingTeam';

const DEMO_TEMPLATES = {
  quantumSafe: {
    name: "QuantumSafe Corp",
    website: "https://quantumsafe.net",
    industry: "Cybersecurity & Infrastructure",
    category: "Post-Quantum Cryptography",
    problem: "Current RSA and ECC encryption standards will be completely vulnerable to decryption once quantum computers reach scale, exposing global financial systems and government communications.",
    solution: "A post-quantum cryptographic software layer that integrates with existing cloud systems, providing mathematical lattice-based encryption algorithms that cannot be cracked by classical or quantum adversaries.",
    targetMarket: "Tier-1 banks, defense contractors, and cloud infrastructure providers worldwide. Immediate addressable market is estimated at $8.5B by 2028.",
    revenueModel: "Annual enterprise licensing model starting at $75,000/server, plus premium integration consulting fees.",
    fundingStage: "Seed",
    fundingRequirement: "2,200,000",
    teamInfo: "Dr. Kenji Tanaka (CEO, former Lead Cryptographer at NIST), Dr. Clara Dupont (CSO, PhD in Quantum Algorithms from ETH Zurich), Sarah Miller (VP of Product, ex-Cloudflare).",
    location: "Austin, Texas",
    customers: "Completed pilot with major European investment bank; letters of intent from 3 aerospace manufacturers.",
    linkedin: "https://linkedin.com/company/quantumsafe-security",
    pitchDeckName: "QuantumSafe_Seed_2026_Secured.pdf"
  },
  hydraSustain: {
    name: "HydraSustain",
    website: "https://hydrasustain.com",
    industry: "ClimateTech & AgriTech",
    category: "Desalination Systems",
    problem: "Traditional desalination plants consume immense electricity, cost hundreds of millions to build, and produce toxic brine waste that decimates coastal marine ecosystems.",
    solution: "A modular, solar-thermal desalination unit that operates off-grid, utilizing concentrated solar lenses to evaporate sea water at 4x the thermal efficiency of current setups with zero liquid discharge.",
    targetMarket: "Water utilities in arid agricultural regions (Middle East, Southern California, North Africa), and resort developments. Market size is $4.2B.",
    revenueModel: "Water-as-a-Service (WaaS) contracts at $0.85 per cubic meter of clean water delivered, plus unit sales to private clients.",
    fundingStage: "Series A",
    fundingRequirement: "4,500,000",
    teamInfo: "Carlos Mendez (CEO, former VP of Operations at Abengoa Water), Dr. Amara Al-Sudairi (CSO, MIT Water Club chair, pioneer in thermal membrane design).",
    location: "Tempe, Arizona",
    customers: "Cooperative agreement signed with Arizona Irrigation District; 1 working prototype operational in Sonora Desert.",
    linkedin: "https://linkedin.com/company/hydrasustain",
    pitchDeckName: "HydraSustain_SeriesA_v4.pdf"
  },
  oqulix: {
    name: "Oqulix Pvt Ltd",
    website: "https://www.oqulix.com",
    industry: "AI & DeepTech",
    category: "Immersive VR for Healthcare, Education & Therapy",
    problem: "Traditional physical rehabilitation (physiotherapy) and patient therapy are often tedious, low-engagement, and difficult to track objectively, leading to poor patient compliance and slower recovery rates.",
    solution: "An immersive Virtual Reality platform that gamifies physical therapy and cognitive rehabilitation. By using VR headsets and motion-tracking sensors, patients engage in interactive, therapeutic games while clinicians receive real-time biomechanical data to track recovery progress.",
    targetMarket: "Hospitals, rehabilitation centers, physiotherapy clinics, and special education schools. The global VR in healthcare market is projected to reach $10+ billion by 2030.",
    revenueModel: "SaaS licensing model for rehabilitation clinics (per-device subscription) and hardware lease options, alongside clinical-data-as-a-service analytics packages.",
    fundingStage: "Seed",
    fundingRequirement: "150,000",
    teamInfo: "Vishnuprakash P (Managing Director & CEO - VR systems expert), Sandeep Nambiar P (Co-founder & Director - software engineer and VR developer), Anjana Remesh (Director - product strategist).",
    location: "Ernakulam, Kerala, India",
    customers: "Partnership with local multi-specialty hospital for patient tests; working VR physiotherapy prototype.",
    linkedin: "https://linkedin.com/company/oqulix",
    pitchDeckName: "Oqulix_InvestorPitch_Seed_2026.pdf"
  }
};


export default function FounderOnboarding({ onSubmitStartup }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    industry: "SaaS & Enterprise Software",
    category: "",
    problem: "",
    solution: "",
    targetMarket: "",
    revenueModel: "",
    fundingStage: "Pre-seed",
    fundingRequirement: "",
    teamInfo: "",
    location: "",
    customers: "",
    linkedin: "",
    pitchDeckName: "",
    companyType: "Startup",
    foundedYear: "",
    teamSize: "",
    twitter: "",
    github: "",
    capitalRaised: "",
    activeProducts: "",
    competitiveAdvantage: "",
    milestones: "",
    currentRevenue: ""
  });
  
  const [pitchFile, setPitchFile] = useState(null);
  const [validationError, setValidationError] = useState("");

  const industries = [
    "SaaS & Enterprise Software",
    "FinTech & Blockchain",
    "ClimateTech & AgriTech",
    "HealthTech & BioTech",
    "Cybersecurity & Infrastructure",
    "AI & DeepTech",
    "Consumer Tech & E-Commerce",
    "Other"
  ];

  const fundingStages = [
    "Pre-seed",
    "Seed",
    "Series A",
    "Series B",
    "Bootstrapped"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setValidationError("");
  };

  const handleAutofill = (key) => {
    const template = DEMO_TEMPLATES[key];
    if (template) {
      setFormData(template);
      setPitchFile({ name: template.pitchDeckName });
      setValidationError("");
    }
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!formData.name.trim()) return "Company Name is required.";
      if (!formData.website.trim()) return "Website URL is required.";
      if (!formData.location.trim()) return "Company Location is required.";
      if (!formData.category.trim()) return "Product Category is required.";
    } else if (currentStep === 2) {
      if (!formData.problem.trim() || formData.problem.length < 15) {
        return "Please describe the Problem (minimum 15 characters).";
      }
      if (!formData.solution.trim() || formData.solution.length < 15) {
        return "Please describe the Solution (minimum 15 characters).";
      }
      if (!formData.targetMarket.trim()) return "Target Market is required.";
      if (!formData.revenueModel.trim()) return "Revenue Model is required.";
    } else if (currentStep === 3) {
      if (!formData.fundingRequirement.trim()) return "Funding Requirement is required.";
      if (!formData.teamInfo.trim()) return "Team Information is required.";
    }
    return "";
  };

  const handleNext = () => {
    const error = validateStep(step);
    if (error) {
      setValidationError(error);
      return;
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setValidationError("");
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPitchFile(file);
      setFormData(prev => ({
        ...prev,
        pitchDeckName: file.name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateStep(3);
    if (error) {
      setValidationError(error);
      return;
    }

    // Pass data back to app container
    onSubmitStartup({
      ...formData,
      pitchDeckName: pitchFile ? pitchFile.name : ""
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-0">
      
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Investor-Ready Transformation</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
          Create Your Investor Profile
        </h2>
        <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
          Input your raw company details. Our AI will analyze your model, size your market, and draft a high-impact profile.
        </p>

        {/* Demo Autofill Buttons */}
        {step === 1 && (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="text-xs text-slate-500 self-center font-medium">Or test with demo data:</span>
            <button
              type="button"
              onClick={() => handleAutofill('quantumSafe')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-indigo-900/60 text-indigo-300 hover:bg-slate-800 text-xs font-semibold transition-all duration-300 flex items-center space-x-1.5"
            >
              <Rocket className="w-3.5 h-3.5 text-indigo-400" />
              <span>Autofill: QuantumSafe (SaaS)</span>
            </button>
            <button
              type="button"
              onClick={() => handleAutofill('hydraSustain')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-cyan-900/60 text-cyan-300 hover:bg-slate-800 text-xs font-semibold transition-all duration-300 flex items-center space-x-1.5"
            >
              <Rocket className="w-3.5 h-3.5 text-cyan-400" />
              <span>Autofill: HydraSustain (Climate)</span>
            </button>
            <button
              type="button"
              onClick={() => handleAutofill('oqulix')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-amber-900/60 text-amber-300 hover:bg-slate-800 text-xs font-semibold transition-all duration-300 flex items-center space-x-1.5"
            >
              <Rocket className="w-3.5 h-3.5 text-amber-400" />
              <span>Autofill: Oqulix Pvt Ltd (VR)</span>
            </button>
          </div>
        )}
      </div>

      {/* Progress Wizard Header */}
      <div className="relative mb-10 w-full">
        {/* Progress Bar */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 -z-10"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 -translate-y-1/2 -z-10 transition-all duration-500"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        ></div>

        <div className="flex justify-between items-center w-full">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 border ${
              step >= 1 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/35 scale-110' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              1
            </div>
            <span className={`text-[11px] font-semibold tracking-wide mt-2 uppercase ${step >= 1 ? 'text-indigo-400' : 'text-slate-500'}`}>
              Identity
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 border ${
              step >= 2 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/35 scale-110' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              2
            </div>
            <span className={`text-[11px] font-semibold tracking-wide mt-2 uppercase ${step >= 2 ? 'text-indigo-400' : 'text-slate-500'}`}>
              Product & Market
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 border ${
              step >= 3 
                ? 'bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-600/35 scale-110' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              3
            </div>
            <span className={`text-[11px] font-semibold tracking-wide mt-2 uppercase ${step >= 3 ? 'text-cyan-400' : 'text-slate-500'}`}>
              Funding & Team
            </span>
          </div>
        </div>
      </div>

      {/* Validation Message */}
      {validationError && (
        <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-950/20 text-red-400 text-sm font-medium animate-pulse">
          {validationError}
        </div>
      )}

      {/* Glassmorphic Form Card */}
      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        {/* Glow overlay */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {step === 1 && (
          <StepIdentity formData={formData} handleInputChange={handleInputChange} industries={industries} />
        )}

        {step === 2 && (
          <StepProductMarket formData={formData} handleInputChange={handleInputChange} />
        )}

        {step === 3 && (
          <StepFundingTeam 
            formData={formData} 
            handleInputChange={handleInputChange} 
            fundingStages={fundingStages} 
            pitchFile={pitchFile} 
            handleFileChange={handleFileChange} 
          />
        )}

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-850 flex justify-between items-center">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center space-x-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div> /* Empty spacer for flex alignment */
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-extrabold tracking-wider uppercase rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 ml-auto"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center space-x-2.5 px-7 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:brightness-110 text-white text-xs font-extrabold tracking-widest uppercase rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-300 ml-auto glow-indigo"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Generate Profile</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
