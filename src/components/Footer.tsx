import { Link } from "react-router-dom";

export const Footer = () => {
  const footerLinks = [
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Rewards", href: "/rewards" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="relative bg-slate-900 text-white py-12 px-6 overflow-hidden">
      {/* Hexagonal Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="eco-hex"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
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

      {/* Footer content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-eco-green">EcoQuest</h3>
            <p className="text-white/70 mt-2">
              Making the planet greener, one quest at a time
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-white/70 hover:text-eco-green transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/50">
          <p>&copy; Made by Team VorteX with 💚</p>
        </div>
      </div>
    </footer>
  );
};
