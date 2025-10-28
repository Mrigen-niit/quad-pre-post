import React from 'react';

const OrbitVisualizer: React.FC = () => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 aspect-[16/9] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        <style>
          {`
            @keyframes orbit-animation {
              0% {
                transform: rotate(0deg) translateX(45%) rotate(0deg) scale(1);
              }
              50% {
                transform: rotate(180deg) translateX(45%) rotate(-180deg) scale(0.8);
              }
              100% {
                transform: rotate(360deg) translateX(45%) rotate(-360deg) scale(1);
              }
            }
          `}
        </style>

        {/* Central Body (Earth) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-cyan-900 rounded-full shadow-[0_0_20px_theme(colors.cyan.500)] border-2 border-cyan-500"></div>

        {/* Orbit Path */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] border-2 border-dashed border-slate-600 rounded-[50%] rotate-[-30deg]"></div>
        
        {/* Satellite in orbit */}
        <div className="absolute top-1/2 left-1/2 w-[90%] h-[70%] rotate-[-30deg]">
          <div 
            className="absolute top-1/2 left-0 -translate-y-1/2 w-6 h-6"
            style={{ animation: 'orbit-animation 15s linear infinite' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-cyan-400 drop-shadow-[0_0_5px_theme(colors.cyan.400)]" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M5.63 16.14a9 9 0 0 0 12.72 0" />
              <path d="M2 12.48a10 10 0 0 1 20 0" />
              <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="m18 12 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="m6 12-4-4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>

        {/* Text Labels */}
        <div className="absolute top-[15%] left-[5%] text-slate-400 text-xs md:text-sm font-semibold">Perigee</div>
        <div className="absolute bottom-[15%] right-[5%] text-slate-400 text-xs md:text-sm font-semibold">Apogee</div>
        
        {/* Title */}
        <h3 className="absolute top-2 left-4 text-lg font-bold text-slate-200">Orbital Trajectory</h3>
      </div>
    </div>
  );
};

export default OrbitVisualizer;
