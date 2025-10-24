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
    <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 mb-8 border border-slate-200/60">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-2.5 rounded-xl">
            <FaFilter className="text-white text-sm" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Filter & Sortierung</h3>
          {hasActiveFilters && (
            <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-200">
              Aktiv
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-2 transition-all duration-200 bg-rose-50 px-4 py-2 rounded-lg hover:bg-rose-100"
          >
            <FaTimes />
            Zurücksetzen
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-3">
            Mindestbewertung
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(filters.minRating === rating ? 0 : rating)}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  filters.minRating >= rating
                    ? 'text-amber-500 bg-amber-50 shadow-sm'
                    : 'text-slate-300 hover:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <FaStar size={20} />
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
          <label className="block text-sm font-semibold text-slate-800 mb-3">
            Status
          </label>
          <button
            onClick={handleOpenToggle}
            className={`w-full px-5 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm ${
              filters.onlyOpen
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {filters.onlyOpen ? 'Nur geöffnete' : 'Alle anzeigen'}
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-3">
            Sortieren nach
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as any)}
            className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none bg-white font-medium transition-all duration-200 hover:border-slate-400"
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
