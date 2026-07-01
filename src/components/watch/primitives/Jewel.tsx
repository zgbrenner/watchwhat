type JewelProps = {
  radius?: number
  color?: string
}

export function Jewel({ radius = 0.015, color = "#c0392b" }: JewelProps) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.05} />
    </mesh>
  )
}
