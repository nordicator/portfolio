"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Camera, X } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const drakeAlbums = [
  { id: 1,  title: "Thank Me Later",               year: "2010", bg: "#1B0D2A", accent: "#9D5CE5" },
  { id: 2,  title: "Take Care",                    year: "2011", bg: "#0E1217", accent: "#C8A56D" },
  { id: 3,  title: "Nothing Was the Same",         year: "2013", bg: "#0A1628", accent: "#4A8FD4" },
  { id: 4,  title: "If You're Reading This",       year: "2015", bg: "#1A1A1A", accent: "#E9C899" },
  { id: 5,  title: "Views",                        year: "2016", bg: "#1C1208", accent: "#D4A840" },
  { id: 6,  title: "More Life",                    year: "2017", bg: "#0F1923", accent: "#FF6B35" },
  { id: 7,  title: "Scorpion",                     year: "2018", bg: "#111111", accent: "#D4D4D4" },
  { id: 8,  title: "Dark Lane Demo Tapes",         year: "2020", bg: "#060B1A", accent: "#3B82F6" },
  { id: 9,  title: "Certified Lover Boy",          year: "2021", bg: "#1A1A2E", accent: "#E94560" },
  { id: 10, title: "Honestly, Nevermind",          year: "2022", bg: "#0D0020", accent: "#A855F7" },
  { id: 11, title: "For All The Dogs",             year: "2023", bg: "#190E00", accent: "#F59E0B" },
  { id: 12, title: "Scary Hours 3",                year: "2024", bg: "#0A0A0A", accent: "#EF4444" },
];

type Photo = { src: string; caption?: string };

type Trip = {
  id: number;
  name: string;
  location: string;
  year: string;
  accent: string;
  photos: Photo[];
};

const trips: Trip[] = [
  {
    id: 1,
    name: "New York City",
    location: "New York, USA",
    year: "Summer 2024",
    accent: "#FF2D78",
    // Add photos: { src: "/trips/nyc/1.jpg", caption: "Times Square" }
    photos: [],
  },
  {
    id: 2,
    name: "Ottawa",
    location: "Ontario, Canada",
    year: "Spring 2024",
    accent: "#CCFF00",
    photos: [],
  },
  {
    id: 3,
    name: "Montreal",
    location: "Quebec, Canada",
    year: "Fall 2023",
    accent: "#4DFFB4",
    photos: [],
  },
];

// ─── ALBUM CARD ──────────────────────────────────────────────────────────────

