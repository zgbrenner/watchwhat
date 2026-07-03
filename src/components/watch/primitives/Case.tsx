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

  if (openEnded) {
    return (
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[radius, radius, height, 96, 1, true]} />
          <meshStandardMaterial color={color} metalness={0.88} roughness={0.22} transparent opacity={effectiveOpacity} />
        </mesh>
        <mesh position={[0, 0, height / 2]}>
          <torusGeometry args={[radius * 0.94, radius * 0.025, 10, 96]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.18} transparent={effectiveOpacity < 1} opacity={Math.min(1, effectiveOpacity + 0.2)} />
        </mesh>
        <mesh position={[0, 0, -height / 2]}>
          <torusGeometry args={[radius * 0.94, radius * 0.02, 10, 96]} />
          <meshStandardMaterial color={color} metalness={0.86} roughness={0.24} transparent={effectiveOpacity < 1} opacity={Math.min(1, effectiveOpacity + 0.16)} />
        </mesh>
      </group>
    )
  }

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[radius, radius, height, 96]} />
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
