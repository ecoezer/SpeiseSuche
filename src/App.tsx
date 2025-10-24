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
    <div className="h-screen flex flex-col bg-white">
      <div className="flex flex-1 overflow-hidden">
        <aside className={`${sidebarOpen ? 'w-96' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <SearchForm />
            </div>

            {error && (
              <div className="mx-4 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center text-sm">
                <span>{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-800 ml-2"
                >
                  <FaTimes />
                </button>
              </div>
            )}

            <div className="px-4 py-3 border-b border-gray-200">
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
            className="absolute top-4 left-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            {sidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
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
