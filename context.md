# Portfolio Context

## Owner
**Name:** Ayaan Sajjad
**Age:** 16
**Location:** Toronto, ON
**Email:** contact@ayaansajjad.ca
**GitHub:** https://github.com/nordicator
**LinkedIn:** https://linkedin.com/in/ayaan-sajjad
**Cosmos:** https://cosmos.so/nordicator

## Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + custom CSS variables
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Package Manager:** pnpm
- **Fonts:** Cormorant Garamond (display), Nunito (body), DM Mono (mono)

## Design System
- **Aesthetic:** Terracotta / clay — warm, cozy, rich. Not minimalist.
- **Background:** `#FBF5EC` (warm cream)
- **Primary:** `#C4714B` (terracotta)
- **Secondary accent:** `#8FA67A` (sage green)
- **Dark:** `#2D1810` (espresso)
- **Fonts:** Cormorant Garamond for display headings (serif, editorial), Nunito for body text, DM Mono for labels/tags/code

## Pages
- `/` — Home: loader, centered hero with name + cycling role + "16 year old · Toronto", about bio, skills grid, project boxes (click-to-expand modal), footer
- `/projects` — Projects: header, full project boxes grid with click-to-expand modal, footer

## Projects
### BetterTA (BetterTeachAssist)
- **URL:** https://betterta.ca
- **Year:** 2025
- **Type:** Mobile App
- **Status:** Live
- **Tech:** React Native, Expo, TypeScript, Supabase, Go
- **Team:** Ayaan, Awsaf
- **Description:** Mobile app for YRDSB students — modern interface for TeachAssist grade portal. Features grade prediction, analytics, class chatrooms, YRAA sports integration, native widgets.

### Ralph — AI Guide Dog
- **Repo:** https://github.com/CDX-1/ralph
- **Year:** 2026
- **Type:** Robotics / ML
- **Status:** DeltaHacks 12 (McMaster University)
- **Tech:** Python, YOLOv8, MiDaS, Raspberry Pi 5, OpenCV
- **Team:** Ayaan, Awsaf, Dinesh, Richard
- **Description:** Autonomous robot car using computer vision to help visually impaired people navigate. Divides camera view into 5 columns, detects objects, estimates depth, plans path, controls motors.

## Key Design Decisions
- No emojis anywhere
- Loading screen on first visit: letters animate up one by one, terracotta progress bar fills, then fades out (~2.5s)
- Project cards are clickable boxes that open a bottom-sheet modal with full details
- Name centered on hero, not left-aligned
- Bio is personal and specific — about building random exciting things, not generic developer copy
- Cosmos added to footer links alongside GitHub and LinkedIn
- Grain texture overlay on body via CSS `::before`
- Three drifting blob shapes (terracotta, rose, sage) animate in background sections
- Scrolling marquee strip of stack/skills between hero and about section
