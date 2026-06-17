import React, { useState, useEffect } from 'react';
import { X, Check, Code, User, AlertTriangle, Layers, UploadCloud, FileText, Plus, Trash2, Download } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const JsonNode = ({ label, data, onChange, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isUploading, setIsUploading] = useState(false);
  const [localNum, setLocalNum] = useState(typeof data === 'number' ? data.toString() : '');

  useEffect(() => {
    if (typeof data === 'number') {
      const numLocal = Number(localNum);
      if (numLocal !== data && localNum !== '-' && !localNum.toString().endsWith('.')) {
        setLocalNum(data.toString());
      }
    }
  }, [data]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `uploads/paynback/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      onChange(downloadURL);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const isPossibleFileField = typeof data === 'string' && (label === 'logo' || label === 'url' || label === 'image' || label === 'cover' || label === 'termSheet' || label === 'document' || label === 'file');

  if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
    return (
      <div className="mb-3 w-full">
        {label && <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">{label}</label>}
        {typeof data === 'string' && data.length > 50 && !isPossibleFileField ? (
          <textarea 
            value={data} 
            onChange={e => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-y"
          />
        ) : (
          <div className="flex gap-2 items-center">
            <input 
              type={typeof data === 'number' ? 'number' : typeof data === 'boolean' ? 'checkbox' : 'text'}
              checked={typeof data === 'boolean' ? data : undefined}
              value={typeof data === 'boolean' ? undefined : (typeof data === 'number' ? localNum : data)} 
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) => {
                if (typeof data === 'number' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                  e.preventDefault();
                }
              }}
              onChange={e => {
                if (typeof data === 'number') {
                  setLocalNum(e.target.value);
                  const parsed = parseFloat(e.target.value);
                  if (!isNaN(parsed)) {
                    onChange(parsed);
                  } else if (e.target.value === '') {
                    onChange(0);
                  }
                } else if (typeof data === 'boolean') {
                  onChange(e.target.checked);
                } else {
                  onChange(e.target.value);
                }
              }}
              className={`w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${typeof data === 'boolean' ? 'w-5 h-5 accent-indigo-600' : ''}`}
            />
            {isPossibleFileField && (
              <label className="flex-shrink-0 cursor-pointer bg-[#e0e7ff] text-[#4f46e5] hover:bg-[#c7d2fe] px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors relative flex items-center justify-center min-w-[100px]">
                {isUploading ? (
                  <span className="animate-pulse">Uploading...</span>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4 mr-1.5" /> Upload
                  </>
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
        )}
      </div>
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="mb-4 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm w-full">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-xs font-black text-slate-700 uppercase tracking-wider hover:bg-slate-100 transition-colors border-b border-transparent">
          <span className="flex items-center">
            {label} 
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full ml-3 text-[10px] shadow-sm">{data.length} Items</span>
          </span>
          <span className="text-slate-400">{isOpen ? '▼' : '▶'}</span>
        </button>
        {isOpen && (
          <div className="p-4 space-y-4 bg-slate-50/50 border-t border-slate-200">
            {data.map((item, idx) => (
              <div key={idx} className="p-4 pt-5 border border-slate-200 rounded-xl bg-white relative shadow-sm">
                <span className="absolute -top-2.5 left-4 bg-indigo-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md">Item {idx + 1}</span>
                <div>
                  <JsonNode label="" data={item} onChange={(val) => {
                    const newData = [...data];
                    newData[idx] = val;
                    onChange(newData);
                  }} defaultOpen={true} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (typeof data === 'object' && data !== null) {
    const objectContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
        {Object.keys(data).map(key => (
          <div key={key} className={typeof data[key] === 'object' ? 'col-span-1 md:col-span-2' : ''}>
             <JsonNode label={key} data={data[key]} onChange={(val) => {
               onChange({ ...data, [key]: val });
             }} />
          </div>
        ))}
      </div>
    );

    if (!label) return objectContent;

    return (
      <div className="mb-4 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm w-full">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-3 bg-slate-100 flex items-center justify-between text-xs font-black text-slate-800 uppercase tracking-wider hover:bg-slate-200 transition-colors">
          <span>{label}</span>
          <span className="text-slate-500">{isOpen ? '▼' : '▶'}</span>
        </button>
        {isOpen && (
          <div className="p-4 bg-white border-t border-slate-200">
            {objectContent}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default function ProfileEditorModal({ data, onSave, onClose }) {
  const [activeTab, setActiveTab] = useState('advanced');
  const [advancedData, setAdvancedData] = useState(data);
  const [jsonInput, setJsonInput] = useState(JSON.stringify(data, null, 2));
  const [error, setError] = useState('');

  const [uploadingTermSheet, setUploadingTermSheet] = useState(false);
  const [uploadingDocIndex, setUploadingDocIndex] = useState(null);

  const uploadFileToStorage = async (file, pathPrefix = 'documents') => {
    const storageRef = ref(storage, `uploads/${pathPrefix}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleTermSheetChange = (url) => {
    setAdvancedData(prev => {
      const company = prev.company || {};
      const investment = company.investment || {};
      return {
        ...prev,
        company: {
          ...company,
          investment: {
            ...investment,
            termSheet: url
          }
        }
      };
    });
  };

  const handleDocumentsChange = (newDocs) => {
    setAdvancedData(prev => {
      const company = prev.company || {};
      return {
        ...prev,
        company: {
          ...company,
          documents: newDocs
        }
      };
    });
  };

  const handleSave = () => {
    if (activeTab === 'raw') {
      try {
        const parsed = JSON.parse(jsonInput);
        onSave(parsed);
      } catch (err) {
        setError(err.message);
      }
    } else {
      onSave(advancedData);
    }
  };

  const handleInputChange = (field, value) => {
    setAdvancedData(prev => ({ ...prev, company: { ...prev.company, [field]: value } }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-md p-4">
      <div className="bg-[#f8fafc] rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0] bg-white">
          <div>
            <h2 className="text-xl font-black text-[#0f172a] uppercase tracking-tight">Data Editor</h2>
            <p className="text-xs text-[#64748b] font-medium mt-0.5">Modify every piece of content dynamically.</p>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-[#f1f5f9] rounded-xl transition-colors">
            <X className="w-5 h-5 text-[#475569]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 pt-5 pb-2">
            <div className="flex gap-2 p-1.5 bg-[#e2e8f0] rounded-xl w-max shadow-inner">
              <button 
                onClick={() => { setActiveTab('basic'); setError(''); }} 
                className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center ${activeTab === 'basic' ? 'bg-white text-[#4f46e5] shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'}`}
              >
                <User className="w-4 h-4 mr-2" /> Basic Info
              </button>
              <button 
                onClick={() => { setActiveTab('documents'); setError(''); }} 
                className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center ${activeTab === 'documents' ? 'bg-white text-[#4f46e5] shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'}`}
              >
                <FileText className="w-4 h-4 mr-2" /> Pitch & Documents
              </button>
              <button 
                onClick={() => {
                  setActiveTab('advanced');
                  setError('');
                }} 
                className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center ${activeTab === 'advanced' ? 'bg-white text-[#4f46e5] shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'}`}
              >
                <Layers className="w-4 h-4 mr-2" /> Visual Editor
              </button>
              <button 
                onClick={() => {
                  setJsonInput(JSON.stringify(advancedData, null, 2));
                  setActiveTab('raw');
                }} 
                className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center ${activeTab === 'raw' ? 'bg-white text-[#4f46e5] shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'}`}
              >
                <Code className="w-4 h-4 mr-2" /> Raw Code
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-[#475569] uppercase tracking-wider">Company Name</label>
                    <input value={advancedData.company?.name || ''} onChange={e => handleInputChange('name', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-[#475569] uppercase tracking-wider">Company ID</label>
                    <input value={advancedData.company?.id || ''} onChange={e => handleInputChange('id', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-[#475569] uppercase tracking-wider">Industry</label>
                    <input value={advancedData.company?.industry || ''} onChange={e => handleInputChange('industry', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-[#475569] uppercase tracking-wider">Stage</label>
                    <input value={advancedData.company?.stage || ''} onChange={e => handleInputChange('stage', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-[#475569] uppercase tracking-wider">Founded Year</label>
                    <input value={advancedData.company?.founded || ''} onChange={e => handleInputChange('founded', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-[#475569] uppercase tracking-wider">Location (HQ)</label>
                    <input value={advancedData.company?.hq || ''} onChange={e => handleInputChange('hq', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all shadow-sm" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-[#475569] uppercase tracking-wider">Tagline</label>
                  <input value={advancedData.company?.tagline || ''} onChange={e => handleInputChange('tagline', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all shadow-sm" />
                </div>

                <div className="bg-[#e0e7ff] border border-[#c7d2fe] p-4 rounded-xl flex items-start gap-3 mt-4">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-[#6366f1] mt-0.5" />
                  <p className="text-sm font-medium text-[#3730a3]">
                    To edit complex structures like the Timeline Charts, Global Expansion Map coordinates, Photo Gallery, AI Summary text, or Team Members, switch to the <strong>Visual Editor</strong> tab.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6 pb-6">
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#0f172a] uppercase tracking-tight">Company Documents Vault</h3>
                      <p className="text-xs text-[#64748b] font-medium mt-0.5">Upload important files like Pitch Deck, Term Sheet, and compliance reports for potential investors.</p>
                    </div>
                  </div>

                  <div className="border-t border-[#f1f5f9] pt-6 space-y-6">
                    {/* Term Sheet Section */}
                    <div>
                      <h4 className="text-xs font-black text-[#475569] uppercase tracking-wider mb-3">Draft Term Sheet</h4>
                      <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-100 text-[#4f46e5] rounded-lg">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-[#0f172a] truncate">Draft Term Sheet Document</p>
                            {advancedData.company?.investment?.termSheet ? (
                              <a 
                                href={advancedData.company.investment.termSheet} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-[11px] font-semibold text-[#6366f1] hover:underline break-all block mt-0.5"
                              >
                                View Current Document
                              </a>
                            ) : (
                              <p className="text-[11px] font-medium text-[#64748b] mt-0.5">No term sheet uploaded yet.</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {uploadingTermSheet ? (
                            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
                              <span className="animate-pulse">Uploading...</span>
                            </div>
                          ) : (
                            <>
                              <label className="cursor-pointer bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center shadow-sm">
                                <UploadCloud className="w-4 h-4 mr-1.5" /> Upload File
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    setUploadingTermSheet(true);
                                    try {
                                      const url = await uploadFileToStorage(file, 'termsheets');
                                      handleTermSheetChange(url);
                                    } catch (err) {
                                      alert("Failed to upload: " + err.message);
                                    } finally {
                                      setUploadingTermSheet(false);
                                    }
                                  }}
                                />
                              </label>
                              {advancedData.company?.investment?.termSheet && (
                                <button 
                                  onClick={() => handleTermSheetChange('')} 
                                  className="px-4 py-2.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Other Vault Documents Section */}
                    <div className="border-t border-[#f1f5f9] pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-[#475569] uppercase tracking-wider">Pitch Deck & Additional Documents</h4>
                        <button 
                          onClick={() => {
                            const currentDocs = advancedData.company?.documents || [];
                            handleDocumentsChange([...currentDocs, { title: 'New Document', document: '' }]);
                          }}
                          className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Document
                        </button>
                      </div>

                      <div className="space-y-4">
                        {(advancedData.company?.documents || []).length === 0 ? (
                          <div className="text-center py-8 border border-dashed border-[#cbd5e1] rounded-2xl bg-slate-50/50">
                            <FileText className="w-8 h-8 text-[#94a3b8] mx-auto mb-2" />
                            <p className="text-xs font-bold text-[#64748b]">No additional documents yet.</p>
                            <p className="text-[10px] text-[#94a3b8] font-medium mt-0.5">Click "Add Document" to start building your vault.</p>
                          </div>
                        ) : (
                          (advancedData.company.documents).map((docObj, idx) => (
                            <div key={idx} className="p-4 bg-white border border-[#e2e8f0] rounded-xl shadow-sm space-y-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1 space-y-1.5">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Document Title</label>
                                  <input 
                                    type="text" 
                                    value={docObj.title || ''} 
                                    placeholder="e.g. Pitch Deck, Financial Plan"
                                    onChange={(e) => {
                                      const newDocs = [...(advancedData.company.documents || [])];
                                      newDocs[idx] = { ...newDocs[idx], title: e.target.value };
                                      handleDocumentsChange(newDocs);
                                    }} 
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 animate-none" 
                                  />
                                </div>

                                <div className="flex items-end gap-2 self-stretch md:self-auto justify-end shrink-0">
                                  <div className="flex-1 md:flex-none">
                                    {uploadingDocIndex === idx ? (
                                      <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm min-w-[120px]">
                                        <span className="animate-pulse">Uploading...</span>
                                      </div>
                                    ) : (
                                      <label className="cursor-pointer bg-[#e0e7ff] text-[#4f46e5] hover:bg-[#c7d2fe] px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center min-w-[120px]">
                                        <UploadCloud className="w-4 h-4 mr-1.5" /> {docObj.document ? 'Re-upload' : 'Upload'}
                                        <input 
                                          type="file" 
                                          className="hidden" 
                                          onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;
                                            setUploadingDocIndex(idx);
                                            try {
                                              const url = await uploadFileToStorage(file, 'documents');
                                              const newDocs = [...(advancedData.company.documents || [])];
                                              newDocs[idx] = { ...newDocs[idx], document: url };
                                              handleDocumentsChange(newDocs);
                                            } catch (err) {
                                              alert("Failed to upload: " + err.message);
                                            } finally {
                                              setUploadingDocIndex(null);
                                            }
                                          }}
                                        />
                                      </label>
                                    )}
                                  </div>

                                  <button 
                                    onClick={() => {
                                      const newDocs = (advancedData.company.documents || []).filter((_, i) => i !== idx);
                                      handleDocumentsChange(newDocs);
                                    }}
                                    className="px-4 py-2.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {docObj.document && (
                                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs font-medium text-[#475569]">
                                  <span className="truncate max-w-[80%] break-all">Link: <a href={docObj.document} target="_blank" rel="noreferrer" className="text-[#6366f1] hover:underline font-semibold">{docObj.document}</a></span>
                                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ml-2">Active Link</span>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">Root Objects & Collections</p>
                {Object.keys(advancedData)
                  .sort((a, b) => {
                    const order = ['company', 'overview', 'photos', 'revenue', 'users', 'segments', 'recovery', 'growth', 'locations'];
                    const idxA = order.indexOf(a);
                    const idxB = order.indexOf(b);
                    if (idxA === -1 && idxB === -1) return 0;
                    if (idxA === -1) return 1;
                    if (idxB === -1) return -1;
                    return idxA - idxB;
                  })
                  .map(key => (
                  <JsonNode 
                    key={key} 
                    label={key} 
                    data={advancedData[key]} 
                    onChange={(val) => setAdvancedData({ ...advancedData, [key]: val })} 
                  />
                ))}
              </div>
            )}

            {activeTab === 'raw' && (
              <div className="h-full flex flex-col space-y-3">
                <div className="flex-1 w-full min-h-[400px]">
                  <textarea
                    value={jsonInput || ''}
                    onChange={(e) => { setJsonInput(e.target.value); setError(''); }}
                    className="w-full h-full p-4 bg-white border border-[#cbd5e1] text-[#0f172a] font-mono text-xs leading-relaxed rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none block"
                    spellCheck="false"
                  />
                </div>
                {error && <p className="text-[#ef4444] text-xs font-bold px-2">JSON Parse Error: {error}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e2e8f0] bg-white flex justify-end gap-3 rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2.5 text-[#64748b] font-bold text-xs uppercase tracking-wider hover:bg-[#f1f5f9] rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-5 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center">
            <Check className="w-4 h-4 mr-2" /> Save Configuration
          </button>
        </div>

      </div>
    </div>
  );
}
