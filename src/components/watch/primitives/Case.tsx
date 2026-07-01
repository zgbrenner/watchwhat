type CaseProps = {
  radius?: number
  height?: number
  color?: string
  openEnded?: boolean
}

export function Case({ radius = 0.45, height = 0.14, color = "#9ba5ad", openEnded = false }: CaseProps) {
  return (
    <mesh>
      <cylinderGeometry args={[radius, radius, height, 48, 1, openEnded]} />
      <meshStandardMaterial
        color={color}
        metalness={0.85}
        roughness={0.25}
        transparent={openEnded}
        opacity={openEnded ? 0.35 : 1}
      />
    </mesh>
  )
}
