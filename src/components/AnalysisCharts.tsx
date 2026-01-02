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
          <CartesianGrid strokeDasharray="3 3" stroke="#1E3A8A44" vertical={false} />
          <XAxis
            dataKey="number"
            stroke="#A5F3FC"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#A5F3FC', opacity: 0.8 }}
          />
          <YAxis
            stroke="#A5F3FC"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#A5F3FC', opacity: 0.5 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(10, 15, 43, 0.9)',
              border: '1px solid #00D4FF',
              borderRadius: '0px',
              color: '#00D4FF',
              fontSize: '12px',
              fontFamily: 'VT323',
              backdropFilter: 'blur(4px)'
            }}
            cursor={{ fill: 'rgba(0, 212, 255, 0.05)' }}
          />
          <Bar dataKey="weight" radius={[0, 0, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index < 3 ? '#00D4FF' : '#1E3A8A'}
                fillOpacity={0.8}
                stroke={index < 3 ? '#A5F3FC' : 'none'}
                strokeWidth={1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}