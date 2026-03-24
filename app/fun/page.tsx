"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, Camera, X } from "lucide-react";
import FunNavbar from "@/components/FunNavbar";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const SAGE  = "#7BA898";
const PEACH = "#F0AFA8";
const CORAL = "#C48585";
const RED   = "#E84040";
const NAVY  = "#2A3545";

// ─── DATA ────────────────────────────────────────────────────────────────────

const drakeAlbums = [
  { id: 1,  title: "Thank Me Later",         year: "2010", bg: "#1B0D2A", accent: "#9D5CE5" },
  { id: 2,  title: "Take Care",              year: "2011", bg: "#0E1217", accent: "#C8A56D" },
  { id: 3,  title: "Nothing Was the Same",   year: "2013", bg: "#0A1628", accent: "#4A8FD4" },
  { id: 4,  title: "If You're Reading This", year: "2015", bg: "#1A1A1A", accent: "#E9C899" },
  { id: 5,  title: "Views",                  year: "2016", bg: "#1C1208", accent: "#D4A840" },
  { id: 6,  title: "More Life",              year: "2017", bg: "#0F1923", accent: "#FF6B35" },
  { id: 7,  title: "Scorpion",               year: "2018", bg: "#111111", accent: "#D4D4D4" },
  { id: 8,  title: "Dark Lane Demo Tapes",   year: "2020", bg: "#060B1A", accent: "#3B82F6" },
  { id: 9,  title: "Certified Lover Boy",    year: "2021", bg: "#1A1A2E", accent: "#E94560" },
  { id: 10, title: "Honestly, Nevermind",    year: "2022", bg: "#0D0020", accent: "#A855F7" },
  { id: 11, title: "For All The Dogs",       year: "2023", bg: "#190E00", accent: "#F59E0B" },
  { id: 12, title: "Scary Hours 3",          year: "2024", bg: "#0A0A0A", accent: "#EF4444" },
];

type Photo = { src: string; caption?: string };
type Trip  = { id: number; name: string; location: string; year: string; color: string; textDark: boolean; photos: Photo[] };

const trips: Trip[] = [
  { id: 1, name: "New York City", location: "New York, USA",     year: "Summer 2024", color: RED,   textDark: false, photos: [] },
  { id: 2, name: "Ottawa",        location: "Ontario, Canada",   year: "Spring 2024", color: SAGE,  textDark: true,  photos: [] },
  { id: 3, name: "Montreal",      location: "Quebec, Canada",    year: "Fall 2023",   color: CORAL, textDark: true,  photos: [] },
];

// ─── ALBUM CARD ──────────────────────────────────────────────────────────────

