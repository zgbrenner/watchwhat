/**
 * Direct lights that complement the image-based `StudioEnvironment`. The
 * environment map supplies reflections and ambient shape; these lights add a
 * crisp key highlight and a soft fill, plus the single shadow-casting source
 * used by the contact shadows on the bench surface.
 */
export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <hemisphereLight args={["#f3e8cf", "#0c0f13", 0.35]} />
      <directionalLight
        position={[2.2, 3.4, 2.6]}
        intensity={2.1}
        color="#fff4df"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-2.6, 1.2, 1.4]} intensity={0.5} color="#bcd0ff" />
      <pointLight position={[0, -0.6, 1.6]} intensity={0.3} color="#ffe7c0" />
    </>
  )
}
