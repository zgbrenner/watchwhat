type PlateProps = {
  radius?: number
  thickness?: number
  color?: string
  opacity?: number
  metalness?: number
  roughness?: number
}

/** A round plate laid flat in the watch plane with z as thickness. */
export function Plate({
  radius = 0.35,
  thickness = 0.02,
  color = "#e6d1a1",
  opacity = 1,
  metalness = 0.55,
  roughness = 0.4,
}: PlateProps) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, thickness, 96]} />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  )
}
