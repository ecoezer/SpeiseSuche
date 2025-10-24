import React from 'react';
import { FaTimes, FaStar, FaPhone, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

export const RestaurantDetailModal: React.FC = () => {
  const { selectedRestaurant, setSelectedRestaurant } = useAppContext();

  if (!selectedRestaurant) return null;

  const getPriceLevelDisplay = (level?: number): string => {
    if (!level) return '';
    return '€'.repeat(level);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setSelectedRestaurant(null)}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900 pr-8 truncate">
            {selectedRestaurant.name}
          </h2>
          <button
            onClick={() => setSelectedRestaurant(null)}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          {selectedRestaurant.photoUrl && (
            <img
              src={selectedRestaurant.photoUrl}
              alt={selectedRestaurant.name}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {selectedRestaurant.rating > 0 && (
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" size={20} />
                  <span className="font-bold text-xl text-gray-900">
                    {selectedRestaurant.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({selectedRestaurant.reviewCount} Bewertungen)
                  </span>
                </div>
              )}
              {selectedRestaurant.priceLevel && (
                <span className="text-gray-700 font-medium text-lg">
                  {getPriceLevelDisplay(selectedRestaurant.priceLevel)}
                </span>
              )}
            </div>

            {selectedRestaurant.isOpen !== undefined && (
              <div
                className={`inline-block px-3 py-1.5 rounded-lg text-sm font-medium ${
                  selectedRestaurant.isOpen
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {selectedRestaurant.isOpen ? 'Jetzt geöffnet' : 'Geschlossen'}
              </div>
            )}

            <div className="flex items-start gap-3 text-gray-700">
              <FaMapMarkerAlt size={18} className="mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">{selectedRestaurant.address}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedRestaurant.distance} km entfernt
                </p>
              </div>
            </div>

            {selectedRestaurant.phoneNumber && (
              <div className="flex items-center gap-3 text-gray-700">
                <FaPhone size={16} className="flex-shrink-0" />
                <a
                  href={`tel:${selectedRestaurant.phoneNumber}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {selectedRestaurant.phoneNumber}
                </a>
              </div>
            )}

            {selectedRestaurant.website && (
              <div className="flex items-center gap-3 text-gray-700">
                <FaGlobe size={16} className="flex-shrink-0" />
                <a
                  href={selectedRestaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors truncate"
                >
                  Website besuchen
                </a>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRestaurant.coordinates.lat},${selectedRestaurant.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
              >
                Route in Google Maps anzeigen
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
