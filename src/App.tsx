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
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Restaurant Finder
          </h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`${sidebarOpen ? 'w-[420px]' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden shadow-lg`}>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <SearchForm />
            </div>

            {error && (
              <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl flex justify-between items-start text-sm shadow-sm">
                <span className="leading-relaxed">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-800 ml-3 mt-0.5 transition-colors"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            )}

            <div className="px-6 py-4 border-b border-gray-100">
              <FilterToolbar />
            </div>

            <div className="flex-1 overflow-hidden">
              <RestaurantList />
            </div>
          </div>
        </aside>

        <div className="flex-1 relative">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-6 left-6 z-10 bg-white shadow-xl rounded-xl p-3.5 hover:bg-gray-50 transition-all duration-200 hover:shadow-2xl hover:scale-105 border border-gray-200"
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
