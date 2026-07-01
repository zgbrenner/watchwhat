type HandProps = {
  length?: number
  width?: number
  color?: string
}

export function Hand({ length = 0.25, width = 0.015, color = "#1c1f22" }: HandProps) {
  return (
    <mesh position={[0, 0, length / 2]}>
      <boxGeometry args={[width, 0.004, length]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
    </mesh>
  )
}
