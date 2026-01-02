import React from 'react';
import { Activity, Zap, Cpu, Scan } from 'lucide-react';
import { HotColdStats, PairStats } from '@/lib/analyzer';
interface RulesSummaryProps {
  stats: HotColdStats;
  pairs: PairStats[];
  coverage: number[];
}
export function RulesSummary({ stats, pairs, coverage }: RulesSummaryProps) {
  return (
    <div className="space-y-6 font-mono text-[11px] leading-relaxed">
      <div>
        <div className="flex items-center gap-2 text-matrix-green font-black tracking-widest mb-3 uppercase">
          <Zap size={16} />
          <span>H_ZONE_ANALYSIS</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stats.hot.map(s => (
            <span key={s.number} className="px-3 py-1 border-2 border-matrix-green bg-matrix-green/10 text-matrix-green font-black">
              {s.number.toString().padStart(2, '0')}
            </span>
          ))}
        </div>
      </div>
      <div className="border-t-2 border-matrix-dim/20" />
      <div>
        <div className="flex items-center gap-2 text-matrix-dim font-black tracking-widest mb-3 uppercase">
          <Cpu size={16} />
          <span>C_ZONE_LOGIC</span>
        </div>
        <div className="flex flex-wrap gap-2 opacity-60">
          {stats.cold.map(s => (
            <span key={s.number} className="px-3 py-1 border-2 border-matrix-dim text-matrix-dim">
              {s.number.toString().padStart(2, '0')}
            </span>
          ))}
        </div>
      </div>
      <div className="border-t-2 border-matrix-dim/20" />
      <div>
        <div className="flex items-center gap-2 text-matrix-green font-black tracking-widest mb-3 uppercase">
          <Scan size={16} />
          <span>PAIR_CO_VECTORS</span>
        </div>
        <div className="space-y-2">
          {pairs.map((p, idx) => (
            <div key={idx} className="flex justify-between items-center text-matrix-green/80 border-l-4 border-matrix-dim pl-3">
              <span className="font-black">
                {p.pair[0].toString().padStart(2, '0')}
                {' <-> '}
                {p.pair[1].toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] bg-matrix-dim/20 px-1 font-bold">W:{p.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t-2 border-matrix-dim/20" />
      <div>
        <div className="flex items-center gap-2 text-matrix-green font-black tracking-widest mb-3 uppercase">
          <Activity size={16} />
          <span>75PCT_POOL_SNAPSHOT</span>
        </div>
        <div className="text-matrix-dim/80 text-[10px] break-all tracking-widest bg-black/40 p-2 border border-matrix-dim/30">
          {coverage.map(n => n.toString().padStart(2, '0')).join(' ')}
        </div>
      </div>
    </div>
  );
}