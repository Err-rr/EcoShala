import { Button } from "@/components/ui/button";
import { Leaf, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const Header = () => {
  useEffect(() => {
    // Inject styles and font
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Tagesschrift&display=swap');

      .tagesschrift-regular {
        font-family: "Tagesschrift", system-ui;
        font-weight: 400;
        font-style: normal;
      }
      .eco-font {
        font-family: Georgia, "Playfair Display", "Merriweather", serif;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      // Cleanup
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <header className="w-full px-6 py-6 flex items-center justify-between bg-background">
      {/* Left side: logo/title */}
      <div className="flex items-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 tracking-tight">
          <span className="eco-font">Eco</span>
          <span className="tagesschrift-regular">Shala</span>
        </h1>
      </div>

      {/* Right side: eco-coin, user, buttons */}
      <div className="flex items-center gap-6">
        <div className="eco-coin flex items-center gap-2">
          <Leaf className="w-5 h-5 text-eco-green" />
          <span className="font-semibold text-eco-green">2,847</span>
        </div>

        <div className="w-10 h-10 rounded-full bg-eco-green/20 flex items-center justify-center">
          <User className="w-6 h-6 text-eco-green" />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>

          <Link to="/signup">
            <Button className="bg-eco-green text-white hover:bg-eco-green/90">
              Signup
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
