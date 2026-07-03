import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

export function CameraRig() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0.15, -1.15, 1.15]} fov={34} />
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={0.65}
        maxDistance={3}
        target={[0, 0, 0.02]}
      />
    </>
  )
}
