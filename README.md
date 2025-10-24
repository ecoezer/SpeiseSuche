# Restaurant Finder

A modern web application to search for restaurants based on postal code and radius, displaying results on an interactive Google Maps view with detailed information.

## Features

- **Search Functionality**: Search restaurants by postal code and specify search radius (1-50 km)
- **Interactive Map**: Visual display of restaurants on Google Maps with markers
- **Detailed List View**: Comprehensive restaurant information including:
  - Name and address
  - Phone number, email, and website
  - Contact person information
  - Ratings and reviews
  - Opening hours
  - Current open/closed status
  - Distance from search center
- **Filtering & Sorting**:
  - Filter by minimum rating
  - Show only open restaurants
  - Sort by distance, rating, review count, or name
- **Detailed Modal**: Click any restaurant to view full details, photos, and reviews
- **Firebase Integration**: All search results are saved to Firestore for future reference
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Prerequisites

Before running this application, you need:

1. **Google Maps API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
     - Geocoding API
   - Create credentials (API Key)
   - Add the API key to your `.env` file

2. **Firebase Project** (Already configured)
   - The Firebase credentials are already set up in the `.env` file
   - Firestore Database is ready to use

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - The `.env` file already contains Firebase credentials
   - Add your Google Maps API key:
```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # React components
│   ├── SearchForm.tsx          # Search input form
│   ├── MapContainer.tsx        # Google Maps integration
│   ├── RestaurantList.tsx      # List of restaurants
│   ├── RestaurantCard.tsx      # Individual restaurant card
│   ├── RestaurantDetailModal.tsx  # Detailed view modal
│   └── FilterToolbar.tsx       # Filter and sort controls
├── services/          # API services
│   ├── firebase.ts            # Firebase/Firestore operations
│   └── googleMaps.ts          # Google Maps API integration
├── context/           # React Context
│   └── AppContext.tsx         # Global state management
├── types/             # TypeScript types
│   └── index.ts              # Type definitions
└── App.tsx           # Main application component
```

## How to Use

1. **Search for Restaurants**:
   - Enter a German postal code (5 digits)
   - Adjust the search radius using the slider (1-50 km)
   - Click "Suchen" (Search) button

2. **View Results**:
   - **Map View**: See all restaurants as markers on the map
   - **List View**: Scroll through detailed restaurant cards
   - On mobile: Toggle between Map and List views using tabs

3. **Interact with Results**:
   - Click any restaurant card to center it on the map
   - Hover over cards to highlight markers on the map
   - Click "Details anzeigen" to view full restaurant information

4. **Filter and Sort**:
   - Set minimum rating filter (1-5 stars)
   - Toggle "Only Open" to show only currently open restaurants
   - Sort by distance, rating, review count, or name

5. **View Details**:
   - Click on any restaurant for the detailed modal
   - View photos, full contact information, and reviews
   - Get directions or open in Google Maps

## Firebase Data Structure

The application stores data in three Firestore collections:

### searches
```javascript
{
  postCode: string,
  radius: number,
  timestamp: Timestamp,
  resultCount: number,
  coordinates: { lat: number, lng: number }
}
```

### restaurants
```javascript
{
  placeId: string,
  name: string,
  address: string,
  phone: string,
  email: string,
  website: string,
  contactPerson: string,
  rating: number,
  reviewCount: number,
  openingHours: object,
  coordinates: { lat: number, lng: number },
  photos: string[],
  // ... more fields
}
```

### search_results
```javascript
{
  searchId: string,
  restaurantId: string,
  distance: number,
  timestamp: Timestamp
}
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Firebase/Firestore** - Database
- **Google Maps JavaScript API** - Maps and location services
- **Google Places API** - Restaurant data
- **React Icons** - Icon library

## Important Notes

- **Google Maps API Key**: Make sure to add HTTP referrer restrictions to your API key for security
- **Firebase**: All search results are automatically saved to Firestore
- **Caching**: The application checks for cached searches (within 24 hours) to reduce API calls
- **Rate Limits**: Be aware of Google Places API rate limits and quotas

## Troubleshooting

1. **Map not loading**: Check if your Google Maps API key is correctly set in `.env`
2. **No search results**: Verify that Places API is enabled in your Google Cloud project
3. **Firebase errors**: Ensure Firestore rules allow read/write operations
4. **Build errors**: Run `npm install` to ensure all dependencies are installed

## License

This project is private and confidential.
