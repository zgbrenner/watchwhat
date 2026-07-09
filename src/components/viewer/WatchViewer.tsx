import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { ContactShadows } from "@react-three/drei"
import { ACESFilmicToneMapping } from "three"
import { MechanicalAutomaticModel } from "@/components/watch/MechanicalAutomaticModel"
import { MechanicalManualModel } from "@/components/watch/MechanicalManualModel"
import { QuartzModel } from "@/components/watch/QuartzModel"
import { ExteriorModel } from "@/components/watch/ExteriorModel"
import { useViewerStore } from "@/store/viewerStore"
import { CameraRig } from "./CameraRig"
import { EnergyFlowOverlay } from "./EnergyFlowOverlay"
import { PostFX } from "./PostFX"
import { SceneLights } from "./SceneLights"
import { StudioEnvironment } from "./StudioEnvironment"
import { TeardownControls } from "./TeardownControls"
import { ViewerToolbar } from "./ViewerToolbar"
import { ViewerHint } from "./ViewerHint"

function ActiveWatchModel() {
  const movementType = useViewerStore((state) => state.movementType)

  switch (movementType) {
    case "manual":
      return <MechanicalManualModel />
    case "automatic":
      return <MechanicalAutomaticModel />
    case "quartz":
      return <QuartzModel />
    case "exterior":
      return <ExteriorModel />
    default:
      return null
  }
}

export function WatchViewer() {
  const deselect = useViewerStore((state) => state.selectPart)

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = ACESFilmicToneMapping
          gl.toneMappingExposure = 1.05
        }}
        onPointerMissed={() => deselect(null)}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <SceneLights />
          <StudioEnvironment />
          <group position={[0, 0.02, 0]}>
            <ActiveWatchModel />
          </group>
          <ContactShadows
            position={[0, -0.42, 0]}
            scale={2.6}
            resolution={1024}
            blur={2.6}
            opacity={0.55}
            far={1.2}
            color="#000000"
          />
          <PostFX />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0">
        <ViewerToolbar />
        <TeardownControls />
        <EnergyFlowOverlay />
        <ViewerHint />
      </div>
    </div>
  )
}
