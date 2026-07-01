# Attribution

This file tracks every third-party asset, dataset, or reference material
used in WatchWhat that is not original to this project. See
`docs/THIRD_PARTY_ASSETS.md` for the rules governing what can be added here.

## 3D Assets

_None._ As of v0.1, all geometry in WatchWhat is procedural — generated in
code under `src/components/watch/primitives/` — with no imported third-party
3D models, textures, or CAD files.

## Fonts, Icons, and Libraries

- Icons: [lucide-react](https://lucide.dev/) — ISC License.
- 3D rendering: [three.js](https://threejs.org/) — MIT License.
- React bindings: [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) and
  [@react-three/drei](https://github.com/pmndrs/drei) — MIT License.
- State management: [zustand](https://github.com/pmndrs/zustand) — MIT License.
- Styling: [Tailwind CSS](https://tailwindcss.com/) — MIT License.

These are standard open-source npm dependencies declared in `package.json`;
their own licenses apply to their respective source code and are unaffected
by WatchWhat's MIT license.

## Educational Content

The definitions, functions, and "how it works" explanations in
`src/data/watchParts.ts` and `src/data/glossary.ts` describe general,
well-established horology concepts (e.g., how a mainspring, escapement, or
quartz oscillator works). This content was written from general horological
knowledge for this project and is not copied from any single manufacturer's
documentation or marketing material.

## Adding a new entry

When a new third-party asset is added to the project, append an entry here
with:

- **Asset name / description**
- **Source URL**
- **Author / creator**
- **License** (with a link to the license text)
- **Any modifications made**
