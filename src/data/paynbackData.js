// PayNback Mock Data for the dedicated showcase route
export const DEFAULT_MOCK_COMPANY = {
  // Basic Identity & Details
  id: "PYB-2026-FT",
  verified: true,
  name: "PayNback Infosolutions LLP",
  logo: "PB",
  cover: "",
  type: "Startup",
  founded: "2023",
  hq: "Bengaluru, Karnataka, India",
  industry: "FinTech / Loyalty",
  stage: "Seed",
  teamSize: "12",
  website: "https://www.paynback.in",
  linkedin: "",
  twitter: "",
  github: "",
  tags: [
    { label: "FinTech Payments", color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
    { label: "B2B SaaS Model", color: "bg-teal-50 text-teal-700 border-teal-100" },
    { label: "NPCI Approved", color: "bg-sky-50 text-sky-700 border-sky-100" },
    { label: "2.5K+ Active Users", color: "bg-amber-50 text-amber-700 border-amber-100" }
  ],

  // Mission & Vision
  tagline: "Spend. Earn. Grow.",
  vision: "To create a thriving ecosystem where local businesses flourish, communities prosper, and individuals are empowered through innovative technology and sustainable economic growth.",
  mission: "To empower local businesses and individuals by bridging the gap between traditional vendors and online shopping, thereby fostering community strength, creating job opportunities, and supporting the growth of the local economy.",

  // High-Level Financial & Traction Snapshots
  raised: "Bootstrapped",
  required: "₹5 Crores",
  revenue: "Early Revenue Stage",
  growth: "100% YoY (Projected)",
  customers: "500+ Merchants | 2500+ App Downloads",
  countries: "1",
  activeProducts: "4",

  // Narratives & Advisory
  aiSummary: "PayNback is India's first in-store shopping support app — the CRED for offline retail. It bridges the gap between traditional commerce and digital loyalty by enabling instant UPI-linked cashback at local stores. Merchants get zero-setup digital visibility, loyalty tools, and customer analytics. Consumers discover nearby deals, earn rewards on every purchase, and track their savings. Built on a franchisee-led high-touch model, PayNback creates a closed-loop ecosystem connecting consumers, merchants, wholesalers, and franchisees — with no upfront cost for merchants and a pay-per-sale revenue model.",

  overview: {
    story: "PayNback was born from a simple observation: while online shoppers enjoy cashback and rewards on every purchase, the 95% of India's retail that happens offline gets nothing. Local kirana stores, salons, pharmacies, and eateries had no digital loyalty tools, no way to retain customers, and no visibility. PayNback set out to fix this — starting from Kerala and scaling nationally.",
    problem: "Offline retail in India lacks a unified platform for rewards, discovery, and customer retention. Shoppers receive no cashback or reward system for local/in-store purchases, miss savings due to lack of deal discovery, and struggle to track spending. Local stores cannot retain customers like online platforms do, face high marketing costs with no digital visibility, and have no easy tools to offer loyalty programs or gain customer insights.",
    challenges: "Merchant adoption in low-digital-literacy areas, building trust with traditional kirana store owners, competing with well-funded online platforms, and achieving the network effect required for a two-sided marketplace at scale.",
    marketGap: "100% of existing loyalty and cashback tools (CRED, Paytm, Magicpin) focus on online or select chain store purchases. There is zero direct competition targeting offline rewards with UPI integration, store discovery, and merchant promotion tools — all in one platform.",
    solution: "PayNback offers a two-sided platform: consumers discover nearby stores offering instant cashback, pay via UPI and get rewarded instantly, and track their savings. Merchants get listed digitally with zero tech setup, offer cashback/loyalty to drive footfall, run promotions, track traffic, and understand customer behaviour. The platform operates across a Consumer App, Merchant App, Wholesaler App, and an AI-powered Sound Box device.",
    advantage: "PayNback's moat is its three-pillar USP: (1) A franchisee-led, high-touch model for personalized onboarding and on-ground trust — no other cashback app does this. (2) A unified closed-loop ecosystem connecting consumers, merchants, wholesalers, and franchisees on one platform, creating powerful network effects. (3) Zero-friction, value-first merchant adoption — merchants pay a 6% commission on each sale driven by PayNback, of which 2% goes to the consumer as instant cashback and 4% is retained by PayNback as net revenue."
  },

  // Team Details
  team: [
    {
      name: "Bony Thomas",
      image: "",
      role: "Co-Founder & CEO",
      shortBio: "Co-Founder & CEO of PayNback, leading product strategy, AI-driven innovation, fundraising, and national expansion. Identified the gap between digital payments and offline value to build a scalable, user-centric rewards platform for India's neighbourhood retail economy.",
      fullBio: [
        "Drives end-to-end product strategy, AI/ML personalization roadmap, and technology platform development.",
        "Leads fundraising, investor relations, and strategic distribution partnerships across India.",
        "Oversees merchant acquisition, franchisee network scaling, and regulatory compliance (DPIIT, KSUM, ISO).",
        "Architecting a disciplined 7-year growth roadmap: 1 million merchants, 10 million users — backed by strong unit economics.",
        "Vision: Build India's most trusted community commerce network — strengthening neighbourhood economies at scale."
      ],
      edu: "N/A",
      exp: "Product Strategy, AI-Led Innovation, Fundraising, Merchant Acquisition, Regulatory Compliance",
      tagline: "Empowering Local Retail with Technology | Building a B2B2C Community Commerce Network | Strengthening Neighbourhood Economies"
    },
    {
      name: "Shybi Varghese",
      image: "",
      role: "Co-Founder & COO",
      shortBio: "Co-Founder & COO of PayNback, driving operations, merchant onboarding, and on-ground execution. Brings disciplined operational leadership to ensure scalable delivery across cities, franchisees, and retail partners.",
      fullBio: [
        "Manages day-to-day operations, merchant onboarding workflows, and franchisee training & coordination.",
        "Leads on-ground execution across cities — ensuring quality of service, merchant satisfaction, and retention.",
        "Oversees supply chain for AI Sound Box deployment and wholesale marketplace logistics.",
        "Drives operational efficiency, SOPs, and scalable processes to support rapid multi-city expansion.",
        "Focus: Build resilient, repeatable operations that enable PayNback to scale from 500 to 10,000+ merchants."
      ],
      edu: "N/A",
      exp: "Operations Management, Merchant Onboarding, Franchisee Coordination, Process Optimization, On-Ground Execution",
      tagline: "Scaling Operations | Driving Merchant Success | Building Resilient On-Ground Networks"
    }
  ],

  // Advisors
  advisors: [
    {
      name: "DPIIT / Startup India",
      role: "Government Recognition Body",
      expertise: "Startup Ecosystem & Policy",
      org: "Startup India"
    },
    {
      name: "Kerala Startup Mission",
      role: "State Incubator",
      expertise: "Early-stage Startup Support",
      org: "Kerala Startup Mission (KSUM)"
    }
  ],

  // Products List
  products: [
    {
      name: "PayNback Consumer App",
      category: "Mobile Application",
      overview: "India's first in-store shopping support app for consumers. Discover nearby stores, pay via UPI, earn instant cashback, and track savings all in one place.",
      audience: "Smartphone users aged 18–55 in urban and semi-urban areas; value-conscious, frequent shoppers at local stores",
      features: [
        "User registration and profile creation",
        "Discover nearby stores offering instant cashback",
        "Product browsing and search functionality",
        "Pay via UPI & get rewarded instantly",
        "Loyalty and rewards program — earn redeemable points on every offline purchase",
        "Transaction history and savings tracker",
        "In-app chat with merchant / shop",
        "Push notifications for offers and promotions",
        "Referral program — earn more by referring friends"
      ],
      metrics: {
        users: "2,500+ Downloads",
        growth: "Active in 3 Cities"
      },
      image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800"
    },
    {
      name: "PayNback Merchant App",
      category: "Mobile Application",
      overview: "Companion app for local businesses to get digitally listed, manage loyalty programs, run promotions, and understand customer behaviour — with zero upfront cost.",
      audience: "Small and medium local retailers: kirana stores, chemists, apparel shops, electronics repair, cafes, salons",
      features: [
        "Merchant onboarding and profile setup in under 2 minutes",
        "Get listed digitally with zero tech setup required",
        "Product or service listing management",
        "Offer cashback/loyalty to drive footfall and acquire new customers",
        "Customer engagement tools — send targeted promotions and offers",
        "Payment processing and financial management via UPI integration",
        "Run promotions, track traffic, and understand customer behaviour",
        "Analytics dashboard for business insights",
        "Wholesale marketplace access"
      ],
      metrics: {
        users: "500+ Merchants Onboarded",
        growth: "2-minute fast onboarding"
      },
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
    },
    {
      name: "PayNback Wholesaler App",
      category: "Mobile Application",
      overview: "A B2B marketplace enabling wholesalers and manufacturers to list products, connect with retailers on the platform, and manage orders digitally.",
      audience: "Manufacturers, wholesalers, and distributors supplying to small retailers listed on PayNback",
      features: [
        "Product listing and management with MOQ and pricing",
        "Digital storefront to reach thousands of small retailers efficiently",
        "Order processing and fulfillment management",
        "Invoice generation and shipping coordination",
        "Seamless communication tools — direct messaging and inquiries",
        "Real-time order tracking",
        "Product recommendations and customer concern resolution"
      ],
      metrics: {
        users: "Integrated with Merchant App",
        growth: "B2B Pipeline Active"
      },
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800"
    },
    {
      name: "PayNback AI Sound Box",
      category: "Hardware / AI Device",
      overview: "A multilingual AI-powered payment confirmation sound box that understands and communicates with merchants and customers in their native language — breaking the digital literacy barrier.",
      audience: "Local merchants in Tier 2/3 cities and regional language-speaking store owners",
      features: [
        "AI-powered payment confirmation announcements",
        "Multi-lingual support — auto-detects merchant's region and uses local language",
        "Voice commands in local language for merchants",
        "Hyper-local announcements by channel/franchise partner",
        "Text-to-speech in local dialect and slang",
        "QR code payment integration",
        "Cashback confirmation on every purchase"
      ],
      metrics: {
        users: "In Deployment",
        growth: "Pilot Stage"
      },
      image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800"
    }
  ],

  // Milestones, Partnerships & Market Dynamics
  achievements: [
    "DPIIT Recognition — Startup India Registered",
    "Kerala Startup Mission (KSUM) Support",
    "ISO 9001, ISO 27001, ISO 20000 Certified",
    "TRAI, DMT, M2P Approved",
    "MSME Registered: UDYAM-KL-02-0089189",
    "Member: IAMAI (Internet and Mobile Association of India)",
    "Member: CII (Confederation of Indian Industry)",
    "Member: RAII (Retailers Association of India)",
    "4.5★ User Satisfaction Rating",
    "500+ Merchants Onboarded across 3 Cities",
    "2500+ App Downloads"
  ],

  milestones: [
    { year: "2023", event: "PayNback Infosolutions LLP incorporated; concept validation and product development initiated" },
    { year: "2024", event: "Consumer App and Merchant App launched on Google Play and App Store; initial merchant onboarding begins in Kerala" },
    { year: "2025", event: "500+ merchants onboarded; 2,500+ downloads; live in 3 cities; UPI + Wallet integration completed; AI Sound Box pilot initiated; DPIIT, ISO, KSUM recognitions secured" },
    { year: "2026", event: "Seed funding round of ₹5 Crores initiated; targeting 1,000 merchants and 10,000 customers by Q2" },
    { year: "2027", event: "Target: 2,500 merchants, 25,000 customers (Q3); national expansion initiated" },
    { year: "2028", event: "Target: 10,000 merchants, 500,000 customers; ₹180 Cr/year revenue milestone" }
  ],

  partners: [
    { name: "DPIIT / Startup India", type: "Government", value: "Regulatory recognition and startup ecosystem support" },
    { name: "Kerala Startup Mission (KSUM)", type: "Incubator", value: "State-level support, mentorship, and network access" },
    { name: "M2P Fintech", type: "Technology Partner", value: "Payment infrastructure and fintech API integration" },
    { name: "TRAI", type: "Regulatory", value: "Telecom regulatory compliance" },
    { name: "IAMAI", type: "Industry Body", value: "Internet and Mobile Association of India membership" },
    { name: "CII", type: "Industry Body", value: "Confederation of Indian Industry membership" },
    { name: "RAII", type: "Industry Body", value: "Retailers Association of India membership" }
  ],

  businessModel: {
    overview: "PayNback operates a performance-based, zero-upfront-cost model for merchants. Merchants pay a 6% commission on each transaction driven through the platform — of which 2% is passed to the consumer as instant cashback and 4% is retained by PayNback as net revenue. Additional revenue comes from premium merchant plans and local advertising. Merchants pay only when PayNback successfully drives a sale — aligning platform success with merchant success.",
    streams: [
      "6% Retailer Commission — on every transaction, 2% goes to the consumer as cashback and 4% is retained by PayNback as net revenue",
      "Premium Merchant Plans — paid listings, advanced analytics, and promotion tools for merchants wanting enhanced visibility",
      "Local Ads — brands and merchants pay for targeted visibility and promotional placements within the app"
    ],
    unitEconomics: {
      cac: "Low (franchisee-led ground onboarding reduces CAC vs digital-only acquisition)",
      ltv: "High (recurring 4% net commission per retained merchant × avg ₹3–10 lakh/month GMV)",
      grossMargin: "85%"
    }
  },

  market: {
    tam: "₹3,50,000 Crores (India retail rewards layer across 13–15M merchants)",
    sam: "₹80,000 Crores (Urban + semi-urban ~3–5M merchants)",
    som: "₹180 Crores (10,000 merchants, ₹5 Lakh/month GMV, 4% net yield after 2% user cashback)",
    cagr: "10.0%",
    trends: "95% of Indian retail is offline and untapped for rewards. UPI explosion has made QR infrastructure ubiquitous. Tier 2/3 cities are undergoing rapid digital adoption. Proven consumer demand for loyalty programs. Zero direct competition in offline-first rewards with UPI integration."
  },

  competitors: [
    {
      name: "PayNback",
      tech: "In-store UPI Cashback + Loyalty + Shop Discovery + Merchant Promotion",
      deployment: "App & AI Sound Box",
      price: "6% Commission (2% to user, 4% retained)",
      edge: "Zero upfront cost, franchisee-led model, closed-loop B2B2C ecosystem, AI Sound Box for low-literacy merchants"
    },
    {
      name: "Magicpin",
      tech: "In-store Cashback + UPI Integration",
      deployment: "Mobile App",
      price: "Commission-based",
      edge: "PayNback adds Loyalty Programme + Shop Discovery + Shop Promotion — Magicpin lacks all three"
    },
    {
      name: "Paytm",
      tech: "UPI Integration + Loyalty Programme",
      deployment: "Mobile App / Super App",
      price: "Transaction fees",
      edge: "PayNback adds In-store Cashback + Find Nearby Shop + Promote Your Shop — Paytm lacks these offline retail tools"
    },
    {
      name: "CRED",
      tech: "Credit Card Loyalty Programme",
      deployment: "Mobile App",
      price: "Subscription / Commission",
      edge: "CRED targets premium credit card users only — PayNback serves all UPI users at offline retail stores with instant cashback + shop discovery"
    },
    {
      name: "CashKaro",
      tech: "Online Cashback + Affiliate Coupons",
      deployment: "Mobile App / Website",
      price: "Affiliate Commission",
      edge: "CashKaro is 100% online e-commerce cashback — no offline retail, no merchant tools, no in-store discovery. PayNback owns the offline layer"
    },
    {
      name: "NearbyPay",
      tech: "Hyperlocal UPI Payments",
      deployment: "Mobile App",
      price: "Transaction-based",
      edge: "NearbyPay focuses on payments only — PayNback adds cashback rewards, loyalty programmes, merchant promotions, and a full B2B2C ecosystem"
    },
    {
      name: "Grippal",
      tech: "Merchant Loyalty Cards / Digital Stamps",
      deployment: "Mobile App",
      price: "Subscription-based",
      edge: "Grippal offers basic loyalty cards — PayNback provides UPI cashback, AI Sound Box, shop discovery, wholesaler marketplace, and franchisee distribution at scale"
    },
    {
      name: "Pay Pack",
      tech: "Cashback + Offers Aggregation",
      deployment: "Mobile App",
      price: "Commission-based",
      edge: "Pay Pack aggregates online offers — PayNback is purpose-built for offline retail with zero-upfront merchant onboarding, UPI-linked rewards, and hyperlocal engagement"
    },
    {
      name: "FreeCharge",
      tech: "Digital Wallet + Recharges + Cashback",
      deployment: "Mobile App",
      price: "Transaction fees",
      edge: "FreeCharge focuses on bill payments and online recharges — PayNback targets in-store retail purchases with instant cashback, merchant analytics, and community commerce"
    }
  ],

  // Document Vault
  documents: [
    { title: "Pitch Deck (Unified Rewards Focus)", document: "" },
    { title: "Financial Projections (3-Year)", document: "" },
    { title: "Draft Term Sheet", document: "" },
    { title: "NPCI Compliance Certification & Audit", document: "" },
    { title: "Patent Application Details", document: "" }
  ],

  // Funding Request
  investment: {
    ask: "₹5 Crores",
    equity: "5%",
    valuationPre: "₹100 Crores",
    valuationPost: "₹105 Crores",
    security: "Equity Shares",
    termSheet: "",
    utilization: [
      { category: "Sales & Marketing", percentage: 35 },
      { category: "Operations & Team Expansion", percentage: 25 },
      { category: "Merchant/Franchisee Acq & Training", percentage: 20 },
      { category: "Tech & Platform Dev", percentage: 10 },
      { category: "Working Capital & Compliance", percentage: 10 }
    ],
    expectedOutcomes: "5X–10X return for early-stage investors on a planned exit in 5–7 years. Revenue expected to grow 100% YoY with a net profit margin of 15%. Investment payback period of 4 years. Target: 10,000 merchants and 500,000 customers within 5 quarters."
  },

  // AI Score (analyst-inferred from pitch data)
  aiScore: {
    overall: 68,
    categories: {
      team: 62,
      market: 82,
      product: 75,
      financials: 58
    },
    strengths: "Massive untapped offline retail market with zero direct competition. Strong product-market fit validated by 500+ merchant onboardings and 4.5★ rating. Unique franchisee-led model creates defensible moat. Multiple revenue streams. Regulatory credentials (DPIIT, ISO, KSUM) add trust. UPI infrastructure tailwinds perfectly aligned.",
    weaknesses: "Team composition and specific founder backgrounds not disclosed in documents. Revenue figures are early/projected — MRR not confirmed. No disclosed institutional investors yet. Utilization breakdown for ₹5 Cr raise is high-level without detailed financial model.",
    concerns: "Execution risk in scaling the franchisee network nationally. Two-sided marketplace cold-start challenge (merchants need consumers; consumers need merchants). Dependency on UPI ecosystem and regulatory environment. Brand trademark still under process."
  }
};

export const DEFAULT_EXTENSIVE_OVERVIEW = `PayNback Infosolutions LLP is a Kerala-born, Bengaluru-headquartered FinTech startup building India's first integrated in-store shopping support and community-based cashback ecosystem. Positioned as the CRED for offline retail, PayNback bridges the long-standing gap between India's 95% offline retail economy and the digital loyalty revolution. The platform connects four key stakeholders — consumers, merchants, wholesalers, and franchisees — in a closed-loop network powered by UPI payments, AI-driven personalization, and a unique franchisee-led high-touch onboarding model. Consumers discover nearby stores offering instant cashback, pay via UPI, earn redeemable reward points, and track their savings through the app. Local merchants get listed digitally in under 2 minutes with zero upfront cost, access loyalty and promotion tools, and gain data-driven customer insights — capabilities previously available only to large organized retail chains. The platform's AI Sound Box further breaks the digital literacy barrier by communicating payment confirmations and promotions in the merchant's native language. With 500+ merchants onboarded, 2,500+ app downloads, a 4.5★ user satisfaction rating, and operations live across 3 cities, PayNback has demonstrated early product-market fit. The company holds DPIIT recognition, Kerala Startup Mission support, ISO 9001/27001/20000 certifications, and memberships with IAMAI, CII, and the Retailers Association of India. PayNback is now raising ₹5 Crores in seed funding at a ₹100 Crore pre-money valuation, offering 5% equity, to accelerate merchant acquisition, technology development, and national expansion — targeting 10,000 merchants and 500,000 consumers within 5 quarters, with a projected revenue run rate of ₹180 Crores/year.`;

export const DEFAULT_COMPANY_PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
    title: "PayNback Consumer App",
    desc: "In-store cashback and rewards discovery interface for shoppers at local stores"
  },
  {
    url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    title: "Merchant Onboarding Dashboard",
    desc: "Local merchants get digitally listed with zero tech setup in under 2 minutes"
  },
  {
    url: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800",
    title: "UPI Payment & Cashback Flow",
    desc: "Consumers pay via UPI and receive instant cashback rewards at partner stores"
  },
  {
    url: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800",
    title: "PayNback AI Sound Box",
    desc: "Multilingual AI-powered payment confirmation device for local merchants"
  }
];

