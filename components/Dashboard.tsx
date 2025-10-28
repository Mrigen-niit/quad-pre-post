import React from 'react';
import CalibrationCard from './CalibrationCard';
import type { CalibrationPhase } from '../types';
import { CalibrationPhase as CalibrationPhaseEnum } from '../types';
import { LaunchIcon, OrbitIcon, DecommissionIcon } from './icons';
import AnimatedGlobe from './AnimatedGlobe';

interface DashboardProps {
  onSelectPhase: (phase: CalibrationPhase) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectPhase }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4">
        <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-slate-100">Mission Control</h2>
        <p className="mt-2 text-lg text-slate-400">Select a calibration service to begin analysis.</p>
      </div>
      
      <AnimatedGlobe />

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <CalibrationCard
          phase={CalibrationPhaseEnum.PreLaunch}
          description="Ground-based testing and sensor verification before mission start."
          icon={<LaunchIcon className="w-12 h-12 text-cyan-400" />}
          onSelect={() => onSelectPhase(CalibrationPhaseEnum.PreLaunch)}
        />
        <CalibrationCard
          phase={CalibrationPhaseEnum.InOrbit}
          description="Ongoing monitoring and adjustment of satellite instruments in space."
          icon={<OrbitIcon className="w-12 h-12 text-cyan-400" />}
          onSelect={() => onSelectPhase(CalibrationPhaseEnum.InOrbit)}
        />
        <CalibrationCard
          phase={CalibrationPhaseEnum.PostOrbit}
          description="Final performance analysis and decommissioning procedures."
          icon={<DecommissionIcon className="w-12 h-12 text-cyan-400" />}
          onSelect={() => onSelectPhase(CalibrationPhaseEnum.PostOrbit)}
        />
      </div>
    </div>
  );
};

export default Dashboard;