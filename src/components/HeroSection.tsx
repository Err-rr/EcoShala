import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const r = useRef<HTMLDivElement | null>(null);
  const [v, setV] = useState<any>(null);

  useEffect(() => {
    if (!v && r.current) {
      const ve = BIRDS({
        el: r.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0xffffff,
        color1: 0x071404, // adjust as needed
        color2: 0x00ffb3, // adjust as needed
      });
      setV(ve);
    }
    return () => {
      if (v) v.destroy();
    };
  }, [v]);

  return (
    <section
      ref={r}
      className="relative min-h-[85vh] flex items-center justify-center px-6 py-12 overflow-hidden bg-background"
    >
      {/* Background Graphics - eco-themed */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Green percentage label - top left */}
        <div className="absolute top-[18%] left-[33%] bg-eco-green text-white px-2 py-1 rounded text-xs font-bold">
          +15%
        </div>
        {/* Green growth chart - left side */}
        <div className="absolute top-[20%] left-[35%] flex items-end space-x-1">
          <div className="w-3 h-6 bg-eco-green rounded-sm opacity-70"></div>
          <div className="w-3 h-10 bg-eco-green rounded-sm opacity-80"></div>
          <div className="w-3 h-14 bg-eco-green rounded-sm opacity-90"></div>
          <div className="w-3 h-8 bg-eco-green rounded-sm opacity-75"></div>
          <div className="w-3 h-12 bg-eco-green rounded-sm opacity-85"></div>
          <div className="w-3 h-4 bg-eco-green rounded-sm opacity-65"></div>
        </div>
        {/* Eco action blocks - left side */}
        <div className="absolute top-[35%] left-[25%]">
          <div className="bg-white border border-eco-green/30 px-3 py-2 rounded shadow-sm text-xs font-mono mb-2">
            <div className="text-eco-green flex items-center gap-1">
              <span>🌱</span>
              <span className="text-gray-600">plant</span>
              <span className="text-eco-green">trees</span>
            </div>
          </div>
          <div className="bg-white border border-eco-green/30 px-3 py-2 rounded shadow-sm text-xs font-mono">
            <div className="text-eco-green flex items-center gap-1">
              <span>♻</span>
              <span className="text-gray-600">recycle</span>
            </div>
          </div>
        </div>
        {/* Bottom left eco block */}
        <div className="absolute bottom-[25%] left-[30%]">
          <div className="bg-white border border-eco-green/30 px-3 py-2 rounded shadow-sm text-xs font-mono">
            <div className="text-eco-green">save</div>
            <div className="text-gray-600 ml-2">earth</div>
            <div className="text-gray-600">together</div>
          </div>
        </div>
        {/* Mathematical grid */}
        <div className="absolute top-[62%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="600" height="80" className="opacity-20">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--eco-green))" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="600" height="80" fill="url(#grid)" />
            <line x1="300" y1="0" x2="300" y2="80" stroke="hsl(var(--eco-green))" strokeWidth="1" opacity="0.3"/>
            <line x1="0" y1="40" x2="600" y2="40" stroke="hsl(var(--eco-green))" strokeWidth="1" opacity="0.3"/>
          </svg>
        </div>
        {/* Floating eco particles */}
        <div className="absolute top-[15%] left-[20%] w-3 h-3 bg-eco-green rounded-full animate-float opacity-60"></div>
        <div className="absolute top-[25%] left-[75%] w-2 h-2 bg-eco-yellow rounded-full animate-float opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[35%] left-[80%] w-4 h-4 bg-eco-blue rounded-full animate-float opacity-40" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-[20%] left-[85%] w-2 h-2 bg-eco-leaf rounded-full animate-float opacity-70" style={{animationDelay: '1s'}}></div>
        {/* Decorative elements */}
        <div className="absolute top-[18%] right-[20%] opacity-30">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="15" fill="none" stroke="hsl(var(--eco-green))" strokeWidth="1" strokeDasharray="5,5" className="animate-spin-slow"/>
          </svg>
        </div>
        <div className="absolute top-[20%] right-[25%]">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-eco-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-eco-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-eco-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-eco-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-eco-yellow rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-[28%] right-[18%] w-6 h-6 bg-eco-yellow rounded-full flex items-center justify-center">
          <Leaf className="w-3 h-3 text-white" />
        </div>
        <div className="absolute bottom-[25%] right-[15%]">
          <svg width="180" height="100" viewBox="0 0 180 100">
            <path d="M10 80 Q50 40 90 50 Q130 60 170 25" stroke="hsl(var(--eco-blue))" strokeWidth="2" fill="none" className="opacity-70" />
            <circle cx="170" cy="25" r="4" fill="hsl(var(--eco-blue))"/>
            <path d="M170 25 L165 30 L165 27 L160 27 L160 23 L165 23 L165 20 Z" fill="hsl(var(--eco-blue))"/>
          </svg>
        </div>
        <div className="absolute bottom-[15%] right-[45%]">
          <svg width="150" height="80" className="opacity-40">
            <line x1="0" y1="40" x2="150" y2="40" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="2,2"/>
            <line x1="75" y1="0" x2="75" y2="80" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="2,2"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-[6rem] md:text-[10rem] lg:text-[12rem] font-display font-black leading-[0.85] tracking-tight text-foreground">
            <span className="block">Learn</span>
            <span className="block">by Greening</span>
          </h1>
        </div>
        <div className="mb-10">
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Interactive eco-learning that's fun and rewarding.
          </p>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed mt-2">
            Make the planet greener in 15 minutes a day.
          </p>
        </div>
        <div className="mb-16">
          <Link to="/quest">
            <button className="px-10 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg eco-glow">
              Start Your Quest
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
