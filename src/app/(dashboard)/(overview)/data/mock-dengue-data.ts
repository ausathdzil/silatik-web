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
        severity: 1, // 1-5 scale where 1 is mild, 5 is severe
        date: '2024-03-15',
      },
      geometry: {
        type: 'Point',
        coordinates: [107.6105, -6.9147], // Center of Lebakgede
      },
    },
    {
      type: 'Feature',
      properties: {
        severity: 2,
        date: '2024-03-14',
      },
      geometry: {
        type: 'Point',
        coordinates: [107.6115, -6.9137],
      },
    },
    {
      type: 'Feature',
      properties: {
        severity: 3,
        date: '2024-03-13',
      },
      geometry: {
        type: 'Point',
        coordinates: [107.6095, -6.9157],
      },
    },
    {
      type: 'Feature',
      properties: {
        severity: 4,
        date: '2024-03-12',
      },
      geometry: {
        type: 'Point',
        coordinates: [107.6125, -6.9127],
      },
    },
    {
      type: 'Feature',
      properties: {
        severity: 5,
        date: '2024-03-11',
      },
      geometry: {
        type: 'Point',
        coordinates: [107.6085, -6.9167],
      },
    },
  ],
};
