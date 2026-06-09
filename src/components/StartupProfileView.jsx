import React, { useState } from 'react';
import { Save, X, Sparkles } from 'lucide-react';
import { mockInvestors, calculateMatchScore } from '../data/mockInvestors';
import InvestorProfileDetail from './InvestorProfileDetail';
import ProfileHeaderBanner from './profile/ProfileHeaderBanner';
import InvestorsTab from './profile/InvestorsTab';
import ProfileMainDetails from './profile/ProfileMainDetails';
import ProfileSidebar from './profile/ProfileSidebar';
import InquiryModal from './profile/InquiryModal';

export default function StartupProfileView({ 
  startup, 
  onSave, 
  onPublish, 
  onBack, 
  isOwner = false 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...startup });
  const [newHighlight, setNewHighlight] = useState("");
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    message: `Hi ${startup.name} team, we are impressed by your investor profile on BlackWhale. We would love to schedule a brief 15-minute introductory call to learn more about your technology and market traction.`,
    meetingDate: ""
  });
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'investors'
  const [activeInvestor, setActiveInvestor] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScoreChange = (scoreKey, value) => {
    setEditForm(prev => ({
      ...prev,
      scorecards: {
        ...prev.scorecards,
        [scoreKey]: parseInt(value)
      }
    }));
  };

  const handleAiGeneratedChange = (sectionKey, value) => {
    setEditForm(prev => ({
      ...prev,
      aiGenerated: {
        ...prev.aiGenerated,
        [sectionKey]: value
      }
    }));
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setEditForm(prev => ({
        ...prev,
        aiGenerated: {
          ...prev.aiGenerated,
          investmentHighlights: [...prev.aiGenerated.investmentHighlights, newHighlight.trim()]
        }
      }));
      setNewHighlight("");
    }
  };

  const handleRemoveHighlight = (idx) => {
    setEditForm(prev => ({
      ...prev,
      aiGenerated: {
        ...prev.aiGenerated,
        investmentHighlights: prev.aiGenerated.investmentHighlights.filter((_, i) => i !== idx)
      }
    }));
  };

  const handleSave = () => {
    onSave(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...startup });
    setIsEditing(false);
  };

  const handleSendInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquiryModalOpen(false);
      setInquirySent(false);
    }, 2500);
  };

  if (activeInvestor) {
    return (
      <div className="w-full max-w-7xl mx-auto py-6 px-4 md:px-0">
        <InvestorProfileDetail 
          investor={activeInvestor} 
          startupContext={startup} 
          matchScore={calculateMatchScore(startup, activeInvestor)} 
          onBack={() => setActiveInvestor(null)} 
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 md:px-0">
      
      <ProfileHeaderBanner
        startup={startup}
        editForm={editForm}
        isEditing={isEditing}
        isOwner={isOwner}
        onBack={onBack}
        setIsEditing={setIsEditing}
        onPublish={onPublish}
        handleInputChange={handleInputChange}
        setInquiryModalOpen={setInquiryModalOpen}
      />

      {/* Tab Selector for Founders */}
      {isOwner && (
        <div className="flex border border-slate-200 mb-6 bg-slate-100 p-1.5 rounded-xl self-start space-x-2 shadow-inner max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg text-xs font-black transition-all uppercase tracking-wider ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-605 hover:text-slate-900'
            }`}
          >
            Company Profile Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('investors')}
            className={`px-4 py-2 rounded-lg text-xs font-black transition-all flex items-center space-x-1.5 uppercase tracking-wider ${
              activeTab === 'investors'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-sm'
                : 'text-slate-605 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
            <span>Suggested Investors ({mockInvestors.length})</span>
          </button>
        </div>
      )}

      {/* Conditional Rendering of Tabs */}
      {activeTab === 'investors' ? (
        <InvestorsTab startup={startup} setActiveInvestor={setActiveInvestor} />
      ) : (
        /* Two Column Layout: Main Details (Left) + Sidebar (Right) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProfileMainDetails
            startup={startup}
            editForm={editForm}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleAiGeneratedChange={handleAiGeneratedChange}
          />
          <ProfileSidebar
            startup={startup}
            editForm={editForm}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleScoreChange={handleScoreChange}
            handleAiGeneratedChange={handleAiGeneratedChange}
            handleAddHighlight={handleAddHighlight}
            handleRemoveHighlight={handleRemoveHighlight}
            newHighlight={newHighlight}
            setNewHighlight={setNewHighlight}
          />
        </div>
      )}

      {/* Editing Float Controls */}
      {isEditing && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-white border border-indigo-200 px-4 py-3 rounded-xl shadow-2xl">
          <button
            onClick={handleCancel}
            className="flex items-center space-x-1 px-3.5 py-2 hover:bg-slate-100 text-slate-705 border border-slate-200 text-xs font-bold rounded-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
          
          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:brightness-105 text-white text-xs font-extrabold rounded-lg shadow-md transition-all"
          >
            <Save className="w-3.5 h-3.5 text-cyan-200" />
            <span>Save Profile</span>
          </button>
        </div>
      )}

      <InquiryModal
        startup={startup}
        inquiryModalOpen={inquiryModalOpen}
        inquirySent={inquirySent}
        inquiryForm={inquiryForm}
        setInquiryForm={setInquiryForm}
        handleSendInquirySubmit={handleSendInquirySubmit}
        setInquiryModalOpen={setInquiryModalOpen}
      />
    </div>
  );
}
