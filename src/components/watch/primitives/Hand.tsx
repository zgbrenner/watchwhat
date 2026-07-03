type HandProps = {
  length?: number
  width?: number
  color?: string
  angle?: number
}

export function Hand({ length = 0.25, width = 0.015, color = "#1c1f22", angle = 0 }: HandProps) {
  return (
    <group rotation={[0, 0, angle]}>
      <mesh position={[0, length / 2, 0]}>
        <boxGeometry args={[width, length, 0.004]} />
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.34} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[width * 1.6, width * 1.6, 0.006, 24]} />
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.34} />
      </mesh>
    </group>
  )
}
