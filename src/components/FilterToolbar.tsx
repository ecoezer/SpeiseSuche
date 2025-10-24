import React from 'react';
import { FaStar } from 'react-icons/fa';
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
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleOpenToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filters.onlyOpen
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Geöffnet
          </button>

          <button
            onClick={() => handleRatingChange(filters.minRating > 0 ? 0 : 4)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filters.minRating > 0
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaStar size={12} />
            Top bewertet
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Zurücksetzen
            </button>
          )}
        </div>

        <div>
          <label htmlFor="sortBy" className="text-xs font-semibold text-gray-600 mb-1.5 block">
            Sortierung
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as any)}
            className="w-full px-4 py-2.5 rounded-lg text-xs font-medium border border-gray-300 bg-white text-gray-700 hover:border-gray-400 outline-none cursor-pointer transition-all shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="distance">Entfernung</option>
            <option value="rating">Bewertung</option>
            <option value="reviewCount">Anzahl Bewertungen</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {filters.minRating > 0 && (
        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700">Mindestbewertung</span>
            <span className="text-xs font-bold text-amber-600">{filters.minRating}+ Sterne</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`p-2 transition-all rounded-lg ${
                  filters.minRating >= rating
                    ? 'text-amber-500 bg-white shadow-sm'
                    : 'text-gray-300 hover:text-gray-400 hover:bg-white/50'
                }`}
              >
                <FaStar size={16} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