export const DEFAULT_revenueDataByYear = {
  2023: [
    { month: "Jul", revenue: 0, expenses: 80000 },
    { month: "Aug", revenue: 0, expenses: 120000 },
    { month: "Sep", revenue: 10000, expenses: 150000 },
    { month: "Oct", revenue: 20000, expenses: 180000 },
    { month: "Nov", revenue: 30000, expenses: 200000 },
    { month: "Dec", revenue: 50000, expenses: 220000 }
  ],
  2024: [
    { month: "Jan", revenue: 80000, expenses: 250000 },
    { month: "Feb", revenue: 120000, expenses: 280000 },
    { month: "Mar", revenue: 180000, expenses: 300000 },
    { month: "Apr", revenue: 240000, expenses: 320000 },
    { month: "May", revenue: 300000, expenses: 350000 },
    { month: "Jun", revenue: 380000, expenses: 370000 }
  ],
  2025: [
    { month: "Jan", revenue: 500000, expenses: 400000 },
    { month: "Feb", revenue: 620000, expenses: 430000 },
    { month: "Mar", revenue: 780000, expenses: 460000 },
    { month: "Apr", revenue: 900000, expenses: 500000 },
    { month: "May", revenue: 1050000, expenses: 540000 },
    { month: "Jun", revenue: 1200000, expenses: 580000 }
  ],
  2026: [
    { month: "Jan", revenue: 1500000, expenses: 700000 },
    { month: "Feb", revenue: 1900000, expenses: 800000 },
    { month: "Mar", revenue: 2400000, expenses: 950000 },
    { month: "Apr", revenue: 3000000, expenses: 1100000 },
    { month: "May", revenue: 3700000, expenses: 1300000 },
    { month: "Jun", revenue: 4500000, expenses: 1500000 }
  ],
  2027: [
    { month: "Jan", revenue: 5500000, expenses: 1800000 },
    { month: "Feb", revenue: 6800000, expenses: 2100000 },
    { month: "Mar", revenue: 8500000, expenses: 2500000 },
    { month: "Apr", revenue: 10500000, expenses: 3000000 },
    { month: "May", revenue: 13000000, expenses: 3600000 },
    { month: "Jun", revenue: 16000000, expenses: 4200000 }
  ],
  2028: [
    { month: "Jan", revenue: 20000000, expenses: 5000000 },
    { month: "Feb", revenue: 25000000, expenses: 6000000 },
    { month: "Mar", revenue: 31000000, expenses: 7200000 },
    { month: "Apr", revenue: 38000000, expenses: 8500000 },
    { month: "May", revenue: 46000000, expenses: 10000000 },
    { month: "Jun", revenue: 55000000, expenses: 11500000 }
  ],
  2029: [
    { month: "Jan", revenue: 65000000, expenses: 13000000 },
    { month: "Feb", revenue: 76000000, expenses: 15000000 },
    { month: "Mar", revenue: 90000000, expenses: 17000000 },
    { month: "Apr", revenue: 106000000, expenses: 19500000 },
    { month: "May", revenue: 124000000, expenses: 22000000 },
    { month: "Jun", revenue: 145000000, expenses: 25000000 }
  ],
  2030: [
    { month: "Jan", revenue: 160000000, expenses: 28000000 },
    { month: "Feb", revenue: 175000000, expenses: 30000000 },
    { month: "Mar", revenue: 192000000, expenses: 33000000 },
    { month: "Apr", revenue: 210000000, expenses: 36000000 },
    { month: "May", revenue: 230000000, expenses: 39000000 },
    { month: "Jun", revenue: 250000000, expenses: 42000000 }
  ],
  2031: [
    { month: "Jan", revenue: 275000000, expenses: 45000000 },
    { month: "Feb", revenue: 300000000, expenses: 48000000 },
    { month: "Mar", revenue: 330000000, expenses: 52000000 },
    { month: "Apr", revenue: 360000000, expenses: 56000000 },
    { month: "May", revenue: 395000000, expenses: 60000000 },
    { month: "Jun", revenue: 430000000, expenses: 65000000 }
  ]
};

