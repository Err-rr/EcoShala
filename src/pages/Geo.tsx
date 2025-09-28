import { useState, useRef } from "react";
import { GoogleMap, LoadScript, StreetViewPanorama } from "@react-google-maps/api";

// Famous Indian landmarks with alternative names for better matching
const famousPlaces = [
  { 
    name: "India Gate", 
    lat: 28.6129, 
    lng: 77.2295,
    aliases: ["india gate", "war memorial", "delhi gate", "new delhi", "india"]
  },
  { 
    name: "Red Fort", 
    lat: 28.6562, 
    lng: 77.2410,
    aliases: ["red fort", "lal qila", "lal kila", "delhi fort", "red", "fort"]
  },
  { 
    name: "Hawa Mahal", 
    lat: 26.9239, 
    lng: 75.8267,
    aliases: ["hawa mahal", "palace of winds", "jaipur palace", "pink palace", "hawa", "mahal", "palace"]
  },
  {
    name: "Taj Mahal",
    lat: 27.1751,
    lng: 78.0421,
    aliases: ["taj mahal", "taj", "agra", "monument of love", "white marble", "mausoleum"]
  },
  {
    name: "Gateway of India",
    lat: 18.9220,
    lng: 72.8347,
    aliases: ["gateway of india", "gateway", "mumbai", "bombay", "arch", "monument"]
  }
];

// Use exact coordinates for better Street View coverage
function getLocationCoordinates(place: any) {
  // Use exact coordinates for famous landmarks to ensure Street View availability
  return { lat: place.lat, lng: place.lng };
}

