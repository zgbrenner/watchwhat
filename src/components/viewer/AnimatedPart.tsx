import { useRef, type ReactNode } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { useViewerStore } from "@/store/viewerStore"
import { PART_MOTION, handAngle } from "@/utils/watchMotion"

type AnimatedPartProps = {
  partId: string
  children: ReactNode
}

const TAU = Math.PI * 2

/**
 * Wraps a part's geometry in a group that spins, oscillates, swings, or tracks
 * live time while the watch is running. Continuous motions accumulate a phase
 * advanced only while running, so pausing holds the pose and resuming never
 * jumps. Hand parts snap to the wall-clock angle each frame. Parts with no
 * motion spec render their children untouched.
 */
export function AnimatedPart({ partId, children }: AnimatedPartProps) {
  const groupRef = useRef<Group>(null)
  const phase = useRef(0)
  const spec = PART_MOTION[partId]
  const isRunning = useViewerStore((state) => state.isRunning)
  const movementType = useViewerStore((state) => state.movementType)

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group || !spec) return

    if (spec.kind === "hand") {
      if (!isRunning) return
      group.rotation.z = handAngle(spec.unit, new Date(), movementType)
      return
    }

    if (!isRunning) return
    phase.current += delta

    if (spec.kind === "spin") {
      group.rotation.z = phase.current * spec.speed
    } else if (spec.kind === "oscillate" || spec.kind === "swing") {
      group.rotation.z = Math.sin(phase.current * spec.freq * TAU) * spec.amplitude
    }
  })

  if (!spec) return <>{children}</>
  return <group ref={groupRef}>{children}</group>
}
