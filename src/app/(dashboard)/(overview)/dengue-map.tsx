'use client';

import { Button } from '@/components/ui/button';
import { FeatureCollection, Point } from 'geojson';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Household } from '../cadre/data/definitions';

const INITIAL_CENTER = [107.61706, -6.89135] as [number, number];
const INITIAL_ZOOM = 14.89;
const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v11';

export function DengueMap({ households }: { households: Household[] }) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

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

  const handleResetZoom = () => {
    const map = mapRef.current;
    if (!map) return;

    map.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAPBOX_STYLE,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    mapRef.current = map;

    map.on('move', () => {
      const mapCenter = map.getCenter();
      const mapZoom = map.getZoom();

      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

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
      map.remove();
      mapRef.current = null;
      resizeObserver.disconnect();
    };
  }, [dengueData]);

  return (
    <div className="relative size-full">
      <div
        id="map-container"
        className="size-full rounded-xl"
        ref={mapContainerRef}
      />
      <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg shadow-lg w-[200px]">
        <div className="text-sm text-gray-700 font-mono">
          <div>Longitude: {center[0].toFixed(4)}</div>
          <div>Latitude: {center[1].toFixed(4)}</div>
          <div>Zoom: {zoom.toFixed(2)}</div>
        </div>
        <Button onClick={handleResetZoom} size="sm" className="mt-2 w-full">
          Reset View
        </Button>
      </div>
    </div>
  );
}
