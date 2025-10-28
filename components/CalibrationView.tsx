import React, { useState, useEffect } from 'react';
import { CalibrationPhase, type Satellite, type ChartDataPoint } from '../types';
import { SATELLITES, MOCK_CHART_DATA } from '../constants';
import DataChart from './DataChart';
import DataTable from './DataTable';
import ToggleButton from './ToggleButton';
import { AiIcon } from './icons';
import { getCalibrationAnalysis } from '../services/geminiService';
import OrbitVisualizer from './OrbitVisualizer';

interface CalibrationViewProps {
  phase: CalibrationPhase;
}

type ViewMode = 'Chart' | 'Table';

const CalibrationView: React.FC<CalibrationViewProps> = ({ phase }) => {
  const [selectedSatelliteId, setSelectedSatelliteId] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('Chart');

  const chartData: ChartDataPoint[] = MOCK_CHART_DATA[phase];

  const getChartTitle = (): string => {
    switch (phase) {
      case 'Pre-Launch': return 'Sensor Baseline Performance';
      case 'In-Orbit': return 'Instrument Drift Over Time (Degradation %)';
      case 'Post-Orbit': return 'Final Subsystem Health (%)';
      default: return 'Calibration Data';
    }
  };

  useEffect(() => {
    const relevantSat = SATELLITES.find(s => 
      (phase === 'Pre-Launch' && s.status === 'Pre-Launch') ||
      (phase === 'In-Orbit' && s.status === 'Operational') ||
      (phase === 'Post-Orbit' && s.status === 'Decommissioned')
    ) || SATELLITES[0];
    setSelectedSatelliteId(relevantSat.id);
    setAnalysis('');
    setError(null);
  }, [phase]);

  const handleGenerateAnalysis = async () => {
    const satellite = SATELLITES.find(s => s.id === selectedSatelliteId);
    if (!satellite) return;

    setIsLoading(true);
    setError(null);
    setAnalysis('');

    try {
      const result = await getCalibrationAnalysis(phase, chartData, satellite);
      setAnalysis(result);
    } catch (e) {
      setError('Failed to generate analysis. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedSatellite = SATELLITES.find(s => s.id === selectedSatelliteId);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-orbitron font-bold text-slate-100">{phase} Calibration Analysis</h2>
        <p className="mt-2 text-lg text-slate-400">Analyze performance metrics and generate AI-powered insights.</p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
        <label htmlFor="satellite-select" className="block text-sm font-medium text-slate-400 mb-2">
          Select Satellite for Analysis
        </label>
        <select
          id="satellite-select"
          value={selectedSatelliteId}
          onChange={(e) => setSelectedSatelliteId(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {SATELLITES.map(sat => (
            <option key={sat.id} value={sat.id}>
              {sat.name} ({sat.status})
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
           {phase === CalibrationPhase.InOrbit && <OrbitVisualizer />}

           <div className="flex justify-between items-center">
             <h3 className="text-xl font-bold text-slate-200">Raw Data</h3>
             <ToggleButton options={['Chart', 'Table']} selected={viewMode} onChange={(val) => setViewMode(val as ViewMode)} />
           </div>
           {viewMode === 'Chart' ? <DataChart data={chartData} title={getChartTitle()} /> : <DataTable data={chartData} />}
        </div>

        <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-lg border border-slate-700 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <AiIcon className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-bold text-slate-200">AI-Powered Analysis</h3>
          </div>
          
          <div className="flex-grow bg-slate-900/70 rounded-md p-4 overflow-y-auto min-h-[300px] prose-custom prose-sm max-w-none">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <svg className="animate-spin h-8 w-8 text-cyan-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-2 text-slate-400">Generating report...</p>
                </div>
              </div>
            )}
            {error && <p className="text-red-400">{error}</p>}
            {!isLoading && !analysis && (
              <p className="text-slate-400">Click "Generate Analysis" to get AI insights for {selectedSatellite?.name}.</p>
            )}
            {analysis && <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: analysis.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}></div>}
          </div>
          
          <button
            onClick={handleGenerateAnalysis}
            disabled={isLoading || !selectedSatelliteId}
            className="mt-4 w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-500 transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? 'Analyzing...' : 'Generate Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalibrationView;