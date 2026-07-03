type SpringProps = {
  radius?: number
  tubeRadius?: number
  color?: string
}

/**
 * A layered flat coil silhouette. It intentionally stays lightweight, but
 * reads more like a mainspring or hairspring than a single torus ring.
 */
export function Spring({ radius = 0.05, tubeRadius = 0.004, color = "#7a4f29" }: SpringProps) {
  const turns = [1, 0.78, 0.58, 0.4, 0.24]

  return (
    <group>
      {turns.map((factor, index) => (
        <mesh key={factor} position={[radius * 0.018 * index, 0, index * 0.0008]}>
          <torusGeometry args={[radius * factor, tubeRadius, 8, 64]} />
          <meshStandardMaterial color={color} metalness={0.72} roughness={0.34} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.006]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[tubeRadius * 1.8, tubeRadius * 1.8, tubeRadius * 2.2, 16]} />
        <meshStandardMaterial color={color} metalness={0.72} roughness={0.34} />
      </mesh>
    </group>
  )
}
