import React from 'react';
import { Draw } from '@/lib/data';
import { cn } from '@/lib/utils';
interface DrawHistoryProps {
  draws: Draw[];
}
export function DrawHistory({ draws }: DrawHistoryProps) {
  return (
    <div className="space-y-1 text-xs md:text-sm">
      <div className="grid grid-cols-5 gap-2 border-b border-cyber-sapphire/40 pb-2 mb-2 font-mono text-[10px] tracking-widest text-cyber-ice/40 uppercase">
        <span>ARCHIVE_ID</span>
        <span>TIMESTAMP</span>
        <span className="col-span-2 text-right">PRIMARY_SEQ</span>
        <span className="text-right">SPECIAL</span>
      </div>
      <div className="space-y-0.5">
        {draws.map((draw) => (
          <div
            key={draw.id}
            className="grid grid-cols-5 gap-2 hover:bg-cyber-sapphire/20 transition-all duration-200 py-1.5 px-1 border-b border-cyber-sapphire/5 group"
          >
            <span className="text-cyber-ice/60 font-mono">
              {draw.id.includes('user') ? 'USER' : draw.id.split('-')[1].padStart(4, '0')}
            </span>
            <span className="text-cyber-sapphire group-hover:text-cyber-neon transition-colors">
              {draw.date.replace(/-/g, '.')}
            </span>
            <div className="col-span-2 flex justify-end gap-2.5">
              {draw.numbers.map((n) => (
                <span key={n} className="text-cyber-ice group-hover:text-white group-hover:scale-110 transition-transform font-bold w-5 text-center">
                  {n.toString().padStart(2, '0')}
                </span>
              ))}
            </div>
            <div className="flex justify-end">
              {draw.special !== undefined ? (
                <span className="text-cyber-accent font-bold w-6 h-6 border border-cyber-accent/30 flex items-center justify-center text-[10px] group-hover:bg-cyber-accent group-hover:text-cyber-navy transition-all">
                  {draw.special.toString().padStart(2, '0')}
                </span>
              ) : (
                <span className="text-cyber-ice/10">--</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}