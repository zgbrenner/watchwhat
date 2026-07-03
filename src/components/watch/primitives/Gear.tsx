type GearProps = {
  radius?: number
  thickness?: number
  teeth?: number
  color?: string
}

/**
 * A procedural watch gear laid flat in the watch plane. Three.js cylinders
 * are y-axis aligned by default, so the body is rotated to make z the
 * thickness axis, matching the rest of WatchWhat's coordinate system.
 */
export function Gear({ radius = 0.05, thickness = 0.01, teeth = 10, color = "#c99c46" }: GearProps) {
  const toothLength = radius * 0.26
  const toothWidth = radius * 0.16

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, thickness, 40]} />
        <meshStandardMaterial color={color} metalness={0.72} roughness={0.28} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.22, radius * 0.22, thickness * 1.08, 24]} />
        <meshStandardMaterial color="#e8d39b" metalness={0.8} roughness={0.22} />
      </mesh>
      {Array.from({ length: Math.max(teeth, 0) }, (_, index) => {
        const angle = (index / teeth) * Math.PI * 2
        const x = Math.cos(angle) * (radius + toothLength * 0.32)
        const y = Math.sin(angle) * (radius + toothLength * 0.32)
        return (
          <mesh key={index} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <boxGeometry args={[toothLength, toothWidth, thickness * 0.95]} />
            <meshStandardMaterial color={color} metalness={0.72} roughness={0.28} />
          </mesh>
        )
      })}
    </group>
  )
}
