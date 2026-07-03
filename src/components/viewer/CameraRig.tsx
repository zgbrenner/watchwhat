import { useEffect, useRef } from "react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3 } from "three"
import { useViewerStore } from "@/store/viewerStore"
import type { ViewerMode } from "@/types/watch"

/** How far the camera should sit from the watch in each mode. */
const MODE_DISTANCE: Record<ViewerMode, number> = {
  assembled: 2.15,
  isolate: 1.9,
  exploded: 3.35,
  teardown: 3.05,
  energy: 3.2,
}

/*
 * The direction the camera should look from in each working mode, as a unit
 * offset from the watch. The exploded and teardown views swing to an oblique
 * three-quarter angle so the depth-separated part layers fan out into a
 * readable diagonal ladder instead of stacking concentrically. Assembled and
 * isolate keep whatever angle the user last set (only the distance eases).
 */
const MODE_DIRECTION: Partial<Record<ViewerMode, Vector3>> = {
  exploded: new Vector3(0.62, 0.5, 0.6).normalize(),
  teardown: new Vector3(0.55, 0.55, 0.63).normalize(),
  energy: new Vector3(0.28, 0.42, 0.86).normalize(),
}

/**
 * Eases the camera to a comfortable framing whenever the view mode changes,
 * then hands control back so manual orbit/zoom keep working. It only animates
 * on a mode change, never fighting the user between changes.
 */
function CameraDolly() {
  const controls = useThree((state) => state.controls) as
    | { target: Vector3; update: () => void }
    | null
  const camera = useThree((state) => state.camera)
  const viewerMode = useViewerStore((state) => state.viewerMode)

  const animating = useRef(false)
  const targetOffset = useRef(new Vector3())
  const scratch = useRef(new Vector3())

  useEffect(() => {
    if (!controls) return
    const radius = MODE_DISTANCE[viewerMode]
    const dir = MODE_DIRECTION[viewerMode]
    if (dir) {
      targetOffset.current.copy(dir).multiplyScalar(radius)
    } else {
      // Keep the current viewing direction; only change the distance.
      const current = scratch.current.copy(camera.position).sub(controls.target)
      if (current.lengthSq() < 1e-6) current.set(0.15, 0.4, 0.9)
      targetOffset.current.copy(current).setLength(radius)
    }
    animating.current = true
  }, [viewerMode, controls, camera])

  useFrame(() => {
    if (!animating.current || !controls) return
    const offset = scratch.current.copy(camera.position).sub(controls.target)
    offset.lerp(targetOffset.current, 0.09)
    if (offset.distanceTo(targetOffset.current) < 0.01) {
      offset.copy(targetOffset.current)
      animating.current = false
    }
    camera.position.copy(controls.target).add(offset)
  })

  return null
}

/**
 * A framed hero camera with damped orbit controls. The view gently
 * auto-rotates while the watch sits assembled and untouched, then holds still
 * the moment the user starts inspecting parts or switches to a working mode.
 */
export function CameraRig() {
  const viewerMode = useViewerStore((state) => state.viewerMode)
  const selectedPartId = useViewerStore((state) => state.selectedPartId)

  const idle = viewerMode === "assembled" && selectedPartId === null

  return (
    <>
      <PerspectiveCamera makeDefault position={[0.35, 0.95, 2.15]} fov={30} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={0.7}
        maxDistance={4.2}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI - 0.15}
        autoRotate={idle}
        autoRotateSpeed={0.55}
        target={[0, 0, 0]}
      />
      <CameraDolly />
    </>
  )
}
