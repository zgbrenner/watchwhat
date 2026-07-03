type PlateProps = {
  radius?: number
  thickness?: number
  color?: string
  opacity?: number
}

/** A round plate laid flat in the watch plane with z as thickness. */
export function Plate({ radius = 0.35, thickness = 0.02, color = "#e6d1a1", opacity = 1 }: PlateProps) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[radius, radius, thickness, 64]} />
      <meshStandardMaterial
        color={color}
        metalness={0.38}
        roughness={0.42}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  )
}
