import React from 'react';
import { cn } from '@/lib/utils';
interface RetroCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerColor?: 'neon' | 'sapphire' | 'ice';
}
export function RetroCard({
  title,
  children,
  className,
  headerColor = 'neon'
}: RetroCardProps) {
  const borderColors = {
    neon: 'border-cyber-neon/40',
    sapphire: 'border-cyber-sapphire/40',
    ice: 'border-cyber-ice/20',
  };
  const headerGradients = {
    neon: 'from-cyber-sapphire/80 to-cyber-navy/90',
    sapphire: 'from-blue-900/80 to-cyber-navy/90',
    ice: 'from-cyber-ice/10 to-cyber-navy/90',
  };
  return (
    <div className={cn(
      "flex flex-col overflow-hidden glow-border holographic animate-float",
      borderColors[headerColor],
      className
    )}>
      {title && (
        <div className={cn(
          "px-4 py-2 border-b font-mono uppercase tracking-[0.25em] text-[10px] md:text-xs flex justify-between items-center bg-gradient-to-r",
          borderColors[headerColor],
          headerGradients[headerColor]
        )}>
          <span className="text-cyber-ice font-bold glow-text drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]">
            {title}
          </span>
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-sapphire animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-neon shadow-[0_0_10px_rgba(0,212,255,1)]" />
          </div>
        </div>
      )}
      <div className="flex-1 p-5 overflow-auto scrollbar-thin scrollbar-thumb-cyber-sapphire bg-black/20">
        {children}
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyber-neon/30 to-transparent" />
    </div>
  );
}