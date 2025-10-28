import React from 'react';
import type { ChartDataPoint } from '../types';

interface DataTableProps {
  data: ChartDataPoint[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 overflow-x-auto">
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b border-slate-600">
            <th className="p-3 text-sm font-semibold text-slate-300">Metric</th>
            <th className="p-3 text-sm font-semibold text-slate-300 text-right">Measured Value</th>
            <th className="p-3 text-sm font-semibold text-slate-300 text-right">Expected Value</th>
            <th className="p-3 text-sm font-semibold text-slate-300 text-right">Delta</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point) => {
            const delta = point.value - point.expected;
            const deltaColor = Math.abs(delta) > (Math.abs(point.expected) * 0.05) 
              ? 'text-red-400' 
              : Math.abs(delta) > (Math.abs(point.expected) * 0.02) 
              ? 'text-yellow-400' 
              : 'text-green-400';
            
            return (
              <tr key={point.name} className="border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50">
                <td className="p-3 font-medium text-slate-200">{point.name}</td>
                <td className="p-3 text-right text-slate-200">{point.value.toFixed(2)}</td>
                <td className="p-3 text-right text-slate-400">{point.expected.toFixed(2)}</td>
                <td className={`p-3 text-right font-mono ${deltaColor}`}>{delta.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;