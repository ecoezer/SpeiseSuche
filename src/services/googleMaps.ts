import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import type { Restaurant, Coordinates } from '../types/Restaurant';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

let mapInstance: google.maps.Map | null = null;

export const initGoogleMaps = async (): Promise<google.maps.Map> => {
  if (mapInstance) {
    return mapInstance;
  }

  setOptions({
    key: GOOGLE_MAPS_API_KEY,
    v: 'weekly',
  });

  await importLibrary('places');
  const { Map } = await importLibrary('maps');

  const mapDiv = document.createElement('div');
  mapDiv.style.display = 'none';
  document.body.appendChild(mapDiv);

  mapInstance = new Map(mapDiv, {
    center: { lat: 52.52, lng: 13.405 },
    zoom: 13,
  });

  return mapInstance;
};

export const geocodePostalCode = async (postalCode: string): Promise<Coordinates> => {
  const geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      {
        address: `${postalCode}, Deutschland`,
        componentRestrictions: { country: 'DE' },
      },
      (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          reject(new Error('Postleitzahl konnte nicht gefunden werden'));
        }
      }
    );
  });
};

export const searchNearbyRestaurants = async (
  coordinates: Coordinates,
  radiusKm: number,
  map: google.maps.Map
): Promise<google.maps.places.PlaceResult[]> => {
  const service = new google.maps.places.PlacesService(map);

  return new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location: new google.maps.LatLng(coordinates.lat, coordinates.lng),
        radius: radiusKm * 1000,
        type: 'restaurant',
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results);
        } else {
          reject(new Error('Keine Restaurants gefunden'));
        }
      }
    );
  });
};

export const getPlaceDetails = async (
  placeId: string,
  map: google.maps.Map
): Promise<google.maps.places.PlaceResult> => {
  const service = new google.maps.places.PlacesService(map);

  return new Promise((resolve, reject) => {
    service.getDetails(
      {
        placeId,
        fields: [
          'place_id',
          'name',
          'formatted_address',
          'rating',
          'user_ratings_total',
          'price_level',
          'opening_hours',
          'formatted_phone_number',
          'website',
          'photos',
          'geometry',
        ],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          resolve(place);
        } else {
          reject(new Error('Details konnten nicht geladen werden'));
        }
      }
    );
  });
};

const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const R = 6371;
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLon = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const convertPlaceToRestaurant = (
  place: google.maps.places.PlaceResult,
  searchCenter: Coordinates
): Restaurant => {
  const coords: Coordinates = place.geometry?.location
    ? {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
    : searchCenter;

  const distance = calculateDistance(searchCenter, coords);

  return {
    placeId: place.place_id || '',
    name: place.name || 'Unbekannt',
    address: place.formatted_address || '',
    rating: place.rating || 0,
    reviewCount: place.user_ratings_total || 0,
    priceLevel: place.price_level,
    isOpen: place.opening_hours?.isOpen?.() ?? undefined,
    phoneNumber: place.formatted_phone_number,
    website: place.website,
    photoUrl: place.photos?.[0]?.getUrl({ maxWidth: 800 }),
    distance: Math.round(distance * 10) / 10,
    coordinates: coords,
  };
};
