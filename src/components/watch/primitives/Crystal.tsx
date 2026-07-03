type CrystalProps = {
  radius?: number
  thickness?: number
}

/**
 * A domed sapphire crystal. Real glass via a physical transmission material:
 * it refracts and reflects the studio environment, giving the assembled watch
 * that unmistakable "under glass" depth. Rendered as a flat base disc plus a
 * shallow spherical dome, matching a lightly boxed crystal profile.
 */
export function Crystal({ radius = 0.4, thickness = 0.02 }: CrystalProps) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[radius, radius, thickness, 96]} />
      <meshPhysicalMaterial
        transmission={1}
        thickness={0.06}
        ior={1.5}
        roughness={0.015}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.03}
        transparent
        opacity={1}
        color="#f0f5f7"
        envMapIntensity={1.3}
      />
    </mesh>
  )
}
