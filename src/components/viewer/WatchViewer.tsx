import { Canvas } from "@react-three/fiber"
import { MechanicalAutomaticModel } from "@/components/watch/MechanicalAutomaticModel"
import { MechanicalManualModel } from "@/components/watch/MechanicalManualModel"
import { QuartzModel } from "@/components/watch/QuartzModel"
import { ExteriorModel } from "@/components/watch/ExteriorModel"
import { useViewerStore } from "@/store/viewerStore"
import { CameraRig } from "./CameraRig"
import { EnergyFlowOverlay } from "./EnergyFlowOverlay"
import { SceneLights } from "./SceneLights"
import { TeardownControls } from "./TeardownControls"
import { ViewerToolbar } from "./ViewerToolbar"

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
  return (
    <div className="relative h-full w-full">
      <Canvas shadows dpr={[1, 2]}>
        <SceneLights />
        <CameraRig />
        <ActiveWatchModel />
      </Canvas>
      <div className="pointer-events-none absolute inset-0">
        <ViewerToolbar />
        <TeardownControls />
        <EnergyFlowOverlay />
      </div>
    </div>
  )
}
