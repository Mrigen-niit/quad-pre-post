export enum CalibrationPhase {
  PreLaunch = 'Pre-Launch',
  InOrbit = 'In-Orbit',
  PostOrbit = 'Post-Orbit',
}

export interface Satellite {
  id: string;
  name: string;
  status: 'Operational' | 'Decommissioned' | 'Pre-Launch';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  expected: number;
}
