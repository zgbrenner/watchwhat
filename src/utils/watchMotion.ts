import type { MovementType } from "@/types/watch"

const TAU = Math.PI * 2

/**
 * How a given part moves when the watch is "running". Speeds are illustrative,
 * not geared to real ratios — the goal is to convey the role of each part
 * (a going train turning, a balance oscillating, a rotor swinging) rather than
 * to simulate exact horology. Rotation is always about the local z axis, which
 * is the face-normal in this scene.
 */
export type MotionSpec =
  | { kind: "spin"; speed: number }
  | { kind: "oscillate"; amplitude: number; freq: number }
  | { kind: "swing"; amplitude: number; freq: number }
  | { kind: "hand"; unit: "hour" | "minute" | "second" }

export const PART_MOTION: Record<string, MotionSpec> = {
  // Live time.
  "hand-hour": { kind: "hand", unit: "hour" },
  "hand-minute": { kind: "hand", unit: "minute" },
  "hand-second": { kind: "hand", unit: "second" },

  // Going train + winding (manual / automatic). Faster the closer to the
  // escapement, alternating direction like real meshed wheels.
  "barrel-mainspring": { kind: "spin", speed: 0.12 },
  mainspring: { kind: "spin", speed: 0.12 },
  "ratchet-wheel": { kind: "spin", speed: 0.12 },
  "crown-wheel": { kind: "spin", speed: -0.16 },
  "wheel-center": { kind: "spin", speed: 0.2 },
  "wheel-third": { kind: "spin", speed: -0.36 },
  "wheel-fourth": { kind: "spin", speed: 0.62 },
  "wheel-escape": { kind: "spin", speed: -1.1 },

  // Regulating organ — the visible heartbeat.
  "wheel-balance": { kind: "oscillate", amplitude: 0.55, freq: 2.4 },
  "spring-hairspring": { kind: "oscillate", amplitude: 0.32, freq: 2.4 },
  "pallet-fork": { kind: "oscillate", amplitude: 0.18, freq: 2.4 },

  // Automatic winding module.
  "rotor-automatic": { kind: "swing", amplitude: 0.6, freq: 0.32 },
  "reverser-wheel": { kind: "spin", speed: 0.3 },
  "winding-wheel": { kind: "spin", speed: -0.24 },
  "reduction-wheel": { kind: "spin", speed: 0.2 },

  // Quartz drive.
  "stepper-motor": { kind: "spin", speed: 0.5 },
}

/**
 * Absolute z rotation (radians) for a hand at a given moment. +y is 12 o'clock
 * and clockwise is negative z, so a hand pointing to 3 o'clock is -π/2.
 * Mechanical second hands sweep smoothly; quartz second hands tick per second.
 */
export function handAngle(
  unit: "hour" | "minute" | "second",
  date: Date,
  movementType: MovementType,
): number {
  const ms = date.getMilliseconds()
  const s = date.getSeconds()
  const m = date.getMinutes()
  const h = date.getHours() % 12

  if (unit === "second") {
    const smooth = movementType !== "quartz"
    const sec = smooth ? s + ms / 1000 : s
    return -(sec / 60) * TAU
  }
  if (unit === "minute") {
    return -((m + s / 60) / 60) * TAU
  }
  return -((h + m / 60) / 12) * TAU
}
