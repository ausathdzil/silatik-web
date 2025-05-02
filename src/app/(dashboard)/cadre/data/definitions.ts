export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: 'cadre' | 'admin' | 'coordinator';
  contactInfo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Cadre {
  cadreId: string;
  cadreName: string;
}

export interface InspectionDetail {
  inspectionDetailId: string;
  inspectionId: string;
  checklistItemKey: string;
  hasLarvae: boolean;
  customLocationName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Inspection {
  inspectionId: string;
  householdId: string;
  inspectionDate: string;
  status: 'completed' | 'scheduled';
  dbdCaseFound: boolean;
  needsBansos: boolean;
  isReviewed: boolean;
  reviewNotes: string | null;
  reviewedByUserId: string | null;
  lastUpdatedByUserId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Household {
  householdId: string;
  rtId: string;
  fullAddress: string;
  houseOwnerName: string;
  housePhotoKey: string;
  latitude: string;
  longitude: string;
  intensity: string;
  createdAt: string;
  updatedAt: string;
}

export interface RT {
  rtId: string;
  rtName: string;
  riskLevel: number;
  totalInspections: number;
  needsBansosSum: number;
  paidCadresCount: number;
  cadres: Cadre[];
  inspectionHistory?: Inspection[];
}

export interface RW {
  rwId: string;
  rwName: string;
  riskLevel: number;
  totalInspections: number;
  needsBansosSum: number;
  paidCadresCount: number;
  rts: RT[];
}
