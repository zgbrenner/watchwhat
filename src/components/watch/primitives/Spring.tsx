type SpringProps = {
  radius?: number
  tubeRadius?: number
  color?: string
}

/**
 * A flat coiled spring silhouette in the watch plane. This is still a
 * simplified torus, but it now sits in the same plane as the movement.
 */
export function Spring({ radius = 0.05, tubeRadius = 0.004, color = "#7a4f29" }: SpringProps) {
  return (
    <mesh>
      <torusGeometry args={[radius, tubeRadius, 10, 56]} />
      <meshStandardMaterial color={color} metalness={0.72} roughness={0.34} />
    </mesh>
  )
}
