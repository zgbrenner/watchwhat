type StrapProps = {
  width?: number
  length?: number
  thickness?: number
  color?: string
}

export function Strap({ width = 0.18, length = 0.9, thickness = 0.015, color = "#22262b" }: StrapProps) {
  return (
    <group>
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[width, length * 0.55, thickness]} />
        <meshStandardMaterial color={color} metalness={0.08} roughness={0.82} />
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <boxGeometry args={[width, length * 0.55, thickness]} />
        <meshStandardMaterial color={color} metalness={0.08} roughness={0.82} />
      </mesh>
      {[-0.05, 0, 0.05].map((x) => (
        <mesh key={x} position={[x, -0.62, thickness / 2 + 0.001]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.002, 16]} />
          <meshStandardMaterial color="#0f1115" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}
