# WatchWhat

An interactive 3D watch anatomy learning app. Pick a movement type, explode
it into its parts, click around, and learn what each part is, what it does,
how it works, and how it connects to the rest of the watch.

Live app: https://zgbrenner.github.io/watchwhat/

WatchWhat is open source under the MIT License. See `LICENSE` for details,
and `docs/THIRD_PARTY_ASSETS.md` for important notes on 3D asset licensing.

## Status

This is v0.2 — an interactive teaching atlas with a full visual overhaul. The
watch now renders as a believable timepiece: image-based studio lighting gives
the steel, brass, and glass real reflections; a physically transmissive crystal
sits over a nested case; and the camera frames each view mode automatically.

The geometry is still procedural (see `docs/PRODUCT_SPEC.md`), but proportions,
materials, lighting, and framing have all been reworked so the app reads like a
watchmaker's bench rather than a stack of discs.

## Current features

- Manual, automatic, quartz, and exterior watch modes
- Procedural 3D watch parts rendered with React Three Fiber
- Studio image-based lighting with real metal/glass reflections and contact
  shadows (no external HDR assets — works fully offline and on GitHub Pages)
- A properly nested case with a physically transmissive glass crystal
- Assembled, exploded, teardown, energy-flow, and isolate views
- A mode-aware camera that eases to the best framing and angle for each view,
  with gentle idle auto-rotation on the assembled watch
- Emissive selection/hover highlighting on parts
- Guided teardown steps and an ordered energy-flow / assembly map
- Clickable part labels, a first-run interaction hint, and rich educational
  info panels
- Part search

## Getting started

```bash
npm install
npm run dev
```

Other useful scripts:

```bash
npm run typecheck   # TypeScript project check
npm run lint        # ESLint
npm run test        # Vitest
npm run build       # Production build
```

## Deployment

GitHub Pages deploys from `.github/workflows/pages.yml` on every push to
`main`. The workflow builds the Vite app with the `/watchwhat/` base path and
uploads the generated `dist` folder to Pages.

## Tech stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Three.js](https://threejs.org/) via [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber)
  and [`@react-three/drei`](https://github.com/pmndrs/drei)
- [Zustand](https://github.com/pmndrs/zustand) for viewer state
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [lucide-react](https://lucide.dev/) for icons
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react)

## Documentation

- `docs/PRODUCT_SPEC.md` — what WatchWhat is and how it's meant to work.
- `docs/THIRD_PARTY_ASSETS.md` — licensing rules for any future 3D assets.
- `docs/ATTRIBUTION.md` — credits for third-party dependencies and content.
- `docs/RESEARCH_AND_ASSET_PLAN.md` — the plan for growing content and asset
  fidelity over time.