export const DEFAULT_userDataByYear = {
  2023: [
    { month: "Jul", sessions: 50 },
    { month: "Aug", sessions: 120 },
    { month: "Sep", sessions: 300 },
    { month: "Oct", sessions: 600 },
    { month: "Nov", sessions: 950 },
    { month: "Dec", sessions: 1400 }
  ],
  2024: [
    { month: "Jan", sessions: 2000 },
    { month: "Feb", sessions: 2800 },
    { month: "Mar", sessions: 3800 },
    { month: "Apr", sessions: 5000 },
    { month: "May", sessions: 6500 },
    { month: "Jun", sessions: 8200 }
  ],
  2025: [
    { month: "Jan", sessions: 10000 },
    { month: "Feb", sessions: 12500 },
    { month: "Mar", sessions: 15500 },
    { month: "Apr", sessions: 19000 },
    { month: "May", sessions: 23000 },
    { month: "Jun", sessions: 27500 }
  ],
  2026: [
    { month: "Jan", sessions: 33000 },
    { month: "Feb", sessions: 40000 },
    { month: "Mar", sessions: 50000 },
    { month: "Apr", sessions: 62000 },
    { month: "May", sessions: 76000 },
    { month: "Jun", sessions: 93000 }
  ],
  2027: [
    { month: "Jan", sessions: 112000 },
    { month: "Feb", sessions: 135000 },
    { month: "Mar", sessions: 165000 },
    { month: "Apr", sessions: 200000 },
    { month: "May", sessions: 240000 },
    { month: "Jun", sessions: 290000 }
  ],
  2028: [
    { month: "Jan", sessions: 350000 },
    { month: "Feb", sessions: 420000 },
    { month: "Mar", sessions: 510000 },
    { month: "Apr", sessions: 620000 },
    { month: "May", sessions: 750000 },
    { month: "Jun", sessions: 900000 }
  ],
  2029: [
    { month: "Jan", sessions: 1050000 },
    { month: "Feb", sessions: 1250000 },
    { month: "Mar", sessions: 1480000 },
    { month: "Apr", sessions: 1750000 },
    { month: "May", sessions: 2050000 },
    { month: "Jun", sessions: 2400000 }
  ],
  2030: [
    { month: "Jan", sessions: 2800000 },
    { month: "Feb", sessions: 3200000 },
    { month: "Mar", sessions: 3700000 },
    { month: "Apr", sessions: 4300000 },
    { month: "May", sessions: 5000000 },
    { month: "Jun", sessions: 5800000 }
  ],
  2031: [
    { month: "Jan", sessions: 6700000 },
    { month: "Feb", sessions: 7700000 },
    { month: "Mar", sessions: 8900000 },
    { month: "Apr", sessions: 10200000 },
    { month: "May", sessions: 11700000 },
    { month: "Jun", sessions: 13500000 }
  ]
};

