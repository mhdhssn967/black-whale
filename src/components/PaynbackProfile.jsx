import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Building2, MapPin, Globe, Users, Target, Rocket, Download, ShieldCheck, 
  TrendingUp, Award, Briefcase, Zap, BarChart3, FileText, 
  BrainCircuit, Mail, ExternalLink, IndianRupee, CheckCircle2, ArrowLeft,
  Calendar, Check, ChevronRight, ChevronLeft, X, Activity, AlertTriangle, ChevronDown, ChevronUp
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  ComposableMap, Geographies, Geography, Marker 
} from 'react-simple-maps';
import ProfileEditorModal from './ProfileEditorModal';

// Import the Paynback separate data file
import {
  DEFAULT_MOCK_COMPANY,
  DEFAULT_EXTENSIVE_OVERVIEW,
  DEFAULT_COMPANY_PHOTOS,
  DEFAULT_revenueDataByYear,
  DEFAULT_userDataByYear,
  DEFAULT_recoveryDataByYear,
  DEFAULT_customerSegmentDataByYear,
  DEFAULT_YEARLY_GROWTH_DATA,
  DEFAULT_mapLocations,
  EMPTY_MOCK_COMPANY,
  EMPTY_EXTENSIVE_OVERVIEW,
  EMPTY_COMPANY_PHOTOS,
  EMPTY_revenueDataByYear,
  EMPTY_userDataByYear,
  EMPTY_recoveryDataByYear,
  EMPTY_customerSegmentDataByYear,
  EMPTY_YEARLY_GROWTH_DATA,
  EMPTY_mapLocations
} from '../data/paynbackData';

import paynbackLogo from '../assets/paynback/logo.png';
import paynbackCover from '../assets/paynback/cover.png';
import { db } from '../firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

const CHART_COLORS = ['#6366f1', '#06b6d4', '#10b981'];

