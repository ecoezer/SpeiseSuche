import type { Restaurant, Review } from '../types';

let googleMapsLoaded = false;
let placesService: google.maps.places.PlacesService | null = null;

export const initializeGoogleMaps = async (): Promise<void> => {
  if (googleMapsLoaded) return;

  try {
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;

      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google Maps script'));
        document.head.appendChild(script);
      });
    }
    googleMapsLoaded = true;
  } catch (error) {
    console.error('Error loading Google Maps:', error);
    throw new Error('Failed to load Google Maps');
  }
};

export const getPlacesService = (map: google.maps.Map): google.maps.places.PlacesService => {
  if (!placesService) {
    placesService = new google.maps.places.PlacesService(map);
  }
  return placesService;
};

export const geocodePostalCode = async (postalCode: string): Promise<google.maps.LatLngLiteral> => {
  await initializeGoogleMaps();

  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode(
      { address: postalCode, componentRestrictions: { country: 'DE' } },
      (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng()
          });
        } else {
          reject(new Error('Postal code not found'));
        }
      }
    );
  });
};

export const searchNearbyRestaurants = async (
  location: google.maps.LatLngLiteral,
  radiusInKm: number,
  map: google.maps.Map
): Promise<google.maps.places.PlaceResult[]> => {
  await initializeGoogleMaps();

  const service = getPlacesService(map);
  const radiusInMeters = radiusInKm * 1000;

  return new Promise((resolve, reject) => {
    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: radiusInMeters,
      type: 'restaurant'
    };

    service.nearbySearch(request, (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        resolve(results);
      } else {
        reject(new Error(`Places search failed: ${status}`));
      }
    });
  });
};

export const getPlaceDetails = async (
  placeId: string,
  map: google.maps.Map
): Promise<google.maps.places.PlaceResult> => {
  await initializeGoogleMaps();

  const service = getPlacesService(map);

  return new Promise((resolve, reject) => {
    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: placeId,
      fields: [
        'name',
        'formatted_address',
        'formatted_phone_number',
        'website',
        'rating',
        'user_ratings_total',
        'reviews',
        'opening_hours',
        'geometry',
        'photos',
        'price_level',
        'place_id'
      ]
    };

    service.getDetails(request, (result: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && result) {
        resolve(result);
      } else {
        reject(new Error(`Place details failed: ${status}`));
      }
    });
  });
};

export const convertPlaceToRestaurant = (
  place: google.maps.places.PlaceResult,
  centerLocation?: google.maps.LatLngLiteral
): Restaurant => {
  const restaurant: Restaurant = {
    placeId: place.place_id || '',
    name: place.name || 'Unknown',
    address: place.formatted_address || place.vicinity || '',
    phone: place.formatted_phone_number,
    website: place.website,
    rating: place.rating,
    reviewCount: place.user_ratings_total,
    priceLevel: place.price_level,
    coordinates: {
      lat: place.geometry?.location?.lat() || 0,
      lng: place.geometry?.location?.lng() || 0
    },
    photos: place.photos?.slice(0, 5).map((photo: google.maps.places.PlacePhoto) =>
      photo.getUrl({ maxWidth: 800, maxHeight: 600 })
    ),
    isOpen: place.opening_hours?.isOpen?.()
  };

  if (place.opening_hours) {
    restaurant.openingHours = {
      weekdayText: place.opening_hours.weekday_text,
      openNow: place.opening_hours.isOpen?.(),
      periods: place.opening_hours.periods?.map((period: google.maps.places.PlaceOpeningHoursPeriod) => ({
        open: {
          day: period.open.day,
          time: period.open.time || ''
        },
        close: period.close ? {
          day: period.close.day,
          time: period.close.time || ''
        } : undefined
      }))
    };
  }

  if (place.reviews) {
    restaurant.reviews = place.reviews.slice(0, 5).map((review: google.maps.places.PlaceReview): Review => ({
      author: review.author_name || 'Anonymous',
      rating: review.rating || 0,
      text: review.text || '',
      time: review.time || 0
    }));
  }

  if (centerLocation && restaurant.coordinates) {
    restaurant.distance = calculateDistance(
      centerLocation,
      restaurant.coordinates
    );
  }

  return restaurant;
};

export const calculateDistance = (
  point1: google.maps.LatLngLiteral,
  point2: google.maps.LatLngLiteral
): number => {
  const R = 6371;
  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
};

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const getPhotoUrl = (photo: google.maps.places.PlacePhoto, maxWidth: number = 400): string => {
  return photo.getUrl({ maxWidth });
};
