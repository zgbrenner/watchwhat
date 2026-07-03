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
    shape.absarc(0, 0, radius, Math.PI * 0.08, Math.PI * 0.92, false)
    shape.lineTo(-innerRadius * 0.85, innerRadius * 0.08)
    shape.absarc(0, 0, innerRadius, Math.PI * 0.96, Math.PI * 0.04, true)
    shape.closePath()
    return shape
  }, [innerRadius, radius])

  return (
    <group>
      <mesh position={[0, 0, -thickness / 2]}>
        <extrudeGeometry args={[rotorShape, { depth: thickness, bevelEnabled: true, bevelSize: 0.003, bevelThickness: 0.003 }]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0, thickness * 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[innerRadius * 1.12, innerRadius * 1.12, thickness * 1.35, 40]} />
        <meshStandardMaterial color="#d7dce0" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, -radius * 0.36, thickness * 0.05]}>
        <boxGeometry args={[radius * 0.58, radius * 0.072, thickness * 1.08]} />
        <meshStandardMaterial color="#8f6f32" metalness={0.85} roughness={0.28} />
      </mesh>
      <mesh position={[0, -radius * 0.18, thickness * 0.05]}>
        <boxGeometry args={[radius * 0.34, radius * 0.032, thickness * 1.1]} />
        <meshStandardMaterial color="#efe0b0" metalness={0.82} roughness={0.2} />
      </mesh>
    </group>
  )
}
