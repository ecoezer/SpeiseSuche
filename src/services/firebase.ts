import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import type { Restaurant, Coordinates } from '../types/Restaurant';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface SearchRecord {
  postCode: string;
  radius: number;
  timestamp: number;
  resultCount: number;
  coordinates: Coordinates;
}

export const saveSearch = async (search: SearchRecord): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'searches'), {
      ...search,
      timestamp: Timestamp.fromMillis(search.timestamp),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving search:', error);
    throw error;
  }
};

export const saveRestaurant = async (restaurant: Restaurant): Promise<void> => {
  try {
    const restaurantRef = doc(db, 'restaurants', restaurant.placeId);
    await setDoc(restaurantRef, restaurant, { merge: true });
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
    const linkRef = doc(db, 'searches', searchId, 'results', placeId);
    await setDoc(linkRef, {
      placeId,
      distance,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error linking search to restaurant:', error);
    throw error;
  }
};
