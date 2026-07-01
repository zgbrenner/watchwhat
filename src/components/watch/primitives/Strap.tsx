type StrapProps = {
  width?: number
  length?: number
  thickness?: number
  color?: string
}

export function Strap({ width = 0.18, length = 0.9, thickness = 0.015, color = "#22262b" }: StrapProps) {
  return (
    <mesh>
      <boxGeometry args={[width, thickness, length]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
    </mesh>
  )
}
