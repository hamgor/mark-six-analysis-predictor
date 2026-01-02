import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
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
    }, 450);
    return () => clearInterval(interval);
  }, [predictions]);
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-cyber-neon">
          <ShieldCheck size={16} className="animate-pulse" />
          <span className="tracking-widest font-bold text-[10px] md:text-xs">CORE_CALCULATION_ACTIVE</span>
        </div>
        <button
          onClick={onRefresh}
          className="text-[10px] tracking-widest border border-cyber-neon/40 px-4 py-1.5 bg-cyber-neon/5 hover:bg-cyber-neon hover:text-cyber-navy hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all duration-300 uppercase font-bold"
        >
          [Execute_Recalibration]
        </button>
      </div>
      <div className="flex-1 grid grid-rows-3 gap-4">
        {predictions.map((set, idx) => (
          <div
            key={idx}
            className={`transition-all duration-500 ease-out transform ${
              idx < visibleSets ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-98'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyber-sapphire/30" />
              <div className="text-[9px] text-cyber-ice/40 tracking-tighter uppercase">DATA_SET_VECTOR_0{idx + 1}</div>
            </div>
            <div className="flex justify-between gap-2">
              {set.map((num) => (
                <div
                  key={num}
                  className="relative group flex-1 aspect-square max-w-[50px] border border-cyber-neon/20 flex items-center justify-center bg-gradient-to-br from-cyber-sapphire/10 to-transparent hover:border-cyber-neon transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-cyber-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-lg md:text-xl font-bold text-cyber-ice glow-text z-10">
                    {num.toString().padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-cyber-sapphire/20 text-[9px] text-cyber-ice/30 leading-relaxed uppercase tracking-widest font-mono">
        &gt; PROBABILISTIC_ANALYSIS: OPTIMIZED <br />
        &gt; HEURISTIC_WEIGHTING: 1.1^N COMPOUNDED <br />
        &gt; VECTOR_SLOTS: 3/3 STABILIZED
      </div>
    </div>
  );
}