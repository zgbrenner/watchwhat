import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react"
import { useFrame, type ThreeEvent } from "@react-three/fiber"
import { Color, type Group, type Material, type Mesh } from "three"
import { Case } from "@/components/watch/primitives/Case"
import { Coil } from "@/components/watch/primitives/Coil"
import { Crown } from "@/components/watch/primitives/Crown"
import { Crystal } from "@/components/watch/primitives/Crystal"
import { Gear } from "@/components/watch/primitives/Gear"
import { Hand } from "@/components/watch/primitives/Hand"
import { Jewel } from "@/components/watch/primitives/Jewel"
import { Plate } from "@/components/watch/primitives/Plate"
import { Rotor } from "@/components/watch/primitives/Rotor"
import { Screw } from "@/components/watch/primitives/Screw"
import { Spring } from "@/components/watch/primitives/Spring"
import { Strap } from "@/components/watch/primitives/Strap"
import { teardownSteps } from "@/data/teardownSteps"
import { useViewerStore } from "@/store/viewerStore"
import type { PartTransform, Vector3Tuple, WatchPart } from "@/types/watch"
import { easeInOutCubic } from "@/utils/animation"
import { lerpVector3 } from "@/utils/geometry"
import { AnimatedPart } from "./AnimatedPart"
import { PartLabel } from "./PartLabel"

function DialPrimitive() {
  return (
    <group>
      {/* Slightly domed, softly metallic dial face. */}
      <Plate radius={0.38} thickness={0.012} color="#eef1f4" metalness={0.35} roughness={0.5} />
      {/* Recessed minute track ring. */}
      <mesh position={[0, 0, 0.0125]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.345, 0.004, 12, 96]} />
        <meshStandardMaterial color="#b9c0c8" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Applied hour + minute markers. */}
      {Array.from({ length: 60 }, (_, index) => {
        const angle = (index / 60) * Math.PI * 2
        const isHour = index % 5 === 0
        const x = Math.sin(angle) * (isHour ? 0.305 : 0.335)
        const y = Math.cos(angle) * (isHour ? 0.305 : 0.335)
        return (
          <mesh key={index} position={[x, y, 0.016]} rotation={[0, 0, -angle]} castShadow>
            <boxGeometry args={[isHour ? 0.014 : 0.004, isHour ? 0.05 : 0.02, 0.006]} />
            <meshStandardMaterial
              color={isHour ? "#1a1d22" : "#3a4048"}
              metalness={0.7}
              roughness={0.28}
            />
          </mesh>
        )
      })}
      {/* Polished central pinion boss. */}
      <mesh position={[0, 0, 0.016]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.008, 32]} />
        <meshStandardMaterial color="#c9a34d" metalness={0.9} roughness={0.22} />
      </mesh>
    </group>
  )
}

function MainPlatePrimitive() {
  const jewelPositions: Array<[number, number]> = [[-0.25, 0.18], [0, 0], [0.14, -0.08], [0.06, -0.2], [0.2, -0.25], [0.28, 0.19]]
  const screwPositions: Array<[number, number]> = [[-0.31, -0.21], [0.3, -0.18], [-0.08, 0.3]]

  return (
    <group>
      <Plate radius={0.41} thickness={0.028} color="#d8bf77" />
      <mesh position={[0.26, 0.18, 0.018]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.006, 48]} />
        <meshStandardMaterial color="#1d2228" metalness={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[-0.22, 0.18, 0.019]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.006, 40]} />
        <meshStandardMaterial color="#b99d57" metalness={0.42} roughness={0.36} />
      </mesh>
      {jewelPositions.map(([x, y]) => (
        <group key={`jewel-${x}-${y}`} position={[x, y, 0.026]}>
          <Jewel radius={0.012} color="#a51e2d" />
        </group>
      ))}
      {screwPositions.map(([x, y]) => (
        <group key={`screw-${x}-${y}`} position={[x, y, 0.03]}>
          <Screw radius={0.01} length={0.008} />
        </group>
      ))}
    </group>
  )
}