export const DEFAULT_recoveryDataByYear = {
  2023: [
    { week: "Wk 1", traditional: 8, paynback: 22 },
    { week: "Wk 2", traditional: 9, paynback: 28 },
    { week: "Wk 3", traditional: 8, paynback: 34 },
    { week: "Wk 4", traditional: 9, paynback: 40 }
  ],
  2024: [
    { week: "Wk 1", traditional: 10, paynback: 45 },
    { week: "Wk 2", traditional: 10, paynback: 50 },
    { week: "Wk 3", traditional: 11, paynback: 55 },
    { week: "Wk 4", traditional: 11, paynback: 60 }
  ],
  2025: [
    { week: "Wk 1", traditional: 12, paynback: 63 },
    { week: "Wk 2", traditional: 12, paynback: 66 },
    { week: "Wk 3", traditional: 13, paynback: 69 },
    { week: "Wk 4", traditional: 13, paynback: 72 }
  ],
  2026: [
    { week: "Wk 1", traditional: 13, paynback: 74 },
    { week: "Wk 2", traditional: 14, paynback: 76 },
    { week: "Wk 3", traditional: 14, paynback: 78 },
    { week: "Wk 4", traditional: 14, paynback: 80 }
  ],
  2027: [
    { week: "Wk 1", traditional: 14, paynback: 81 },
    { week: "Wk 2", traditional: 15, paynback: 82 },
    { week: "Wk 3", traditional: 15, paynback: 83 },
    { week: "Wk 4", traditional: 15, paynback: 84 }
  ],
  2028: [
    { week: "Wk 1", traditional: 15, paynback: 85 },
    { week: "Wk 2", traditional: 16, paynback: 86 },
    { week: "Wk 3", traditional: 16, paynback: 87 },
    { week: "Wk 4", traditional: 16, paynback: 88 }
  ],
  2029: [
    { week: "Wk 1", traditional: 16, paynback: 88 },
    { week: "Wk 2", traditional: 17, paynback: 89 },
    { week: "Wk 3", traditional: 17, paynback: 90 },
    { week: "Wk 4", traditional: 17, paynback: 90 }
  ],
  2030: [
    { week: "Wk 1", traditional: 17, paynback: 91 },
    { week: "Wk 2", traditional: 18, paynback: 91 },
    { week: "Wk 3", traditional: 18, paynback: 92 },
    { week: "Wk 4", traditional: 18, paynback: 92 }
  ],
  2031: [
    { week: "Wk 1", traditional: 18, paynback: 92 },
    { week: "Wk 2", traditional: 19, paynback: 93 },
    { week: "Wk 3", traditional: 19, paynback: 93 },
    { week: "Wk 4", traditional: 19, paynback: 94 }
  ]
};

