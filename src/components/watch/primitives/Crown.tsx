type CrownProps = {
  radius?: number
  length?: number
  color?: string
}

export function Crown({ radius = 0.03, length = 0.05, color = "#d6b46b" }: CrownProps) {
  return (
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[radius, radius, length, 12]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
    </mesh>
  )
}
