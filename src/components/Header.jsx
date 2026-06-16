import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Brand Logo - Links to Home Hub */}
      <Link 
        to="/" 
        className="flex items-center space-x-3 group cursor-pointer no-underline select-none"
      >
        <div className="relative flex items-center justify-center w-10 h-10 group-hover:scale-105 transition-transform duration-300">
          <img src="/interlixlogo.webp" alt="Interlix" className="w-full h-full object-contain drop-shadow-sm" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight font-display bg-gradient-to-r from-indigo-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent m-0 leading-none">
            Interlix
          </h1>
          <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase m-0 leading-none mt-1">
            Investor Platform
          </p>
        </div>
      </Link>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-100 border border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </header>
  );
}
