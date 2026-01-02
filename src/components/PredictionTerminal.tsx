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
    }, 300);
    return () => clearInterval(interval);
  }, [predictions]);
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-matrix-green">
          <Terminal size={18} className="animate-pulse" />
          <span className="tracking-[0.2em] font-black text-xs uppercase">PROCESSOR_RUNNING</span>
        </div>
        <button
          onClick={onRefresh}
          className="text-xs tracking-widest border-[3px] border-matrix-green px-6 py-2 bg-matrix-dark text-matrix-green hover:bg-matrix-green hover:text-matrix-dark active:translate-y-1 transition-all uppercase font-black shadow-[4px_4px_0px_#003B00]"
        >
          [ RE-CALIBRATE ]
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-6">
        {predictions.map((set, idx) => (
          <div
            key={idx}
            className={`transition-all duration-300 ${
              idx < visibleSets ? 'opacity-100' : 'opacity-0 translate-x-4'
            }`}
          >
            <div className="text-[10px] text-matrix-dim mb-2 uppercase tracking-[0.3em]">
              VEC_COORD_0{idx + 1}{' >>'}
            </div>
            <div className="grid grid-cols-6 gap-3">
              {set.map((num) => (
                <div
                  key={num}
                  className="bg-matrix-green/10 border-2 border-matrix-green flex items-center justify-center p-2 relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-matrix-green/20 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
                  <span className="text-2xl md:text-3xl font-black text-matrix-green glow-text z-10 leading-none">
                    {num.toString().padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t-2 border-matrix-dim/30 text-[11px] text-matrix-dim leading-relaxed uppercase tracking-[0.2em]">
        SYSTEM_STATUS: NOMINAL <br />
        HEURISTIC: TEMPORAL_1.1N <br />
        OUTPUT: 3_VECTORS_LOCKED
      </div>
    </div>
  );
}