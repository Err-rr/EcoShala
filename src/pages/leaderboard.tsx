import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  Star,
  Users,
  GraduationCap,
  School,
  Search,
  Filter,
  Crown,
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';

// Move TypeScript declarations here or to a separate .d.ts file
declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('students');
  const [timePeriod, setTimePeriod] = useState('monthly');
  const [searchQuery, setSearchQuery] = useState('');
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const vantaRef = useRef<HTMLDivElement>(null);

  // Sample leaderboard data
  const leaderboardData = {
    students: [
      { id: 1, name: "Priya Sharma", school: "Delhi Public School", points: 2450, avatar: "PS", level: "Gold", streak: 15, badges: 12 },
      { id: 2, name: "Arjun Patel", school: "St. Mary's School", points: 2380, avatar: "AP", level: "Gold", streak: 12, badges: 10 },
      { id: 3, name: "Sneha Reddy", school: "Kendriya Vidyalaya", points: 2290, avatar: "SR", level: "Silver", streak: 18, badges: 15 },
      { id: 4, name: "Rohit Kumar", school: "DAV Public School", points: 2150, avatar: "RK", level: "Silver", streak: 8, badges: 9 },
      { id: 5, name: "Ananya Singh", school: "Ryan International", points: 2080, avatar: "AS", level: "Silver", streak: 22, badges: 11 },
      { id: 6, name: "Vikram Gupta", school: "Modern School", points: 1950, avatar: "VG", level: "Bronze", streak: 7, badges: 8 },
      { id: 7, name: "Ishita Jain", school: "Blue Bells School", points: 1890, avatar: "IJ", level: "Bronze", streak: 14, badges: 7 },
      { id: 8, name: "Karan Malhotra", school: "Springdales School", points: 1820, avatar: "KM", level: "Bronze", streak: 5, badges: 6 }
    ],
    teachers: [
      { id: 1, name: "Dr. Rajesh Verma", school: "Delhi Public School", points: 3200, avatar: "RV", students: 156, courses: 8 },
      { id: 2, name: "Ms. Sunita Agarwal", school: "St. Mary's School", points: 3050, avatar: "SA", students: 142, courses: 6 },
      { id: 3, name: "Prof. Amit Sharma", school: "Kendriya Vidyalaya", points: 2890, avatar: "AS", students: 128, courses: 7 },
      { id: 4, name: "Mrs. Pooja Gupta", school: "DAV Public School", points: 2750, avatar: "PG", students: 134, courses: 5 },
      { id: 5, name: "Mr. Sanjay Kumar", school: "Ryan International", points: 2680, avatar: "SK", students: 119, courses: 6 }
    ],
    schools: [
      { id: 1, name: "Delhi Public School", location: "New Delhi", points: 45600, avatar: "DPS", students: 890, teachers: 45 },
      { id: 2, name: "St. Mary's School", location: "Mumbai", points: 42300, avatar: "SMS", students: 756, teachers: 38 },
      { id: 3, name: "Kendriya Vidyalaya", location: "Bangalore", points: 38900, avatar: "KV", students: 692, teachers: 35 },
      { id: 4, name: "DAV Public School", location: "Chennai", points: 36800, avatar: "DAV", students: 634, teachers: 32 },
      { id: 5, name: "Ryan International", location: "Pune", points: 34500, avatar: "RI", students: 578, teachers: 29 }
    ]
  };

  // Load external scripts
  const loadScript = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }, []);

  // Initialize Vanta effect
  const initVantaEffect = useCallback(() => {
    if (vantaRef.current && window.VANTA && window.THREE && !vantaEffect) {
      try {
        const effect = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x22c55e,
          backgroundColor: 0xd1fae5,
          points: 6,
          maxDistance: 30,
          spacing: 20
        });
        setVantaEffect(effect);
      } catch (error) {
        console.error('Failed to initialize Vanta effect:', error);
      }
    }
  }, [vantaEffect]);

  // Load scripts effect
  useEffect(() => {
    const loadScripts = async () => {
      try {
        // Load THREE.js first
        if (!window.THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        }

        // Load Vanta.js after THREE.js
        if (!window.VANTA) {
          await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js');
        }

        setScriptsLoaded(true);
      } catch (error) {
        console.error('Failed to load external scripts:', error);
      }
    };

    loadScripts();
  }, [loadScript]);

  // Initialize Vanta effect when scripts are loaded
  useEffect(() => {
    if (scriptsLoaded) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(initVantaEffect, 100);
      return () => clearTimeout(timer);
    }
  }, [scriptsLoaded, initVantaEffect]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (vantaEffect && typeof vantaEffect.destroy === 'function') {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Silver':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Bronze':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const filteredData = leaderboardData[activeTab as keyof typeof leaderboardData]?.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div 
      ref={vantaRef}
      className="min-h-screen w-full relative"
    >
      {/* Header */}
      <header className="relative z-20 bg-white/90 backdrop-blur-sm border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link to="/">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Back to Home</span>
                </button>
              </Link>
              <div className="flex items-center gap-2">
                <Trophy className="w-8 h-8 text-green-600" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">EcoShala Leaderboard</h1>
              </div>
            </div>
            
            {/* Time Period Selector */}
            <div className="hidden sm:flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <select 
                value={timePeriod} 
                onChange={(e) => setTimePeriod(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="weekly">This Week</option>
                <option value="monthly">This Month</option>
                <option value="yearly">This Year</option>
                <option value="alltime">All Time</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">12,847</p>
              </div>
              <GraduationCap className="w-12 h-12 text-green-500 opacity-20" />
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+8.2% from last month</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Teachers</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">1,256</p>
              </div>
              <Users className="w-12 h-12 text-green-500 opacity-20" />
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+5.7% from last month</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Partner Schools</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">342</p>
              </div>
              <School className="w-12 h-12 text-green-500 opacity-20" />
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12.1% from last month</span>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-100 overflow-hidden">
          
          {/* Tab Navigation */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex space-x-1 bg-white rounded-xl p-1 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('students')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === 'students'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="hidden sm:inline">Students</span>
                </button>
                <button
                  onClick={() => setActiveTab('teachers')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === 'teachers'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Teachers</span>
                </button>
                <button
                  onClick={() => setActiveTab('schools')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === 'schools'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <School className="w-4 h-4" />
                  <span className="hidden sm:inline">Schools</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          {/* Leaderboard Content */}
          <div className="p-4 sm:p-6">
            {/* Top 3 Podium */}
            {filteredData.length >= 3 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Top Performers</h3>
                <div className="flex justify-center items-end gap-2 sm:gap-4 mb-8">
                  {/* 2nd Place */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg mb-2">
                        {filteredData[1].avatar}
                      </div>
                      <div className="absolute -top-1 -right-1 bg-gray-400 rounded-full p-1">
                        <Medal className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-t from-gray-300 to-gray-200 px-2 sm:px-4 py-4 sm:py-6 rounded-t-lg min-h-[60px] sm:min-h-[80px] flex flex-col justify-end items-center">
                      <p className="font-semibold text-xs sm:text-sm text-center leading-tight">{filteredData[1].name}</p>
                      <p className="text-xs text-gray-600 mt-1">{filteredData[1].points.toLocaleString()} pts</p>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mb-2">
                        {filteredData[0].avatar}
                      </div>
                      <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                        <Crown className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-t from-yellow-400 to-yellow-300 px-2 sm:px-4 py-6 sm:py-8 rounded-t-lg min-h-[80px] sm:min-h-[100px] flex flex-col justify-end items-center">
                      <p className="font-bold text-sm sm:text-base text-center leading-tight">{filteredData[0].name}</p>
                      <p className="text-xs sm:text-sm text-yellow-800 mt-1">{filteredData[0].points.toLocaleString()} pts</p>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg mb-2">
                        {filteredData[2].avatar}
                      </div>
                      <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-1">
                        <Award className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-t from-amber-400 to-amber-300 px-2 sm:px-4 py-4 sm:py-6 rounded-t-lg min-h-[60px] sm:min-h-[80px] flex flex-col justify-end items-center">
                      <p className="font-semibold text-xs sm:text-sm text-center leading-tight">{filteredData[2].name}</p>
                      <p className="text-xs text-amber-800 mt-1">{filteredData[2].points.toLocaleString()} pts</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Rankings List */}
            <div className="space-y-4">
              {filteredData.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                    index < 3
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-10 sm:w-12 flex-shrink-0">
                      {getRankIcon(index + 1)}
                    </div>
                    
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                      {item.avatar}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.name}</h3>
                      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                        {activeTab === 'students' && (
                          <>
                            <School className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{item.school}</span>
                          </>
                        )}
                        {activeTab === 'teachers' && (
                          <>
                            <Users className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{item.students} students • {item.courses} courses</span>
                          </>
                        )}
                        {activeTab === 'schools' && (
                          <>
                            <MapPin className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{item.location} • {item.students} students</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    {activeTab === 'students' && (
                      <div className="hidden sm:flex items-center gap-4">
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-orange-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">{item.streak}</span>
                          </div>
                          <p className="text-xs text-gray-500">streak</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getLevelColor(item.level)}`}>
                          {item.level}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-right">
                      <div className="text-lg sm:text-xl font-bold text-green-600">
                        {item.points.toLocaleString()}
                      </div>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
