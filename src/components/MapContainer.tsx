import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { initializeGoogleMaps } from '../services/googleMaps';

export const MapContainer: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const {
    centerCoordinates,
    searchRadius,
    filteredResults,
    setSelectedRestaurant,
    hoveredRestaurantId,
    mapInstance,
    setMapInstance
  } = useAppContext();

  const markersRef = useRef<google.maps.Marker[]>([]);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const centerMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        await initializeGoogleMaps();

        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 51.1657, lng: 10.4515 },
          zoom: 6,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true
        });

        setMapInstance(map);
        infoWindowRef.current = new google.maps.InfoWindow();
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();
  }, [setMapInstance]);

  useEffect(() => {
    if (!mapInstance || !centerCoordinates) return;

    if (centerMarkerRef.current) {
      centerMarkerRef.current.setMap(null);
    }

    centerMarkerRef.current = new google.maps.Marker({
      position: centerCoordinates,
      map: mapInstance,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#3B82F6',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2
      },
      title: 'Suchzentrum'
    });

    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    circleRef.current = new google.maps.Circle({
      map: mapInstance,
      center: centerCoordinates,
      radius: searchRadius * 1000,
      fillColor: '#3B82F6',
      fillOpacity: 0.1,
      strokeColor: '#3B82F6',
      strokeOpacity: 0.4,
      strokeWeight: 2
    });

    mapInstance.setCenter(centerCoordinates);
    mapInstance.setZoom(12);
  }, [mapInstance, centerCoordinates, searchRadius]);

  useEffect(() => {
    if (!mapInstance) return;

    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    if (filteredResults.length === 0) return;

    const bounds = new google.maps.LatLngBounds();

    if (centerCoordinates) {
      bounds.extend(centerCoordinates);
    }

    filteredResults.forEach((restaurant) => {
      const marker = new google.maps.Marker({
        position: restaurant.coordinates,
        map: mapInstance,
        title: restaurant.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        }
      });

      marker.addListener('click', () => {
        if (infoWindowRef.current) {
          const content = `
            <div style="padding: 8px; max-width: 250px;">
              <h3 style="font-weight: bold; margin-bottom: 4px;">${restaurant.name}</h3>
              ${restaurant.rating ? `<div style="color: #F59E0B; margin-bottom: 4px;">⭐ ${restaurant.rating} (${restaurant.reviewCount || 0} Bewertungen)</div>` : ''}
              <p style="font-size: 14px; color: #666; margin-bottom: 4px;">${restaurant.address}</p>
              ${restaurant.distance ? `<p style="font-size: 13px; color: #888;">${restaurant.distance} km entfernt</p>` : ''}
            </div>
          `;
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open(mapInstance, marker);
        }
        setSelectedRestaurant(restaurant);
      });

      bounds.extend(restaurant.coordinates);
      markersRef.current.push(marker);
    });

    if (filteredResults.length > 0) {
      mapInstance.fitBounds(bounds);
    }
  }, [mapInstance, filteredResults, setSelectedRestaurant, centerCoordinates]);

  useEffect(() => {
    if (!hoveredRestaurantId) {
      markersRef.current.forEach(marker => {
        marker.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        });
      });
      return;
    }

    const hoveredRestaurant = filteredResults.find(r => r.placeId === hoveredRestaurantId);
    if (!hoveredRestaurant) return;

    markersRef.current.forEach((marker, index) => {
      const restaurant = filteredResults[index];
      if (restaurant.placeId === hoveredRestaurantId) {
        marker.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#10B981',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3
        });
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 1500);
      } else {
        marker.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        });
      }
    });
  }, [hoveredRestaurantId, filteredResults]);

  return (
    <div className="h-full w-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
};
