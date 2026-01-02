import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
interface PredictionTerminalProps {
  predictions: number[][];
  onRefresh: () => void;
}
export function PredictionTerminal({ predictions, onRefresh }: PredictionTerminalProps) {
  const [visibleSets, setVisibleSets] = useState<number>(0);
  useEffect(() => {
    setVisibleSets(0);
    const interval = setInterval(() => {
      setVisibleSets(prev => (prev < predictions.length ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, [predictions]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-retro-pink">
          <Terminal size={18} />
          <span className="animate-pulse">RUNNING_SIMULATION_V4.2</span>
        </div>
        <button 
          onClick={onRefresh}
          className="text-xs border border-retro-green px-2 py-1 hover:bg-retro-green hover:text-black transition-colors"
        >
          [RE-CALCULATE]
        </button>
      </div>
      <div className="space-y-4">
        {predictions.map((set, idx) => (
          <div 
            key={idx}
            className={`transition-all duration-500 transform ${idx < visibleSets ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
          >
            <div className="text-[10px] opacity-50 mb-1">PROBABILITY_SET_0{idx + 1}</div>
            <div className="flex gap-2">
              {set.map((num) => (
                <div 
                  key={num}
                  className="w-10 h-10 border-2 border-retro-pink flex items-center justify-center text-lg font-bold glow-text bg-retro-pink/5"
                >
                  {num.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-[10px] opacity-40 leading-tight">
        * STATISTICAL PROBABILITY ENGINE ACTIVE. <br />
        * WEIGHTING APPLIED: 1.1x COMPOUND PER 5 DRAW BATCHES. <br />
        * ALL PREDICTIONS ARE BASED ON HISTORICAL FREQUENCY ANALYSIS.
      </div>
    </div>
  );
}