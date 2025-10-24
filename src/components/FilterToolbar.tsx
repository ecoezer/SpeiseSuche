import React from 'react';
import { useAppContext } from '../context/AppContext';

export const FilterToolbar: React.FC = () => {
  const { filters, setFilters } = useAppContext();

  const handleOpenToggle = () => {
    setFilters({ ...filters, onlyOpen: !filters.onlyOpen });
  };

  const handleSortChange = (sortBy: 'distance' | 'rating' | 'reviewCount' | 'name') => {
    setFilters({ ...filters, sortBy });
  };

  return (
    <section className="grid gap-[14px] mt-[18px] mb-[10px]" style={{ gridTemplateColumns: '1fr' }} aria-label="Filter">
      <div
        className="bg-white text-[var(--text)] rounded-2xl px-4 py-[14px] flex items-center gap-2.5 font-semibold cursor-pointer shadow-[0_1px_0_rgba(16,24,40,.04)] hover:bg-[#fdfdfd]"
        style={{ border: '1px solid rgba(16,24,40,.10)' }}
        role="button"
        aria-pressed={filters.onlyOpen}
        onClick={handleOpenToggle}
      >
        <span className="w-[22px] h-[22px] rounded-full grid place-items-center bg-[#0f172a0f] text-[#0f172a] text-sm">
          ◐
        </span>
        Geöffnet
      </div>

      <div
        className="bg-white text-[var(--text)] rounded-2xl px-4 py-[14px] flex items-center justify-between gap-2.5 font-semibold shadow-[0_1px_0_rgba(16,24,40,.04)]"
        style={{ border: '1px solid rgba(16,24,40,.10)' }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-[22px] h-[22px] rounded-full grid place-items-center bg-[#0f172a0f] text-[#0f172a] text-sm">
            ⚡
          </span>
          Top bewertet
        </div>
        <span aria-hidden="true">▾</span>
      </div>

      <div
        className="bg-white text-[var(--text)] rounded-2xl px-4 py-[14px] flex items-center justify-between gap-2.5 font-semibold shadow-[0_1px_0_rgba(16,24,40,.04)] cursor-default"
        style={{ border: '1px solid rgba(16,24,40,.10)' }}
      >
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as any)}
          className="appearance-none border-none outline-none bg-transparent w-full cursor-pointer font-semibold"
        >
          <option value="distance">Sortieren: Entfernung</option>
          <option value="rating">Sortieren: Bewertung</option>
          <option value="reviewCount">Sortieren: Anzahl Bewertungen</option>
          <option value="name">Sortieren: Name (A-Z)</option>
        </select>
        <span aria-hidden="true">▾</span>
      </div>
    </section>
  );
};
