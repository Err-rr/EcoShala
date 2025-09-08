export const Footer = () => {
  const footerLinks = [
    { name: "Leaderboard", href: "#" },
    { name: "Rewards", href: "#" },
    { name: "Community", href: "#" },
    { name: "About", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-eco-green">EcoQuest</h3>
            <p className="text-white/70 mt-2">Making the planet greener, one quest at a time</p>
          </div>
          
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/70 hover:text-eco-green transition-colors"
              >
                {link.name}
              </a>
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