# Research & Asset Plan

This document outlines how WatchWhat should evolve from procedural
placeholder geometry (v0.1) toward richer, more accurate content — without
ever compromising on licensing (see `THIRD_PARTY_ASSETS.md`).

## Guiding principle

Build the interactive system first, using procedural geometry, with a clean
`partId` mapping. Every part is addressable by a stable ID
(`src/data/watchParts.ts`), and its 3D representation is looked up
separately (`src/components/watch/primitives/`, `src/data/movementConfigs.ts`).
This means better geometry — whether improved procedural models or real
licensed assets — can be swapped in per part later without touching the
educational content, state management, or UI.

## Content research plan

Watch anatomy is well-documented, generic horological knowledge (not
specific to any single brand). Future content passes should:

1. Expand `watchParts.ts` with more granular parts (e.g., individual
   jewels, cannon pinion, hour wheel, minute wheel, click spring) as the 3D
   models gain fidelity to support them.
2. Cross-check definitions against multiple independent, general horology
   references (books, watchmaking schools' public course material, generic
   glossaries) rather than a single manufacturer's marketing copy, to avoid
   both inaccuracy and copyright concerns.
3. Add more `quizPrompt` and `failureMode` entries so the quiz mode and
   "what can go wrong" educational angle can grow.
4. Keep all written content original — summarizing well-known mechanical
   principles in our own words, not copy-pasting from any source.

## Geometry / asset plan

### Phase 1 (this PR and near-term): procedural only

- All parts render as simple primitives (gears, cylinders, torus springs,
  boxes) parameterized per part.
- Focus on getting the interaction model right: selection, hover, explode,
  teardown sequencing, energy flow, isolate, quiz.

### Phase 2: improved procedural fidelity

- Refine primitives to better approximate real part silhouettes (e.g., a
  gear with a proper involute-ish tooth profile, a more convincing
  balance-spring coil, a case with lugs) while remaining fully original,
  hand-authored geometry — no CAD import required.

### Phase 3: optional real assets (strictly gated)

If real 3D assets are ever introduced:

- They must come from a legitimate, license-clear channel: assets the
  contributor modeled themselves, assets under a permissive license with
  clear redistribution rights, or assets explicitly licensed for this
  project.
- **Do not** scrape Sketchfab, GrabCAD, OpenMovement, or manufacturer sites.
  Community-uploaded CAD files are not automatically MIT-licensed, and
  manufacturer assets are proprietary.
- **Do not** reproduce brand logos or the distinctive trade dress of real
  watch brands (Rolex, Omega, Seiko, Casio, etc.). Any real-world reference
  should inform *generic* educational geometry, not a copy of a specific
  commercial product.
- Every asset added must be recorded in `docs/ATTRIBUTION.md` with source,
  author, and license before merging.
- When license or provenance can't be verified, the asset is not included.

## Non-goals

- WatchWhat is not trying to be a dimensionally accurate CAD tool. Precision
  engineering tolerances, exact gear ratios, and manufacturer-specific
  calibers are out of scope.
- WatchWhat does not aim to recreate any specific commercial watch model.
