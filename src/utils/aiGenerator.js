// Generate a professional-sounding startup profile based on raw input
export const generateStartupProfile = (input) => {
  const name = input.name || "Unnamed Startup";
  const industry = input.industry || input.segment || "General Tech";
  const category = input.category || "Software Solutions";
  const problem = input.problem || "Lack of efficient solutions in the industry.";
  const solution = input.solution || "An innovative platform that solves key operational issues.";
  const targetMarket = input.targetMarket || "Global enterprises and SMEs.";
  const revenueModel = input.revenueModel || "Subscription-based pricing.";
  const fundingStage = input.fundingStage || "Seed";
  const fundingRequirement = input.fundingRequirement || input.askAmount || "500000";
  const teamInfo = input.teamInfo || "Experienced team of founders and operators.";
  const location = input.location || input.address || "San Francisco, CA";
  const customers = input.customers || "Early beta users.";

  // Calculate realistic scorecards dynamically based on input completeness and keywords
  let marketScore = 75;
  if (targetMarket.toLowerCase().includes("billion") || targetMarket.toLowerCase().includes("b") || targetMarket.toLowerCase().includes("global")) {
    marketScore += 15;
  }
  marketScore = Math.min(98, Math.max(65, marketScore + Math.floor(Math.random() * 6)));

  let scalabilityScore = 70;
  const saasKeywords = ["saas", "subscription", "platform", "recurring", "license", "api", "software"];
  if (saasKeywords.some(kw => revenueModel.toLowerCase().includes(kw) || category.toLowerCase().includes(kw))) {
    scalabilityScore += 18;
  }
  scalabilityScore = Math.min(98, Math.max(60, scalabilityScore + Math.floor(Math.random() * 6)));

  let innovationScore = 72;
  const techKeywords = ["ai", "artificial intelligence", "ml", "machine learning", "blockchain", "crypto", "quantum", "web3", "automation", "sensors", "drone", "biotech", "dna", "crispr"];
  if (techKeywords.some(kw => solution.toLowerCase().includes(kw) || problem.toLowerCase().includes(kw) || category.toLowerCase().includes(kw))) {
    innovationScore += 16;
  }
  innovationScore = Math.min(98, Math.max(65, innovationScore + Math.floor(Math.random() * 6)));

  let readinessScore = 65;
  if (input.pitchDeckName) readinessScore += 10;
  if (input.founders && input.founders.length > 0) readinessScore += 10;
  if (input.products && input.products.length > 0) readinessScore += 8;
  readinessScore = Math.min(95, Math.max(55, readinessScore + Math.floor(Math.random() * 5)));

  // AI-generated copywriting sections using professional startup templates
  const overview = input.overview || `${name} is an emerging leader in the ${industry} space, specializing in ${category}. By leveraging technology to address critical friction points, the company empowers its target customers to optimize outcomes and achieve significant cost savings. Built for high scalability, ${name} is positioning itself to capture a significant share of a rapidly expanding market.`;

  const problemStatement = `In the modern ${industry} landscape, stakeholders are facing severe operational inefficiencies. Specifically: "${problem.replace(/\.$/, "")}." This friction results in substantial financial waste, lost productivity, and administrative overhead, highlighting the critical need for a modern, automated solution.`;

  const solutionDetails = `${name} addresses this challenge with its proprietary solution: ${solution.replace(/\.$/, "")}. Designed with user-centric principles, the platform streamlines workflows, automates complex decision-making processes, and provides users with real-time insight. This solution not only resolves current inefficiencies but also unlocks new revenue opportunities for customers.`;

  const marketOpportunity = `The target market for this solution is defined as ${targetMarket.replace(/\.$/, "")}. As digital transformation accelerates within ${industry}, ${name} targets high-growth segments. Our Initial Addressable Market consists of operators looking to immediately reduce costs, with plans to expand into adjacent categories over the next 18 to 24 months.`;

  const businessModelDetails = `The primary commercial engine is structured around a ${revenueModel.replace(/\.$/, "")}. This pricing framework is engineered to optimize customer lifetime value (LTV) while maintaining a low cost of customer acquisition (CAC). By providing clear ROI directly to decision-makers, ${name} anticipates rapid sales cycles and high net-revenue retention.`;

  const competitiveAdvantage = input.competitiveAdvantage || `Unlike legacy providers who offer fragmented, manual tools, ${name} provides a seamless, integrated approach. Our key competitive differentiators include: 1) A proprietary workflow optimization model tailored for ${category}; 2) An intuitive interface that drastically reduces onboarding time; and 3) A capital-efficient deployment model that allows us to pass cost savings back to our customers.`;

  // Dynamic investment highlights
  const investmentHighlights = [
    `Strong Value Proposition: Directly addresses a critical friction point: "${problem.substring(0, 80)}..." with a high-margin solution.`,
    `Scalable Commercial Model: Built on a capital-efficient ${revenueModel.toLowerCase().includes("saas") || revenueModel.toLowerCase().includes("subscription") ? "recurring SaaS" : "transactional"} revenue foundation with robust expansion potential.`,
    `Founding Team Alignment: Led by dedicated domain operators and technical specialists who understand the target audience: "${teamInfo.substring(0, 100)}..."`,
    `Early Market Validation: Positioned to capture market share within a key sector of ${industry}. ${customers ? `Supported by early traction: "${customers.substring(0, 85)}."` : "Targeting an immediate operational pain point."}`
  ];

  // Allocation breakdown
  const cleanAmt = parseFloat(fundingRequirement.replace(/[^0-9.]/g, "")) || 500000;
  const rnd = (val) => Math.round(val);
  const allocationText = `The company is raising $${fundingRequirement} (Stage: ${fundingStage}) to fuel its next phase of growth. The capital will be deployed strategically: 50% ($${rnd(cleanAmt * 0.5).toLocaleString()}) for core technology development & engineering hires; 30% ($${rnd(cleanAmt * 0.3).toLocaleString()}) to accelerate sales, marketing, and customer acquisition channels; and 20% ($${rnd(cleanAmt * 0.2).toLocaleString()}) for operational overhead, working capital, and compliance requirements.`;

  return {
    scorecards: {
      marketPotential: marketScore,
      scalability: scalabilityScore,
      innovationLevel: innovationScore,
      readiness: readinessScore
    },
    aiGenerated: {
      overview,
      problemStatement,
      solutionDetails,
      marketOpportunity,
      businessModelDetails,
      competitiveAdvantage,
      investmentHighlights,
      intendedUseOfFunds: allocationText
    }
  };
};

// Return the list of simulation steps for the loading screen
export const getAnalysisSteps = (startupName, industry) => [
  { id: "step-1", label: `Analyzing website URL and digital footprint for ${startupName}...` },
  { id: "step-2", label: `Parsing core product category: benchmarking against ${industry} standards...` },
  { id: "step-3", label: `Deconstructing problem/solution dynamics and value propositions...` },
  { id: "step-4", label: `Modeling target market sizing and estimating customer adoption metrics...` },
  { id: "step-5", label: `Reviewing team capabilities, operational history, and advisory signals...` },
  { id: "step-6", label: `Running scorecard algorithm for Market, Scalability, Innovation, and Readiness...` },
  { id: "step-7", label: `Formatting final investor-ready templates and highlights...` }
];
