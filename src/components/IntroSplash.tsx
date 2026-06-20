import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Leaf } from "lucide-react";

const INTRO_STORAGE_KEY = "ecoshala_intro_seen";
const WORDMARK = "ECOSHALA";

// Fixed, hand-placed positions so particles feel composed rather than
// randomly scattered — and stay identical between renders.
const PARTICLES = [
  { top: "16%", left: "14%", size: 13, duration: 9.5, drift: 14 },
  { top: "76%", left: "10%", size: 9, duration: 11, drift: 10 },
  { top: "26%", left: "88%", size: 15, duration: 10.5, drift: 16 },
  { top: "68%", left: "92%", size: 10, duration: 12.5, drift: 12 },
  { top: "88%", left: "48%", size: 8, duration: 8.5, drift: 9 },
  { top: "9%", left: "58%", size: 11, duration: 10, drift: 13 },
  { top: "50%", left: "5%", size: 7, duration: 9, drift: 8 },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const IntroSplash = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [stage, setStage] = useState<"playing" | "leaving">("playing");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
    if (hasSeenIntro) return;

    sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    setShouldRender(true);

    const holdMs = prefersReducedMotion ? 1500 : 3600;
    const removeMs = prefersReducedMotion ? 1900 : 4300;

    const leaveTimer = window.setTimeout(() => setStage("leaving"), holdMs);
    const removeTimer = window.setTimeout(() => setShouldRender(false), removeMs);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, [prefersReducedMotion]);

  if (!shouldRender) return null;

  const isLeaving = stage === "leaving";
  const reduced = Boolean(prefersReducedMotion);
  const letters = WORDMARK.split("");

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={
        isLeaving
          ? { opacity: 0, filter: "blur(10px)", scale: 1.02 }
          : { opacity: 1, filter: "blur(0px)", scale: 1 }
      }
      transition={{ duration: reduced ? 0.4 : 0.7, ease: EASE_OUT }}
      aria-hidden="true"
    >
      {/* Ambient gradient field — slow, never-quite-resolving drift */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #eef8ef 0%, #f4faf4 38%, #e8f5e8 70%, #eef8ef 100%)",
          backgroundSize: "180% 180%",
        }}
        animate={
          reduced
            ? undefined
            : { backgroundPosition: ["0% 30%", "100% 70%", "0% 30%"] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.55)_0%,transparent_55%)]" />

      {/* Floating leaf particles — barely there, never looping obviously */}
      {!reduced &&
        PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute text-eco-green"
            style={{ top: p.top, left: p.left, opacity: 0.08 }}
            animate={{
              y: [0, -p.drift, 0],
              x: [0, p.drift / 2, 0],
              rotate: [0, 6, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            <Leaf size={p.size} strokeWidth={1.4} />
          </motion.div>
        ))}

      {/* Core composition — no card, no panel, just centered content on the field */}
      <div className="relative flex flex-col items-center px-8 text-center">
        {/* Stage 1 + 2: leaf appears, then breathes into its resting size */}
        <div className="relative mb-7 sm:mb-9">
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-eco-green/25 blur-2xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: reduced ? 0.18 : [0, 0.22, 0.16], scale: reduced ? 1 : [0.6, 1.15, 1] }}
            transition={{ duration: reduced ? 0.5 : 2, ease: EASE_OUT, delay: reduced ? 0 : 0.1 }}
          />
          <motion.div
            className="text-eco-green"
            initial={{ opacity: 0, scale: 0.62, filter: "blur(6px)" }}
            animate={{
              opacity: 1,
              scale: reduced ? 1 : [0.62, 1, 1.05, 1],
              filter: "blur(0px)",
            }}
            transition={{
              duration: reduced ? 0.5 : 2.1,
              times: reduced ? undefined : [0, 0.32, 0.68, 1],
              ease: EASE_OUT,
              delay: reduced ? 0 : 0.1,
            }}
          >
            <Leaf className="h-9 w-9 sm:h-11 sm:w-11" strokeWidth={1.6} />
          </motion.div>
        </div>

        {/* Stage 3: letter-by-letter wordmark reveal */}
        <div className="flex" role="text">
          {letters.map((letter, i) => (
            <motion.span
              key={`${letter}-${i}`}
              className="text-4xl font-serif font-medium tracking-[0.14em] text-eco-green/90 sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: reduced ? 0.4 : 0.55,
                delay: reduced ? 0 : 0.55 + i * 0.045,
                ease: EASE_OUT,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Stage 4: thin divider */}
        <motion.div
          className="mt-5 h-px w-12 bg-eco-green/35 sm:mt-6 sm:w-16"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: reduced ? 0.4 : 0.6,
            delay: reduced ? 0.1 : 1.5,
            ease: EASE_OUT,
          }}
          style={{ transformOrigin: "center" }}
        />

        {/* Stage 5: tagline */}
        <motion.p
          className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-foreground/55 sm:mt-6 sm:text-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0.4 : 0.65,
            delay: reduced ? 0.2 : 1.75,
            ease: EASE_OUT,
          }}
        >
          Growing Tomorrow's Guardians
        </motion.p>
      </div>
    </motion.div>
  );
};

export default IntroSplash;