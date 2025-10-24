import React from 'react';
import { useAppContext } from '../context/AppContext';
import { RestaurantCard } from './RestaurantCard';
import { FaSearch } from 'react-icons/fa';

export const RestaurantList: React.FC = () => {
  const { filteredResults, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Suche nach Restaurants...</p>
      </div>
    );
  }

  if (filteredResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <FaSearch className="text-6xl mb-4 text-gray-300" />
        <p className="text-lg font-semibold mb-2">Keine Restaurants gefunden</p>
        <p className="text-sm text-center">
          Geben Sie eine Postleitzahl ein, um Restaurants in Ihrer Nähe zu finden
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mb-4 sticky top-0 bg-white z-10 py-3 border-b border-gray-200">
        <p className="text-sm font-semibold text-gray-700">
          {filteredResults.length} Restaurant{filteredResults.length !== 1 ? 's' : ''} gefunden
        </p>
      </div>
      <div className="pb-4">
        {filteredResults.map((restaurant) => (
          <RestaurantCard key={restaurant.placeId} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};