function BridgePrimitive() {
  const jewelPositions: Array<[number, number]> = [[-0.18, 0], [0.02, 0], [0.2, 0]]

  return (
    <group>
      <mesh>
        <boxGeometry args={[0.46, 0.16, 0.022]} />
        <meshStandardMaterial color="#c8a460" metalness={0.62} roughness={0.26} />
      </mesh>
      <mesh position={[-0.2, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.024, 32]} />
        <meshStandardMaterial color="#c8a460" metalness={0.62} roughness={0.26} />
      </mesh>
      <mesh position={[0.22, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.024, 32]} />
        <meshStandardMaterial color="#c8a460" metalness={0.62} roughness={0.26} />
      </mesh>
      {jewelPositions.map(([x, y]) => (
        <group key={`bridge-jewel-${x}-${y}`} position={[x, y, 0.016]}>
          <Jewel radius={0.014} color="#b3122d" />
        </group>
      ))}
      {[-0.29, 0.3].map((x) => (
        <group key={`bridge-screw-${x}`} position={[x, 0.055, 0.016]}>
          <Screw radius={0.008} length={0.007} />
        </group>
      ))}
    </group>
  )
}

function BalanceWheelPrimitive() {
  return (
    <group>
      <mesh>
        <torusGeometry args={[0.075, 0.006, 8, 64]} />
        <meshStandardMaterial color="#d7dce0" metalness={0.85} roughness={0.2} />
      </mesh>
      {Array.from({ length: 3 }, (_, index) => (
        <mesh key={index} rotation={[0, 0, (index / 3) * Math.PI * 2]}>
          <boxGeometry args={[0.15, 0.007, 0.005]} />
          <meshStandardMaterial color="#d7dce0" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}
      <Jewel radius={0.014} color="#b3122d" />
    </group>
  )
}

function PalletForkPrimitive() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.11, 0.018, 0.006]} />
        <meshStandardMaterial color="#aeb7c0" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0.055, 0.025, 0]} rotation={[0, 0, 0.62]}>
        <boxGeometry args={[0.07, 0.014, 0.006]} />
        <meshStandardMaterial color="#aeb7c0" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0.055, -0.025, 0]} rotation={[0, 0, -0.62]}>
        <boxGeometry args={[0.07, 0.014, 0.006]} />
        <meshStandardMaterial color="#aeb7c0" metalness={0.8} roughness={0.25} />
      </mesh>
      <group position={[0.092, 0.034, 0.005]}>
        <Jewel radius={0.008} color="#b3122d" />
      </group>
      <group position={[0.092, -0.034, 0.005]}>
        <Jewel radius={0.008} color="#b3122d" />
      </group>
    </group>
  )
}

function KeylessWorksPrimitive() {
  return (
    <group>
      <mesh rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.16, 0.018, 0.006]} />
        <meshStandardMaterial color="#c9a85d" metalness={0.7} roughness={0.28} />
      </mesh>
      <mesh position={[0.055, 0.035, 0]} rotation={[0, 0, 0.85]}>
        <boxGeometry args={[0.11, 0.014, 0.006]} />
        <meshStandardMaterial color="#b9c1c9" metalness={0.82} roughness={0.22} />
      </mesh>
      <mesh position={[-0.04, -0.035, 0.003]} rotation={[0, 0, -0.45]}>
        <boxGeometry args={[0.1, 0.012, 0.005]} />
        <meshStandardMaterial color="#b9c1c9" metalness={0.82} roughness={0.22} />
      </mesh>
      <Gear radius={0.026} thickness={0.006} teeth={12} color="#d6b46b" />
    </group>
  )
}

function BatteryPrimitive() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.022, 48]} />
        <meshStandardMaterial color="#d8dee4" metalness={0.92} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0, 0.013]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.003, 40]} />
        <meshStandardMaterial color="#a9b2ba" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0, 0.018]}>
        <torusGeometry args={[0.066, 0.0025, 8, 48]} />
        <meshStandardMaterial color="#f6f7f8" metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  )
}

