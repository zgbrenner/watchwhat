# Third-Party Assets

WatchWhat's **code** is licensed under the MIT License (see `LICENSE` in the
repository root). **That license covers the code only.** It does not, and
cannot, automatically apply to any third-party 3D model, texture, image, or
CAD file that might be added to this project in the future.

## Current state

As of v0.1, WatchWhat ships with **no third-party 3D assets at all**. Every
part visible in the viewer is simplified, procedural geometry generated in
code (see `src/components/watch/primitives/`). There are no imported GLB,
GLTF, OBJ, STEP, or other CAD/3D files in this repository.

## Rules for adding third-party assets in the future

If real 3D assets are ever introduced to replace procedural placeholders,
the following rules apply without exception:

1. **No scraping.** Nobody may scrape, download in bulk, or otherwise
   programmatically harvest 3D models from sites such as Sketchfab,
   GrabCAD, OpenMovement, watch manufacturer/brand websites, or any other
   source, for inclusion in this project.
2. **No assumed licensing.** A third-party asset is never assumed to be
   MIT-licensed, public domain, or otherwise free to redistribute just
   because it's freely viewable online. In particular, models found on
   community CAD/model-sharing sites (including OpenMovement) are **not**
   MIT-licensed by default and must not be represented as such.
3. **Manual review required.** Any third-party CAD or 3D asset may only be
   added to this repository after a human has manually obtained it through
   a legitimate channel (e.g., a license grant, a public-domain source with
   verifiable provenance, or an asset the contributor created themselves)
   and confirmed its license permits the intended use and redistribution.
4. **No brand identity.** Contributors must not reproduce brand logos,
   trademarked dial designs, or the distinctive trade dress of real watch
   manufacturers (e.g., Rolex, Omega, Seiko, Casio). Educational geometry
   should be generic and original, not a copy of a specific commercial
   product's appearance.
5. **Attribution.** Any third-party asset that is added must be recorded in
   `docs/ATTRIBUTION.md` with its source, author, and license.
6. **When in doubt, don't include it.** If the license or provenance of an
   asset can't be clearly established, it should not be added to this
   repository.

## Why this matters

WatchWhat is an open-source, MIT-licensed project. Mixing in assets with
incompatible or unclear licensing would put every downstream user of this
project at legal risk. Keeping the 3D content procedural (or, later,
verifiably and explicitly licensed) keeps the project genuinely free to
use, modify, and redistribute.
