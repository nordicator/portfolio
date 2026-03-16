"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Terminal, Layers, Smartphone, Monitor, Code2, Palette, X } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    name: "BetterTA",
    fullName: "BetterTeachAssist",
    tagline: "Modern grade portal for YRDSB students",
    url: "https://betterta.ca",
    displayUrl: "betterta.ca",
    year: "2025",
    status: "Live",
    description:
      "A mobile application for York Region District School Board students that replaces the clunky official TeachAssist portal with a fast, modern, actually enjoyable interface. Grade tracking should feel good — so we rebuilt it from scratch.",
    features: [
      "Modern, clean interface for viewing grades and courses",
      "Grade prediction powered by your historical data",
      "Course and school-level analytics dashboard",
      "Class chatrooms for connecting with classmates",
      "YRAA integration for sports rankings and game schedules",
      "Optional anonymous data sharing mode",
      "Native widgets for iOS and Android",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "Go"],
    team: [
      { name: "Ayaan", github: "https://github.com/nordicator", linkedin: "https://linkedin.com/in/ayaan-sajjad" },
      { name: "Awsaf", github: "https://github.com/CDX-1", linkedin: "https://linkedin.com/in/awsaf-syed" },
    ],
    accent: "#C4714B",
    cardBg: "#F0DDD0",
    type: "Mobile App",
  },
  {
    id: 2,
    name: "Ralph",
    fullName: "Ralph — AI Guide Dog",
    tagline: "Autonomous robot for visual navigation assistance",
    url: null,
    displayUrl: null,
    year: "2026",
    status: "DeltaHacks 12",
    description:
      "An autonomous robot car that uses computer vision and machine learning to help people with visual impairments navigate their environment. Built at DeltaHacks 12 at McMaster University — 48 hours, four people, one moving robot.",
    features: [
      "Divides camera view into 5 columns for spatial analysis",
      "Real-time object detection with YOLOv8",
      "Depth estimation using MiDaS to judge distance to obstacles",
      "Risk assessment per object and navigation path",
      "Autonomous path planning and motor control",
      "Emergency braking when hazards are detected",
    ],
    tech: ["Python", "YOLOv8", "MiDaS", "Raspberry Pi 5", "OpenCV"],
    team: [
      { name: "Ayaan", github: "https://github.com/nordicator", linkedin: "https://linkedin.com/in/ayaan-sajjad" },
      { name: "Awsaf", github: "https://github.com/CDX-1", linkedin: "https://linkedin.com/in/awsaf-syed" },
      { name: "Dinesh", github: "https://github.com/Crackle2K", linkedin: "https://linkedin.com/in/dsinnath" },
      { name: "Richard", github: "https://github.com/richardliuu", linkedin: "https://linkedin.com/in/richard-liu-37b70232a" },
    ],
    accent: "#B8926A",
    cardBg: "#EDE0CE",
    type: "Robotics / ML",
  },
];

const skills = [
  { label: "TypeScript", icon: Code2 },
  { label: "JavaScript", icon: Code2 },
  { label: "React Native", icon: Smartphone },
  { label: "Expo", icon: Smartphone },
  { label: "Linux", icon: Terminal },
  { label: "Full Stack", icon: Layers },
  { label: "UI Design", icon: Palette },
  { label: "Web Dev", icon: Monitor },
];

const marqueeItems = [
  "Full Stack", "React Native", "TypeScript", "Expo", "Linux",
  "UI Design", "Python", "Mobile Dev", "Open Source", "Go",
];


// ─── LOADER ──────────────────────────────────────────────────────────────────

