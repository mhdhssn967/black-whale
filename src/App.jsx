import React, { useState } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomeHub from './components/HomeHub';
import FounderOnboarding from './components/FounderOnboarding';
import AIAnalysisLoader from './components/AIAnalysisLoader';
import StartupProfileView from './components/StartupProfileView';
import InvestorDirectory from './components/InvestorDirectory';
import FullProfileMock from './components/FullProfileMock';
import PaynbackProfile from './components/PaynbackProfile';
import CompanyLogin from './components/CompanyLogin';
import { initialStartups } from './data/mockStartups';
import { generateStartupProfile } from './utils/aiGenerator';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const oqulixStartup = {
  id: "startup-oqulix",
  name: "Oqulix Pvt Ltd",
  website: "https://www.oqulix.com",
  location: "Ernakulam, Kerala, India",
  industry: "VR / Software Development",
  category: "Immersive VR for Healthcare, Education & Therapy",
  problem: "Traditional physical rehabilitation (physiotherapy) and patient therapy are often tedious, low-engagement, and difficult to track objectively, leading to poor patient compliance and slower recovery rates.",
  solution: "An immersive Virtual Reality platform that gamifies physical therapy and cognitive rehabilitation. By using VR headsets and motion-tracking sensors, patients engage in interactive, therapeutic games while clinicians receive real-time data to track recovery progress.",
  targetMarket: "Hospitals, rehabilitation centers, physiotherapy clinics, and special education schools. The global VR in healthcare market is projected to reach ₹84,000+ Crores by 2030.",
  revenueModel: "SaaS licensing model for rehabilitation clinics (per-device subscription) and hardware lease options, alongside clinical-data-as-a-service analytics packages.",
  fundingStage: "Seed",
  fundingRequirement: "150000",
  teamInfo: "Vishnuprakash P (Managing Director & CEO - VR systems expert), Sandeep Nambiar P (Co-founder & Director - software engineer and VR developer), Anjana Remesh (Director - product strategist).",
  published: false,
  scorecards: {
    marketPotential: 88,
    scalability: 85,
    innovationLevel: 94,
    readiness: 90
  },
  aiGenerated: {
    overview: "Oqulix Private Limited is a pioneering software venture engineering immersive virtual reality (VR) systems tailored for critical sectors including medical rehabilitation, specialized education, and professional training. Incorporated in November 2023, the startup provides clinics with highly engaging, sensor-integrated virtual environments that gamify therapy sessions while providing analytics on biomechanical recovery metrics.",
    problemStatement: "Patients undergoing physical and cognitive therapy face challenges with motivation and consistency, leading to high clinical attrition rates. Furthermore, physiotherapists lack precise, automated tracking tools to monitor fine-grained patient movement improvements over time, relying instead on subjective observation.",
    solutionDetails: "Oqulix builds a proprietary suite of VR application software that integrates with standard head-mounted displays and motion controllers. It turns repetitive physical therapy exercises into engaging interactive games. The software tracks 3D joints, angles, and speed of motion, delivering immediate visual rewards to the patient and compiling a structured progress report for the supervising therapist.",
    marketOpportunity: "The VR in healthcare and therapeutic software market is experiencing exponential growth, driven by hospital digitization and post-pandemic demand for remote/assisted health systems. Initial addressable market targets private rehabilitation centers and specialized education academies across India and Southeast Asia.",
    businessModelDetails: "Operating as a dual SaaS and PaaS platform. Rehabilitation centers pay a monthly subscription fee per headset license to access Oqulix's therapy software library. Additionally, custom virtual training modules are developed for enterprise clients on a contract basis.",
    competitiveAdvantage: "First-mover advantage in specialized regional markets with direct collaborations alongside local medical institutions. The software uses proprietary motion analytics code designed to run smoothly on lower-cost standalone VR hardware, lowering adoption costs for clinics.",
    intendedUseOfFunds: "Funds will be allocated towards clinical validation studies, expanding the clinical games library, securing regulatory clearances, and scaling enterprise sales and installations across clinical chains.",
    investmentHighlights: [
      "Founded by a specialized team of VR and software developers registered in Kerala's tech ecosystem.",
      "94% Innovation score due to proprietary motion tracking analytics software.",
      "Addressable global VR healthcare market valued at over ₹84,000 Crores by 2030.",
      "Clinically designed modules to gamify physical therapy, increasing patient compliance by up to 60%."
    ]
  },
  screenshots: [
    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&auto=format&fit=crop&q=60"
  ]
};

