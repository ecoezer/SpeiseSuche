import React from 'react';
import { useAppContext } from '../context/AppContext';
import { RestaurantCard } from './RestaurantCard';
import { FaSearch } from 'react-icons/fa';

export const RestaurantList: React.FC = () => {
  const { filteredResults, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-4">
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-[#ff8000]"></div>
        </div>
        <p className="text-gray-900 font-bold text-lg">Suche läuft...</p>
        <p className="text-gray-500 text-sm mt-2">Restaurants werden geladen</p>
      </div>
    );
  }

  if (filteredResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-6">
        <div className="bg-gray-100 p-8 rounded-full mb-4">
          <FaSearch className="text-6xl text-gray-400" />
        </div>
        <p className="text-lg font-bold text-gray-900 mb-2">Keine Restaurants gefunden</p>
        <p className="text-sm text-center text-gray-600 max-w-xs leading-relaxed">
          Versuchen Sie eine andere Postleitzahl oder erweitern Sie den Suchradius
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-white">
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">
            {filteredResults.length} {filteredResults.length === 1 ? 'Restaurant' : 'Restaurants'}
          </h2>
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
