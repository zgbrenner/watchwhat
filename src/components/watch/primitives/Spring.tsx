type SpringProps = {
  radius?: number
  tubeRadius?: number
  color?: string
}

/**
 * A coiled spring, approximated with a torus. Reads well as a mainspring
 * or hairspring silhouette from a typical viewing distance.
 */
export function Spring({ radius = 0.05, tubeRadius = 0.004, color = "#7a4f29" }: SpringProps) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, tubeRadius, 8, 32]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.4} />
    </mesh>
  )
}
