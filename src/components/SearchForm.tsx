import React, { useState } from 'react';
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
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
    <div className="relative bg-gradient-to-br from-[#ec9641] to-[#f7af62] rounded-xl shadow-md p-5">
      <button
        type="button"
        onClick={handleClear}
        className="absolute top-4 right-4 text-gray-800 hover:text-gray-900 transition-colors"
      >
        <FaTimes size={20} />
      </button>

      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="postalCode" className="block mb-2.5 text-base font-medium text-white">
            Postleitzahl eingeben
          </label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={17} />
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="10115"
              maxLength={5}
              className="w-full pl-12 pr-4 py-3 border-0 rounded-lg text-base focus:ring-2 focus:ring-orange-300 transition-all shadow-sm font-normal text-gray-700"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="mb-2">
            <label htmlFor="radius" className="text-base font-normal text-gray-800">
              Umkreis: {searchRadius} km
            </label>
          </div>
          <input
            type="range"
            id="radius"
            min="1"
            max="50"
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
            className="w-full appearance-none cursor-pointer slider-white h-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#fef4e8] hover:bg-[#fdefd6] text-gray-800 font-semibold text-base px-5 py-3.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Restaurants finden
        </button>
      </form>
    </div>
  );
};