function AlbumCard({ album }: { album: typeof drakeAlbums[0] }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.04 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="shrink-0 relative overflow-hidden select-none cursor-default"
      style={{ width: 178, height: 178, background: album.bg }}
    >
      <div
        className="absolute w-32 h-32 rounded-full blur-2xl opacity-35 pointer-events-none"
        style={{ background: album.accent, top: "-15%", right: "-15%" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${album.bg}F0, transparent)` }}
      />
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <p style={{ color: album.accent, fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.85, marginBottom: "0.2rem" }}>
          {album.year}
        </p>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem", color: "#fff", letterSpacing: "0.04em", lineHeight: 1.1 }}>
          {album.title}
        </h3>
      </div>
    </motion.div>
  );
}

// ─── POLAROID ────────────────────────────────────────────────────────────────

function Polaroid({ photo, rotation, delay }: { photo: Photo | null; rotation: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: rotation }}
      transition={{ delay, type: "spring", stiffness: 150, damping: 20 }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
      className="relative bg-white shadow-2xl cursor-default"
      style={{ padding: "10px 10px 40px 10px", zIndex: 1 }}
    >
      <div className="flex items-center justify-center overflow-hidden" style={{ width: 160, height: 160, background: "#E8DDD5" }}>
        {photo?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt={photo.caption || ""} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2" style={{ opacity: 0.25 }}>
            <Camera size={22} color={NAVY} />
            <span style={{ color: NAVY, fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.14em" }}>SOON</span>
          </div>
        )}
      </div>
      {photo?.caption && (
        <p className="absolute bottom-2 left-0 right-0 text-center" style={{ color: CORAL, fontFamily: "'DM Mono', monospace", fontSize: "0.58rem" }}>
          {photo.caption}
        </p>
      )}
    </motion.div>
  );
}

// ─── TRIP MODAL ──────────────────────────────────────────────────────────────

function TripModal({ trip, onClose }: { trip: Trip; onClose: () => void }) {
  const displayPhotos: (Photo | null)[] =
    trip.photos.length > 0 ? trip.photos : Array.from({ length: 6 }, () => null);
  const rotations = [-3, 2.5, -1.5, 4, -2.5, 1.5, -3.5, 2, -1, 3.5];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ background: `${NAVY}FA`, scrollbarWidth: "none" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl mx-auto px-6 md:px-12 py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 w-10 h-10 flex items-center justify-center transition-all hover:scale-110"
          style={{ background: `${trip.color}22`, border: `1px solid ${trip.color}55`, color: trip.color }}
        >
          <X size={14} />
        </button>

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4" style={{ color: trip.color, fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
            <MapPin size={9} />
            {trip.location} · {trip.year}
          </div>
          <h2
            className="leading-none"
            style={{ fontFamily: "'Antonio', 'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 12vw, 8rem)", color: "#F5EEE8", letterSpacing: "-0.02em", textTransform: "uppercase" }}
          >
            {trip.name}
          </h2>
          <div style={{ width: "clamp(3rem, 8vw, 5rem)", height: "3px", background: trip.color, marginTop: "1.25rem" }} />
        </div>

        {/* Photos */}
        <div className="flex flex-wrap gap-8 justify-center">
          {displayPhotos.map((photo, i) => (
            <Polaroid key={i} photo={photo} rotation={rotations[i % rotations.length]} delay={i * 0.05} />
          ))}
        </div>

        {trip.photos.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
            style={{ color: `${PEACH}55`, fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase" }}
          >
            photos dropping soon
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function FunPage() {
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const doubled = [...drakeAlbums, ...drakeAlbums];
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@100;300;400;700&display=swap');

        .fun-marquee {
          display: flex;
          width: max-content;
          gap: 0.75rem;
          animation: fun-scroll 42s linear infinite;
        }
        @keyframes fun-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .trip-row { border-bottom: 1px solid rgba(245,238,232,0.08); }
        .trip-row:hover .trip-row-bg { opacity: 1; }
        .trip-row:hover .trip-index  { color: var(--row-color); }
        .trip-row:hover .trip-arrow  { transform: rotate(45deg); border-color: var(--row-color); color: var(--row-color); }

        .trip-row-bg {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .trip-index  { transition: color 0.3s; }
        .trip-arrow  { transition: transform 0.25s, border-color 0.25s, color 0.25s; }

        .scroll-vert {
          writing-mode: vertical-lr;
          text-orientation: mixed;
        }

        .palette-stripe {
          display: flex;
          height: 3px;
          width: 100%;
        }
        .palette-stripe span { flex: 1; }
      `}</style>

      {/* ── SCROLL PROGRESS ──────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, height: "2px",
          background: `linear-gradient(to right, ${SAGE}, ${PEACH}, ${CORAL}, ${RED})`,
          width: progressWidth, zIndex: 100, transformOrigin: "left",
        }}
      />

      <div style={{ background: NAVY, minHeight: "100vh", color: "#F5EEE8", overflowX: "hidden", position: "relative" }}>

        <FunNavbar />

        {/* ════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(1.5rem, 5vw, 3rem)",
            paddingTop: "5.5rem",
            paddingBottom: "clamp(2.5rem, 6vw, 4rem)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background palette swatches — tall vertical strips, far right */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              width: "clamp(60px, 10vw, 100px)",
              zIndex: 0,
              opacity: 0.18,
            }}
          >
            {[SAGE, PEACH, CORAL, RED, NAVY].map((c, i) => (
              <div key={i} style={{ flex: 1, background: c }} />
            ))}
          </div>

          {/* Ghost numeral */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-0.12em",
              left: "-0.04em",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(16rem, 42vw, 36rem)",
              lineHeight: 1,
              color: `${PEACH}0C`,
              letterSpacing: "-0.04em",
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            01
          </div>

          {/* Left vertical label */}
          <div
            aria-hidden
            className="scroll-vert"
            style={{
              position: "absolute",
              left: "clamp(0.6rem, 2vw, 1.5rem)",
              top: "50%",
              transform: "translateY(-50%) rotate(180deg)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.24em",
              color: `${SAGE}80`,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              zIndex: 1,
            }}
          >
            the other side of ayaan
          </div>

          {/* Hero text */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: "min(1200px, 100%)" }}>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "clamp(1rem, 3vw, 2rem)" }}
            >
              <span style={{ display: "inline-block", width: "2.5rem", height: "2px", background: RED }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: RED, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                not the portfolio
              </span>
            </motion.div>

            {/* "the" */}
            <div style={{ overflow: "hidden", marginBottom: "-0.05em" }}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "clamp(0.9rem, 2.5vw, 1.8rem)", color: `${PEACH}60`, letterSpacing: "0.1em", fontWeight: 300 }}
              >
                the
              </motion.span>
            </div>

            {/* "OTHER" — peach, massive */}
            <div style={{ overflow: "hidden" }}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  fontFamily: "'Antonio', 'Bebas Neue', sans-serif",
                  fontSize: "clamp(5.5rem, 22vw, 18rem)",
                  fontWeight: 700,
                  color: PEACH,
                  lineHeight: 0.86,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                }}
              >
                OTHER
              </motion.span>
            </div>

            {/* "SIDE" — sage outline */}
            <div style={{ overflow: "hidden" }}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.38, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3rem, 12vw, 10rem)",
                  WebkitTextStroke: `2px ${SAGE}`,
                  color: "transparent",
                  lineHeight: 0.92,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                SIDE
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.15em",
                  verticalAlign: "super",
                  WebkitTextStroke: "0",
                  color: SAGE,
                  marginLeft: "0.25em",
                }}>.</span>
              </motion.span>
            </div>

            {/* Metadata strip */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              style={{ marginTop: "clamp(1.5rem, 4vw, 2.5rem)", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}
            >
              {["16", "toronto", "always on shuffle"].map((item, i) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: [PEACH, SAGE, CORAL][i],
                    opacity: 0.7,
                  }}
                >
                  {item}
                  {i < 2 && <span style={{ marginLeft: "1rem", color: `${PEACH}30` }}>·</span>}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="scroll-vert"
            style={{
              position: "absolute",
              bottom: "clamp(1.5rem, 4vw, 2.5rem)",
              right: "clamp(6rem, 12vw, 10rem)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.24em",
              color: `${PEACH}40`,
              textTransform: "uppercase",
              zIndex: 2,
            }}
          >
            scroll
          </motion.div>
        </section>

        {/* ── PALETTE DIVIDER ──────────────────────────────────────────────── */}
        <div className="palette-stripe">
          {[SAGE, PEACH, CORAL, RED, NAVY].map((c, i) => (
            <span key={i} style={{ background: c, opacity: i === 4 ? 0 : 0.8 }} />
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            IN ROTATION
        ════════════════════════════════════════════════════════════════ */}
        <section
          id="music"
          style={{ padding: "clamp(4rem, 8vw, 6rem) 0", position: "relative", overflow: "hidden" }}
        >
          {/* Ghost number */}
          <div
            aria-hidden
            style={{
              position: "absolute", left: "-0.04em", top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(12rem, 32vw, 26rem)",
              lineHeight: 1,
              color: `${SAGE}08`,
              letterSpacing: "-0.04em",
              userSelect: "none", pointerEvents: "none",
            }}
          >
            02
          </div>

          {/* Right vertical label */}
          <div
            aria-hidden
            className="scroll-vert"
            style={{
              position: "absolute", right: "clamp(0.5rem, 1.5vw, 1.25rem)", top: "50%",
              transform: "translateY(-50%) rotate(180deg)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.55rem", letterSpacing: "0.22em",
              color: `${CORAL}50`, textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            section 01 / 02
          </div>

          {/* Section header */}
          <div style={{ padding: "0 clamp(1.5rem, 5vw, 3rem)", marginBottom: "2rem", position: "relative", zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}
            >
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(0.85rem, 2vw, 1.1rem)", letterSpacing: "0.22em", color: RED }}>
                01
              </span>
              <h2 style={{ fontFamily: "'Antonio', 'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 6.5vw, 5rem)", fontWeight: 700, color: "#F5EEE8", letterSpacing: "-0.02em", textTransform: "uppercase", lineHeight: 1 }}>
                In Rotation
              </h2>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: `${PEACH}50`, letterSpacing: "0.16em", textTransform: "uppercase", alignSelf: "center" }}>
                this week
              </span>
              {/* Live dot */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginLeft: "auto", marginRight: "clamp(1.5rem, 5vw, 4rem)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: RED, display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: RED, letterSpacing: "0.16em", textTransform: "uppercase" }}>live</span>
              </span>
            </motion.div>

            {/* Thin color rule under header */}
            <div style={{ marginTop: "1rem", display: "flex", gap: "2px" }}>
              {[RED, CORAL, PEACH, SAGE].map((c) => (
                <div key={c} style={{ height: "2px", background: c, flex: 1, opacity: 0.6 }} />
              ))}
            </div>
          </div>

          {/* Marquee */}
          <div style={{
            overflow: "hidden",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            maskImage:        "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}>
            <div className="fun-marquee">
              {doubled.map((album, i) => (
                <AlbumCard key={`${album.id}-${i}`} album={album} />
              ))}
            </div>
          </div>

          {/* Footer label */}
          <div style={{ padding: "1.25rem clamp(1.5rem, 5vw, 3rem) 0", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: `${PEACH}35`, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              {drakeAlbums.length} albums · drake discography
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: `${PEACH}35`, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              2010 — 2024
            </span>
          </div>
        </section>

        {/* ── PALETTE DIVIDER ──────────────────────────────────────────────── */}
        <div className="palette-stripe" style={{ opacity: 0.5 }}>
          {[RED, CORAL, PEACH, SAGE, `${NAVY}00`].map((c, i) => (
            <span key={i} style={{ background: c }} />
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            TRIPS
        ════════════════════════════════════════════════════════════════ */}
        <section
          id="travel"
          style={{ padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)", position: "relative", overflow: "hidden" }}
        >
          {/* Ghost number */}
          <div
            aria-hidden
            style={{
              position: "absolute", right: "-0.04em", bottom: "-0.12em",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(12rem, 32vw, 26rem)",
              lineHeight: 1,
              color: `${CORAL}08`,
              letterSpacing: "-0.04em",
              userSelect: "none", pointerEvents: "none",
            }}
          >
            03
          </div>

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1.25rem", marginBottom: "clamp(2.5rem, 6vw, 4rem)", position: "relative", zIndex: 2 }}
          >
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(0.85rem, 2vw, 1.1rem)", letterSpacing: "0.22em", color: SAGE }}>
              02
            </span>
            <h2 style={{ fontFamily: "'Antonio', 'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 6.5vw, 5rem)", fontWeight: 700, color: "#F5EEE8", letterSpacing: "-0.02em", textTransform: "uppercase", lineHeight: 1 }}>
              The Archives
            </h2>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: `${SAGE}55`, letterSpacing: "0.16em", textTransform: "uppercase", alignSelf: "center" }}>
              trips
            </span>
          </motion.div>

          {/* Trip rows */}
          <div style={{ position: "relative", zIndex: 2 }}>
            {trips.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.button
                  onClick={() => setActiveTrip(trip)}
                  className="trip-row"
                  style={{
                    width: "100%", textAlign: "left", background: "none", border: "none",
                    borderTop: i === 0 ? `1px solid rgba(245,238,232,0.08)` : "none",
                    padding: "clamp(1.25rem, 3vw, 2rem) 0",
                    cursor: "pointer", position: "relative",
                    display: "flex", alignItems: "center",
                    gap: "clamp(1rem, 3.5vw, 2.5rem)",
                    // CSS variable for hover color (used in .trip-row CSS)
                    ["--row-color" as string]: trip.color,
                  }}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Hover background wash */}
                  <div className="trip-row-bg" style={{ background: `${trip.color}0A` }} />

                  {/* Left color bar */}
                  <div style={{ width: "3px", height: "clamp(2.5rem, 6vw, 4rem)", background: trip.color, flexShrink: 0, opacity: 0.7 }} />

                  {/* Index */}
                  <span
                    className="trip-index"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(0.8rem, 1.8vw, 1rem)", letterSpacing: "0.12em", color: `${PEACH}30`, minWidth: "2rem", flexShrink: 0 }}
                  >
                    0{i + 1}
                  </span>

                  {/* Year */}
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
                    letterSpacing: "0.14em", color: trip.color,
                    background: `${trip.color}18`,
                    border: `1px solid ${trip.color}40`,
                    padding: "0.2rem 0.65rem",
                    textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0,
                  }}>
                    {trip.year}
                  </span>

                  {/* City name */}
                  <h3 style={{
                    fontFamily: "'Antonio', 'Bebas Neue', sans-serif",
                    fontSize: "clamp(2rem, 6vw, 4.5rem)",
                    fontWeight: 700, color: "#F5EEE8",
                    letterSpacing: "-0.02em", textTransform: "uppercase",
                    lineHeight: 1, flex: 1,
                  }}>
                    {trip.name}
                  </h3>

                  {/* Location + arrow */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: `${PEACH}28`, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                      {trip.location}
                    </span>
                    <span
                      className="trip-arrow"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 30, height: 30,
                        border: `1px solid ${PEACH}22`,
                        color: `${PEACH}35`, flexShrink: 0,
                        fontSize: "0.75rem",
                      }}
                    >
                      ↗
                    </span>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Right vertical label */}
          <div
            aria-hidden
            className="scroll-vert"
            style={{
              position: "absolute", right: "clamp(0.5rem, 1.5vw, 1.25rem)", top: "50%",
              transform: "translateY(-50%) rotate(180deg)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.55rem", letterSpacing: "0.22em",
              color: `${SAGE}40`, textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            section 02 / 02
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer
          style={{
            borderTop: `1px solid ${PEACH}12`,
            padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", color: `${PEACH}28`, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            © 2026 Ayaan Sajjad
          </span>
          {/* Palette dots */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {[SAGE, PEACH, CORAL, RED].map((c) => (
              <span key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c, opacity: 0.6 }} />
            ))}
          </div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)", color: `${PEACH}20`, letterSpacing: "0.16em" }}>
            TORONTO, ON
          </span>
        </footer>

        {/* ── TRIP MODAL ───────────────────────────────────────────────────── */}
        <AnimatePresence>
          {activeTrip && (
            <TripModal trip={activeTrip} onClose={() => setActiveTrip(null)} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
