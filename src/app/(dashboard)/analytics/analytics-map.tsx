'use client';

import { FeatureCollection, Point } from 'geojson';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useMemo, useRef } from 'react';
import { Household } from '../cadre/data/definitions';

const INITIAL_CENTER = [107.61706, -6.89135] as [number, number];
const INITIAL_ZOOM = 14.89;
const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v11';

export function AnalyticsMap({ households }: { households: Household[] }) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const dengueData = useMemo<FeatureCollection<Point, { severity: number }>>(
    () => ({
      type: 'FeatureCollection',
      features: households.map((household) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(household.longitude),
            parseFloat(household.latitude),
          ],
        },
        properties: {
          severity: parseInt(household.intensity),
        },
      })),
    }),
    [households]
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      style: MAPBOX_STYLE,
      interactive: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      map.addSource('dengue-cases', {
        type: 'geojson',
        data: dengueData,
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
            'rgba(0,0,255,0)',
            0.2,
            'rgb(0,0,255)',
            0.4,
            'rgb(0,255,255)',
            0.6,
            'rgb(255,255,0)',
            0.8,
            'rgb(255,0,0)',
            1,
            'rgb(255,0,0)',
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
            'rgba(0,0,255,0.8)',
            2,
            'rgba(0,255,255,0.8)',
            3,
            'rgba(255,255,0,0.8)',
            4,
            'rgba(255,0,0,0.8)',
            5,
            'rgba(255,0,0,0.8)',
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
  }, [dengueData]);

  return (
    <div
      id="map-container"
      className="size-full rounded-md"
      ref={mapContainerRef}
    />
  );
}
