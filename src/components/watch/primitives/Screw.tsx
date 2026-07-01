type ScrewProps = {
  radius?: number
  length?: number
  color?: string
}

export function Screw({ radius = 0.012, length = 0.02, color = "#9ba5ad" }: ScrewProps) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[radius, radius, length, 12]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, length / 2, 0]}>
        <boxGeometry args={[radius * 1.6, radius * 0.3, radius * 0.3]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
}
