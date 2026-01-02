import React from 'react';
import { Draw } from '@/lib/data';
interface DrawHistoryProps {
  draws: Draw[];
}
export function DrawHistory({ draws }: DrawHistoryProps) {
  return (
    <div className="space-y-2 text-xs md:text-sm">
      <div className="grid grid-cols-4 gap-2 border-b border-retro-green/30 pb-1 font-bold opacity-70">
        <span>DRAW_ID</span>
        <span>DATE_STAMP</span>
        <span className="col-span-2">NUM_SEQUENCE</span>
      </div>
      {draws.map((draw) => (
        <div 
          key={draw.id} 
          className="grid grid-cols-4 gap-2 hover:bg-retro-green/10 transition-colors py-1 group"
        >
          <span className="text-retro-cyan">#{draw.id.split('-')[1].padStart(3, '0')}</span>
          <span className="opacity-80">{draw.date}</span>
          <div className="col-span-2 flex gap-2">
            {draw.numbers.map((n) => (
              <span key={n} className="group-hover:text-white transition-colors">
                {n.toString().padStart(2, '0')}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}