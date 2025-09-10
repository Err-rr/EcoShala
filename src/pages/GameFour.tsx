import React, { useState, useEffect, useRef } from 'react';

const EcoSwipe = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing');
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const cardRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Environmental items database - 50 items with more challenging descriptions
  const environmentalItems = [
    // Easy items (less obvious)
    { id: 1, name: "Plastic Bottle", image: "🥤", impact: "bad", description: "Common single-use container", difficulty: "easy" },
    { id: 2, name: "Solar Panel", image: "☀️", impact: "good", description: "Converts sunlight to electricity", difficulty: "easy" },
    { id: 3, name: "Tree", image: "🌳", impact: "good", description: "Perennial plant with woody stem", difficulty: "easy" },
    { id: 4, name: "Coal Power", image: "🏭", impact: "bad", description: "Energy from combusted rock", difficulty: "easy" },
    { id: 5, name: "Recycling", image: "♻️", impact: "good", description: "Processing used materials", difficulty: "easy" },
    
    // Medium difficulty (more ambiguous)
    { id: 6, name: "Aluminum Can", image: "🥫", impact: "bad", description: "Lightweight metal container", difficulty: "medium" },
    { id: 7, name: "Electric Car", image: "🚗", impact: "good", description: "Vehicle powered by batteries", difficulty: "medium" },
    { id: 8, name: "Nuclear Energy", image: "⚛️", impact: "good", description: "Power from atomic fission", difficulty: "medium" },
    { id: 9, name: "Paper Bag", image: "🛍️", impact: "medium", description: "Container made from pulp", difficulty: "medium" },
    { id: 10, name: "Compost", image: "🍂", impact: "good", description: "Decayed organic matter", difficulty: "medium" },
    
    // Hard difficulty (requires specific knowledge)
    { id: 11, name: "CO₂", image: "CO₂", impact: "bad", description: "Colorless gas at room temperature", difficulty: "hard" },
    { id: 12, name: "CH₄", image: "CH₄", impact: "bad", description: "Simplest alkane hydrocarbon", difficulty: "hard" },
    { id: 13, name: "H₂O", image: "H₂O", impact: "good", description: "Universal solvent", difficulty: "hard" },
    { id: 14, name: "O₂", image: "O₂", impact: "good", description: "Diatomic gas essential for life", difficulty: "hard" },
    { id: 15, name: "NO₂", image: "NO₂", impact: "bad", description: "Reddish-brown toxic gas", difficulty: "hard" },
    
    // More items with chemical formulas
    { id: 16, name: "CFCs", image: "CFCs", impact: "bad", description: "Synthetic halogenated compounds", difficulty: "hard" },
    { id: 17, name: "SO₂", image: "SO₂", impact: "bad", description: "Colorless gas with pungent odor", difficulty: "hard" },
    { id: 18, name: "C₆H₁₂O₆", image: "C₆H₁₂O₆", impact: "good", description: "Simple sugar molecule", difficulty: "hard" },
    { id: 19, name: "Pb", image: "Pb", impact: "bad", description: "Heavy metal with atomic number 82", difficulty: "hard" },
    { id: 20, name: "Hg", image: "Hg", impact: "bad", description: "Liquid metal at room temperature", difficulty: "hard" },
    
    // Additional items for variety
    { id: 21, name: "Wind Turbine", image: "🌬️", impact: "good", description: "Device that converts wind energy", difficulty: "easy" },
    { id: 22, name: "Oil Spill", image: "🛢️", impact: "bad", description: "Release of liquid petroleum", difficulty: "easy" },
    { id: 23, name: "Bicycle", image: "🚴", impact: "good", description: "Human-powered vehicle", difficulty: "easy" },
    { id: 24, name: "Deforestation", image: "🌲", impact: "bad", description: "Clearing of forested areas", difficulty: "medium" },
    { id: 25, name: "Organic Farming", image: "🌾", impact: "good", description: "Agricultural method without synthetics", difficulty: "medium" },
    
    // More chemical compounds
    { id: 26, name: "N₂O", image: "N₂O", impact: "bad", description: "Colorless gas used in anesthesia", difficulty: "hard" },
    { id: 27, name: "O₃", image: "O₃", impact: "mixed", description: "Triatomic oxygen molecule", difficulty: "hard" },
    { id: 28, name: "C", image: "C", impact: "neutral", description: "Element with atomic number 6", difficulty: "hard" },
    { id: 29, name: "NH₃", image: "NH₃", impact: "bad", description: "Compound of nitrogen and hydrogen", difficulty: "hard" },
    { id: 30, name: "H₂SO₄", image: "H₂SO₄", impact: "bad", description: "Strong mineral acid", difficulty: "hard" },
    
    // More environmental concepts
    { id: 31, name: "Bee", image: "🐝", impact: "good", description: "Flying insect that pollinates", difficulty: "medium" },
    { id: 32, name: "Single-Use Plastic", image: "🥤", impact: "bad", description: "Disposable polymer products", difficulty: "easy" },
    { id: 33, name: "Public Transportation", image: "🚌", impact: "good", description: "Shared passenger transport", difficulty: "medium" },
    { id: 34, name: "Fast Fashion", image: "👕", impact: "bad", description: "Rapid production of clothing", difficulty: "medium" },
    { id: 35, name: "LED Bulb", image: "💡", impact: "good", description: "Solid-state lighting device", difficulty: "easy" },
    
    // Even more items to reach 50
    { id: 36, name: "Microplastics", image: "🔬", impact: "bad", description: "Tiny plastic fragments", difficulty: "medium" },
    { id: 37, name: "Rainwater Harvesting", image: "🌧️", impact: "good", description: "Collection of precipitation", difficulty: "medium" },
    { id: 38, name: "Pesticides", image: "⚠️", impact: "bad", description: "Chemicals used to control pests", difficulty: "medium" },
    { id: 39, name: "Composting", image: "🍃", impact: "good", description: "Aerobic decomposition process", difficulty: "easy" },
    { id: 40, name: "Carbon Footprint", image: "👣", impact: "bad", description: "Measure of emissions", difficulty: "medium" },
    
    { id: 41, name: "Biodegradable", image: "🔄", impact: "good", description: "Capable of decomposition", difficulty: "easy" },
    { id: 42, name: "Fossil Fuels", image: "⛽", impact: "bad", description: "Energy sources from ancient organisms", difficulty: "easy" },
    { id: 43, name: "Coral Bleaching", image: "🐠", impact: "bad", description: "Loss of coral coloration", difficulty: "hard" },
    { id: 44, name: "Green Roof", image: "🏠", impact: "good", description: "Rooftop vegetation system", difficulty: "medium" },
    { id: 45, name: "E-Waste", image: "📱", impact: "bad", description: "Discarded electronic devices", difficulty: "medium" },
    
    { id: 46, name: "Photosynthesis", image: "🌿", impact: "good", description: "Process using light to make food", difficulty: "hard" },
    { id: 47, name: "Ocean Acidification", image: "🌊", impact: "bad", description: "Decrease in ocean pH", difficulty: "hard" },
    { id: 48, name: "Permaculture", image: "🌻", impact: "good", description: "Sustainable design philosophy", difficulty: "medium" },
    { id: 49, name: "Thermal Pollution", image: "🔥", impact: "bad", description: "Temperature change in ecosystems", difficulty: "hard" },
    { id: 50, name: "Carbon Sequestration", image: "🌳", impact: "good", description: "Capture and storage of carbon", difficulty: "hard" }
  ];

  // Initialize game
  useEffect(() => {
    // Shuffle cards for random order
    const shuffledCards = [...environmentalItems]
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  // Handle swipe actions
  const handleSwipe = (direction) => {
    if (isAnimating || gameState !== 'playing') return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    const currentCard = cards[currentIndex];
    const isCorrect = 
      (direction === 'right' && currentCard.impact === 'good') ||
      (direction === 'left' && currentCard.impact !== 'good');
    
    // Show feedback
    setFeedbackMessage(isCorrect ? 'Correct! +10' : 'Incorrect!');
    setFeedbackType(isCorrect ? 'correct' : 'incorrect');
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
    
    // Move to next card after animation
    setTimeout(() => {
      if (currentIndex >= cards.length - 1) {
        setGameState('gameOver');
      } else {
        setCurrentIndex(prev => prev + 1);
      }
      setSwipeDirection(null);
      setIsAnimating(false);
      setShowFeedback(false);
    }, 800);
  };

  // Touch handling for swipe
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const diff = currentX - startX;
    const swipeThreshold = 50;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }
    
    setIsDragging(false);
    setCurrentX(0);
  };

  // Mouse handling for swipe
  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const diff = currentX - startX;
    const swipeThreshold = 50;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }
    
    setIsDragging(false);
    setCurrentX(0);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handleSwipe('left');
      if (e.key === 'ArrowRight') handleSwipe('right');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating]);

  // Restart game
  const restartGame = () => {
    const shuffledCards = [...environmentalItems]
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setCurrentIndex(0);
    setScore(0);
    setGameState('playing');
  };

  // Get current card
  const currentCard = cards[currentIndex];

  if (!currentCard && gameState === 'playing') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Calculate rotation and translation for drag
  const dragX = isDragging ? currentX - startX : 0;
  const rotate = dragX * 0.1;
  const translateX = dragX;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 p-4 font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          .pixel-border {
            border: 4px solid;
            border-image: repeating-linear-gradient(45deg, #4a7c59, #4a7c59 4px, #31572c 4px, #31572c 8px) 9;
            box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.2);
          }
          
          .pixel-button {
            border: 4px solid #4a7c59;
            box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
            transition: all 0.1s ease;
          }
          
          .pixel-button:hover {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
          }
          
          .pixel-card {
            border: 4px solid;
            border-image: repeating-linear-gradient(45deg, #ff6b6b, #ff6b6b 4px, #c44569 4px, #c44569 8px) 9;
            box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.2);
            image-rendering: pixelated;
          }
          
          .swipe-left {
            animation: swipeLeft 0.8s forwards;
          }
          
          .swipe-right {
            animation: swipeRight 0.8s forwards;
          }
          
          @keyframes swipeLeft {
            0% { transform: translateX(0) rotate(0deg); opacity: 1; }
            100% { transform: translateX(-100%) rotate(-30deg); opacity: 0; }
          }
          
          @keyframes swipeRight {
            0% { transform: translateX(0) rotate(0deg); opacity: 1; }
            100% { transform: translateX(100%) rotate(30deg); opacity: 0; }
          }
          
          .feedback-correct {
            color: #4a7c59;
            text-shadow: 2px 2px 0px #31572c;
          }
          
          .feedback-incorrect {
            color: #c44569;
            text-shadow: 2px 2px 0px #ff6b6b;
          }
        `}
      </style>

      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6 pixel-border bg-yellow-100 p-4">
          <h1 className="text-4xl font-bold text-green-800 mb-2" style={{ fontFamily: "'Press Start 2P', cursive" }}>ECO SWIPE</h1>
          <p className="text-gray-600 text-sm">Swipe based on environmental impact</p>
          <div className="text-lg font-bold text-green-700 mt-2">
            SCORE: {score} | {currentIndex + 1}/50
          </div>
        </div>

        {/* Feedback message */}
        {showFeedback && (
          <div className={`text-center text-xl font-bold mb-4 ${feedbackType === 'correct' ? 'feedback-correct' : 'feedback-incorrect'}`}>
            {feedbackMessage}
          </div>
        )}

        {/* Card container */}
        <div className="relative h-96 mb-8">
          {gameState === 'playing' && currentCard && (
            <div 
              ref={cardRef}
              className={`absolute w-full h-full bg-white rounded-lg p-6 flex flex-col justify-between pixel-card
                ${swipeDirection === 'left' ? 'swipe-left' : ''}
                ${swipeDirection === 'right' ? 'swipe-right' : ''}
              `}
              style={{
                transform: `translateX(${translateX}px) rotate(${rotate}deg)`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Card content */}
              <div className="text-center flex-grow flex flex-col justify-center">
                <div className="text-6xl mb-4" style={{ imageRendering: 'pixelated' }}>{currentCard.image}</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{currentCard.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{currentCard.description}</p>
                <div className={`inline-block px-3 py-1 rounded text-xs font-medium
                  ${currentCard.difficulty === 'easy' ? 'bg-green-200 text-green-800' : ''}
                  ${currentCard.difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' : ''}
                  ${currentCard.difficulty === 'hard' ? 'bg-red-200 text-red-800' : ''}
                `}>
                  {currentCard.difficulty.toUpperCase()}
                </div>
              </div>

              {/* Swipe hints */}
              <div className="flex justify-between items-center mt-4 text-xs">
                <div className="text-red-500 font-bold">← SWIPE LEFT</div>
                <div className="text-green-500 font-bold">SWIPE RIGHT →</div>
              </div>
            </div>
          )}

          {gameState === 'gameOver' && (
            <div className="absolute w-full h-full bg-white rounded-lg p-6 flex flex-col justify-center items-center pixel-border">
              <h2 className="text-2xl font-bold text-green-800 mb-4">GAME COMPLETE!</h2>
              <p className="text-lg text-gray-700 mb-2">FINAL SCORE: {score}</p>
              <p className="text-gray-600 text-sm mb-6">You've learned about 50 environmental items!</p>
              <button 
                onClick={restartGame}
                className="pixel-button bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-8 rounded text-lg"
              >
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>

        {/* Controls */}
        {gameState === 'playing' && (
          <div className="flex justify-center space-x-8">
            <button 
              onClick={() => handleSwipe('left')}
              className="pixel-button w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl"
            >
              ❌
            </button>
            <button 
              onClick={() => handleSwipe('right')}
              className="pixel-button w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl"
            >
              ✅
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 bg-white rounded-lg pixel-border">
          <h3 className="text-md font-bold text-green-800 mb-2">HOW TO PLAY:</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• SWIPE <span className="text-red-500 font-bold">LEFT</span> FOR HARMFUL ITEMS</li>
            <li>• SWIPE <span className="text-green-500 font-bold">RIGHT</span> FOR ECO-FRIENDLY ITEMS</li>
            <li>• USE ARROW KEYS, BUTTONS, OR DRAG THE CARD</li>
            <li>• SOME ITEMS ARE TRICKY - THINK CAREFULLY!</li>
          </ul>
        </div>

        {/* Educational info */}
        <div className="mt-4 p-4 bg-blue-100 rounded-lg pixel-border">
          <h3 className="text-md font-bold text-blue-800 mb-2">DID YOU KNOW?</h3>
          <p className="text-xs text-blue-600">
            Understanding environmental impacts helps us make better choices for our planet.
            Many everyday items have hidden environmental costs that aren't immediately obvious.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EcoSwipe;
