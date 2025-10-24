import React from 'react';
import { FaStar, FaFilter, FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

export const FilterToolbar: React.FC = () => {
  const { filters, setFilters } = useAppContext();

  const handleRatingChange = (rating: number) => {
    setFilters({ ...filters, minRating: rating });
  };

  const handleOpenToggle = () => {
    setFilters({ ...filters, onlyOpen: !filters.onlyOpen });
  };

  const handleSortChange = (sortBy: 'distance' | 'rating' | 'reviewCount' | 'name') => {
    setFilters({ ...filters, sortBy });
  };

  const clearFilters = () => {
    setFilters({
      minRating: 0,
      onlyOpen: false,
      sortBy: 'distance'
    });
  };

  const hasActiveFilters = filters.minRating > 0 || filters.onlyOpen || filters.sortBy !== 'distance';

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 mb-8 border border-slate-200/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 rounded-xl">
            <FaFilter className="text-white text-sm" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">Filter & Sortierung</h3>
          {hasActiveFilters && (
            <span className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-200">
              Aktiv
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300 bg-red-50 px-4 py-2 rounded-xl"
          >
            <FaTimes />
            Zurücksetzen
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Mindestbewertung
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(filters.minRating === rating ? 0 : rating)}
                className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                  filters.minRating >= rating
                    ? 'text-yellow-500 bg-yellow-50 shadow-lg scale-110'
                    : 'text-slate-300 hover:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <FaStar size={22} />
              </button>
            ))}
          </div>
          {filters.minRating > 0 && (
            <p className="text-xs text-slate-600 mt-2 font-medium">
              Mindestens {filters.minRating} Stern{filters.minRating !== 1 ? 'e' : ''}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Status
          </label>
          <button
            onClick={handleOpenToggle}
            className={`w-full px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
              filters.onlyOpen
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {filters.onlyOpen ? 'Nur geöffnete' : 'Alle anzeigen'}
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Sortieren nach
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as any)}
            className="w-full px-5 py-3.5 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-slate-50/50 font-medium transition-all duration-300"
          >
            <option value="distance">Entfernung</option>
            <option value="rating">Bewertung</option>
            <option value="reviewCount">Anzahl Bewertungen</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
