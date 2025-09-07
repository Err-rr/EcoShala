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
        color1: 0x28c562, // light green
        color2: 0xffeb3b, // yellow
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
      {/* Floating eco particles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Leaves */}
        <div className="absolute top-[15%] left-[20%] w-6 h-10 bg-green-600 rounded-full rotate-12 animate-float opacity-80"></div>
        <div className="absolute top-[40%] right-[15%] w-5 h-8 bg-green-700 rounded-full -rotate-6 animate-float opacity-70"></div>
        {/* Flowers */}
        <div className="absolute bottom-[30%] left-[35%] w-6 h-6 bg-pink-400 rounded-full animate-float opacity-80"></div>
        <div className="absolute top-[25%] right-[40%] w-4 h-4 bg-yellow-400 rounded-full animate-float opacity-90"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Hero Title (single line) */}
        <div className="mb-8">
          <h1
            className="text-[3rem] md:text-[5rem] lg:text-[6rem] leading-[1.1] tracking-tight text-black"
            style={{
              WebkitTextStroke: "3px white",
              textShadow:
                "0 0 10px white, 0 0 20px white, 0 0 30px white",
              fontFamily: 'Georgia, "Playfair Display", "Merriweather", serif',
              fontWeight: "700",
            }}
          >
            <span className="inline-block mx-4">
              <span className="text-[1.4em]">R</span>ETHINK
            </span>
            <span className="inline-block mx-4">
              <span className="text-[1.4em]">R</span>ELEARN
            </span>
            <span className="inline-block mx-4">
              <span className="text-[1.4em]">R</span>ENEW
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="mb-10">
          <p
            className="text-xl md:text-2xl font-bold max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: "black",
              WebkitTextStroke: "1px white",
              textShadow:
                "0 0 8px white, 0 0 15px white, 0 0 25px white",
            }}
          >
            Interactive eco-learning that's fun and rewarding
          </p>
          <p
            className="text-xl md:text-2xl font-bold max-w-2xl mx-auto leading-relaxed mt-2"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: "black",
              WebkitTextStroke: "1px white",
              textShadow:
                "0 0 8px white, 0 0 15px white, 0 0 25px white",
            }}
          >
            Make the planet greener in 15 minutes a day
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <Link to="/quest">
            <button
              className="px-10 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg eco-glow"
              style={{
                border: "2px solid white",
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
