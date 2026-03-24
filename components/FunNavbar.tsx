"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePageTransition } from "@/components/TransitionProvider";

const SAGE  = "#7BA898";
const PEACH = "#F0AFA8";
const CORAL = "#C48585";
const RED   = "#E84040";
const NAVY  = "#2A3545";

// palette accent dots
const DOTS = [SAGE, PEACH, CORAL, RED, NAVY];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function FunNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<"music" | "travel" | null>(null);
  const { navigate } = usePageTransition();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const music  = document.getElementById("music");
      const travel = document.getElementById("travel");
      const offset = window.scrollY + 140;

      if (travel && offset >= travel.offsetTop) setActive("travel");
      else if (music && offset >= music.offsetTop) setActive("music");
      else setActive(null);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1.25rem, 4vw, 2.5rem)",
        height: "52px",
        background: scrolled ? `${NAVY}F5` : `${NAVY}B0`,
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${scrolled ? `${PEACH}14` : "transparent"}`,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {/* Left — back to portfolio */}
      <button
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.28)",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          transition: "color 0.2s",
          padding: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
      >
        {/* Left arrow as a thin line */}
        <span
          style={{
            display: "inline-block",
            width: "1.5rem",
            height: "1px",
            background: "currentColor",
            transition: "width 0.2s",
          }}
        />
        portfolio
      </button>

      {/* Center — palette dots + wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {DOTS.map((c, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          THE OTHER SIDE
        </span>
      </div>

      {/* Right — section links */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        {(["music", "travel"] as const).map((section) => (
          <button
            key={section}
            onClick={() => scrollTo(section)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "0.35rem 0.75rem",
              color:
                active === section
                  ? PEACH
                  : `${PEACH}45`,
              position: "relative",
              transition: "color 0.2s",
            }}
          >
            {section}
            {active === section && (
              <motion.span
                layoutId="fun-nav-indicator"
                style={{
                  position: "absolute",
                  bottom: -1,
                  left: "0.75rem",
                  right: "0.75rem",
                  height: "1px",
                  background: PEACH,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
