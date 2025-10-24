import React from 'react';
import { useAppContext } from '../context/AppContext';
import { RestaurantCard } from './RestaurantCard';
import { FaSearch } from 'react-icons/fa';

export const RestaurantList: React.FC = () => {
  const { filteredResults, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-6">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-orange-200 border-t-[#ff8000]"></div>
        </div>
        <p className="text-gray-900 font-bold text-xl">Suche läuft...</p>
        <p className="text-gray-500 text-base mt-3">Restaurants werden geladen</p>
      </div>
    );
  }

  if (filteredResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-8">
        <div className="bg-gray-100 p-10 rounded-full mb-6">
          <FaSearch className="text-7xl text-gray-400" />
        </div>
        <p className="text-xl font-bold text-gray-900 mb-3">Keine Restaurants gefunden</p>
        <p className="text-base text-center text-gray-600 max-w-sm leading-relaxed">
          Versuchen Sie eine andere Postleitzahl oder erweitern Sie den Suchradius
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-white">
      <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">
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
