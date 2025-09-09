import React, { useState, useEffect } from 'react';
import { Leaf, MapPin, Trophy, RotateCcw, Star } from 'lucide-react';

interface Environment {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgGradient: string;
  position: { x: number; y: number };
  completed: boolean;
}

interface Scenario {
  id: string;
  environmentId: string;
  question: string;
  options: {
    text: string;
    isEcoFriendly: boolean;
    feedback: string;
  }[];
}

const environments: Environment[] = [
  {
    id: 'city',
    name: 'City',
    icon: '🏙️',
    color: 'from-gray-400 to-gray-600',
    bgGradient: 'from-blue-100 to-gray-200',
    position: { x: 20, y: 30 },
    completed: false
  },
  {
    id: 'village',
    name: 'Village',
    icon: '🏘️',
    color: 'from-amber-400 to-orange-500',
    bgGradient: 'from-amber-100 to-yellow-200',
    position: { x: 70, y: 60 },
    completed: false
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    color: 'from-green-400 to-green-600',
    bgGradient: 'from-green-100 to-emerald-200',
    position: { x: 25, y: 70 },
    completed: false
  },
  {
    id: 'river',
    name: 'River',
    icon: '🏞️',
    color: 'from-blue-400 to-blue-600',
    bgGradient: 'from-cyan-100 to-blue-200',
    position: { x: 75, y: 25 },
    completed: false
  }
];

const scenarios: Scenario[] = [
  {
    id: 'city-1',
    environmentId: 'city',
    question: 'You need to get to work. How do you commute?',
    options: [
      {
        text: 'Drive your car alone',
        isEcoFriendly: false,
        feedback: 'Cars produce lots of CO2 emissions. Try carpooling or public transport!'
      },
      {
        text: 'Take the bus or bike',
        isEcoFriendly: true,
        feedback: 'Great choice! Public transport and biking reduce carbon emissions significantly!'
      }
    ]
  },
  {
    id: 'village-1',
    environmentId: 'village',
    question: 'The village needs a new energy source. What do you suggest?',
    options: [
      {
        text: 'Build a coal power plant',
        isEcoFriendly: false,
        feedback: 'Coal is very polluting and contributes to climate change.'
      },
      {
        text: 'Install solar panels',
        isEcoFriendly: true,
        feedback: 'Excellent! Solar energy is clean, renewable, and perfect for villages!'
      }
    ]
  },
  {
    id: 'forest-1',
    environmentId: 'forest',
    question: 'You find litter while hiking. What do you do?',
    options: [
      {
        text: 'Leave it for someone else',
        isEcoFriendly: false,
        feedback: 'Litter harms wildlife and pollutes nature. Always clean up!'
      },
      {
        text: 'Pick it up and dispose properly',
        isEcoFriendly: true,
        feedback: 'Amazing! You\'re protecting wildlife and keeping nature beautiful!'
      }
    ]
  },
  {
    id: 'river-1',
    environmentId: 'river',
    question: 'A factory wants to dump waste near the river. Your response?',
    options: [
      {
        text: 'Allow it for economic growth',
        isEcoFriendly: false,
        feedback: 'Water pollution kills fish and makes water unsafe for everyone.'
      },
      {
        text: 'Stop them and suggest proper waste treatment',
        isEcoFriendly: true,
        feedback: 'Perfect! Clean water is essential for all life on Earth!'
      }
    ]
  }
];

type GameState = 'map' | 'scenario' | 'result' | 'final';

const EcoExplorerGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('map');
  const [currentEnvironment, setCurrentEnvironment] = useState<Environment | null>(null);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [score, setScore] = useState(0);
  const [completedEnvironments, setCompletedEnvironments] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);

  const handleEnvironmentClick = (env: Environment) => {
    if (completedEnvironments.has(env.id)) return;
    
    setCurrentEnvironment(env);
    const scenario = scenarios.find(s => s.environmentId === env.id);
    setCurrentScenario(scenario || null);
    setGameState('scenario');
  };

  const handleOptionClick = (option: { text: string; isEcoFriendly: boolean; feedback: string }) => {
    setIsCorrect(option.isEcoFriendly);
    setFeedbackText(option.feedback);
    setShowFeedback(true);
    
    if (option.isEcoFriendly) {
      setScore(prev => prev + 25);
      setAnimateScore(true);
      setTimeout(() => setAnimateScore(false), 600);
    }
  };

  const handleContinue = () => {
    if (currentEnvironment) {
      setCompletedEnvironments(prev => new Set([...prev, currentEnvironment.id]));
    }
    
    setShowFeedback(false);
    setGameState('result');
    
    setTimeout(() => {
      if (completedEnvironments.size === 3) {
        setGameState('final');
      } else {
        setGameState('map');
      }
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setCompletedEnvironments(new Set());
    setCurrentEnvironment(null);
    setCurrentScenario(null);
    setShowFeedback(false);
    setGameState('map');
  };

  const getScoreMessage = () => {
    if (score === 100) return { message: "Eco Champion! 🌟", color: "text-green-600" };
    if (score >= 75) return { message: "Environmental Hero! 🌱", color: "text-green-500" };
    if (score >= 50) return { message: "Good Earth Friend! 🌍", color: "text-yellow-600" };
    return { message: "Keep Learning! 📚", color: "text-orange-500" };
  };

  const renderMap = () => (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-green-100 to-blue-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2 flex items-center justify-center gap-3">
            <Leaf className="text-green-600" />
            Eco Explorer
            <Leaf className="text-green-600" />
          </h1>
          <p className="text-lg text-green-700">Explore environments and make eco-friendly choices!</p>
          <div className={`text-2xl font-bold text-green-600 mt-4 transition-all duration-300 ${animateScore ? 'scale-125 text-yellow-500' : ''}`}>
            Score: {score}/100
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-green-200 to-blue-300 rounded-3xl p-8 shadow-2xl min-h-96">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-green-200/20 rounded-3xl"></div>
          
          {environments.map((env) => (
            <div
              key={env.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 ${
                completedEnvironments.has(env.id) ? 'opacity-60' : 'hover:z-10'
              }`}
              style={{
                left: `${env.position.x}%`,
                top: `${env.position.y}%`
              }}
              onClick={() => handleEnvironmentClick(env)}
            >
              <div className={`bg-gradient-to-br ${env.color} p-4 rounded-full shadow-lg border-4 border-white hover:shadow-xl transition-all duration-300`}>
                <div className="text-3xl">{env.icon}</div>
                {completedEnvironments.has(env.id) && (
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                )}
              </div>
              <div className="text-center mt-2 bg-white/80 rounded-full px-3 py-1 text-sm font-semibold">
                {env.name}
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 right-4 text-sm text-green-700 bg-white/70 rounded-lg p-2">
            Click environments to explore! ({completedEnvironments.size}/4 completed)
          </div>
        </div>
      </div>
    </div>
  );

  const renderScenario = () => (
    <div className={`min-h-screen bg-gradient-to-br ${currentEnvironment?.bgGradient} p-4`}>
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{currentEnvironment?.icon}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentEnvironment?.name}</h2>
          <div className="text-lg font-semibold text-gray-600">Score: {score}/100</div>
        </div>

        <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            {currentScenario?.question}
          </h3>

          {!showFeedback ? (
            <div className="space-y-4">
              {currentScenario?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="w-full p-4 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-left font-medium"
                >
                  {option.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-6xl mb-4 ${isCorrect ? 'animate-bounce' : ''}`}>
                {isCorrect ? '🎉' : '😔'}
              </div>
              <div className={`text-xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
                {isCorrect ? 'Great Choice!' : 'Try Again Next Time!'}
              </div>
              <p className="text-gray-700 mb-6 text-lg">{feedbackText}</p>
              <button
                onClick={handleContinue}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Continue Adventure
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl text-center max-w-md">
        <div className="text-6xl mb-4 animate-pulse">✨</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Environment Explored!</h2>
        <p className="text-gray-600">
          {completedEnvironments.size === 4 
            ? "You've explored all environments! Calculating final score..." 
            : "Great job! Return to the map to explore more environments."}
        </p>
        <div className="animate-spin w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full mx-auto mt-4"></div>
      </div>
    </div>
  );

  const renderFinalScore = () => {
    const scoreInfo = getScoreMessage();
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-300 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl text-center max-w-lg">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Adventure Complete!</h2>
          
          <div className="bg-gradient-to-r from-yellow-100 to-green-100 rounded-2xl p-6 mb-6">
            <div className="text-4xl font-bold text-gray-800 mb-2">{score}/100</div>
            <div className={`text-xl font-bold ${scoreInfo.color}`}>{scoreInfo.message}</div>
          </div>

          <p className="text-gray-700 mb-6 text-lg">
            You've explored all environments and learned about eco-friendly choices! 
            Every small action can make a big difference for our planet.
          </p>

          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      {gameState === 'map' && renderMap()}
      {gameState === 'scenario' && renderScenario()}
      {gameState === 'result' && renderResult()}
      {gameState === 'final' && renderFinalScore()}
    </div>
  );
};

export default EcoExplorerGame;