function AlbumCard({ album }: { album: typeof drakeAlbums[0] }) {
  return (
    <div
      className="shrink-0 relative overflow-hidden rounded-xl select-none"
      style={{ width: 164, height: 164, background: album.bg }}
    >
      <div
        className="absolute w-28 h-28 rounded-full blur-2xl opacity-50 pointer-events-none"
        style={{ background: album.accent, top: "-20%", right: "-20%" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${album.bg}EE, transparent)` }}
      />
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <p
          className="text-[10px] mb-1 opacity-70 uppercase tracking-widest"
          style={{ color: album.accent, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {album.year}
        </p>
        <h3
          className="leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.15rem",
            color: "#fff",
            textShadow: `0 2px 16px ${album.accent}70`,
            letterSpacing: "0.02em",
          }}
        >
          {album.title}
        </h3>
      </div>
    </div>
  );
}

// ─── POLAROID ────────────────────────────────────────────────────────────────

function Polaroid({ photo, rotation, delay }: { photo: Photo | null; rotation: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: rotation }}
      transition={{ delay, type: "spring", stiffness: 160, damping: 20 }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
      className="relative bg-white shadow-2xl cursor-default"
      style={{ padding: "10px 10px 36px 10px", zIndex: 1 }}
    >
      <div
        className="bg-neutral-800 flex items-center justify-center overflow-hidden"
        style={{ width: 170, height: 170 }}
      >
        {photo?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt={photo.caption || ""} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2" style={{ opacity: 0.25 }}>
            <Camera size={26} color="#fff" />
            <span
              className="text-white text-[10px]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              coming soon
            </span>
          </div>
        )}
      </div>
      {photo?.caption && (
        <p
          className="absolute bottom-2 left-0 right-0 text-center text-neutral-400"
          style={{ fontFamily: "'Permanent Marker', cursive", fontSize: "0.65rem" }}
        >
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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-200 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.96)", scrollbarWidth: "none" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl mx-auto px-6 md:px-12 py-16"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="fixed top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
        >
          <X size={15} />
        </button>

        <div className="mb-14">
          <div
            className="flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.18em]"
            style={{ color: trip.accent, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <MapPin size={11} />
            {trip.location} · {trip.year}
          </div>
          <h2
            className="leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 11vw, 7rem)",
              color: "white",
              letterSpacing: "0.01em",
              textShadow: `0 0 80px ${trip.accent}40`,
            }}
          >
            {trip.name}
          </h2>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {displayPhotos.map((photo, i) => (
            <Polaroid
              key={i}
              photo={photo}
              rotation={rotations[i % rotations.length]}
              delay={i * 0.055}
            />
          ))}
        </div>

        {trip.photos.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 text-sm"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            photos dropping soon
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── TRIP CARD ───────────────────────────────────────────────────────────────

function TripCard({ trip, index, onClick }: { trip: Trip; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        onClick={onClick}
        className="w-full text-left relative overflow-hidden rounded-2xl p-7 group"
        style={{
          background: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
        whileHover={{ borderColor: `${trip.accent}55`, scale: 1.015 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700"
          style={{ background: trip.accent, transform: "translate(30%, -30%)" }}
        />

        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-4"
          style={{
            background: `${trip.accent}18`,
            color: trip.accent,
            border: `1px solid ${trip.accent}40`,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {trip.year}
        </span>

        <h3
          className="mb-2 leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            color: "white",
            letterSpacing: "0.02em",
          }}
        >
          {trip.name}
        </h3>

        <div
          className="flex items-center gap-1.5 text-xs opacity-40"
          style={{ color: "white", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <MapPin size={11} />
          {trip.location}
        </div>

        {trip.photos.length > 0 && (
          <div
            className="flex items-center gap-1.5 text-xs mt-3"
            style={{ color: trip.accent, opacity: 0.7, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Camera size={11} />
            {trip.photos.length} photos
          </div>
        )}
      </motion.button>
    </motion.div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function FunPage() {
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const doubled = [...drakeAlbums, ...drakeAlbums];

  return (
    <main style={{ background: "#111111", minHeight: "100vh", color: "white" }}>
      {/* ── BACK LINK ─────────────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] transition-opacity hover:opacity-60"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <ArrowLeft size={11} />
          back to portfolio
        </Link>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 pt-14 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="overflow-hidden mb-1">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Permanent Marker', cursive",
                fontSize: "clamp(1.6rem, 3.8vw, 2.6rem)",
                color: "rgba(255,255,255,0.35)",
                display: "block",
                marginBottom: "0.1em",
              }}
            >
              the
            </motion.span>
          </div>

          <div className="overflow-hidden mb-1">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(5.5rem, 20vw, 14rem)",
                color: "#CCFF00",
                lineHeight: 0.88,
                display: "block",
                letterSpacing: "-0.01em",
              }}
            >
              OTHER
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.26, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.8rem, 9vw, 6.5rem)",
                fontWeight: 700,
                fontStyle: "italic",
                color: "white",
                letterSpacing: "-0.03em",
                display: "block",
              }}
            >
              side.
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-xs uppercase tracking-[0.18em]"
            style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            16 · toronto · always on shuffle
          </motion.p>
        </div>
      </section>

      {/* ── IN ROTATION ───────────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6 md:px-12 mb-7">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: "#CCFF00", animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            <p
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "#CCFF00", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              in rotation this week
            </p>
          </motion.div>
        </div>

        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="marquee-track-fun">
            {doubled.map((album, i) => (
              <AlbumCard key={`${album.id}-${i}`} album={album} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRIPS ─────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <p
              className="text-xs uppercase tracking-[0.2em] mb-2"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              the archives
            </p>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3rem, 8vw, 5rem)",
                color: "white",
                lineHeight: 1,
                letterSpacing: "0.02em",
              }}
            >
              Trips
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {trips.map((trip, i) => (
              <TripCard
                key={trip.id}
                trip={trip}
                index={i}
                onClick={() => setActiveTrip(trip)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer
        className="px-6 py-10 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p
          className="text-xs text-center"
          style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          © 2026 Ayaan Sajjad
        </p>
      </footer>

      {/* ── TRIP MODAL ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeTrip && (
          <TripModal trip={activeTrip} onClose={() => setActiveTrip(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
