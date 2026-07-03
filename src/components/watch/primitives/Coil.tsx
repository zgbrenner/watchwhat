type CoilProps = {
  radius?: number
  height?: number
  color?: string
}

/** A squat coil laid flat with z as thickness. */
export function Coil({ radius = 0.03, height = 0.02, color = "#b8843a" }: CoilProps) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, height, 28]} />
        <meshStandardMaterial color={color} metalness={0.45} roughness={0.52} />
      </mesh>
      <mesh>
        <torusGeometry args={[radius * 0.82, radius * 0.08, 8, 40]} />
        <meshStandardMaterial color="#d08a3a" metalness={0.55} roughness={0.38} />
      </mesh>
    </group>
  )
}
