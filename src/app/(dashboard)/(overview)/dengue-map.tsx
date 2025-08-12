'use client';

import { FeatureCollection, Point } from 'geojson';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useMemo, useRef } from 'react';
import { Household } from '../cadre/data/definitions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const INITIAL_CENTER = [107.61706, -6.89135] as [number, number];
const INITIAL_ZOOM = 14.89;
const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v11';

export function DengueMap({ households }: { households: Household[] }) {
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
      style: MAPBOX_STYLE,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
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
      <div className="absolute top-4 left-4 z-10">
        <Card className="w-[260px] shadow-lg">
          <CardHeader>
            <CardTitle>Angka Bebas Jentik</CardTitle>
            <CardDescription>
              <div className="flex flex-col items-start text-xs mt-1">
                <span className="font-mono">N/tempat bebas jentik</span>
                <div className="w-full flex items-center">
                  <div className="border-t border-gray-400 w-40 my-0.5" />
                  <span className="ml-2 font-mono">&times; 100%</span>
                </div>
                <span className="font-mono">N/tempat yang diperiksa</span>
                <span className="text-muted-foreground mt-1">
                  N = jumlah rumah
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-emerald-500">92.5%</span>
              <span className="text-muted-foreground text-xs">
                185 dari 200 rumah bebas jentik
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
