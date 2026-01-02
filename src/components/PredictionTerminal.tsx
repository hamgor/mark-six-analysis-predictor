import React from 'react';
import { RefreshCw, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface PredictionTerminalProps {
  predictions: number[][];
  onRefresh: () => void;
}
export function PredictionTerminal({ predictions, onRefresh }: PredictionTerminalProps) {
  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-cf-gray-900 font-semibold">
          <LayoutGrid className="text-cf-orange w-5 h-5" />
          <span>Optimal Vector Candidates</span>
        </div>
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-2 bg-white border border-border px-4 py-2 rounded-md text-sm font-semibold text-cf-gray-700 hover:border-cf-orange hover:text-cf-orange transition-all shadow-sm active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate Sets
        </button>
      </div>
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {predictions.map((set, idx) => (
            <motion.div
              key={`${idx}-${set.join('-')}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="bg-cf-gray-50/50 p-6 rounded-xl border border-border/50 group hover:bg-white hover:border-cf-orange/30 transition-all shadow-sm"
            >
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Optimized Set #{idx + 1}</span>
                <span className="text-cf-blue opacity-0 group-hover:opacity-100 transition-opacity">78.2% Confidence</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {set.map((num) => (
                  <div
                    key={num}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-border flex items-center justify-center shadow-sm group-hover:border-cf-orange/50 transition-colors"
                  >
                    <span className="text-xl md:text-2xl font-bold text-cf-gray-900">
                      {num.toString().padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-auto pt-6 border-t border-dashed text-xs text-muted-foreground leading-relaxed italic">
        * Statistical models based on time-weighted frequency decay. These figures represent probabilistic hotspots and do not guarantee future performance.
      </div>
    </div>
  );
}