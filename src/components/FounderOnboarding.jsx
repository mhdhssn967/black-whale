import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Upload, Plus, Trash2, HelpCircle, Check, Info } from 'lucide-react';

const PRESET_TAGS = [
  "AI & ML", "HealthTech", "FinTech", "SaaS", "DeepTech", "VR/AR", "Software Development", 
  "ClimateTech", "E-Commerce", "Hardware", "B2B Enterprise", "Web3 & Blockchain"
];

const PRESET_SEGMENTS = [
  "HealthTech", "DeepTech", "VR AR", "Software Development", "FinTech", "AgriTech", "SaaS", "Cybersecurity", "Consumer Tech"
];

const DEMO_TEMPLATES = {
  oqulix: {
    name: "Oqulix Pvt Ltd",
    id: "OQX-2023-IN",
    companyType: "Startup",
    address: "Ernakulam, Kerala, India",
    segment: "VR AR",
    tags: ["AI & ML", "VR/AR", "HealthTech", "SaaS"],
    customTag: "",
    pitchDeckName: "oqulix_pitch_deck.pdf",
    contactEmail: "contact@oqulix.com",
    contactPhone: "+91 484 298 4301",
    foundedYear: "2023",
    fundingStage: "Seed",
    teamSize: "15",
    website: "https://www.oqulix.com",
    linkedin: "https://linkedin.com/company/oqulix",
    twitter: "https://x.com/oqulix",
    github: "https://github.com/oqulix-vr",
    overview: "Oqulix Private Limited is a pioneering software venture engineering immersive virtual reality (VR) systems tailored for critical sectors including medical rehabilitation, specialized education, and professional training.",
    vision: "To revolutionize physical therapy using immersive digital worlds.",
    mission: "Provide clinicians with objective movement intelligence while making recovery fun for patients.",
    tagline: "Therapeutic Virtual Reality at scale.",
    seedCapitalDeployed: "45000",
    currentMetricsSummary: "Successfully conducted 15 clinical pilot trials across South India. Over 2,300 active therapy sessions logged on current beta hardware lease systems.",
    founders: [
      { id: 1, name: "Vishnuprakash P", position: "Managing Director & CEO", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", description: "VR systems expert and lead architecture developer. Formerly built enterprise simulator systems.", qualifications: "B.Tech Computer Science", education: "CUSAT", experience: "8 years in XR" },
      { id: 2, name: "Sandeep Nambiar P", position: "Co-Founder & CTO", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", description: "Lead graphics programmer and engine developer. Expert in low-overhead Unity rendering.", qualifications: "MS Game Design", education: "IIT Madras", experience: "6 years in gaming engines" }
    ],
    gallery: [
      { id: 1, heading: "VR clinical testing room", description: "Beta hardware test room at Ernakulam MedCenter.", url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80" },
      { id: 2, heading: "Motion controller lab", description: "Calibration rig for precision hand tracking.", url: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&auto=format&fit=crop&q=60" }
    ],
    products: [
      { id: 1, name: "Oqulix Rehab Suite", description: "Immersive VR app modules focusing on range-of-motion tracking for joints.", businessModel: "B2B SaaS License", revenueStreams: "License subscription fees per headset + clinical analytics logs", competitorCompany: "MindMaze Inc", competitorProduct: "MindPod Pro", usp: "Clinical movement mapping on standalone headsets without server lag.", imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&auto=format&fit=crop&q=60" }
    ],
    metricsConfig: [
      { name: "Revenue", type: "currency", monthlyData: [12000, 14000, 18000, 22000, 25000, 29000, 33000, 38000, 45000, 52000, 60000, 70000] },
      { name: "Expenses", type: "currency", monthlyData: [20000, 21000, 22000, 24000, 26000, 27000, 29000, 31000, 34000, 37000, 40000, 43000] },
      { name: "Therapy Sessions Logged", type: "number", monthlyData: [120, 150, 190, 240, 310, 400, 520, 680, 850, 1100, 1400, 1800] }
    ],
    milestones: [
      { id: 1, year: "2023", event: "Company incorporation and first clinical lab prototype." },
      { id: 2, year: "2024", event: "Completed 15 pilot clinical trials across Kerala." },
      { id: 3, year: "2025", event: "Filing for ISO certifications and expansion to SEA." }
    ],
    askAmount: "150000",
    askYears: "2",
    askDescription: "Funding will be deployed to finalize clinical product certification, scale software distributions, and hire engineering heads.",
    equityOffered: "12",
    utilizationItems: [
      { id: 1, category: "Engineering & R&D", amount: 4000, isMonthly: true },
      { id: 2, category: "Clinical Trials & Compliance", amount: 34000, isMonthly: false },
      { id: 3, category: "Server Hosting Infrastructure", amount: 800, isMonthly: true },
      { id: 4, category: "Marketing Campaign", amount: 800, isMonthly: false }
    ]
  },
  quantum: {
    name: "QuantumSafe Corp",
    id: "QSF-9088-US",
    companyType: "Startup",
    address: "Palo Alto, California, USA",
    segment: "DeepTech",
    tags: ["DeepTech", "AI & ML", "SaaS", "Cybersecurity"],
    customTag: "",
    pitchDeckName: "quantumsafe_pitch.pdf",
    contactEmail: "invest@quantumsafe.io",
    contactPhone: "+1 (650) 890-4431",
    foundedYear: "2024",
    fundingStage: "Series A",
    teamSize: "28",
    website: "https://quantumsafe.io",
    linkedin: "https://linkedin.com/company/quantumsafe",
    twitter: "https://x.com/quantumsafe",
    github: "https://github.com/quantumsafe-org",
    overview: "QuantumSafe Corp builds quantum-resistant cryptographic layers for cloud computing, ensuring modern corporate databases remain protected against tomorrow's quantum computing decryption models.",
    vision: "To render standard cloud databases future-proof against advanced decryption threats.",
    mission: "Deploy lattice-based security wrappers seamlessly to existing client data pipelines.",
    tagline: "Securing the future against quantum attacks.",
    seedCapitalDeployed: "120000",
    currentMetricsSummary: "Completed 3 beta tests with Tier-1 banking partners. Signed letters of intent (LOI) value at ₹3.7 Crores ARR.",
    founders: [
      { id: 1, name: "Dr. Elena Rostova", position: "Founder & CEO", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80", description: "Research cryptography head. Authored 12 papers on post-quantum lattice security configurations.", qualifications: "PhD in Mathematics, MIT", education: "MIT", experience: "12 years in cryptography" }
    ],
    gallery: [
      { id: 1, heading: "Security Operations Center", description: "Real-time threat monitoring and key generation tests.", url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60" }
    ],
    products: [
      { id: 1, name: "LatticeShield Proxy", description: "Reverse proxy encrypting all outbound payloads via Kyber/Dilithium algorithms.", businessModel: "B2B SaaS", revenueStreams: "Tiered subscription licenses based on monthly database query volumes", competitorCompany: "Cloudflare Inc", competitorProduct: "Cloudflare Post-Quantum", usp: "Plug-and-play lattice wrappers without code changes to backend APIs.", imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60" }
    ],
    metricsConfig: [
      { name: "Revenue", type: "currency", monthlyData: [5000, 8000, 12000, 15000, 19000, 24000, 30000, 38000, 48000, 60000, 75000, 92000] },
      { name: "Expenses", type: "currency", monthlyData: [35000, 36000, 38000, 40000, 43000, 46000, 50000, 55000, 62000, 70000, 80000, 90000] },
      { name: "Queries Shielded (M)", type: "number", monthlyData: [1.2, 1.8, 2.5, 3.4, 4.8, 6.2, 8.5, 11.2, 15.0, 21.0, 29.0, 40.0] }
    ],
    milestones: [
      { id: 1, year: "2024", event: "Incorporation and validation of core LatticeShield SDK." },
      { id: 2, year: "2025", event: "Launched pilot integrations with three US financial organizations." }
    ],
    askAmount: "500000",
    askYears: "3",
    askDescription: "Capital raised will be focused on expanding enterprise sales channels and completing SOC-2 compliance audits.",
    equityOffered: "10",
    utilizationItems: [
      { id: 1, category: "R&D Cryptography", amount: 10000, isMonthly: true },
      { id: 2, category: "Security Compliance Audits", amount: 50000, isMonthly: false },
      { id: 3, category: "Marketing & Enterprise Outreach", amount: 2500, isMonthly: true }
    ]
  }
};

export default function FounderOnboarding({ onSubmitStartup }) {
  const [step, setStep] = useState(1);
  const [validationError, setValidationError] = useState("");

  // Complete onboarding state
  const [formData, setFormData] = useState({
    // Section 1
    name: "",
    id: "",
    companyType: "Startup",
    address: "",
    segment: "Software Development",
    tags: [],
    customTag: "",
    pitchDeckName: "",
    contactEmail: "",
    contactPhone: "",
    foundedYear: new Date().getFullYear().toString(),
    fundingStage: "Seed",
    teamSize: "1-10",
    website: "",
    linkedin: "",
    twitter: "",
    github: "",
    overview: "",
    vision: "",
    mission: "",
    tagline: "",

    // Section 2
    seedCapitalDeployed: "",
    currentMetricsSummary: "",

    // Section 4: Founders
    founders: [],

    // Section 5: Gallery
    gallery: [],

    // Section 6: Products & Services
    products: [],

    // Section 7: Projections & Milestones
    metricsConfig: [
      { name: "Revenue", type: "currency", monthlyData: Array(12).fill(0) },
      { name: "Expenses", type: "currency", monthlyData: Array(12).fill(0) }
    ],
    customMetricsList: [], // dynamic custom metric names e.g., ["Users"]
    milestones: [],

    // Section 7: Ask & Utilization
    askAmount: "100000",
    askYears: "2",
    askDescription: "",
    equityOffered: "10",
    utilizationItems: []
  });

  // Dynamic input states for lists
  const [founderInput, setFounderInput] = useState({
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    photoName: "default_founder.jpg",
    name: "",
    position: "",
    description: "",
    qualifications: "",
    education: "",
    experience: ""
  });

  const [galleryInput, setGalleryInput] = useState({
    url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80",
    fileName: "default_gallery.jpg",
    heading: "",
    description: ""
  });

  const [productInput, setProductInput] = useState({
    name: "",
    description: "",
    businessModel: "",
    revenueStreams: "",
    competitorCompany: "",
    competitorProduct: "",
    usp: "",
    imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&auto=format&fit=crop&q=60",
    imageName: "default_product.jpg"
  });

  const [milestoneInput, setMilestoneInput] = useState({
    year: new Date().getFullYear().toString(),
    event: ""
  });

  const [utilizationInput, setUtilizationInput] = useState({
    category: "",
    amount: "",
    isMonthly: false
  });

  const [customMetricName, setCustomMetricName] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  // Tag helper functions
  const togglePresetTag = (tag) => {
    setFormData(prev => {
      const exists = prev.tags.includes(tag);
      const updated = exists ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag];
      return { ...prev, tags: updated };
    });
  };

  const handleAddCustomTag = () => {
    if (formData.customTag.trim()) {
      setFormData(prev => {
        if (prev.tags.includes(prev.customTag.trim())) return prev;
        return {
          ...prev,
          tags: [...prev.tags, prev.customTag.trim()],
          customTag: ""
        };
      });
    }
  };

  // Dynamic list appenders
  const handleAddFounder = () => {
    if (!founderInput.name.trim() || !founderInput.position.trim()) {
      setValidationError("Founder Name and Position are required.");
      return;
    }
    setFormData(prev => ({
      ...prev,
      founders: [...prev.founders, { ...founderInput, id: Date.now() }]
    }));
    setFounderInput({
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      photoName: "default_founder.jpg",
      name: "",
      position: "",
      description: "",
      qualifications: "",
      education: "",
      experience: ""
    });
    setValidationError("");
  };

  const handleRemoveFounder = (id) => {
    setFormData(prev => ({
      ...prev,
      founders: prev.founders.filter(f => f.id !== id)
    }));
  };

  const handleAddGalleryImage = () => {
    if (!galleryInput.heading.trim()) {
      setValidationError("Image Heading is required.");
      return;
    }
    setFormData(prev => ({
      ...prev,
      gallery: [...prev.gallery, { ...galleryInput, id: Date.now() }]
    }));
    setGalleryInput({
      url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80",
      fileName: "default_gallery.jpg",
      heading: "",
      description: ""
    });
    setValidationError("");
  };

  const handleRemoveGalleryImage = (id) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(img => img.id !== id)
    }));
  };

  const handleAddProduct = () => {
    if (!productInput.name.trim() || !productInput.description.trim()) {
      setValidationError("Product Name and Description are required.");
      return;
    }
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { ...productInput, id: Date.now() }]
    }));
    setProductInput({
      name: "",
      description: "",
      businessModel: "",
      revenueStreams: "",
      competitorCompany: "",
      competitorProduct: "",
      usp: "",
      imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&auto=format&fit=crop&q=60",
      imageName: "default_product.jpg"
    });
    setValidationError("");
  };

  const handleRemoveProduct = (id) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const handleAddMilestone = () => {
    if (!milestoneInput.event.trim()) return;
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { ...milestoneInput, id: Date.now() }].sort((a, b) => Number(a.year) - Number(b.year))
    }));
    setMilestoneInput({
      year: new Date().getFullYear().toString(),
      event: ""
    });
  };

  const handleRemoveMilestone = (id) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== id)
    }));
  };

  // Custom metric appender
  const handleAddCustomMetric = () => {
    if (customMetricName.trim()) {
      const exists = formData.metricsConfig.some(m => m.name.toLowerCase() === customMetricName.trim().toLowerCase());
      if (exists) return;
      setFormData(prev => ({
        ...prev,
        metricsConfig: [...prev.metricsConfig, {
          name: customMetricName.trim(),
          type: "number",
          monthlyData: Array(12).fill(0)
        }]
      }));
      setCustomMetricName("");
    }
  };

  const handleRemoveMetric = (name) => {
    if (name === "Revenue" || name === "Expenses") return; // Keep core values
    setFormData(prev => ({
      ...prev,
      metricsConfig: prev.metricsConfig.filter(m => m.name !== name)
    }));
  };

  const handleMonthlyDataChange = (metricName, monthIdx, value) => {
    setFormData(prev => ({
      ...prev,
      metricsConfig: prev.metricsConfig.map(metric => {
        if (metric.name === metricName) {
          const updatedData = [...metric.monthlyData];
          updatedData[monthIdx] = Number(value) || 0;
          return { ...metric, monthlyData: updatedData };
        }
        return metric;
      })
    }));
  };

  // Pitch file mock
  const [pitchFile, setPitchFile] = useState(null);
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

  // Financial Ask & Utilization Calculations
  const totalAskAmount = Number(formData.askAmount) || 0;
  const askYears = Number(formData.askYears) || 1;

  // Calculate actual costs allocated
  const calculateAllocatedAmount = () => {
    return formData.utilizationItems.reduce((acc, item) => {
      let cost = Number(item.amount) || 0;
      if (item.isMonthly) {
        cost = cost * 12 * askYears;
      }
      return acc + cost;
    }, 0);
  };

  const allocatedAmount = calculateAllocatedAmount();
  const remainingBalance = totalAskAmount - allocatedAmount;

  const handleAddUtilizationItem = () => {
    if (!utilizationInput.category.trim() || !utilizationInput.amount) {
      setValidationError("Category and Allocation amount are required.");
      return;
    }
    const cost = Number(utilizationInput.amount);
    if (isNaN(cost)) {
      setValidationError("Allocation amount must be a number.");
      return;
    }

    setFormData(prev => ({
      ...prev,
      utilizationItems: [...prev.utilizationItems, {
        id: Date.now(),
        category: utilizationInput.category.trim(),
        amount: cost,
        isMonthly: utilizationInput.isMonthly
      }]
    }));
    setUtilizationInput({ category: "", amount: "", isMonthly: false });
    setValidationError("");
  };

  const handleRemoveUtilizationItem = (id) => {
    setFormData(prev => ({
      ...prev,
      utilizationItems: prev.utilizationItems.filter(item => item.id !== id)
    }));
  };

  // Nav validation
  const validateStep = (s) => {
    if (s === 1) {
      if (!formData.name.trim()) return "Company Name is required.";
      if (!formData.id.trim()) return "Company Identification / Reg ID is required.";
      if (!formData.address.trim()) return "HQ Address is required.";
      if (!formData.contactEmail.trim()) return "Contact Email is required.";
    }
    if (s === 2) {
      if (!formData.foundedYear.trim()) return "Founding Year is required.";
    }
    return "";
  };

  const handleNext = () => {
    const error = validateStep(step);
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError("");
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setValidationError("");
    setStep(prev => prev - 1);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // Validate everything
    onSubmitStartup({
      ...formData,
      pitchDeckName: pitchFile ? pitchFile.name : formData.pitchDeckName || "pitch_deck.pdf"
    });
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const STEPS_CONFIG = [
    { num: 1, title: "Identity & Basics" },
    { num: 2, title: "Market Segments & Tags" },
    { num: 3, title: "Pitch Assets & Media" },
    { num: 4, title: "Timeline & Links" },
    { num: 5, title: "Vision & Narrative" },
    { num: 6, title: "Deployment & Metrics" },
    { num: 7, title: "AI Sandbox Preview" },
    { num: 8, title: "Founding Team" },
    { num: 9, title: "Showcase Gallery" },
    { num: 10, title: "Products & Competition" },
    { num: 11, title: "Traction & Milestones" },
    { num: 12, title: "Ask & Fund Allocation" }
  ];

  const getStepStatus = (s) => {
    switch (s) {
      case 1:
        return (formData.name?.trim() && formData.id?.trim() && formData.address?.trim() && formData.contactEmail?.trim()) ? "complete" : "pending";
      case 2:
        return (formData.segment?.trim() && formData.tags?.length > 0) ? "complete" : "pending";
      case 3:
        return (formData.pitchDeckName || pitchFile) ? "complete" : "pending";
      case 4:
        return (formData.foundedYear && formData.teamSize) ? "complete" : "pending";
      case 5:
        return (formData.tagline?.trim() || formData.vision?.trim() || formData.mission?.trim()) ? "complete" : "pending";
      case 6:
        return (formData.seedCapitalDeployed && formData.currentMetricsSummary?.trim()) ? "complete" : "pending";
      case 7:
        return "complete"; // AI Sandbox is always complete/preview
      case 8:
        return formData.founders?.length > 0 ? "complete" : "pending";
      case 9:
        return formData.gallery?.length > 0 ? "complete" : "pending";
      case 10:
        return formData.products?.length > 0 ? "complete" : "pending";
      case 11:
        return (formData.milestones?.length > 0) ? "complete" : "pending";
      case 12:
        return (formData.askAmount && formData.utilizationItems?.length > 0) ? "complete" : "pending";
      default:
        return "pending";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 md:px-0">
      
      {/* Page Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight font-display">
          Startup Registration Portal
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-2">
          Step-by-step light-themed profile creator for the BlackWhale platform.
        </p>
      </div>

      {/* Modern Horizontal Progress Tracker */}
      <div className="mb-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
          <span>Registration Stages</span>
          <span>Section {step} of 12</span>
        </div>
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden border border-slate-300 p-0.5">
          <div 
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 12) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Sandbox Demo Autofill Selector */}
      <div className="mb-6 max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center space-x-2 text-slate-705">
          <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">AI Sandbox Mode</h4>
            <p className="text-[10px] text-slate-500">Populate onboarding with pre-researched company datasets to preview.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={() => {
              setFormData(prev => ({ ...prev, ...DEMO_TEMPLATES.oqulix }));
              setValidationError("");
            }}
            className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
          >
            Load Oqulix VR
          </button>
          <button 
            type="button" 
            onClick={() => {
              setFormData(prev => ({ ...prev, ...DEMO_TEMPLATES.quantum }));
              setValidationError("");
            }}
            className="px-3.5 py-2 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-700 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
          >
            Load QuantumSafe
          </button>
        </div>
      </div>

      {validationError && (
        <div className="max-w-4xl mx-auto mb-6 p-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 text-xs font-bold shadow-sm">
          {validationError}
        </div>
      )}

      {/* Main Grid Layout containing Sidebar and Form Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto items-start">
        
        {/* Left Sidebar showing the 12 sections */}
        <div className="lg:col-span-1 space-y-2 bg-[#f8fafc] border border-slate-205 rounded-3xl p-4 shadow-sm self-start lg:sticky lg:top-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-3">Onboarding Steps</h3>
          <div className="space-y-1.5">
            {STEPS_CONFIG.map((s) => {
              const status = getStepStatus(s.num);
              const isActive = step === s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => {
                    setStep(s.num);
                    setValidationError("");
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-[#4f46e5] border-indigo-600 text-white shadow-md shadow-indigo-650/15"
                      : "bg-white border-[#e2e8f0] text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 ${
                      isActive 
                        ? "bg-white/25 text-white" 
                        : "bg-slate-100 text-slate-650"
                    }`}>
                      {s.num}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </div>
                  
                  {status === "complete" ? (
                    <span className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 ${
                      isActive ? "bg-white/25 text-white" : "bg-emerald-100 text-emerald-600"
                    }`}>
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isActive ? "bg-white" : "bg-slate-300"
                    }`}></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-[#e2e8f0] shadow-2xl p-6 md:p-10 text-slate-800 min-h-[500px] flex flex-col justify-between">
        
        {/* Forms Switcher */}
        <div className="space-y-6">

          {/* STEP 1: IDENTITY & BASICS */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 1.1</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Identity & Core Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Company Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Acme Corp" className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Company ID / Registration No. *</label>
                  <input type="text" name="id" value={formData.id} onChange={handleInputChange} placeholder="e.g. OQX-9021" className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Company Type *</label>
                  <select name="companyType" value={formData.companyType} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer">
                    <option value="Startup">Startup</option>
                    <option value="SME">SME</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Research Venture">Research Venture</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Company Headquarters Address *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="e.g. 5th Ave, NY, USA" className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Contact Email *</label>
                  <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} placeholder="contact@acme.com" className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Contact Phone</label>
                  <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} placeholder="+1 (555) 019-2834" className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SEGMENTS & TAGS */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 1.2</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Market Segments & Tags</h3>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Primary Market Segment *</label>
                  <select name="segment" value={formData.segment} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer">
                    {PRESET_SEGMENTS.map(seg => (
                      <option key={seg} value={seg}>{seg}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Click Preset Tags to Add</label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_TAGS.map(tag => {
                      const isAdded = formData.tags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => togglePresetTag(tag)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                            isAdded 
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                              : 'bg-[#f1f5f9] border-[#cbd5e1] text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {tag} {isAdded && '✓'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Or Add Custom Tag</label>
                  <div className="flex gap-2">
                    <input type="text" name="customTag" value={formData.customTag} onChange={handleInputChange} placeholder="e.g. LogisticsTech" className="flex-1 px-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                    <button type="button" onClick={handleAddCustomTag} className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center shadow">
                      <Plus className="w-4 h-4 mr-1.5" /> Add Tag
                    </button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 bg-[#f8fafc] p-3 rounded-xl border border-dashed border-[#cbd5e1]">
                      {formData.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center space-x-1 bg-indigo-550/10 text-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                          <span>{tag}</span>
                          <button type="button" onClick={() => togglePresetTag(tag)} className="text-indigo-400 hover:text-indigo-700 ml-1">×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PITCH DECK & PITCH ASSETS */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 1.3</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Pitch Assets & Media</h3>
              </div>

              <div className="border-2 border-dashed border-[#cbd5e1] bg-[#f8fafc] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <Upload className="w-12 h-12 text-indigo-500 mb-3" />
                <p className="text-sm font-black text-slate-850 uppercase tracking-wider mb-1">Attach Pitch Deck PDF</p>
                <p className="text-xs text-slate-400 mb-5">Max file size 25MB. This deck will be analyzed by our match systems.</p>
                <label className="px-5 py-2.5 bg-white border border-[#cbd5e1] hover:bg-slate-50 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow-sm">
                  <span>{pitchFile ? "Replace Document" : "Upload Document"}</span>
                  <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                </label>
                {pitchFile && (
                  <div className="mt-4 bg-indigo-50 text-indigo-700 border border-indigo-150 px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                    Attached Pitch: {pitchFile.name}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: CORPORATE METADATA */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 1.4</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Timeline & Links</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Founding Year *</label>
                  <input type="number" name="foundedYear" value={formData.foundedYear} onChange={handleInputChange} placeholder="e.g. 2024" className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Funding Stage *</label>
                  <select name="fundingStage" value={formData.fundingStage} onChange={handleInputChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer">
                    <option value="Pre-seed">Pre-seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B">Series B</option>
                    <option value="Bootstrapped">Bootstrapped</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Team Size *</label>
                  <input type="text" name="teamSize" value={formData.teamSize} onChange={handleInputChange} placeholder="e.g. 1-10 or 25" className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Website URL</label>
                  <input type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder="https://acmecorp.com" className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Linkedin URL</label>
                  <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/company/acme" className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Twitter (X) URL</label>
                  <input type="url" name="twitter" value={formData.twitter} onChange={handleInputChange} placeholder="https://x.com/acme" className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: BRAND VISION & STORY */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 1.5</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Vision, Mission & Copywriting</h3>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Tagline</label>
                  <input type="text" name="tagline" value={formData.tagline} onChange={handleInputChange} placeholder="e.g. AI-powered cybersecurity at lightspeed." className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Vision Statement</label>
                  <input type="text" name="vision" value={formData.vision} onChange={handleInputChange} placeholder="To secure every cloud service against quantum decryptions globally." className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Mission Statement</label>
                  <input type="text" name="mission" value={formData.mission} onChange={handleInputChange} placeholder="To deliver clinical-grade lattice software layers to enterprise systems." className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Detailed Company Overview</label>
                  <textarea name="overview" value={formData.overview} onChange={handleInputChange} rows="4" placeholder="Provide a detailed, narrative-style introduction of your startup history, core technology developments, and future outlook." className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-y shadow-sm" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: SECTION 2 - CAPITAL DEPLOYMENT & METRICS */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 2</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Capital Deployment & Metrics</h3>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Seed / Historical Capital Deployed (INR / ₹)</label>
                  <input type="number" name="seedCapitalDeployed" value={formData.seedCapitalDeployed} onChange={handleInputChange} placeholder="e.g. 50000" className="w-full px-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Current Performance Metrics Summary</label>
                  <textarea name="currentMetricsSummary" value={formData.currentMetricsSummary} onChange={handleInputChange} rows="3" placeholder="Describe client pipelines, recurring revenue, pilot test rates, or user engagement statistics." className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:bg-white" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: SECTION 3 - AUTOMATED INSIGHTS */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 3</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">AI Generated Analytics</h3>
              </div>

              <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-6 rounded-2xl flex items-start gap-4 shadow-sm">
                <Info className="w-6 h-6 text-[#16a34a] shrink-0 mt-0.5" />
                <div className="space-y-1 text-slate-800">
                  <h4 className="text-sm font-black text-[#15803d] uppercase tracking-wider">Automated Scoring & Sizing</h4>
                  <p className="text-xs leading-relaxed font-semibold">
                    BlackWhale automatically calculates standard valuation parameters, investor-readiness indexes, and market sizing maps based on the inputs you provide. 
                  </p>
                  <p className="text-xs font-semibold text-[#16a34a] pt-1">
                    No manual inputs are required for this section—it will launch instantly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: SECTION 4 - FOUNDING TEAM LIST */}
          {step === 8 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 4</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Founding Team & Members</h3>
              </div>

              {/* Founder List Grid */}
              {formData.founders.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f8fafc] p-4 rounded-2xl border border-dashed border-[#cbd5e1]">
                  {formData.founders.map(founder => (
                    <div key={founder.id} className="flex gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-[#e2e8f0] relative group">
                      <img src={founder.photo} alt={founder.name} className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#cbd5e1]" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black text-slate-850 truncate">{founder.name}</p>
                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider truncate">{founder.position}</p>
                        <p className="text-[10px] text-slate-400 font-medium line-clamp-2 mt-0.5">{founder.description}</p>
                      </div>
                      <button type="button" onClick={() => handleRemoveFounder(founder.id)} className="absolute top-2 right-2 p-1.5 hover:bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Founder Mini Form */}
              <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center">
                  <Plus className="w-4 h-4 mr-1.5 text-indigo-600" /> Add New Founder
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Full Name *</label>
                    <input type="text" value={founderInput.name} onChange={e => setFounderInput(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g. Dr. Jane Doe" className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Position / Title *</label>
                    <input type="text" value={founderInput.position} onChange={e => setFounderInput(prev => ({ ...prev, position: e.target.value }))} placeholder="e.g. CEO & Co-founder" className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Education / Degree</label>
                    <input type="text" value={founderInput.education} onChange={e => setFounderInput(prev => ({ ...prev, education: e.target.value }))} placeholder="e.g. PhD in AI, Stanford" className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Professional Credentials</label>
                    <input type="text" value={founderInput.qualifications} onChange={e => setFounderInput(prev => ({ ...prev, qualifications: e.target.value }))} placeholder="e.g. ex-Google DeepMind Senior Researcher" className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Experience highlights</label>
                    <input type="text" value={founderInput.experience} onChange={e => setFounderInput(prev => ({ ...prev, experience: e.target.value }))} placeholder="e.g. 10 years in XR systems" className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Photo Upload *</label>
                    <div className="flex items-center space-x-2">
                      {founderInput.photo && (
                        <img src={founderInput.photo} alt="Preview" className="w-8 h-8 rounded-full object-cover border border-slate-205 shrink-0" />
                      )}
                      <label className="flex-1 cursor-pointer bg-white hover:bg-slate-50 border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs font-semibold flex items-center justify-between text-slate-600 transition-colors">
                        <span className="truncate">{founderInput.photoName || "Upload Photo..."}</span>
                        <Upload className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setFounderInput(prev => ({ 
                                  ...prev, 
                                  photo: event.target.result,
                                  photoName: file.name
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                          className="hidden" 
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Biography Summary</label>
                  <textarea value={founderInput.description} onChange={e => setFounderInput(prev => ({ ...prev, description: e.target.value }))} rows="2" placeholder="Brief 2-3 sentence overview of their professional contributions and technical competencies." className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                </div>
                <button type="button" onClick={handleAddFounder} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center shadow-md shadow-indigo-600/10">
                  <Plus className="w-4 h-4 mr-1.5" /> Save Founder
                </button>
              </div>
            </div>
          )}

          {/* STEP 9: SECTION 5 - COMPANY GALLERY */}
          {step === 9 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 5</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Startup Showcase Gallery</h3>
              </div>

              {/* Gallery list */}
              {formData.gallery.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#f8fafc] p-4 rounded-2xl border border-dashed border-[#cbd5e1]">
                  {formData.gallery.map(img => (
                    <div key={img.id} className="bg-white rounded-xl overflow-hidden border border-[#e2e8f0] relative group shadow-sm flex flex-col justify-between">
                      <div className="aspect-video bg-slate-900 relative">
                        <img src={img.url} alt={img.heading} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-bold text-slate-800 truncate">{img.heading}</p>
                        <p className="text-[10px] text-slate-400 font-semibold line-clamp-1">{img.description}</p>
                      </div>
                      <button type="button" onClick={() => handleRemoveGalleryImage(img.id)} className="absolute top-2 right-2 p-1.5 bg-white/95 text-red-500 rounded-lg shadow-sm hover:bg-red-50 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Image Form */}
              <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center">
                  <Plus className="w-4 h-4 mr-1.5 text-indigo-600" /> Add Gallery Asset
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Image Heading *</label>
                    <input type="text" value={galleryInput.heading} onChange={e => setGalleryInput(prev => ({ ...prev, heading: e.target.value }))} placeholder="e.g. Factory floor calibration lab" className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Image Asset Upload *</label>
                    <div className="flex items-center space-x-2">
                      {galleryInput.url && (
                        <img src={galleryInput.url} alt="Preview" className="w-8 h-8 rounded object-cover border border-slate-205 shrink-0" />
                      )}
                      <label className="flex-1 cursor-pointer bg-white hover:bg-slate-50 border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs font-semibold flex items-center justify-between text-slate-600 transition-colors">
                        <span className="truncate">{galleryInput.fileName || "Upload Image file..."}</span>
                        <Upload className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setGalleryInput(prev => ({ 
                                  ...prev, 
                                  url: event.target.result,
                                  fileName: file.name
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                          className="hidden" 
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Image Description</label>
                  <textarea value={galleryInput.description} onChange={e => setGalleryInput(prev => ({ ...prev, description: e.target.value }))} rows="2" placeholder="Describe what the asset represents (e.g. testing of biometric sensor chips)." className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                </div>
                <button type="button" onClick={handleAddGalleryImage} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center shadow">
                  <Plus className="w-4 h-4 mr-1.5" /> Save Image Asset
                </button>
              </div>
            </div>
          )}

          {/* STEP 10: SECTION 6 - PRODUCTS & SERVICES */}
          {step === 10 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 6</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Products, Services & Competitive Matrix</h3>
              </div>

              {/* Product list */}
              {formData.products.length > 0 && (
                <div className="space-y-4 bg-[#f8fafc] p-4 rounded-2xl border border-dashed border-[#cbd5e1]">
                  {formData.products.map(p => (
                    <div key={p.id} className="bg-white p-4 rounded-xl border border-[#cbd5e1] relative group shadow-sm">
                      <div className="flex gap-4">
                        <img src={p.imageUrl} alt={p.name} className="w-16 h-16 rounded-xl object-cover border shrink-0 bg-slate-950" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-black text-slate-850">{p.name}</p>
                          <p className="text-[10px] font-semibold text-slate-400 mt-0.5 line-clamp-2">{p.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 mt-3 pt-2.5 border-t border-[#f1f5f9]">
                            <p className="text-[10px] text-slate-600"><strong>Business Model:</strong> {p.businessModel}</p>
                            <p className="text-[10px] text-slate-600"><strong>Streams:</strong> {p.revenueStreams}</p>
                            <p className="text-[10px] text-slate-600"><strong>Competitor:</strong> {p.competitorCompany} ({p.competitorProduct})</p>
                            <p className="text-[10px] text-indigo-700 font-bold"><strong>Our USP:</strong> {p.usp}</p>
                          </div>
                        </div>
                      </div>
                      <button type="button" onClick={() => handleRemoveProduct(p.id)} className="absolute top-2 right-2 p-1.5 hover:bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Product Form */}
              <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest flex items-center">
                  <Plus className="w-4 h-4 mr-1.5 text-indigo-600" /> Add Product / Service profile
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Product Name *</label>
                    <input type="text" value={productInput.name} onChange={e => setProductInput(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g. Acme Rehab Pro Software" className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Product Image Upload *</label>
                    <div className="flex items-center space-x-2">
                      {productInput.imageUrl && (
                        <img src={productInput.imageUrl} alt="Preview" className="w-8 h-8 rounded object-cover border border-slate-205 shrink-0" />
                      )}
                      <label className="flex-1 cursor-pointer bg-white hover:bg-slate-50 border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs font-semibold flex items-center justify-between text-slate-600 transition-colors">
                        <span className="truncate">{productInput.imageName || "Upload Image file..."}</span>
                        <Upload className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setProductInput(prev => ({ 
                                  ...prev, 
                                  imageUrl: event.target.result,
                                  imageName: file.name
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                          className="hidden" 
                        />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Business Model</label>
                    <input type="text" value={productInput.businessModel} onChange={e => setProductInput(prev => ({ ...prev, businessModel: e.target.value }))} placeholder="e.g. B2B SaaS Device Lease" className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Revenue Streams</label>
                    <input type="text" value={productInput.revenueStreams} onChange={e => setProductInput(prev => ({ ...prev, revenueStreams: e.target.value }))} placeholder="e.g. Software License + API integration cost" className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#cbd5e1] space-y-3">
                  <h5 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest border-b pb-1.5">Competitive Landscape Mapping</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Primary Competitor Company</label>
                      <input type="text" value={productInput.competitorCompany} onChange={e => setProductInput(prev => ({ ...prev, competitorCompany: e.target.value }))} placeholder="e.g. MindMaze Inc" className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Competitor Product Name</label>
                      <input type="text" value={productInput.competitorProduct} onChange={e => setProductInput(prev => ({ ...prev, competitorProduct: e.target.value }))} placeholder="e.g. MindPod Pro" className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-indigo-700 uppercase tracking-wider">Our Unique Selling Proposition (USP) *</label>
                    <input type="text" value={productInput.usp} onChange={e => setProductInput(prev => ({ ...prev, usp: e.target.value }))} placeholder="What is your ultimate advantage over this competitor?" className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Product Description Summary *</label>
                  <textarea value={productInput.description} onChange={e => setProductInput(prev => ({ ...prev, description: e.target.value }))} rows="2" placeholder="Brief summary of the technology, delivery structure, and product highlights." className="w-full px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                </div>
                <button type="button" onClick={handleAddProduct} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center shadow">
                  <Plus className="w-4 h-4 mr-1.5" /> Save Product & Landscape
                </button>
              </div>
            </div>
          )}

          {/* STEP 11: SECTION 7.1 - DYNAMIC TRACTION & MILESTONES */}
          {step === 11 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 7.1</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Traction Metrics & Milestones</h3>
              </div>

              {/* Milestones list */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Startup Milestones Tracker</label>
                {formData.milestones.length > 0 && (
                  <div className="flex flex-col gap-2 bg-[#f8fafc] p-3 rounded-2xl border border-dashed border-[#cbd5e1]">
                    {formData.milestones.map(m => (
                      <div key={m.id} className="flex justify-between items-center bg-white p-2.5 rounded-xl border shadow-sm">
                        <span className="text-xs font-bold text-slate-700"><span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-lg mr-2 font-mono text-[10px]">{m.year}</span>{m.event}</span>
                        <button type="button" onClick={() => handleRemoveMilestone(m.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input type="number" value={milestoneInput.year} onChange={e => setMilestoneInput(prev => ({ ...prev, year: e.target.value }))} className="w-24 px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-semibold text-slate-900" />
                  <input type="text" value={milestoneInput.event} onChange={e => setMilestoneInput(prev => ({ ...prev, event: e.target.value }))} placeholder="Key Milestone / Accomplishment" className="flex-1 px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-semibold text-slate-900" />
                  <button type="button" onClick={handleAddMilestone} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center shadow"><Plus className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              {/* Monthly Expense & Revenue Grid */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest">Monthly Traction Projections</h4>
                  <div className="flex items-center gap-2">
                    <input type="text" value={customMetricName} onChange={e => setCustomMetricName(e.target.value)} placeholder="Add Metric (e.g. Users)" className="px-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs focus:outline-none" />
                    <button type="button" onClick={handleAddCustomMetric} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase flex items-center"><Plus className="w-3 h-3 mr-1" /> Add</button>
                  </div>
                </div>

                <div className="overflow-x-auto border border-[#cbd5e1] rounded-2xl bg-[#f8fafc]">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-100 border-b border-[#cbd5e1]">
                        <th className="p-3 text-[10px] font-black text-slate-500 uppercase tracking-widest w-32">Metric</th>
                        {months.map(m => (
                          <th key={m} className="p-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">{m}</th>
                        ))}
                        <th className="p-3 w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#cbd5e1]">
                      {formData.metricsConfig.map((metric) => (
                        <tr key={metric.name} className="hover:bg-slate-50">
                          <td className="p-3 text-xs font-black text-slate-700 uppercase tracking-wider">
                            {metric.name} {metric.type === 'currency' && '(₹)'}
                          </td>
                          {months.map((m, idx) => (
                            <td key={idx} className="p-1.5">
                              <input
                                type="number"
                                value={metric.monthlyData[idx]}
                                onChange={(e) => handleMonthlyDataChange(metric.name, idx, e.target.value)}
                                className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              />
                            </td>
                          ))}
                          <td className="p-3 text-center">
                            {metric.name !== "Revenue" && metric.name !== "Expenses" && (
                              <button type="button" onClick={() => handleRemoveMetric(metric.name)} className="text-red-500 hover:text-red-700"><Trash2 className="w-3.5 h-3.5" /></button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* STEP 12: SECTION 7.2 - INVESTMENT ASK & DYNAMIC UTILIZATION CALCULATOR */}
          {step === 12 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Section 7.2</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Investment Ask & Fund Allocation</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Capital Ask (INR) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-black">₹</span>
                    <input type="number" name="askAmount" value={formData.askAmount} onChange={handleInputChange} placeholder="e.g. 8400000" className="w-full pl-7 pr-3 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Runtime / Run-rate (Years) *</label>
                  <input type="number" name="askYears" value={formData.askYears} onChange={handleInputChange} placeholder="e.g. 2" className="w-full px-3 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Equity Offered (%) *</label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-black">%</span>
                    <input type="number" name="equityOffered" value={formData.equityOffered} onChange={handleInputChange} placeholder="e.g. 10" className="w-full pl-3 pr-7 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-semibold text-slate-900 focus:outline-none" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Ask Investment Description</label>
                <textarea name="askDescription" value={formData.askDescription} onChange={handleInputChange} rows="2" placeholder="Describe what milestones this capital injection will help you unlock." className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
              </div>

              {/* Fund Calculator Summary Box */}
              <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl p-5 space-y-4 mt-4 shadow-inner">
                <div className="flex justify-between items-center border-b pb-3 border-[#e2e8f0]">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest">Fund Allocation Plan</h4>
                  <div className="flex items-center gap-4 text-xs font-black">
                    <span className="text-slate-500">Ask: <span className="text-slate-800 font-mono">₹{totalAskAmount.toLocaleString('en-IN')}</span></span>
                    <span className="text-indigo-600">Allocated: <span className="font-mono">₹{allocatedAmount.toLocaleString('en-IN')}</span></span>
                    <span className={remainingBalance < 0 ? 'text-red-600' : 'text-emerald-700'}>
                      Balance: <span className="font-mono">₹{remainingBalance.toLocaleString('en-IN')}</span>
                    </span>
                  </div>
                </div>

                {remainingBalance < 0 && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-[10px] font-bold">
                    Warning: Your allocated utilization plan exceeds the capital ask amount!
                  </div>
                )}

                {/* Utilization list */}
                {formData.utilizationItems.length > 0 && (
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {formData.utilizationItems.map(item => {
                      const itemTotalCost = item.isMonthly ? item.amount * 12 * askYears : item.amount;
                      return (
                        <div key={item.id} className="flex justify-between items-center bg-white px-3 py-2 rounded-xl border border-[#e2e8f0] shadow-sm">
                          <div>
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{item.category}</span>
                            {item.isMonthly && (
                              <span className="text-[10px] text-slate-400 font-bold ml-2">(₹{item.amount.toLocaleString('en-IN')}/mo for {askYears} yrs)</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-black font-mono text-slate-800">₹{itemTotalCost.toLocaleString('en-IN')}</span>
                            <button type="button" onClick={() => handleRemoveUtilizationItem(item.id)} className="text-red-500 hover:text-red-700 p-0.5"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Add Utilization Form */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end bg-white p-3.5 rounded-xl border border-[#e2e8f0]">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Fund Use / Category</label>
                    <input type="text" value={utilizationInput.category} onChange={e => setUtilizationInput(prev => ({ ...prev, category: e.target.value }))} placeholder="e.g. Salaries, R&D, Marketing" className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Amount (₹)</label>
                    <input type="number" value={utilizationInput.amount} onChange={e => setUtilizationInput(prev => ({ ...prev, amount: e.target.value }))} placeholder="Amount" className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-semibold focus:outline-none" />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label className="flex items-center space-x-2 text-[10px] font-bold text-slate-600 select-none cursor-pointer">
                      <input type="checkbox" checked={utilizationInput.isMonthly} onChange={e => setUtilizationInput(prev => ({ ...prev, isMonthly: e.target.checked }))} className="w-4 h-4 rounded text-indigo-600" />
                      <span>Monthly cost</span>
                    </label>
                    <button type="button" onClick={handleAddUtilizationItem} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase flex items-center shadow">
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Allocation
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer controls */}
        <div className="mt-8 pt-6 border-t border-[#f1f5f9] flex justify-between items-center">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center space-x-2 px-5 py-2.5 bg-[#f8fafc] hover:bg-slate-100 border border-[#cbd5e1] text-slate-650 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 12 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-500/25 transition-all ml-auto"
            >
              <span>Next Section</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleFinalSubmit}
              disabled={remainingBalance < 0}
              className={`flex items-center space-x-2.5 px-7 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg transition-all ml-auto ${
                remainingBalance < 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:brightness-105 animate-pulse shadow-indigo-600/25'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Complete Profile</span>
            </button>
          )}
        </div>

      </div> {/* Main Form Card end */}
    </div> {/* Grid layout end */}
  </div>
  );
}
