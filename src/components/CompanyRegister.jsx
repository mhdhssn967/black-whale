import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Building2, ArrowRight, Mail, Lock, Briefcase } from 'lucide-react';

export default function CompanyRegister() {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Generate a clean user ID from the company name
  // e.g. "Paynback Technologies" -> "paynback-technologies"
  const generateUserId = (name) => {
    return name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')  // remove special chars
      .replace(/\s+/g, '-')           // spaces to hyphens
      .replace(/-+/g, '-')            // collapse multiple hyphens
      .replace(/^-|-$/g, '');         // trim leading/trailing hyphens
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!companyName.trim() || !email.trim() || !password) return;

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // 1. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // 2. Generate the company userid from name
      const companyId = generateUserId(companyName);

      // 3. Save auth mapping document at /auth/{uid}
      await setDoc(doc(db, 'auth', user.uid), {
        userid: companyId,
        companyName: companyName.trim(),
        email: email.trim(),
        createdAt: new Date().toISOString()
      });

      // 4. Store in session and navigate to company page
      sessionStorage.setItem('authenticatedUser', companyId);
      navigate(`/companies/${companyId}`);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please login instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address format.');
      } else {
        setError('Registration failed: ' + err.message);
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
            <Building2 className="w-24 h-24 text-white" />
          </div>
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center mb-4 border border-white/20 relative z-10 p-3">
            <img src="/interlixlogo.webp" alt="Interlix Logo" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight relative z-10">List Your Company</h1>
          <p className="text-sm font-semibold text-slate-300 mt-2 relative z-10">Register to create your company profile on Interlix.</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-[#64748b] uppercase tracking-wider">Company Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase className="w-5 h-5 text-[#94a3b8]" />
                </div>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Paynback Technologies"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-sm font-bold text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:bg-white transition-all"
                  required
                />
              </div>
              {companyName.trim() && (
                <p className="text-[10px] text-slate-400 font-semibold pl-1">
                  Your ID: <span className="text-indigo-500 font-mono">{generateUserId(companyName)}</span>
                </p>
              )}
            </div>

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
                  placeholder="founder@company.com"
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
                  minLength={6}
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
              className="w-full py-3.5 bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-70 text-white rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center transition-colors shadow-md shadow-indigo-500/20 cursor-pointer"
            >
              {loading ? 'Creating Account...' : (
                <>Register & List Company <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </button>

            <p className="text-center text-xs text-slate-500 font-semibold mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
