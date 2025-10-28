
import React from 'react';
import type { ChartDataPoint } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DataChartProps {
  data: ChartDataPoint[];
  title: string;
}

const DataChart: React.FC<DataChartProps> = ({ data, title }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
      <h3 className="text-lg font-bold text-slate-200 mb-4">{title}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                borderColor: '#475569',
                color: '#e2e8f0'
              }}
            />
            <Legend wrapperStyle={{ color: '#e2e8f0' }} />
            <Line type="monotone" dataKey="value" name="Measured" stroke="#22d3ee" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="expected" name="Expected" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataChart;
