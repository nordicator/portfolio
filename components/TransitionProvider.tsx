"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// ── Dumma Branding 2015 palette (sage · peach · coral · red · navy) ──────────
const PALETTE = [
  "#7BA898",
  "#F0AFA8",
  "#C48585",
  "#E84040",
  "#2A3545",
];

const COLS = 5;
const ROWS = 4;
const TOTAL = COLS * ROWS;

type Phase = "idle" | "entering" | "exiting";

type TransitionCtx = {
  navigate: (path: string) => void;
  phase: Phase;
};

const TransitionContext = createContext<TransitionCtx>({
  navigate: () => {},
  phase: "idle",
});

export const usePageTransition = () => useContext(TransitionContext);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [phase, setPhaseState] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function setPhase(p: Phase) {
    phaseRef.current = p;
    setPhaseState(p);
  }

  function schedule(ms: number, fn: () => void) {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }

  const navigate = useCallback(
    (path: string) => {
      if (phaseRef.current !== "idle") return;
      timers.current.forEach(clearTimeout);
      timers.current = [];

      setPhase("entering");

      // Last panel (diagonal) = (COLS-1 + ROWS-1) * stagger + duration
      // = (4+3)*0.045 + 0.30s = 0.315 + 0.30 = 0.615s → navigate at ~700ms
      schedule(700, () => {
        router.push(path);
        setPhase("exiting");
        // Last exit panel = same diagonal, exits at ~580ms
        schedule(680, () => setPhase("idle"));
      });
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ navigate, phase }}>
      {children}

      {phase !== "idle" && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            pointerEvents: "all",
          }}
        >
          {Array.from({ length: TOTAL }).map((_, idx) => {
            const col = idx % COLS;
            const row = Math.floor(idx / COLS);
            const color = PALETTE[(col + row * 2) % PALETTE.length];

            const enterDelay = (col + row) * 0.045;
            const exitDelay  = (COLS - 1 - col + ROWS - 1 - row) * 0.035;

            return (
              <div
                key={idx}
                style={{ perspective: "600px", overflow: "hidden" }}
              >
                <motion.div
                  initial={
                    phase === "entering" ? { rotateX: -90 } : { rotateX: 0 }
                  }
                  animate={phase === "exiting" ? { rotateX: 90 } : { rotateX: 0 }}
                  transition={{
                    delay: phase === "exiting" ? exitDelay : enterDelay,
                    duration: phase === "exiting" ? 0.22 : 0.30,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    background: color,
                    transformOrigin: "top center",
                    backfaceVisibility: "hidden",
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </TransitionContext.Provider>
  );
}
