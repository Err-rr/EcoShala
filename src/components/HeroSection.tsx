import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";
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
        backgroundColor: 0xffffff, // white background
        color1: 0x071404,          // eco green
        color2: 0x00ffb3,          // teal accent
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
      className="relative min-h-[85vh] flex items-center justify-center px-6 py-12 overflow-hidden"
    >
      {/* Subtle floating eco particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[25%] w-3 h-3 bg-eco-green rounded-full animate-float opacity-60"></div>
        <div className="absolute top-[35%] right-[30%] w-2 h-2 bg-eco-yellow rounded-full animate-float opacity-50"></div>
        <div className="absolute bottom-[25%] left-[40%] w-3 h-3 bg-eco-blue rounded-full animate-float opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <div className="mb-8">
          <h1
            className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-serif leading-[0.95] tracking-tight text-black"
            style={{
              WebkitTextStroke: "4px white", // thicker white outline
              textShadow: "0 0 10px white, 0 0 20px white, 0 0 30px white", // white glow
              fontFamily: "'Playfair Display', serif",
              fontWeight: "700", // bolder font weight
              filter: "drop-shadow(2px 2px 4px rgba(255,255,255,0.8))", // additional white shadow
            }}
          >
            <span className="block">Learn</span>
            <span className="block italic">by Greening</span>
          </h1>
        </div>
        <div className="mb-10">
          <p className="text-xl md:text-2xl font-bold text-black max-w-2xl mx-auto leading-relaxed">
            Interactive eco-learning that's fun and rewarding
          </p>
          <p className="text-xl md:text-2xl font-bold text-black max-w-2xl mx-auto leading-relaxed mt-2">
            Make the planet greener in 15 minutes a day
          </p>
        </div>
        <div className="mb-16">
          <Link to="/quest">
            <button 
              className="px-10 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg eco-glow"
              style={{
                border: "2px solid white"
              }}
            >
              Start Your Quest
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};