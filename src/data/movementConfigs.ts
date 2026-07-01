import type { MovementConfig, MovementType, PartTransform, Vector3Tuple } from "@/types/watch"
import { explodePosition } from "@/utils/geometry"
import { watchParts } from "./watchParts"

type LayoutEntry = {
  position: Vector3Tuple
  rotation?: Vector3Tuple
  scale?: Vector3Tuple | number
}

/**
 * Assembled-position lookup for every part ID. Positions are expressed in
 * a small, unitless watch-diameter scale (roughly -1 to 1 on each axis)
 * with z as the case-thickness axis (negative = case-back side, positive =
 * crystal side). These are placeholder coordinates for procedural
 * geometry — real GLB assets can override them per part without touching
 * any component code, since everything reads from this single table.
 */
const PART_LAYOUT: Record<string, LayoutEntry> = {
  "case-back": { position: [0, 0, -0.55] },
  "rotor-automatic": { position: [0, 0, -0.42] },
  "bridge-train": { position: [0, 0, -0.3] },
  "wheel-balance": { position: [0.32, 0.2, -0.28] },
  "spring-hairspring": { position: [0.32, 0.2, -0.26] },
  "pallet-fork": { position: [0.16, 0.14, -0.27] },
  "wheel-escape": { position: [0.05, 0.1, -0.27] },
  "wheel-fourth": { position: [0, 0, -0.25] },
  "wheel-third": { position: [-0.06, 0, -0.22] },
  "wheel-center": { position: [-0.1, 0, -0.19] },
  mainplate: { position: [0, 0, -0.15] },
  "barrel-mainspring": { position: [-0.26, 0.16, -0.15] },
  mainspring: { position: [-0.26, 0.16, -0.15], scale: 0.9 },
  "crown-wheel": { position: [0.3, -0.2, -0.1] },
  "ratchet-wheel": { position: [0.3, -0.15, -0.1] },
  "keyless-works": { position: [0.36, -0.1, -0.05] },
  "jewel-bearing": { position: [0.02, -0.05, -0.15] },
  "screw-movement": { position: [0.2, 0.2, -0.05] },
  "dial-face": { position: [0, 0, 0.05] },
  "hand-hour": { position: [0, 0, 0.1] },
  "hand-minute": { position: [0, 0, 0.12] },
  "hand-second": { position: [0, 0, 0.14] },
  "case-crystal": { position: [0, 0, 0.2] },
  "case-bezel": { position: [0, 0, 0.22] },
  "case-middle": { position: [0, 0, 0] },
  "crown-stem": { position: [0.6, 0, -0.05] },
  "strap-lug": { position: [0, 0, -0.05] },
  "battery-cell": { position: [-0.3, -0.2, -0.15] },
  "clip-battery": { position: [-0.3, -0.15, -0.15] },
  "circuit-ic": { position: [0, -0.25, -0.1] },
  "crystal-quartz": { position: [0.25, -0.25, -0.1] },
  "coil-stepper": { position: [0.15, 0.15, -0.1] },
  "stepper-motor": { position: [0.1, 0.1, -0.08] },
}

function buildTransform(partId: string): PartTransform {
  const layout = PART_LAYOUT[partId]
  if (!layout) {
    throw new Error(`Missing PART_LAYOUT entry for part "${partId}"`)
  }
  return {
    partId,
    assembledPosition: layout.position,
    explodedPosition: explodePosition(layout.position),
    assembledRotation: layout.rotation,
    explodedRotation: layout.rotation,
    scale: layout.scale,
  }
}

function buildConfig(
  id: MovementType,
  label: string,
  tagline: string,
  description: string,
): MovementConfig {
  const parts = watchParts.filter((part) => part.movementTypes.includes(id))
  const partIds = parts.map((part) => part.id)
  return {
    id,
    label,
    tagline,
    description,
    partIds,
    transforms: partIds.map(buildTransform),
  }
}

export const movementConfigs: Record<MovementType, MovementConfig> = {
  manual: buildConfig(
    "manual",
    "Manual Wind",
    "The purest mechanical movement — powered entirely by hand.",
    "A manual (hand-wound) movement stores energy in a mainspring that the wearer winds through the crown. From there a gear train, escapement, and balance wheel work together to release that energy at a steady, precise rate.",
  ),
  automatic: buildConfig(
    "automatic",
    "Automatic",
    "A mechanical movement that winds itself from your wrist's motion.",
    "An automatic (self-winding) movement adds an oscillating rotor to a manual movement's gear train. Ordinary wrist motion swings the rotor, which winds the mainspring so the watch rarely needs manual winding.",
  ),
  quartz: buildConfig(
    "quartz",
    "Quartz",
    "An electronic movement timed by a vibrating quartz crystal.",
    "A quartz movement replaces the mainspring and escapement with a battery, a quartz crystal oscillator, and an integrated circuit. The circuit counts the crystal's precise vibrations and pulses a tiny stepper motor once per second to move the hands.",
  ),
  exterior: buildConfig(
    "exterior",
    "Exterior",
    "The case, dial, and strap that every watch shares.",
    "Regardless of what powers a watch, its exterior — case, crystal, dial, hands, and strap — is what the wearer sees and touches every day.",
  ),
}
