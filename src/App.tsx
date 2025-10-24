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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-2xl shadow-lg">
                <FaUtensils className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Restaurant Finder</h1>
                <p className="text-sm text-slate-500 font-medium">Entdecke Restaurants in deiner Nähe</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <SearchForm />
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-5 py-4 rounded-2xl flex justify-between items-center shadow-lg animate-in slide-in-from-top">
              <span className="font-medium">{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-700 hover:text-red-900 font-bold text-xl transition-transform hover:scale-110"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <FilterToolbar />

        <div className="hidden lg:grid lg:grid-cols-2 gap-6 h-[calc(100vh-400px)]">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-6 overflow-hidden">
            <MapContainer />
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-6 overflow-hidden">
            <RestaurantList />
          </div>
        </div>

        <div className="lg:hidden">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 mb-6 overflow-hidden">
            <div className="flex p-1.5">
              <button
                onClick={() => setActiveTab('map')}
                className={`flex-1 py-3.5 px-5 font-semibold flex items-center justify-center gap-2 transition-all duration-300 rounded-2xl ${
                  activeTab === 'map'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FaMap className={activeTab === 'map' ? 'text-lg' : ''} />
                Karte
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`flex-1 py-3.5 px-5 font-semibold flex items-center justify-center gap-2 transition-all duration-300 rounded-2xl ${
                  activeTab === 'list'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FaList className={activeTab === 'list' ? 'text-lg' : ''} />
                Liste
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-6 h-[calc(100vh-500px)]">
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
