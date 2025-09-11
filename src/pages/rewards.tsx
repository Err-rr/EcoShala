import React, { useState } from 'react';
import { 
  Star, 
  Gift, 
  Trophy, 
  Award, 
  Target, 
  Crown,
  Leaf,
  Droplets,
  Recycle,
  Sun,
  Trees,
  Heart,
  Zap,
  Shield
} from 'lucide-react';

export default function EcoShalaRewards() {
  const [activeSection, setActiveSection] = useState('overview');
  
  // User data
  const userStats = {
    totalPoints: 2350,
    currentTier: 'Eco Champion',
    nextTier: 'Eco Master',
    nextTierPoints: 3000,
    weeklyPoints: 180,
    monthlyPoints: 750,
    totalBadges: 12,
    completedChallenges: 8
  };

  // Calculate progress
  const progressPercentage = Math.min((userStats.totalPoints / userStats.nextTierPoints) * 100, 100);
  const pointsToNext = userStats.nextTierPoints - userStats.totalPoints;

  // Badges data
  const badges = [
    {
      id: 1,
      name: 'Eco Starter',
      description: 'Completed your first eco-action',
      icon: <Leaf className="w-8 h-8" />,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      earned: true,
      dateEarned: '2025-08-15'
    },
    {
      id: 2,
      name: 'Water Guardian',
      description: 'Saved 100L of water in challenges',
      icon: <Droplets className="w-8 h-8" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      earned: true,
      dateEarned: '2025-08-20'
    },
    {
      id: 3,
      name: 'Recycling Hero',
      description: 'Recycled 50 items this month',
      icon: <Recycle className="w-8 h-8" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      earned: true,
      dateEarned: '2025-08-25'
    },
    {
      id: 4,
      name: 'Solar Pioneer',
      description: 'Used solar energy for 30 days',
      icon: <Sun className="w-8 h-8" />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      earned: true,
      dateEarned: '2025-09-01'
    },
    {
      id: 5,
      name: 'Forest Protector',
      description: 'Plant and care for 25 trees',
      icon: <Trees className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      earned: false,
      progress: 18,
      total: 25
    },
    {
      id: 6,
      name: 'Eco Influencer',
      description: 'Get 100 people to join eco-actions',
      icon: <Heart className="w-8 h-8" />,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      earned: false,
      progress: 45,
      total: 100
    }
  ];

  // Rewards data
  const rewards = [
    {
      id: 1,
      name: 'EcoShala Bamboo Water Bottle',
      description: 'Sustainable bamboo water bottle with EcoShala logo',
      pointsRequired: 1000,
      category: 'Eco Products',
      image: '🎋💧',
      available: true
    },
    {
      id: 2,
      name: 'Organic Cotton Tote Bag',
      description: 'Reusable tote bag made from 100% organic cotton',
      pointsRequired: 1500,
      category: 'Eco Products',
      image: '🛍️🌿',
      available: true
    },
    {
      id: 3,
      name: 'Solar Power Bank',
      description: '10,000mAh solar-powered portable charger',
      pointsRequired: 2500,
      category: 'Tech',
      image: '⚡☀️',
      available: true
    },
    {
      id: 4,
      name: 'Tree Planting Certificate',
      description: 'Plant a tree in your name in our partner forest',
      pointsRequired: 2000,
      category: 'Impact',
      image: '🌳📜',
      available: true
    },
    {
      id: 5,
      name: 'Eco Workshop Access',
      description: 'Free access to premium sustainability workshops',
      pointsRequired: 3500,
      category: 'Learning',
      image: '🎓🌱',
      available: false
    },
    {
      id: 6,
      name: 'Green Energy Kit',
      description: 'DIY solar panel and battery kit for learning',
      pointsRequired: 5000,
      category: 'Tech',
      image: '🔋🛠️',
      available: false
    }
  ];

  // Tier system
  const tiers = [
    { name: 'Eco Newcomer', points: 0, color: 'text-gray-500', icon: <Leaf className="w-6 h-6" /> },
    { name: 'Green Explorer', points: 500, color: 'text-green-500', icon: <Target className="w-6 h-6" /> },
    { name: 'Eco Warrior', points: 1000, color: 'text-blue-500', icon: <Shield className="w-6 h-6" /> },
    { name: 'Eco Champion', points: 2000, color: 'text-purple-500', icon: <Trophy className="w-6 h-6" /> },
    { name: 'Eco Master', points: 3000, color: 'text-yellow-500', icon: <Crown className="w-6 h-6" /> },
    { name: 'Eco Legend', points: 5000, color: 'text-red-500', icon: <Award className="w-6 h-6" /> }
  ];

  const canRedeemReward = (pointsRequired) => userStats.totalPoints >= pointsRequired;

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'radial-gradient(ellipse at center, #f0f9ff 0%, #ecfdf5 30%, #f0fdf4 70%, #dcfce7 100%)'
      }}
    >
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-lg border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
              🏆 Rewards & Achievements
            </h1>
            <p className="text-xl text-gray-700"
               style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
              Celebrate your eco-journey and unlock amazing rewards!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{userStats.totalPoints.toLocaleString()}</div>
            <div className="text-gray-700 font-medium"
                 style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
              Total Points
            </div>
          </div>
          
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{userStats.totalBadges}</div>
            <div className="text-gray-700 font-medium"
                 style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
              Badges Earned
            </div>
          </div>
          
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.completedChallenges}</div>
            <div className="text-gray-700 font-medium"
                 style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
              Challenges Won
            </div>
          </div>
          
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{userStats.weeklyPoints}</div>
            <div className="text-gray-700 font-medium"
                 style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
              This Week
            </div>
          </div>
        </div>

        {/* Current Tier Progress */}
        <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 border border-white/30 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
              Current Tier: {userStats.currentTier}
            </h2>
            <div className="flex justify-center items-center gap-4 mb-6">
              <Trophy className="w-8 h-8 text-purple-600" />
              <div className="text-lg text-gray-700"
                   style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                {pointsToNext > 0 ? `${pointsToNext} points to ${userStats.nextTier}` : 'Maximum tier reached!'}
              </div>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">{userStats.totalPoints} points</span>
                <span className="text-sm text-gray-600">{userStats.nextTierPoints} points</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-green-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-center mt-2 text-sm text-gray-600">
                {progressPercentage.toFixed(1)}% progress to next tier
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-1 border border-white/20">
            {['overview', 'badges', 'rewards'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${
                  activeSection === section
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/50'
                }`}
                style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        {(activeSection === 'overview' || activeSection === 'badges') && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center"
                style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
              🏅 Your Eco Badges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <div 
                  key={badge.id} 
                  className={`bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30 text-center transition-all duration-300 ${
                    badge.earned ? 'hover:shadow-lg' : 'opacity-75'
                  }`}
                >
                  <div className={`w-16 h-16 ${badge.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 ${badge.color}`}>
                    {badge.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2"
                      style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                    {badge.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4"
                     style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                    {badge.description}
                  </p>
                  
                  {badge.earned ? (
                    <div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                        ✅ Earned
                      </div>
                      <div className="text-xs text-gray-500">
                        {badge.dateEarned}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                        🔒 In Progress
                      </div>
                      {badge.progress && badge.total && (
                        <div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-600">
                            {badge.progress}/{badge.total}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rewards Section */}
        {(activeSection === 'overview' || activeSection === 'rewards') && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center"
                style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
              🎁 Redeem Rewards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => {
                const canRedeem = canRedeemReward(reward.pointsRequired);
                return (
                  <div 
                    key={reward.id} 
                    className={`bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30 transition-all duration-300 ${
                      canRedeem ? 'hover:shadow-lg' : 'opacity-75'
                    }`}
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{reward.image}</div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {reward.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2"
                        style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      {reward.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4"
                       style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      {reward.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-gray-900">
                          {reward.pointsRequired.toLocaleString()} pts
                        </span>
                      </div>
                      {!reward.available && (
                        <span className="text-xs text-red-500 font-medium">Coming Soon</span>
                      )}
                    </div>
                    
                    <button
                      disabled={!canRedeem || !reward.available}
                      className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 ${
                        canRedeem && reward.available
                          ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}
                    >
                      {!reward.available 
                        ? 'Coming Soon' 
                        : canRedeem 
                        ? 'Redeem Now' 
                        : `Need ${(reward.pointsRequired - userStats.totalPoints).toLocaleString()} more pts`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-8 mt-8 text-center border border-white/30">
          <h3 className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
            Keep Going, Eco Warrior! 🌟
          </h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto"
             style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
            Every small action counts toward a greener planet. You're making a real difference in the world!
          </p>
        </div>
      </div>
    </div>
  );
}
