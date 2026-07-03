# WatchWhat — Product Spec

## What it is

WatchWhat is an interactive 3D watch anatomy learning app. Users pick a type
of watch, open it up, explode it into its parts, click on individual parts,
and learn what each one is, what it does, how it works, and how it connects
to the rest of the watch.

It should feel like:

- a museum exhibit
- a watchmaker's bench
- an interactive textbook
- a 3D teardown simulator

## What it is not (v0.1)

v0.1 is **not** a precision CAD simulator. It uses simplified, procedural 3D
models rather than accurate manufacturer geometry. The goal is a polished
educational MVP, not dimensional accuracy.

## Core interactions

- **Pick a movement type** — manual, automatic, quartz, or just the exterior.
- **Switch view modes**:
  - `assembled` — the watch as worn.
  - `exploded` — every part spread apart for inspection.
  - `teardown` — a guided, step-by-step disassembly sequence.
  - `energy` — a legend highlighting how power flows from the source
    (mainspring or battery) out to the hands. In exterior mode, this becomes
    an assembly relationship map.
  - `isolate` — fade everything except the selected part.
- **Click any part** to open its info panel: short definition, function, how
  it works, what it connects to, and (where relevant) a common failure mode.
- **Search for a part** by name from the left panel.

## Architecture

- **Vite + React + TypeScript** for the app shell.
- **Three.js via `@react-three/fiber`** for the 3D scene, with `@react-three/drei`
  helpers (camera controls, `<Html>` labels).
- **Zustand** (`src/store/viewerStore.ts`) holds all viewer UI state —
  movement type, view mode, selection, hover, teardown step, search — as a
  single source of truth the 3D scene and the surrounding panels both read.
- **Tailwind CSS** for styling, **lucide-react** for icons.
- **A clean `partId` mapping** (`src/data/watchParts.ts`,
  `src/data/partCatalog.ts`, `src/data/movementConfigs.ts`) decouples *what a
  part is and means* from *how it's currently drawn*. Every part is procedural
  geometry today (`src/components/watch/primitives/`); a real GLB/CAD asset can
  replace any primitive later without touching the data, state, or panel code,
  as long as it's addressed by the same `partId`.

## v0.1 scope

This first milestone scaffolds the whole system end-to-end — app shell,
styling, types, the Zustand store, docs, and placeholder UI wired to real
(if procedural) 3D parts — so future PRs can focus purely on improving
fidelity: better geometry, richer animations, more movement types, and
eventually real assets.

## Explicitly out of scope

- No backend, accounts, or auth.
- No AI/chat features.
- No scraped or unlicensed third-party 3D assets (see
  `THIRD_PARTY_ASSETS.md`).
- No brand logos or trade dress from real watch manufacturers.
