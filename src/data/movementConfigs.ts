import type { MovementConfig, MovementType, PartTransform, Vector3Tuple } from "@/types/watch"
import { partCatalog } from "./partCatalog"

type LayoutEntry = {
  position: Vector3Tuple
  explodedPosition?: Vector3Tuple
  rotation?: Vector3Tuple
  explodedRotation?: Vector3Tuple
  scale?: Vector3Tuple | number
}

/**
 * Unitless, face-on watch layout. x/y are the watch face plane and z is the
 * thickness axis. The first pass accidentally treated many round primitives
 * as if their height axis were z while Three.js cylinders default to y; the
 * primitives now match this table.
 */
const PART_LAYOUT: Record<string, LayoutEntry> = {
  "case-back": {
    position: [0, 0, -0.34],
    explodedPosition: [0, 0, -1.0],
    scale: 1.08,
  },
  "rotor-automatic": {
    position: [0, 0, -0.28],
    explodedPosition: [0, 0, -0.82],
    rotation: [0, 0, -0.35],
    explodedRotation: [0, 0, -1.1],
    scale: 1.08,
  },
  "rotor-bearing": {
    position: [0, 0, -0.255],
    explodedPosition: [0.2, -0.12, -0.74],
    scale: 0.85,
  },
  "automatic-bridge": {
    position: [0, -0.05, -0.235],
    explodedPosition: [-0.22, -0.18, -0.68],
    scale: [1.05, 0.64, 1],
  },
  "reverser-wheel": {
    position: [-0.2, -0.17, -0.215],
    explodedPosition: [-0.48, -0.38, -0.58],
    scale: 0.95,
  },
  "winding-wheel": {
    position: [-0.02, -0.2, -0.21],
    explodedPosition: [-0.04, -0.5, -0.55],
    scale: 0.85,
  },
  "reduction-wheel": {
    position: [0.15, -0.16, -0.205],
    explodedPosition: [0.38, -0.42, -0.52],
    scale: 0.78,
  },

  "case-middle": {
    position: [0, 0, -0.05],
    explodedPosition: [0, 0, -0.08],
    scale: 1.06,
  },
  "strap-lug": {
    position: [0, 0, -0.08],
    explodedPosition: [0, 0, -0.18],
    scale: 1.05,
  },
  "case-bezel": {
    position: [0, 0, 0.22],
    explodedPosition: [0, 0, 0.74],
    scale: 1.04,
  },
  "case-crystal": {
    position: [0, 0, 0.25],
    explodedPosition: [0, 0, 0.9],
    scale: 1.02,
  },
  "dial-face": {
    position: [0, 0, 0.12],
    explodedPosition: [0, 0, 0.58],
  },
  "hand-hour": {
    position: [0, 0, 0.155],
    explodedPosition: [-0.12, 0.1, 0.84],
    rotation: [0, 0, -0.72],
    explodedRotation: [0, 0, -0.72],
  },
  "hand-minute": {
    position: [0, 0, 0.17],
    explodedPosition: [0.08, 0.18, 0.9],
    rotation: [0, 0, 0.52],
    explodedRotation: [0, 0, 0.52],
  },
  "hand-second": {
    position: [0, 0, 0.185],
    explodedPosition: [0.16, -0.05, 0.96],
    rotation: [0, 0, 1.9],
    explodedRotation: [0, 0, 1.9],
  },
  "crown-stem": {
    position: [0.55, 0, 0.02],
    explodedPosition: [0.86, 0, 0.12],
    rotation: [0, 0, 0],
  },

  mainplate: {
    position: [0, 0, -0.08],
    explodedPosition: [0, 0, -0.36],
    scale: 1.05,
  },
  "barrel-mainspring": {
    position: [-0.23, 0.18, -0.035],
    explodedPosition: [-0.62, 0.44, -0.1],
    scale: 1.15,
  },
  mainspring: {
    position: [-0.23, 0.18, -0.012],
    explodedPosition: [-0.72, 0.52, 0.04],
    scale: 1.02,
  },
  "crown-wheel": {
    position: [0.3, -0.06, -0.035],
    explodedPosition: [0.64, -0.2, -0.1],
    scale: 0.82,
  },
  "ratchet-wheel": {
    position: [0.18, -0.12, -0.03],
    explodedPosition: [0.42, -0.38, -0.06],
    scale: 0.92,
  },
  "keyless-works": {
    position: [0.36, 0.02, -0.01],
    explodedPosition: [0.78, 0.12, 0.02],
    scale: 0.95,
  },
  "wheel-center": {
    position: [0, 0, -0.02],
    explodedPosition: [0, -0.52, 0.0],
    scale: 1.05,
  },
  "wheel-third": {
    position: [0.13, -0.06, -0.015],
    explodedPosition: [0.42, -0.34, 0.04],
    scale: 0.92,
  },
  "wheel-fourth": {
    position: [0.05, -0.2, -0.01],
    explodedPosition: [0.1, -0.62, 0.08],
    scale: 0.86,
  },
  "wheel-escape": {
    position: [0.2, -0.25, 0.0],
    explodedPosition: [0.48, -0.64, 0.14],
    scale: 0.78,
  },
  "pallet-fork": {
    position: [0.3, -0.18, 0.015],
    explodedPosition: [0.72, -0.48, 0.22],
    rotation: [0, 0, 0.25],
    scale: 0.95,
  },
  "wheel-balance": {
    position: [0.28, 0.19, 0.012],
    explodedPosition: [0.68, 0.48, 0.18],
    scale: 1.12,
  },
  "spring-hairspring": {
    position: [0.28, 0.19, 0.032],
    explodedPosition: [0.76, 0.54, 0.28],
    scale: 1.02,
  },
  "bridge-train": {
    position: [0.03, -0.08, 0.035],
    explodedPosition: [0.0, -0.48, 0.34],
    rotation: [0, 0, -0.18],
    scale: [1.12, 0.62, 1],
  },
  "jewel-bearing": {
    position: [0.12, -0.08, 0.06],
    explodedPosition: [0.34, -0.22, 0.42],
    scale: 0.9,
  },
  "screw-movement": {
    position: [-0.12, -0.24, 0.065],
    explodedPosition: [-0.34, -0.56, 0.42],
    scale: 1.0,
  },

  "battery-cell": {
    position: [-0.24, -0.16, -0.01],
    explodedPosition: [-0.62, -0.38, 0.14],
    scale: 1.18,
  },
  "clip-battery": {
    position: [-0.24, -0.06, 0.02],
    explodedPosition: [-0.58, -0.12, 0.3],
    scale: [1.1, 0.58, 1],
  },
  "circuit-ic": {
    position: [0.04, -0.2, 0.0],
    explodedPosition: [0.08, -0.58, 0.18],
    scale: [1.28, 0.8, 1],
  },
  "crystal-quartz": {
    position: [0.24, -0.08, 0.015],
    explodedPosition: [0.58, -0.2, 0.3],
    scale: 1.1,
  },
  "coil-stepper": {
    position: [0.18, 0.16, 0.015],
    explodedPosition: [0.48, 0.42, 0.28],
    scale: 1.2,
  },
  "stepper-motor": {
    position: [0.05, 0.16, 0.02],
    explodedPosition: [0.1, 0.48, 0.34],
    scale: 0.95,
  },
}

function buildTransform(partId: string): PartTransform {
  const layout = PART_LAYOUT[partId]
  if (!layout) {
    throw new Error(`Missing PART_LAYOUT entry for part "${partId}"`)
  }
  return {
    partId,
    assembledPosition: layout.position,
    explodedPosition: layout.explodedPosition ?? layout.position,
    assembledRotation: layout.rotation,
    explodedRotation: layout.explodedRotation ?? layout.rotation,
    scale: layout.scale,
  }
}

function buildConfig(
  id: MovementType,
  label: string,
  tagline: string,
  description: string,
): MovementConfig {
  const parts = partCatalog.filter((part) => part.movementTypes.includes(id))
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
