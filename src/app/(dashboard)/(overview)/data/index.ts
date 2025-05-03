import { Household } from '../../cadre/data/definitions';
import {
  AIInsight,
  CaseDistributionByType,
  CaseReport,
  LarvaeByRW,
} from './definitions';

export async function getHouseholds(): Promise<Household[] | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/households`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}

export async function getLarvaeByRW(): Promise<LarvaeByRW[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/web/dashboard/distribution/larvae-by-rw`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}

export async function getCaseDistributionByType(): Promise<
  CaseDistributionByType[] | null
> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/web/dashboard/distribution/larvae-by-area-type`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}

export async function getAIInsight(): Promise<AIInsight | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ai/distribution-insights`,
      {
        method: 'POST',
      }
    );

    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}

export async function getCaseReport(): Promise<CaseReport[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/web/dashboard/inspections-history`,
      {
        method: 'GET',
      }
    );

    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}
