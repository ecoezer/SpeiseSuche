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
      className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 mb-1 truncate">{restaurant.name}</h3>

          <div className="flex items-center gap-2 mb-2">
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-gray-900">{restaurant.rating}</span>
                <FaStar className="text-amber-400" size={10} />
                {restaurant.reviewCount && (
                  <span className="text-xs text-gray-500">({restaurant.reviewCount})</span>
                )}
              </div>
            )}

            {restaurant.isOpen !== undefined && (
              <>
                <span className="text-gray-300">·</span>
                <span className={`text-xs font-medium ${
                  restaurant.isOpen ? 'text-green-600' : 'text-red-600'
                }`}>
                  {restaurant.isOpen ? 'Geöffnet' : 'Geschlossen'}
                </span>
              </>
            )}

            {restaurant.distance !== undefined && (
              <>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">
                  {restaurant.distance} km
                </span>
              </>
            )}
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 mb-2">{restaurant.address}</p>

          {restaurant.phone && (
            <a
              href={`tel:${restaurant.phone}`}
              className="text-xs text-blue-600 hover:underline block"
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
