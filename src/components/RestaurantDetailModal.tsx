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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 animate-in slide-in-from-bottom duration-500">
        <div className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-slate-200 p-6 flex justify-between items-center z-10 rounded-t-3xl">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">{selectedRestaurant.name}</h2>
          <button
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-700 transition-all duration-300 p-3 hover:bg-slate-100 rounded-xl hover:scale-110 transform"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-8">
          {selectedRestaurant.photos && selectedRestaurant.photos.length > 0 && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={selectedRestaurant.photos[0]}
                alt={selectedRestaurant.name}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 border-b-2 border-blue-500 pb-3">Kontaktinformationen</h3>

              <div className="flex items-start gap-4 text-slate-700">
                <div className="bg-blue-100 p-2.5 rounded-xl">
                  <FaMapMarkerAlt className="text-blue-600" />
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
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="bg-green-100 p-2.5 rounded-xl">
                    <FaPhone className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <a href={`tel:${selectedRestaurant.phone}`} className="hover:text-blue-600">
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
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="bg-red-100 p-2.5 rounded-xl">
                    <FaEnvelope className="text-red-600" />
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
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="bg-purple-100 p-2.5 rounded-xl">
                    <FaGlobe className="text-purple-600" />
                  </div>
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
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="bg-slate-200 p-2.5 rounded-xl">
                    <FaUser className="text-slate-600" />
                  </div>
                  <span>{selectedRestaurant.contactPerson}</span>
                </div>
              )}
            </div>

            <div className="space-y-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 border-b-2 border-yellow-500 pb-3">Bewertung & Status</h3>

              {selectedRestaurant.rating && (
                <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
                  <FaStar className="text-yellow-500" size={24} />
                  <span className="text-3xl font-bold text-slate-800">{selectedRestaurant.rating}</span>
                  {selectedRestaurant.reviewCount && (
                    <span className="text-slate-600 font-medium">({selectedRestaurant.reviewCount} Bewertungen)</span>
                  )}
                </div>
              )}

              {selectedRestaurant.isOpen !== undefined && (
                <div>
                  <span
                    className={`inline-flex items-center px-4 py-2.5 rounded-xl font-bold shadow-sm ${
                      selectedRestaurant.isOpen
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300'
                        : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-300'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full mr-2 ${
                      selectedRestaurant.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                    }`} />
                    {selectedRestaurant.isOpen ? 'Jetzt geöffnet' : 'Geschlossen'}
                  </span>
                </div>
              )}

              {selectedRestaurant.distance !== undefined && (
                <div className="text-slate-700 bg-slate-100 p-3 rounded-xl">
                  <span className="font-bold">Entfernung:</span> <span className="text-blue-600 font-bold">{selectedRestaurant.distance} km</span>
                </div>
              )}
            </div>
          </div>

          {selectedRestaurant.openingHours?.weekdayText && (
            <div className="mb-8 bg-slate-50/50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 border-b-2 border-green-500 pb-3 mb-4">Öffnungszeiten</h3>
              <div className="grid grid-cols-1 gap-3">
                {selectedRestaurant.openingHours.weekdayText.map((day, index) => (
                  <div key={index} className="text-sm text-slate-700 font-medium bg-white p-3 rounded-xl shadow-sm">
                    {day}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedRestaurant.reviews && selectedRestaurant.reviews.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 border-b-2 border-yellow-500 pb-3 mb-5">Letzte Bewertungen</h3>
              <div className="space-y-5">
                {selectedRestaurant.reviews.slice(0, 3).map((review, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-bold text-slate-800 text-base">{review.author}</span>
                      <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1.5 rounded-lg">
                        <FaStar className="text-yellow-500" />
                        <span className="text-sm font-bold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6 border-t-2 border-slate-200">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedRestaurant.name + ' ' + selectedRestaurant.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <FaExternalLinkAlt size={18} />
              In Google Maps öffnen
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRestaurant.coordinates.lat},${selectedRestaurant.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <FaDirections size={18} />
              Routenplaner
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
