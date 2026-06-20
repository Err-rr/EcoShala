import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

const INTRO_STORAGE_KEY = "ecoshala_intro_seen";

const IntroSplash = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<"hidden" | "enter" | "exit">("hidden");

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";

    if (hasSeenIntro) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    setIsVisible(true);
    setPhase("enter");

    const exitTimer = window.setTimeout(() => {
      setPhase("exit");
    }, prefersReducedMotion ? 1400 : 2300);

    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
    }, prefersReducedMotion ? 1700 : 2900);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible || phase === "hidden") {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes ecoshalaCardIn {
          0% { opacity: 0; transform: translateY(14px) scale(0.985); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes ecoshalaLeafIn {
          0% { opacity: 0; transform: scale(0.82) rotate(-6deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes ecoshalaTextIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ecoshala-intro-motion,
          .ecoshala-intro-leaf,
          .ecoshala-intro-text {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="absolute inset-0 bg-[linear-gradient(160deg,#eef8ef_0%,#f4faf4_42%,#e8f5e8_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffffb8_0%,transparent_45%)]" />
      <div className="absolute inset-0 opacity-60 bg-[linear-gradient(135deg,rgba(134,192,141,0.14)_0%,transparent_36%,transparent_64%,rgba(134,192,141,0.1)_100%)]" />

      <div className="ecoshala-intro-motion relative mx-4 w-[min(92vw,26rem)] rounded-[2rem] border border-white/70 bg-white/55 px-8 py-10 text-center shadow-[0_20px_60px_rgba(82,120,88,0.12)] backdrop-blur-xl sm:px-10 sm:py-12">
        <div
          className="ecoshala-intro-leaf mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-eco-green/20 bg-eco-green/10 text-eco-green sm:h-20 sm:w-20"
          style={{
            animation: "ecoshalaLeafIn 700ms ease-out both",
            animationDelay: "80ms",
          }}
        >
          <Leaf className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.8} />
        </div>

        <div
          className="ecoshala-intro-text mt-6"
          style={{
            animation: "ecoshalaTextIn 700ms ease-out both",
            animationDelay: "160ms",
          }}
        >
          <h1 className="text-3xl font-semibold tracking-[0.42em] text-eco-green/90 sm:text-4xl md:text-5xl">
            ECOSHALA
          </h1>
          <p className="mt-4 text-sm italic tracking-[0.22em] text-foreground/60 sm:text-base">
            Learn. Act. Sustain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroSplash;
