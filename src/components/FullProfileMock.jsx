import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, MapPin, Globe, Users, Target, Rocket, Download, ShieldCheck, 
  TrendingUp, Award, Briefcase, Zap, BarChart3, FileText, 
  BrainCircuit, Mail, ExternalLink, DollarSign, CheckCircle2, ArrowLeft,
  Calendar, Check, ChevronRight, ChevronLeft, X, Activity, AlertTriangle, ChevronDown, ChevronUp
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  ComposableMap, Geographies, Geography, Marker 
} from 'react-simple-maps';

// Oqulix Mock Data (using explicit hex color text classes to bypass reversed theme)
const MOCK_COMPANY = {
  id: "OQX-2026-VR",
  verified: true,
  name: "Oqulix Pvt Ltd",
  logo: "OQ",
  type: "Startup",
  founded: "2023",
  hq: "Ernakulam, Kerala, India",
  industry: "VR / DeepTech",
  stage: "Seed",
  teamSize: "8",
  website: "https://oqulix.com",
  linkedin: "#",
  twitter: "#",
  github: "#",
  vision: "To redefine physical rehabilitation and cognitive therapy through accessible, immersive reality.",
  mission: "Develop clinical-grade VR solutions that gamify therapy, making recovery measurable and engaging.",
  tagline: "Immersion. Innovation. Recovery.",

  raised: "$150,000",
  required: "$500,000",
  revenue: "$8,500 MRR",
  growth: "22% MoM",
  customers: "6 Clinics & Hospitals",
  countries: "2",
  activeProducts: "2",
  aiSummary: "Oqulix provides an immersive VR platform that gamifies physical and cognitive therapy. By integrating standard headsets with proprietary motion-tracking software, they turn tedious rehabilitation into engaging games while delivering precise biomechanical data to clinicians.",

  team: [
    {
      name: "Vishnuprakash P",
      role: "Managing Director & CEO",
      bio: "VR systems expert with deep experience in hardware-software integration.",
      edu: "B.Tech Computer Science",
      exp: "XR Development, Product Strategy"
    },
    {
      name: "Sandeep Nambiar P",
      role: "Co-founder & Director",
      bio: "Lead software engineer specializing in interactive 3D environments and physics.",
      edu: "B.Tech Computer Science",
      exp: "Game Development, Biomechanics Simulation"
    },
    {
      name: "Anjana Remesh",
      role: "Director",
      bio: "Product strategist focused on clinical partnerships and user experience.",
      edu: "MBA Healthcare Management",
      exp: "Clinical Operations, B2B Sales"
    }
  ],

  advisors: [
    { name: "Dr. Rajesh Menon", role: "Chief Clinical Advisor", expertise: "Orthopedic Rehab", org: "Aster Medcity" },
    { name: "Sarah Thomas", role: "Strategic Board Member", expertise: "HealthTech Scaling", org: "Kerala Startup Mission" }
  ],

  overview: {
    story: "Founded after observing high patient dropout rates in traditional physiotherapy due to pain and monotony.",
    problem: "Traditional physical rehabilitation is tedious and relies on subjective observation, leading to poor patient compliance and lack of objective recovery data.",
    challenges: "Clinics lack affordable tools to digitize and track specific joint movements in 3D space over time.",
    marketGap: "Existing clinical motion-tracking systems are prohibitively expensive ($50k+) and require dedicated rooms.",
    solution: "A $2,000 VR package that tracks movement accurately, gamifies the exercises, and generates automatic clinical reports.",
    advantage: "Proprietary software optimized for affordable standalone VR headsets, removing the need for external cameras or expensive PCs."
  },

  products: [
    {
      name: "Oqulix Rehab Pro",
      category: "Clinical Software",
      overview: "Comprehensive suite of 15 gamified therapy modules for upper limb and cognitive recovery.",
      audience: "Physiotherapy clinics, Hospitals.",
      features: ["Real-time joint angle tracking", "Automated progress reports", "Patient-specific difficulty scaling"],
      metrics: { users: "6 Active Clinics", growth: "150% YoY" },
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=60"
    }
  ],

  achievements: [
    "KSUM Idea Grant Winner 2024",
    "Top 5 HealthTech Startups - TieCon 2025",
    "Patent Pending on Biomechanical Motion Tracking"
  ],
  milestones: [
    { year: "2023", event: "Company Incorporated & Initial Prototype Completed" },
    { year: "2024", event: "Clinical Trials at Aster Medcity Launched" },
    { year: "2025", event: "Commercial Launch & First 6 B2B Clinic Subscriptions" },
    { year: "2026", event: "Expansion to UAE Market Initiated" }
  ],

  partners: [
    { name: "Kerala Startup Mission", type: "Incubator", value: "Funding & Workspace" },
    { name: "Meta Quest Dev Program", type: "Technology Partner", value: "Hardware Support" }
  ],

  businessModel: {
    overview: "Hardware Lease + SaaS Subscription.",
    streams: [
      "Hardware setup lease fee ($1,500 one-time setup)",
      "Monthly Software License ($250/device recurring)",
      "Enterprise Multi-site Custom Integration packages"
    ],
    unitEconomics: { cac: "$800", ltv: "$12,000", grossMargin: "78%" }
  },

  market: {
    tam: "$10.5B",
    sam: "$1.2B",
    som: "$45M",
    cagr: "28.5%",
    trends: "Hospitals rapidly adopting remote therapeutic monitoring (RTM) post-pandemic."
  },

  competitors: [
    { name: "Oqulix", tech: "Standalone VR (Camera-less)", deployment: "Clinic/Home", price: "$250/mo", edge: "No PC needed" },
    { name: "MindMaze", tech: "PC-Tethered VR + Sensors", deployment: "Hospital Only", price: "$2,000/mo", edge: "FDA approved" },
    { name: "XRHealth", tech: "Telehealth VR", deployment: "Home", price: "$500/mo", edge: "Large clinic network" }
  ],

  investment: {
    ask: "$500,000",
    equity: "10%",
    valuationPre: "$4,500,000",
    valuationPost: "$5,000,000",
    security: "Equity / SAFE",
    utilization: [
      { category: "Clinical Validation", percentage: 35 },
      { category: "Product Development", percentage: 40 },
      { category: "Sales & Marketing", percentage: 25 }
    ],
    expectedOutcomes: "Achieve FDA Class II clearance and scale to 50 clinics across India and UAE."
  },

  aiScore: {
    overall: 92,
    categories: { team: 90, market: 95, product: 94, financials: 85 },
    strengths: "High clinical need, affordable unit economics, first-mover in regional markets.",
    weaknesses: "Requires hardware logistics; regulatory hurdles for clinical adoption.",
    concerns: "Need to prove long-term patient retention in home-use scenarios."
  }
};

