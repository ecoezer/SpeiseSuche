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
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 animate-in slide-in-from-bottom duration-500 custom-scrollbar">
        <div className="sticky top-0 bg-white/98 backdrop-blur-xl border-b border-gray-200 p-6 flex justify-between items-center z-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">{selectedRestaurant.name}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-all duration-200 p-2.5 hover:bg-gray-100 rounded-xl"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-8">
          {selectedRestaurant.photos && selectedRestaurant.photos.length > 0 && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={selectedRestaurant.photos[0]}
                alt={selectedRestaurant.name}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-5 bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-3">Kontaktinformationen</h3>

              <div className="flex items-start gap-3 text-gray-700">
                <div className="bg-blue-100 p-2.5 rounded-xl">
                  <FaMapMarkerAlt className="text-blue-600" size={16} />
                </div>
                <div className="flex-1">
                  <p>{selectedRestaurant.address}</p>
                  <button
                    onClick={() => copyToClipboard(selectedRestaurant.address, 'Adresse')}
                    className="text-xs text-blue-600 hover:underline mt-1 font-semibold hover:text-blue-700"
                  >
                    Kopieren
                  </button>
                </div>
              </div>

              {selectedRestaurant.phone && (
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="bg-green-100 p-2.5 rounded-xl">
                    <FaPhone className="text-green-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <a href={`tel:${selectedRestaurant.phone}`} className="hover:text-blue-600 font-medium">
                      {selectedRestaurant.phone}
                    </a>
                    <button
                      onClick={() => copyToClipboard(selectedRestaurant.phone!, 'Telefonnummer')}
                      className="text-xs text-blue-600 hover:underline ml-2 font-semibold hover:text-blue-700"
                    >
                      Kopieren
                    </button>
                  </div>
                </div>
              )}

              {selectedRestaurant.email && (
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="bg-orange-100 p-2.5 rounded-xl">
                    <FaEnvelope className="text-orange-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <a href={`mailto:${selectedRestaurant.email}`} className="hover:text-blue-600">
                      {selectedRestaurant.email}
                    </a>
                    <button
                      onClick={() => copyToClipboard(selectedRestaurant.email!, 'E-Mail')}
                      className="text-xs text-blue-600 hover:underline ml-2 font-semibold hover:text-blue-700"
                    >
                      Kopieren
                    </button>
                  </div>
                </div>
              )}

              {selectedRestaurant.website && (
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="bg-gray-200 p-2.5 rounded-xl">
                    <FaGlobe className="text-gray-700" size={16} />
                  </div>
                  <a
                    href={selectedRestaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 flex items-center gap-1 font-medium"
                  >
                    Website besuchen <FaExternalLinkAlt size={12} />
                  </a>
                </div>
              )}

              {selectedRestaurant.contactPerson && (
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="bg-gray-200 p-2.5 rounded-xl">
                    <FaUser className="text-gray-700" size={16} />
                  </div>
                  <span className="font-medium">{selectedRestaurant.contactPerson}</span>
                </div>
              )}
            </div>

            <div className="space-y-5 bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-3">Bewertung & Status</h3>

              {selectedRestaurant.rating && (
                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-amber-100/50 p-5 rounded-xl border border-amber-300 shadow-sm">
                  <FaStar className="text-amber-500" size={24} />
                  <span className="text-3xl font-bold text-gray-900">{selectedRestaurant.rating}</span>
                  {selectedRestaurant.reviewCount && (
                    <span className="text-gray-700 font-semibold">({selectedRestaurant.reviewCount})</span>
                  )}
                </div>
              )}

              {selectedRestaurant.isOpen !== undefined && (
                <div>
                  <span
                    className={`inline-flex items-center px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm ${
                      selectedRestaurant.isOpen
                        ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-300'
                        : 'bg-red-50 text-red-800 border-2 border-red-300'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full mr-2.5 ${
                      selectedRestaurant.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                    }`} />
                    {selectedRestaurant.isOpen ? 'Jetzt geöffnet' : 'Geschlossen'}
                  </span>
                </div>
              )}

              {selectedRestaurant.distance !== undefined && (
                <div className="text-gray-700 bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <span className="font-semibold">Entfernung:</span> <span className="text-blue-700 font-bold text-lg ml-1">{selectedRestaurant.distance} km</span>
                </div>
              )}
            </div>
          </div>

          {selectedRestaurant.openingHours?.weekdayText && (
            <div className="mb-8 bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-3 mb-5">Öffnungszeiten</h3>
              <div className="grid grid-cols-1 gap-2.5">
                {selectedRestaurant.openingHours.weekdayText.map((day, index) => (
                  <div key={index} className="text-sm text-gray-700 font-medium bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    {day}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedRestaurant.reviews && selectedRestaurant.reviews.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-3 mb-5">Letzte Bewertungen</h3>
              <div className="space-y-4">
                {selectedRestaurant.reviews.slice(0, 3).map((review, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-bold text-gray-900 text-sm">{review.author}</span>
                      <div className="flex items-center gap-2 bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200">
                        <FaStar className="text-amber-500 text-xs" />
                        <span className="text-xs font-bold text-gray-900">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6 border-t border-gray-300">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedRestaurant.name + ' ' + selectedRestaurant.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <FaExternalLinkAlt size={16} />
              In Google Maps öffnen
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRestaurant.coordinates.lat},${selectedRestaurant.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <FaDirections size={16} />
              Routenplaner
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
