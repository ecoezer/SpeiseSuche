import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Restaurant, Coordinates, SearchFilters } from '../types/Restaurant';
import { initGoogleMaps } from '../services/googleMaps';

interface AppContextType {
  searchResults: Restaurant[];
  setSearchResults: (results: Restaurant[]) => void;
  filteredResults: Restaurant[];
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  centerCoordinates: Coordinates | null;
  setCenterCoordinates: (coords: Coordinates | null) => void;
  searchRadius: number;
  setSearchRadius: (radius: number) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  mapInstance: google.maps.Map | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [centerCoordinates, setCenterCoordinates] = useState<Coordinates | null>(null);
  const [searchRadius, setSearchRadius] = useState(5);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    minRating: 0,
    onlyOpen: false,
    sortBy: 'distance',
  });

  useEffect(() => {
    const initMap = async () => {
      try {
        const map = await initGoogleMaps();
        setMapInstance(map);
      } catch (error) {
        console.error('Failed to initialize Google Maps:', error);
        setError('Google Maps konnte nicht geladen werden');
      }
    };

    initMap();
  }, []);

  const filteredResults = searchResults.filter((restaurant) => {
    if (filters.minRating > 0 && restaurant.rating < filters.minRating) {
      return false;
    }
    if (filters.onlyOpen && restaurant.isOpen === false) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'reviewCount':
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'distance':
      default:
        return (a.distance || 0) - (b.distance || 0);
    }
  });

  return (
    <AppContext.Provider
      value={{
        searchResults,
        setSearchResults,
        filteredResults,
        selectedRestaurant,
        setSelectedRestaurant,
        isLoading,
        setIsLoading,
        error,
        setError,
        centerCoordinates,
        setCenterCoordinates,
        searchRadius,
        setSearchRadius,
        filters,
        setFilters,
        mapInstance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
