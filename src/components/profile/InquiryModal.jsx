import React from 'react';
import { Mail, CheckCircle, Calendar } from 'lucide-react';

export default function InquiryModal({
  startup,
  inquiryModalOpen,
  inquirySent,
  inquiryForm,
  setInquiryForm,
  handleSendInquirySubmit,
  setInquiryModalOpen
}) {
  if (!inquiryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -right-24 -top-24 w-60 h-60 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <h3 className="text-lg font-bold text-white mb-2 font-display flex items-center space-x-2">
          <Mail className="w-5 h-5 text-cyan-400" />
          <span>Contact {startup.name}</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Send a direct investment inquiry and schedule request to the founders.
        </p>

        {inquirySent ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wide">
              Inquiry Dispatched!
            </h4>
            <p className="text-xs text-slate-400 max-w-xs">
              Your message and calendar proposal have been routed to the founders. They will be notified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendInquirySubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Inquiry Message
              </label>
              <textarea
                rows="4"
                required
                value={inquiryForm.message}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20"
              ></textarea>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Proposed Call Date (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <Calendar className="w-4 h-4" />
                </span>
                <input
                  type="date"
                  value={inquiryForm.meetingDate}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, meetingDate: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-slate-850">
              <button
                type="button"
                onClick={() => setInquiryModalOpen(false)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-600/20 hover:brightness-115 transition-all"
              >
                Send Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
