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
    neon: 'border-cyber-neon/50',
    sapphire: 'border-cyber-sapphire/50',
    ice: 'border-cyber-ice/30',
  };
  const headerGradients = {
    neon: 'from-cyber-sapphire to-cyber-navy',
    sapphire: 'from-blue-900 to-cyber-navy',
    ice: 'from-cyber-ice/20 to-cyber-navy',
  };
  return (
    <div className={cn(
      "border bg-black/40 flex flex-col overflow-hidden glow-border backdrop-blur-md animate-float",
      borderColors[headerColor],
      className
    )}>
      {title && (
        <div className={cn(
          "px-4 py-2 border-b font-mono uppercase tracking-[0.2em] text-xs flex justify-between items-center bg-gradient-to-r",
          borderColors[headerColor],
          headerGradients[headerColor]
        )}>
          <span className="text-cyber-ice font-bold drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]">{title}</span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cyber-sapphire animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-cyber-neon shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
          </div>
        </div>
      )}
      <div className="flex-1 p-4 overflow-auto scrollbar-thin scrollbar-thumb-cyber-sapphire">
        {children}
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyber-neon/20 to-transparent" />
    </div>
  );
}