const EXTENSIVE_OVERVIEW = "Oqulix is a clinical-grade Virtual Reality rehabilitation platform designed to gamify physical therapy and cognitive rehabilitation. Founded in 2023, the company addresses the massive problem of patient compliance and lack of objective clinical metrics in physical therapy. By utilizing advanced 3D motion-tracking algorithms on standalone VR headsets (like Meta Quest 3), Oqulix eliminates the need for expensive external cameras or high-end PC rigs. This makes therapeutic immersive tech affordable for local B2B clinics and accessible for remote patient home-care monitoring. Through clinical validations at institutions like Aster Medcity, Oqulix has demonstrated a 40% reduction in rehabilitation duration and over 90% patient retention rate compared to traditional methods. With active expansions spanning South India, the UAE, and future projections into Europe and North America, Oqulix aims to become the definitive operating system for digital physical therapy globally.";

const COMPANY_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80", title: "Oqulix VR Therapy Suite", desc: "Patient undergoing upper limb recovery exercises using standalone VR headset." },
  { url: "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?w=800&auto=format&fit=crop&q=80", title: "Biomechanical Motion Testing", desc: "R&D team calibrating high-frequency joint angle telemetry software." },
  { url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80", title: "Clinical Pilot at Aster Medcity", desc: "Physiotherapists monitoring real-time recovery dashboards during patient sessions." },
  { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80", title: "Core Engineering Team", desc: "Collaborating on the 3D physics engine and VR game modules at Kerala office." },
  { url: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&auto=format&fit=crop&q=80", title: "VR Rehab Game Modules", desc: "Visual preview of gamified challenge levels for cognitive exercises." },
  { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80", title: "Hardware Calibration Lab", desc: "Quality assurance checks on standalone VR headset sensors before clinic dispatch." },
  { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80", title: "Clinician Monitoring Portal", desc: "The web-based clinician portal showing patient compliance and range-of-motion charts." },
  { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80", title: "User Experience Trials", desc: "Iterating headset ergonomics and interactive menus based on feedback from elderly users." }
];

// Year-specific datasets for charts (driven by year slider, starting from founded year 2023 up to 5-year projections 2031)
const revenueDataByYear = {
  2023: [
    { month: 'Jan', revenue: 0, expenses: 500 },
    { month: 'Feb', revenue: 0, expenses: 500 },
    { month: 'Mar', revenue: 0, expenses: 800 },
    { month: 'Apr', revenue: 0, expenses: 1000 },
    { month: 'May', revenue: 0, expenses: 1200 },
    { month: 'Jun', revenue: 0, expenses: 1500 },
  ],
  2024: [
    { month: 'Jan', revenue: 0, expenses: 2000 },
    { month: 'Feb', revenue: 0, expenses: 2200 },
    { month: 'Mar', revenue: 0, expenses: 2500 },
    { month: 'Apr', revenue: 0, expenses: 2800 },
    { month: 'May', revenue: 1000, expenses: 3000 },
    { month: 'Jun', revenue: 1500, expenses: 3200 },
  ],
  2025: [
    { month: 'Jan', revenue: 2500, expenses: 3500 },
    { month: 'Feb', revenue: 3200, expenses: 3800 },
    { month: 'Mar', revenue: 4500, expenses: 4000 },
    { month: 'Apr', revenue: 5800, expenses: 4200 },
    { month: 'May', revenue: 7500, expenses: 4500 },
    { month: 'Jun', revenue: 8500, expenses: 4800 },
  ],
  2026: [
    { month: 'Jan', revenue: 12000, expenses: 8000 },
    { month: 'Feb', revenue: 16000, expenses: 9500 },
    { month: 'Mar', revenue: 21000, expenses: 11000 },
    { month: 'Apr', revenue: 25000, expenses: 12000 },
    { month: 'May', revenue: 28000, expenses: 14000 },
    { month: 'Jun', revenue: 32000, expenses: 15000 },
  ],
  2027: [
    { month: 'Jan', revenue: 35000, expenses: 17000 },
    { month: 'Feb', revenue: 38000, expenses: 18500 },
    { month: 'Mar', revenue: 42000, expenses: 20000 },
    { month: 'Apr', revenue: 46000, expenses: 21000 },
    { month: 'May', revenue: 50000, expenses: 22000 },
    { month: 'Jun', revenue: 55000, expenses: 23500 },
  ],
  2028: [
    { month: 'Jan', revenue: 60000, expenses: 28000 },
    { month: 'Feb', revenue: 65000, expenses: 29500 },
    { month: 'Mar', revenue: 72000, expenses: 32000 },
    { month: 'Apr', revenue: 78000, expenses: 34000 },
    { month: 'May', revenue: 84000, expenses: 36000 },
    { month: 'Jun', revenue: 92000, expenses: 38000 },
  ],
  2029: [
    { month: 'Jan', revenue: 100000, expenses: 45000 },
    { month: 'Feb', revenue: 110000, expenses: 47000 },
    { month: 'Mar', revenue: 122000, expenses: 50000 },
    { month: 'Apr', revenue: 132000, expenses: 52000 },
    { month: 'May', revenue: 144000, expenses: 54000 },
    { month: 'Jun', revenue: 158000, expenses: 57500 },
  ],
  2030: [
    { month: 'Jan', revenue: 175000, expenses: 62000 },
    { month: 'Feb', revenue: 190000, expenses: 65000 },
    { month: 'Mar', revenue: 205000, expenses: 68000 },
    { month: 'Apr', revenue: 220000, expenses: 70000 },
    { month: 'May', revenue: 235000, expenses: 73000 },
    { month: 'Jun', revenue: 250000, expenses: 76000 },
  ],
  2031: [
    { month: 'Jan', revenue: 280000, expenses: 80000 },
    { month: 'Feb', revenue: 305000, expenses: 84000 },
    { month: 'Mar', revenue: 330000, expenses: 88000 },
    { month: 'Apr', revenue: 360000, expenses: 92000 },
    { month: 'May', revenue: 390000, expenses: 96000 },
    { month: 'Jun', revenue: 420000, expenses: 100000 },
  ]
};

const patientDataByYear = {
  2023: [
    { month: 'Jan', sessions: 0 },
    { month: 'Feb', sessions: 0 },
    { month: 'Mar', sessions: 0 },
    { month: 'Apr', sessions: 0 },
    { month: 'May', sessions: 0 },
    { month: 'Jun', sessions: 0 },
  ],
  2024: [
    { month: 'Jan', sessions: 10 },
    { month: 'Feb', sessions: 25 },
    { month: 'Mar', sessions: 45 },
    { month: 'Apr', sessions: 80 },
    { month: 'May', sessions: 110 },
    { month: 'Jun', sessions: 150 },
  ],
  2025: [
    { month: 'Jan', sessions: 200 },
    { month: 'Feb', sessions: 350 },
    { month: 'Mar', sessions: 520 },
    { month: 'Apr', sessions: 700 },
    { month: 'May', sessions: 950 },
    { month: 'Jun', sessions: 1200 },
  ],
  2026: [
    { month: 'Jan', sessions: 1800 },
    { month: 'Feb', sessions: 2500 },
    { month: 'Mar', sessions: 3800 },
    { month: 'Apr', sessions: 5200 },
    { month: 'May', sessions: 6800 },
    { month: 'Jun', sessions: 8500 },
  ],
  2027: [
    { month: 'Jan', sessions: 9500 },
    { month: 'Feb', sessions: 11000 },
    { month: 'Mar', sessions: 13000 },
    { month: 'Apr', sessions: 15500 },
    { month: 'May', sessions: 18000 },
    { month: 'Jun', sessions: 21000 },
  ],
  2028: [
    { month: 'Jan', sessions: 24000 },
    { month: 'Feb', sessions: 27500 },
    { month: 'Mar', sessions: 31000 },
    { month: 'Apr', sessions: 35000 },
    { month: 'May', sessions: 40000 },
    { month: 'Jun', sessions: 45000 },
  ],
  2029: [
    { month: 'Jan', sessions: 50000 },
    { month: 'Feb', sessions: 56000 },
    { month: 'Mar', sessions: 62000 },
    { month: 'Apr', sessions: 70000 },
    { month: 'May', sessions: 78000 },
    { month: 'Jun', sessions: 88000 },
  ],
  2030: [
    { month: 'Jan', sessions: 98000 },
    { month: 'Feb', sessions: 110000 },
    { month: 'Mar', sessions: 122000 },
    { month: 'Apr', sessions: 135000 },
    { month: 'May', sessions: 150000 },
    { month: 'Jun', sessions: 165000 },
  ],
  2031: [
    { month: 'Jan', sessions: 180000 },
    { month: 'Feb', sessions: 200000 },
    { month: 'Mar', sessions: 220000 },
    { month: 'Apr', sessions: 245000 },
    { month: 'May', sessions: 270000 },
    { month: 'Jun', sessions: 300000 },
  ]
};

const recoveryDataByYear = {
  2023: [
    { week: 'Wk 1', traditional: 100, oqulix: 100 },
    { week: 'Wk 3', traditional: 90, oqulix: 90 },
    { week: 'Wk 6', traditional: 70, oqulix: 70 },
    { week: 'Wk 9', traditional: 50, oqulix: 50 },
    { week: 'Wk 12', traditional: 30, oqulix: 30 },
  ],
  2024: [
    { week: 'Wk 1', traditional: 100, oqulix: 100 },
    { week: 'Wk 3', traditional: 85, oqulix: 80 },
    { week: 'Wk 6', traditional: 65, oqulix: 60 },
    { week: 'Wk 9', traditional: 45, oqulix: 40 },
    { week: 'Wk 12', traditional: 25, oqulix: 15 },
  ],
  2025: [
    { week: 'Wk 1', traditional: 100, oqulix: 100 },
    { week: 'Wk 3', traditional: 85, oqulix: 72 },
    { week: 'Wk 6', traditional: 65, oqulix: 48 },
    { week: 'Wk 9', traditional: 45, oqulix: 20 },
    { week: 'Wk 12', traditional: 25, oqulix: 2 },
  ],
  2026: [
    { week: 'Wk 1', traditional: 100, oqulix: 100 },
    { week: 'Wk 3', traditional: 85, oqulix: 65 },
    { week: 'Wk 6', traditional: 65, oqulix: 35 },
    { week: 'Wk 9', traditional: 45, oqulix: 10 },
    { week: 'Wk 12', traditional: 25, oqulix: 0 },
  ],
  2027: [
    { week: 'Wk 1', traditional: 100, oqulix: 100 },
    { week: 'Wk 3', traditional: 85, oqulix: 60 },
    { week: 'Wk 6', traditional: 65, oqulix: 30 },
    { week: 'Wk 9', traditional: 45, oqulix: 5 },
    { week: 'Wk 12', traditional: 25, oqulix: 0 },
  ],
  2028: [
    { week: 'Wk 1', traditional: 100, oqulix: 100 },
    { week: 'Wk 3', traditional: 85, oqulix: 58 },
    { week: 'Wk 6', traditional: 65, oqulix: 28 },
    { week: 'Wk 9', traditional: 45, oqulix: 2 },
    { week: 'Wk 12', traditional: 25, oqulix: 0 },
  ],
  2029: [
    { week: 'Wk 1', traditional: 100, oqulix: 100 },
    { week: 'Wk 3', traditional: 85, oqulix: 55 },
    { week: 'Wk 6', traditional: 65, oqulix: 25 },
    { week: 'Wk 9', traditional: 45, oqulix: 0 },
    { week: 'Wk 12', traditional: 25, oqulix: 0 },
  ],
  2030: [
    { week: 'Wk 1', traditional: 100, oqulix: 100 },
    { week: 'Wk 3', traditional: 85, oqulix: 55 },
    { week: 'Wk 6', traditional: 65, oqulix: 22 },
    { week: 'Wk 9', traditional: 45, oqulix: 0 },
    { week: 'Wk 12', traditional: 25, oqulix: 0 },
  ],
  2031: [
    { week: 'Wk 1', traditional: 100, oqulix: 100 },
    { week: 'Wk 3', traditional: 85, oqulix: 55 },
    { week: 'Wk 6', traditional: 65, oqulix: 20 },
    { week: 'Wk 9', traditional: 45, oqulix: 0 },
    { week: 'Wk 12', traditional: 25, oqulix: 0 },
  ]
};

const customerSegmentDataByYear = {
  2023: [
    { name: 'Private Clinics', value: 0 },
    { name: 'Hospitals', value: 0 },
    { name: 'Rehab Centers', value: 0 },
  ],
  2024: [
    { name: 'Private Clinics', value: 100 },
    { name: 'Hospitals', value: 0 },
    { name: 'Rehab Centers', value: 0 },
  ],
  2025: [
    { name: 'Private Clinics', value: 67 },
    { name: 'Hospitals', value: 17 },
    { name: 'Rehab Centers', value: 17 },
  ],
  2026: [
    { name: 'Private Clinics', value: 52 },
    { name: 'Hospitals', value: 28 },
    { name: 'Rehab Centers', value: 20 },
  ],
  2027: [
    { name: 'Private Clinics', value: 45 },
    { name: 'Hospitals', value: 35 },
    { name: 'Rehab Centers', value: 20 },
  ],
  2028: [
    { name: 'Private Clinics', value: 40 },
    { name: 'Hospitals', value: 40 },
    { name: 'Rehab Centers', value: 20 },
  ],
  2029: [
    { name: 'Private Clinics', value: 35 },
    { name: 'Hospitals', value: 45 },
    { name: 'Rehab Centers', value: 20 },
  ],
  2030: [
    { name: 'Private Clinics', value: 30 },
    { name: 'Hospitals', value: 50 },
    { name: 'Rehab Centers', value: 20 },
  ],
  2031: [
    { name: 'Private Clinics', value: 25 },
    { name: 'Hospitals', value: 55 },
    { name: 'Rehab Centers', value: 20 },
  ]
};

// Slider projections & future analysis data starting from founded year 2023 to 2031
const YEARLY_GROWTH_DATA = {
  2023: {
    year: "2023",
    revenue: "$0 ARR",
    clinics: "0",
    sessions: "0",
    analysis: "Company incorporated. Focus on developing hardware prototype v0.1 and standalone VR environment design. No external revenue generated.",
    milestone: "Company Incorporated & Initial Prototype"
  },
  2024: {
    year: "2024",
    revenue: "$15,000 ARR",
    clinics: "2",
    sessions: "150+",
    analysis: "Focus on local clinical validation and KSUM grant deployment. Launched initial testing at Aster Medcity with 15 patients. Hardware v1.0 finalized.",
    milestone: "Clinical Validation & KSUM Grant Winner"
  },
  2025: {
    year: "2025",
    revenue: "$102,000 ARR",
    clinics: "6",
    sessions: "1,200+",
    analysis: "Commercial launch of Oqulix Rehab Pro SaaS. Secured first 6 B2B clinic subscriptions. Expanding sales team in South India and preparing UAE pilot setup.",
    milestone: "Commercial SaaS Launch & First B2B Subscriptions"
  },
  2026: {
    year: "2026",
    revenue: "$380,000 ARR",
    clinics: "25+",
    sessions: "8,500+",
    analysis: "Aggressive entry into Middle East (Dubai HQ) and Southeast Asia distribution hub. Target 25+ clinics. FDA Class II clearance filing initiated.",
    milestone: "International Expansion (UAE & Singapore) & FDA Filing"
  },
  2027: {
    year: "2027",
    revenue: "$660,000 ARR (Proj)",
    clinics: "45+",
    sessions: "21,000+",
    analysis: "Deploying Series A ask funds to expand European sales and kick off NHS clinical pilots in the UK. Launching v2.0 AI-powered biomechanical telemetry platform.",
    milestone: "UK Market Pilot & Series A Deployment"
  },
  2028: {
    year: "2028",
    revenue: "$1,104,000 ARR (Proj)",
    clinics: "80+",
    sessions: "45,000+",
    analysis: "Entering Japan via local distributor partnerships. Scaling production capacities. Establishing high-margin hardware lease partnerships.",
    milestone: "Japan Joint Venture & Product Scaling"
  },
  2029: {
    year: "2029",
    revenue: "$1,896,000 ARR (Proj)",
    clinics: "150+",
    sessions: "88,000+",
    analysis: "Secured EU CE Mark clearance. Commencing direct sales operations in Germany and France. 78% gross margins validated on SaaS subscription tier.",
    milestone: "CE Mark Clearance & Western Europe Launch"
  },
  2030: {
    year: "2030",
    revenue: "$3,000,000 ARR (Proj)",
    clinics: "280+",
    sessions: "165,000+",
    analysis: "FDA Class II clearance approved. Major US commercial launch via partner networks in NY and California. Remote therapeutic monitoring integrations active.",
    milestone: "FDA Approval & USA Commercial Launch"
  },
  2031: {
    year: "2031",
    revenue: "$5,040,000 ARR (Proj)",
    clinics: "500+",
    sessions: "300,000+",
    analysis: "Attaining TGA approvals for Australia/Oceania market. Setting up global telehealth rehab system. Preparing for Series B institutional funding.",
    milestone: "Australia Entry & Prep for Series B IPO/Exit"
  }
};

// Map nodes representing presence at each milestone year (using absolute longitude and latitude)
const mapLocations = {
  2023: [
    { id: 'india', name: "India HQ (Ernakulam)", coordinates: [76.27, 9.98], desc: "R&D Centre, Initial Setup" }
  ],
  2024: [
    { id: 'india', name: "India HQ (Ernakulam)", coordinates: [76.27, 9.98], desc: "R&D Centre, 6 active clinic integrations" }
  ],
  2025: [
    { id: 'india', name: "India HQ (Ernakulam)", coordinates: [76.27, 9.98], desc: "R&D Centre, 6 active clinic integrations" },
    { id: 'uae', name: "UAE Regional Office (Dubai)", coordinates: [55.27, 25.20], desc: "B2B Hospital Pilot launched" }
  ],
  2026: [
    { id: 'india', name: "India HQ (Ernakulam)", coordinates: [76.27, 9.98], desc: "R&D Centre, 6 active clinic integrations" },
    { id: 'uae', name: "UAE Regional Office (Dubai)", coordinates: [55.27, 25.20], desc: "B2B Hospital Pilot launched" },
    { id: 'singapore', name: "Singapore Office (Future)", coordinates: [103.81, 1.35], desc: "Planned Southeast Asian distribution hub" }
  ],
  2027: [
    { id: 'india', name: "India HQ (Ernakulam)", coordinates: [76.27, 9.98], desc: "R&D Centre, 6 active clinic integrations" },
    { id: 'uae', name: "UAE Regional Office (Dubai)", coordinates: [55.27, 25.20], desc: "B2B Hospital Pilot launched" },
    { id: 'singapore', name: "Singapore Office", coordinates: [103.81, 1.35], desc: "Active hub with 12 B2B hospital accounts" },
    { id: 'uk', name: "UK Regional Hub (London)", coordinates: [-0.12, 51.50], desc: "NHS pilot trials initiated" }
  ],
  2028: [
    { id: 'india', name: "India HQ (Ernakulam)", coordinates: [76.27, 9.98], desc: "R&D Centre, 6 active clinic integrations" },
    { id: 'uae', name: "UAE Regional Office (Dubai)", coordinates: [55.27, 25.20], desc: "B2B Hospital Pilot launched" },
    { id: 'singapore', name: "Singapore Office", coordinates: [103.81, 1.35], desc: "Active hub with 12 B2B hospital accounts" },
    { id: 'uk', name: "UK Regional Hub (London)", coordinates: [-0.12, 51.50], desc: "NHS pilot trials initiated" },
    { id: 'japan', name: "Japan Distributor (Tokyo)", coordinates: [139.69, 35.67], desc: "Partnered with local rehab machinery giant" }
  ],
  2029: [
    { id: 'india', name: "India HQ (Ernakulam)", coordinates: [76.27, 9.98], desc: "R&D Centre, 6 active clinic integrations" },
    { id: 'uae', name: "UAE Regional Office (Dubai)", coordinates: [55.27, 25.20], desc: "B2B Hospital Pilot launched" },
    { id: 'singapore', name: "Singapore Office", coordinates: [103.81, 1.35], desc: "Active hub with 12 B2B hospital accounts" },
    { id: 'uk', name: "UK Regional Hub (London)", coordinates: [-0.12, 51.50], desc: "NHS pilot trials initiated" },
    { id: 'japan', name: "Japan Distributor (Tokyo)", coordinates: [139.69, 35.67], desc: "Partnered with local rehab machinery giant" },
    { id: 'germany', name: "Germany Hub (Berlin)", coordinates: [13.40, 52.52], desc: "CE Mark clearance obtained; EU sales kickoff" }
  ],
  2030: [
    { id: 'india', name: "India HQ (Ernakulam)", coordinates: [76.27, 9.98], desc: "R&D Centre, 6 active clinic integrations" },
    { id: 'uae', name: "UAE Regional Office (Dubai)", coordinates: [55.27, 25.20], desc: "B2B Hospital Pilot launched" },
    { id: 'singapore', name: "Singapore Office", coordinates: [103.81, 1.35], desc: "Active hub with 12 B2B hospital accounts" },
    { id: 'uk', name: "UK Regional Hub (London)", coordinates: [-0.12, 51.50], desc: "NHS pilot trials initiated" },
    { id: 'japan', name: "Japan Distributor (Tokyo)", coordinates: [139.69, 35.67], desc: "Partnered with local rehab machinery giant" },
    { id: 'germany', name: "Germany Hub (Berlin)", coordinates: [13.40, 52.52], desc: "CE Mark clearance obtained; EU sales kickoff" },
    { id: 'us', name: "US HQ (New York)", coordinates: [-74.00, 40.71], desc: "FDA Class II clearance approved; US sales partner networks active" }
  ],
  2031: [
    { id: 'india', name: "India HQ (Ernakulam)", coordinates: [76.27, 9.98], desc: "R&D Centre, 6 active clinic integrations" },
    { id: 'uae', name: "UAE Regional Office (Dubai)", coordinates: [55.27, 25.20], desc: "B2B Hospital Pilot launched" },
    { id: 'singapore', name: "Singapore Office", coordinates: [103.81, 1.35], desc: "Active hub with 12 B2B hospital accounts" },
    { id: 'uk', name: "UK Regional Hub (London)", coordinates: [-0.12, 51.50], desc: "NHS pilot trials initiated" },
    { id: 'japan', name: "Japan Distributor (Tokyo)", coordinates: [139.69, 35.67], desc: "Partnered with local rehab machinery giant" },
    { id: 'germany', name: "Germany Hub (Berlin)", coordinates: [13.40, 52.52], desc: "CE Mark clearance obtained; EU sales kickoff" },
    { id: 'us', name: "US HQ (New York)", coordinates: [-74.00, 40.71], desc: "FDA Class II clearance approved; US sales partner networks active" },
    { id: 'australia', name: "Australia Hub (Sydney)", coordinates: [151.20, -33.86], desc: "TGA approval; expansion to Oceania clinics" }
  ]
};

const CHART_COLORS = ['#6366f1', '#06b6d4', '#10b981'];

export default function FullProfileMock() {
  const navigate = useNavigate();
  const [mapYear, setMapYear] = useState(2026); // Set default state to current year (2026)
  const [activeLocation, setActiveLocation] = useState({
    id: 'singapore', 
    name: "Singapore Office (Future)", 
    coordinates: [103.81, 1.35], 
    desc: "Planned Southeast Asian distribution hub"
  });
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
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

  return (
    <div className="fixed inset-0 bg-[#f8fafc] text-[#334155] z-50 overflow-y-auto font-sans">
      
      {/* Top Floating Navigation Bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 hover:bg-[#f1f5f9] rounded-xl transition-colors text-[#475569]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest block">BlackWhale Mock Showcase</span>
            <h2 className="text-base font-black text-[#0f172a] leading-tight">Oqulix Profile Output</h2>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-600/10"
        >
          Exit Mock View
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Left Column: TOC Sidebar */}
        <div className="hidden lg:block w-60 flex-shrink-0">
          <div className="sticky top-28 bg-white border border-[#e2e8f0] p-4 rounded-3xl shadow-sm space-y-1">
            <p className="text-[10px] text-[#64748b] font-black uppercase tracking-widest mb-2 border-b border-[#f1f5f9] pb-1.5">Navigate Profile</p>
            {[
              { id: 'overview', label: 'Company Overview', icon: Building2 },
              { id: 'capital', label: 'Capital Strategy', icon: TrendingUp },
              { id: 'snapshot', label: 'Investor Snapshot', icon: Zap },
              { id: 'team', label: 'Founding Team', icon: Users },
              { id: 'gallery', label: 'Company Gallery', icon: Globe },
              { id: 'traction', label: 'Traction & Map', icon: Activity },
              { id: 'vault', label: 'Document Vault', icon: FileText },
              { id: 'ask', label: 'Investment Ask', icon: Rocket }
            ].map((item) => {
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
            <img src="/LINKEDIN.jpg" alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0f172a]/10"></div>
          </div>
          
          <div className="px-6 md:px-8 pb-8 relative">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-end justify-between pt-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                <div className="w-28 h-28 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img src="/logo.png" alt="Oqulix Logo" className="w-full h-full object-contain p-2" />
                </div>
                <div className="space-y-2 pb-1">
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

                {/* Aspect & Segment Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    { label: "Clinical VR", color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
                    { label: "B2B SaaS Model", color: "bg-teal-50 text-teal-700 border-teal-100" },
                    { label: "KSUM Incubated", color: "bg-sky-50 text-sky-700 border-sky-100" },
                    { label: "Patent Pending Tech", color: "bg-amber-50 text-amber-700 border-amber-100" },
                    { label: "Aster Medcity Partner", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                    { label: "FDA Class II Filing", color: "bg-rose-50 text-rose-700 border-rose-100" }
                  ].map((tag, idx) => (
                    <span key={idx} className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md border ${tag.color}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

              <div className="flex gap-2.5 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#334155] rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center shadow-sm">
                  <Download className="w-4 h-4 mr-2 text-[#475569]" /> Pitch Deck
                </button>
                <button className="flex-1 sm:flex-none px-6 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center shadow-md shadow-indigo-600/10">
                  <Mail className="w-4 h-4 mr-2" /> Connect
                </button>
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

            {/* Vision Block */}
            <div className="bg-[#f5f3ff] border border-[#ddd6fe] rounded-2xl p-6 grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-[10px] text-[#6366f1] font-black uppercase tracking-wider mb-1">VISION</p>
                <p className="text-xs font-semibold text-[#475569] leading-relaxed">"{MOCK_COMPANY.vision}"</p>
              </div>
              <div>
                <p className="text-[10px] text-[#6366f1] font-black uppercase tracking-wider mb-1">MISSION</p>
                <p className="text-xs font-semibold text-[#475569] leading-relaxed">"{MOCK_COMPANY.mission}"</p>
              </div>
              <div>
                <p className="text-[10px] text-[#06b6d4] font-black uppercase tracking-wider mb-1">TAGLINE</p>
                <p className="text-sm font-black text-[#0f172a]">"{MOCK_COMPANY.tagline}"</p>
              </div>
            </div>

          </div>
      </div>

      {/* SECTION: CAPITAL DEPLOYMENT & METRICS */}
      <div id="capital" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
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
            <h4 className="text-xs font-black text-[#64748b] uppercase tracking-wider">Seed Capital Deployment ($150,000 Raised)</h4>
            <div className="space-y-3">
              {[
                { label: "Product & VR Telemetry R&D", val: "$60,000", pct: "40%", desc: "Developed motion accuracy calibration algorithm." },
                { label: "Clinical Validation trials", val: "$52,500", pct: "35%", desc: "Funding Aster Medcity trials & ethical audits." },
                { label: "Operations & Market Launch", val: "$37,500", pct: "25%", desc: "B2B client acquisitions, KSUM workspace lease." }
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
                { label: "MONTHLY BURN RATE", value: "$4,500", sub: "Operational Expenses" },
                { label: "CURRENT CASH BALANCE", value: "$65,000", sub: "Remaining Seed Reserves" },
                { label: "PROJECTED RUNWAY", value: "14.4 Months", sub: "Until Next Round" },
                { label: "LTV / CAC RATIO", value: "15.0x", sub: "LTV: $12k / CAC: $800" }
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
                  <span>Developed VR motion-tracking engine with latency below 12ms.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Completed Aster Medcity pilot validation with 45 clinical subjects.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Successfully converted 6 physical therapy clinics to paying SaaS clients.</span>
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

        {/* SECTION 2: INVESTOR SNAPSHOT */}
        <div id="snapshot" className="scroll-mt-24 space-y-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-[#6366f1]" />
            <h3 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Investor Snapshot</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "CAPITAL RAISED", value: MOCK_COMPANY.raised, desc: "Seed Round" },
              { label: "FUNDING REQUIRED", value: MOCK_COMPANY.required, color: "text-[#6366f1]", desc: "For scaling & trials" },
              { label: "CURRENT REVENUE", value: MOCK_COMPANY.revenue, desc: "MRR SaaS" },
              { label: "GROWTH RATE", value: MOCK_COMPANY.growth, color: "text-[#10b981]", desc: "Month-over-Month" },
              { label: "ACTIVE CLINICS", value: MOCK_COMPANY.customers, desc: "Pilots & Customers" },
              { label: "COUNTRIES", value: MOCK_COMPANY.countries, desc: "India & UAE" },
              { label: "ACTIVE PRODUCTS", value: MOCK_COMPANY.activeProducts, desc: "Clinical suites" },
              { label: "BENCHMARK STAGE", value: MOCK_COMPANY.stage, desc: "Ready for Seed VCs" }
            ].map((kpi, i) => (
              <div key={i} className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] text-[#64748b] font-black uppercase tracking-wider mb-1">{kpi.label}</p>
                <p className={`text-xl font-black ${kpi.color || 'text-[#0f172a]'}`}>{kpi.value}</p>
                <p className="text-[10px] text-[#475569] font-semibold mt-1">{kpi.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#f5f3ff] border-l-4 border-l-[#6366f1] p-5 rounded-r-2xl border border-[#e0e7ff]">
            <p className="text-xs font-semibold text-[#475569] leading-relaxed">
              <span className="font-black text-[#4f46e5] mr-1.5 uppercase tracking-wide">AI Summary:</span>
              {MOCK_COMPANY.aiSummary}
            </p>
          </div>
        </div>

        {/* SECTION: FOUNDING TEAM */}
        <div id="team" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
            <Users className="w-5 h-5 text-[#6366f1]" />
            <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Founding Team</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_COMPANY.team.map((member, tIdx) => (
              <div key={tIdx} className="space-y-3 p-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#f5f3ff] border border-[#e0e7ff] flex items-center justify-center font-black text-[#6366f1] shadow-sm text-xs">
                      {member.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-[#0f172a]">{member.name}</h5>
                      <p className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-[#475569] leading-relaxed mb-4">{member.bio}</p>
                </div>
                
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 text-[10px] font-semibold text-[#475569] space-y-1">
                  <p><span className="text-[#0f172a] font-bold uppercase tracking-wider mr-1">Edu:</span>{member.edu}</p>
                  <p><span className="text-[#0f172a] font-bold uppercase tracking-wider mr-1">Exp:</span>{member.exp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: COMPANY GALLERY */}
        <div id="gallery" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6">
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

        {/* COMBINED SECTION: TRACTION, EXPANSION & PROJECTIONS DASHBOARD */}
        <div id="traction" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
          
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
                      <BarChart data={revenueDataByYear[mapYear]} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} tickFormatter={(val) => `$${val}`} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '10px', fontWeight: 'bold'}} />
                        <Bar dataKey="revenue" name="Revenue" fill="#6366f1" radius={[3, 3, 0, 0]} barSize={12} />
                        <Bar dataKey="expenses" name="Expenses" fill="#cbd5e1" radius={[3, 3, 0, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <p className="text-[10px] font-bold text-[#0f172a] mb-2 uppercase tracking-wider">Patient Therapy Sessions</p>
                  <div className="h-36 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={patientDataByYear[mapYear]} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
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
                        <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill={`url(#sessionGrad-${mapYear})`} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-[#0f172a] mb-2 uppercase tracking-wider">Recovery Rate vs Traditional (Joint Flex %)</p>
                  <div className="h-36 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={recoveryDataByYear[mapYear]} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} tickFormatter={(val) => `${val}%`} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '10px', fontWeight: 'bold'}} />
                        <Line type="monotone" dataKey="oqulix" name="Oqulix VR" stroke="#10b981" strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="traditional" name="Traditional" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="3 3" dot={{ r: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-[#0f172a] mb-2 uppercase tracking-wider">B2B Clinic Segment Split</p>
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
                  <span className="text-[9px] text-[#64748b] font-black uppercase tracking-wider block">Active Clinics</span>
                  <span className="text-sm font-black text-[#0f172a]">{YEARLY_GROWTH_DATA[mapYear] ? YEARLY_GROWTH_DATA[mapYear].clinics : "0"}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#64748b] font-black uppercase tracking-wider block">Therapy Sessions</span>
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
                    <th className="p-3 text-[#0f172a]">Clinics</th>
                    <th className="p-3 text-[#0f172a]">Sessions</th>
                    <th className="p-3 text-[#0f172a]">Global Presence</th>
                    <th className="p-3 text-[#0f172a]">Key Milestone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] text-[#334155]">
                  {[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031].map((yr) => {
                    const isSelected = mapYear === yr;
                    const rowData = YEARLY_GROWTH_DATA[yr];
                    const activeLocNames = mapLocations[yr].map(l => l.id.toUpperCase()).join(", ");
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
                        <td className="p-3 text-xs">{rowData.clinics}</td>
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

        {/* SECTION 5: COMPANY DETAILS & WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* OVERVIEW */}
            <section className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
                <Briefcase className="w-5 h-5 text-[#6366f1]" />
                <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Company Overview</h4>
              </div>
              <div className="space-y-5">
                <div>
                  <h5 className="text-xs font-black text-[#64748b] uppercase tracking-wider mb-1">Company Story</h5>
                  <p className="text-xs font-semibold text-[#475569] leading-relaxed">{MOCK_COMPANY.overview.story}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#fff1f2] border border-[#ffe4e6] p-5 rounded-2xl space-y-2">
                    <div className="flex items-center space-x-2 text-[#b91c1c]">
                      <AlertTriangle className="w-4 h-4" />
                      <h5 className="text-xs font-black uppercase tracking-wider">The Problem</h5>
                    </div>
                    <p className="text-xs font-semibold text-[#9f1239] leading-relaxed">{MOCK_COMPANY.overview.problem}</p>
                  </div>
                  
                  <div className="bg-[#ecfdf5] border border-[#d1fae5] p-5 rounded-2xl space-y-2">
                    <div className="flex items-center space-x-2 text-[#047857]">
                      <Check className="w-4 h-4" />
                      <h5 className="text-xs font-black uppercase tracking-wider">The Solution</h5>
                    </div>
                    <p className="text-xs font-semibold text-[#065f46] leading-relaxed">{MOCK_COMPANY.overview.solution}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-black text-[#64748b] uppercase tracking-wider mb-1">Competitive Advantage</h5>
                  <p className="text-xs font-semibold text-[#475569] leading-relaxed">{MOCK_COMPANY.overview.advantage}</p>
                </div>
              </div>
            </section>

            {/* PRODUCTS */}
            <section className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6">
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
                  </div>
                </div>
              ))}
            </section>

            {/* BUSINESS MODEL */}
            <section className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Business Model</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
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
                      <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden"><div className="h-full bg-[#6366f1]" style={{width: '78%'}}></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* COMPETITIVE LANDSCAPE */}
            <section className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
                <TrendingUp className="w-5 h-5 text-[#6366f1]" />
                <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Competitive Landscape</h4>
              </div>
              <div className="overflow-x-auto border border-[#e2e8f0] rounded-2xl">
                <table className="w-full text-left text-xs font-semibold">
                  <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-3.5 text-[#0f172a]">Company</th>
                      <th className="p-3.5 text-[#0f172a]">Core Tech</th>
                      <th className="p-3.5 text-[#0f172a]">Pricing</th>
                      <th className="p-3.5 text-[#0f172a]">Edge</th>
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

          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-8">
            
            {/* AI SCORE */}
            <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6">
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

            {/* DOCUMENT VAULT */}
            <div id="vault" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
                <FileText className="w-5 h-5 text-[#6366f1]" />
                <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Document Vault</h4>
              </div>
              <div className="space-y-2">
                {['Pitch Deck (B2B SaaS Focus)', 'Financial Projections (3-Year)', 'Clinical Pilot Results & Testimonials', 'Patent Application Details'].map((doc, idx) => (
                  <div key={idx} className="p-3 bg-[#f8fafc] hover:bg-[#f5f3ff] border border-[#e2e8f0] rounded-xl flex items-center justify-between transition-colors cursor-pointer group">
                    <span className="text-xs font-bold text-[#475569] group-hover:text-[#6366f1] flex items-center">
                      <FileText className="w-4 h-4 mr-2.5 text-[#cbd5e1] group-hover:text-[#6366f1]" />
                      {doc}
                    </span>
                    <Download className="w-4 h-4 text-[#cbd5e1] group-hover:text-[#6366f1]" />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* SECTION: INVESTMENT ASK (Dedicated full-width section below all company details) */}
        <div id="ask" className="scroll-mt-24 bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 border-b border-[#f1f5f9] pb-3">
            <DollarSign className="w-5 h-5 text-[#6366f1]" />
            <h4 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Investment Opportunity & Financial Ask</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <div className="bg-[#f5f3ff] border border-[#e0e7ff] p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-[#4f46e5] uppercase tracking-wider block mb-2">Funding Ask</span>
                <span className="text-4xl font-black text-[#4f46e5]">{MOCK_COMPANY.investment.ask}</span>
              </div>
              <p className="text-xs font-semibold text-[#475569] mt-4 leading-relaxed">
                Evaluating Seed Round subscriptions to accelerate global clinical validation and Middle East business expansion.
              </p>
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
            Interested in the future of VR therapeutics? Request access to our full data room containing clinical results, or book an introductory call with the founding team.
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
    </div>
  );
}
