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
        <div className="absolute -inset-4 rounded-full border border-indigo-250 blur-sm animate-spin duration-[15s]"></div>
        <div className="absolute -inset-8 rounded-full border border-cyan-200 blur-xs animate-spin duration-[25s] direction-reverse"></div>
        
        {/* Core AI Icon */}
        <div className="w-24 h-24 rounded-full bg-white border border-indigo-200 flex items-center justify-center shadow-xl">
          <Brain className="w-10 h-10 text-indigo-600 animate-pulse" />
        </div>
        
        {/* Scanning beam effect */}
        <div className="absolute w-28 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent top-1/2 left-4 animate-bounce duration-[2s]"></div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-slate-900 text-center mb-1 font-display">
        AI Analysis in Progress
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6 font-semibold uppercase tracking-wider">
        Analyzing <span className="text-cyan-600">{startupName}</span> • sector: <span className="text-indigo-650">{industry}</span>
      </p>

      {/* Progress Bar Container */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-8 shadow-sm">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
          <span>COMPUTATION PROGRESS</span>
          <span className="text-cyan-650 font-mono text-sm">{progress}%</span>
        </div>
        
        {/* Bar */}
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-250">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Step List Card */}
      <div className="w-full glass-panel rounded-2xl p-6 shadow-md relative overflow-hidden space-y-4">
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = idx === currentStepIndex;
          
          return (
            <div 
              key={step.id} 
              className={`flex items-start space-x-3.5 transition-all duration-300 ${
                isCompleted 
                  ? 'text-slate-700 font-medium' 
                  : isActive 
                    ? 'text-indigo-650 translate-x-1.5 font-bold' 
                    : 'text-slate-400 opacity-60'
              }`}
            >
              {/* Step indicator */}
              <div className="mt-0.5 flex-shrink-0">
                {isCompleted ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-250 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-650 stroke-[3]" />
                  </div>
                ) : isActive ? (
                  <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                    <RefreshCw className="w-2.5 h-2.5 text-indigo-600 animate-spin" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold font-mono text-slate-500">
                    {idx + 1}
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="flex-1">
                <p className={`text-xs md:text-sm font-medium ${isActive ? 'font-bold text-indigo-700' : ''}`}>
                  {step.label}
                </p>
                {isActive && (
                  <p className="text-[10px] text-slate-500 mt-0.5 italic animate-pulse">
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
        <Sparkles className="w-3.5 h-3.5 text-indigo-550" />
        <span>Standardizing profile structures using institutional VC frameworks.</span>
      </div>
    </div>
  );
}
