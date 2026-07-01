export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <hemisphereLight args={["#f3e9cf", "#15181b", 0.5]} />
      <directionalLight position={[2, 3, 2]} intensity={1.1} castShadow />
      <directionalLight position={[-2, -1, -2]} intensity={0.3} />
    </>
  )
}
