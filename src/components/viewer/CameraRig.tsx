import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

export function CameraRig() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0.9, 0.7, 1.4]} fov={40} />
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={0.6}
        maxDistance={3}
        target={[0, 0, 0]}
      />
    </>
  )
}
