import { Leaf, TreePine, Recycle, Heart } from "lucide-react";

export const FeatureSection = () => {
  return (
    <div className="bg-background">
      {/* Eco concepts that click - Full width with sustainability visual */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Rotating Earth */}
            <div className="relative">
              {/* Background geometric pattern */}
              <div className="absolute inset-0 bg-gray-50 rounded-3xl"></div>
              
              {/* Rotating Earth visualization */}
              <div className="relative p-16 flex items-center justify-center">
                <div className="relative">
                  {/* Rotating Earth */}
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl animate-rotate-earth">
                    {/* Continents with rotating animation */}
                    <div className="absolute inset-0 rounded-full">
                      <div className="absolute top-8 left-12 w-12 h-8 bg-green-500 rounded-full opacity-80"></div>
                      <div className="absolute top-16 right-8 w-16 h-12 bg-green-600 rounded-full opacity-70"></div>
                      <div className="absolute bottom-12 left-8 w-10 h-14 bg-green-400 rounded-full opacity-90"></div>
                      <div className="absolute bottom-8 right-12 w-8 h-6 bg-green-500 rounded-full opacity-75"></div>
                    </div>
                    
                    {/* Central eco symbol */}
                    <div className="relative z-10 w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Heart className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  {/* Orbital elements */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-eco-green rounded-full flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-eco-blue rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-eco-yellow rounded-full flex items-center justify-center">
                      <Recycle className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-8 h-8 bg-eco-leaf rounded-full flex items-center justify-center">
                      <TreePine className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Eco concepts that click
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Interactive lessons make environmental concepts easy to understand. Instant feedback helps you become an eco-champion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learn at your impact level - Full width with eco course cards */}
      <section className="py-24 px-6 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Learn at your impact level
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Start with simple eco-actions or tackle complex environmental challenges. Perfect for eco-warriors of all ages.
              </p>
            </div>
            
            {/* Right side - Eco Course cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Sustainable Living card */}
              <div className="bg-white rounded-2xl p-6 border border-eco-green/20 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-eco-green text-white px-3 py-1 rounded-full text-xs font-bold">
                  🌱 FOR YOU
                </div>
                <div className="mb-4">
                  <div className="w-16 h-16 bg-eco-green/10 rounded-2xl flex items-center justify-center mb-4">
                    <Leaf className="w-8 h-8 text-eco-green" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Sustainable Living</h3>
              </div>
              
              {/* Renewable Energy card */}
              <div className="bg-white rounded-2xl p-6 border border-border/20">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-eco-yellow/10 rounded-2xl flex items-center justify-center mb-4">
                    <div className="w-8 h-8 bg-eco-yellow rounded"></div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Renewable Energy</h3>
              </div>
              
              {/* Additional cards */}
              <div className="bg-white rounded-2xl p-6 border border-border/20">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-eco-blue/10 rounded-2xl flex items-center justify-center mb-4">
                    <div className="w-8 h-8 bg-eco-blue rounded"></div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Water Conservation</h3>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-border/20">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-eco-brown/10 rounded-2xl flex items-center justify-center mb-4">
                    <Recycle className="w-8 h-8 text-eco-brown" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Recycling Mastery</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay eco-motivated - Simple centered section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-eco-green/10 rounded-2xl flex items-center justify-center">
              <Heart className="w-10 h-10 text-eco-green" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Stay eco-motivated
          </h2>
          
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Make every day greener with engaging eco-lessons, rewards for green actions, and daily environmental inspiration.
          </p>
        </div>
      </section>
    </div>
  );
};