export default function Geo() {
  const [location, setLocation] = useState(famousPlaces[0]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [cleanliness, setCleanliness] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [actualLocationName, setActualLocationName] = useState("");
  const [actualLocationObject, setActualLocationObject] = useState(null);
  const [nextLocation, setNextLocation] = useState(null);
  const lastClickRef = useRef<number>(0);

  // Random location picker
  const goToRandomPlace = () => {
    const now = Date.now();
    if (now - lastClickRef.current < 1000) return;
    lastClickRef.current = now;

    let randomPlace = famousPlaces[Math.floor(Math.random() * famousPlaces.length)];
    while (randomPlace.name === location.name) {
      randomPlace = famousPlaces[Math.floor(Math.random() * famousPlaces.length)];
    }

    const coordinates = getLocationCoordinates(randomPlace);
    const newLocation = { name: randomPlace.name, lat: coordinates.lat, lng: coordinates.lng };
    
    // Set the next location and show popup
    setNextLocation(newLocation);
    setActualLocationName(randomPlace.name);
    setActualLocationObject(randomPlace);
    setShowPopup(true);
    setUserGuess("");
    setCleanliness(0);
    setShowResult(false);
  };

  const handleSubmitGuess = () => {
    const userGuessLower = userGuess.toLowerCase().trim();
    
    console.log("User guess:", userGuess);
    console.log("User guess (lowercase):", userGuessLower);
    console.log("Actual location name:", actualLocationName);
    console.log("Actual location object:", actualLocationObject);
    
    // Improved matching logic
    let correct = false;
    
    if (actualLocationObject && actualLocationObject.aliases) {
      // Check against all aliases
      correct = actualLocationObject.aliases.some(alias => {
        const aliasLower = alias.toLowerCase();
        console.log(`Checking alias: "${aliasLower}" against guess: "${userGuessLower}"`);
        
        // Check if user guess contains the alias or vice versa
        return userGuessLower.includes(aliasLower) || aliasLower.includes(userGuessLower);
      });
    }
    
    // Also check against the main location name
    if (!correct && actualLocationName) {
      const locationLower = actualLocationName.toLowerCase();
      correct = userGuessLower.includes(locationLower) || locationLower.includes(userGuessLower);
    }
    
    console.log("Is correct:", correct);
    
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleContinue = () => {
    setLoading(true);
    setShowPopup(false);
    setShowResult(false);
    
    // Load the new location after a delay to bypass API rate limiting
    setTimeout(() => {
      if (nextLocation) {
        setLocation(nextLocation);
        setNextLocation(null);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-2 text-center">🌍 Eco Explorer 3D India</h1>
      <button
        onClick={goToRandomPlace}
        disabled={showPopup || loading}
        className="mb-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        🎲 Drop Me Somewhere!
      </button>

      {/* Only show location name when not in popup mode */}
      {!showPopup && (
        <h2 className="text-xl font-semibold mb-2">Exploring India...</h2>
      )}

      {loading ? (
        <div className="flex justify-center items-center w-full h-96">
          <p className="text-lg font-medium">Loading new location...</p>
        </div>
      ) : (
        <div className="relative w-full flex-1 h-96 rounded shadow-md">
          <LoadScript googleMapsApiKey={'AIzaSyBV-XRgC894KFSU7UZ6J1if4UD6zckcj4g'}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: location.lat, lng: location.lng }}
              zoom={14}
              options={{
                disableDefaultUI: true,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                // Removed gestureHandling: 'none' to allow user interaction
              }}
            >
              <StreetViewPanorama
                key={`${location.name}-${location.lat}-${location.lng}`}
                position={{ lat: location.lat, lng: location.lng }}
                visible={true}
                options={{
                  pov: { heading: Math.random() * 360, pitch: 0 },
                  zoom: 1,
                  motionTracking: true,
                  enableCloseButton: false,
                  scrollwheel: true,
                  clickToGo: true,
                  panControl: true,
                  addressControl: false,
                  linksControl: true,
                  showRoadLabels: false,
                  fullscreenControl: false,
                  imageDateControl: false,
                  // Enable all movement controls
                  disableDoubleClickZoom: false,
                  keyboardShortcuts: true
                }}
              />
            </GoogleMap>
          </LoadScript>

          {/* Popup Modal */}
          {showPopup && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                {!showResult ? (
                  <>
                    <h3 className="text-xl font-bold mb-4 text-center">🔍 Guess the Location!</h3>
                    
                    <div className="mb-4">
                      <label className="block font-medium mb-2">Where do you think this is?</label>
                      <input
                        type="text"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        placeholder="Enter your guess..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && userGuess.trim() && cleanliness > 0) {
                            handleSubmitGuess();
                          }
                        }}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block font-medium mb-2">Rate the Cleanliness (1-5):</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setCleanliness(star)}
                            className={`text-2xl ${
                              star <= cleanliness ? 'text-yellow-500' : 'text-gray-300'
                            } hover:text-yellow-400 transition-colors`}
                          >
                            ⭐
                          </button>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{cleanliness}/5 stars</p>
                    </div>

                    <button
                      onClick={handleSubmitGuess}
                      disabled={!userGuess.trim() || cleanliness === 0}
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Submit Guess
                    </button>
                    
                    {(!userGuess.trim() || cleanliness === 0) && (
                      <p className="text-sm text-red-500 mt-2 text-center">
                        Please enter a guess and rate the cleanliness
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      {isCorrect ? (
                        <div>
                          <h3 className="text-xl font-bold text-green-600 mb-2">🎉 Correct!</h3>
                          <p className="text-lg">You guessed it right!</p>
                          <p className="font-semibold">Location: {actualLocationName}</p>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-xl font-bold text-red-600 mb-2">❌ Not Quite!</h3>
                          <p className="text-lg mb-2">Your guess: <span className="font-medium">{userGuess}</span></p>
                          <p className="font-semibold">Actual location: {actualLocationName}</p>
                        </div>
                      )}
                    </div>

                    <div className="mb-4 text-center">
                      <p className="text-sm text-gray-600">Cleanliness rating: {cleanliness}/5 ⭐</p>
                      <p className="text-sm text-green-600 mt-2">+10 EcoShala points earned! 🌱</p>
                    </div>

                    <button
                      onClick={handleContinue}
                      className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Continue Exploring
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Current location info (only when not in popup) */}
          {!showPopup && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-lg p-3 shadow-md">
              <p className="text-center font-medium text-green-700">
                🌍 Use mouse/touch to look around and navigate in 3D! Click "Drop Me Somewhere" for a new challenge.
              </p>
            </div>
          )}
          
          {/* Controls info */}
          {!showPopup && (
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-md">
              <p className="text-xs text-gray-600">
                <strong>Controls:</strong><br/>
                • Drag to look around<br/>
                • Scroll to zoom<br/>
                • Click arrows to move
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}