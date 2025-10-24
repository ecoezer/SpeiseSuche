import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { SearchForm } from './components/SearchForm';
import { RestaurantList } from './components/RestaurantList';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { FilterToolbar } from './components/FilterToolbar';
import { FaTimes } from 'react-icons/fa';

const AppContent: React.FC = () => {
  const { error, setError } = useAppContext();

  return (
    <div className="min-h-screen">
      <main className="max-w-[980px] mx-auto px-5 pt-7 pb-16">
        <h1 className="font-extrabold tracking-tight text-[clamp(32px,4vw,56px)] text-[var(--primary)] mb-[18px] leading-none">
          Restaurant Finder
        </h1>

        <SearchForm />

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg flex justify-between items-start mt-[18px]">
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 ml-4 transition-colors"
            >
              <FaTimes size={14} />
            </button>
          </div>
        )}

        <FilterToolbar />

        <RestaurantList />
      </main>

      <RestaurantDetailModal />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
