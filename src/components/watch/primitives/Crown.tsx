type CrownProps = {
  radius?: number
  length?: number
  color?: string
}

export function Crown({ radius = 0.03, length = 0.05, color = "#d6b46b" }: CrownProps) {
  const ridges = 18

  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[radius, radius, length, 32]} />
        <meshStandardMaterial color={color} metalness={0.78} roughness={0.26} />
      </mesh>
      {Array.from({ length: ridges }, (_, index) => {
        const angle = (index / ridges) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <mesh key={index} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <boxGeometry args={[radius * 0.16, length * 1.03, radius * 0.08]} />
            <meshStandardMaterial color="#ead7a1" metalness={0.8} roughness={0.22} />
          </mesh>
        )
      })}
      <mesh position={[0, length * 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.42, radius * 0.42, radius * 0.16, 24]} />
        <meshStandardMaterial color="#f0dca8" metalness={0.82} roughness={0.2} />
      </mesh>
    </group>
  )
}