export const DEFAULT_customerSegmentDataByYear = {
  2023: [
    { name: "Grocery / Kirana", value: 45 },
    { name: "Food & Beverage", value: 25 },
    { name: "Pharmacy / Health", value: 15 },
    { name: "Apparel / Fashion", value: 10 },
    { name: "Others", value: 5 }
  ],
  2024: [
    { name: "Grocery / Kirana", value: 40 },
    { name: "Food & Beverage", value: 25 },
    { name: "Pharmacy / Health", value: 15 },
    { name: "Apparel / Fashion", value: 12 },
    { name: "Electronics / Repair", value: 5 },
    { name: "Others", value: 3 }
  ],
  2025: [
    { name: "Grocery / Kirana", value: 35 },
    { name: "Food & Beverage", value: 25 },
    { name: "Pharmacy / Health", value: 15 },
    { name: "Apparel / Fashion", value: 12 },
    { name: "Electronics / Repair", value: 7 },
    { name: "Salons / Personal Care", value: 4 },
    { name: "Others", value: 2 }
  ],
  2026: [
    { name: "Grocery / Kirana", value: 30 },
    { name: "Food & Beverage", value: 25 },
    { name: "Pharmacy / Health", value: 15 },
    { name: "Apparel / Fashion", value: 13 },
    { name: "Electronics / Repair", value: 8 },
    { name: "Salons / Personal Care", value: 6 },
    { name: "Others", value: 3 }
  ],
  2027: [
    { name: "Grocery / Kirana", value: 28 },
    { name: "Food & Beverage", value: 24 },
    { name: "Pharmacy / Health", value: 15 },
    { name: "Apparel / Fashion", value: 14 },
    { name: "Electronics / Repair", value: 9 },
    { name: "Salons / Personal Care", value: 7 },
    { name: "Others", value: 3 }
  ],
  2028: [
    { name: "Grocery / Kirana", value: 26 },
    { name: "Food & Beverage", value: 23 },
    { name: "Pharmacy / Health", value: 15 },
    { name: "Apparel / Fashion", value: 15 },
    { name: "Electronics / Repair", value: 10 },
    { name: "Salons / Personal Care", value: 8 },
    { name: "Others", value: 3 }
  ],
  2029: [
    { name: "Grocery / Kirana", value: 24 },
    { name: "Food & Beverage", value: 22 },
    { name: "Pharmacy / Health", value: 15 },
    { name: "Apparel / Fashion", value: 16 },
    { name: "Electronics / Repair", value: 11 },
    { name: "Salons / Personal Care", value: 9 },
    { name: "Others", value: 3 }
  ],
  2030: [
    { name: "Grocery / Kirana", value: 22 },
    { name: "Food & Beverage", value: 22 },
    { name: "Pharmacy / Health", value: 15 },
    { name: "Apparel / Fashion", value: 17 },
    { name: "Electronics / Repair", value: 12 },
    { name: "Salons / Personal Care", value: 9 },
    { name: "Others", value: 3 }
  ],
  2031: [
    { name: "Grocery / Kirana", value: 20 },
    { name: "Food & Beverage", value: 22 },
    { name: "Pharmacy / Health", value: 15 },
    { name: "Apparel / Fashion", value: 18 },
    { name: "Electronics / Repair", value: 13 },
    { name: "Salons / Personal Care", value: 9 },
    { name: "Others", value: 3 }
  ]
};

