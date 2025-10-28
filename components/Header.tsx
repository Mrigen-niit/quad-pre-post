
import React from 'react';
import { SatelliteIcon } from './icons';

interface HeaderProps {
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="flex items-center gap-3">
            <SatelliteIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold font-orbitron text-slate-100 tracking-wider">
              Satellite Calibration Hub
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
