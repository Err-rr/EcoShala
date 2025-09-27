import { useState } from "react";
import { GoogleMap, LoadScript, StreetViewPanorama } from "@react-google-maps/api";

const famousPlaces = [
  { name: "Taj Mahal", lat: 27.1751, lng: 78.0421 },
  { name: "Eiffel Tower", lat: 48.8584, lng: 2.2945 },
  { name: "Statue of Liberty", lat: 40.6892, lng: -74.0445 },
  { name: "Great Wall of China", lat: 40.4319, lng: 116.5704 },
  { name: "Sydney Opera House", lat: -33.8568, lng: 151.2153 },
];

export default function Geo() {
  const [location, setLocation] = useState(famousPlaces[0]);

  // Pick a random place
  const goToRandomPlace = () => {
    const random = famousPlaces[Math.floor(Math.random() * famousPlaces.length)];
    setLocation(random);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center p-4">🌍 Eco Explorer</h1>
      <button
        onClick={goToRandomPlace}
        className="mx-auto mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        🎲 Drop Me Somewhere!
      </button>

      <LoadScript googleMapsApiKey={'AIzaSyBV-XRgC894KFSU7UZ6J1if4UD6zckcj4g'}>
        <div className="w-full flex-1">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat: location.lat, lng: location.lng }}
            zoom={14}
          >
            <StreetViewPanorama
              position={{ lat: location.lat, lng: location.lng }}
              visible={true}
              options={{ pov: { heading: 100, pitch: 0 }, zoom: 1 }}
            />
          </GoogleMap>
        </div>
      </LoadScript>
    </div>
  );
}
