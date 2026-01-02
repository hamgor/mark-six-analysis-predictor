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
          <CartesianGrid strokeDasharray="2 2" stroke="#003B00" vertical={false} />
          <XAxis
            dataKey="number"
            stroke="#00FF41"
            fontSize={12}
            tickLine={true}
            axisLine={true}
            tick={{ fill: '#00FF41', fontFamily: 'VT323' }}
          />
          <YAxis
            stroke="#00FF41"
            fontSize={10}
            tickLine={true}
            axisLine={true}
            tick={{ fill: '#008F11', fontFamily: 'VT323' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#00FF41',
              border: 'none',
              borderRadius: '0px',
              color: '#0D0208',
              fontSize: '14px',
              fontWeight: 'bold',
              fontFamily: 'VT323',
            }}
            itemStyle={{ color: '#0D0208' }}
            cursor={{ fill: 'rgba(0, 255, 65, 0.1)' }}
          />
          <Bar dataKey="weight">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index < 3 ? '#00FF41' : '#003B00'}
                stroke="#00FF41"
                strokeWidth={1}
                // Simulating segmented LED bars with a patterned fill would be ideal, 
                // but simple solid colors work best for clarity in monochrome
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}