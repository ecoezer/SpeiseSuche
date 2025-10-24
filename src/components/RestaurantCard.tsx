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
      className="p-4 hover:bg-orange-50/30 cursor-pointer border-b border-gray-200 transition-all duration-200 group"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-gray-900 mb-2 line-clamp-1 group-hover:text-[#ff8000] transition-colors">
            {restaurant.name}
          </h3>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {restaurant.rating && (
              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm border border-gray-200">
                <FaStar className="text-[#ffc107]" size={12} />
                <span className="text-xs font-bold text-gray-900">{restaurant.rating}</span>
                {restaurant.reviewCount && (
                  <span className="text-xs text-gray-500">({restaurant.reviewCount})</span>
                )}
              </div>
            )}

            {restaurant.distance !== undefined && (
              <span className="text-xs font-medium text-gray-600">
                {restaurant.distance} km
              </span>
            )}

            {restaurant.isOpen !== undefined && (
              <span className={`text-xs font-semibold ${
                restaurant.isOpen
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {restaurant.isOpen ? '• Geöffnet' : '• Geschlossen'}
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 line-clamp-1 mb-2">{restaurant.address}</p>

          {restaurant.phone && (
            <a
              href={`tel:${restaurant.phone}`}
              className="text-xs text-[#ff8000] hover:text-[#ff6600] font-medium inline-flex items-center gap-1"
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
