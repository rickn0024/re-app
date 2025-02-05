// components/PropertyMap.tsx
'use client';

import { FC, useEffect, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const defaultZoom = 15;

// Define libraries as a constant outside the component
const LIBRARIES: 'marker'[] = ['marker'];

interface PropertyMapProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const PropertyMap: FC<PropertyMapProps> = ({ coordinates }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: LIBRARIES, // Add this line to enable Advanced Markers
  });

  useEffect(() => {
    if (!isLoaded || loadError || !mapRef.current) return;

    // Initialize the map
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: coordinates.latitude, lng: coordinates.longitude },
      zoom: defaultZoom,
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
    });

    // Create an AdvancedMarkerElement
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: coordinates.latitude, lng: coordinates.longitude },
    });

    // Cleanup
    return () => {
      if (marker) {
        marker.map = null; // Remove the marker from the map
      }
    };
  }, [isLoaded, loadError, coordinates]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return <div ref={mapRef} style={mapContainerStyle} />;
};

export default PropertyMap;
