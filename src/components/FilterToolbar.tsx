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
    <div className="space-y-3">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={handleOpenToggle}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            filters.onlyOpen
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Öffnungszeiten
        </button>

        <button
          onClick={() => handleRatingChange(filters.minRating > 0 ? 0 : 4)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            filters.minRating > 0
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <FaStar size={12} />
          Bewertung
        </button>

        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as any)}
          className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 outline-none cursor-pointer"
        >
          <option value="distance">Entfernung</option>
          <option value="rating">Bewertung</option>
          <option value="reviewCount">Bewertungen</option>
          <option value="name">Name</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Zurücksetzen
          </button>
        )}
      </div>

      {filters.minRating > 0 && (
        <div className="flex gap-1 px-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`p-1 transition-colors ${
                filters.minRating >= rating
                  ? 'text-amber-400'
                  : 'text-gray-300 hover:text-gray-400'
              }`}
            >
              <FaStar size={14} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
