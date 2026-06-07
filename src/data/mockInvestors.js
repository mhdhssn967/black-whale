export const mockInvestors = [
  {
    id: "investor-malabar",
    name: "Malabar VR & DeepTech Partners",
    website: "https://malabarvp.com",
    location: "Kochi, Kerala, India",
    focusSectors: ["AI & DeepTech", "HealthTech & BioTech", "SaaS & Enterprise Software"],
    stages: ["Pre-seed", "Seed", "Series A"],
    ticketSize: "$150K - $1.2M",
    thesis: "Investing in visionary founders building deep technology and immersive software solutions in South India and emerging tech corridors. We focus heavily on AI, robotics, and medical diagnostics/therapeutics.",
    contactPartner: "Suhail Rahman (General Partner)",
    email: "suhail@malabarvp.com",
    linkedin: "https://linkedin.com/company/malabar-vp",
    portfolio: ["TranzAct VR", "KareMed Labs", "KeralaRobotics", "FinFlow India"],
    avatar: "GP"
  },
  {
    id: "investor-apex",
    name: "Apex Digital Ventures",
    website: "https://apexventures.com",
    location: "New York, NY, USA",
    focusSectors: ["SaaS & Enterprise Software", "Cybersecurity & Infrastructure", "FinTech & Blockchain"],
    stages: ["Seed", "Series A", "Series B"],
    ticketSize: "$500K - $2.5M",
    thesis: "Backing enterprise software startups that are redefining operations for Fortune 500 companies. We look for capital-efficient SaaS business models with strong recurring revenue indicators.",
    contactPartner: "Michael Vance (Managing Director)",
    email: "m.vance@apexventures.com",
    linkedin: "https://linkedin.com/company/apex-digital-ventures",
    portfolio: ["LatticeSec", "BillStack SaaS", "CloudAudit", "LogiChain"],
    avatar: "AV"
  },
  {
    id: "investor-katalyst",
    name: "Katalyst Health Capital",
    website: "https://katalysthealth.com",
    location: "Boston, MA, USA",
    focusSectors: ["HealthTech & BioTech"],
    stages: ["Seed", "Series A", "Series B"],
    ticketSize: "$1.0M - $5.0M",
    thesis: "Funding early-stage clinical developments, diagnostic tools, and digital healthcare interfaces. Our investment committee consists of clinical researchers and healthcare executives.",
    contactPartner: "Dr. Sarah Jenkins (Healthcare Partner)",
    email: "s.jenkins@katalysthealth.com",
    linkedin: "https://linkedin.com/company/katalyst-health-capital",
    portfolio: ["Genomix Therapeutics", "PulseBeat Wearables", "OncoDetect AI"],
    avatar: "KH"
  },
  {
    id: "investor-horizon",
    name: "Horizon Climate Fund",
    website: "https://horizonclimate.com",
    location: "Munich, Germany",
    focusSectors: ["ClimateTech & AgriTech", "Other"],
    stages: ["Pre-seed", "Seed", "Series A"],
    ticketSize: "$250K - $1.5M",
    thesis: "Committed to supporting green technologies and sustainable engineering projects. We invest in carbon capture, clean water systems, smart grid management, and sustainable agriculture.",
    contactPartner: "Dieter Baumann (Investment Lead)",
    email: "d.baumann@horizonclimate.de",
    linkedin: "https://linkedin.com/company/horizon-climate-fund",
    portfolio: ["SolarDistill", "SoilMetric AI", "GeoCapture", "WindGrid"],
    avatar: "HC"
  },
  {
    id: "investor-vedic",
    name: "Vedic Capital",
    website: "https://vediccap.in",
    location: "Bangalore, India",
    focusSectors: ["AI & DeepTech", "FinTech & Blockchain", "SaaS & Enterprise Software"],
    stages: ["Pre-seed", "Seed"],
    ticketSize: "$75K - $500K",
    thesis: "Providing early-stage hyper-growth capital to developers and engineers. We invest early, often when the startup is just at the prototype/MVP stage.",
    contactPartner: "Ananya Sharma (Co-Founder)",
    email: "ananya@vediccap.in",
    linkedin: "https://linkedin.com/company/vedic-capital",
    portfolio: ["PromptLayer Labs", "BharatPay SDK", "NeoNode Database"],
    avatar: "VC"
  },
  {
    id: "investor-decacorn",
    name: "Decacorn Capital",
    website: "https://decacorn.sg",
    location: "Singapore",
    focusSectors: ["Consumer Tech & E-Commerce", "SaaS & Enterprise Software", "FinTech & Blockchain"],
    stages: ["Seed", "Series A"],
    ticketSize: "$300K - $2.0M",
    thesis: "Backing fast-growing customer-facing applications and cross-border SaaS models in South-East Asia. We provide distribution support alongside capital.",
    contactPartner: "Marcus Chen (Partner)",
    email: "marcus.chen@decacorn.sg",
    linkedin: "https://linkedin.com/company/decacorn-cap",
    portfolio: ["PaySia", "CartGenie", "DeliveryGo", "HotelStack"],
    avatar: "DC"
  }
];

// Helper to compute a dynamic match score (0-100) between a startup and an investor
export function calculateMatchScore(startup, investor) {
  let score = 30; // base score

  // 1. Sector focus check (up to 40 pts)
  // Startup industry can be one of:
  // "SaaS & Enterprise Software", "FinTech & Blockchain", "ClimateTech & AgriTech",
  // "HealthTech & BioTech", "Cybersecurity & Infrastructure", "AI & DeepTech", "Consumer Tech & E-Commerce"
  
  if (investor.focusSectors.includes(startup.industry)) {
    score += 40;
  } else {
    // Partial sector match (e.g. software crossovers)
    const isSoftwareStartup = startup.industry === "SaaS & Enterprise Software" || startup.industry === "AI & DeepTech";
    const isSoftwareInvestor = investor.focusSectors.includes("SaaS & Enterprise Software") || investor.focusSectors.includes("AI & DeepTech");
    if (isSoftwareStartup && isSoftwareInvestor) {
      score += 20;
    }
  }

  // 2. Funding stage check (up to 20 pts)
  if (investor.stages.includes(startup.fundingStage)) {
    score += 20;
  } else {
    // Partial proximity check
    score += 10;
  }

  // 3. Location matching bonus (up to 10 pts)
  const startupLoc = startup.location ? startup.location.toLowerCase() : "";
  const investorLoc = investor.location ? investor.location.toLowerCase() : "";
  if (startupLoc && investorLoc) {
    if (startupLoc.includes("kerala") && investorLoc.includes("kerala") ||
        startupLoc.includes("india") && investorLoc.includes("india") ||
        startupLoc.includes("usa") && investorLoc.includes("usa")) {
      score += 10;
    }
  }

  return Math.min(score, 100);
}
