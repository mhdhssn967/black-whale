import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Check, RefreshCw } from 'lucide-react';
import { getAnalysisSteps } from '../utils/aiGenerator';

export default function AIAnalysisLoader({ startupName, industry, onComplete }) {
  const steps = getAnalysisSteps(startupName, industry);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    // Total duration for each step (in ms)
    const stepDuration = 1800;
    
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        // Complete current step
        setCompletedSteps(prev => [...prev, steps[currentStepIndex].id]);
        
        // Advance to next step
        const nextIndex = currentStepIndex + 1;
        setCurrentStepIndex(nextIndex);
        
        // Calculate progress percentage
        const nextProgress = Math.min(100, Math.round((nextIndex / steps.length) * 100));
        setProgress(nextProgress);
      } else {
        // All steps completed, trigger callback
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, stepDuration);

    // Initial tick to update progress bar smoothly
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const targetProgress = Math.round((currentStepIndex / steps.length) * 100);
        if (prev < targetProgress) {
          return Math.min(targetProgress, prev + 1);
        }
        return prev;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [currentStepIndex, steps.length, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 md:px-0 flex flex-col items-center">
      {/* Neural Network Scanner Sphere */}
      <div className="relative w-36 h-36 mb-10 flex items-center justify-center">
        {/* Pulsing outer glow circles */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 animate-ping"></div>
        <div className="absolute inset-2 rounded-full bg-cyan-500/10 animate-pulse duration-1000"></div>
        <div className="absolute -inset-4 rounded-full border border-indigo-500/20 blur-sm animate-spin duration-[15s]"></div>
        <div className="absolute -inset-8 rounded-full border border-cyan-500/10 blur-xs animate-spin duration-[25s] direction-reverse"></div>
        
        {/* Core AI Icon */}
        <div className="w-24 h-24 rounded-full bg-slate-900 border border-indigo-500/40 flex items-center justify-center shadow-2xl shadow-indigo-500/30 glow-indigo">
          <Brain className="w-10 h-10 text-indigo-400 animate-pulse" />
        </div>
        
        {/* Scanning beam effect */}
        <div className="absolute w-28 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-1/2 left-4 animate-bounce duration-[2s]"></div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white text-center mb-1 font-display">
        AI Analysis in Progress
      </h3>
      <p className="text-xs text-slate-400 text-center mb-6 font-semibold uppercase tracking-wider">
        Analyzing <span className="text-cyan-400">{startupName}</span> • sector: <span className="text-indigo-400">{industry}</span>
      </p>

      {/* Progress Bar Container */}
      <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-8">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
          <span>COMPUTATION PROGRESS</span>
          <span className="text-cyan-400 font-mono text-sm">{progress}%</span>
        </div>
        
        {/* Bar */}
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Step List Card */}
      <div className="w-full glass-panel rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4">
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = idx === currentStepIndex;
          
          return (
            <div 
              key={step.id} 
              className={`flex items-start space-x-3.5 transition-all duration-300 ${
                isCompleted 
                  ? 'text-slate-300' 
                  : isActive 
                    ? 'text-white translate-x-1.5' 
                    : 'text-slate-500 opacity-60'
              }`}
            >
              {/* Step indicator */}
              <div className="mt-0.5 flex-shrink-0">
                {isCompleted ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                  </div>
                ) : isActive ? (
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center">
                    <RefreshCw className="w-2.5 h-2.5 text-indigo-400 animate-spin" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-[10px] font-bold font-mono">
                    {idx + 1}
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="flex-1">
                <p className={`text-xs md:text-sm font-medium ${isActive ? 'font-semibold text-indigo-300' : ''}`}>
                  {step.label}
                </p>
                {isActive && (
                  <p className="text-[10px] text-slate-400 mt-0.5 italic animate-pulse">
                    Synthesizing raw inputs and scoring risk engines...
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom disclaimer */}
      <div className="mt-6 flex items-center space-x-1.5 text-[11px] text-slate-500 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-indigo-500/70" />
        <span>Standardizing profile structures using institutional VC frameworks.</span>
      </div>
    </div>
  );
}
