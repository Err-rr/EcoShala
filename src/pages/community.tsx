import React, { useState } from 'react';
import { 
  MessageSquare, 
  Activity, 
  Trophy, 
  Camera, 
  Users, 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  ThumbsUp, 
  MessageCircle, 
  Share, 
  Star,
  Calendar,
  Target,
  Upload,
  Award
} from 'lucide-react';

export default function EcoShalaCommunity() {
  const [activeTab, setActiveTab] = useState('forum');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for demonstration
  const forumPosts = [
    {
      id: 1,
      title: "How to start composting at home?",
      author: "EcoNewbie",
      replies: 12,
      likes: 25,
      time: "2 hours ago",
      category: "Composting"
    },
    {
      id: 2,
      title: "Best plants for indoor air purification?",
      author: "GreenThumb22",
      replies: 8,
      likes: 18,
      time: "5 hours ago",
      category: "Indoor Plants"
    }
  ];

  const activityFeed = [
    {
      id: 1,
      user: "Sarah M.",
      action: "completed EcoQuest: Water Conservation Week",
      time: "1 hour ago",
      likes: 15,
      comments: 3
    },
    {
      id: 2,
      user: "Alex K.",
      action: "reached #1 on the leaderboard 🏆",
      time: "3 hours ago",
      likes: 28,
      comments: 7
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Plastic-Free Week Challenge",
      participants: 234,
      daysLeft: 5,
      progress: 65,
      image: "🚫🥤"
    },
    {
      id: 2,
      title: "Energy Saver Month",
      participants: 189,
      daysLeft: 12,
      progress: 40,
      image: "⚡💡"
    }
  ];

  const showcaseProjects = [
    {
      id: 1,
      title: "Community Garden Project",
      author: "Maya P.",
      likes: 45,
      image: "🌱🏡",
      description: "Started a rooftop garden with 20 neighbors!"
    },
    {
      id: 2,
      title: "DIY Solar Cooker",
      author: "Raj S.",
      likes: 38,
      image: "☀️👨‍🍳",
      description: "Built a solar cooker using cardboard and foil"
    }
  ];

  const teams = [
    {
      id: 1,
      name: "Green Warriors",
      members: 12,
      points: 1250,
      rank: 1
    },
    {
      id: 2,
      name: "Eco Champions",
      members: 8,
      points: 980,
      rank: 2
    }
  ];

  const resources = [
    {
      id: 1,
      title: "Complete Guide to Home Composting",
      type: "Tutorial",
      author: "Team Vortex",
      rating: 4.8,
      views: 1200
    },
    {
      id: 2,
      title: "10 Easy Water Conservation Tips",
      type: "Article",
      author: "EcoExpert",
      rating: 4.6,
      views: 890
    }
  ];

  const tabs = [
    { id: 'forum', label: 'Discussion Forum', icon: MessageSquare },
    { id: 'activity', label: 'Activity Feed', icon: Activity },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'showcase', label: 'Showcase Wall', icon: Camera },
    { id: 'teams', label: 'Study Groups', icon: Users },
    { id: 'resources', label: 'Resources', icon: BookOpen }
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'radial-gradient(ellipse at center, #f0f9ff 0%, #ecfdf5 30%, #f0fdf4 70%, #dcfce7 100%)'
      }}
    >
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-lg border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                EcoShala Community 🌱
              </h1>
              <p className="text-gray-700 text-lg"
                 style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                Connect, Learn, and Make a Difference Together
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition-all duration-300 flex items-center gap-2"
                      style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                <Plus className="w-5 h-5" />
                New Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/30 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/50'
                  }`}
                  style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Discussion Forum */}
        {activeTab === 'forum' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search discussions..."
                    className="w-full pl-12 pr-4 py-3 bg-white/50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                    style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100/60 rounded-2xl hover:bg-gray-200/60 transition-all duration-300"
                        style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                  <Filter className="w-5 h-5" />
                  Filter
                </button>
              </div>
            </div>

            {/* Forum Posts */}
            <div className="space-y-4">
              {forumPosts.map((post) => (
                <div key={post.id} className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2"
                          style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                        {post.title}
                      </h3>
                      <p className="text-gray-600"
                         style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                        by {post.author} • {post.time}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                          style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-gray-500">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.replies} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Feed */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            {activityFeed.map((activity) => (
              <div key={activity.id} className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 mb-2"
                       style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-gray-500 text-sm mb-3"
                       style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      {activity.time}
                    </p>
                    <div className="flex items-center gap-4 text-gray-500">
                      <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                        <span className="text-green-600">🌱</span>
                        <span>{activity.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{activity.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        <Share className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Challenges */}
        {activeTab === 'challenges' && (
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{challenge.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                    {challenge.title}
                  </h3>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{challenge.participants} participants</span>
                    <span>{challenge.daysLeft} days left</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-green-600">{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-2xl font-semibold hover:bg-green-700 transition-all duration-300"
                        style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                  Join Challenge
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Showcase Wall */}
        {activeTab === 'showcase' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                Eco-Project Gallery
              </h2>
              <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition-all duration-300"
                      style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                <Upload className="w-5 h-5" />
                Share Project
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showcaseProjects.map((project) => (
                <div key={project.id} className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-4">{project.image}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2"
                        style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3"
                       style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      by {project.author}
                    </p>
                    <p className="text-gray-700"
                       style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      {project.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors">
                      <span>❤️</span>
                      <span>{project.likes}</span>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Study Groups / Teams */}
        {activeTab === 'teams' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                Eco-Teams Leaderboard
              </h2>
              <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition-all duration-300"
                      style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                <Plus className="w-5 h-5" />
                Create Team
              </button>
            </div>
            <div className="space-y-4">
              {teams.map((team) => (
                <div key={team.id} className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                          #{team.rank} {team.name}
                        </h3>
                        <p className="text-gray-600"
                           style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                          {team.members} members • {team.points} points
                        </p>
                      </div>
                    </div>
                    <button className="bg-green-100 text-green-700 px-4 py-2 rounded-2xl font-semibold hover:bg-green-200 transition-all duration-300"
                            style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      Join Team
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        {activeTab === 'resources' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                Eco-Learning Resources
              </h2>
              <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition-all duration-300"
                      style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                <Plus className="w-5 h-5" />
                Submit Resource
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <div key={resource.id} className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block"
                            style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                        {resource.type}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2"
                          style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm"
                         style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                        by {resource.author}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{resource.rating}</span>
                      </div>
                      <span>{resource.views} views</span>
                    </div>
                    <button className="bg-green-100 text-green-700 px-4 py-2 rounded-2xl font-semibold hover:bg-green-200 transition-all duration-300"
                            style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
