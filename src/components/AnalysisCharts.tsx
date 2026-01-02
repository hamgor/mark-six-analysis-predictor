import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
interface AnalysisChartsProps {
  weightedFrequencies: Map<number, number>;
}
export function AnalysisCharts({ weightedFrequencies }: AnalysisChartsProps) {
  const data = Array.from(weightedFrequencies.entries())
    .map(([num, freq]) => ({
      number: num,
      weight: parseFloat(freq.toFixed(2))
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 12);
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#00FF4133" vertical={false} />
          <XAxis 
            dataKey="number" 
            stroke="#00FF41" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#00FF41" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#050505', 
              border: '1px solid #00FF41',
              color: '#00FF41',
              fontSize: '12px',
              fontFamily: 'VT323'
            }}
            cursor={{ fill: 'rgba(0, 255, 65, 0.1)' }}
          />
          <Bar dataKey="weight" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index < 3 ? '#FF003C' : '#00FF41'} 
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}