export const DEFAULT_YEARLY_GROWTH_DATA = {
  2023: {
    year: "2023",
    revenue: "Pre-Revenue (Development Phase)",
    merchants: "0",
    sessions: "0",
    analysis: "Company incorporated as PayNback Infosolutions LLP. Core product development initiated — Consumer App and Merchant App in build phase. Concept validated through primary market research in Kerala. Team assembled.",
    milestone: "Company Incorporation & Product Development"
  },
  2024: {
    year: "2024",
    revenue: "₹8–10 Lakh ARR (Early)",
    merchants: "50+",
    sessions: "8,200+",
    analysis: "Consumer App and Merchant App launched on Google Play Store and Apple App Store. First batch of merchant onboarding in Kochi and nearby areas. UPI integration and wallet features activated. Initial consumer downloads validated product-market fit.",
    milestone: "App Launch & First Merchant Onboarding"
  },
  2025: {
    year: "2025",
    revenue: "₹1.2 Crores ARR",
    merchants: "500+",
    sessions: "27,500+",
    analysis: "Commercial rollout across 3 cities. 500+ merchants onboarded and 2,500+ app downloads achieved. 4.5★ user satisfaction rating. UPI + Wallet fully integrated. AI Sound Box pilot initiated. DPIIT, ISO 9001/27001/20000, KSUM recognitions secured. Seed funding round opened.",
    milestone: "Commercial Rollout — 500+ Merchants & 3 Cities Live"
  },
  2026: {
    year: "2026",
    revenue: "₹6–8 Crores ARR",
    merchants: "1,000+",
    sessions: "93,000+",
    analysis: "Seed funding of ₹5 Crores deployed. Technology platform upgraded with AI/ML personalization. Merchant base scaled to 1,000+ across urban Kerala and Bengaluru. Customer base hits 10,000. Franchisee model launched. AI Sound Box commercialized. Premium merchant plans rolled out.",
    milestone: "Seed Round Deployment & 1,000 Merchants"
  },
  2027: {
    year: "2027",
    revenue: "₹20–25 Crores ARR",
    merchants: "2,500+",
    sessions: "290,000+",
    analysis: "Rapid national expansion — entered Tier 1 and Tier 2 cities across South India. Franchisee network scaled significantly. 25,000 active consumers. Local Ads business stream gains traction from FMCG brands. Wholesale marketplace sees strong B2B activity.",
    milestone: "National Expansion — 2,500 Merchants & 25,000 Customers"
  },
  2028: {
    year: "2028",
    revenue: "₹80–100 Crores ARR",
    merchants: "5,000+",
    sessions: "900,000+",
    analysis: "Pan-India presence established across top 25 cities. 50,000 consumers. Series A fundraise targeted. AI Sound Box deployed at scale. Premium merchant plans contribute significantly to revenue. Network effect fully in motion — merchant growth drives consumer growth.",
    milestone: "Series A Stage — 5,000 Merchants & 50,000 Customers"
  },
  2029: {
    year: "2029",
    revenue: "₹150 Crores ARR",
    merchants: "7,500+",
    sessions: "2,400,000+",
    analysis: "Market leader in offline retail cashback in India. 150,000+ consumers. Brand partnerships with major FMCG and CPG companies for targeted in-app advertising. Considering expansion to Bangladesh, Sri Lanka, and Southeast Asian markets.",
    milestone: "Market Leadership — 7,500 Merchants & 150,000 Consumers"
  },
  2030: {
    year: "2030",
    revenue: "₹180 Crores ARR",
    merchants: "10,000+",
    sessions: "5,800,000+",
    analysis: "SOM target achieved — 10,000 merchants and 500,000 consumers. Annual GMV of ₹6,000 Crores processed through PayNback platform. Net profit margin stable at 15%. International expansion underway. Investor exit window opens (5–7 year horizon from 2023).",
    milestone: "SOM Target Achieved — ₹180 Cr Revenue & 500K Consumers"
  },
  2031: {
    year: "2031",
    revenue: "₹250+ Crores ARR",
    merchants: "15,000+",
    sessions: "13,500,000+",
    analysis: "Dominant fintech-powered loyalty layer for India's SMB retail ecosystem. IPO / strategic acquisition discussions. Global cashback apps market reaches ₹51,186 Crores with Asia-Pacific at 40% share — PayNback positioned as category leader in India.",
    milestone: "IPO Horizon — Category Leader in India Offline Loyalty"
  }
};

