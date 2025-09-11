import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Position {
  left: number;
  top: number;
}

interface Level {
  id: number;
  status: 'completed' | 'current' | 'available' | 'locked';
  icon: string | null;
  title: string;
  position: Position;
}

interface FloatingLeaf {
  id: number;
  top: number;
  animationDelay: number;
}

interface LevelStoneProps {
  level: Level;
}

const QuestPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [floatingLeaves, setFloatingLeaves] = useState<FloatingLeaf[]>([]);

  const levels: Level[] = [
    { id: 1, status: 'completed', icon: '1', title: 'Introduction to Sustainability', position: { left: 70, top: 470 } },
    { id: 2, status: 'available', icon: '2', title: 'FoodChain Basics', position: { left: 180, top: 320 } },
    { id: 3, status: 'available', icon: null, title: 'Habitat Quest', position: { left: 370, top: 370 } },
    { id: 4, status: 'available', icon: null, title: 'EcoSwipe', position: { left: 570, top: 380 } },
    { id: 5, status: 'available', icon: null, title: 'Biodiversity Explorer', position: { left: 670, top: 230 } },
    { id: 6, status: 'available', icon: null, title: 'Climate Action Simulator', position: { left: 800, top: 150 } },
    { id: 7, status: 'available', icon: null, title: 'Advanced Eco Solutions', position: { left: 970, top: 220 } },
    { id: 8, status: 'available', icon: null, title: 'Green Innovation Lab', position: { left: 920, top: 450 } },
  ];

  useEffect(() => {
    const createFloatingLeaf = (): void => {
      const leafId = Date.now() + Math.random();
      const newLeaf: FloatingLeaf = {
        id: leafId,
        top: Math.random() * 100,
        animationDelay: Math.random() * 2,
      };
      
      setFloatingLeaves(prev => [...prev, newLeaf]);
      
      setTimeout(() => {
        setFloatingLeaves(prev => prev.filter(leaf => leaf.id !== leafId));
      }, 8000);
    };

    const interval = setInterval(createFloatingLeaf, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLevelClick = (level: Level): void => {
    if (level.status !== 'locked') {
      setSelectedLevel(level.id);
      console.log(`Level ${level.id} selected: ${level.title}`);
      
      setTimeout(() => {
        if (level.id === 1) {
          navigate('/game', { state: { ...level } });
        } else if (level.id === 2) {
          navigate('/gametwo', { state: { ...level } });
        } else if (level.id === 3){
          navigate('/gamethree', { state: { ...level } });
        }
        else if (level.id === 4){
          navigate('/gamefour', { state: { ...level } });
        }
        else if (level.id === 5){
          navigate('/gamefive', { state: { ...level } });
        }
        else {
          navigate('/gamesix', { state: { ...level } });
        }
      }, 1500);
    }
  };

  const LevelStone: React.FC<LevelStoneProps> = ({ level }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
      <div
        className={`level-stone ${level.status}`}
        style={{
          left: `${level.position.left}px`,
          top: `${level.position.top}px`,
          transform: selectedLevel === level.id ? 'scale(0.9)' : 'scale(1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleLevelClick(level)}
      >
        <div className="stone-base">
          <div className="level-text">LEVEL</div>
          {level.icon ? (
            <div className="eco-icon">{level.icon}</div>
          ) : (
            <div className="level-number">{level.id}</div>
          )}
        </div>
        
        <div className={`tooltip ${isHovered ? 'visible' : ''}`}>
          {selectedLevel === level.id ? 'Loading Level...' : level.title}
        </div>
        
        {level.status === 'completed' && (
          <>
            <div className="sparkle" style={{ top: '-10px', left: '10px' }}></div>
            <div className="sparkle" style={{ top: '10px', right: '5px' }}></div>
            <div className="sparkle" style={{ bottom: '5px', left: '15px' }}></div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="game-board-container">
      <div className="game-board">
        <div className="grass-texture"></div>
        
        {/* Header */}
        <div className="header">
          <div className="level-selection-title">LEVEL SELECTION</div>
          <div className="subtitle">Choose Your Eco Adventure</div>
        </div>

        {/* Environmental decorations */}
        <div className="tree tree-medium" style={{ top: '100px', left: '150px' }}></div>
        <div className="tree tree-small" style={{ top: '200px', right: '200px' }}></div>
        <div className="tree tree-medium" style={{ bottom: '150px', left: '250px' }}></div>
        <div className="tree tree-small" style={{ bottom: '100px', right: '150px' }}></div>

        <div className="bush" style={{ top: '180px', left: '300px' }}></div>
        <div className="bush" style={{ top: '350px', right: '300px' }}></div>
        <div className="bush" style={{ bottom: '200px', left: '500px' }}></div>

        <div className="flower" style={{ top: '250px', left: '200px' }}></div>
        <div className="flower" style={{ top: '400px', right: '250px' }}></div>
        <div className="flower" style={{ bottom: '250px', left: '400px' }}></div>
        <div className="flower" style={{ bottom: '180px', right: '200px' }}></div>

        {/* Winding path */}
        <svg className="path-container" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <path className="path-border" d="M 100 500 Q 200 300 400 400 Q 600 500 700 300 Q 800 100 1000 250 Q 1100 350 950 500"/>
          <path className="dirt-path" d="M 100 500 Q 200 300 400 400 Q 600 500 700 300 Q 800 100 1000 250 Q 1100 350 950 500"/>
          <path className="path-dots" d="M 100 500 Q 200 300 400 400 Q 600 500 700 300 Q 800 100 1000 250 Q 1100 350 950 500"/>
        </svg>

        {/* Level stones */}
        {levels.map((level: Level) => (
          <LevelStone key={level.id} level={level} />
        ))}

        {/* Floating leaves */}
        {floatingLeaves.map((leaf: FloatingLeaf) => (
          <div
            key={leaf.id}
            className="floating-leaf"
            style={{
              top: `${leaf.top}%`,
              animationDelay: `${leaf.animationDelay}s`,
            }}
          >
            🍃
          </div>
        ))}
      </div>

      <style>{`
        .game-board-container {
          width: 100%;
          min-height: 100vh;
          background: #2d4a3a;
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }

      .game-board {
  width: 100%;
  max-width: 1200px;
  height: 700px;
  margin: 0 auto;
  background: url("https://cdna.artstation.com/p/assets/images/images/000/274/998/large/Sorcery_Concept03.jpg?1414573459")
    no-repeat center center / cover;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}


        .header {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
        }

        .level-selection-title {
          font-size: 3rem;
          color: white;
          text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.5);
          letter-spacing: 3px;
          text-align: center;
          margin-bottom: 5px;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #31521dff;
          text-align: center;
         font-weight: bold;
        }

      

        .flower {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #ffeb3b;
          border-radius: 50%;
          z-index: 3;
          animation: flowerBob 3s ease-in-out infinite;
        }

        .flower::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle, rgba(255, 235, 59, 0.6) 0%, transparent 70%);
          border-radius: 50%;
        }

        .path-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
        }

        .dirt-path {
          fill: none;
          stroke: #6ea42cff;
          stroke-width: 60;
          stroke-linecap: round;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .path-border {
          fill: none;
          stroke: #2e603cff;
          stroke-width: 70;
          stroke-linecap: round;
          opacity: 0.7;
        }

        .path-dots {
          fill: none;
          stroke: #654321;
          stroke-width: 4;
          stroke-dasharray: 8, 12;
          stroke-linecap: round;
          opacity: 0.6;
          animation: pathMove 10s linear infinite;
        }

        .level-stone {
          position: absolute;
          width: 80px;
          height: 80px;
          cursor: pointer;
          z-index: 20;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .level-stone:hover {
          transform: scale(1.1);
        }

        .level-stone:active {
          transform: scale(0.95);
        }

        .stone-base {
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, #f5f5dc 0%, #ddd8c0 100%);
          border-radius: 50%;
          position: relative;
          box-shadow: 
            0 8px 16px rgba(0, 0, 0, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.6),
            inset 0 -2px 4px rgba(0, 0, 0, 0.1);
          border: 4px solid #c4b896;
        }

        .stone-base::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          bottom: 8px;
          background: radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%);
          border-radius: 50%;
        }

        .level-text {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          color: #5d4e37;
          font-weight: bold;
          text-align: center;
          line-height: 1;
        }

        .level-number {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          font-weight: bold;
          color: #3e2723;
          text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
        }

        .eco-icon {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 28px;
          line-height: 1;
          filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
        }

        .level-stone.completed .stone-base {
          background: linear-gradient(145deg, #ffd700 0%, #ffb300 100%);
          border-color: #e6a000;
          animation: completedGlow 2s ease-in-out infinite alternate;
        }

        .level-stone.current .stone-base {
          background: linear-gradient(145deg, #4caf50 0%, #388e3c 100%);
          border-color: #2e7d32;
          animation: currentPulse 1.5s ease-in-out infinite;
        }

        .level-stone.locked .stone-base {
          background: linear-gradient(145deg, #9e9e9e 0%, #757575 100%);
          border-color: #616161;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .level-stone.locked .level-number,
        .level-stone.locked .level-text {
          color: #424242;
        }

        .tooltip {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(46, 125, 50, 0.95);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          white-space: nowrap;
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 50;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .tooltip.visible {
          opacity: 1;
          transform: translateX(-50%) translateY(-10px);
        }

        .tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 8px solid transparent;
          border-top-color: rgba(46, 125, 50, 0.95);
        }

        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #fff700;
          border-radius: 50%;
          animation: sparkleFloat 3s ease-in-out infinite;
          z-index: 15;
        }

        .sparkle:nth-child(4) { animation-delay: 1s; }
        .sparkle:nth-child(5) { animation-delay: 2s; }

        .floating-leaf {
          position: absolute;
          fontSize: 20px;
          left: -50px;
          z-index: 1;
          animation: leafFloat 8s linear forwards;
        }

        @keyframes grassMove {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(5px) translateY(-2px); }
          50% { transform: translateX(-3px) translateY(2px); }
          75% { transform: translateX(2px) translateY(-1px); }
        }

        @keyframes pathMove {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 20; }
        }

        @keyframes completedGlow {
          from { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 0 rgba(255, 215, 0, 0.7); }
          to { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.4); }
        }

        @keyframes currentPulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 0 rgba(76, 175, 80, 0.7); 
          }
          50% { 
            transform: scale(1.05); 
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(76, 175, 80, 0.6); 
          }
        }

        @keyframes flowerBob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(5deg); }
        }

        @keyframes sparkleFloat {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0); }
          50% { opacity: 1; transform: translateY(-20px) scale(1); }
        }

        @keyframes leafFloat {
          from { 
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          to { 
            transform: translateX(1300px) translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .game-board {
            height: 500px;
            margin: 10px;
          }
          
          .level-selection-title {
            font-size: 2rem;
          }
          
          .level-stone {
            width: 60px;
            height: 60px;
          }
          
          .level-number {
            font-size: 18px;
          }
          
          .eco-icon {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};


export default QuestPage;
