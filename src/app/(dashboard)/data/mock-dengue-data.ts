import { FeatureCollection, Point } from 'geojson';

interface DengueProperties {
  severity: number;
  date: string;
}

export const mockDengueData: FeatureCollection<Point, DengueProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        severity: 1, // 1-3 scale where 1 is mild, 3 is severe
        date: '2024-03-15'
      },
      geometry: {
        type: 'Point',
        coordinates: [106.79544, -6.30916] // Center of Pondok Labu
      }
    },
    {
      type: 'Feature',
      properties: {
        severity: 2,
        date: '2024-03-14'
      },
      geometry: {
        type: 'Point',
        coordinates: [106.79644, -6.30816]
      }
    },
    {
      type: 'Feature',
      properties: {
        severity: 3,
        date: '2024-03-13'
      },
      geometry: {
        type: 'Point',
        coordinates: [106.79444, -6.31016]
      }
    },
    {
      type: 'Feature',
      properties: {
        severity: 1,
        date: '2024-03-12'
      },
      geometry: {
        type: 'Point',
        coordinates: [106.79744, -6.30716]
      }
    },
    {
      type: 'Feature',
      properties: {
        severity: 2,
        date: '2024-03-11'
      },
      geometry: {
        type: 'Point',
        coordinates: [106.79344, -6.31116]
      }
    }
  ]
}; 