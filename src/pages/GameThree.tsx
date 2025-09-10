import React, { useState, useEffect } from 'react';

interface Species {
  name: string;
  emoji: string;
  habitat: string;
  options: string[];
  correct: number;
  info: string;
  description?: string;
  imageUrl?: string;
}

interface CollectedSpecies extends Species {}

const GameThree: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [collectedSpecies, setCollectedSpecies] = useState<CollectedSpecies[]>([]);
  const [answeredCurrentQuestion, setAnsweredCurrentQuestion] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [shuffledSpecies, setShuffledSpecies] = useState<Species[]>([]);

  const speciesData: Species[] = [
    {
      name: "Bengal Tiger",
      emoji: "🐅",
      habitat: "Tropical Rainforest",
      options: ["Tropical Rainforest", "Himalayan Meadows", "Coastal Wetlands", "Desert Plains"],
      correct: 0,
      info: "The majestic Bengal Tiger, with distinctive orange coat and black stripes is found in the Sundarbans and central Indian forests",
      imageUrl: "https://bigcatsindia.com/wp-content/uploads/2018/06/Royal-Bengal-Tiger.jpg"
    },
    {
      name: "Snow Leopard",
      emoji: "🐆",
      habitat: "Himalayan Meadows",
      options: ["Tropical Rainforest", "Himalayan Meadows", "Coastal Wetlands", "Desert Plains"],
      correct: 1,
      info: "The elusive Snow Leopard with thick fur and long tail, perfectly adapted for rocky mountain terrain lives in high altitude regions of Himalayas",
      imageUrl: "https://images8.alphacoders.com/436/436699.jpg"
    },
    {
      name: "Greater Flamingo",
      emoji: "🦩",
      habitat: "Coastal Wetlands",
      options: ["Tropical Rainforest", "Himalayan Meadows", "Coastal Wetlands", "Desert Plains"],
      correct: 2,
      info: "Pink-colored wading birds with curved beaks, feeding in shallow saltwater lagoons and mudflats migrates to Rann of Kutch and coastal lagoons",
      imageUrl: "https://animalia-life.club/data_images/greater-flamingo/greater-flamingo1.jpg"
    },
    {
      name: "Indian Peafowl",
      emoji: "🦚",
      habitat: "Tropical Rainforest",
      options: ["Desert Plains", "Tropical Rainforest", "Coastal Wetlands", "Himalayan Meadows"],
      correct: 1,
      info: "National bird found in forests and rural areas",
      imageUrl: "https://www.hdwallpapers.in/download/indian_peafowl-wide.jpg"
    },
    {
      name: "Great Indian Bustard",
      emoji: "🦅",
      habitat: "Desert Plains",
      options: ["Tropical Rainforest", "Himalayan Meadows", "Coastal Wetlands", "Desert Plains"],
      correct: 3,
      info: "Large terrestrial bird with brown and white plumage are critically endangered, found in Rajasthan grasslands",
      imageUrl: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400&h=300&fit=crop"
    },
    {
      name: "Indian Elephant",
      emoji: "🐘",
      habitat: "Tropical Rainforest",
      options: ["Tropical Rainforest", "Himalayan Meadows", "Coastal Wetlands", "Desert Plains"],
      correct: 0,
      info: "Roams through Western and Eastern Ghats",
      description: "Gentle giants with smaller ears than African elephants, moving in herds through dense jungle paths",
      imageUrl: "https://wallpaperaccess.com/full/3614073.jpg"
    },
    {
      name: "Himalayan Monal",
      emoji: "🦜",
      habitat: "Himalayan Meadows",
      options: ["Tropical Rainforest", "Himalayan Meadows", "Coastal Wetlands", "Desert Plains"],
      correct: 1,
      info: "Colorful pheasant, state bird of Uttarakhand",
      description: "Rainbow-colored pheasant with metallic green, blue, and red plumage, foraging in alpine meadows",
      imageUrl: "https://res.cloudinary.com/dr0zfbman/images/w_1920,h_1130,c_scale/f_auto,q_auto:good/v1715675202/WordPress%20Content/A-Himalayan-Monal-on-a-roadside-tree_Hari-K-Patibanda/A-Himalayan-Monal-on-a-roadside-tree_Hari-K-Patibanda.jpg?_i=AA"
    },
    {
      name: "Indian Rhinoceros",
      emoji: "🦏",
      habitat: "Coastal Wetlands",
      options: ["Tropical Rainforest", "Himalayan Meadows", "Coastal Wetlands", "Desert Plains"],
      correct: 2,
      info: "One-horned rhino in Assam's wetlands",
      description: "Armored-looking mammal with single horn, grazing in marshy grasslands and riverine areas",
      imageUrl: "https://animalia-bio.us-east-1.linodeobjects.com/animals/photos/medium/original/greater-one-horned-rhinoceros-at-chitwanjpg.webp"
    },
    {
      name: "Asiatic Lion",
      emoji: "🦁",
      habitat: "Desert Plains",
      options: ["Tropical Rainforest", "Himalayan Meadows", "Coastal Wetlands", "Desert Plains"],
      correct: 3,
      info: "Only wild population in Gir Forest, Gujarat",
      description: "Tawny-colored big cat with distinctive mane, resting under acacia trees in dry scrubland",
      imageUrl: "https://tse1.explicit.bing.net/th/id/OIP.06rMiQ8K6sTZVPLZyyjSmAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "King Cobra",
      emoji: "🐍",
      habitat: "Tropical Rainforest",
      options: ["Tropical Rainforest", "Himalayan Meadows", "Coastal Wetlands", "Desert Plains"],
      correct: 0,
      info: "World's longest venomous snake",
      description: "Massive serpent with expandable hood, coiled among bamboo groves and forest floor",
      imageUrl: "https://wallpapercave.com/wp/wp2791609.jpg"
    }
  ];

  // Shuffle species on component mount
  useEffect(() => {
    const shuffled = [...speciesData].sort(() => Math.random() - 0.5);
    setShuffledSpecies(shuffled);
  }, []);

  const currentSpecies = shuffledSpecies[currentQuestionIndex];
  const progress = (collectedSpecies.length / speciesData.length) * 100;
  const level = Math.floor(collectedSpecies.length / 3) + 1;

  const selectAnswer = (selectedIndex: number) => {
    if (answeredCurrentQuestion || !currentSpecies) return;

    setAnsweredCurrentQuestion(true);

    if (selectedIndex === currentSpecies.correct) {
      setScore(prev => prev + 10);

      // Add to collection if not already collected
      if (!collectedSpecies.find(s => s.name === currentSpecies.name)) {
        setCollectedSpecies(prev => [...prev, currentSpecies]);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledSpecies.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnsweredCurrentQuestion(false);
    } else {
      // Game completed
      setGameCompleted(true);
    }
  };

  const restartGame = () => {
    // Reshuffle species and reset game state
    const shuffled = [...speciesData].sort(() => Math.random() - 0.5);
    setShuffledSpecies(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCollectedSpecies([]);
    setAnsweredCurrentQuestion(false);
    setGameCompleted(false);
  };

  // Game completed screen
  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative flex items-center justify-center">
        {/* Subtle background pattern */}
        <div 
          className="fixed inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='20' cy='20' r='2' fill='%2300ff7f'/><circle cx='80' cy='40' r='1.5' fill='%2300ff7f'/><circle cx='40' cy='70' r='1' fill='%2300ff7f'/></svg>")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Victory screen */}
        <div className="bg-white p-12 rounded-2xl border-2 border-green-400 text-center max-w-2xl mx-4 relative shadow-lg">
          <h1 className="text-5xl font-bold mb-8 text-gray-900 tracking-wide">
            Quest Complete! 🎉
          </h1>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="p-6 bg-green-50 rounded-xl border border-green-200">
              <div className="text-lg mb-2 text-green-700 font-semibold">Final Score</div>
              <div className="text-4xl font-bold text-green-600">{score}</div>
            </div>
            
            <div className="p-6 bg-green-50 rounded-xl border border-green-200">
              <div className="text-lg mb-2 text-green-700 font-semibold">Collected</div>
              <div className="text-4xl font-bold">
                <span className="text-green-600">{collectedSpecies.length}</span>
                <span className="text-gray-500">/{speciesData.length}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={restartGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl w-full transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">
      {/* Subtle background pattern */}
      <div 
        className="fixed inset-0 opacity-3"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='20' cy='20' r='1' fill='%2300ff7f'/><circle cx='80' cy='40' r='1' fill='%2300ff7f'/><circle cx='40' cy='70' r='1' fill='%2300ff7f'/></svg>")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Celebration effect */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl font-bold text-green-600 animate-bounce">
            Species Discovered! 🎯
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto p-6 relative z-10">
        {/* Clean Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-gray-900">
            Species Quest
          </h1>
          <div className="w-24 h-1 bg-green-400 mx-auto mb-4 rounded" />
          <p className="text-xl text-gray-600">Discover India's Amazing Wildlife</p>
        </div>

      {/* Stats Bar */}
<div className="flex justify-center gap-6 mb-12 flex-wrap">
  {[
    { title: 'Discovered', value: collectedSpecies.length, icon: '🎯' },
    { title: 'Score', value: score, icon: '⭐' },
    { title: 'Level', value: level, icon: '🏆' }
  ].map((stat) => (
    <div 
      key={stat.title}
      className="bg-white p-6 rounded-xl border-2 border-green-300 relative overflow-hidden 
                 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg
                 w-48 min-h-[150px] flex flex-col justify-center"
    >
      <div className="text-center">
        <div className="text-3xl mb-2">{stat.icon}</div>
        <h3 className="text-green-700 text-lg mb-2 font-semibold">{stat.title}</h3>
        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
      </div>
    </div>
  ))}
</div>


        {/* Progress Bar */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-12 border border-green-300">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Game Area */}
        {currentSpecies && (
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Quiz Section */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border-2 border-green-300 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-green-400 rounded-t-2xl" />
              
              <div className="text-gray-900 relative">
                {/* Species Image */}
                <div 
                  className="w-full h-80 rounded-xl mb-6 flex items-center justify-center text-white text-center p-6 relative overflow-hidden border-2 border-green-300 shadow-md"
                  style={{
                    backgroundImage: `url(${currentSpecies.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                
                {/* Question */}
                <div className="text-2xl font-bold mb-6 text-center p-4 bg-green-50 rounded-xl border border-green-200">
                  What is the natural habitat of the {currentSpecies.name}?
                </div>

                {/* Options */}
                <div className="grid gap-3 mb-6">
                  {currentSpecies.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectAnswer(index)}
                      className={`
                        p-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2
                        ${answeredCurrentQuestion 
                          ? index === currentSpecies.correct 
                            ? 'bg-green-500 text-white border-green-500 shadow-lg' 
                            : 'bg-red-500 text-white border-red-500'
                          : 'bg-white text-gray-800 border-green-300 hover:bg-green-50 hover:border-green-400 hover:scale-102 shadow-md hover:shadow-lg'
                        }
                      `}
                      disabled={answeredCurrentQuestion}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                {answeredCurrentQuestion && (
                  <button
                    onClick={nextQuestion}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {currentQuestionIndex < shuffledSpecies.length - 1 ? 'Next Species →' : 'View Results 🏆'}
                  </button>
                )}
              </div>
            </div>

            {/* Collection Panel */}
            <div className="bg-white rounded-2xl p-6 border-2 border-green-300 max-h-96 overflow-y-auto relative shadow-lg">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Collection</h2>
                <div className="w-16 h-1 bg-green-400 mx-auto rounded" />
              </div>

              <div className="space-y-3">
                {collectedSpecies.length === 0 ? (
                  <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                    <div className="text-green-700 font-semibold mb-2">Start your quest!</div>
                    <div className="text-gray-600 text-sm">Answer correctly to collect species</div>
                  </div>
                ) : (
                  collectedSpecies.map((species, index) => (
                    <div
                      key={`${species.name}-${index}`}
                      className="bg-green-50 rounded-xl p-4 border border-green-200 hover:bg-green-100 hover:scale-102 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className="text-green-700 font-semibold mb-1">✓ {species.name}</div>
                      <div className="text-gray-700 text-sm mb-1">{species.habitat}</div>
                      <div className="text-gray-600 text-xs">{species.info}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameThree;
