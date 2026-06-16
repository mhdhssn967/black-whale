import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ShieldCheck, ArrowRight, Building2, Lock, Mail } from 'lucide-react';

export default function CompanyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setError('');
    setLoading(true);

    try {
      // 1. Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // 2. Fetch the corresponding profile mapping in Firestore (e.g. /auth/uid)
      const docRef = doc(db, 'auth', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().userid) {
        const companyId = docSnap.data().userid;
        sessionStorage.setItem('authenticatedUser', companyId);
        navigate(`/companies/${companyId}`);
      } else {
        // If the mapping document doesn't exist but they logged in,
        // it means their auth account is not mapped to a company profile.
        setError('No company profile mapping found for this account.');
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid Email or Password. Please check and try again.');
      } else {
        setError('An error occurred during verification: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden border border-[#e2e8f0]">
        <div className="bg-gradient-to-br from-[#0f172a] to-[#334155] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck className="w-24 h-24 text-white" />
          </div>
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center mb-4 border border-white/20 relative z-10 p-3">
            <img src="/interlixlogo.webp" alt="Interlix Logo" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight relative z-10">Partner Access</h1>
          <p className="text-sm font-semibold text-slate-300 mt-2 relative z-10">Enter your credentials to continue.</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-[#64748b] uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-[#94a3b8]" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@paynback.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-bold text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-[#64748b] uppercase tracking-wider">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-[#94a3b8]" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-bold text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-[#fef2f2] border border-[#fca5a5] rounded-xl text-[#ef4444] text-xs font-bold text-center">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-70 text-white rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center transition-colors shadow-md shadow-indigo-500/20"
            >
              {loading ? 'Verifying...' : (
                <>Access Profile <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
