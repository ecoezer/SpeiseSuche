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
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 animate-in slide-in-from-bottom duration-500 custom-scrollbar">
        <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-slate-900">{selectedRestaurant.name}</h2>
          <button
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-700 transition-all duration-200 p-2 hover:bg-slate-100 rounded-lg"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <div className="p-8">
          {selectedRestaurant.photos && selectedRestaurant.photos.length > 0 && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <img
                src={selectedRestaurant.photos[0]}
                alt={selectedRestaurant.name}
                className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-300 pb-2">Kontaktinformationen</h3>

              <div className="flex items-start gap-3 text-slate-700">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <FaMapMarkerAlt className="text-indigo-600" />
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
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="bg-green-100 p-2 rounded-lg">
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
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="bg-rose-100 p-2 rounded-lg">
                    <FaEnvelope className="text-rose-600" />
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
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="bg-slate-200 p-2 rounded-lg">
                    <FaGlobe className="text-slate-700" />
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
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="bg-slate-200 p-2 rounded-lg">
                    <FaUser className="text-slate-600" />
                  </div>
                  <span>{selectedRestaurant.contactPerson}</span>
                </div>
              )}
            </div>

            <div className="space-y-4 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-300 pb-2">Bewertung & Status</h3>

              {selectedRestaurant.rating && (
                <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <FaStar className="text-amber-500" size={22} />
                  <span className="text-2xl font-bold text-slate-800">{selectedRestaurant.rating}</span>
                  {selectedRestaurant.reviewCount && (
                    <span className="text-slate-600 font-medium">({selectedRestaurant.reviewCount} Bewertungen)</span>
                  )}
                </div>
              )}

              {selectedRestaurant.isOpen !== undefined && (
                <div>
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold ${
                      selectedRestaurant.isOpen
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-50 text-rose-800 border border-rose-300'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      selectedRestaurant.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                    }`} />
                    {selectedRestaurant.isOpen ? 'Jetzt geöffnet' : 'Geschlossen'}
                  </span>
                </div>
              )}

              {selectedRestaurant.distance !== undefined && (
                <div className="text-slate-700 bg-indigo-50 p-3 rounded-lg">
                  <span className="font-semibold">Entfernung:</span> <span className="text-indigo-700 font-bold">{selectedRestaurant.distance} km</span>
                </div>
              )}
            </div>
          </div>

          {selectedRestaurant.openingHours?.weekdayText && (
            <div className="mb-8 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-300 pb-2 mb-4">Öffnungszeiten</h3>
              <div className="grid grid-cols-1 gap-2">
                {selectedRestaurant.openingHours.weekdayText.map((day, index) => (
                  <div key={index} className="text-sm text-slate-700 font-medium bg-white p-3 rounded-lg">
                    {day}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedRestaurant.reviews && selectedRestaurant.reviews.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-300 pb-2 mb-4">Letzte Bewertungen</h3>
              <div className="space-y-4">
                {selectedRestaurant.reviews.slice(0, 3).map((review, index) => (
                  <div key={index} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-slate-800 text-sm">{review.author}</span>
                      <div className="flex items-center gap-2 bg-amber-100 px-2.5 py-1 rounded-lg">
                        <FaStar className="text-amber-500 text-xs" />
                        <span className="text-xs font-semibold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6 border-t border-slate-200">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedRestaurant.name + ' ' + selectedRestaurant.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <FaExternalLinkAlt size={16} />
              In Google Maps öffnen
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRestaurant.coordinates.lat},${selectedRestaurant.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
