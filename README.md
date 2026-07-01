# WatchWhat

An interactive 3D watch anatomy learning app. Pick a movement type, explode
it into its parts, click around, and learn what each part is, what it does,
how it works, and how it connects to the rest of the watch.

WatchWhat is open source under the MIT License. See `LICENSE` for details,
and `docs/THIRD_PARTY_ASSETS.md` for important notes on 3D asset licensing.

## Status

This is v0.1 — an early scaffold. The interactive system (state, layout,
panels, and a procedurally-generated 3D viewer) is in place; visual fidelity
and content depth will grow in future iterations. See
`docs/PRODUCT_SPEC.md` for the full product vision and
`docs/RESEARCH_AND_ASSET_PLAN.md` for where this is headed.

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
