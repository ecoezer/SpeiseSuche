export interface Restaurant {
  placeId: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  contactPerson?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
  openingHours?: OpeningHours;
  coordinates: {
    lat: number;
    lng: number;
  };
  photos?: string[];
  distance?: number;
  priceLevel?: number;
  isOpen?: boolean;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  time: number;
}

export interface OpeningHours {
  weekdayText?: string[];
  openNow?: boolean;
  periods?: Array<{
    open: { day: number; time: string };
    close?: { day: number; time: string };
  }>;
}

export interface Search {
  id?: string;
  postCode: string;
  radius: number;
  timestamp: number;
  resultCount: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SearchResult {
  searchId: string;
  restaurantId: string;
  distance: number;
  timestamp: number;
}

export interface MapMarker {
  position: google.maps.LatLngLiteral;
  restaurant: Restaurant;
}

export interface FilterState {
  minRating: number;
  onlyOpen: boolean;
  sortBy: 'distance' | 'rating' | 'reviewCount' | 'name';
}

export interface AppState {
  searchResults: Restaurant[];
  selectedRestaurant: Restaurant | null;
  filters: FilterState;
  isLoading: boolean;
  error: string | null;
  searchHistory: Search[];
  centerCoordinates: google.maps.LatLngLiteral | null;
  searchRadius: number;
}
