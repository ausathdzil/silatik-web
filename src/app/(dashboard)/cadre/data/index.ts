import { RT, RW, Inspection, Household } from './definitions';

export async function fetchRWList(): Promise<RW[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/web/staff/cadres-by-area`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch RW list');
  }
  return response.json();
}

export async function fetchRTDetail(rtId: string): Promise<RT> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/web/staff/rt-detail/${rtId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch RT detail');
  }
  return response.json();
}

export async function fetchInspectionHistory(): Promise<Inspection[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/inspections`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch inspection history');
  }
  return response.json();
}

export async function fetchHouseholds(): Promise<Household[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/households`);
  if (!response.ok) {
    throw new Error('Failed to fetch households');
  }
  return response.json();
}

// Helper function to get RTs from RW list
export function getRTsFromRWList(rwList: RW[]): RT[] {
  return rwList.flatMap((rw) => rw.rts);
}

// Helper function to get RT by ID from RW list
export function getRTById(rwList: RW[], rtId: string): RT | undefined {
  return rwList.flatMap((rw) => rw.rts).find((rt) => rt.rtId === rtId);
}

// Helper function to get RW by ID
export function getRWById(rwList: RW[], rwId: string): RW | undefined {
  return rwList.find((rw) => rw.rwId === rwId);
}

// Helper function to get inspections for a specific RT
export function getInspectionsForRT(
  inspections: Inspection[],
  rtId: string
): Inspection[] {
  return inspections.filter((inspection) => {
    // You'll need to implement this based on how householdId relates to RT
    // This is a placeholder - adjust according to your data structure
    return inspection.householdId.startsWith(rtId);
  });
}
