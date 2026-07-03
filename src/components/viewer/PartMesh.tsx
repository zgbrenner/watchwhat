import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react"
import { useFrame, type ThreeEvent } from "@react-three/fiber"
import type { Group, Material, Mesh } from "three"
import { Case } from "@/components/watch/primitives/Case"
import { Coil } from "@/components/watch/primitives/Coil"
import { Crown } from "@/components/watch/primitives/Crown"
import { Gear } from "@/components/watch/primitives/Gear"
import { Hand } from "@/components/watch/primitives/Hand"
import { Jewel } from "@/components/watch/primitives/Jewel"
import { Plate } from "@/components/watch/primitives/Plate"
import { Screw } from "@/components/watch/primitives/Screw"
import { Spring } from "@/components/watch/primitives/Spring"
import { Strap } from "@/components/watch/primitives/Strap"
import { teardownSteps } from "@/data/teardownSteps"
import { useViewerStore } from "@/store/viewerStore"
import type { PartTransform, Vector3Tuple, WatchPart } from "@/types/watch"
import { easeInOutCubic } from "@/utils/animation"
import { lerpVector3 } from "@/utils/geometry"
import { PartLabel } from "./PartLabel"

const PART_ID_OVERRIDES: Record<string, (part: WatchPart) => ReactNode> = {
  "case-back": () => <Case radius={0.45} height={0.03} color="#707c87" />,
  "case-middle": () => <Case radius={0.45} height={0.14} color="#9ba5ad" openEnded />,
  "case-crystal": () => <Case radius={0.42} height={0.015} color="#d6e4ea" />,
  "case-bezel": () => <Case radius={0.46} height={0.02} color="#c4cad0" openEnded />,
  "dial-face": () => <Plate radius={0.38} thickness={0.01} color="#f3e9cf" />,
  mainplate: () => <Plate radius={0.4} thickness={0.02} color="#e6d1a1" />,
  "bridge-train": () => <Plate radius={0.22} thickness={0.015} color="#d6b46b" />,
  "jewel-bearing": () => <Jewel />,
  "screw-movement": () => <Screw />,
  "strap-lug": () => <Strap />,
  "crown-stem": () => <Crown />,
  mainspring: () => <Spring radius={0.09} tubeRadius={0.006} />,
  "barrel-mainspring": () => <Gear radius={0.11} thickness={0.03} teeth={0} color="#b8843a" />,
  "spring-hairspring": () => <Spring radius={0.03} tubeRadius={0.0015} color="#c4cad0" />,
  "battery-cell": () => <Coil radius={0.045} height={0.03} color="#c4cad0" />,
  "clip-battery": () => <Coil radius={0.02} height={0.008} color="#9ba5ad" />,
  "circuit-ic": () => <Plate radius={0.06} thickness={0.005} color="#2f6f4f" />,
  "crystal-quartz": () => <Jewel radius={0.012} color="#7dd3fc" />,
  "coil-stepper": () => <Coil radius={0.025} height={0.03} />,
}

function DefaultHand({ part }: { part: WatchPart }) {
  const lengths: Record<string, number> = {
    "hand-hour": 0.16,
    "hand-minute": 0.24,
    "hand-second": 0.26,
  }
  return <Hand length={lengths[part.id] ?? 0.2} />
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

type StoredMaterialState = {
  watchwhatOriginalOpacity?: number
  watchwhatOriginalTransparent?: boolean
  watchwhatOriginalDepthWrite?: boolean
}

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
    viewerMode === "quiz" ||
    (viewerMode === "teardown" && part.disassemblyStep <= activeTeardownStepNumber)

  const opacityMultiplier = isIsolatedAway ? 0.12 : isFutureTeardownPart ? 0.16 : isDimmedEnergyPart ? 0.18 : 1
  const emphasis = isSelected ? 1.16 : isHovered ? 1.08 : isCurrentTeardownPart ? 1.12 : 1
  const baseScale = scaleToTuple(transform.scale)
  const visualScale = multiplyScale(baseScale, emphasis)

  // Tracks animation progress between assembled (0) and exploded (1) purely
  // imperatively — read and written only inside useFrame/effects, never
  // during render, so it can't desync from React's render cycle.
  const explodedness = useRef(shouldExplode ? 1 : 0)

  // Seed the mesh's starting position exactly once. Every subsequent
  // update flows through useFrame below — position must never be a
  // reactive JSX prop, or unrelated re-renders (hover, selection, teardown
  // step...) would snap it back to whatever value was passed that render.
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
      <group scale={visualScale}>{renderPrimitive(part)}</group>
      {showLabels && (isSelected || isHovered || isCurrentTeardownPart) && (
        <PartLabel label={part.label} highlighted={isSelected || isCurrentTeardownPart} />
      )}
    </group>
  )
}