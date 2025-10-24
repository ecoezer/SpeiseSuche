import React from 'react';
import { useAppContext } from '../context/AppContext';
import { RestaurantCard } from './RestaurantCard';
import { FaSearch } from 'react-icons/fa';

export const RestaurantList: React.FC = () => {
  const { filteredResults, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-t-4 border-blue-600"></div>
          <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-blue-200 animate-pulse"></div>
        </div>
        <p className="text-slate-700 font-semibold mt-6 text-lg">Suche nach Restaurants...</p>
        <p className="text-slate-500 text-sm mt-2">Bitte warten Sie einen Moment</p>
      </div>
    );
  }

  if (filteredResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <div className="bg-gradient-to-br from-slate-100 to-blue-100 p-8 rounded-3xl mb-6">
          <FaSearch className="text-7xl text-slate-400" />
        </div>
        <p className="text-2xl font-bold mb-3 text-slate-700">Keine Restaurants gefunden</p>
        <p className="text-sm text-center text-slate-600 max-w-md leading-relaxed">
          Geben Sie eine Postleitzahl ein, um Restaurants in Ihrer Nähe zu finden
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="mb-6 sticky top-0 bg-white/95 backdrop-blur-lg z-10 py-4 border-b-2 border-blue-500 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-slate-800">
            {filteredResults.length} Restaurant{filteredResults.length !== 1 ? 's' : ''} gefunden
          </p>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm">
            {filteredResults.length}
          </div>
        </div>
      </div>
      <div className="pb-6 space-y-1">
        {filteredResults.map((restaurant, index) => (
          <div
            key={restaurant.placeId}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-in slide-in-from-right fade-in"
          >
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
};
