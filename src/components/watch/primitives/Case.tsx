type CaseProps = {
  radius?: number
  height?: number
  color?: string
  openEnded?: boolean
  opacity?: number
}

/**
 * A polished case section. Uses a physical material with clearcoat so the
 * steel picks up crisp reflections from the studio environment instead of
 * reading as flat plastic.
 */
export function Case({
  radius = 0.45,
  height = 0.14,
  color = "#aab3bb",
  openEnded = false,
  opacity,
}: CaseProps) {
  const effectiveOpacity = opacity ?? (openEnded ? 0.4 : 1)

  if (openEnded) {
    return (
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[radius, radius, height, 128, 1, true]} />
          <meshPhysicalMaterial
            color={color}
            metalness={1}
            roughness={0.18}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
            transparent={effectiveOpacity < 1}
            opacity={effectiveOpacity}
          />
        </mesh>
        <mesh position={[0, 0, height / 2]}>
          <torusGeometry args={[radius * 0.97, radius * 0.03, 16, 128]} />
          <meshPhysicalMaterial
            color={color}
            metalness={1}
            roughness={0.12}
            clearcoat={0.8}
            transparent={effectiveOpacity < 1}
            opacity={Math.min(1, effectiveOpacity + 0.25)}
          />
        </mesh>
        <mesh position={[0, 0, -height / 2]}>
          <torusGeometry args={[radius * 0.97, radius * 0.024, 16, 128]} />
          <meshPhysicalMaterial
            color={color}
            metalness={1}
            roughness={0.22}
            transparent={effectiveOpacity < 1}
            opacity={Math.min(1, effectiveOpacity + 0.2)}
          />
        </mesh>
      </group>
    )
  }

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, height, 128]} />
      <meshPhysicalMaterial
        color={color}
        metalness={1}
        roughness={0.2}
        clearcoat={0.5}
        clearcoatRoughness={0.2}
        transparent={effectiveOpacity < 1}
        opacity={effectiveOpacity}
      />
    </mesh>
  )
}