export const DEFAULT_mapLocations = {
  2023: [
    {
      id: "kerala",
      name: "Kerala HQ (Ernakulam / Kochi)",
      coordinates: [76.26, 9.93],
      desc: "Founding city — product development and initial concept validation"
    }
  ],
  2024: [
    {
      id: "kerala",
      name: "Kochi, Kerala",
      coordinates: [76.26, 9.93],
      desc: "First merchant onboarding — Consumer & Merchant App launch"
    },
    {
      id: "thiruvananthapuram",
      name: "Thiruvananthapuram, Kerala",
      coordinates: [76.94, 8.53],
      desc: "Pilot city expansion — early merchant network"
    }
  ],
  2025: [
    {
      id: "kochi",
      name: "Kochi, Kerala",
      coordinates: [76.26, 9.93],
      desc: "500+ active merchant integrations, primary operations hub"
    },
    {
      id: "kozhikode",
      name: "Kozhikode, Kerala",
      coordinates: [75.78, 11.25],
      desc: "City 2 — active merchant network"
    },
    {
      id: "bangalore",
      name: "Bengaluru, Karnataka",
      coordinates: [77.59, 12.97],
      desc: "City 3 — HQ city and tech operations"
    }
  ],
  2026: [
    {
      id: "kochi",
      name: "Kochi, Kerala",
      coordinates: [76.26, 9.93],
      desc: "1,000+ merchants — primary market"
    },
    {
      id: "bangalore",
      name: "Bengaluru, Karnataka",
      coordinates: [77.59, 12.97],
      desc: "HQ and tech hub — expanding merchant base"
    },
    {
      id: "chennai",
      name: "Chennai, Tamil Nadu",
      coordinates: [80.27, 13.08],
      desc: "New city expansion — franchisee model launch"
    },
    {
      id: "hyderabad",
      name: "Hyderabad, Telangana",
      coordinates: [78.47, 17.38],
      desc: "South India expansion — merchant acquisition"
    }
  ],
  2027: [
    {
      id: "kochi",
      name: "Kochi, Kerala",
      coordinates: [76.26, 9.93],
      desc: "Mature market — 800+ merchants"
    },
    {
      id: "bangalore",
      name: "Bengaluru, Karnataka",
      coordinates: [77.59, 12.97],
      desc: "Major hub — 600+ merchants"
    },
    {
      id: "chennai",
      name: "Chennai, Tamil Nadu",
      coordinates: [80.27, 13.08],
      desc: "400+ merchants"
    },
    {
      id: "hyderabad",
      name: "Hyderabad, Telangana",
      coordinates: [78.47, 17.38],
      desc: "300+ merchants"
    },
    {
      id: "mumbai",
      name: "Mumbai, Maharashtra",
      coordinates: [72.87, 19.07],
      desc: "West India entry — pilot merchants"
    },
    {
      id: "pune",
      name: "Pune, Maharashtra",
      coordinates: [73.85, 18.52],
      desc: "Tier 1 expansion — merchant onboarding"
    }
  ],
  2028: [
    {
      id: "south-india",
      name: "South India Hub (Kochi / Bengaluru / Chennai / Hyderabad)",
      coordinates: [78.0, 11.5],
      desc: "Mature market — 3,000+ merchants across South India"
    },
    {
      id: "mumbai",
      name: "Mumbai, Maharashtra",
      coordinates: [72.87, 19.07],
      desc: "500+ merchants — West India stronghold"
    },
    {
      id: "delhi",
      name: "Delhi NCR",
      coordinates: [77.10, 28.70],
      desc: "North India entry — merchant network growing"
    },
    {
      id: "kolkata",
      name: "Kolkata, West Bengal",
      coordinates: [88.36, 22.57],
      desc: "East India entry — pilot launch"
    }
  ],
  2029: [
    {
      id: "pan-india",
      name: "Pan-India Operations",
      coordinates: [78.96, 20.59],
      desc: "7,500+ merchants across 20+ cities — market leader in offline loyalty"
    }
  ],
  2030: [
    {
      id: "pan-india",
      name: "Pan-India (10,000+ Merchants)",
      coordinates: [78.96, 20.59],
      desc: "SOM achieved — ₹6,000 Cr GMV processed annually"
    },
    {
      id: "international",
      name: "International Expansion (Pilot)",
      coordinates: [80.77, 7.87],
      desc: "Sri Lanka / Bangladesh pilot — Southeast Asia entry"
    }
  ],
  2031: [
    {
      id: "pan-india",
      name: "Pan-India (15,000+ Merchants)",
      coordinates: [78.96, 20.59],
      desc: "Dominant India offline loyalty leader — IPO horizon"
    },
    {
      id: "sea",
      name: "Southeast Asia",
      coordinates: [101.97, 4.21],
      desc: "Active international markets — Malaysia, Singapore, Indonesia pilots"
    }
  ]
};

