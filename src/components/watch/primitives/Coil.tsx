type CoilProps = {
  radius?: number
  height?: number
  color?: string
}

/**
 * A wound electromagnetic coil, approximated as a short squat cylinder.
 */
export function Coil({ radius = 0.03, height = 0.02, color = "#b8843a" }: CoilProps) {
  return (
    <mesh>
      <cylinderGeometry args={[radius, radius, height, 16]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.6} />
    </mesh>
  )
}
