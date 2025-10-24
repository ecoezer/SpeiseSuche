import React from 'react';
import {
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaStar,
  FaUser,
  FaExternalLinkAlt,
  FaDirections
} from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

export const RestaurantDetailModal: React.FC = () => {
  const { selectedRestaurant, setSelectedRestaurant } = useAppContext();

  if (!selectedRestaurant) return null;

  const handleClose = () => {
    setSelectedRestaurant(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} wurde in die Zwischenablage kopiert`);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800">{selectedRestaurant.name}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6">
          {selectedRestaurant.photos && selectedRestaurant.photos.length > 0 && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={selectedRestaurant.photos[0]}
                alt={selectedRestaurant.name}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Kontaktinformationen</h3>

              <div className="flex items-start gap-3 text-gray-700">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-blue-600" />
                <div className="flex-1">
                  <p>{selectedRestaurant.address}</p>
                  <button
                    onClick={() => copyToClipboard(selectedRestaurant.address, 'Adresse')}
                    className="text-xs text-blue-600 hover:underline mt-1"
                  >
                    Kopieren
                  </button>
                </div>
              </div>

              {selectedRestaurant.phone && (
                <div className="flex items-center gap-3 text-gray-700">
                  <FaPhone className="flex-shrink-0 text-green-600" />
                  <div className="flex-1">
                    <a href={`tel:${selectedRestaurant.phone}`} className="hover:text-blue-600">
                      {selectedRestaurant.phone}
                    </a>
                    <button
                      onClick={() => copyToClipboard(selectedRestaurant.phone!, 'Telefonnummer')}
                      className="text-xs text-blue-600 hover:underline ml-2"
                    >
                      Kopieren
                    </button>
                  </div>
                </div>
              )}

              {selectedRestaurant.email && (
                <div className="flex items-center gap-3 text-gray-700">
                  <FaEnvelope className="flex-shrink-0 text-red-600" />
                  <div className="flex-1">
                    <a href={`mailto:${selectedRestaurant.email}`} className="hover:text-blue-600">
                      {selectedRestaurant.email}
                    </a>
                    <button
                      onClick={() => copyToClipboard(selectedRestaurant.email!, 'E-Mail')}
                      className="text-xs text-blue-600 hover:underline ml-2"
                    >
                      Kopieren
                    </button>
                  </div>
                </div>
              )}

              {selectedRestaurant.website && (
                <div className="flex items-center gap-3 text-gray-700">
                  <FaGlobe className="flex-shrink-0 text-purple-600" />
                  <a
                    href={selectedRestaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 flex items-center gap-1"
                  >
                    Website besuchen <FaExternalLinkAlt size={12} />
                  </a>
                </div>
              )}

              {selectedRestaurant.contactPerson && (
                <div className="flex items-center gap-3 text-gray-700">
                  <FaUser className="flex-shrink-0 text-gray-600" />
                  <span>{selectedRestaurant.contactPerson}</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Bewertung & Status</h3>

              {selectedRestaurant.rating && (
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" size={20} />
                  <span className="text-2xl font-bold">{selectedRestaurant.rating}</span>
                  {selectedRestaurant.reviewCount && (
                    <span className="text-gray-500">({selectedRestaurant.reviewCount} Bewertungen)</span>
                  )}
                </div>
              )}

              {selectedRestaurant.isOpen !== undefined && (
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-semibold ${
                      selectedRestaurant.isOpen
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {selectedRestaurant.isOpen ? 'Jetzt geöffnet' : 'Geschlossen'}
                  </span>
                </div>
              )}

              {selectedRestaurant.distance !== undefined && (
                <div className="text-gray-700">
                  <span className="font-semibold">Entfernung:</span> {selectedRestaurant.distance} km
                </div>
              )}
            </div>
          </div>

          {selectedRestaurant.openingHours?.weekdayText && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Öffnungszeiten</h3>
              <div className="grid grid-cols-1 gap-2">
                {selectedRestaurant.openingHours.weekdayText.map((day, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    {day}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedRestaurant.reviews && selectedRestaurant.reviews.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Letzte Bewertungen</h3>
              <div className="space-y-4">
                {selectedRestaurant.reviews.slice(0, 3).map((review, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-800">{review.author}</span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500 text-sm" />
                        <span className="text-sm">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedRestaurant.name + ' ' + selectedRestaurant.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <FaExternalLinkAlt />
              In Google Maps öffnen
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRestaurant.coordinates.lat},${selectedRestaurant.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <FaDirections />
              Routenplaner
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
