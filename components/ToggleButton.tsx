import React from 'react';

interface ToggleButtonProps {
  options: string[];
  selected: string;
  onChange: (selected: string) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ options, selected, onChange }) => {
  return (
    <div className="bg-slate-700/50 rounded-lg p-1 flex items-center">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`w-full text-center px-4 py-1.5 rounded-md text-sm font-semibold transition-colors duration-300 relative
            ${selected === option 
              ? 'text-slate-900' 
              : 'text-slate-300 hover:bg-slate-600/50'
            }`}
        >
          {selected === option && (
            <span
              className="absolute inset-0 bg-cyan-400 rounded-md z-0"
            ></span>
          )}
          <span className="relative z-10">{option}</span>
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;