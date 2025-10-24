import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import type { Restaurant, Search } from '../types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const saveSearch = async (search: Omit<Search, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'searches'), {
      ...search,
      timestamp: Timestamp.fromMillis(search.timestamp)
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
    const existingDoc = await getDoc(restaurantRef);

    if (!existingDoc.exists()) {
      await setDoc(restaurantRef, {
        ...restaurant,
        timestamp: Timestamp.now()
      });
    }
  } catch (error) {
    console.error('Error saving restaurant:', error);
    throw error;
  }
};

export const linkSearchToRestaurant = async (
  searchId: string,
  restaurantId: string,
  distance: number
): Promise<void> => {
  try {
    await addDoc(collection(db, 'search_results'), {
      searchId,
      restaurantId,
      distance,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error('Error linking search to restaurant:', error);
    throw error;
  }
};

export const getSearchHistory = async (limitCount: number = 10): Promise<Search[]> => {
  try {
    const q = query(
      collection(db, 'searches'),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toMillis()
    })) as Search[];
  } catch (error) {
    console.error('Error getting search history:', error);
    throw error;
  }
};

export const checkCachedSearch = async (
  postCode: string,
  radius: number
): Promise<Search | null> => {
  try {
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);

    const q = query(
      collection(db, 'searches'),
      where('postCode', '==', postCode),
      where('radius', '==', radius),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const searchDoc = querySnapshot.docs[0];
      const searchData = {
        id: searchDoc.id,
        ...searchDoc.data(),
        timestamp: searchDoc.data().timestamp.toMillis()
      } as Search;

      if (searchData.timestamp > oneDayAgo) {
        return searchData;
      }
    }

    return null;
  } catch (error) {
    console.error('Error checking cached search:', error);
    return null;
  }
};

export const getRestaurantsBySearch = async (searchId: string): Promise<Restaurant[]> => {
  try {
    const q = query(
      collection(db, 'search_results'),
      where('searchId', '==', searchId)
    );

    const querySnapshot = await getDocs(q);
    const restaurantIds = querySnapshot.docs.map(doc => doc.data().restaurantId);

    const restaurants: Restaurant[] = [];
    for (const restaurantId of restaurantIds) {
      const restaurantDoc = await getDoc(doc(db, 'restaurants', restaurantId));
      if (restaurantDoc.exists()) {
        restaurants.push(restaurantDoc.data() as Restaurant);
      }
    }

    return restaurants;
  } catch (error) {
    console.error('Error getting restaurants by search:', error);
    throw error;
  }
};
