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
    <div className="space-y-5">
      <form onSubmit={handleSearch} className="space-y-5">
        <div>
          <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700 mb-2">
            Postleitzahl
          </label>
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="z.B. 10115"
              maxLength={5}
              className="w-full pl-11 pr-11 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium transition-all shadow-sm hover:border-gray-400"
            />
            {postalCode && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes size={14} />
              </button>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="radius" className="text-sm font-semibold text-gray-700">
              Suchradius
            </label>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
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
            className="w-full appearance-none cursor-pointer slider"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <FaSearch size={14} />
          Restaurant suchen
        </button>
      </form>
    </div>
  );
};
