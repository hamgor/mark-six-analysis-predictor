import React from 'react';
import { Draw } from '@/lib/data';
import { cn } from '@/lib/utils';
interface DrawHistoryProps {
  draws: Draw[];
}
export function DrawHistory({ draws }: DrawHistoryProps) {
  return (
    <div className="space-y-1 text-xs md:text-sm font-mono">
      <div className="grid grid-cols-5 gap-2 border-b-2 border-matrix-dim pb-2 mb-3 text-[10px] tracking-widest text-matrix-dim uppercase font-black">
        <span>LOG_ID</span>
        <span>DATE</span>
        <span className="col-span-2 text-right">VECTOR_SEQ</span>
        <span className="text-right">EXT</span>
      </div>
      <div className="space-y-1">
        {draws.map((draw) => (
          <div
            key={draw.id}
            className="grid grid-cols-5 gap-2 hover:bg-matrix-green hover:text-black transition-colors py-1.5 px-2 border-b border-matrix-dim/10 group"
          >
            <span className="opacity-60">
              #{draw.id.includes('user') ? 'USER' : draw.id.split('-')[1].padStart(4, '0')}
            </span>
            <span className="text-matrix-dim group-hover:text-black">
              {draw.date.replace(/-/g, '/')}
            </span>
            <div className="col-span-2 flex justify-end gap-3">
              {draw.numbers.map((n) => (
                <span key={n} className="font-black w-5 text-center">
                  {n.toString().padStart(2, '0')}
                </span>
              ))}
            </div>
            <div className="flex justify-end">
              {draw.special !== undefined ? (
                <span className="font-black bg-matrix-dim/20 px-1 border border-matrix-dim group-hover:bg-black group-hover:text-matrix-green">
                  {draw.special.toString().padStart(2, '0')}
                </span>
              ) : (
                <span className="opacity-20">XX</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}