type ScrewProps = {
  radius?: number
  length?: number
  color?: string
}

export function Screw({ radius = 0.012, length = 0.02, color = "#9ba5ad" }: ScrewProps) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, length, 20]} />
        <meshStandardMaterial color={color} metalness={0.86} roughness={0.24} />
      </mesh>
      <mesh position={[0, 0, length / 2 + 0.001]}>
        <boxGeometry args={[radius * 1.7, radius * 0.26, radius * 0.14]} />
        <meshStandardMaterial color="#59616b" metalness={0.72} roughness={0.34} />
      </mesh>
    </group>
  )
}
