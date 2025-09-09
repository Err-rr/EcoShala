import React, { useState, useRef, useEffect } from 'react';

interface GameItem {
  id: number;
  name: string;
  type: 'organic' | 'recyclable' | 'plastic' | 'general';
  description: string;
  isConfusing?: boolean;
}

interface Dustbin {
  type: 'organic' | 'recyclable' | 'plastic' | 'general';
  name: string;
  color: string;
  label: string;
  description: string;
}

const EcoSortingGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameItems, setGameItems] = useState<GameItem[]>([
    { id: 1, name: '🍎', type: 'organic', description: 'Apple core' },
    { id: 2, name: '📰', type: 'recyclable', description: 'Newspaper' },
    { id: 3, name: '🥤', type: 'plastic', description: 'Plastic cup', isConfusing: true },
    { id: 4, name: '🍕', type: 'general', description: 'Pizza box with grease' },
    { id: 5, name: '🥫', type: 'recyclable', description: 'Canned food' },
    { id: 6, name: '📱', type: 'general', description: 'Broken smartphone', isConfusing: true },
    { id: 7, name: '🌿', type: 'organic', description: 'Plant clippings' },
    { id: 8, name: '☕', type: 'general', description: 'Coffee cup with plastic lining', isConfusing: true },
  ]);
  
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const dragItem = useRef<GameItem | null>(null);
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  const dustbins: Dustbin[] = [
    { type: 'organic', name: 'Compost', color: 'bg-green-600', label: 'COMPOST', description: 'Food waste, plants' },
    { type: 'recyclable', name: 'Recycling', color: 'bg-blue-600', label: 'RECYCLE', description: 'Paper, glass, metal' },
    { type: 'plastic', name: 'Plastic', color: 'bg-red-600', label: 'PLASTIC', description: 'Avoid when possible' },
    { type: 'general', name: 'General Waste', color: 'bg-gray-600', label: 'GENERAL', description: 'Non-recyclables' }
  ];

  const handleDragStart = (e: React.DragEvent, item: GameItem) => {
    dragItem.current = item;
    e.dataTransfer.setData('text/plain', item.id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dustbinType: string) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('text/plain'));
    const droppedItem = gameItems.find(item => item.id === itemId);
    
    if (!droppedItem) return;

    if (droppedItem.type === dustbinType) {
      // Correct drop
      setScore(prev => prev + 10);
      setFeedback('Great job! 🎉 +10 points');
      setCompletedItems(prev => [...prev, droppedItem.id]);
      
      // Check if game is complete
      if (completedItems.length + 1 >= gameItems.length) {
        setShowCelebration(true);
      }
    } else {
      // Wrong drop
      setFeedback('Oops! Try again! 🤔 -5 points');
      setScore(prev => Math.max(0, prev - 5));
    }
    
    setTimeout(() => setFeedback(''), 2000);
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
    setScore(0);
    setCompletedItems([]);
    setShowCelebration(false);
    
    // Add more confusing items for higher levels
    const newItems: GameItem[] = [
      { id: 1, name: '🍌', type: 'organic', description: 'Banana peel' },
      { id: 2, name: '📦', type: 'recyclable', description: 'Cardboard box' },
      { id: 3, name: '🧃', type: 'plastic', description: 'Juice box', isConfusing: true },
      { id: 4, name: '🍫', type: 'general', description: 'Candy wrapper' },
      { id: 5, name: '🥡', type: 'general', description: 'Takeout container', isConfusing: true },
      { id: 6, name: '💡', type: 'general', description: 'Burnt out lightbulb', isConfusing: true },
      { id: 7, name: '🧴', type: 'plastic', description: 'Shampoo bottle' },
      { id: 8, name: '🍦', type: 'general', description: 'Ice cream container' },
    ];
    
    setGameItems(newItems);
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setCompletedItems([]);
    setFeedback('');
    setShowCelebration(false);
    setGameItems([
      { id: 1, name: '🍎', type: 'organic', description: 'Apple core' },
      { id: 2, name: '📰', type: 'recyclable', description: 'Newspaper' },
      { id: 3, name: '🥤', type: 'plastic', description: 'Plastic cup', isConfusing: true },
      { id: 4, name: '🍕', type: 'general', description: 'Pizza box with grease' },
      { id: 5, name: '🥫', type: 'recyclable', description: 'Canned food' },
      { id: 6, name: '📱', type: 'general', description: 'Broken smartphone', isConfusing: true },
      { id: 7, name: '🌿', type: 'organic', description: 'Plant clippings' },
      { id: 8, name: '☕', type: 'general', description: 'Coffee cup with plastic lining', isConfusing: true },
    ]);
  };

  // Pixelated background component
  const PixelBackground = () => (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/25243378/pexels-photo-25243378.jpeg')", // ← ONLINE IMAGE
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          imageRendering: 'pixelated',
          filter: 'contrast(1.2) brightness(0.9)'
        }}
      >
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-1000 opacity-30"></div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-green-950 text-white p-4 font-sans">
      <PixelBackground />
      
      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <h1 className="text-4xl font-bold mb-2 text-green-300">
          🌱 ECO SORTING CHALLENGE 🌱
        </h1>
        <h2 className="text-2xl text-green-200 mb-4">Level {level}: {level === 1 ? 'Introduction to Sustainability' : 'Advanced Recycling'}</h2>
        <div className="bg-green-800 bg-opacity-70 rounded-full px-6 py-2 inline-block shadow-lg border border-green-600">
          <span className="text-2xl font-bold text-green-100">Score: {score} 🏆</span>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="text-center mb-4 relative z-10">
          <div className="bg-white bg-opacity-90 rounded-full px-6 py-2 inline-block shadow-lg animate-bounce">
            <span className="text-xl font-bold text-green-800">{feedback}</span>
          </div>
        </div>
      )}

      {/* Celebration */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-green-800 rounded-3xl p-8 text-center shadow-2xl animate-pulse border-2 border-green-500">
            <h2 className="text-4xl font-bold text-green-300 mb-4">🎉 LEVEL COMPLETE! 🎉</h2>
            <p className="text-2xl text-green-100 mb-4">You scored {score} points!</p>
            <p className="text-xl text-green-200 mb-6">Ready for the next challenge?</p>
            <button
              onClick={nextLevel}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full
                       shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200
                       text-xl"
            >
              Next Level →
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Game Items to Drag */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-green-200">
            Drag items to the correct bins 👇
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {gameItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className={`
                  text-6xl cursor-grab transition-all duration-200
                  hover:scale-110 transform
                  ${completedItems.includes(item.id) ? 'opacity-30' : 'animate-float'}
                  ${item.isConfusing ? 'ring-2 ring-yellow-400 rounded-lg' : ''}
                `}
                title={item.description}
              >
                {item.name}
                {item.isConfusing && <span className="absolute -top-2 -right-2 text-xl">❓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Dustbins - Realistic Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {dustbins.map((bin) => (
            <div
              key={bin.type}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, bin.type)}
              className="flex flex-col items-center"
            >
              {/* Dustbin */}
              <div className="w-32 h-40 mb-3 relative">
                {/* Dustbin body */}
                <div className={`absolute bottom-0 w-full h-32 ${bin.color} rounded-t-lg`}></div>
                
                {/* Dustbin top rim */}
                <div className="absolute -top-1 -inset-x-1 h-3 bg-gray-500 rounded-t-lg"></div>
                
                {/* Dustbin label */}
                <div className="absolute top-8 left-0 right-0 text-center">
                  <span className="text-white font-bold text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                    {bin.label}
                  </span>
                </div>
                
                {/* Shine effect */}
                <div className="absolute top-0 right-0 w-8 h-full bg-white bg-opacity-20 skew-x-12"></div>
              </div>
              
              <div className="text-center">
                <h4 className="text-lg font-bold text-white">{bin.name}</h4>
                <p className="text-sm opacity-80">{bin.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="bg-red-900 bg-opacity-70 border-l-4 border-red-500 text-red-100 p-4 rounded-lg mb-8">
          <p className="font-bold">⚠️ Plastic Warning:</p>
          <p>Plastic waste is harmful to our environment. Try to avoid single-use plastics whenever possible!</p>
        </div>

        {/* Confusing items explanation */}
        <div className="bg-yellow-900 bg-opacity-70 border-l-4 border-yellow-500 text-yellow-100 p-4 rounded-lg mb-8">
          <p className="font-bold">💡 Tip:</p>
          <p>Some items are tricky! Hover over them to see descriptions. Coffee cups often have plastic lining, and pizza boxes with grease can't be recycled.</p>
        </div>

        {/* Controls */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full
                     shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200
                     text-xl mr-4"
          >
            🔄 Restart Game
          </button>
          
          {completedItems.length >= gameItems.length && (
            <button
              onClick={nextLevel}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full
                       shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200
                       text-xl"
            >
              Next Level →
            </button>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-10 left-10 text-4xl opacity-30 animate-bounce">🌿</div>
      <div className="fixed top-20 right-20 text-3xl opacity-30 animate-pulse">♻️</div>
      <div className="fixed bottom-10 left-20 text-4xl opacity-30 animate-bounce animation-delay-1000">🌎</div>
      <div className="fixed bottom-20 right-10 text-3xl opacity-30 animate-pulse animation-delay-500">⭐</div>
    </div>
  );
};

export default EcoSortingGame;
