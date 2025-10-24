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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50">
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl blur-lg opacity-40"></div>
              <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-600 p-3.5 rounded-2xl">
                <FaUtensils className="text-white text-2xl" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Restaurant Finder</h1>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Entdecke Restaurants in deiner Nähe</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-10">
        <div className="mb-8">
          <SearchForm />
          {error && (
            <div className="bg-red-50 border border-red-200/70 text-red-800 px-6 py-4 rounded-xl flex justify-between items-center shadow-sm animate-in slide-in-from-top">
              <span className="font-medium">{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800 font-bold text-xl transition-all hover:scale-110 ml-4"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <FilterToolbar />

        <div className="hidden lg:grid lg:grid-cols-2 gap-8 h-[calc(100vh-400px)]">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 p-6 overflow-hidden">
            <MapContainer />
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 p-6 overflow-hidden">
            <RestaurantList />
          </div>
        </div>

        <div className="lg:hidden">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 mb-6 overflow-hidden p-2">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('map')}
                className={`flex-1 py-3 px-5 font-semibold flex items-center justify-center gap-2 transition-all duration-300 rounded-xl ${
                  activeTab === 'map'
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FaMap className="text-base" />
                Karte
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`flex-1 py-3 px-5 font-semibold flex items-center justify-center gap-2 transition-all duration-300 rounded-xl ${
                  activeTab === 'list'
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FaList className="text-base" />
                Liste
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/60 p-6 h-[calc(100vh-500px)]">
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
