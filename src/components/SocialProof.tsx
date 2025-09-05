import { Star } from "lucide-react";

export const SocialProof = () => {
  return (
    <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Simple grid lines background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="social-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#social-grid)" />
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-white">
          Join the EcoQuest community making millions of green choices
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Left: Star ratings */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-white text-white" />
              ))}
            </div>
            <span className="text-lg text-white/80">Over 100,000 5-star app reviews</span>
          </div>
          
          {/* Center: Press logos */}
          <div className="flex flex-col items-center gap-6">
            <div className="text-white/60 text-2xl font-serif italic">The New York Times</div>
            <div className="text-white/60 text-xl font-serif italic">The Atlantic</div>
          </div>
          
          {/* Right: Community stats */}
          <div className="text-center">
            <div className="mb-4">
              <div className="text-4xl font-bold text-white mb-2">2.5M+</div>
              <div className="text-slate-400 text-sm">Daily eco-actions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-eco-green mb-2">180+</div>
              <div className="text-slate-400 text-sm">Countries participating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};