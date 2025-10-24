import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Restaurant, FilterState, Search } from '../types';

interface AppContextType {
  searchResults: Restaurant[];
  setSearchResults: (results: Restaurant[]) => void;
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  searchHistory: Search[];
  setSearchHistory: (history: Search[]) => void;
  centerCoordinates: google.maps.LatLngLiteral | null;
  setCenterCoordinates: (coords: google.maps.LatLngLiteral | null) => void;
  searchRadius: number;
  setSearchRadius: (radius: number) => void;
  filteredResults: Restaurant[];
  hoveredRestaurantId: string | null;
  setHoveredRestaurantId: (id: string | null) => void;
  mapInstance: google.maps.Map | null;
  setMapInstance: (map: google.maps.Map | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    minRating: 0,
    onlyOpen: false,
    sortBy: 'distance'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<Search[]>([]);
  const [centerCoordinates, setCenterCoordinates] = useState<google.maps.LatLngLiteral | null>(null);
  const [searchRadius, setSearchRadius] = useState(5);
  const [hoveredRestaurantId, setHoveredRestaurantId] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const filteredResults = React.useMemo(() => {
    let results = [...searchResults];

    if (filters.minRating > 0) {
      results = results.filter(r => (r.rating || 0) >= filters.minRating);
    }

    if (filters.onlyOpen) {
      results = results.filter(r => r.isOpen === true);
    }

    results.sort((a, b) => {
      switch (filters.sortBy) {
        case 'distance':
          return (a.distance || 0) - (b.distance || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'reviewCount':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return results;
  }, [searchResults, filters]);

  const value: AppContextType = {
    searchResults,
    setSearchResults,
    selectedRestaurant,
    setSelectedRestaurant,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    error,
    setError,
    searchHistory,
    setSearchHistory,
    centerCoordinates,
    setCenterCoordinates,
    searchRadius,
    setSearchRadius,
    filteredResults,
    hoveredRestaurantId,
    setHoveredRestaurantId,
    mapInstance,
    setMapInstance
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