export default function App() {
  const [startups, setStartups] = useState(initialStartups);
  const [newStartupData, setNewStartupData] = useState(oqulixStartup);
  const navigate = useNavigate();

  // Onboarding submission: stores the form data temporarily and goes to analysis route
  const handleOnboardingSubmit = (formData) => {
    setNewStartupData(formData);
    navigate('/founder/analyzing');
  };

  // Triggered when loader animation completes
  const handleAnalysisComplete = () => {
    const generatedResult = generateStartupProfile(newStartupData);
    
    const finalizedStartup = {
      ...newStartupData,
      id: `startup-user-${Date.now()}`,
      published: false,
      scorecards: generatedResult.scorecards,
      aiGenerated: generatedResult.aiGenerated,
      screenshots: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
      ]
    };

    setNewStartupData(finalizedStartup);
    navigate('/founder/profile');
  };

  // Saves edits made by the founder to their draft profile
  const handleSaveProfile = (updatedStartup) => {
    setNewStartupData(updatedStartup);
    
    // Also update in directory if it was already published
    setStartups(prev => 
      prev.map(item => item.id === updatedStartup.id ? updatedStartup : item)
    );
  };

  // Publishes the profile and redirects to investor view
  const handlePublishProfile = () => {
    const publishedStartup = {
      ...newStartupData,
      published: true
    };
    
    setNewStartupData(publishedStartup);

    // Save/update in local startups collection
    setStartups(prev => {
      const exists = prev.some(item => item.id === publishedStartup.id);
      if (exists) {
        return prev.map(item => item.id === publishedStartup.id ? publishedStartup : item);
      }
      return [publishedStartup, ...prev];
    });

    alert("Profile Published! Swapping you to the Investor View so you can see your profile in the directory.");
    // Route to directory page
    navigate('/investor/directory');
  };

  // Wrapper component for investor detailed profile view using URL params
  const InvestorProfileRoute = () => {
    const { id } = useParams();
    const startup = startups.find(s => s.id === id);
    
    if (!startup) {
      return (
        <div className="text-center py-16">
          <h3 className="text-xl font-bold text-slate-800 font-display">Startup Profile Not Found</h3>
          <button 
            onClick={() => navigate('/investor/directory')} 
            className="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
          >
            Back to Directory
          </button>
        </div>
      );
    }
    
    return (
      <StartupProfileView 
        startup={startup} 
        onBack={() => navigate('/investor/directory')} 
        isOwner={false}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Header handles navigation links */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6">
        
        {/* Router View Switches */}
        <Routes>
          {/* Landing Hub */}
          <Route path="/" element={<HomeHub />} />

          {/* Founder Workflow */}
          <Route 
            path="/founder/onboarding" 
            element={<FounderOnboarding onSubmitStartup={handleOnboardingSubmit} />} 
          />
          
          <Route 
            path="/founder/analyzing" 
            element={
              newStartupData ? (
                <AIAnalysisLoader 
                  startupName={newStartupData.name} 
                  industry={newStartupData.industry} 
                  onComplete={handleAnalysisComplete} 
                />
              ) : (
                <Navigate to="/founder/onboarding" replace />
              )
            } 
          />
          
          <Route 
            path="/founder/profile" 
            element={
              newStartupData ? (
                <StartupProfileView 
                  startup={newStartupData} 
                  onSave={handleSaveProfile} 
                  onPublish={handlePublishProfile} 
                  onBack={() => navigate('/')}
                  isOwner={true}
                />
              ) : (
                <Navigate to="/founder/onboarding" replace />
              )
            } 
          />

          {/* Investor Workflow */}
          <Route 
            path="/investor/directory" 
            element={
              <InvestorDirectory 
                startups={startups} 
                onSelectStartup={(s) => navigate(`/investor/profile/${s.id}`)}
                onToggleToFounder={() => navigate('/founder/onboarding')}
              />
            } 
          />
          
          <Route path="/investor/profile/:id" element={<InvestorProfileRoute />} />

          {/* Login Route */}
          <Route path="/login" element={<CompanyLogin />} />

          {/* Full Mock Profile Route */}
          <Route path="/mock" element={<FullProfileMock />} />

          {/* Paynback Profile Route */}
          <Route path="/companies/paynback" element={<PaynbackProfile />} />

          {/* Wildcard wildcard redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-6 text-center text-[11px] text-slate-500 font-semibold">
        <div>© 2026 Interlix Inc. All rights reserved. • Powered by AI Analysis</div>
      </footer>
    </div>
  );
}
