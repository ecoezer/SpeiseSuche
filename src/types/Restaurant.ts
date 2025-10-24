export interface Restaurant {
  placeId: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  priceLevel?: number;
  isOpen?: boolean;
  phoneNumber?: string;
  website?: string;
  photoUrl?: string;
  distance?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface SearchFilters {
  minRating: number;
  onlyOpen: boolean;
  sortBy: 'distance' | 'rating' | 'reviewCount' | 'name';
}
