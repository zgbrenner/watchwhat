type GearProps = {
  radius?: number
  thickness?: number
  teeth?: number
  color?: string
}

/**
 * A procedural watch gear laid flat in the watch plane. It is still not an
 * involute gear, but the rim, hub, teeth, and spokes read much more like a
 * real wheel than a plain cylinder.
 */
export function Gear({ radius = 0.05, thickness = 0.01, teeth = 10, color = "#c99c46" }: GearProps) {
  const safeTeeth = Math.max(teeth, 0)
  const toothLength = radius * 0.22
  const toothWidth = radius * 0.14
  const spokeLength = radius * 1.18
  const spokeWidth = Math.max(radius * 0.08, 0.004)

  return (
    <group>
      <mesh>
        <torusGeometry args={[radius * 0.75, radius * 0.08, 8, 56]} />
        <meshStandardMaterial color={color} metalness={0.78} roughness={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.24, radius * 0.24, thickness * 1.18, 28]} />
        <meshStandardMaterial color="#ead7a1" metalness={0.82} roughness={0.2} />
      </mesh>
      {Array.from({ length: 5 }, (_, index) => {
        const angle = (index / 5) * Math.PI * 2
        return (
          <mesh key={`spoke-${index}`} rotation={[0, 0, angle]}>
            <boxGeometry args={[spokeWidth, spokeLength, thickness * 0.72]} />
            <meshStandardMaterial color={color} metalness={0.76} roughness={0.26} />
          </mesh>
        )
      })}
      {Array.from({ length: safeTeeth }, (_, index) => {
        const angle = (index / safeTeeth) * Math.PI * 2
        const x = Math.cos(angle) * (radius + toothLength * 0.26)
        const y = Math.sin(angle) * (radius + toothLength * 0.26)
        return (
          <mesh key={`tooth-${index}`} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <boxGeometry args={[toothLength, toothWidth, thickness]} />
            <meshStandardMaterial color={color} metalness={0.78} roughness={0.25} />
          </mesh>
        )
      })}
    </group>
  )
}
