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
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleOpenToggle}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold whitespace-nowrap transition-all border ${
            filters.onlyOpen
              ? 'bg-[#ff8000] text-white border-[#ff8000] shadow'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#ff8000]'
          }`}
        >
          Geöffnet
        </button>

        <button
          onClick={() => handleRatingChange(filters.minRating > 0 ? 0 : 4)}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold whitespace-nowrap transition-all border ${
            filters.minRating > 0
              ? 'bg-[#ff8000] text-white border-[#ff8000] shadow'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#ff8000]'
          }`}
        >
          <FaStar size={14} />
          Top bewertet
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto text-sm text-[#ff8000] hover:text-[#ff6600] font-semibold"
          >
            Zurücksetzen
          </button>
        )}
      </div>

      <div>
        <select
          id="sortBy"
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as any)}
          className="w-full px-5 py-3.5 rounded-lg text-base font-medium border border-gray-300 bg-white text-gray-700 hover:border-gray-400 outline-none cursor-pointer transition-all"
        >
          <option value="distance">Sortieren: Entfernung</option>
          <option value="rating">Sortieren: Bewertung</option>
          <option value="reviewCount">Sortieren: Anzahl Bewertungen</option>
          <option value="name">Sortieren: Name (A-Z)</option>
        </select>
      </div>

      {filters.minRating > 0 && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Mindestbewertung</span>
            <span className="text-sm font-bold text-amber-600">{filters.minRating}+ Sterne</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`p-3 transition-all rounded-lg ${
                  filters.minRating >= rating
                    ? 'text-amber-500 bg-white shadow-sm'
                    : 'text-gray-300 hover:text-gray-400 hover:bg-white/50'
                }`}
              >
                <FaStar size={18} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
