import React from 'react';
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaStar, FaUser } from 'react-icons/fa';
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
      className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-gray-800 flex-1">{restaurant.name}</h3>
        {restaurant.rating && (
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
            <FaStar className="text-yellow-500 text-sm" />
            <span className="font-semibold text-sm">{restaurant.rating}</span>
            {restaurant.reviewCount && (
              <span className="text-gray-500 text-xs ml-1">({restaurant.reviewCount})</span>
            )}
          </div>
        )}
      </div>

      {restaurant.isOpen !== undefined && (
        <div className="mb-2">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
              restaurant.isOpen
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {restaurant.isOpen ? 'Geöffnet' : 'Geschlossen'}
          </span>
        </div>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2 text-gray-600">
          <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
          <span>{restaurant.address}</span>
        </div>

        {restaurant.phone && (
          <div className="flex items-center gap-2 text-gray-600">
            <FaPhone className="flex-shrink-0" />
            <a
              href={`tel:${restaurant.phone}`}
              className="hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {restaurant.phone}
            </a>
          </div>
        )}

        {restaurant.email && (
          <div className="flex items-center gap-2 text-gray-600">
            <FaEnvelope className="flex-shrink-0" />
            <a
              href={`mailto:${restaurant.email}`}
              className="hover:text-blue-600 transition-colors truncate"
              onClick={(e) => e.stopPropagation()}
            >
              {restaurant.email}
            </a>
          </div>
        )}

        {restaurant.website && (
          <div className="flex items-center gap-2 text-gray-600">
            <FaGlobe className="flex-shrink-0" />
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors truncate"
              onClick={(e) => e.stopPropagation()}
            >
              Website besuchen
            </a>
          </div>
        )}

        {restaurant.contactPerson && (
          <div className="flex items-center gap-2 text-gray-600">
            <FaUser className="flex-shrink-0" />
            <span>{restaurant.contactPerson}</span>
          </div>
        )}

        {restaurant.distance !== undefined && (
          <div className="pt-2 border-t border-gray-200">
            <span className="text-gray-500 text-xs font-medium">
              {restaurant.distance} km entfernt
            </span>
          </div>
        )}
      </div>

      <button
        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedRestaurant(restaurant);
        }}
      >
        Details anzeigen
      </button>
    </div>
  );
};
