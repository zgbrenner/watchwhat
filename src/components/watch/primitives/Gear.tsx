type GearProps = {
  radius?: number
  thickness?: number
  teeth?: number
  color?: string
}

/**
 * A simple procedural gear: a cylindrical body with small box "teeth"
 * arranged around its rim. Good enough to read as a gear at a distance
 * without modeling real involute tooth profiles — a real GLB can replace
 * this once available, since callers only ever address it by partId.
 */
export function Gear({ radius = 0.05, thickness = 0.01, teeth = 10, color = "#c99c46" }: GearProps) {
  const toothSize = radius * 0.28

  return (
    <group>
      <mesh>
        <cylinderGeometry args={[radius, radius, thickness, 24]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} />
      </mesh>
      {Array.from({ length: teeth }, (_, index) => {
        const angle = (index / teeth) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <mesh key={index} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[toothSize, thickness, toothSize]} />
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} />
          </mesh>
        )
      })}
    </group>
  )
}
