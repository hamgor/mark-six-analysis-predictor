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
    .slice(0, 10);
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="number"
            stroke="#94A3B8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#64748B', fontWeight: 500, fontFamily: 'Inter' }}
          />
          <YAxis
            stroke="#94A3B8"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#94A3B8', fontFamily: 'Inter' }}
          />
          <Tooltip
            cursor={{ fill: '#F8FAFC' }}
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              padding: '8px 12px',
            }}
            itemStyle={{
              color: '#F38020',
              fontWeight: 700,
              fontSize: '14px',
              fontFamily: 'Inter',
            }}
            labelStyle={{
              color: '#1E293B',
              fontWeight: 600,
              marginBottom: '4px',
              fontFamily: 'Inter',
            }}
          />
          <Bar dataKey="weight" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index < 3 ? '#F38020' : '#E2E8F0'}
                className="transition-all duration-300 hover:fill-cf-blue"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}