import React from 'react';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import type { Restaurant } from '../types/Restaurant';
import { useAppContext } from '../context/AppContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { setSelectedRestaurant } = useAppContext();

  const getPriceLevelDisplay = (level?: number): string => {
    if (!level) return '';
    return '€'.repeat(level);
  };

  return (
    <div
      onClick={() => setSelectedRestaurant(restaurant)}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex gap-4">
        {restaurant.photoUrl && (
          <img
            src={restaurant.photoUrl}
            alt={restaurant.name}
            className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            {restaurant.rating > 0 && (
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" size={16} />
                <span className="font-semibold text-gray-900">{restaurant.rating.toFixed(1)}</span>
                <span className="text-gray-500 text-sm">({restaurant.reviewCount})</span>
              </div>
            )}
            {restaurant.priceLevel && (
              <span className="text-gray-600 font-medium">
                {getPriceLevelDisplay(restaurant.priceLevel)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt size={14} />
            <span>{restaurant.distance} km</span>
            {restaurant.isOpen !== undefined && (
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  restaurant.isOpen
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {restaurant.isOpen ? 'Geöffnet' : 'Geschlossen'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
