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
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-5 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200/50 hover:scale-[1.02] hover:border-blue-300 transform"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-xl text-slate-800 flex-1 leading-tight">{restaurant.name}</h3>
        {restaurant.rating && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-xl border border-yellow-200/50 shadow-sm">
            <FaStar className="text-yellow-500 text-base" />
            <span className="font-bold text-base">{restaurant.rating}</span>
            {restaurant.reviewCount && (
              <span className="text-slate-500 text-xs">({restaurant.reviewCount})</span>
            )}
          </div>
        )}
      </div>

      {restaurant.isOpen !== undefined && (
        <div className="mb-3">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${
              restaurant.isOpen
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200'
                : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full mr-2 ${
              restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'
            }`} />
            {restaurant.isOpen ? 'Geöffnet' : 'Geschlossen'}
          </span>
        </div>
      )}

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3 text-slate-600">
          <div className="bg-blue-50 p-2 rounded-lg">
            <FaMapMarkerAlt className="text-blue-600" />
          </div>
          <span className="flex-1 leading-relaxed">{restaurant.address}</span>
        </div>

        {restaurant.phone && (
          <div className="flex items-center gap-3 text-slate-600">
            <div className="bg-green-50 p-2 rounded-lg">
              <FaPhone className="text-green-600" />
            </div>
            <a
              href={`tel:${restaurant.phone}`}
              className="hover:text-blue-600 transition-colors font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              {restaurant.phone}
            </a>
          </div>
        )}

        {restaurant.email && (
          <div className="flex items-center gap-3 text-slate-600">
            <div className="bg-red-50 p-2 rounded-lg">
              <FaEnvelope className="text-red-600" />
            </div>
            <a
              href={`mailto:${restaurant.email}`}
              className="hover:text-blue-600 transition-colors truncate font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              {restaurant.email}
            </a>
          </div>
        )}

        {restaurant.website && (
          <div className="flex items-center gap-3 text-slate-600">
            <div className="bg-purple-50 p-2 rounded-lg">
              <FaGlobe className="text-purple-600" />
            </div>
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors truncate font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              Website besuchen
            </a>
          </div>
        )}

        {restaurant.contactPerson && (
          <div className="flex items-center gap-3 text-slate-600">
            <div className="bg-slate-100 p-2 rounded-lg">
              <FaUser className="text-slate-600" />
            </div>
            <span className="font-medium">{restaurant.contactPerson}</span>
          </div>
        )}

        {restaurant.distance !== undefined && (
          <div className="pt-3 border-t border-slate-200">
            <span className="text-slate-600 text-sm font-semibold bg-slate-100 px-3 py-1.5 rounded-lg inline-block">
              {restaurant.distance} km entfernt
            </span>
          </div>
        )}
      </div>

      <button
        className="mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
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
