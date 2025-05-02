'use client';

import { Button } from '@/components/ui/button';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { mockDengueData } from '../data/mock-dengue-data';

export function DengueMap() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [coordinates, setCoordinates] = useState({
    lng: 106.79544,
    lat: -6.30916,
    zoom: 14.99,
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [coordinates.lng, coordinates.lat],
      zoom: coordinates.zoom,
      style: 'mapbox://styles/mapbox/dark-v11',
    });

    mapRef.current = map;

    // Add coordinate display
    map.on('move', () => {
      const { lng, lat } = map.getCenter();
      setCoordinates({
        lng: Number(lng.toFixed(4)),
        lat: Number(lat.toFixed(4)),
        zoom: Number(map.getZoom().toFixed(2)),
      });
    });

    map.on('load', () => {
      // Add the dengue data source
      map.addSource('dengue-cases', {
        type: 'geojson',
        data: mockDengueData,
      });

      // Add the heatmap layer
      map.addLayer({
        id: 'dengue-heatmap',
        type: 'heatmap',
        source: 'dengue-cases',
        paint: {
          // Increase the heatmap weight based on severity
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'severity'],
            1,
            0.3,
            2,
            0.6,
            3,
            1,
          ],
          // Increase the heatmap color weight by zoom level
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            1,
            9,
            3,
          ],
          // Color ramp for heatmap
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
          // Adjust the heatmap radius by zoom level
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
        },
      });

      // Add a circle layer for individual cases
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
            ['interpolate', ['linear'], ['get', 'severity'], 1, 2, 3, 6],
            16,
            ['interpolate', ['linear'], ['get', 'severity'], 1, 4, 3, 12],
          ],
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'severity'],
            1,
            'rgba(33,102,172,0.8)',
            2,
            'rgba(239,138,98,0.8)',
            3,
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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        map.setCenter([longitude, latitude]);
        map.setZoom(14);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      resizeObserver.disconnect();
    };
  }, []);

  const handleResetZoom = () => {
    if (mapRef.current) {
      mapRef.current.setCenter([106.79544, -6.30916]);
      mapRef.current.setZoom(14.99);
    }
  };

  return (
    <div className="relative size-full">
      <div
        id="map-container"
        className="size-full rounded-xl"
        ref={mapContainerRef}
      />
      <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg shadow-lg">
        <div className="text-sm text-gray-700">
          <div>Longitude: {coordinates.lng}</div>
          <div>Latitude: {coordinates.lat}</div>
          <div>Zoom: {coordinates.zoom}</div>
        </div>
        <Button onClick={handleResetZoom} size="sm" className="mt-2 w-full">
          Reset View
        </Button>
      </div>
    </div>
  );
}
