type HandProps = {
  length?: number
  width?: number
  color?: string
  angle?: number
}

/**
 * A tapered, faceted watch hand. The blade narrows toward the tip like a
 * classic dauphine hand and rides slightly proud of the dial with a polished
 * boss at the center pinion.
 */
export function Hand({ length = 0.25, width = 0.015, color = "#12151a", angle = 0 }: HandProps) {
  const tailLength = length * 0.16

  return (
    <group rotation={[0, 0, angle]}>
      {/* Main blade — a thin tapered wedge from center out to the tip. */}
      <mesh position={[0, length * 0.5, 0]} castShadow>
        <cylinderGeometry args={[width * 0.28, width, length, 4]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.24} />
      </mesh>
      {/* Short counterweight tail behind the pinion. */}
      <mesh position={[0, -tailLength * 0.5, 0]} castShadow>
        <cylinderGeometry args={[width * 0.7, width * 0.35, tailLength, 4]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.24} />
      </mesh>
      {/* Polished center boss. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[width * 1.5, width * 1.5, 0.01, 28]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}
