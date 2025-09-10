import { Leaf, TreePine, Recycle, Heart, Droplets, Sun } from "lucide-react";
import { useEffect } from "react";

export const FeatureSection = () => {
  useEffect(() => {
    // Inject styles and font
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Asimovian&display=swap');
      
      .asimovian-font {
        font-family: "Asimovian", sans-serif;
        font-weight: 400;
        font-style: normal;
        letter-spacing: -0.02em;
      }
      
      .nature-grow {
        animation: natureGrow 3s ease-in-out infinite alternate;
      }
      
      .floating-leaf {
        animation: floatingLeaf 4s ease-in-out infinite;
      }
      
      .floating-leaf-2 {
        animation: floatingLeaf2 5s ease-in-out infinite;
      }
      
      .floating-leaf-3 {
        animation: floatingLeaf3 6s ease-in-out infinite;
      }
      
      .tree-sway {
        animation: treeSway 4s ease-in-out infinite;
        transform-origin: bottom center;
      }
      
      .ripple-effect {
        animation: rippleEffect 3s ease-in-out infinite;
      }
      
      .card-float {
        animation: cardFloat 6s ease-in-out infinite;
      }
      
      .card-float-2 {
        animation: cardFloat 7s ease-in-out infinite 1s;
      }
      
      .card-float-3 {
        animation: cardFloat 8s ease-in-out infinite 2s;
      }
      
      .card-float-4 {
        animation: cardFloat 6s ease-in-out infinite 3s;
      }
      
      .pulse-glow {
        animation: pulseGlow 2s ease-in-out infinite alternate;
      }
      
      @keyframes natureGrow {
        0% { transform: scale(1) rotate(0deg); }
        100% { transform: scale(1.05) rotate(2deg); }
      }
      
      @keyframes floatingLeaf {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
      }
      
      @keyframes floatingLeaf2 {
        0%, 100% { transform: translateY(-10px) rotate(5deg); }
        50% { transform: translateY(-30px) rotate(-5deg); }
      }
      
      @keyframes floatingLeaf3 {
        0%, 100% { transform: translateY(-5px) rotate(-3deg); }
        50% { transform: translateY(-25px) rotate(8deg); }
      }
      
      @keyframes treeSway {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(1deg); }
        75% { transform: rotate(-1deg); }
      }
      
      @keyframes rippleEffect {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
      
      @keyframes cardFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(1deg); }
      }
      
      @keyframes pulseGlow {
        0% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
        100% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
      }
    `;
    
    document.head.appendChild(styleSheet);
    
    return () => {
      // Cleanup
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="bg-white">

      {/* Eco concepts that click - Full width with nature scene */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Nature Video */}
            <div className="relative">
              {/* Background rounded container */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl overflow-hidden">
                <video 
                  className="w-full h-full object-cover rounded-3xl"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="https://cdn.pixabay.com/video/2019/08/15/26070-357512237_large.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* Right side - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 asimovian-font">
                Eco Concepts that Clicks
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Interactive lessons make environmental concepts easy to understand. Instant feedback helps you become an eco-champion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learn at your impact level - Full width with enhanced eco course cards */}
      <section className="py-24 px-6 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 asimovian-font">
                Learn at your Impact Level
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Start with simple eco-actions or tackle complex environmental challenges. Perfect for eco-warriors of all ages.
              </p>
            </div>
            
            {/* Right side - Enhanced Eco Course cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Sustainable Living card */}
              <div style={{background: "linear-gradient(135deg, rgba(209, 250, 229, 0.8) 0%, rgba(167, 243, 208, 0.8) 100%)"}} className="rounded-2xl p-6 border border-green-200 relative overflow-hidden card-hover card-subtle-float">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 icon-pulse">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Sustainable Living</h3>
              </div>
              
              {/* Renewable Energy card */}
              <div style={{background: "linear-gradient(135deg, rgba(209, 250, 229, 0.8) 0%, rgba(167, 243, 208, 0.8) 100%)"}} className="rounded-2xl p-6 border border-gray-200 card-hover card-subtle-float-2">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 icon-pulse">
                    <Sun className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Renewable Energy</h3>
              </div>
              
              {/* Water Conservation card */}
              <div style={{background: "linear-gradient(135deg, rgba(209, 250, 229, 0.8) 0%, rgba(167, 243, 208, 0.8) 100%)"}} className="rounded-2xl p-6 border border-gray-200 card-hover card-subtle-float-3">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 icon-pulse">
                    <Droplets className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Water Conservation</h3>
              </div>
              
              {/* Recycling Mastery card */}
              <div style={{background: "linear-gradient(135deg, rgba(209, 250, 229, 0.8) 0%, rgba(167, 243, 208, 0.8) 100%)"}} className="rounded-2xl p-6 border border-gray-200 card-hover card-subtle-float-4">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 icon-pulse">
                    <Recycle className="w-8 h-8 text-green-700" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Recycling Mastery</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay eco-motivated - Simple centered section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center">
              <Heart className="w-10 h-10 text-green-600 nature-grow" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 asimovian-font">
            Stay Eco-motivated
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Make every day greener with engaging eco-lessons, rewards for green actions, and daily environmental inspiration.
          </p>
        </div>
      </section>
    </div>
  );
};