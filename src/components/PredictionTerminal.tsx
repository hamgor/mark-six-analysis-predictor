import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck } from 'lucide-react';
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
    }, 600);
    return () => clearInterval(interval);
  }, [predictions]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-cyber-neon">
          <ShieldCheck size={18} className="animate-pulse" />
          <span className="tracking-widest font-bold">CORE_CALCULATION_ACTIVE</span>
        </div>
        <button
          onClick={onRefresh}
          className="text-[10px] tracking-widest border border-cyber-neon/40 px-3 py-1 bg-cyber-neon/5 hover:bg-cyber-neon hover:text-cyber-navy transition-all duration-300 uppercase"
        >
          [Execute_Recalibration]
        </button>
      </div>
      <div className="space-y-5">
        {predictions.map((set, idx) => (
          <div
            key={idx}
            className={`transition-all duration-700 ease-out transform ${idx < visibleSets ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyber-sapphire/50" />
              <div className="text-[10px] text-cyber-ice/50 tracking-tighter">DATA_SET_VECTOR_0{idx + 1}</div>
            </div>
            <div className="flex gap-3">
              {set.map((num) => (
                <div
                  key={num}
                  className="relative group w-11 h-11 border border-cyber-neon/30 flex items-center justify-center bg-gradient-to-br from-cyber-sapphire/20 to-transparent hover:border-cyber-neon transition-colors"
                >
                  <div className="absolute inset-0 bg-cyber-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-xl font-bold text-cyber-ice glow-text z-10">
                    {num.toString().padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-4 border-t border-cyber-sapphire/30 text-[9px] text-cyber-ice/40 leading-relaxed uppercase tracking-widest">
        &gt; PROBABILISTIC_ANALYSIS: COMPLETE <br />
        &gt; HEURISTIC_WEIGHTING: 1.1^N APPLIED <br />
        &gt; SECURITY_LAYER: ENCRYPTED_LUXURY_NODE
      </div>
    </div>
  );
}