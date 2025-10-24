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
      className="bg-white rounded-xl shadow-sm p-6 mb-4 hover:shadow-lg transition-all duration-200 cursor-pointer border border-slate-200/70 hover:border-indigo-300"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-slate-900 flex-1 leading-tight">{restaurant.name}</h3>
        {restaurant.rating && (
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
            <FaStar className="text-amber-500 text-sm" />
            <span className="font-semibold text-sm">{restaurant.rating}</span>
            {restaurant.reviewCount && (
              <span className="text-slate-500 text-xs">({restaurant.reviewCount})</span>
            )}
          </div>
        )}
      </div>

      {restaurant.isOpen !== undefined && (
        <div className="mb-3">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${
              restaurant.isOpen
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
              restaurant.isOpen ? 'bg-emerald-500' : 'bg-rose-500'
            }`} />
            {restaurant.isOpen ? 'Geöffnet' : 'Geschlossen'}
          </span>
        </div>
      )}

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3 text-slate-600">
          <div className="bg-indigo-50 p-2 rounded-lg">
            <FaMapMarkerAlt className="text-indigo-600" />
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
            <div className="bg-slate-100 p-2 rounded-lg">
              <FaGlobe className="text-slate-600" />
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
            <span className="text-slate-700 text-sm font-semibold bg-indigo-50 px-3 py-1.5 rounded-lg inline-block">
              {restaurant.distance} km entfernt
            </span>
          </div>
        )}
      </div>

      <button
        className="mt-5 w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
