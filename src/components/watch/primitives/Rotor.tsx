import { useMemo } from "react"
import { Shape } from "three"

type RotorProps = {
  radius?: number
  innerRadius?: number
  thickness?: number
  color?: string
}

export function Rotor({
  radius = 0.34,
  innerRadius = 0.08,
  thickness = 0.025,
  color = "#c1a15b",
}: RotorProps) {
  const rotorShape = useMemo(() => {
    const shape = new Shape()
    shape.absarc(0, 0, radius, Math.PI * 0.05, Math.PI * 0.95, false)
    shape.lineTo(-innerRadius, 0)
    shape.absarc(0, 0, innerRadius, Math.PI, 0, true)
    shape.closePath()
    return shape
  }, [innerRadius, radius])

  return (
    <group>
      <mesh position={[0, 0, -thickness / 2]}>
        <extrudeGeometry args={[rotorShape, { depth: thickness, bevelEnabled: false }]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0, thickness * 0.2]}>
        <cylinderGeometry args={[innerRadius * 1.1, innerRadius * 1.1, thickness * 1.35, 40]} />
        <meshStandardMaterial color="#d7dce0" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, -radius * 0.36, thickness * 0.05]}>
        <boxGeometry args={[radius * 0.55, radius * 0.08, thickness * 1.1]} />
        <meshStandardMaterial color="#8f6f32" metalness={0.85} roughness={0.28} />
      </mesh>
    </group>
  )
}
