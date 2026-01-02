import React from 'react';
import { cn } from '@/lib/utils';
interface RetroCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}
export function RetroCard({
  title,
  children,
  className,
}: RetroCardProps) {
  return (
    <div className={cn(
      "group relative flex flex-col overflow-hidden bg-card border border-border rounded-lg",
      "shadow-sm transition-all duration-200 hover:shadow-md",
      "before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-cf-orange before:opacity-0 hover:before:opacity-100 before:transition-opacity",
      className
    )}>
      {title && (
        <div className="px-6 py-4 border-b border-border bg-cf-gray-50/50 flex justify-between items-center">
          <span className="text-cf-gray-900 font-semibold text-sm tracking-tight">
            {title}
          </span>
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-1.5 h-1.5 rounded-full bg-cf-orange/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-cf-orange/20" />
          </div>
        </div>
      )}
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
}