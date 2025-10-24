import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
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
} from '../services/supabase';

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
    <section className="relative rounded-[var(--radius-xl)] p-[26px] shadow-[var(--shadow)]" style={{ background: 'linear-gradient(140deg, var(--primary) 0%, var(--primary-2) 100%)' }}>
      <button
        type="button"
        onClick={handleClear}
        className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-xl text-[#111] font-bold cursor-pointer transition-transform duration-75 hover:-translate-y-px"
        style={{ background: 'rgba(255,255,255,.22)', border: '1px solid rgba(255,255,255,.45)' }}
        aria-label="Schließen"
      >
        ✕
      </button>

      <form onSubmit={handleSearch}>
        <h2 className="m-0 mb-[14px] text-[clamp(20px,2.2vw,28px)] font-bold text-white leading-tight">
          Postleitzahl eingeben
        </h2>

        <div className="grid gap-[14px]">
          <label className="bg-white text-[var(--text)] rounded-[var(--radius-lg)] p-[14px_16px] flex items-center gap-[10px] shadow-[0_1px_0_rgba(16,24,40,.04)]" style={{ border: '1px solid rgba(16,24,40,.08)' }}>
            <FaMapMarkerAlt size={22} color="#0f172a" />
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="10115"
              maxLength={5}
              className="appearance-none border-none outline-none w-full text-lg bg-transparent"
              style={{ color: 'inherit' }}
            />
          </label>

          <label className="bg-white text-[var(--text)] rounded-[var(--radius-lg)] p-[14px_16px] flex items-center gap-[10px] shadow-[0_1px_0_rgba(16,24,40,.04)]" style={{ border: '1px solid rgba(16,24,40,.08)' }}>
            <span className="text-lg font-semibold">Umkreis: {searchRadius} km</span>
          </label>

          <input
            className="range"
            type="range"
            min="1"
            max="50"
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
          />
        </div>

        <button
          type="submit"
          className="block w-full border-none rounded-[var(--radius-lg)] px-5 py-[18px] text-[var(--accent)] font-extrabold text-[clamp(18px,2.4vw,26px)] tracking-tight cursor-pointer mt-[14px] transition-all duration-75 hover:brightness-105 hover:-translate-y-px active:translate-y-0 focus-visible:outline-[3px] focus-visible:outline-[var(--ring)] focus-visible:outline-offset-[3px]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,.35) 0%, rgba(255,255,255,.22) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6), var(--shadow)'
          }}
        >
          <svg className="inline-block mr-2.5 -mt-1" width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#0f172a" strokeWidth="2"/>
            <path d="M20 20l-3.5-3.5" stroke="#0f172a" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Restaurants finden
        </button>
      </form>
    </section>
  );
};
