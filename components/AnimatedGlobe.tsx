import React from 'react';

const AnimatedGlobe: React.FC = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto my-8">
      <div className="globe"></div>
      <div className="orbit orbit-1">
        <div className="satellite"></div>
      </div>
      <div className="orbit orbit-2">
        <div className="satellite"></div>
      </div>
    </div>
  );
};

export default AnimatedGlobe;