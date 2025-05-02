import { ActionPlan, WeatherInsight } from './definitions';

export async function getWeatherInsights(): Promise<WeatherInsight | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/web/analytics/weather-insight`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch weather insights');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}

export async function getActionPlan(): Promise<ActionPlan | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/web/analytics/action-plan`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch action plan');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}
