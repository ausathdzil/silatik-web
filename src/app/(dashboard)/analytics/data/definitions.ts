export interface WeatherData {
  temp_c: number;
  precip_mm: number;
  humidity: number;
  heatindex_c: number;
  uv: number;
}

export interface RiskIndicator {
  riskLevel: number;
  indicator: string;
}

export interface WeatherInsight {
  weather: WeatherData;
  riskIndicators: RiskIndicator[];
}

export interface ActionPlan {
  objective: string;
  targetedInterventions: string[];
  timeline: string;
  resources: string[];
  monitoring: string[];
}
