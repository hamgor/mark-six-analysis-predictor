import React from 'react';
import { Flame, Snowflake, Link, Target } from 'lucide-react';
import { HotColdStats, PairStats } from '@/lib/analyzer';
interface RulesSummaryProps {
  stats: HotColdStats;
  pairs: PairStats[];
  coverage: number[];
}
export function RulesSummary({ stats, pairs, coverage }: RulesSummaryProps) {
  return (
    <div className="space-y-6 font-mono text-[10px] md:text-[11px] leading-relaxed">
      <div>
        <div className="flex items-center gap-2 text-cyber-neon font-bold tracking-widest mb-3 uppercase">
          <Flame size={14} className="text-orange-500" />
          <span>P-03: HOT_ZONE_VECTORS</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stats.hot.map(s => (
            <span key={s.number} className="px-2 py-0.5 border border-cyber-neon/20 bg-cyber-neon/5 text-cyber-ice">
              {s.number.toString().padStart(2, '0')}
            </span>
          ))}
        </div>
      </div>
      <div className="h-[1px] bg-cyber-sapphire/20" />
      <div>
        <div className="flex items-center gap-2 text-cyber-ice/40 font-bold tracking-widest mb-3 uppercase">
          <Snowflake size={14} className="text-blue-300" />
          <span>P-04: COLD_LOGIC_NODES</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stats.cold.map(s => (
            <span key={s.number} className="px-2 py-0.5 border border-cyber-ice/10 text-cyber-ice/40">
              {s.number.toString().padStart(2, '0')}
            </span>
          ))}
        </div>
      </div>
      <div className="h-[1px] bg-cyber-sapphire/20" />
      <div>
        <div className="flex items-center gap-2 text-cyber-accent font-bold tracking-widest mb-3 uppercase">
          <Link size={14} />
          <span>FREQUENT_CO_VECTORS</span>
        </div>
        <div className="space-y-1">
          {pairs.map((p, idx) => (
            <div key={idx} className="flex justify-between items-center text-cyber-ice/60 border-l border-cyber-accent/30 pl-3">
              <span>{p.pair[0].toString().padStart(2, '0')} ↔ {p.pair[1].toString().padStart(2, '0')}</span>
              <span className="text-[9px] opacity-40">STRENGTH: {p.count}x</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[1px] bg-cyber-sapphire/20" />
      <div>
        <div className="flex items-center gap-2 text-cyber-ice font-bold tracking-widest mb-3 uppercase">
          <Target size={14} className="text-cyber-neon" />
          <span>75%_COVERAGE_POOL</span>
        </div>
        <p className="text-cyber-ice/40 mb-2 leading-tight">Minimum set required to account for bulk of weighted probability distribution.</p>
        <div className="text-cyber-ice break-all tracking-tighter">
          {coverage.map(n => n.toString().padStart(2, '0')).join(', ')}
        </div>
      </div>
    </div>
  );
}