function CircuitPrimitive() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.18, 0.12, 0.008]} />
        <meshStandardMaterial color="#234c3a" metalness={0.18} roughness={0.62} />
      </mesh>
      {[[-0.05, 0.02], [0.02, -0.025], [0.06, 0.03]].map(([x, y]) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.007]}>
          <boxGeometry args={[0.035, 0.02, 0.005]} />
          <meshStandardMaterial color="#101820" metalness={0.25} roughness={0.5} />
        </mesh>
      ))}
      {[-0.07, -0.035, 0, 0.035, 0.07].map((x) => (
        <mesh key={`trace-${x}`} position={[x, 0.058, 0.008]}>
          <boxGeometry args={[0.018, 0.004, 0.002]} />
          <meshStandardMaterial color="#caa64d" metalness={0.75} roughness={0.25} />
        </mesh>
      ))}
    </group>
  )
}

const PART_ID_OVERRIDES: Record<string, (part: WatchPart) => ReactNode> = {
  "case-back": () => <Case radius={0.45} height={0.05} color="#8b959e" />,
  "case-middle": () => <Case radius={0.45} height={0.11} color="#b3bcc4" openEnded />,
  "case-crystal": () => <Crystal radius={0.4} thickness={0.014} />,
  "case-bezel": () => <Case radius={0.47} height={0.03} color="#c6ced5" openEnded />,
  "dial-face": () => <DialPrimitive />,
  mainplate: () => <MainPlatePrimitive />,
  "bridge-train": () => <BridgePrimitive />,
  "rotor-automatic": () => <Rotor />,
  "rotor-bearing": () => <Jewel radius={0.028} color="#d7dce0" />,
  "automatic-bridge": () => <BridgePrimitive />,
  "reverser-wheel": () => <Gear radius={0.055} thickness={0.018} teeth={18} color="#d6b46b" />,
  "winding-wheel": () => <Gear radius={0.046} thickness={0.016} teeth={16} color="#c99b49" />,
  "reduction-wheel": () => <Gear radius={0.038} thickness={0.014} teeth={14} color="#b8843a" />,
  "jewel-bearing": () => <Jewel radius={0.018} />,
  "screw-movement": () => <Screw />,
  "strap-lug": () => <Strap />,
  "crown-stem": () => <Crown radius={0.026} length={0.08} />,
  mainspring: () => <Spring radius={0.082} tubeRadius={0.005} />,
  "barrel-mainspring": () => <Gear radius={0.1} thickness={0.026} teeth={32} color="#b8843a" />,
  "crown-wheel": () => <Gear radius={0.045} thickness={0.012} teeth={18} color="#c99b49" />,
  "ratchet-wheel": () => <Gear radius={0.058} thickness={0.014} teeth={20} color="#d1a955" />,
  "keyless-works": () => <KeylessWorksPrimitive />,
  "wheel-center": () => <Gear radius={0.072} thickness={0.014} teeth={36} color="#d7b65f" />,
  "wheel-third": () => <Gear radius={0.055} thickness={0.012} teeth={30} color="#d3ad57" />,
  "wheel-fourth": () => <Gear radius={0.047} thickness={0.01} teeth={26} color="#cca44f" />,
  "wheel-escape": () => <Gear radius={0.038} thickness={0.008} teeth={15} color="#e0bd66" />,
  "pallet-fork": () => <PalletForkPrimitive />,
  "wheel-balance": () => <BalanceWheelPrimitive />,
  "spring-hairspring": () => <Spring radius={0.052} tubeRadius={0.0018} color="#c4cad0" />,
  "battery-cell": () => <BatteryPrimitive />,
  "clip-battery": () => (
    <mesh>
      <boxGeometry args={[0.15, 0.035, 0.006]} />
      <meshStandardMaterial color="#aeb7c0" metalness={0.82} roughness={0.25} />
    </mesh>
  ),
  "circuit-ic": () => <CircuitPrimitive />,
  "crystal-quartz": () => (
    <mesh>
      <boxGeometry args={[0.12, 0.028, 0.018]} />
      <meshStandardMaterial color="#c8d0d7" metalness={0.86} roughness={0.18} />
    </mesh>
  ),
  "coil-stepper": () => <Coil radius={0.036} height={0.014} />,
  "stepper-motor": () => <Gear radius={0.034} thickness={0.012} teeth={10} color="#aeb7c0" />,
}

