import React, { useState, useEffect } from 'react';
import { Leaf, MapPin, Trophy, RotateCcw, Star, Zap, Building2, TreePine, Waves, Home } from 'lucide-react';

interface Environment {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
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
    icon: Building2,
    color: 'from-gray-400 to-gray-600',
    bgGradient: 'from-blue-100 to-gray-200',
    position: { x: 20, y: 30 },
    completed: false
  },
  {
    id: 'village',
    name: 'Village',
    icon: Home,
    color: 'from-amber-400 to-orange-500',
    bgGradient: 'from-amber-100 to-yellow-200',
    position: { x: 70, y: 60 },
    completed: false
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: TreePine,
    color: 'from-green-400 to-green-600',
    bgGradient: 'from-green-100 to-emerald-200',
    position: { x: 25, y: 70 },
    completed: false
  },
  {
    id: 'river',
    name: 'River',
    icon: Waves,
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

  const getEnvironmentBackground = (envId: string) => {
    const backgrounds = {
      'city': 'https://i.pinimg.com/originals/c6/a1/c9/c6a1c9f91f82c3fe5af6c5d83cc0bf7e.gif',
      'forest': 'https://i.pinimg.com/1200x/e4/b9/ec/e4b9ecfd6328524f77b8fc2ce7771034.jpg',
      'river': 'https://i.pinimg.com/originals/46/ac/9e/46ac9e282d3c303934a72d941845785b.gif',
      'village': 'https://i.pinimg.com/1200x/ec/e5/89/ece5891c0ef6cda2b2feb2ccb2c71ea5.jpg'
    };
    return backgrounds[envId as keyof typeof backgrounds] || '';
  };

  const renderMap = () => (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://i.pinimg.com/1200x/b6/93/b5/b693b5337011ed14bde3a2c80e2c5bcd.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-purple-900/60 to-slate-800/70"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Game Title - Top Left */}
      <div className="absolute top-6 left-6 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-2xl px-6 py-4 text-white shadow-lg z-20">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Leaf className="text-emerald-400 w-8 h-8" />
          EcoLearn
        </h1>
        <p className="text-sm text-emerald-300/80 font-medium">Learn • Explore • Protect</p>
      </div>

      {/* Score and Progress - Top Right */}
      <div className="absolute top-6 right-6 space-y-3 z-20">
        {/* Score Display */}
        <div className={`bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/40 rounded-xl px-6 py-3 shadow-lg transition-all duration-300 ${animateScore ? 'scale-110 border-yellow-300' : ''}`}>
          <div className="flex items-center gap-2">
            <Zap className={`w-6 h-6 ${animateScore ? 'text-yellow-300' : 'text-yellow-400'}`} />
            <span className="text-xl font-bold text-white">SCORE: {score}/100</span>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="bg-black/60 backdrop-blur-sm border border-emerald-400/30 rounded-xl px-4 py-3 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">Progress</span>
          </div>
          <div className="text-lg font-bold text-emerald-400">
            {completedEnvironments.size}/4 Completed
          </div>
        </div>
      </div>
      
      {/* Centered Game Map */}
      <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
        <div className="relative bg-gradient-to-br from-emerald-900/20 to-blue-900/20 backdrop-blur-sm border border-emerald-400/30 rounded-3xl p-8 shadow-2xl w-full max-w-4xl h-96 overflow-hidden">
          {/* Light overlay just for the game area */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/10 to-black/20"></div>
          
          {environments.map((env) => {
            const IconComponent = env.icon;
            return (
              <div
                key={env.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 ${
                  completedEnvironments.has(env.id) 
                    ? 'opacity-60 scale-95' 
                    : 'hover:scale-110 hover:z-20'
                }`}
                style={{
                  left: `${env.position.x}%`,
                  top: `${env.position.y}%`
                }}
                onClick={() => handleEnvironmentClick(env)}
              >
                <div className={`bg-gradient-to-br ${env.color} p-5 rounded-full shadow-xl border-4 ${
                  completedEnvironments.has(env.id) 
                    ? 'border-green-400/60' 
                    : 'border-white/80 hover:border-yellow-300'
                } hover:shadow-2xl transition-all duration-300 relative`}>
                  <IconComponent className="w-8 h-8 text-white relative z-10" />
                  {completedEnvironments.has(env.id) && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-2 border-2 border-white shadow-lg">
                      <Star className="w-5 h-5 text-white fill-current" />
                    </div>
                  )}
                </div>
                <div className={`text-center mt-3 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                  completedEnvironments.has(env.id)
                    ? 'bg-green-400/80 text-green-900'
                    : 'bg-white/90 text-gray-800 border border-white/50'
                }`}>
                  {env.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderScenario = () => {
    const IconComponent = currentEnvironment?.icon || TreePine;
    
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Environment-specific background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getEnvironmentBackground(currentEnvironment?.id || '')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Scenario background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        
        <div className="max-w-2xl mx-auto pt-8 relative z-10 p-4">
          <div className="text-center mb-8">
            <div className="inline-block p-6 bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30 shadow-2xl">
              <div className="mb-4">
                <IconComponent className="w-16 h-16 text-gray-700 mx-auto" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{currentEnvironment?.name}</h2>
            </div>
          </div>

          {/* Score Display for Scenario Page */}
          <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
            <div className="text-lg font-semibold text-gray-700">
              Score: {score}/100
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50">
            {/* Interactive Question Header */}
            <div className="mb-8 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-l-4 border-blue-400">
                <h3 className="text-2xl font-bold text-gray-800 leading-relaxed flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">?</span>
                  </div>
                  {currentScenario?.question}
                </h3>
              </div>
            </div>

            {!showFeedback ? (
              <div className="space-y-4">
                {currentScenario?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="group w-full p-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-left font-medium relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold">{String.fromCharCode(65 + index)}</span>
                      </div>
                      <span className="text-lg">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  isCorrect 
                    ? 'bg-green-100 border-4 border-green-400' 
                    : 'bg-orange-100 border-4 border-orange-400'
                }`}>
                  <span className="text-4xl">
                    {isCorrect ? '🌟' : '📚'}
                  </span>
                </div>
                <div className={`text-2xl font-bold mb-6 ${isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
                  {isCorrect ? 'Excellent Choice!' : 'Learning Opportunity!'}
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-8 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-green-400' : 'bg-blue-400'
                    }`}>
                      <span className="text-white text-sm">💡</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed text-left">{feedbackText}</p>
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-green-400/50"
                >
                  Continue Adventure →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Loading animation background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          />
        ))}
      </div>
      
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-2xl text-center max-w-md border border-white/30 relative z-10">
        <div className="text-8xl mb-6 animate-pulse">✨</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Mission Complete!</h2>
        <p className="text-gray-600 text-lg mb-6">
          {completedEnvironments.size === 4 
            ? "All environments explored! Calculating your eco-impact..." 
            : "Great progress! Return to explore more environments."}
        </p>
        <div className="relative">
          <div className="animate-spin w-12 h-12 border-4 border-purple-300 border-t-purple-600 rounded-full mx-auto"></div>
          <div className="absolute inset-0 animate-ping w-12 h-12 border-4 border-purple-200 rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  );

  const renderFinalScore = () => {
    const scoreInfo = getScoreMessage();
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Victory background effects */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🌟', '🌱', '🌍', '✨', '🎉'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
        
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl text-center max-w-lg border border-white/30 relative z-10">
          <div className="mb-6">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Mission Accomplished!
            </h2>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-100 to-green-100 rounded-3xl p-8 mb-8 border-2 border-yellow-300/50">
            <div className="text-5xl font-bold text-gray-800 mb-3">{score}/100</div>
            <div className={`text-2xl font-bold ${scoreInfo.color}`}>{scoreInfo.message}</div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 mb-8">
            <p className="text-gray-700 text-lg leading-relaxed">
              You've mastered all environments and discovered the power of eco-friendly choices! 
              Every decision counts in protecting our beautiful planet.
            </p>
          </div>

          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto border-2 border-green-400/50"
          >
            <RotateCcw className="w-6 h-6" />
            New Adventure
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