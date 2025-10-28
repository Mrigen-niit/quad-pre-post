import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CalibrationView from './components/CalibrationView';
import type { CalibrationPhase } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<CalibrationPhase | 'dashboard'>('dashboard');

  const handleSelectPhase = (phase: CalibrationPhase) => {
    setCurrentView(phase);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen">
      <Header onBack={currentView !== 'dashboard' ? handleBackToDashboard : undefined} />
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' ? (
          <Dashboard onSelectPhase={handleSelectPhase} />
        ) : (
          <CalibrationView phase={currentView} />
        )}
      </main>
    </div>
  );
};

export default App;