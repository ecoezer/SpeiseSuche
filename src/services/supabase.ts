import { createClient } from '@supabase/supabase-js';
import type { Restaurant, Coordinates } from '../types/Restaurant';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SearchRecord {
  postCode: string;
  radius: number;
  timestamp: number;
  resultCount: number;
  coordinates: Coordinates;
}

export const saveSearch = async (search: SearchRecord): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('searches')
      .insert({
        post_code: search.postCode,
        radius: search.radius,
        timestamp: new Date(search.timestamp).toISOString(),
        result_count: search.resultCount,
        coordinates: search.coordinates,
      })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error saving search:', error);
    throw error;
  }
};

export const saveRestaurant = async (restaurant: Restaurant): Promise<void> => {
  try {
    const { error } = await supabase
      .from('restaurants')
      .upsert({
        place_id: restaurant.placeId,
        name: restaurant.name,
        address: restaurant.address,
        rating: restaurant.rating,
        review_count: restaurant.reviewCount,
        price_level: restaurant.priceLevel,
        is_open: restaurant.isOpen,
        phone_number: restaurant.phoneNumber,
        website: restaurant.website,
        photo_url: restaurant.photoUrl,
        distance: restaurant.distance,
        coordinates: restaurant.coordinates,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error saving restaurant:', error);
    throw error;
  }
};

export const linkSearchToRestaurant = async (
  searchId: string,
  placeId: string,
  distance: number
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('search_results')
      .insert({
        search_id: searchId,
        place_id: placeId,
        distance,
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error linking search to restaurant:', error);
    throw error;
  }
};
