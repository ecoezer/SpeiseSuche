import React from 'react';
import { FaStar } from 'react-icons/fa';
import type { Restaurant } from '../types';
import { useAppContext } from '../context/AppContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { setSelectedRestaurant, setHoveredRestaurantId, mapInstance } = useAppContext();

  const handleCardClick = () => {
    setSelectedRestaurant(restaurant);
    if (mapInstance) {
      mapInstance.panTo(restaurant.coordinates);
      mapInstance.setZoom(15);
    }
  };

  const handleMouseEnter = () => {
    setHoveredRestaurantId(restaurant.placeId);
  };

  const handleMouseLeave = () => {
    setHoveredRestaurantId(null);
  };

  return (
    <div
      className="p-5 hover:bg-blue-50/50 cursor-pointer border-b border-gray-100 transition-all duration-200 group"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
            {restaurant.name}
          </h3>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {restaurant.rating && (
              <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <FaStar className="text-amber-500" size={12} />
                <span className="text-xs font-bold text-gray-900">{restaurant.rating}</span>
                {restaurant.reviewCount && (
                  <span className="text-xs text-gray-600">({restaurant.reviewCount})</span>
                )}
              </div>
            )}

            {restaurant.isOpen !== undefined && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                restaurant.isOpen
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {restaurant.isOpen ? 'Geöffnet' : 'Geschlossen'}
              </span>
            )}

            {restaurant.distance !== undefined && (
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                {restaurant.distance} km
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">{restaurant.address}</p>

          {restaurant.phone && (
            <a
              href={`tel:${restaurant.phone}`}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline inline-flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              {restaurant.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
