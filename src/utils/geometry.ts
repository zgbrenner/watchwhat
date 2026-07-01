import type { Vector3Tuple } from "@/types/watch"

/**
 * Per-axis multipliers used to push assembled part positions outward into
 * their exploded-view positions. The thickness axis (z) explodes further
 * than the lateral axes so the watch "opens up" toward the viewer rather
 * than just puffing out sideways.
 */
export const DEFAULT_EXPLODE_FACTORS: Vector3Tuple = [2.2, 2.2, 3.2]

/**
 * Scales an assembled position outward from the origin to produce a
 * placeholder exploded-view position. This is a simple radial scale, not a
 * physically simulated explosion — good enough for procedural placeholder
 * geometry, and safe to keep once real assets replace the primitives since
 * it only depends on each part's assembled coordinates.
 */
export function explodePosition(
  assembled: Vector3Tuple,
  factors: Vector3Tuple = DEFAULT_EXPLODE_FACTORS,
): Vector3Tuple {
  const [x, y, z] = assembled
  const [fx, fy, fz] = factors
  return [x * fx, y * fy, z * fz]
}

/**
 * Linearly interpolates between two 3D points. Used to animate parts
 * smoothly between their assembled and exploded positions.
 */
export function lerpVector3(from: Vector3Tuple, to: Vector3Tuple, t: number): Vector3Tuple {
  const clamped = Math.min(1, Math.max(0, t))
  return [
    from[0] + (to[0] - from[0]) * clamped,
    from[1] + (to[1] - from[1]) * clamped,
    from[2] + (to[2] - from[2]) * clamped,
  ]
}
