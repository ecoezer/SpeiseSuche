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
    <div className="min-h-screen flex flex-col" style={{ background: '#faf8f5' }}>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-[#ff8500]">
            Restaurant Finder
          </h1>
        </div>
      </header>

      <main className="flex-1 py-8 px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <SearchForm />

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg flex justify-between items-start">
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
        </div>
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
