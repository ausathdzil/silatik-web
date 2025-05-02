export interface LarvaeByRW {
  rwId: string;
  rwName: string;
  larvaeCount: string;
}

export interface CaseDistributionByType {
  areaType: string;
  larvaeCount: number;
}

export interface AIInsight {
  insight: string;
}

export interface CaseReport {
  inspectionId: string;
  date: string;
  hour: string;
  cadreName: string;
  rtName: string;
  rwName: string;
  householdAddress: string;
  larvaeCount: string;
}