export const EMPTY_MOCK_COMPANY = {
  // Basic Identity & Details
  id: "",
  verified: false,
  name: "New Company",
  logo: "",
  cover: "",
  type: "Startup",
  founded: "",
  hq: "",
  industry: "",
  stage: "",
  teamSize: "0",
  website: "",
  linkedin: "",
  twitter: "",
  github: "",
  tags: [],

  // Mission & Vision
  tagline: "",
  vision: "",
  mission: "",

  // High-Level Financial & Traction Snapshots
  raised: "",
  required: "",
  revenue: "",
  growth: "",
  customers: "",
  countries: "0",
  activeProducts: "0",

  // Narratives & Advisory
  aiSummary: "",

  overview: {
    story: "",
    problem: "",
    challenges: "",
    marketGap: "",
    solution: "",
    advantage: ""
  },

  // Team Details
  team: [
    {
      name: "Founder Name",
      image: "",
      role: "Founder & CEO",
      shortBio: "",
      fullBio: [],
      edu: "",
      exp: "",
      tagline: ""
    }
  ],

  // Advisors
  advisors: [],

  // Products List
  products: [
    {
      name: "Product 1",
      category: "",
      overview: "",
      audience: "",
      features: [],
      metrics: {
        users: "0",
        growth: ""
      },
      image: ""
    }
  ],

  // Milestones, Partnerships & Market Dynamics
  achievements: [],

  milestones: [],

  partners: [],

  businessModel: {
    overview: "",
    streams: [],
    unitEconomics: {
      cac: "0",
      ltv: "0",
      grossMargin: "0"
    }
  },

  market: {
    tam: "0",
    sam: "0",
    som: "0",
    cagr: "0%",
    trends: ""
  },

  competitors: [
    {
      name: "Competitor 1",
      tech: "",
      deployment: "",
      price: "",
      edge: ""
    }
  ],

  // Document Vault
  documents: [
    { title: "Pitch Deck", document: "" },
    { title: "Draft Term Sheet", document: "" }
  ],

  // Funding Request
  investment: {
    ask: "0",
    equity: "0%",
    valuationPre: "0",
    valuationPost: "0",
    security: "",
    termSheet: "",
    utilization: [
      { category: "R&D", percentage: 100 }
    ],
    expectedOutcomes: ""
  },

  // AI Score (analyst-inferred from pitch data)
  aiScore: {
    overall: 0,
    categories: {
      team: 0,
      market: 0,
      product: 0,
      financials: 0
    },
    strengths: "",
    weaknesses: "",
    concerns: ""
  }
};

export const EMPTY_EXTENSIVE_OVERVIEW = "Enter company overview here...";

export const EMPTY_COMPANY_PHOTOS = [];

const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];

const buildEmptyRevenueData = () => {
  const data = {};
  years.forEach(year => {
    data[year] = [
      { month: "Jan", revenue: 0, expenses: 0 },
      { month: "Feb", revenue: 0, expenses: 0 },
      { month: "Mar", revenue: 0, expenses: 0 },
      { month: "Apr", revenue: 0, expenses: 0 },
      { month: "May", revenue: 0, expenses: 0 },
      { month: "Jun", revenue: 0, expenses: 0 }
    ];
  });
  return data;
};

const buildEmptyUserData = () => {
  const data = {};
  years.forEach(year => {
    data[year] = [
      { month: "Jan", sessions: 0 },
      { month: "Feb", sessions: 0 },
      { month: "Mar", sessions: 0 },
      { month: "Apr", sessions: 0 },
      { month: "May", sessions: 0 },
      { month: "Jun", sessions: 0 }
    ];
  });
  return data;
};

const buildEmptyRecoveryData = () => {
  const data = {};
  years.forEach(year => {
    data[year] = [
      { week: "Wk 1", traditional: 0, paynback: 0 },
      { week: "Wk 2", traditional: 0, paynback: 0 },
      { week: "Wk 3", traditional: 0, paynback: 0 },
      { week: "Wk 4", traditional: 0, paynback: 0 }
    ];
  });
  return data;
};

const buildEmptySegmentData = () => {
  const data = {};
  years.forEach(year => {
    data[year] = [
      { name: "Segment 1", value: 100 }
    ];
  });
  return data;
};

const buildEmptyYearlyGrowthData = () => {
  const data = {};
  years.forEach(year => {
    data[year] = {
      year: year.toString(),
      revenue: "0",
      merchants: "0",
      sessions: "0",
      analysis: "",
      milestone: ""
    };
  });
  return data;
};

const buildEmptyMapLocations = () => {
  const data = {};
  years.forEach(year => {
    data[year] = [];
  });
  return data;
};

export const EMPTY_revenueDataByYear = buildEmptyRevenueData();
export const EMPTY_userDataByYear = buildEmptyUserData();
export const EMPTY_recoveryDataByYear = buildEmptyRecoveryData();
export const EMPTY_customerSegmentDataByYear = buildEmptySegmentData();
export const EMPTY_YEARLY_GROWTH_DATA = buildEmptyYearlyGrowthData();
export const EMPTY_mapLocations = buildEmptyMapLocations();

