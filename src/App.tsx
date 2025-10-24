import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { SearchForm } from './components/SearchForm';
import { MapContainer } from './components/MapContainer';
import { RestaurantList } from './components/RestaurantList';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { FilterToolbar } from './components/FilterToolbar';
import { FaTimes, FaBars } from 'react-icons/fa';

const AppContent: React.FC = () => {
  const { error, setError } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-medium text-[#ff8000]">
            Restaurant Finder
          </h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`${sidebarOpen ? 'w-[520px]' : 'w-0'} transition-all duration-300 bg-white flex flex-col overflow-hidden border-r border-gray-200`}>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 py-6 bg-gradient-to-b from-[#ff8000] to-[#ff9933]">
              <SearchForm />
            </div>

            {error && (
              <div className="mx-4 mt-4 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg flex justify-between items-start text-sm">
                <span className="leading-relaxed font-medium">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-800 ml-4 transition-colors"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            )}

            <div className="px-4 py-4 bg-gray-50 border-b border-gray-200">
              <FilterToolbar />
            </div>

            <div className="flex-1 overflow-hidden bg-white">
              <RestaurantList />
            </div>
          </div>
        </aside>

        <div className="flex-1 relative">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 left-4 z-10 bg-white shadow-sm rounded-lg p-3 hover:bg-gray-50 transition-all duration-200 border border-gray-200"
          >
            {sidebarOpen ? <FaTimes size={18} className="text-gray-700" /> : <FaBars size={18} className="text-gray-700" />}
          </button>

          <MapContainer />
        </div>
      </div>

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
