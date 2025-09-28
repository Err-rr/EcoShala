import React, { useState, useRef, useEffect } from 'react';

const GameTwo = () => {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'completed'
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [placedOrganisms, setPlacedOrganisms] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

  // Extended organism definitions
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

  // Level configurations
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
    
    // Check if organism belongs to this zone
    const isCorrectZone = 
      (zoneId === 'decomposer' && organism.type === 'decomposer') ||
      (zoneId === 'producer' && organism.type === 'producer') ||
      (zoneId === 'primary' && organism.type === 'primary') ||
      (zoneId === 'secondary' && organism.type === 'secondary') ||
      (zoneId === 'tertiary' && organism.type === 'tertiary');

    // Check if zone has space
    const organismsInZone = getOrganismsInZone(zoneId);
    const maxSlots = getMaxSlots(zoneId);
    const hasSpace = organismsInZone.length < maxSlots;

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
      setFeedback(`✓ Correct! +${totalPoints} points ${streak > 0 ? `(${streak}x streak!)` : ''}`);
      
      if (streak > 0 && streak % 3 === 0) {
        setFeedback(`🔥 Streak Master! +${totalPoints} points`);
      }
      
    } else if (!isCorrectZone) {
      setFeedback(`✗ Wrong zone! ${organism.name} is a ${organism.type}`);
      setStreak(0);
    } else {
      setFeedback(`Zone full! Try another zone.`);
    }
    
    setDraggedItem(null);
    setTimeout(() => setFeedback(''), 3000);
  };

  const getMaxSlots = (zoneId) => {
    const slotMap = {
      tertiary: 2,
      secondary: 4,
      primary: 6,
      producer: 8,
      decomposer: 3
    };
    return slotMap[zoneId] || 0;
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
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 p-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-1">
              Food Pyramid Builder
            </h1>
            <p className="text-gray-600">
              Level {level}: {currentLevel?.title}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-gray-700 mb-1">
              {score.toLocaleString()} pts
            </div>
            {streak > 0 && (
              <div className="text-sm text-orange-600 font-medium mb-2">
                {streak}x streak
              </div>
            )}
            <button
              onClick={() => setShowHints(!showHints)}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Screen */}
      {gameState === 'menu' && (
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Food Pyramid Builder
            </h1>
            
            <div className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Learn about ecosystem energy flow by building food pyramids.
              Drag organisms to their correct trophic levels and discover nature's balance.
            </div>
            
            {/* Feature cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-green-50 rounded-xl border border-green-200 p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🌱</div>
                <h3 className="font-semibold text-gray-800 text-base mb-2">Producers</h3>
                <p className="text-gray-600 text-sm">Make their own food using sunlight</p>
              </div>
              
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🐰</div>
                <h3 className="font-semibold text-gray-800 text-base mb-2">Primary Consumers</h3>
                <p className="text-gray-600 text-sm">Herbivores that eat plants</p>
              </div>
              
              <div className="bg-orange-50 rounded-xl border border-orange-200 p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🦊</div>
                <h3 className="font-semibold text-gray-800 text-base mb-2">Secondary Consumers</h3>
                <p className="text-gray-600 text-sm">Carnivores that eat herbivores</p>
              </div>
              
              <div className="bg-red-50 rounded-xl border border-red-200 p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🦅</div>
                <h3 className="font-semibold text-gray-800 text-base mb-2">Apex Predators</h3>
                <p className="text-gray-600 text-sm">Top of the food chain</p>
              </div>
            </div>

            <button
              onClick={startGame}
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-8 text-lg rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {/* Game Screen */}
      {gameState === 'playing' && (
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Feedback Display */}
          {feedback && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border-l-4 border-green-500 p-4 mb-6 text-center">
              <div className="font-medium text-lg text-gray-800">{feedback}</div>
            </div>
          )}

          {/* Hints Panel */}
          {showHints && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Ecosystem Rules</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-yellow-600">⚡</span>
                  <span>Energy flows UP the pyramid</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-600">📊</span>
                  <span>Biomass decreases at each level</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-purple-600">🔄</span>
                  <span>Decomposers recycle nutrients</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-green-600">⚖</span>
                  <span>Each level depends on the one below</span>
                </div>
              </div>
            </div>
          )}

          {/* Main Game Layout - Side by Side */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            
            {/* Left Side - Organism Inventory */}
            <div className="col-span-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
                  Available Organisms
                </h3>
                
                {/* Scrollable organism list */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {getUnplacedOrganisms().map(orgKey => {
                    const organism = organisms[orgKey];
                    const typeColors = {
                      producer: 'border-green-200 bg-green-50',
                      primary: 'border-blue-200 bg-blue-50',
                      secondary: 'border-orange-200 bg-orange-50',
                      tertiary: 'border-red-200 bg-red-50',
                      decomposer: 'border-purple-200 bg-purple-50'
                    };
                    
                    return (
                      <div
                        key={orgKey}
                        draggable
                        onDragStart={() => handleDragStart(orgKey)}
                        className={`${typeColors[organism.type]} border-2 rounded-lg p-3 cursor-move transition-all hover:shadow-md hover:scale-105`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">
                            {organism.emoji}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800 text-sm">{organism.name}</div>
                            <div className="text-xs text-gray-500 capitalize">{organism.type}</div>
                            {showHints && (
                              <div className="text-xs text-gray-400 mt-1">
                                Level: {organism.level}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side - Food Pyramid */}
            <div className="col-span-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                  Food Pyramid
                </h3>
                
                {/* Pyramid Structure */}
                <div className="relative mx-auto" style={{ width: '600px', height: '450px' }}>
                  
                  {/* SVG Pyramid Outline */}
                  <svg className="absolute inset-0 pointer-events-none" width="600" height="450">
                    <path
                      d="M 300 30 L 100 380 L 500 380 Z"
                      fill="rgba(229, 231, 235, 0.1)"
                      stroke="rgba(156, 163, 175, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="8,4"
                    />
                  </svg>

                  {/* Level 4 - Apex Predators */}
                  <div className="absolute" style={{ top: '40px', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="text-center mb-3">
                      <div className="text-sm font-medium text-red-800 bg-red-100 px-3 py-1 rounded-full">
                        Apex Predators
                      </div>
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'tertiary')}
                      className="bg-red-50 border-2 border-red-200 hover:border-red-400 rounded-lg p-3 transition-all min-h-[80px]"
                    >
                      <div className="flex gap-2 justify-center">
                        {Array.from({length: 2}).map((_, slotIndex) => {
                          const orgKey = getOrganismsInZone('tertiary')[slotIndex];
                          const organism = orgKey ? organisms[orgKey] : null;
                          
                          return (
                            <div
                              key={slotIndex}
                              className={`${
                                organism 
                                  ? 'bg-white border border-gray-300 shadow-sm' 
                                  : 'bg-red-50 border border-red-300 border-dashed hover:bg-red-100'
                              } rounded-lg p-2 w-16 h-16 flex flex-col items-center justify-center transition-all`}
                            >
                              {organism ? (
                                <div>
                                  <div className="text-lg">{organism.emoji}</div>
                                  <div className="text-xs font-medium text-gray-700 text-center">
                                    {organism.name.split(' ')[0]}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-red-400 text-xs text-center">Drop</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Level 3 - Secondary Consumers */}
                  <div className="absolute" style={{ top: '140px', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="text-center mb-3">
                      <div className="text-sm font-medium text-orange-800 bg-orange-100 px-3 py-1 rounded-full">
                        Secondary Consumers
                      </div>
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'secondary')}
                      className="bg-orange-50 border-2 border-orange-200 hover:border-orange-400 rounded-lg p-3 transition-all min-h-[80px]"
                    >
                      <div className="flex gap-2 justify-center">
                        {Array.from({length: 4}).map((_, slotIndex) => {
                          const orgKey = getOrganismsInZone('secondary')[slotIndex];
                          const organism = orgKey ? organisms[orgKey] : null;
                          
                          return (
                            <div
                              key={slotIndex}
                              className={`${
                                organism 
                                  ? 'bg-white border border-gray-300 shadow-sm' 
                                  : 'bg-orange-50 border border-orange-300 border-dashed hover:bg-orange-100'
                              } rounded-lg p-2 w-16 h-16 flex flex-col items-center justify-center transition-all`}
                            >
                              {organism ? (
                                <div>
                                  <div className="text-lg">{organism.emoji}</div>
                                  <div className="text-xs font-medium text-gray-700 text-center">
                                    {organism.name.split(' ')[0]}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-orange-400 text-xs text-center">Drop</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Level 2 - Primary Consumers */}
                  <div className="absolute" style={{ top: '240px', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="text-center mb-3">
                      <div className="text-sm font-medium text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                        Primary Consumers
                      </div>
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'primary')}
                      className="bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-lg p-3 transition-all min-h-[80px]"
                    >
                      <div className="flex gap-2 justify-center">
                        {Array.from({length: 6}).map((_, slotIndex) => {
                          const orgKey = getOrganismsInZone('primary')[slotIndex];
                          const organism = orgKey ? organisms[orgKey] : null;
                          
                          return (
                            <div
                              key={slotIndex}
                              className={`${
                                organism 
                                  ? 'bg-white border border-gray-300 shadow-sm' 
                                  : 'bg-blue-50 border border-blue-300 border-dashed hover:bg-blue-100'
                              } rounded-lg p-2 w-16 h-16 flex flex-col items-center justify-center transition-all`}
                            >
                              {organism ? (
                                <div>
                                  <div className="text-lg">{organism.emoji}</div>
                                  <div className="text-xs font-medium text-gray-700 text-center">
                                    {organism.name.split(' ')[0]}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-blue-400 text-xs text-center">Drop</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Level 1 - Producers */}
                  <div className="absolute" style={{ top: '340px', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="text-center mb-3">
                      <div className="text-sm font-medium text-green-800 bg-green-100 px-3 py-1 rounded-full">
                        Producers
                      </div>
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'producer')}
                      className="bg-green-50 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 transition-all min-h-[80px]"
                    >
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({length: 8}).map((_, slotIndex) => {
                          const orgKey = getOrganismsInZone('producer')[slotIndex];
                          const organism = orgKey ? organisms[orgKey] : null;
                          
                          return (
                            <div
                              key={slotIndex}
                              className={`${
                                organism 
                                  ? 'bg-white border border-gray-300 shadow-sm' 
                                  : 'bg-green-50 border border-green-300 border-dashed hover:bg-green-100'
                              } rounded-lg p-2 w-16 h-16 flex flex-col items-center justify-center transition-all`}
                            >
                              {organism ? (
                                <div>
                                  <div className="text-lg">{organism.emoji}</div>
                                  <div className="text-xs font-medium text-gray-700 text-center">
                                    {organism.name.split(' ')[0]}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-green-400 text-xs text-center">Drop</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Decomposers - Right Side */}
                  <div className="absolute" style={{ top: '180px', right: '20px' }}>
                    <div className="text-center mb-3">
                      <div className="text-sm font-medium text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                        Decomposers
                      </div>
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'decomposer')}
                      className="bg-purple-50 border-2 border-purple-200 hover:border-purple-400 rounded-lg p-3 transition-all"
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
                                  ? 'bg-white border border-gray-300 shadow-sm' 
                                  : 'bg-purple-50 border border-purple-300 border-dashed hover:bg-purple-100'
                              } rounded-lg p-2 w-16 h-16 flex flex-col items-center justify-center transition-all`}
                            >
                              {organism ? (
                                <div>
                                  <div className="text-lg">{organism.emoji}</div>
                                  <div className="text-xs font-medium text-gray-700 text-center">
                                    {organism.name.split(' ')[0]}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-purple-400 text-xs text-center">Drop</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Energy Flow Arrows */}
                  <div className="absolute inset-0 pointer-events-none opacity-40">
                    <div className="absolute text-xl text-gray-400" style={{ top: '310px', left: '50%', transform: 'translateX(-50%)' }}>⬆</div>
                    <div className="absolute text-xl text-gray-400" style={{ top: '210px', left: '50%', transform: 'translateX(-50%)' }}>⬆</div>
                    <div className="absolute text-xl text-gray-400" style={{ top: '110px', left: '50%', transform: 'translateX(-50%)' }}>⬆</div>
                    <div className="absolute text-lg text-gray-400" style={{ top: '220px', right: '90px' }}>🔄</div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="mt-6 flex justify-center">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 font-medium mb-2">Energy flows UP ⬆ • Nutrients cycle 🔄</div>
                    <div className="text-xs text-gray-500">Drag organisms from the left panel to their correct trophic level</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold text-gray-800">
                Progress: <span className="text-green-600">{Object.keys(placedOrganisms).length}</span>/{currentLevel.organisms.length} organisms placed
              </div>
              <div className="flex gap-4 items-center">
                <div className="text-lg text-purple-600 font-semibold bg-purple-100 px-4 py-2 rounded-lg">
                  Target: {currentLevel.maxScore} points
                </div>
                <button
                  onClick={resetLevel}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Reset Level
                </button>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-500 ease-out"
                style={{width: `${(Object.keys(placedOrganisms).length / currentLevel.organisms.length) * 100}%`}}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Screen */}
      {gameState === 'completed' && (
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Level Complete!</h1>
            <div className="text-4xl mb-8 text-green-600 font-bold">Final Score: {score.toLocaleString()}</div>
            
            <div className="bg-green-50 rounded-xl border border-green-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Knowledge Mastered</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Energy Flow: Understood directional energy transfer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Trophic Levels: Correctly organized organism hierarchy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Biomass Pyramid: Grasped decreasing biomass concept</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Ecosystem Balance: Recognized species interdependence</span>
                </div>
              </div>
            </div>

            <div className="flex gap-6 justify-center">
              {level < 3 ? (
                <button
                  onClick={nextLevel}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 text-xl rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Next Level →
                </button>
              ) : (
                <div className="text-3xl text-green-700 font-bold">All Levels Completed!</div>
              )}
              <button
                onClick={() => setGameState('menu')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-8 text-xl rounded-xl transition-colors shadow-lg hover:shadow-xl"
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