import React from 'react';
import type { CalibrationPhase, Satellite } from '../types';
import { ArrowRightIcon } from './icons';

interface CalibrationCardProps {
  phase: CalibrationPhase;
  description: string;
  icon: React.ReactNode;
  onSelect: () => void;
  status: Satellite['status'];
}

const CalibrationCard: React.FC<CalibrationCardProps> = ({ phase, description, icon, onSelect, status }) => {
  const statusStyles: Record<Satellite['status'], string> = {
    'Operational': 'bg-green-500/20 text-green-400 border-green-500/50',
    'Pre-Launch': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    'Decommissioned': 'bg-red-500/20 text-red-400 border-red-500/50',
  };
  
  return (
    <div 
      onClick={onSelect}
      className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 cursor-pointer 
                 hover:border-cyan-400/80 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 group
                 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-orbitron font-bold text-slate-100">{phase}</h3>
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border whitespace-nowrap ${statusStyles[status]}`}>
            {status}
          </span>
        </div>
        <p className="text-slate-400 flex-grow">{description}</p>
        <div className="mt-4 text-cyan-400 flex items-center gap-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Launch Service <ArrowRightIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default CalibrationCard;