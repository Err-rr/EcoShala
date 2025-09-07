import { Star } from "lucide-react";

export const SocialProof = () => {
  return (
    <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Hexagonal background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="eco-hex" width="100" height="100" patternUnits="userSpaceOnUse">
              <polygon
                points="50,0 100,25 100,75 50,100 0,75 0,25"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eco-hex)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Different font for main heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-16 text-white">
          Empowering students to take 1M+ eco-friendly actions worldwide
        </h2>

        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Left: Star ratings */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-white text-white" />
              ))}
            </div>
            <span className="text-lg text-white/80">
              90% learners say EcoShala makes sustainability fun
            </span>
          </div>

          {/* Center: Educator support + learners */}
          <div className="flex flex-col items-center gap-6">

            <div className="text-white/60 text-lg italic text-center">
              10,000+ learners already part of EcoShala
            </div>
          </div>

          {/* Right: Community stats */}
          <div className="text-center">
            <div className="mb-4">
              <div className="text-4xl font-bold text-eco-green mb-2">1M+</div>
              <div className="text-slate-400 text-sm">Eco-actions completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-eco-green mb-2">50+</div>
              <div className="text-slate-400 text-sm">Schools & communities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
