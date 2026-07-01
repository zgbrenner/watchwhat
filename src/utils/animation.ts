/**
 * Standard ease-in-out curve for explode/assemble and camera transitions.
 */
export function easeInOutCubic(t: number): number {
  const clamped = Math.min(1, Math.max(0, t))
  return clamped < 0.5 ? 4 * clamped ** 3 : 1 - (-2 * clamped + 2) ** 3 / 2
}

/**
 * Drives a 0→1 progress value forward at a fixed duration, intended to be
 * called once per animation frame with the frame's delta time.
 */
export function advanceProgress(current: number, deltaSeconds: number, durationSeconds: number): number {
  if (durationSeconds <= 0) return 1
  return Math.min(1, current + deltaSeconds / durationSeconds)
}
