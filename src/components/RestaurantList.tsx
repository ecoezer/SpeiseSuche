import React from 'react';
import { useAppContext } from '../context/AppContext';
import { RestaurantCard } from './RestaurantCard';
import { FaSearch } from 'react-icons/fa';

export const RestaurantList: React.FC = () => {
  const { filteredResults, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-4">
        <div className="relative mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-t-3 border-blue-600"></div>
        </div>
        <p className="text-gray-700 font-medium text-sm">Suche läuft...</p>
      </div>
    );
  }

  if (filteredResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-6">
        <FaSearch className="text-4xl text-gray-300 mb-3" />
        <p className="text-sm font-medium text-gray-700 mb-1">Keine Ergebnisse</p>
        <p className="text-xs text-center text-gray-500 max-w-xs">
          Versuchen Sie eine andere Postleitzahl oder erweitern Sie den Suchradius
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-white">
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            Ergebnisse
          </h2>
          <span className="text-xs text-gray-500">
            {filteredResults.length} {filteredResults.length === 1 ? 'Restaurant' : 'Restaurants'}
          </span>
        </div>
      </div>
      <div>
        {filteredResults.map((restaurant) => (
          <RestaurantCard key={restaurant.placeId} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};