function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 400);
    const t2 = setTimeout(() => setPhase("out"),  1900);
    const t3 = setTimeout(() => onDone(),         2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const chars1 = "AYAAN".split("");
  const chars2 = "SAJJAD".split("");

  return (
    <motion.div
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: "var(--clay-950)", zIndex: 9999 }}
    >
      {/* "AYAAN" */}
      <div style={{ overflow: "hidden", paddingBottom: "0.15em" }}>
        <div style={{ display: "flex" }}>
          {chars1.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: phase !== "in" ? 0 : "110%" }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                color: "var(--clay-50)",
                display: "inline-block",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      </div>

      {/* "SAJJAD" */}
      <div style={{ overflow: "hidden", paddingBottom: "0.15em", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex" }}>
          {chars2.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: phase !== "in" ? 0 : "110%" }}
              transition={{ delay: 0.12 + i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                color: "var(--clay-500)",
                display: "inline-block",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: 140, height: "2px", background: "rgba(255,255,255,0.1)", borderRadius: 999, overflow: "hidden", position: "relative" }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase !== "in" ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", inset: 0, background: "var(--clay-500)", transformOrigin: "left", borderRadius: 999 }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: phase !== "in" ? 0.35 : 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--clay-400)", marginTop: "1rem", letterSpacing: "0.13em" }}
      >
        TORONTO, ON
      </motion.p>
    </motion.div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-300"
        style={{
          background: scrolled ? "rgba(251,245,236,0.92)" : "rgba(251,245,236,0.7)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(223,196,168,0.8)",
          boxShadow: scrolled ? "0 6px 28px rgba(44,14,10,0.1)" : "0 2px 10px rgba(44,14,10,0.05)",
        }}
      >
        <Link
          href="/"
          className="flex items-center justify-center w-8 h-8 rounded-full font-bold mr-1 transition-all hover:scale-105 select-none"
          style={{ background: "var(--clay-500)", color: "#FAF0E6", fontFamily: "var(--font-display)", fontSize: "1.05rem" }}
        >
          A
        </Link>
        <NavLink href="/" label="Home" />
        <NavLink href="/projects" label="Projects" />
        <a
          href="mailto:contact@ayaansajjad.ca"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ml-1 hover:opacity-90 transition-opacity"
          style={{ background: "var(--clay-500)", color: "#FAF0E6", fontFamily: "var(--font-body)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
          Contact
        </a>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-black/5"
      style={{ color: "var(--clay-800)", fontFamily: "var(--font-body)" }}
    >
      {label}
    </Link>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-6 text-center">
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob blob-1" style={{ top: "5%", left: "-10%" }} />
        <div className="blob blob-2" style={{ top: "50%", right: "-8%" }} />
        <div className="blob blob-3" style={{ bottom: "8%", left: "28%" }} />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8"
          style={{
            background: "rgba(143,166,122,0.15)",
            border: "1px solid rgba(143,166,122,0.4)",
            color: "#5A7A48",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
          open to opportunities
        </motion.div>

        {/* Name — fades in quickly, cross-fading with the loader text that's fading out */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="select-none mb-0"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(4rem, 14vw, 11.5rem)",
            color: "var(--clay-900)",
            letterSpacing: "-0.02em",
            lineHeight: 0.92,
          }}
        >
          Ayaan
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="select-none mb-7"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(4rem, 14vw, 11.5rem)",
            color: "var(--clay-500)",
            letterSpacing: "-0.02em",
            lineHeight: 0.92,
          }}
        >
          Sajjad
        </motion.h1>

        {/* Static descriptor */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          16 year old developer &middot; Toronto
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-base leading-relaxed max-w-sm mb-8"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
        >
          Building things that probably don&apos;t need to exist, but do anyway.
        </motion.p>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <SocialLink href="https://github.com/nordicator" icon={<Github size={17} />} label="GitHub" />
          <SocialLink href="https://linkedin.com/in/ayaan-sajjad" icon={<Linkedin size={17} />} label="LinkedIn" />
          <SocialLink href="mailto:contact@ayaansajjad.ca" icon={<Mail size={17} />} label="Email" />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
        style={{ color: "var(--clay-300)" }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-10 rounded-full"
          style={{ background: "linear-gradient(to bottom, var(--clay-300), transparent)" }}
        />
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 hover:scale-105"
      style={{ borderColor: "var(--border)", color: "var(--clay-700)", background: "rgba(245,232,216,0.5)" }}
    >
      {icon}
    </a>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className="w-full overflow-hidden py-4 border-y"
      style={{ borderColor: "var(--border)", background: "var(--clay-100)" }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-xs font-semibold uppercase tracking-widest whitespace-nowrap"
            style={{
              color: i % 3 === 0 ? "var(--clay-500)" : i % 3 === 1 ? "var(--clay-700)" : "#8FA67A",
              fontFamily: "var(--font-mono)",
            }}
          >
            {item}
            <span className="mx-8 inline-block w-1 h-1 rounded-full align-middle" style={{ background: "var(--clay-300)" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="relative px-6 py-24 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-start">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--clay-500)", fontFamily: "var(--font-mono)" }}
          >
            About
          </p>
          <h2
            className="leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: "var(--clay-900)" }}
          >
            Hey, I&apos;m{" "}
            <em style={{ color: "var(--clay-500)" }}>Ayaan</em>.
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
          >
            I build things that excite me — which, honestly, could be anything. A robot that helps
            blind people navigate. A mobile app that makes a terrible grade portal actually usable.
            Whatever it is, it starts with a stupid idea I can&apos;t stop thinking about and ends
            (somehow) with working software.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
          >
            I&apos;m 16, based in Toronto, and I care a lot about craft — both how things work and
            how they feel to use. There&apos;s something about making something from nothing, under
            pressure, that I genuinely love. The weirder the project, the better.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--clay-500)", fontFamily: "var(--font-mono)" }}
          >
            Stack &amp; Skills
          </p>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i, duration: 0.45 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200 hover:scale-[1.02] cursor-default"
                  style={{ background: "var(--clay-100)", borderColor: "var(--border)" }}
                >
                  <div
                    className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
                    style={{ background: "rgba(196,113,75,0.14)", color: "var(--clay-600)" }}
                  >
                    <Icon size={14} strokeWidth={2} />
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--clay-800)", fontFamily: "var(--font-body)" }}
                  >
                    {skill.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
  useEffect(() => {
    document.body.classList.add("modal-open");
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6"
        style={{ background: "rgba(28,15,10,0.7)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl rounded-t-3xl md:rounded-3xl overflow-y-auto"
          style={{
            background: project.cardBg,
            maxHeight: "90vh",
            boxShadow: "0 -20px 80px rgba(28,15,10,0.25)",
            scrollbarWidth: "none",
            overscrollBehavior: "contain",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glow */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: project.accent, opacity: 0.2, transform: "translate(30%,-30%)" }}
          />

          <div className="relative z-10 p-8 md:p-10">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(44,14,10,0.08)", color: "var(--clay-700)" }}
              aria-label="Close"
            >
              <X size={17} />
            </button>

            {/* Header */}
            <div className="mb-6 pr-12">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
                >
                  {project.year}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: `${project.accent}1A`,
                    color: project.accent,
                    border: `1px solid ${project.accent}35`,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {project.status}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(44,14,10,0.07)",
                    color: "var(--clay-600)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {project.type}
                </span>
              </div>
              <h2
                className="leading-tight mb-2"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: "var(--clay-900)" }}
              >
                {project.fullName}
              </h2>
              <p className="text-sm font-semibold" style={{ color: "var(--clay-600)", fontFamily: "var(--font-body)" }}>
                {project.tagline}
              </p>
            </div>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "var(--clay-700)", fontFamily: "var(--font-body)" }}
            >
              {project.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
              >
                Features
              </p>
              <ul className="space-y-2">
                {project.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: "var(--clay-700)", fontFamily: "var(--font-body)" }}
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: project.accent }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech */}
            <div className="mb-6">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
              >
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: `${project.accent}15`,
                      color: project.accent,
                      border: `1px solid ${project.accent}35`,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="mb-8">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
              >
                Team
              </p>
              <div className="flex flex-wrap gap-2">
                {project.team.map((m) => (
                  <a
                    key={m.name}
                    href={m.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105"
                    style={{
                      background: "rgba(44,14,10,0.05)",
                      borderColor: "var(--border)",
                      color: "var(--clay-700)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <Github size={11} />
                    {m.name}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:gap-4"
                style={{
                  background: project.accent,
                  color: "white",
                  fontFamily: "var(--font-body)",
                  boxShadow: `0 4px 20px ${project.accent}45`,
                }}
              >
                Visit {project.displayUrl}
                <ArrowUpRight size={15} />
              </a>
            ) : (
              <a
                href="https://github.com/CDX-1/ralph"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:gap-4"
                style={{
                  background: project.accent,
                  color: "white",
                  fontFamily: "var(--font-body)",
                  boxShadow: `0 4px 20px ${project.accent}45`,
                }}
              >
                View on GitHub
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── PROJECT BOXES ────────────────────────────────────────────────────────────

function ProjectBox({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[0];
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="card-lift relative rounded-3xl overflow-hidden border"
      style={{ background: project.cardBg, borderColor: "rgba(223,196,168,0.5)" }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: project.accent,
          opacity: hovered ? 0.4 : 0.2,
          transform: hovered ? "scale(1.5) translate(10%,-10%)" : "scale(1) translate(15%,-15%)",
        }}
      />

      <div className="relative z-10 p-7 md:p-8" style={{ minHeight: "260px" }}>
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: project.accent, fontFamily: "var(--font-mono)" }}
            >
              {project.year}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: `${project.accent}18`,
                color: project.accent,
                border: `1px solid ${project.accent}35`,
                fontFamily: "var(--font-mono)",
              }}
            >
              {project.type}
            </span>
          </div>
          <motion.div
            animate={{ x: hovered ? 0 : -4, y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: project.accent, color: "white" }}
          >
            <ArrowUpRight size={16} />
          </motion.div>
        </div>

        <h3
          className="leading-tight mb-2"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: "var(--clay-900)" }}
        >
          {project.name}
        </h3>
        <p
          className="text-sm mb-5 leading-relaxed"
          style={{ color: "var(--clay-600)", fontFamily: "var(--font-body)" }}
        >
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: `${project.accent}14`,
                color: project.accent,
                border: `1px solid ${project.accent}30`,
                fontFamily: "var(--font-mono)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── FEATURED PROJECTS ───────────────────────────────────────────────────────

function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-8"
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--clay-500)", fontFamily: "var(--font-mono)" }}
        >
          Featured Work
        </p>
        <h2
          className="leading-tight"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--clay-900)" }}
        >
          Things I&apos;ve{" "}
          <em style={{ color: "var(--clay-500)" }}>built</em>
        </h2>
        <p
          className="text-sm mt-2 max-w-xs"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
        >
          Click a project to see the full breakdown.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {projects.map((p, i) => (
          <ProjectBox
            key={p.id}
            project={p}
            index={i}
            onClick={() => setActiveProject(p)}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex justify-center"
      >
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:gap-5 hover:shadow-xl"
          style={{
            background: "var(--clay-500)",
            color: "#FAF0E6",
            fontFamily: "var(--font-body)",
            boxShadow: "0 4px 22px rgba(196,113,75,0.28)",
          }}
        >
          View all projects
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pt-24 pb-12" style={{ background: "var(--clay-900)" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[280px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--clay-500)" }}
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: "var(--clay-400)", fontFamily: "var(--font-mono)" }}
          >
            Let&apos;s work together
          </p>
          <h2
            className="leading-tight mb-7"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(3rem, 9vw, 7rem)", color: "var(--clay-50)" }}
          >
            Say{" "}
            <em style={{ color: "var(--clay-400)" }}>hello.</em>
          </h2>
          <a
            href="mailto:contact@ayaansajjad.ca"
            className="inline-block text-base font-semibold hover-link transition-opacity hover:opacity-75"
            style={{ color: "var(--clay-300)", fontFamily: "var(--font-body)" }}
          >
            contact@ayaansajjad.ca
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-5 pt-7 border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p className="text-sm" style={{ color: "var(--clay-600)", fontFamily: "var(--font-mono)" }}>
            © 2026 Ayaan Sajjad
          </p>
          <p className="text-sm flex items-center gap-2" style={{ color: "var(--clay-600)", fontFamily: "var(--font-mono)" }}>
            Member of <a href="https://smallwoken.ca" target="_blank" rel="noopener noreferrer" className="hover-link transition-opacity hover:opacity-75" style={{ color: "var(--clay-400)", fontFamily: "var(--font-body)" }}>Smallwoken</a>
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "GitHub", href: "https://github.com/nordicator" },
              { label: "LinkedIn", href: "https://linkedin.com/in/ayaan-sajjad" },
              { label: "Cosmos", href: "https://cosmos.so/nordicator" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-sm font-semibold hover-link transition-opacity hover:opacity-75"
                style={{ color: "var(--clay-400)", fontFamily: "var(--font-body)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loader sits on top; its text cross-fades with the hero name below */}
      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>

      {/* Page content — Hero name fades in (cross-fades with loader text).
          Everything else is hidden until loader is done. */}
      <div>
        {/* Navbar & Hero always render so the name cross-fade works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Navbar />
        </motion.div>

        <Hero />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MarqueeStrip />
          <AboutSection />
          <FeaturedProjects />
          <Footer />
        </motion.div>
      </div>
    </>
  );
}
