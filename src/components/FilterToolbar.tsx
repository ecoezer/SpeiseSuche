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
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-600" />
          <h3 className="font-semibold text-gray-800">Filter & Sortierung</h3>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
              Aktiv
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <FaTimes />
            Zurücksetzen
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mindestbewertung
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(filters.minRating === rating ? 0 : rating)}
                className={`p-2 rounded transition-colors ${
                  filters.minRating >= rating
                    ? 'text-yellow-500'
                    : 'text-gray-300 hover:text-gray-400'
                }`}
              >
                <FaStar size={20} />
              </button>
            ))}
          </div>
          {filters.minRating > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Mindestens {filters.minRating} Stern{filters.minRating !== 1 ? 'e' : ''}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <button
            onClick={handleOpenToggle}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.onlyOpen
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filters.onlyOpen ? 'Nur geöffnete' : 'Alle anzeigen'}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sortieren nach
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
