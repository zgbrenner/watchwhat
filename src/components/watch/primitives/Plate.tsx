type PlateProps = {
  radius?: number
  thickness?: number
  color?: string
}

/** A round plate — used for the main plate, dial, and similar disc-shaped parts. */
export function Plate({ radius = 0.35, thickness = 0.02, color = "#e6d1a1" }: PlateProps) {
  return (
    <mesh>
      <cylinderGeometry args={[radius, radius, thickness, 32]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} />
    </mesh>
  )
}
