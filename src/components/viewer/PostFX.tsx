import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing"

/**
 * A restrained cinematic pass. Bloom only lifts genuinely bright specular hits
 * — the ruby jewels, polished bevels, and crystal glints — thanks to a high
 * luminance threshold, and a soft vignette focuses the eye on the watch. Kept
 * deliberately subtle so the render stays crisp rather than hazy.
 */
export function PostFX() {
  return (
    <EffectComposer multisampling={4} enableNormalPass={false}>
      <Bloom
        intensity={0.17}
        luminanceThreshold={0.99}
        luminanceSmoothing={0.05}
        mipmapBlur
        radius={0.35}
      />
      <Vignette eskil={false} offset={0.35} darkness={0.5} />
    </EffectComposer>
  )
}
