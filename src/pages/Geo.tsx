import { useState } from "react";
import { GoogleMap, LoadScript, StreetViewPanorama } from "@react-google-maps/api";

// Famous Indian landmarks
const famousPlaces = [
  { name: "Taj Mahal", lat: 27.1751, lng: 78.0421 },
  { name: "India Gate", lat: 28.6129, lng: 77.2295 },
  { name: "Gateway of India", lat: 18.9218, lng: 72.8347 },
];

// Function to generate a random point within radius (meters)
function randomLatLng(centerLat: number, centerLng: number, radiusInMeters: number) {
  const radiusInDegrees = radiusInMeters / 111300; // approximate conversion
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);
  const newLat = centerLat + y;
  const newLng = centerLat
    ? centerLng + x / Math.cos(centerLat * (Math.PI / 180))
    : centerLng + x;
  return { lat: newLat, lng: newLng };
}

export default function Geo() {
  const [location, setLocation] = useState(famousPlaces[0]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(famousPlaces[0].name);
  const [cleanliness, setCleanliness] = useState("Moderate");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(false);
    setLoading(true);

    // Find selected landmark
    const chosenPlace = famousPlaces.find((p) => p.name === selectedPlace)!;

    // Generate random point within 2 km radius
    const randomPoint = randomLatLng(chosenPlace.lat, chosenPlace.lng, 2000);

    // Save only coords (not the name)
    setLocation({
      name: cleanliness, // only store cleanliness level
      lat: randomPoint.lat,
      lng: randomPoint.lng,
    });

    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">🌍 Eco Explorer 3D India</h1>
      <button
        onClick={() => setShowPopup(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        🎲 Drop Me Somewhere!
      </button>

      {/* 🔴 Removed location.name display here */}

      {/* CSS to hide Google Maps labels (top-left info box, "View on Google Maps" link) */}
      <style>{`
        .gm-style-cc {
          display: block !important; /* Keep required attribution */
        }
        .gm-style > div:first-child > div[style*="z-index: 1000000"],
        .gm-style a[href*="maps.google.com"] {
          display: none !important;
        }
      `}</style>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Choose Location & Cleanliness</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <label className="flex flex-col">
                <span className="mb-1 font-medium">Location:</span>
                <select
                  value={selectedPlace}
                  onChange={(e) => setSelectedPlace(e.target.value)}
                  className="border rounded p-2"
                >
                  {famousPlaces.map((place) => (
                    <option key={place.name} value={place.name}>
                      {place.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col">
                <span className="mb-1 font-medium">Cleanliness Level:</span>
                <select
                  value={cleanliness}
                  onChange={(e) => setCleanliness(e.target.value)}
                  className="border rounded p-2"
                >
                  <option value="Clean">Clean</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Dirty">Dirty</option>
                </select>
              </label>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center w-full h-96">
          <p className="text-lg font-medium">Loading 3D view...</p>
        </div>
      ) : (
        <LoadScript googleMapsApiKey={"AIzaSyBV-XRgC894KFSU7UZ6J1if4UD6zckcj4g"}>
          <div className="w-full flex-1 h-96 rounded shadow-md">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: location.lat, lng: location.lng }}
              zoom={14}
            >
              <StreetViewPanorama
                key={`${location.lat}-${location.lng}-${location.name}`}
                position={{ lat: location.lat, lng: location.lng }}
                visible={true}
                options={{
                  pov: { heading: 100, pitch: 0 },
                  zoom: 1,
                  motionTracking: true,
                  enableCloseButton: false,
                  scrollwheel: true,
                  clickToGo: true,
                  panControl: true,
                }}
              />
            </GoogleMap>
          </div>
        </LoadScript>
      )}
    </div>
  );
}
