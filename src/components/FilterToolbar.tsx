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


  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleOpenToggle}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all border ${
            filters.onlyOpen
              ? 'bg-gray-800 text-white border-gray-800 shadow-sm'
              : 'bg-[#f5f5f5] text-gray-700 border-transparent hover:bg-gray-200'
          }`}
        >
          <span className="text-base">☀️</span>
          Geöffnet
        </button>

        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-800 text-white border border-gray-800 shadow-sm">
          <span className="text-base">⚡</span>
          <span>Top bewertet</span>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as any)}
            className="bg-transparent border-none text-white outline-none cursor-pointer font-medium text-sm appearance-none pr-5 bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27white%27 viewBox=%270 0 20 20%27%3e%3cpath d=%27M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z%27/%3e%3c/svg%3e')] bg-no-repeat bg-right"
          >
            <option value="distance">Entfernung</option>
            <option value="rating">Bewertung</option>
            <option value="reviewCount">Anzahl Bewertungen</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {filters.minRating > 0 && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Mindestbewertung</span>
            <span className="text-sm font-medium text-amber-600">{filters.minRating}+ Sterne</span>
          </div>
          <div className="flex gap-2">
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
