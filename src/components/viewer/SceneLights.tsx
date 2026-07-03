export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#f5e7c8", "#111418", 0.55]} />
      <directionalLight position={[1.5, -2, 2.5]} intensity={1.35} castShadow />
      <directionalLight position={[-1.5, 1.5, 1]} intensity={0.55} />
      <pointLight position={[0, 0, 1.2]} intensity={0.35} />
    </>
  )
}
