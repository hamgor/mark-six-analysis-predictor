import React from 'react';
import { TrendingUp, TrendingDown, Users, Target } from 'lucide-react';
import { HotColdStats, PairStats } from '@/lib/analyzer';
import { Badge } from '@/components/ui/badge';
interface RulesSummaryProps {
  stats: HotColdStats;
  pairs: PairStats[];
  coverage: number[];
}
export function RulesSummary({ stats, pairs, coverage }: RulesSummaryProps) {
  return (
    <div className="space-y-6 text-sm">
      <div>
        <div className="flex items-center gap-2 text-cf-gray-900 font-bold mb-3">
          <TrendingUp size={16} className="text-cf-orange" />
          <span>Trending High (Hot)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stats.hot.map(s => (
            <Badge key={s.number} className="bg-cf-orange/10 text-cf-orange border-cf-orange/20 hover:bg-cf-orange hover:text-white transition-colors">
              {s.number.toString().padStart(2, '0')}
            </Badge>
          ))}
        </div>
      </div>
      <div className="border-t border-border" />
      <div>
        <div className="flex items-center gap-2 text-cf-gray-900 font-bold mb-3">
          <TrendingDown size={16} className="text-cf-blue" />
          <span>Dormant Values (Cold)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stats.cold.map(s => (
            <Badge key={s.number} variant="outline" className="text-muted-foreground bg-slate-50 border-slate-200">
              {s.number.toString().padStart(2, '0')}
            </Badge>
          ))}
        </div>
      </div>
      <div className="border-t border-border" />
      <div>
        <div className="flex items-center gap-2 text-cf-gray-900 font-bold mb-3">
          <Users size={16} className="text-cf-blue" />
          <span>Frequent Co-Occurrences</span>
        </div>
        <div className="grid gap-2">
          {pairs.map((p, idx) => (
            <div key={idx} className="flex justify-between items-center bg-slate-50/50 p-2 rounded-md border border-slate-100">
              <span className="font-bold text-cf-gray-700">
                {p.pair[0].toString().padStart(2, '0')}
                <span className="mx-2 text-muted-foreground/50">↔</span>
                {p.pair[1].toString().padStart(2, '0')}
              </span>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {p.count} Hits
              </Badge>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border" />
      <div>
        <div className="flex items-center gap-2 text-cf-gray-900 font-bold mb-3">
          <Target size={16} className="text-cf-orange" />
          <span>75% Probability Coverage</span>
        </div>
        <div className="bg-cf-gray-50/50 p-3 rounded-md border border-border text-[11px] font-mono leading-relaxed text-muted-foreground break-all">
          {coverage.map(n => n.toString().padStart(2, '0')).join(' ')}
        </div>
      </div>
    </div>
  );
}