function DefaultHand({ part }: { part: WatchPart }) {
  // Angle is intentionally left at 0 here — hand orientation is driven live by
  // AnimatedPart (wall-clock time) so the watch actually tells the time.
  const props: Record<string, { length: number; width: number; color?: string }> = {
    "hand-hour": { length: 0.15, width: 0.02 },
    "hand-minute": { length: 0.24, width: 0.014 },
    "hand-second": { length: 0.28, width: 0.006, color: "#d12b2b" },
  }
  const handProps = props[part.id] ?? { length: 0.2, width: 0.012 }
  return <Hand {...handProps} />
}

const CATEGORY_FALLBACKS: Record<WatchPart["category"], (part: WatchPart) => ReactNode> = {
  case: () => <Case />,
  dial: () => <Plate />,
  movement: () => <Gear />,
  power: () => <Gear color="#b8843a" />,
  regulation: () => <Gear radius={0.06} color="#c4cad0" />,
  display: (part) => <DefaultHand part={part} />,
  strap: () => <Strap />,
  electronics: () => <Coil />,
  setting: () => <Crown />,
}

function renderPrimitive(part: WatchPart) {
  const override = PART_ID_OVERRIDES[part.id]
  if (override) return override(part)
  return CATEGORY_FALLBACKS[part.category](part)
}

type PartMeshProps = {
  part: WatchPart
  transform: PartTransform
}

type EmissiveMaterial = Material & {
  emissive?: Color
  emissiveIntensity?: number
}

type StoredMaterialState = {
  watchwhatOriginalOpacity?: number
  watchwhatOriginalTransparent?: boolean
  watchwhatOriginalDepthWrite?: boolean
  watchwhatOriginalEmissive?: number
  watchwhatOriginalEmissiveIntensity?: number
}

const HIGHLIGHT_COLOR = new Color("#cfa049")

const EXPLODE_DURATION_SECONDS = 0.5
const ZERO_ROTATION: Vector3Tuple = [0, 0, 0]

function scaleToTuple(scale: PartTransform["scale"]): Vector3Tuple {
  if (Array.isArray(scale)) return scale
  const scalar = scale ?? 1
  return [scalar, scalar, scalar]
}

function multiplyScale(scale: Vector3Tuple, multiplier: number): Vector3Tuple {
  return [scale[0] * multiplier, scale[1] * multiplier, scale[2] * multiplier]
}

function applyOpacity(material: Material, opacityMultiplier: number) {
  const userData = material.userData as StoredMaterialState
  userData.watchwhatOriginalOpacity ??= material.opacity
  userData.watchwhatOriginalTransparent ??= material.transparent
  userData.watchwhatOriginalDepthWrite ??= material.depthWrite

  material.opacity = userData.watchwhatOriginalOpacity * opacityMultiplier
  material.transparent = userData.watchwhatOriginalTransparent || opacityMultiplier < 0.99
  material.depthWrite = Boolean(userData.watchwhatOriginalDepthWrite) && opacityMultiplier > 0.6
  material.needsUpdate = true
}

function applyGroupOpacity(group: Group, opacityMultiplier: number) {
  group.traverse((child) => {
    const mesh = child as Mesh
    if (!mesh.material) return
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    materials.forEach((material) => applyOpacity(material, opacityMultiplier))
  })
}

function applyEmissive(material: EmissiveMaterial, intensity: number) {
  if (!material.emissive) return
  const userData = material.userData as StoredMaterialState
  userData.watchwhatOriginalEmissive ??= material.emissive.getHex()
  userData.watchwhatOriginalEmissiveIntensity ??= material.emissiveIntensity ?? 1

  if (intensity > 0) {
    material.emissive.copy(HIGHLIGHT_COLOR)
    material.emissiveIntensity = intensity
  } else {
    material.emissive.setHex(userData.watchwhatOriginalEmissive)
    material.emissiveIntensity = userData.watchwhatOriginalEmissiveIntensity
  }
  material.needsUpdate = true
}

function applyGroupEmissive(group: Group, intensity: number) {
  group.traverse((child) => {
    const mesh = child as Mesh
    if (!mesh.material) return
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    materials.forEach((material) => applyEmissive(material as EmissiveMaterial, intensity))
  })
}

