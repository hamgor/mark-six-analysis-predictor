import React from 'react';
import { cn } from '@/lib/utils';
interface RetroCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerColor?: 'green' | 'pink' | 'cyan';
}
export function RetroCard({ 
  title, 
  children, 
  className, 
  headerColor = 'green' 
}: RetroCardProps) {
  const borderColors = {
    green: 'border-retro-green',
    pink: 'border-retro-pink',
    cyan: 'border-retro-cyan',
  };
  const textColors = {
    green: 'text-retro-green',
    pink: 'text-retro-pink',
    cyan: 'text-retro-cyan',
  };
  return (
    <div className={cn(
      "border-2 bg-black/80 flex flex-col overflow-hidden glow-border",
      borderColors[headerColor],
      className
    )}>
      {title && (
        <div className={cn(
          "px-4 py-1 border-b-2 font-bold uppercase tracking-widest text-sm flex justify-between items-center",
          borderColors[headerColor],
          textColors[headerColor]
        )}>
          <span>{title}</span>
          <div className="flex gap-1">
            <div className={cn("w-2 h-2 rounded-full bg-current opacity-50")} />
            <div className={cn("w-2 h-2 rounded-full bg-current opacity-50")} />
          </div>
        </div>
      )}
      <div className="flex-1 p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
}