export default function PaynbackProfile() {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const activeCompanyId = companyId || 'paynback';

  const [mockState, setMockState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth
  const authUser = sessionStorage.getItem('authenticatedUser');
  const isOwner = authUser === activeCompanyId;

  useEffect(() => {
    const fetchOrSeedData = async () => {
      try {
        const isPaynback = activeCompanyId === 'paynback';
        const baseCompany = isPaynback ? DEFAULT_MOCK_COMPANY : EMPTY_MOCK_COMPANY;
        const baseOverview = isPaynback ? DEFAULT_EXTENSIVE_OVERVIEW : EMPTY_EXTENSIVE_OVERVIEW;
        const basePhotos = isPaynback ? DEFAULT_COMPANY_PHOTOS : EMPTY_COMPANY_PHOTOS;
        const baseRevenue = isPaynback ? DEFAULT_revenueDataByYear : EMPTY_revenueDataByYear;
        const baseUsers = isPaynback ? DEFAULT_userDataByYear : EMPTY_userDataByYear;
        const baseRecovery = isPaynback ? DEFAULT_recoveryDataByYear : EMPTY_recoveryDataByYear;
        const baseSegments = isPaynback ? DEFAULT_customerSegmentDataByYear : EMPTY_customerSegmentDataByYear;
        const baseGrowth = isPaynback ? DEFAULT_YEARLY_GROWTH_DATA : EMPTY_YEARLY_GROWTH_DATA;
        const baseLocations = isPaynback ? DEFAULT_mapLocations : EMPTY_mapLocations;

        const docRef = doc(db, 'users', 'companies', activeCompanyId, 'all_data');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dbData = docSnap.data();
          const mergedTeam = (dbData.company?.team || baseCompany.team).map(member => ({
            image: "",
            ...member
          }));

          const mergedDocuments = dbData.company?.documents || baseCompany.documents;
          const mergedInvestment = {
            ...baseCompany.investment,
            ...(dbData.company?.investment || {})
          };

          setMockState({
            company: {
              ...baseCompany,
              ...dbData.company,
              team: mergedTeam,
              documents: mergedDocuments,
              investment: mergedInvestment
            },
            overview: dbData.overview || baseOverview,
            photos: dbData.photos || basePhotos,
            revenue: dbData.revenue || baseRevenue,
            users: dbData.users || baseUsers,
            recovery: dbData.recovery || baseRecovery,
            segments: dbData.segments || baseSegments,
            growth: dbData.growth || baseGrowth,
            locations: dbData.locations || baseLocations
          });
        } else {
          console.warn("No profile data found in Firestore. Please use the edit option to create it.");
          
          let name = isPaynback ? "PayNback Infosolutions LLP" : "New Company";
          if (!isPaynback) {
            try {
              const authQuery = query(collection(db, 'auth'), where('userid', '==', activeCompanyId));
              const querySnapshot = await getDocs(authQuery);
              if (!querySnapshot.empty) {
                const authData = querySnapshot.docs[0].data();
                if (authData.companyName) {
                  name = authData.companyName;
                }
              }
            } catch (err) {
              console.error("Error finding company name:", err);
            }
          }

          setMockState({
            company: {
              ...baseCompany,
              name: name,
              id: activeCompanyId.toUpperCase()
            },
            overview: baseOverview,
            photos: basePhotos,
            revenue: baseRevenue,
            users: baseUsers,
            recovery: baseRecovery,
            segments: baseSegments,
            growth: baseGrowth,
            locations: baseLocations
          });
        }
      } catch (error) {
        console.error("Error accessing Firestore:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrSeedData();
  }, [activeCompanyId]);
  const [isEditing, setIsEditing] = useState(false);

  const [mapYear, setMapYear] = useState(2026); // Set default state to current year (2026)
  const [activeLocation, setActiveLocation] = useState(activeCompanyId === 'paynback' ? {
    id: 'uae', 
    name: "UAE Office (Dubai)", 
    coordinates: [55.27, 25.20], 
    desc: "Active commercial merchant network expansion"
  } : null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [expandedTeamBio, setExpandedTeamBio] = useState({});
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sectionIds = ['overview', 'capital', 'snapshot', 'team', 'gallery', 'traction', 'vault', 'ask'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (isLoading || !mockState) {
    return (
      <div className="fixed inset-0 bg-[#f8fafc] flex flex-col items-center justify-center z-50">
        <Activity className="w-8 h-8 text-[#6366f1] animate-spin mb-4" />
        <p className="text-sm font-bold text-[#64748b] tracking-wider uppercase">Loading Profile Data...</p>
      </div>
    );
  }

  const MOCK_COMPANY = mockState.company;
  const EXTENSIVE_OVERVIEW = mockState.overview;
  const COMPANY_PHOTOS = mockState.photos;
  const revenueDataByYear = mockState.revenue;
  const userDataByYear = mockState.users;
  const recoveryDataByYear = mockState.recovery;
  const customerSegmentDataByYear = mockState.segments;
  const YEARLY_GROWTH_DATA = mockState.growth;
  const mapLocations = mockState.locations;

  const isPaynback = activeCompanyId === 'paynback';

  const pitchDeckDoc = MOCK_COMPANY.documents?.find?.(d => d.title === "Pitch Deck");
  const pitchDeckUrl = pitchDeckDoc?.document;

  // Section 1: Hero / Overview story and cards
  const hasStory = isPaynback || isOwner || (EXTENSIVE_OVERVIEW && EXTENSIVE_OVERVIEW.trim() !== "" && EXTENSIVE_OVERVIEW !== "Enter company overview here......");
  const hasVision = isOwner || (MOCK_COMPANY.vision && MOCK_COMPANY.vision.trim() !== "");
  const hasMission = isOwner || (MOCK_COMPANY.mission && MOCK_COMPANY.mission.trim() !== "");
  const hasTagline = isOwner || (MOCK_COMPANY.tagline && MOCK_COMPANY.tagline.trim() !== "");
  const hasOverview = isPaynback || isOwner || hasStory || hasVision || hasMission || hasTagline;

  // Section 2: Capital Deployment
  const hasCapital = isPaynback || isOwner || 
    ((MOCK_COMPANY.investment?.allocationReasoning && MOCK_COMPANY.investment.allocationReasoning.trim() !== "") ||
     (MOCK_COMPANY.investment?.utilization && MOCK_COMPANY.investment.utilization.length > 0 && 
      !(MOCK_COMPANY.investment.utilization.length === 1 && MOCK_COMPANY.investment.utilization[0].category === "R&D" && MOCK_COMPANY.investment.utilization[0].percentage === 100)));

  // Section 3: Investor Snapshot
  const hasSnapshot = isPaynback || isOwner || 
    (YEARLY_GROWTH_DATA && Object.values(YEARLY_GROWTH_DATA).some(yr => 
      (yr.revenue && yr.revenue !== "0" && yr.revenue !== "") ||
      (yr.merchants && yr.merchants !== "0" && yr.merchants !== "") ||
      (yr.sessions && yr.sessions !== "0" && yr.sessions !== "") ||
      (yr.analysis && yr.analysis.trim() !== "")
    ));

  // Section 4: Founding Team
  const hasTeam = isPaynback || isOwner || 
    (MOCK_COMPANY.team && MOCK_COMPANY.team.length > 0 && 
     !(MOCK_COMPANY.team.length === 1 && MOCK_COMPANY.team[0].name === "Founder Name" && MOCK_COMPANY.team[0].role === "Founder & CEO" && !MOCK_COMPANY.team[0].shortBio));

  // Section 5: Company Gallery
  const hasGallery = isPaynback || isOwner || (COMPANY_PHOTOS && COMPANY_PHOTOS.length > 0);

  // Section 6: Traction & Map
  const hasMapLocations = mapLocations && Object.values(mapLocations).some(arr => arr && arr.length > 0);
  const hasChartData = (revenueDataByYear && Object.values(revenueDataByYear).some(arr => arr && arr.some(item => item.revenue > 0 || item.expenses > 0))) ||
                       (userDataByYear && Object.values(userDataByYear).some(arr => arr && arr.some(item => item.sessions > 0)));
  const hasTraction = isPaynback || isOwner || hasMapLocations || hasChartData;

  // Section 7: Document Vault
  const hasDocuments = isPaynback || isOwner || 
    (MOCK_COMPANY.documents && Object.values(MOCK_COMPANY.documents).some(doc => doc && doc.url && doc.url.trim() !== ""));

  // Section 8: Investment Ask
  const hasInvestmentAsk = isPaynback || isOwner || 
    ((MOCK_COMPANY.investment?.ask && MOCK_COMPANY.investment.ask.trim() !== "") ||
     (MOCK_COMPANY.investment?.target && MOCK_COMPANY.investment.target.trim() !== "") ||
     (MOCK_COMPANY.investment?.valuation && MOCK_COMPANY.investment.valuation.trim() !== "") ||
     (MOCK_COMPANY.raised && MOCK_COMPANY.raised.trim() !== "") ||
     (MOCK_COMPANY.required && MOCK_COMPANY.required.trim() !== ""));

  // Section 5 items inside grid
  const hasOverviewSection = isPaynback || isOwner || 
    ((MOCK_COMPANY.overview?.story && MOCK_COMPANY.overview.story.trim() !== "") ||
     (MOCK_COMPANY.overview?.problem && MOCK_COMPANY.overview.problem.trim() !== "") ||
     (MOCK_COMPANY.overview?.solution && MOCK_COMPANY.overview.solution.trim() !== "") ||
     (MOCK_COMPANY.overview?.advantage && MOCK_COMPANY.overview.advantage.trim() !== ""));

  const hasProducts = isPaynback || isOwner || 
    (MOCK_COMPANY.products && MOCK_COMPANY.products.length > 0 && 
     !(MOCK_COMPANY.products.length === 1 && MOCK_COMPANY.products[0].name === "Product 1" && !MOCK_COMPANY.products[0].overview));

  const hasBusinessModel = isPaynback || isOwner || 
    ((MOCK_COMPANY.businessModel?.streams && MOCK_COMPANY.businessModel.streams.length > 0) ||
     (MOCK_COMPANY.businessModel?.unitEconomics?.cac && MOCK_COMPANY.businessModel.unitEconomics.cac.trim() !== "") ||
     (MOCK_COMPANY.businessModel?.unitEconomics?.ltv && MOCK_COMPANY.businessModel.unitEconomics.ltv.trim() !== ""));

  const hasCompetitors = isPaynback || isOwner || 
    (MOCK_COMPANY.competitors && MOCK_COMPANY.competitors.length > 0 && 
     !(MOCK_COMPANY.competitors.length === 1 && MOCK_COMPANY.competitors[0].name === "Competitor 1" && !MOCK_COMPANY.competitors[0].tech));

  const hasAIScore = isPaynback || isOwner || (MOCK_COMPANY.aiScore && MOCK_COMPANY.aiScore.overall > 0);

  return (
    <div className="fixed inset-0 bg-[#f8fafc] text-[#334155] z-50 overflow-y-auto font-sans">
      
      {/* Top Floating Navigation Bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] z-50 px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between shadow-sm gap-3 md:gap-0">
        <div className="flex items-center w-full md:w-auto space-x-3">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 hover:bg-[#f1f5f9] rounded-xl transition-colors text-[#475569]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest block">Interlix Showcase</span>
            <h2 className="text-base font-black text-[#0f172a] leading-tight">{MOCK_COMPANY.name} Profile</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end">
          {isOwner && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] font-extrabold text-[10px] md:text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm text-center"
            >
              Edit Data
            </button>
          )}
          <button 
            onClick={() => navigate('/')}
            className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-extrabold text-[10px] md:text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-600/10 text-center"
          >
            Exit Profile
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Left Column: TOC Sidebar */}
        <div className="hidden lg:block w-60 flex-shrink-0">
          <div className="sticky top-28 bg-white border border-[#e2e8f0] p-4 rounded-3xl shadow-sm space-y-1">
            <p className="text-[10px] text-[#64748b] font-black uppercase tracking-widest mb-2 border-b border-[#f1f5f9] pb-1.5">Navigate Profile</p>
            {[
              { id: 'overview', label: 'Company Overview', icon: Building2, visible: hasOverview },
              { id: 'capital', label: 'Capital Strategy', icon: TrendingUp, visible: hasCapital },
              { id: 'snapshot', label: 'Investor Snapshot', icon: Zap, visible: hasSnapshot },
              { id: 'team', label: 'Founding Team', icon: Users, visible: hasTeam },
              { id: 'gallery', label: 'Company Gallery', icon: Globe, visible: hasGallery },
              { id: 'traction', label: 'Traction & Map', icon: Activity, visible: hasTraction },
              { id: 'vault', label: 'Document Vault', icon: FileText, visible: hasDocuments },
              { id: 'ask', label: 'Investment Ask', icon: Rocket, visible: hasInvestmentAsk }
            ].filter(item => item.visible).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-200 text-xs font-semibold ${
                    isActive 
                      ? 'bg-[#6366f1] text-white shadow-md shadow-indigo-600/10 font-black scale-[1.02]' 
                      : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="flex-1 space-y-10 min-w-0">
          
          {/* SECTION 1: HERO HEADER */}
          <div id="overview" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl overflow-hidden shadow-sm">
          {/* Header Banner Background */}
          <div className="h-48 md:h-60 relative overflow-hidden">
            {MOCK_COMPANY.cover?.startsWith('http') ? (
              <img src={MOCK_COMPANY.cover} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-slate-800 to-indigo-950"></div>
            )}
            <div className="absolute inset-0 bg-[#0f172a]/10"></div>
          </div>
          
          <div className="px-6 md:px-8 pb-8 relative">
            <div className="flex flex-col sm:flex-row items-start gap-5 pt-6 mb-6">
              <div className="w-28 h-28 bg-white text-white rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden font-black text-3xl shadow-sm border border-slate-100">
                {MOCK_COMPANY.logo?.startsWith('http') ? (
                  <img src={MOCK_COMPANY.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-3xl">
                    {MOCK_COMPANY.name?.substring(0, 2).toUpperCase() || 'CO'}
                  </div>
                )}
              </div>
              <div className="space-y-4 pb-1 flex-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-4xl font-black text-[#0f172a] tracking-tight">{MOCK_COMPANY.name}</h1>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ecfdf5] text-[#065f46] border border-[#d1fae5]">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#475569] font-bold">
                    <span className="bg-[#f1f5f9] px-2 py-0.5 rounded text-[#475569]">ID: {MOCK_COMPANY.id}</span>
                    <span className="flex items-center"><Building2 className="w-4 h-4 mr-1 text-[#64748b]"/> {MOCK_COMPANY.type}</span>
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-[#64748b]"/> {MOCK_COMPANY.hq}</span>
                    <span className="flex items-center"><Target className="w-4 h-4 mr-1 text-[#64748b]"/> {MOCK_COMPANY.industry}</span>
                  </div>
                </div>

                {/* Aspect & Segment Tags */}
                {MOCK_COMPANY.tags && MOCK_COMPANY.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {MOCK_COMPANY.tags.map((tag, idx) => (
                      <span key={idx} className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md border ${tag.color || 'bg-slate-50 text-slate-700 border-slate-100'}`}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto pt-1">
                  {(isPaynback || isOwner || (pitchDeckUrl && pitchDeckUrl.trim() !== "")) && (
                    <button 
                      onClick={() => {
                        if (pitchDeckUrl) {
                          window.open(pitchDeckUrl, '_blank');
                        } else {
                          alert("No pitch deck document uploaded yet. Please click 'Edit Data' to add it.");
                        }
                      }}
                      className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#334155] rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center shadow-sm cursor-pointer"
                    >
                      <Download className="w-4 h-4 mr-2 text-[#475569]" /> Pitch Deck
                    </button>
                  )}
                  <button className="flex-1 sm:flex-none px-6 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white border border-transparent rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center shadow-md shadow-indigo-600/10 cursor-pointer">
                    <Mail className="w-4 h-4 mr-2" /> Connect
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-[#e2e8f0] my-6">
              <div>
                <p className="text-[10px] text-[#64748b] font-black uppercase tracking-wider mb-1">FOUNDED YEAR</p>
                <p className="text-base font-black text-[#0f172a]">{MOCK_COMPANY.founded}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748b] font-black uppercase tracking-wider mb-1">FUNDING STAGE</p>
                <p className="text-base font-black text-[#6366f1]">{MOCK_COMPANY.stage}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748b] font-black uppercase tracking-wider mb-1">TEAM SIZE</p>
                <p className="text-base font-black text-[#0f172a]">{MOCK_COMPANY.teamSize} Members</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748b] font-black uppercase tracking-wider mb-1">WEBSITE & LINKS</p>
                <div className="flex items-center space-x-2 text-[#6366f1] text-xs font-bold">
                  <a href={MOCK_COMPANY.website} className="hover:underline flex items-center">Visit site <ExternalLink className="w-3 h-3 ml-1" /></a>
                </div>
              </div>
            </div>

            {/* Company Overview with Read More */}
            {hasStory && (
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-6 mb-6">
                <span className="text-[10px] text-[#6366f1] font-black uppercase tracking-wider mb-2 block">Company Overview</span>
                <div className="text-xs font-semibold text-[#475569] leading-relaxed transition-all duration-300">
                  {showFullOverview ? EXTENSIVE_OVERVIEW : `${EXTENSIVE_OVERVIEW.slice(0, 240)}...`}
                </div>
                <button 
                  onClick={() => setShowFullOverview(!showFullOverview)} 
                  className="mt-3 text-xs font-black text-[#6366f1] hover:text-[#4f46e5] flex items-center transition-colors focus:outline-none"
                >
                  {showFullOverview ? (
                    <>Read Less <ChevronUp className="w-4 h-4 ml-1" /></>
                  ) : (
                    <>Read More <ChevronDown className="w-4 h-4 ml-1" /></>
                  )}
                </button>
              </div>
            )}

            {/* Vision Block */}
            {(hasVision || hasMission || hasTagline) && (
              <div className={`bg-[#f5f3ff] border border-[#ddd6fe] rounded-2xl p-6 gap-6 ${
                [hasVision, hasMission, hasTagline].filter(Boolean).length === 3 
                  ? 'grid md:grid-cols-3' 
                  : [hasVision, hasMission, hasTagline].filter(Boolean).length === 2 
                    ? 'grid md:grid-cols-2' 
                    : 'grid md:grid-cols-1'
              }`}>
                {hasVision && (
                  <div>
                    <p className="text-[10px] text-[#6366f1] font-black uppercase tracking-wider mb-1">VISION</p>
                    <p className="text-xs font-semibold text-[#475569] leading-relaxed">"{MOCK_COMPANY.vision}"</p>
                  </div>
                )}
                {hasMission && (
                  <div>
                    <p className="text-[10px] text-[#6366f1] font-black uppercase tracking-wider mb-1">MISSION</p>
                    <p className="text-xs font-semibold text-[#475569] leading-relaxed">"{MOCK_COMPANY.mission}"</p>
                  </div>
                )}
                {hasTagline && (
                  <div>
                    <p className="text-[10px] text-[#06b6d4] font-black uppercase tracking-wider mb-1">TAGLINE</p>
                    <p className="text-sm font-black text-[#0f172a]">"{MOCK_COMPANY.tagline}"</p>
                  </div>
                )}
              </div>
            )}

          </div>
      </div>

      {/* SECTION: CAPITAL DEPLOYMENT & METRICS */}
      {hasCapital && (
        <div id="capital" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#6366f1]" />
              <h3 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Capital Deployment & Financial Strategy</h3>
            </div>
            <span className="text-[10px] bg-[#ecfdf5] text-[#047857] font-black px-2.5 py-1 rounded-md border border-[#d1fae5]">AUDITED Q1 2026</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Historical Seed Deployment Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-[#64748b] uppercase tracking-wider">Seed Capital Deployment (₹1.5 Crores Raised)</h4>
              <div className="space-y-3">
                {[
                  { label: "Merchant Acquisition & Onboarding", val: "₹60 Lakhs", pct: "40%", desc: "B2B sales network and POS marketing collateral." },
                  { label: "Ledger R&D & Core Systems", val: "₹52.5 Lakhs", pct: "35%", desc: "Developed micro-ledger engine and UPI callback APIs." },
                  { label: "Operations & Marketing", val: "₹37.5 Lakhs", pct: "25%", desc: "Compliance registration, office lease, and user launch campaigns." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between text-xs font-black">
                      <span className="text-[#0f172a]">{item.label}</span>
                      <span className="text-[#6366f1]">{item.val} ({item.pct})</span>
                    </div>
                    <div className="h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#6366f1]" style={{ width: item.pct }}></div>
                    </div>
                    <p className="text-[10px] text-[#475569] font-medium leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Runway & Financial Metrics */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-[#64748b] uppercase tracking-wider">Current Treasury & Runway Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "MONTHLY BURN RATE", value: "₹4.5 Lakhs", sub: "Operational Expenses" },
                  { label: "CURRENT CASH BALANCE", value: "₹68 Lakhs", sub: "Remaining Seed Reserves" },
                  { label: "PROJECTED RUNWAY", value: "15.1 Months", sub: "Until Next Round" },
                  { label: "LTV / CAC RATIO", value: "15.0x", sub: "LTV: ₹1.8k / CAC: ₹120" }
                ].map((metric, idx) => (
                  <div key={idx} className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-2xl flex flex-col justify-between min-h-[90px]">
                    <div>
                      <span className="text-[9px] text-[#64748b] font-black uppercase tracking-wider block">{metric.label}</span>
                      <span className="text-base font-black text-[#0f172a] block mt-1">{metric.value}</span>
                    </div>
                    <span className="text-[8px] text-[#475569] font-semibold mt-1 block">{metric.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Outcomes Achieved with Seed Capital */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-[#64748b] uppercase tracking-wider">Deployment Milestones Achieved</h4>
              <div className="bg-[#f5f3ff] border border-[#e0e7ff] p-5 rounded-2xl space-y-4 flex flex-col justify-between h-[288px]">
                <div className="space-y-3 text-xs font-semibold text-[#475569]">
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Integrated multi-bank UPI settlement routing under 100ms.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Onboarded 120+ retail merchants in HSR Layout and Koramangala.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Scaled consumer app to 45,000 active wallets with 82% margin.</span>
                  </div>
                </div>
                <div className="bg-white border border-[#cbd5e1] p-3 rounded-xl text-[10px] font-bold text-[#4f46e5] flex items-center justify-between">
                  <span>Audit Document: Seed Allocation Ledger.pdf</span>
                  <Download className="w-3.5 h-3.5 cursor-pointer text-[#64748b] hover:text-[#4f46e5]" />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

        {/* SECTION 2: INVESTOR SNAPSHOT */}
        {hasSnapshot && (
          <div id="snapshot" className="scroll-mt-24 space-y-4 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-[#6366f1]" />
              <h3 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Investor Snapshot</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "CAPITAL RAISED", value: MOCK_COMPANY.raised, desc: "Seed Round" },
                { label: "FUNDING REQUIRED", value: MOCK_COMPANY.required, color: "text-[#6366f1]", desc: "For scaling & marketing" },
                { label: "CURRENT REVENUE", value: MOCK_COMPANY.revenue, desc: "MRR SaaS + Comm" },
                { label: "GROWTH RATE", value: MOCK_COMPANY.growth, color: "text-[#10b981]", desc: "Month-over-Month" },
                { label: "PARTNER MERCHANTS", value: MOCK_COMPANY.customers, desc: "Retail & E-comm" },
                { label: "COUNTRIES", value: MOCK_COMPANY.countries, desc: "India & UAE" },
                { label: "ACTIVE PRODUCTS", value: MOCK_COMPANY.activeProducts, desc: "Apps & Portals" },
                { label: "BENCHMARK STAGE", value: MOCK_COMPANY.stage, desc: "Ready for Seed VCs" }
              ].map((kpi, i) => (
                <div key={i} className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] text-[#64748b] font-black uppercase tracking-wider mb-1">{kpi.label}</p>
                  <p className={`text-xl font-black ${kpi.color || 'text-[#0f172a]'}`}>{kpi.value}</p>
                  <p className="text-[10px] text-[#475569] font-semibold mt-1">{kpi.desc}</p>
                </div>
              ))}
            </div>
            {MOCK_COMPANY.aiSummary && MOCK_COMPANY.aiSummary.trim() !== "" && (
              <div className="bg-[#f5f3ff] border-l-4 border-l-[#6366f1] p-5 rounded-r-2xl border border-[#e0e7ff]">
                <p className="text-xs font-semibold text-[#475569] leading-relaxed">
                  <span className="font-black text-[#4f46e5] mr-1.5 uppercase tracking-wide">AI Summary:</span>
                  {MOCK_COMPANY.aiSummary}
                </p>
              </div>
            )}
          </div>
        )}

        {/* SECTION: FOUNDING TEAM */}
        {hasTeam && (
          <div id="team" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
            <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
              <Users className="w-5 h-5 text-[#6366f1]" />
              <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Founding Team</h4>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {MOCK_COMPANY.team.map((member, tIdx) => {
                const isExpanded = expandedTeamBio[tIdx] || false;
                return (
                  <div key={tIdx} className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    {/* Header Row */}
                    <div className="p-5 pb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#818cf8] flex items-center justify-center font-black text-white shadow-lg text-sm flex-shrink-0 overflow-hidden">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            member.name.split(' ').map(n=>n[0]).join('')
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-black text-[#0f172a]">{member.name}</h5>
                          <p className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest mt-0.5">{member.role}</p>
                          
                          {/* Tagline Badges */}
                          {member.tagline && (
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {member.tagline.split(' | ').map((tag, tagIdx) => (
                                <span key={tagIdx} className="text-[9px] font-bold text-[#6366f1] bg-[#eef2ff] border border-[#e0e7ff] px-2 py-0.5 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bio Section */}
                    <div className="px-5 pb-2">
                      <p className="text-xs font-semibold text-[#475569] leading-relaxed">
                        {member.shortBio || member.bio}
                      </p>

                      {/* Expandable Full Bio */}
                      {member.fullBio && member.fullBio.length > 0 && (
                        <>
                          <div 
                            className="overflow-hidden transition-all duration-500 ease-in-out"
                            style={{ 
                              maxHeight: isExpanded ? `${member.fullBio.length * 60}px` : '0px',
                              opacity: isExpanded ? 1 : 0 
                            }}
                          >
                            <ul className="mt-3 space-y-2 border-l-2 border-[#6366f1]/20 pl-3">
                              {member.fullBio.map((point, pIdx) => (
                                <li key={pIdx} className="text-[11px] font-semibold text-[#475569] leading-relaxed flex items-start space-x-2">
                                  <span className="w-1 h-1 rounded-full bg-[#6366f1] mt-1.5 flex-shrink-0"></span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <button 
                            onClick={() => setExpandedTeamBio(prev => ({ ...prev, [tIdx]: !prev[tIdx] }))}
                            className="mt-3 mb-1 flex items-center space-x-1.5 text-[10px] font-black text-[#6366f1] uppercase tracking-wider hover:text-[#4f46e5] transition-colors group"
                          >
                            <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </>
                      )}
                    {/* Footer: Experience & Education Tags */}
                    {((member.exp && member.exp.trim() !== "") || (member.edu && member.edu !== 'N/A' && member.edu.trim() !== "")) && (
                      <div className="px-5 pb-5 pt-2 flex flex-wrap gap-3">
                        {member.exp && member.exp.trim() !== "" && (
                          <div className="bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
                            <p className="text-[9px] font-black text-[#94a3b8] uppercase tracking-widest mb-1.5">Expertise</p>
                            <div className="flex flex-wrap gap-1">
                              {member.exp.split(', ').map((skill, sIdx) => (
                                <span key={sIdx} className="text-[9px] font-bold text-[#334155] bg-[#f1f5f9] px-2 py-0.5 rounded-md">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {member.edu && member.edu !== 'N/A' && member.edu.trim() !== "" && (
                          <div className="bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
                            <p className="text-[9px] font-black text-[#94a3b8] uppercase tracking-widest mb-1">Education</p>
                            <p className="text-[10px] font-semibold text-[#475569]">{member.edu}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

        {/* SECTION: COMPANY GALLERY */}
        {hasGallery && (
          <div id="gallery" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-[#6366f1]" />
                <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Company Gallery</h4>
              </div>
              <span className="text-[10px] bg-[#f1f5f9] text-[#64748b] font-bold px-2 py-1 rounded-md">{COMPANY_PHOTOS.length} Photos</span>
            </div>

            <div className="relative">
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-500 overflow-hidden ${showAllPhotos ? 'max-h-[1000px]' : 'max-h-[190px]'}`}>
                {COMPANY_PHOTOS.map((photo, pIdx) => (
                  <div 
                    key={pIdx} 
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#e2e8f0] bg-slate-50 aspect-video md:aspect-[4/3] shadow-sm hover:shadow-md transition-all duration-300"
                    onClick={() => setActivePhotoIndex(pIdx)}
                  >
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                      <p className="text-[10px] text-white font-black uppercase tracking-wider">{photo.title}</p>
                      <p className="text-[9px] text-[#cbd5e1] font-semibold mt-0.5 line-clamp-1">{photo.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Faded overlay at bottom of the gallery indicating there are more images */}
              {!showAllPhotos && (
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none flex items-end justify-center pb-2">
                </div>
              )}
            </div>

            <div className="flex justify-center pt-2">
              <button 
                onClick={() => setShowAllPhotos(!showAllPhotos)}
                className="px-5 py-2 border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#334155] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center"
              >
                {showAllPhotos ? (
                  <>Collapse Gallery <ChevronUp className="w-4 h-4 ml-1.5 text-[#64748b]" /></>
                ) : (
                  <>Expand Gallery <ChevronDown className="w-4 h-4 ml-1.5 text-[#64748b]" /></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* COMBINED SECTION: TRACTION, EXPANSION & PROJECTIONS DASHBOARD */}
        {hasTraction && (
          <div id="traction" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 md:p-8 shadow-sm space-y-8 animate-fade-in">
          
          {/* Header & Year Slider */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#f1f5f9] pb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest block">Interactive Platform Dashboard</span>
              <h3 className="text-xl font-black text-[#0f172a] tracking-tight">Traction, Expansion & Projections</h3>
              <p className="text-xs text-[#64748b] font-semibold">Use the timeline slider to simulate the company's growth state from inception to global projections</p>
            </div>
            
            {/* Timeline Slider Input with 5-year projections step labels */}
            <div className="flex flex-col space-y-2 w-full lg:w-96">
              <div className="flex items-center space-x-4 bg-[#f8fafc] px-4 py-3.5 border border-[#e2e8f0] rounded-2xl shadow-sm relative">
                <input 
                  type="range" 
                  min="2023" 
                  max="2031" 
                  step="1"
                  value={mapYear}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setMapYear(val);
                    // Update selected map location automatically
                    const locs = mapLocations[val];
                    if (locs && locs.length > 0) {
                      setActiveLocation(locs[locs.length - 1]);
                    }
                  }}
                  className="w-full h-2 bg-[#cbd5e1] rounded-lg appearance-none cursor-pointer accent-[#6366f1] focus:outline-none"
                />
              </div>
              <div className="flex justify-between px-1.5 text-[8px] md:text-[9px] font-black text-[#64748b] gap-1 flex-wrap">
                {[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031].map((year) => {
                  let label = `${year}`;
                  if (year === 2023) label += " (Founded)";
                  if (year === 2026) label += " (Current)";
                  if (year === 2031) label += " (Proj)";
                  
                  const isCurrent = mapYear === year;
                  return (
                    <span 
                      key={year}
                      className={`${isCurrent ? "text-[#6366f1] scale-105 font-black" : "cursor-pointer hover:text-[#4f46e5]"} transition-all`}
                      onClick={() => {
                        setMapYear(year);
                        const locs = mapLocations[year];
                        if (locs && locs.length > 0) {
                          setActiveLocation(locs[locs.length - 1]);
                        }
                      }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Children Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Child 1: Traction Dashboard (Charts) - Spans 7/12 cols */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-2 mb-2">
                <BarChart3 className="w-5 h-5 text-[#6366f1]" />
                <h4 className="text-xs font-black text-[#0f172a] uppercase tracking-wider">Traction Dashboard ({mapYear})</h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-bold text-[#0f172a] mb-2 uppercase tracking-wider">Monthly SaaS Revenue vs Expenses</p>
                  <div className="h-36 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueDataByYear[mapYear].map(d => ({ ...d, revenue: d.revenue * 80, expenses: d.expenses * 80 }))} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} tickFormatter={(val) => val >= 10000000 ? `₹${(val / 10000000).toFixed(1)} Cr` : val >= 100000 ? `₹${(val / 100000).toFixed(0)} L` : `₹${val / 1000}k` } />
                        <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '10px', fontWeight: 'bold'}} />
                        <Bar dataKey="revenue" name="Revenue" fill="#6366f1" radius={[3, 3, 0, 0]} barSize={12} />
                        <Bar dataKey="expenses" name="Expenses" fill="#cbd5e1" radius={[3, 3, 0, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <p className="text-[10px] font-bold text-[#0f172a] mb-2 uppercase tracking-wider">Monthly Active Transactions</p>
                  <div className="h-36 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userDataByYear[mapYear]} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                        <defs>
                          <linearGradient id={`sessionGrad-${mapYear}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '10px', fontWeight: 'bold'}} />
                        <Area type="monotone" dataKey="sessions" name="Transactions" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill={`url(#sessionGrad-${mapYear})`} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-[#0f172a] mb-2 uppercase tracking-wider">Loyalty Points Claim Rate vs Traditional</p>
                  <div className="h-36 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={recoveryDataByYear[mapYear]} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} tickFormatter={(val) => `${val}%`} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '10px', fontWeight: 'bold'}} />
                        <Line type="monotone" dataKey="paynback" name="Paynback App" stroke="#10b981" strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="traditional" name="Traditional" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="3 3" dot={{ r: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-[#0f172a] mb-2 uppercase tracking-wider">Partner Merchant Segments</p>
                  <div className="h-36 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={customerSegmentDataByYear[mapYear]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={45}
                          innerRadius={25}
                          paddingAngle={3}
                        >
                          {customerSegmentDataByYear[mapYear].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '10px', fontWeight: 'bold'}} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col gap-1 text-[9px] font-bold text-[#475569] mr-2">
                      {customerSegmentDataByYear[mapYear].map((seg, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}></span>
                          <span className="truncate max-w-[80px] text-[8px]">{seg.name} ({seg.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Child 2: Global Expansion Map - Spans 5/12 cols */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-2 mb-2">
                  <Globe className="w-5 h-5 text-[#6366f1]" />
                  <h4 className="text-xs font-black text-[#0f172a] uppercase tracking-wider">Global Expansion Map ({mapYear})</h4>
                </div>

                <div className="h-64 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl relative overflow-hidden flex items-center justify-center shadow-inner">
                  <ComposableMap 
                    projection="geoMercator"
                    projectionConfig={{ 
                      scale: 230, 
                      center: [60, 25] 
                    }} 
                    className="w-full h-full"
                  >
                    <Geographies geography="/world-110m.json">
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#e2e8f0"
                            stroke="#ffffff"
                            strokeWidth={0.5}
                            style={{
                              default: { fill: "#e2e8f0", outline: "none" },
                              hover: { fill: "#cbd5e1", outline: "none" },
                              pressed: { fill: "#94a3b8", outline: "none" },
                            }}
                          />
                        ))
                      }
                    </Geographies>
                    
                    {mapLocations[mapYear] && mapLocations[mapYear].map(loc => (
                      <Marker 
                        key={loc.id} 
                        coordinates={loc.coordinates} 
                        onClick={() => setActiveLocation(loc)}
                      >
                        <g style={{ cursor: "pointer" }}>
                          <circle r={14} fill="none" stroke="#6366f1" strokeWidth={1.5} opacity={0.6}>
                            <animate attributeName="r" values="4;14" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle r={5} fill="#6366f1" stroke="#ffffff" strokeWidth={1.5} />
                        </g>
                      </Marker>
                    ))}
                  </ComposableMap>
                </div>
              </div>

              {/* Selected location description panel */}
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 min-h-[70px] flex items-center justify-between shadow-sm">
                {activeLocation ? (
                  <div>
                    <h5 className="text-xs font-black text-[#0f172a]">{activeLocation.name}</h5>
                    <p className="text-xs text-[#475569] font-semibold mt-1">{activeLocation.desc}</p>
                  </div>
                ) : (
                  <p className="text-xs text-[#64748b] font-semibold italic">Drag the timeline slider above to view expansion points...</p>
                )}
                {activeLocation && (
                  <button onClick={() => setActiveLocation(null)} className="text-[10px] text-[#64748b] hover:text-[#0f172a] font-bold">Clear</button>
                )}
              </div>
            </div>

          </div>

          {/* Child 3: Company Growth Timeline & Future Projections - Spans full width inside combined dashboard */}
          <div className="border-t border-[#f1f5f9] pt-6">
            <div className="flex items-center space-x-2 pb-4">
              <Calendar className="w-5 h-5 text-[#6366f1]" />
              <h4 className="text-xs font-black text-[#0f172a] uppercase tracking-wider">Company Growth Timeline & Future Projections ({mapYear})</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
              {/* Year Badge */}
              <div className="bg-[#f5f3ff] border border-[#e0e7ff] rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-sm">
                <div>
                  <span className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest block mb-2">Active Year</span>
                  <span className="text-5xl font-black text-[#6366f1] tracking-tight">{mapYear}</span>
                </div>
                <span className="inline-block mt-4 bg-white border border-[#e2e8f0] px-3 py-1.5 rounded-full text-[10px] font-bold text-[#475569] shadow-sm">
                  {YEARLY_GROWTH_DATA[mapYear] ? YEARLY_GROWTH_DATA[mapYear].milestone : "Milestone"}
                </span>
              </div>
              
              {/* Key Growth Metrics */}
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-6 grid grid-cols-3 md:grid-cols-1 gap-4 md:col-span-1 justify-center shadow-sm">
                <div>
                  <span className="text-[9px] text-[#64748b] font-black uppercase tracking-wider block">ARR Revenue</span>
                  <span className="text-sm font-black text-[#0f172a]">{YEARLY_GROWTH_DATA[mapYear] ? YEARLY_GROWTH_DATA[mapYear].revenue : "0"}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#64748b] font-black uppercase tracking-wider block">Partner Merchants</span>
                  <span className="text-sm font-black text-[#0f172a]">{YEARLY_GROWTH_DATA[mapYear] ? YEARLY_GROWTH_DATA[mapYear].merchants : "0"}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#64748b] font-black uppercase tracking-wider block">Transactions</span>
                  <span className="text-sm font-black text-[#0f172a]">{YEARLY_GROWTH_DATA[mapYear] ? YEARLY_GROWTH_DATA[mapYear].sessions : "0"}</span>
                </div>
              </div>
              
              {/* Projections & Future Analysis */}
              <div className="md:col-span-2 bg-[#f0fdfa] border border-[#ccfbf1] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[10px] font-black text-[#0d9488] uppercase tracking-widest block mb-2">Growth & Future Analysis</span>
                  <p className="text-xs font-semibold text-[#0f766e] leading-relaxed">
                    {YEARLY_GROWTH_DATA[mapYear] ? YEARLY_GROWTH_DATA[mapYear].analysis : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-[#0f766e] uppercase">
                  <Activity className="w-4 h-4" /> Simulator telemetry updated Q1 2026
                </div>
              </div>
            </div>
          </div>

          {/* Child 4: Detailed Milestones & Metrics Reference Table */}
          <div className="border-t border-[#f1f5f9] pt-6">
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#6366f1]" />
                <h4 className="text-xs font-black text-[#0f172a] uppercase tracking-wider">Milestones & Metrics Ledger</h4>
              </div>
              <span className="text-[10px] bg-[#f1f5f9] text-[#64748b] font-bold px-2 py-1 rounded-md">Historical + Projected</span>
            </div>
            <div className="overflow-x-auto border border-[#e2e8f0] rounded-2xl">
              <table className="w-full text-left text-xs font-semibold">
                <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-3 text-[#0f172a]">Year</th>
                    <th className="p-3 text-[#0f172a]">ARR / Revenue</th>
                    <th className="p-3 text-[#0f172a]">Merchants</th>
                    <th className="p-3 text-[#0f172a]">Transactions</th>
                    <th className="p-3 text-[#0f172a]">Global Presence</th>
                    <th className="p-3 text-[#0f172a]">Key Milestone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] text-[#334155]">
                  {[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031].map((yr) => {
                    const isSelected = mapYear === yr;
                    const rowData = YEARLY_GROWTH_DATA[yr] || {};
                    const activeLocNames = (mapLocations[yr] || []).map(l => l.id ? l.id.toUpperCase() : '').filter(Boolean).join(", ");
                    return (
                      <tr 
                        key={yr} 
                        className={`${isSelected ? 'bg-[#f5f3ff] font-bold' : 'hover:bg-[#f8fafc]'} transition-colors cursor-pointer`} 
                        onClick={() => {
                          setMapYear(yr);
                          const locs = mapLocations[yr];
                          if (locs && locs.length > 0) {
                            setActiveLocation(locs[locs.length - 1]);
                          }
                        }}
                      >
                        <td className="p-3 text-xs font-black text-[#0f172a]">
                          <span className="flex items-center">
                            {yr}
                            {yr === 2026 && <span className="ml-1.5 text-[8px] bg-indigo-100 text-indigo-700 font-extrabold px-1 rounded">CURRENT</span>}
                            {yr > 2026 && <span className="ml-1.5 text-[8px] bg-teal-100 text-teal-700 font-extrabold px-1 rounded">PROJ</span>}
                          </span>
                        </td>
                        <td className="p-3 text-xs text-[#6366f1] font-black">{rowData.revenue}</td>
                        <td className="p-3 text-xs">{rowData.merchants}</td>
                        <td className="p-3 text-xs">{rowData.sessions}</td>
                        <td className="p-3 text-xs text-[#06b6d4] font-bold">{activeLocNames}</td>
                        <td className="p-3 text-xs text-[#475569]">{rowData.milestone}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

        {/* SECTION 5: COMPANY DETAILS & WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* OVERVIEW */}
            {hasOverviewSection && (
              <section className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
                <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
                  <Briefcase className="w-5 h-5 text-[#6366f1]" />
                  <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Company Overview</h4>
                </div>
                <div className="space-y-5">
                  {(isOwner || (MOCK_COMPANY.overview?.story && MOCK_COMPANY.overview.story.trim() !== "")) && (
                    <div>
                      <h5 className="text-xs font-black text-[#64748b] uppercase tracking-wider mb-1">Company Story</h5>
                      <p className="text-xs font-semibold text-[#475569] leading-relaxed">{MOCK_COMPANY.overview.story}</p>
                    </div>
                  )}
                  
                  {(isOwner || (MOCK_COMPANY.overview?.problem && MOCK_COMPANY.overview.problem.trim() !== "") || (MOCK_COMPANY.overview?.solution && MOCK_COMPANY.overview.solution.trim() !== "")) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(isOwner || (MOCK_COMPANY.overview?.problem && MOCK_COMPANY.overview.problem.trim() !== "")) && (
                        <div className="bg-[#fff1f2] border border-[#ffe4e6] p-5 rounded-2xl space-y-2">
                          <div className="flex items-center space-x-2 text-[#b91c1c]">
                            <AlertTriangle className="w-4 h-4" />
                            <h5 className="text-xs font-black uppercase tracking-wider">The Problem</h5>
                          </div>
                          <p className="text-xs font-semibold text-[#9f1239] leading-relaxed">{MOCK_COMPANY.overview.problem}</p>
                        </div>
                      )}
                      
                      {(isOwner || (MOCK_COMPANY.overview?.solution && MOCK_COMPANY.overview.solution.trim() !== "")) && (
                        <div className="bg-[#ecfdf5] border border-[#d1fae5] p-5 rounded-2xl space-y-2">
                          <div className="flex items-center space-x-2 text-[#047857]">
                            <Check className="w-4 h-4" />
                            <h5 className="text-xs font-black uppercase tracking-wider">The Solution</h5>
                          </div>
                          <p className="text-xs font-semibold text-[#065f46] leading-relaxed">{MOCK_COMPANY.overview.solution}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {(isOwner || (MOCK_COMPANY.overview?.advantage && MOCK_COMPANY.overview.advantage.trim() !== "")) && (
                    <div>
                      <h5 className="text-xs font-black text-[#64748b] uppercase tracking-wider mb-1">Competitive Advantage</h5>
                      <p className="text-xs font-semibold text-[#475569] leading-relaxed">{MOCK_COMPANY.overview.advantage}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* PRODUCTS */}
            {hasProducts && (
              <section className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
                <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
                  <Rocket className="w-5 h-5 text-[#06b6d4]" />
                  <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Products & Solutions</h4>
                </div>
                
                {MOCK_COMPANY.products.map((prod, idx) => (
                  <div key={idx} className="border border-[#e2e8f0] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
                    <div className="md:w-1/3 bg-slate-100 relative min-h-[160px]">
                      <img src={prod.image} alt={prod.name} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="p-6 md:w-2/3 space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest">{prod.category}</span>
                          <span className="text-[10px] font-black text-[#475569] bg-[#f1f5f9] px-2 py-0.5 rounded">{prod.metrics.users}</span>
                        </div>
                        <h5 className="text-base font-black text-[#0f172a] mt-1">{prod.name}</h5>
                        <p className="text-xs font-semibold text-[#475569] mt-2 leading-relaxed">{prod.overview}</p>
                      </div>

                      {prod.features && prod.features.length > 0 && (
                        <div className="space-y-1.5">
                          <h6 className="text-[9px] font-black text-[#64748b] uppercase tracking-wider">Key Features</h6>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-semibold text-[#475569]">
                            {prod.features.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-center space-x-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* BUSINESS MODEL */}
            {hasBusinessModel && (
              <section className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
                <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
                  <IndianRupee className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Business Model</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {(isOwner || (MOCK_COMPANY.businessModel?.streams && MOCK_COMPANY.businessModel.streams.length > 0)) && (
                    <div>
                      <h5 className="text-xs font-black text-[#64748b] uppercase tracking-wider mb-3">Revenue Streams</h5>
                      <div className="space-y-2">
                        {MOCK_COMPANY.businessModel.streams.map((stream, sIdx) => (
                          <div key={sIdx} className="flex items-start space-x-2.5 p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
                            <ChevronRight className="w-4 h-4 text-[#6366f1] mt-0.5 flex-shrink-0" />
                            <span className="text-xs font-semibold text-[#334155]">{stream}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {(isOwner || (MOCK_COMPANY.businessModel?.unitEconomics?.cac && MOCK_COMPANY.businessModel.unitEconomics.cac.trim() !== "")) && (
                    <div className="space-y-4">
                      <h5 className="text-xs font-black text-[#64748b] uppercase tracking-wider">Unit Economics</h5>
                      <div className="space-y-3 bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl">
                        <div>
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-wide text-[#475569] mb-1">
                            <span>CAC</span>
                            <span className="text-rose-600">{MOCK_COMPANY.businessModel.unitEconomics.cac}</span>
                          </div>
                          <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden"><div className="h-full bg-rose-500" style={{width: '20%'}}></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-wide text-[#475569] mb-1">
                            <span>LTV</span>
                            <span className="text-emerald-600">{MOCK_COMPANY.businessModel.unitEconomics.ltv}</span>
                          </div>
                          <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden"><div className="h-full bg-[#10b981]" style={{width: '80%'}}></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-wide text-[#475569] mb-1">
                            <span>Gross Margin</span>
                            <span className="text-[#6366f1]">{MOCK_COMPANY.businessModel.unitEconomics.grossMargin}</span>
                          </div>
                          <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden"><div className="h-full bg-[#6366f1]" style={{width: '82%'}}></div></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* COMPETITIVE LANDSCAPE */}
            {hasCompetitors && (
              <section className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
                <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
                  <TrendingUp className="w-5 h-5 text-[#6366f1]" />
                  <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Competitive Landscape</h4>
                </div>
                <div className="overflow-x-auto border border-[#e2e8f0] rounded-2xl">
                  <table className="w-full text-left text-xs font-semibold min-w-[700px]">
                    <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] uppercase tracking-wider font-bold">
                      <tr>
                        <th className="p-3.5 text-[#0f172a] whitespace-nowrap">Company</th>
                        <th className="p-3.5 text-[#0f172a] whitespace-nowrap">Core Tech</th>
                        <th className="p-3.5 text-[#0f172a] whitespace-nowrap">Pricing</th>
                        <th className="p-3.5 text-[#0f172a] whitespace-nowrap">Edge</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e8f0] text-[#334155]">
                      {MOCK_COMPANY.competitors.map((comp, idx) => (
                        <tr key={idx} className={`${idx === 0 ? 'bg-[#f5f3ff]' : 'hover:bg-[#f8fafc]'}`}>
                          <td className="p-3.5 font-black text-[#0f172a]">{comp.name}</td>
                          <td className="p-3.5">{comp.tech}</td>
                          <td className="p-3.5 text-[#6366f1]">{comp.price}</td>
                          <td className="p-3.5 text-[#475569]">{comp.edge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-8">
            
            {/* AI SCORE */}
            {hasAIScore && (
              <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
                <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
                  <BrainCircuit className="w-5 h-5 text-[#6366f1]" />
                  <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">AI Readiness Score</h4>
                </div>
                
                <div className="flex justify-center py-4">
                  <div className="w-32 h-32 rounded-full border-[8px] border-[#f1f5f9] flex items-center justify-center relative shadow-sm">
                    {/* Gauge Ring */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#6366f1" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * MOCK_COMPANY.aiScore.overall) / 100} transform="rotate(-90 50 50)"/>
                    </svg>
                    <div className="text-center">
                      <span className="text-3xl font-black text-[#0f172a]">{MOCK_COMPANY.aiScore.overall}</span>
                      <span className="text-[10px] block text-[#64748b] font-bold uppercase mt-0.5">Score</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {Object.entries(MOCK_COMPANY.aiScore.categories).map(([category, score]) => (
                    <div key={category}>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-[#64748b] mb-1">
                        <span>{category}</span>
                        <span className="text-[#0f172a] font-bold">{score}%</span>
                      </div>
                      <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#6366f1] rounded-full" style={{width: `${score}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 space-y-3 text-xs font-semibold text-[#475569]">
                  <p><span className="text-[#047857] font-black uppercase tracking-wider block mb-1">Strengths</span>{MOCK_COMPANY.aiScore.strengths}</p>
                  <div className="h-px bg-[#e2e8f0]"></div>
                  <p><span className="text-amber-600 font-black uppercase tracking-wider block mb-1">Concerns</span>{MOCK_COMPANY.aiScore.concerns}</p>
                </div>
              </div>
            )}

            {/* DOCUMENT VAULT */}
            <div id="vault" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
                <FileText className="w-5 h-5 text-[#6366f1]" />
                <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Document Vault</h4>
              </div>
              <div className="space-y-2">
                {(MOCK_COMPANY.documents || []).map((docObj, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => docObj.document && window.open(docObj.document, '_blank')}
                    className="p-3 bg-[#f8fafc] hover:bg-[#f5f3ff] border border-[#e2e8f0] rounded-xl flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-[#475569] group-hover:text-[#6366f1] flex items-center">
                      <FileText className="w-4 h-4 mr-2.5 text-[#cbd5e1] group-hover:text-[#6366f1]" />
                      {docObj.title}
                    </span>
                    <Download className={`w-4 h-4 ${docObj.document ? 'text-[#6366f1]' : 'text-[#cbd5e1] opacity-50'}`} />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* SECTION: INVESTMENT ASK (Dedicated full-width section below all company details) */}
        <div id="ask" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
            <IndianRupee className="w-5 h-5 text-[#6366f1]" />
            <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Investment Opportunity & Financial Ask</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <div className="bg-[#f5f3ff] border border-[#e0e7ff] p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <IndianRupee className="w-24 h-24 text-[#4f46e5]" />
              </div>
              <div className="relative z-10">
                <span className="text-xs font-black text-[#4f46e5] uppercase tracking-wider block mb-2">Funding Ask</span>
                <span className="text-4xl font-black text-[#4f46e5]">{MOCK_COMPANY.investment.ask}</span>
              </div>
              <div className="relative z-10 mt-4">
                <p className="text-xs font-semibold text-[#475569] leading-relaxed">
                  Evaluating Seed Round subscriptions to accelerate merchant acquisition flywheel and expansion of the high-yield rewards treasury network.
                </p>
                {MOCK_COMPANY.investment.termSheet && (
                  <a 
                    href={MOCK_COMPANY.investment.termSheet} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center mt-4 text-xs font-black uppercase tracking-wider text-white bg-[#4f46e5] hover:bg-[#4338ca] px-4 py-2 rounded-xl transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Draft Term Sheet
                  </a>
                )}
              </div>
            </div>
            
            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-6 rounded-2xl flex flex-col justify-center space-y-4">
              <div className="divide-y divide-[#e2e8f0] text-xs font-semibold text-[#475569]">
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#64748b]">Equity Offered</span>
                  <span className="font-bold text-[#0f172a]">{MOCK_COMPANY.investment.equity}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#64748b]">Pre-Money Valuation</span>
                  <span className="font-bold text-[#0f172a]">{MOCK_COMPANY.investment.valuationPre}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#64748b]">Security Type</span>
                  <span className="font-bold text-[#0f172a]">{MOCK_COMPANY.investment.security}</span>
                </div>
              </div>
            </div>

            {/* Fund Utilization Plan as a Pie Chart */}
            <div className="bg-white border border-[#e2e8f0] p-6 rounded-2xl flex flex-col items-center justify-between min-h-[220px]">
              <h5 className="text-[10px] font-black text-[#64748b] uppercase tracking-wider mb-2 self-start">Fund Utilization Plan</h5>
              <div className="h-32 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MOCK_COMPANY.investment.utilization}
                      dataKey="percentage"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={45}
                      innerRadius={25}
                      paddingAngle={3}
                    >
                      {MOCK_COMPANY.investment.utilization.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '10px', fontWeight: 'bold'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center text-[9px] font-bold mt-2">
                {MOCK_COMPANY.investment.utilization.map((util, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}></span>
                    <span className="text-[#475569]">{util.category} ({util.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 19: CALL TO ACTION */}
        <div className="bg-white border-2 border-[#e0e7ff] rounded-3xl p-8 md:p-12 text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"></div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f172a] mb-4 tracking-tight">Evaluate {MOCK_COMPANY.name}</h2>
          <p className="text-[#475569] mb-8 max-w-2xl mx-auto font-medium text-sm leading-relaxed">
            Interested in the future of merchant payments and consumer yield? Request access to our full data room containing security audits, or book an introductory call with the founding team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl font-bold transition-all shadow-md shadow-indigo-600/10 text-xs uppercase tracking-wider">
              Request Data Room Access
            </button>
            <button className="px-8 py-3.5 bg-white hover:bg-[#f8fafc] border border-[#cbd5e1] text-[#475569] rounded-xl font-bold transition-all text-xs uppercase tracking-wider shadow-sm">
              Schedule Introduction Call
            </button>
          </div>
        </div>

        {/* Lightbox / Slider Modal */}
        {activePhotoIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col justify-between p-6 select-none animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest block">Company Gallery</span>
                <h4 className="text-sm font-black tracking-tight">{COMPANY_PHOTOS[activePhotoIndex].title}</h4>
              </div>
              <button 
                onClick={() => setActivePhotoIndex(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image Slider */}
            <div className="flex-1 flex items-center justify-between gap-4 py-6">
              <button 
                onClick={() => {
                  setActivePhotoIndex((prev) => (prev === 0 ? COMPANY_PHOTOS.length - 1 : prev - 1));
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors flex-shrink-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="max-w-4xl max-h-[70vh] flex flex-col items-center justify-center relative">
                <img 
                  src={COMPANY_PHOTOS[activePhotoIndex].url} 
                  alt={COMPANY_PHOTOS[activePhotoIndex].title} 
                  className="max-w-full max-h-[60vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                />
                <p className="text-white/80 text-xs font-semibold text-center mt-4 max-w-xl px-4">
                  {COMPANY_PHOTOS[activePhotoIndex].desc}
                </p>
              </div>

              <button 
                onClick={() => {
                  setActivePhotoIndex((prev) => (prev === COMPANY_PHOTOS.length - 1 ? 0 : prev + 1));
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors flex-shrink-0"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Thumbnails / Indicators */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
              {COMPANY_PHOTOS.map((photo, index) => (
                <div 
                  key={index} 
                  className={`w-14 h-10 rounded-lg overflow-hidden cursor-pointer border-2 transition-all flex-shrink-0 ${activePhotoIndex === index ? 'border-[#6366f1] scale-105' : 'border-white/20 opacity-60 hover:opacity-100'}`}
                  onClick={() => setActivePhotoIndex(index)}
                >
                  <img src={photo.url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        </div>

      </div>
      {isEditing && (
        <ProfileEditorModal 
          data={mockState} 
          onSave={async (newData) => {
            try {
              const docRef = doc(db, 'users', 'companies', activeCompanyId, 'all_data');
              await setDoc(docRef, newData);
              setMockState(newData);
              setIsEditing(false);
            } catch (error) {
              console.error("Error saving to Firestore:", error);
              alert("Failed to save changes. Please try again.");
            }
          }} 
          onClose={() => setIsEditing(false)} 
        />
      )}
    </div>
  );
}
