import React from 'react';
import { useAppContext } from '../context/AppContext';
import { RestaurantCard } from './RestaurantCard';

export const RestaurantList: React.FC = () => {
  const { filteredResults, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-6">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-orange-200 border-t-[#ff8000]"></div>
        </div>
        <p className="text-gray-900 font-bold text-xl">Suche läuft...</p>
        <p className="text-gray-500 text-base mt-3">Restaurants werden geladen</p>
      </div>
    );
  }

  if (filteredResults.length === 0) {
    return (
      <section className="mt-[18px] bg-[var(--card)] rounded-[var(--radius-xl)] shadow-[var(--shadow)] p-[clamp(28px,6vw,56px)] text-center" style={{ border: '1px solid #e8ecf0' }} aria-live="polite">
        <svg className="w-16 h-16 mx-auto mb-[14px] text-[#475569] opacity-90" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M20 20l-4.2-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <h3 className="my-[10px_0_8px] text-[clamp(22px,3vw,36px)] leading-tight tracking-tight font-bold">
          Keine Restaurants gefunden
        </h3>
        <p className="mx-auto max-w-[46ch] text-[var(--muted)] text-[clamp(16px,1.6vw,20px)] leading-normal">
          Versuchen Sie eine andere Postleitzahl oder erweitern Sie den Suchradius
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <h2 className="text-base font-bold text-gray-900">
          {filteredResults.length} {filteredResults.length === 1 ? 'Restaurant' : 'Restaurants'} gefunden
        </h2>
      </div>
      <div className="space-y-3">
        {filteredResults.map((restaurant) => (
          <RestaurantCard key={restaurant.placeId} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};
