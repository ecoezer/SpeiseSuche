import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { SearchForm } from './components/SearchForm';
import { MapContainer } from './components/MapContainer';
import { RestaurantList } from './components/RestaurantList';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { FilterToolbar } from './components/FilterToolbar';
import { FaUtensils, FaMap, FaList } from 'react-icons/fa';

const AppContent: React.FC = () => {
  const { error, setError } = useAppContext();
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <FaUtensils className="text-blue-600 text-3xl" />
            <h1 className="text-2xl font-bold text-gray-800">Restaurant Finder</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <SearchForm />
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-700 hover:text-red-900 font-bold"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <FilterToolbar />

        <div className="hidden lg:grid lg:grid-cols-2 gap-6 h-[calc(100vh-400px)]">
          <div className="bg-white rounded-lg shadow-md p-4 overflow-hidden">
            <MapContainer />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 overflow-hidden">
            <RestaurantList />
          </div>
        </div>

        <div className="lg:hidden">
          <div className="bg-white rounded-lg shadow-md mb-4">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('map')}
                className={`flex-1 py-3 px-4 font-semibold flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'map'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaMap />
                Karte
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`flex-1 py-3 px-4 font-semibold flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaList />
                Liste
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 h-[calc(100vh-500px)]">
            {activeTab === 'map' ? <MapContainer /> : <RestaurantList />}
          </div>
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
