import React from 'react';
import { Draw } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
interface DrawHistoryProps {
  draws: Draw[];
}
export function DrawHistory({ draws }: DrawHistoryProps) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase text-muted-foreground font-semibold border-b bg-cf-gray-50/50">
            <tr>
              <th className="px-2 py-3">Date</th>
              <th className="px-2 py-3 text-center">Numbers</th>
              <th className="px-2 py-3 text-right">Ext</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {draws.map((draw) => (
              <tr key={draw.id} className="hover:bg-cf-gray-50 transition-colors">
                <td className="px-2 py-3 font-medium text-cf-gray-700">
                  {new Date(draw.date).toLocaleDateString(undefined, { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric' 
                  })}
                </td>
                <td className="px-2 py-3">
                  <div className="flex justify-center gap-1.5">
                    {draw.numbers.map((n) => (
                      <span key={n} className="w-6 text-center font-bold text-cf-gray-900">
                        {n}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-2 py-3 text-right">
                  {draw.special !== undefined ? (
                    <Badge variant="outline" className="bg-cf-orange/10 text-cf-orange border-cf-orange/20 font-bold">
                      {draw.special}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground/30">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}