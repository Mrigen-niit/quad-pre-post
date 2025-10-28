
import type { Satellite, ChartDataPoint } from './types';
import { CalibrationPhase } from './types';

export const SATELLITES: Satellite[] = [
  { id: 'sat-001', name: 'Star-Gazer Alpha', status: 'Operational' },
  { id: 'sat-002', name: 'Geo-Link 5', status: 'Operational' },
  { id: 'sat-003', name: 'Cryo-Saturn', status: 'Pre-Launch' },
  { id: 'sat-004', name: 'Orbiter-X (Legacy)', status: 'Decommissioned' },
];

export const MOCK_CHART_DATA: Record<CalibrationPhase, ChartDataPoint[]> = {
  [CalibrationPhase.PreLaunch]: [
    { name: 'Sensor A', value: 102, expected: 100 },
    { name: 'Sensor B', value: 98, expected: 100 },
    { name: 'Gyro X', value: 151, expected: 150 },
    { name: 'Gyro Y', value: 149.5, expected: 150 },
    { name: 'Thermal', value: -19.8, expected: -20 },
    { name: 'Power', value: 28.1, expected: 28 },
  ],
  [CalibrationPhase.InOrbit]: [
    { name: 'Year 1', value: 0.1, expected: 0.1 },
    { name: 'Year 2', value: 0.12, expected: 0.11 },
    { name: 'Year 3', value: 0.15, expected: 0.12 },
    { name: 'Year 4', value: 0.18, expected: 0.13 },
    { name: 'Year 5', value: 0.22, expected: 0.14 },
  ],
  [CalibrationPhase.PostOrbit]: [
    { name: 'Battery Health', value: 15, expected: 20 },
    { name: 'Solar Array', value: 45, expected: 50 },
    { name: 'Propellant', value: 5, expected: 10 },
    { name: 'Telemetry', value: 95, expected: 90 },
    { name: 'Structure', value: 80, expected: 85 },
  ]
};
