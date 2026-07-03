import { Environment, Lightformer } from "@react-three/drei"

/**
 * A self-contained studio lighting environment. It renders a set of
 * `Lightformer` emitters into an off-screen cubemap that every metallic and
 * glass material samples for reflections — no external HDR files, so it works
 * fully offline and on GitHub Pages. This is what makes the brass, steel, and
 * crystal read as real materials instead of flat plastic.
 */
export function StudioEnvironment() {
  return (
    <Environment resolution={512} frames={1}>
      {/* Broad soft key from above-front — the main highlight sweep. */}
      <Lightformer
        form="rect"
        intensity={3.2}
        color="#fff6e6"
        position={[0, 1.6, 1.4]}
        rotation={[-Math.PI / 3, 0, 0]}
        scale={[6, 3, 1]}
      />
      {/* Cool fill from the left to keep steel parts from going muddy. */}
      <Lightformer
        form="rect"
        intensity={1.1}
        color="#cfe0ff"
        position={[-2.4, 0.4, 1.2]}
        rotation={[0, Math.PI / 4, 0]}
        scale={[3, 3, 1]}
      />
      {/* Warm rim from the right for brass edges. */}
      <Lightformer
        form="rect"
        intensity={1.6}
        color="#ffd9a0"
        position={[2.4, 0.2, 0.6]}
        rotation={[0, -Math.PI / 3, 0]}
        scale={[3, 3, 1]}
      />
      {/* Bright streak behind for a specular sparkle on jewels and crystal. */}
      <Lightformer
        form="ring"
        intensity={2.0}
        color="#ffffff"
        position={[0.6, 0.9, -1.8]}
        scale={[1.6, 1.6, 1]}
      />
      {/* Dim floor bounce so undersides aren't pitch black. */}
      <Lightformer
        form="rect"
        intensity={0.5}
        color="#20242c"
        position={[0, -2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[8, 8, 1]}
      />
    </Environment>
  )
}
