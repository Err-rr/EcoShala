import React, { useState, useRef, useEffect } from 'react';
import GameTwo from './GameTwo';

const GameTwo = () => {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'completed'
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [placedOrganisms, setPlacedOrganisms] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

  // Extended organism definitions with pixel art style emojis
  const organisms = {
    // Producers (Level 1) - Base of pyramid
    grass: { emoji: '🌱', name: 'Grass', type: 'producer', level: 1, color: '#10b981' },
    wheat: { emoji: '🌾', name: 'Wheat', type: 'producer', level: 1, color: '#f59e0b' },
    algae: { emoji: '🟢', name: 'Algae', type: 'producer', level: 1, color: '#059669' },
    flowers: { emoji: '🌸', name: 'Flowers', type: 'producer', level: 1, color: '#ec4899' },
    seaweed: { emoji: '🌿', name: 'Seaweed', type: 'producer', level: 1, color: '#16a34a' },
    moss: { emoji: '🟫', name: 'Moss', type: 'producer', level: 1, color: '#65a30d' },
    
    // Primary Consumers (Level 2) - Second tier
    rabbit: { emoji: '🐰', name: 'Rabbit', type: 'primary', level: 2, color: '#d97706', eats: ['grass', 'flowers'] },
    deer: { emoji: '🦌', name: 'Deer', type: 'primary', level: 2, color: '#92400e', eats: ['grass', 'moss'] },
    fish: { emoji: '🐟', name: 'Small Fish', type: 'primary', level: 2, color: '#0ea5e9', eats: ['algae', 'seaweed'] },
    butterfly: { emoji: '🦋', name: 'Butterfly', type: 'primary', level: 2, color: '#c084fc', eats: ['flowers'] },
    grasshopper: { emoji: '🦗', name: 'Grasshopper', type: 'primary', level: 2, color: '#84cc16', eats: ['grass', 'wheat'] },
    
    // Secondary Consumers (Level 3) - Third tier
    frog: { emoji: '🐸', name: 'Frog', type: 'secondary', level: 3, color: '#16a34a', eats: ['grasshopper', 'butterfly'] },
    snake: { emoji: '🐍', name: 'Snake', type: 'secondary', level: 3, color: '#dc2626', eats: ['rabbit', 'frog'] },
    fox: { emoji: '🦊', name: 'Fox', type: 'secondary', level: 3, color: '#ea580c', eats: ['rabbit'] },
    bigfish: { emoji: '🐠', name: 'Large Fish', type: 'secondary', level: 3, color: '#0284c7', eats: ['fish'] },
    
    // Tertiary Consumers (Level 4) - Top tier
    hawk: { emoji: '🦅', name: 'Hawk', type: 'tertiary', level: 4, color: '#7c2d12', eats: ['snake', 'rabbit'] },
    wolf: { emoji: '🐺', name: 'Wolf', type: 'tertiary', level: 4, color: '#374151', eats: ['deer', 'fox'] },
    
    // Decomposers (Special) - Side of pyramid
    mushroom: { emoji: '🍄', name: 'Mushroom', type: 'decomposer', level: 0, color: '#a855f7' },
    bacteria: { emoji: '🦠', name: 'Bacteria', type: 'decomposer', level: 0, color: '#059669' }
  };

  // Level configurations with more organisms
  const levelConfigs = {
    1: {
      title: "Simple Food Pyramid",
      organisms: ['grass', 'wheat', 'flowers', 'rabbit', 'deer', 'grasshopper', 'fox', 'snake', 'hawk', 'mushroom', 'bacteria'],
      maxScore: 1000
    },
    2: {
      title: "Aquatic-Terrestrial Web",
      organisms: ['grass', 'algae', 'seaweed', 'moss', 'rabbit', 'fish', 'butterfly', 'deer', 'frog', 'bigfish', 'fox', 'wolf', 'hawk', 'bacteria'],
      maxScore: 1500
    },
    3: {
      title: "Complex Ecosystem",
      organisms: Object.keys(organisms),
      maxScore: 2000
    }
  };

  const currentLevel = levelConfigs[level];

  // Pyramid zones configuration - arranged as triangle
  const pyramidZones = [
    // Top tier (Tertiary Consumers) - 1-2 slots
    { 
      id: 'tertiary', 
      name: 'Apex Predators', 
      level: 4, 
      slots: 2,
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-800',
      position: 'top-0 left-1/2 transform -translate-x-1/2',
      width: 'w-48'
    },
    // Third tier (Secondary Consumers) - 3-4 slots
    { 
      id: 'secondary', 
      name: 'Carnivores', 
      level: 3, 
      slots: 4,
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-800',
      position: 'top-32 left-1/2 transform -translate-x-1/2',
      width: 'w-64'
    },
    // Second tier (Primary Consumers) - 5-6 slots
    { 
      id: 'primary', 
      name: 'Herbivores', 
      level: 2, 
      slots: 6,
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      position: 'top-64 left-1/2 transform -translate-x-1/2',
      width: 'w-80'
    },
    // Base tier (Producers) - 6-8 slots
    { 
      id: 'producer', 
      name: 'Producers', 
      level: 1, 
      slots: 8,
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-800',
      position: 'top-96 left-1/2 transform -translate-x-1/2',
      width: 'w-96'
    },
    // Decomposers (Side) - 2 slots
    { 
      id: 'decomposer', 
      name: 'Decomposers', 
      level: 0, 
      slots: 3,
      color: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-800',
      position: 'top-80 right-4',
      width: 'w-40'
    }
  ];

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setPlacedOrganisms({});
    setFeedback('');
    setStreak(0);
  };

  const resetLevel = () => {
    setPlacedOrganisms({});
    setFeedback('');
    setStreak(0);
  };

  const handleDragStart = (organism) => {
    setDraggedItem(organism);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    if (!draggedItem) return;

    const organism = organisms[draggedItem];
    const zone = pyramidZones.find(z => z.id === zoneId);
    
    // Check if organism belongs to this zone
    const isCorrectZone = 
      (zone.level === 0 && organism.type === 'decomposer') ||
      (zone.level === 1 && organism.type === 'producer') ||
      (zone.level === 2 && organism.type === 'primary') ||
      (zone.level === 3 && organism.type === 'secondary') ||
      (zone.level === 4 && organism.type === 'tertiary');

    // Check if zone has space
    const organismsInZone = getOrganismsInZone(zoneId);
    const hasSpace = organismsInZone.length < zone.slots;

    if (isCorrectZone && hasSpace) {
      setPlacedOrganisms(prev => ({
        ...prev,
        [draggedItem]: zoneId
      }));
      
      const streakBonus = streak * 5;
      const basePoints = 50;
      const totalPoints = basePoints + streakBonus;
      
      setScore(prev => prev + totalPoints);
      setStreak(prev => prev + 1);
      setFeedback(`🎯 Correct! +${totalPoints} points ${streak > 0 ? `(${streak}x streak!)` : ''}`);
      
      // Level up animation effect
      if (streak > 0 && streak % 3 === 0) {
        setFeedback(`🔥 Streak Master! +${totalPoints} points`);
      }
      
    } else if (!isCorrectZone) {
      setFeedback(`❌ Wrong zone! ${organism.name} is a ${organism.type}`);
      setStreak(0);
    } else {
      setFeedback(`🚫 Zone full! Try another zone.`);
    }
    
    setDraggedItem(null);
    setTimeout(() => setFeedback(''), 3000);
  };

  const checkCompletion = () => {
    const currentOrganisms = currentLevel.organisms;
    const allPlaced = currentOrganisms.every(org => placedOrganisms[org]);
    
    if (allPlaced) {
      const completionBonus = 500 + (streak * 50);
      setScore(prev => prev + completionBonus);
      setGameState('completed');
    }
  };

  const nextLevel = () => {
    if (level < 3) {
      setLevel(prev => prev + 1);
      resetLevel();
      setGameState('playing');
    } else {
      setGameState('menu');
    }
  };

  useEffect(() => {
    if (gameState === 'playing') {
      checkCompletion();
    }
  }, [placedOrganisms]);

  const getUnplacedOrganisms = () => {
    return currentLevel.organisms.filter(org => !placedOrganisms[org]);
  };

  const getOrganismsInZone = (zoneId) => {
    return Object.entries(placedOrganisms)
      .filter(([org, zone]) => zone === zoneId)
      .map(([org]) => org);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-6">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-green-800 mb-2">🏔 Food Pyramid Builder</h1>
            <p className="text-green-600 text-lg">Level {level}: {currentLevel?.title}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-700 mb-1">★ {score.toLocaleString()}</div>
            {streak > 0 && (
              <div className="text-lg text-orange-600 font-semibold mb-2">🔥 {streak}x Streak</div>
            )}
            <button
              onClick={() => setShowHints(!showHints)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md"
            >
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Screen */}
      {gameState === 'menu' && (
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-green-200 p-8 text-center">
            <h1 className="text-6xl font-bold text-green-800 mb-6">🏔 Food Pyramid Builder</h1>
            <div className="text-xl text-gray-700 mb-8 leading-relaxed">
              Build the ultimate ecosystem pyramid!<br/>
              Drag organisms to their correct trophic levels and learn about energy flow in nature.
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              <div className="bg-green-50 rounded-lg border-2 border-green-200 p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🌱</div>
                <h3 className="font-bold text-green-800 text-lg mb-2">Producers</h3>
                <p className="text-green-600 text-sm">Make their own food using sunlight</p>
              </div>
              <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🐰</div>
                <h3 className="font-bold text-blue-800 text-lg mb-2">Primary Consumers</h3>
                <p className="text-blue-600 text-sm">Herbivores that eat plants</p>
              </div>
              <div className="bg-orange-50 rounded-lg border-2 border-orange-200 p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🦊</div>
                <h3 className="font-bold text-orange-800 text-lg mb-2">Secondary Consumers</h3>
                <p className="text-orange-600 text-sm">Carnivores that eat herbivores</p>
              </div>
              <div className="bg-red-50 rounded-lg border-2 border-red-200 p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🦅</div>
                <h3 className="font-bold text-red-800 text-lg mb-2">Apex Predators</h3>
                <p className="text-red-600 text-sm">Top of the food chain</p>
              </div>
            </div>

            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 text-2xl rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {/* Game Screen */}
      {gameState === 'playing' && (
        <div className="max-w-7xl mx-auto">
          
          {/* Feedback Display */}
          {feedback && (
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-500 p-4 mb-6 text-center">
              <div className="font-semibold text-xl text-gray-800">{feedback}</div>
            </div>
          )}

          {/* Hints Panel */}
          {showHints && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-4 text-xl">🎯 Ecosystem Rules</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">⚡</span>
                  <span>Energy flows UP the pyramid</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">📊</span>
                  <span>Biomass decreases at each level</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-500">🔄</span>
                  <span>Decomposers recycle nutrients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">⚖</span>
                  <span>Each level depends on the one below</span>
                </div>
              </div>
            </div>
          )}

          {/* Organism Inventory */}
          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6 mb-8">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Available Organisms</h3>
            <div className="grid grid-cols-6 md:grid-cols-10 gap-4">
              {getUnplacedOrganisms().map(orgKey => {
                const organism = organisms[orgKey];
                return (
                  <div
                    key={orgKey}
                    draggable
                    onDragStart={() => handleDragStart(orgKey)}
                    className="bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-green-400 rounded-lg p-3 cursor-move transition-all transform hover:scale-105 hover:shadow-md"
                  >
                    <div className="text-3xl mb-2 text-center">{organism.emoji}</div>
                    <div className="text-xs font-semibold text-center text-gray-700">{organism.name}</div>
                    {showHints && (
                      <div className="text-xs text-gray-500 text-center mt-1">
                        Level {organism.level}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Food Pyramid Structure */}
          <div className="bg-white rounded-xl shadow-xl border border-green-200 p-8 mb-6">
            <h3 className="text-3xl font-bold text-green-800 mb-8 text-center">🏔 Food Pyramid</h3>
            
            {/* Triangle Pyramid Shape */}
            <div className="relative mx-auto" style={{ width: '800px', height: '500px' }}>
              
              {/* Level 4 - Apex Predators (Top - 2 slots) */}
              <div className="absolute" style={{ top: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-bold text-red-800 mb-2 text-center">Apex Predators</div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'tertiary')}
                    className="bg-red-50 border-2 border-red-200 rounded-lg p-3 hover:shadow-lg transition-all"
                  >
                    <div className="flex gap-2">
                      {Array.from({length: 2}).map((_, slotIndex) => {
                        const orgKey = getOrganismsInZone('tertiary')[slotIndex];
                        const organism = orgKey ? organisms[orgKey] : null;
                        
                        return (
                          <div
                            key={slotIndex}
                            className={`${
                              organism 
                                ? 'bg-white border-2 border-gray-300 shadow-md' 
                                : 'bg-gray-50 border-2 border-red-300 border-dashed hover:bg-red-50'
                            } rounded-lg p-2 w-16 h-16 flex flex-col items-center justify-center transition-all cursor-pointer`}
                          >
                            {organism ? (
                              <>
                                <div className="text-lg">{organism.emoji}</div>
                                <div className="text-xs font-semibold text-gray-700 text-center leading-tight">
                                  {organism.name.split(' ')[0]}
                                </div>
                              </>
                            ) : (
                              <div className="text-red-400 text-xs">Empty</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 3 - Secondary Consumers (4 slots) */}
              <div className="absolute" style={{ top: '130px', left: '50%', transform: 'translateX(-50%)' }}>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-bold text-orange-800 mb-2 text-center">Secondary Consumers</div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'secondary')}
                    className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3 hover:shadow-lg transition-all"
                  >
                    <div className="flex gap-2">
                      {Array.from({length: 4}).map((_, slotIndex) => {
                        const orgKey = getOrganismsInZone('secondary')[slotIndex];
                        const organism = orgKey ? organisms[orgKey] : null;
                        
                        return (
                          <div
                            key={slotIndex}
                            className={`${
                              organism 
                                ? 'bg-white border-2 border-gray-300 shadow-md' 
                                : 'bg-gray-50 border-2 border-orange-300 border-dashed hover:bg-orange-50'
                            } rounded-lg p-2 w-16 h-16 flex flex-col items-center justify-center transition-all cursor-pointer`}
                          >
                            {organism ? (
                              <>
                                <div className="text-lg">{organism.emoji}</div>
                                <div className="text-xs font-semibold text-gray-700 text-center leading-tight">
                                  {organism.name.split(' ')[0]}
                                </div>
                              </>
                            ) : (
                              <div className="text-orange-400 text-xs">Empty</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 2 - Primary Consumers (6 slots) */}
              <div className="absolute" style={{ top: '240px', left: '50%', transform: 'translateX(-50%)' }}>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-bold text-blue-800 mb-2 text-center">Primary Consumers</div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'primary')}
                    className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 hover:shadow-lg transition-all"
                  >
                    <div className="flex gap-2">
                      {Array.from({length: 6}).map((_, slotIndex) => {
                        const orgKey = getOrganismsInZone('primary')[slotIndex];
                        const organism = orgKey ? organisms[orgKey] : null;
                        
                        return (
                          <div
                            key={slotIndex}
                            className={`${
                              organism 
                                ? 'bg-white border-2 border-gray-300 shadow-md' 
                                : 'bg-gray-50 border-2 border-blue-300 border-dashed hover:bg-blue-50'
                            } rounded-lg p-2 w-16 h-16 flex flex-col items-center justify-center transition-all cursor-pointer`}
                          >
                            {organism ? (
                              <>
                                <div className="text-lg">{organism.emoji}</div>
                                <div className="text-xs font-semibold text-gray-700 text-center leading-tight">
                                  {organism.name.split(' ')[0]}
                                </div>
                              </>
                            ) : (
                              <div className="text-blue-400 text-xs">Empty</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 1 - Producers (8 slots) */}
              <div className="absolute" style={{ top: '350px', left: '50%', transform: 'translateX(-50%)' }}>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-bold text-green-800 mb-2 text-center">Producers</div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'producer')}
                    className="bg-green-50 border-2 border-green-200 rounded-lg p-3 hover:shadow-lg transition-all"
                  >
                    <div className="flex gap-2">
                      {Array.from({length: 8}).map((_, slotIndex) => {
                        const orgKey = getOrganismsInZone('producer')[slotIndex];
                        const organism = orgKey ? organisms[orgKey] : null;
                        
                        return (
                          <div
                            key={slotIndex}
                            className={`${
                              organism 
                                ? 'bg-white border-2 border-gray-300 shadow-md' 
                                : 'bg-gray-50 border-2 border-green-300 border-dashed hover:bg-green-50'
                            } rounded-lg p-2 w-16 h-16 flex flex-col items-center justify-center transition-all cursor-pointer`}
                          >
                            {organism ? (
                              <>
                                <div className="text-lg">{organism.emoji}</div>
                                <div className="text-xs font-semibold text-gray-700 text-center leading-tight">
                                  {organism.name.split(' ')[0]}
                                </div>
                              </>
                            ) : (
                              <div className="text-green-400 text-xs">Empty</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decomposers - Side placement */}
              <div className="absolute" style={{ top: '280px', right: '-100px' }}>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-bold text-purple-800 mb-2 text-center">Decomposers</div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'decomposer')}
                    className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col gap-2">
                      {Array.from({length: 3}).map((_, slotIndex) => {
                        const orgKey = getOrganismsInZone('decomposer')[slotIndex];
                        const organism = orgKey ? organisms[orgKey] : null;
                        
                        return (
                          <div
                            key={slotIndex}
                            className={`${
                              organism 
                                ? 'bg-white border-2 border-gray-300 shadow-md' 
                                : 'bg-gray-50 border-2 border-purple-300 border-dashed hover:bg-purple-50'
                            } rounded-lg p-2 w-16 h-16 flex flex-col items-center justify-center transition-all cursor-pointer`}
                          >
                            {organism ? (
                              <>
                                <div className="text-lg">{organism.emoji}</div>
                                <div className="text-xs font-semibold text-gray-700 text-center leading-tight">
                                  {organism.name.split(' ')[0]}
                                </div>
                              </>
                            ) : (
                              <div className="text-purple-400 text-xs">Empty</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Energy Flow Arrows */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Arrow from Producers to Primary */}
                <div className="absolute" style={{ top: '320px', left: '50%', transform: 'translateX(-50%)' }}>
                  <div className="text-2xl text-green-500 animate-bounce">⬆</div>
                </div>
                {/* Arrow from Primary to Secondary */}
                <div className="absolute" style={{ top: '210px', left: '50%', transform: 'translateX(-50%)' }}>
                  <div className="text-2xl text-green-500 animate-bounce">⬆</div>
                </div>
                {/* Arrow from Secondary to Tertiary */}
                <div className="absolute" style={{ top: '100px', left: '50%', transform: 'translateX(-50%)' }}>
                  <div className="text-2xl text-green-500 animate-bounce">⬆</div>
                </div>
                
                {/* Decomposer arrows */}
                <div className="absolute" style={{ top: '300px', right: '-50px' }}>
                  <div className="text-xl text-purple-500 animate-pulse">🔄</div>
                </div>
              </div>

              {/* Pyramid outline for visual effect */}
              <svg className="absolute inset-0 pointer-events-none" width="800" height="500">
                <path
                  d="M 400 40 L 150 420 L 650 420 Z"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.3"
                />
              </svg>
            </div>
            
            {/* Legend */}
            <div className="mt-8 flex justify-center">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 font-medium mb-2">Energy flows UP ⬆ • Nutrients cycle 🔄</div>
                <div className="text-xs text-gray-500">Drag organisms to their correct trophic level in the pyramid</div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold text-gray-800">
                Progress: {Object.keys(placedOrganisms).length}/{currentLevel.organisms.length} organisms placed
              </div>
              <div className="flex gap-4 items-center">
                <div className="text-lg text-green-600 font-semibold">Target: {currentLevel.maxScore} points</div>
                <button
                  onClick={resetLevel}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Reset Level
                </button>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500 ease-out"
                style={{width: `${(Object.keys(placedOrganisms).length / currentLevel.organisms.length) * 100}%`}}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Screen */}
      {gameState === 'completed' && (
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-green-200 p-8 text-center">
            <h1 className="text-5xl font-bold text-green-800 mb-4">🏆 Level Complete! 🏆</h1>
            <div className="text-4xl mb-6 text-green-600 font-bold">Final Score: ★ {score.toLocaleString()}</div>
            
            <div className="bg-green-50 rounded-xl border-2 border-green-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-green-800 mb-4">🎓 Knowledge Mastered</h3>
              <div className="text-left space-y-3 text-gray-700">
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span>Energy Flow: Understood directional energy transfer in ecosystems</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span>Trophic Levels: Correctly organized organism hierarchy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span>Biomass Pyramid: Grasped decreasing biomass concept</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span>Ecosystem Balance: Recognized species interdependence</span>
                </div>
              </div>
            </div>

            <div className="flex gap-6 justify-center">
              {level < 3 ? (
                <button
                  onClick={nextLevel}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-xl rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Next Level →
                </button>
              ) : (
                <div className="text-3xl text-green-700 font-bold animate-bounce">🎯 All Levels Completed!</div>
              )}
              <button
                onClick={() => setGameState('menu')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 text-xl rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameTwo;
