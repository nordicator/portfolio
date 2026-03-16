# CLAUDE.md — Portfolio Context

## Project
Ayaan Sajjad's personal portfolio. Next.js 15 App Router, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, pnpm.

## Owner
- **Name:** Ayaan Sajjad, 16, Toronto ON
- **Email:** contact@ayaansajjad.ca
- **GitHub:** https://github.com/nordicator
- **LinkedIn:** https://linkedin.com/in/ayaan-sajjad
- **Cosmos:** https://cosmos.so/nordicator

## Design System
- **Aesthetic:** Terracotta / clay — warm, cozy, editorial. Not minimalist.
- **Fonts:** Cormorant Garamond (`--font-display`), Nunito (`--font-body`), DM Mono (`--font-mono`)
- **Colors:** CSS variables prefixed `--clay-*` (50–950). Primary `#C4714B`, background `#FBF5EC`, dark `#2D1810`
- **No emojis** anywhere in the UI
- **Grain texture** via `body::before` in globals.css
- **Blobs:** three drifting shapes (terracotta, rose, sage) in hero background

## Pages
- `/` — Home: animated loader, hero, marquee strip, about + skills grid, featured project cards, footer
- `/projects` — Projects: header, full project grid, modal, footer

## Key Patterns
- **Loader:** Letters animate up one by one, progress bar fills, fades out (~2.5s total)
- **Project cards:** Clickable boxes → bottom-sheet modal with full details (AnimatePresence)
- **Parallax:** Hero blobs + content use `useScroll` / `useTransform` from framer-motion
- **Navbar:** Floating pill, glass effect, scroll-aware shadow
- **Footer (home):** 3-column grid on desktop — copyright | "Member of Smallwoken" (centered) | social links

## Projects in the Portfolio
| Project | Type | Tech | Status |
|---------|------|------|--------|
| BetterTA | Mobile App | React Native, Expo, TypeScript, Supabase, Go | Live — betterta.ca |
| Ralph — AI Guide Dog | Robotics / ML | Python, YOLOv8, MiDaS, Raspberry Pi 5, OpenCV | DeltaHacks 12 |

## Styling Notes
- Tailwind CSS v4 via `@import "tailwindcss"` in globals.css
- Custom CSS classes: `.blob`, `.blob-1/2/3`, `.marquee-track`, `.hover-link`, `.card-lift`, `.modal-open`
- Inline `style` props are used for CSS variable references (Tailwind can't resolve them at compile time)
- Card backgrounds and accents are per-project colors defined in the data arrays
