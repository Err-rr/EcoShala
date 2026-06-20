import { useEffect, useState } from "react";

const INTRO_STORAGE_KEY = "ecoshala_intro_seen";

const IntroSplash = () => {
  const [phase, setPhase] = useState<"hidden" | "enter" | "exit">("hidden");

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";

    if (hasSeenIntro) {
      return;
    }

    sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    setPhase("enter");

    const exitTimer = window.setTimeout(() => {
      setPhase("exit");
    }, 2200);

    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
    }, 2650);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0f2f1f] transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes ecoshalaGlow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(255,255,255,0.2)); }
          50% { transform: scale(1.03); filter: drop-shadow(0 0 18px rgba(255,255,255,0.35)); }
        }

        @keyframes ecoshalaRise {
          0% { opacity: 0; transform: translateY(18px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3f8f68_0%,#0f2f1f_60%,#07150e_100%)]" />
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_40%,transparent_60%,rgba(255,255,255,0.06)_100%)]" />

      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm"
          style={{ animation: "ecoshalaGlow 2.2s ease-in-out infinite" }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-eco-green/90 text-white shadow-2xl">
            <span className="text-2xl font-bold">E</span>
          </div>
        </div>

        <div style={{ animation: "ecoshalaRise 700ms ease-out both" }}>
          <h1 className="text-4xl font-bold tracking-[0.4em] text-white md:text-6xl">
            ECO SHALA
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.45em] text-white/80 md:text-base">
            Grow • Learn • Act
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroSplash;