export function PartMesh({ part, transform }: PartMeshProps) {
  const groupRef = useRef<Group>(null)

  const movementType = useViewerStore((state) => state.movementType)
  const viewerMode = useViewerStore((state) => state.viewerMode)
  const teardownStep = useViewerStore((state) => state.teardownStep)
  const selectedPartId = useViewerStore((state) => state.selectedPartId)
  const hoveredPartId = useViewerStore((state) => state.hoveredPartId)
  const isolatedPartId = useViewerStore((state) => state.isolatedPartId)
  const showLabels = useViewerStore((state) => state.showLabels)
  const selectPart = useViewerStore((state) => state.selectPart)
  const hoverPart = useViewerStore((state) => state.hoverPart)

  const currentTeardownStep = teardownSteps[movementType][teardownStep]
  const activeTeardownStepNumber = currentTeardownStep?.step ?? -1
  const isSelected = selectedPartId === part.id
  const isHovered = hoveredPartId === part.id
  const isCurrentTeardownPart = viewerMode === "teardown" && currentTeardownStep?.partId === part.id
  const isFutureTeardownPart = viewerMode === "teardown" && part.disassemblyStep > activeTeardownStepNumber
  const isIsolatedAway = viewerMode === "isolate" && Boolean(isolatedPartId) && isolatedPartId !== part.id
  const isDimmedEnergyPart = viewerMode === "energy" && part.energyFlowOrder === undefined

  const shouldExplode =
    viewerMode === "exploded" ||
    viewerMode === "energy" ||
    (viewerMode === "teardown" && part.disassemblyStep <= activeTeardownStepNumber)

  const opacityMultiplier = isIsolatedAway ? 0.12 : isFutureTeardownPart ? 0.16 : isDimmedEnergyPart ? 0.18 : 1
  const emphasis = isSelected ? 1.08 : isHovered ? 1.04 : isCurrentTeardownPart ? 1.06 : 1
  const highlightIntensity = isSelected ? 0.55 : isCurrentTeardownPart ? 0.45 : isHovered ? 0.28 : 0
  const baseScale = scaleToTuple(transform.scale)
  const visualScale = multiplyScale(baseScale, emphasis)

  const explodedness = useRef(shouldExplode ? 1 : 0)

  useLayoutEffect(() => {
    if (!groupRef.current) return
    const [x, y, z] = explodedness.current === 1 ? transform.explodedPosition : transform.assembledPosition
    const rotation = explodedness.current === 1 ? transform.explodedRotation : transform.assembledRotation
    groupRef.current.position.set(x, y, z)
    groupRef.current.rotation.set(...(rotation ?? ZERO_ROTATION))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!groupRef.current) return
    applyGroupOpacity(groupRef.current, opacityMultiplier)
  }, [opacityMultiplier])

  useEffect(() => {
    if (!groupRef.current) return
    applyGroupEmissive(groupRef.current, highlightIntensity)
  }, [highlightIntensity])

  useFrame((_, delta) => {
    const target = shouldExplode ? 1 : 0
    const current = explodedness.current
    if (current === target) return

    const step = delta / EXPLODE_DURATION_SECONDS
    const next = target > current ? Math.min(target, current + step) : Math.max(target, current - step)
    explodedness.current = next

    if (groupRef.current) {
      const [x, y, z] = lerpVector3(
        transform.assembledPosition,
        transform.explodedPosition,
        easeInOutCubic(next),
      )
      const [rx, ry, rz] = lerpVector3(
        transform.assembledRotation ?? ZERO_ROTATION,
        transform.explodedRotation ?? transform.assembledRotation ?? ZERO_ROTATION,
        easeInOutCubic(next),
      )
      groupRef.current.position.set(x, y, z)
      groupRef.current.rotation.set(rx, ry, rz)
    }
  })

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    document.body.style.cursor = "pointer"
    hoverPart(part.id)
  }

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    document.body.style.cursor = "auto"
    if (hoveredPartId === part.id) hoverPart(null)
  }

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    selectPart(part.id)
  }

  return (
    <group
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <group scale={visualScale}>
        <AnimatedPart partId={part.id}>{renderPrimitive(part)}</AnimatedPart>
      </group>
      {showLabels && (isSelected || isHovered || isCurrentTeardownPart) && (
        <PartLabel label={part.label} highlighted={isSelected || isCurrentTeardownPart} />
      )}
    </group>
  )
}
