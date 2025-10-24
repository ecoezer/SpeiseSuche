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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-500 custom-scrollbar">
        <div className="sticky top-0 bg-[#ff8000] p-4 flex justify-between items-center z-10">
          <h2 className="text-lg font-medium text-white">{selectedRestaurant.name}</h2>
          <button
            onClick={handleClose}
            className="text-white hover:bg-white/20 transition-all duration-200 p-2 rounded-lg"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="p-6">
          {selectedRestaurant.photos && selectedRestaurant.photos.length > 0 && (
            <div className="mb-6 rounded-xl overflow-hidden">
              <img
                src={selectedRestaurant.photos[0]}
                alt={selectedRestaurant.name}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="space-y-4 bg-gray-50 p-5 rounded-xl">
              <h3 className="text-sm font-medium text-gray-900 border-b border-[#ff8000] pb-2">Kontaktinformationen</h3>

              <div className="flex items-start gap-3 text-gray-700">
                <div className="bg-[#ff8000] p-2 rounded-lg">
                  <FaMapMarkerAlt className="text-white" size={14} />
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
                  <div className="bg-[#ff8000] p-2 rounded-lg">
                    <FaPhone className="text-white" size={14} />
                  </div>
                  <div className="flex-1">
                    <a href={`tel:${selectedRestaurant.phone}`} className="hover:text-[#ff8000] font-medium text-sm">
                      {selectedRestaurant.phone}
                    </a>
                  </div>
                </div>
              )}

              {selectedRestaurant.email && (
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="bg-[#ff8000] p-2 rounded-lg">
                    <FaEnvelope className="text-white" size={14} />
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
                  <div className="bg-[#ff8000] p-2 rounded-lg">
                    <FaGlobe className="text-white" size={14} />
                  </div>
                  <a
                    href={selectedRestaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#ff8000] flex items-center gap-1 font-medium text-sm"
                  >
                    Website <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              )}

              {selectedRestaurant.contactPerson && (
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="bg-[#ff8000] p-2 rounded-lg">
                    <FaUser className="text-white" size={14} />
                  </div>
                  <span className="font-medium text-sm">{selectedRestaurant.contactPerson}</span>
                </div>
              )}
            </div>

            <div className="space-y-4 bg-gray-50 p-5 rounded-xl">
              <h3 className="text-sm font-medium text-gray-900 border-b border-[#ff8000] pb-2">Bewertung & Status</h3>

              {selectedRestaurant.rating && (
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
                  <FaStar className="text-[#ffc107]" size={20} />
                  <span className="text-2xl font-bold text-gray-900">{selectedRestaurant.rating}</span>
                  {selectedRestaurant.reviewCount && (
                    <span className="text-gray-600 font-medium text-sm">({selectedRestaurant.reviewCount})</span>
                  )}
                </div>
              )}

              {selectedRestaurant.isOpen !== undefined && (
                <div>
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-bold text-sm ${
                      selectedRestaurant.isOpen
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      selectedRestaurant.isOpen ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    {selectedRestaurant.isOpen ? 'Geöffnet' : 'Geschlossen'}
                  </span>
                </div>
              )}

              {selectedRestaurant.distance !== undefined && (
                <div className="text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-semibold text-sm">Entfernung:</span> <span className="text-[#ff8000] font-bold ml-1">{selectedRestaurant.distance} km</span>
                </div>
              )}
            </div>
          </div>

          {selectedRestaurant.openingHours?.weekdayText && (
            <div className="mb-6 bg-gray-50 p-5 rounded-xl">
              <h3 className="text-sm font-medium text-gray-900 border-b border-[#ff8000] pb-2 mb-3">Öffnungszeiten</h3>
              <div className="grid grid-cols-1 gap-2">
                {selectedRestaurant.openingHours.weekdayText.map((day, index) => (
                  <div key={index} className="text-sm text-gray-700 bg-white p-3 rounded-lg">
                    {day}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedRestaurant.reviews && selectedRestaurant.reviews.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 border-b border-[#ff8000] pb-2 mb-3">Bewertungen</h3>
              <div className="space-y-3">
                {selectedRestaurant.reviews.slice(0, 3).map((review, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-gray-900 text-sm">{review.author}</span>
                      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200">
                        <FaStar className="text-[#ffc107]" size={10} />
                        <span className="text-xs font-bold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-5 border-t border-gray-200">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedRestaurant.name + ' ' + selectedRestaurant.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#ff8000] hover:bg-[#ff6600] text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <FaExternalLinkAlt size={14} />
              Google Maps
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRestaurant.coordinates.lat},${selectedRestaurant.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#ff8000] hover:bg-[#ff6600] text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <FaDirections size={14} />
              Route
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
