type CaseProps = {
  radius?: number
  height?: number
  color?: string
  openEnded?: boolean
  opacity?: number
}

export function Case({
  radius = 0.45,
  height = 0.14,
  color = "#9ba5ad",
  openEnded = false,
  opacity,
}: CaseProps) {
  const effectiveOpacity = opacity ?? (openEnded ? 0.35 : 1)

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[radius, radius, height, 72, 1, openEnded]} />
      <meshStandardMaterial
        color={color}
        metalness={0.88}
        roughness={0.22}
        transparent={effectiveOpacity < 1}
        opacity={effectiveOpacity}
      />
    </mesh>
  )
}
