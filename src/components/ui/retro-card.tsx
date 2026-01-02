import React from 'react';
import { cn } from '@/lib/utils';
interface RetroCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerColor?: 'neon' | 'sapphire' | 'ice'; // Kept for API compatibility, mapped to green intensities
  animate?: boolean;
}
export function RetroCard({
  title,
  children,
  className,
  headerColor = 'neon',
  animate = true
}: RetroCardProps) {
  return (
    <div className={cn(
      "flex flex-col overflow-hidden bg-matrix-dark/80 border-[4px] border-matrix-dim relative",
      "shadow-[0_0_20px_rgba(0,59,0,0.5)]",
      animate && "animate-phosphor-flicker",
      className
    )}>
      {/* Corner "Screws" */}
      <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-matrix-dim/40" />
      <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-matrix-dim/40" />
      <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-matrix-dim/40" />
      <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-matrix-dim/40" />
      {title && (
        <div className="px-4 py-2 border-b-[4px] border-matrix-dim bg-matrix-dim/20 flex justify-between items-center">
          <span className="text-matrix-green font-mono font-black uppercase tracking-[0.2em] text-xs glow-text">
            [ {title} ]
          </span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-matrix-green animate-pulse shadow-[0_0_5px_#00FF41]" />
            <div className="w-2 h-2 bg-matrix-dark border border-matrix-dim" />
          </div>
        </div>
      )}
      <div className="flex-1 p-6 overflow-auto industrial-inset bg-black/40">
        {children}
      </div>
    </div>
  );
}