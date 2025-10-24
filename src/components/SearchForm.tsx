import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import {
  geocodePostalCode,
  searchNearbyRestaurants,
  getPlaceDetails,
  convertPlaceToRestaurant
} from '../services/googleMaps';
import {
  saveSearch,
  saveRestaurant,
  linkSearchToRestaurant
} from '../services/firebase';

export const SearchForm: React.FC = () => {
  const {
    setSearchResults,
    setIsLoading,
    setError,
    setCenterCoordinates,
    searchRadius,
    setSearchRadius,
    mapInstance
  } = useAppContext();

  const [postalCode, setPostalCode] = useState('');

  const validatePostalCode = (code: string): boolean => {
    const germanPostalCodeRegex = /^\d{5}$/;
    return germanPostalCodeRegex.test(code);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postalCode.trim()) {
      setError('Bitte geben Sie eine Postleitzahl ein');
      return;
    }

    if (!validatePostalCode(postalCode)) {
      setError('Bitte geben Sie eine gültige 5-stellige Postleitzahl ein');
      return;
    }

    if (!mapInstance) {
      setError('Karte wird geladen, bitte versuchen Sie es erneut');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const coordinates = await geocodePostalCode(postalCode);
      setCenterCoordinates(coordinates);

      const places = await searchNearbyRestaurants(coordinates, searchRadius, mapInstance);

      const restaurantsPromises = places.map(async (place) => {
        if (!place.place_id) return null;

        try {
          const details = await getPlaceDetails(place.place_id, mapInstance);
          return convertPlaceToRestaurant(details, coordinates);
        } catch (error) {
          console.error(`Error fetching details for place ${place.place_id}:`, error);
          return null;
        }
      });

      const restaurants = (await Promise.all(restaurantsPromises)).filter(
        (r): r is NonNullable<typeof r> => r !== null
      );

      setSearchResults(restaurants);

      const searchId = await saveSearch({
        postCode: postalCode,
        radius: searchRadius,
        timestamp: Date.now(),
        resultCount: restaurants.length,
        coordinates
      });

      for (const restaurant of restaurants) {
        await saveRestaurant(restaurant);
        await linkSearchToRestaurant(searchId, restaurant.placeId, restaurant.distance || 0);
      }

      if (restaurants.length === 0) {
        setError('Keine Restaurants in diesem Bereich gefunden');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(
        error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPostalCode('');
    setSearchResults([]);
    setCenterCoordinates(null);
    setError(null);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 mb-8 border border-slate-200/50">
      <form onSubmit={handleSearch} className="space-y-6">
        <div>
          <label htmlFor="postalCode" className="block text-sm font-semibold text-slate-700 mb-3">
            Postleitzahl
          </label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="z.B. 10115"
            maxLength={5}
            className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 text-lg font-medium bg-slate-50/50"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="radius" className="block text-sm font-semibold text-slate-700">
              Suchradius
            </label>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {searchRadius} km
            </span>
          </div>
          <input
            type="range"
            id="radius"
            min="1"
            max="50"
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full appearance-none cursor-pointer accent-blue-600 slider"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
            <span>1 km</span>
            <span>50 km</span>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            <FaSearch className="text-lg" />
            Suchen
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 transform"
          >
            <FaTimes className="text-lg" />
            Löschen
          </button>
        </div>
      </form>
    </div>
  );
};
