'use client';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import { mockDengueData } from '../(overview)/data/mock-dengue-data';

export function AnalyticsMap() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [106.79544, -6.30916],
      zoom: 14.99,
      style: 'mapbox://styles/mapbox/dark-v11',
      interactive: false, // Disable all map interactions
    });

    mapRef.current = map;

    map.on('load', () => {
      map.addSource('dengue-cases', {
        type: 'geojson',
        data: mockDengueData,
      });

      map.addLayer({
        id: 'dengue-heatmap',
        type: 'heatmap',
        source: 'dengue-cases',
        paint: {
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'severity'],
            1,
            0.2,
            2,
            0.4,
            3,
            0.6,
            4,
            0.8,
            5,
            1,
          ],
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            1,
            9,
            3,
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(33,102,172,0)',
            0.2,
            'rgb(103,169,207)',
            0.4,
            'rgb(209,229,240)',
            0.6,
            'rgb(253,219,199)',
            0.8,
            'rgb(239,138,98)',
            1,
            'rgb(178,24,43)',
          ],
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
        },
      });

      map.addLayer({
        id: 'dengue-points',
        type: 'circle',
        source: 'dengue-cases',
        minzoom: 7,
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7,
            ['interpolate', ['linear'], ['get', 'severity'], 1, 2, 5, 8],
            16,
            ['interpolate', ['linear'], ['get', 'severity'], 1, 4, 5, 16],
          ],
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'severity'],
            1,
            'rgba(33,102,172,0.8)',
            2,
            'rgba(103,169,207,0.8)',
            3,
            'rgba(209,229,240,0.8)',
            4,
            'rgba(239,138,98,0.8)',
            5,
            'rgba(178,24,43,0.8)',
          ],
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1],
        },
      });
    });

    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });

    resizeObserver.observe(mapContainerRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      id="map-container"
      className="size-full rounded-md"
      ref={mapContainerRef}
    />
  );
}
