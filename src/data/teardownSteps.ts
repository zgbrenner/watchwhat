import type { MovementType, TeardownStep } from "@/types/watch"
import { partCatalog } from "./partCatalog"

const STEP_INSTRUCTIONS: Record<string, string> = {
  "case-back": "Unscrew or pry off the case back to expose the movement.",
  "case-bezel": "Lift the bezel away from the case middle.",
  "case-middle": "Separate the case middle from the movement and dial.",
  "case-crystal": "Remove the crystal to expose the dial.",
  "strap-lug": "Detach the strap or bracelet from the case lugs.",
  "hand-second": "Lift the second hand from the fourth wheel pipe.",
  "hand-minute": "Lift the minute hand from the center wheel pipe.",
  "hand-hour": "Lift the hour hand from the hour wheel pipe.",
  "dial-face": "Unclip the dial feet and lift the dial away.",
  "crown-stem": "Pull the crown and stem free of the keyless works.",
  "ratchet-wheel": "Unscrew and remove the ratchet wheel.",
  "crown-wheel": "Lift out the crown wheel.",
  "keyless-works": "Disassemble the keyless works (clutch and setting lever).",
  "battery-cell": "Lift the battery from its bracket.",
  "clip-battery": "Unscrew and remove the battery clip.",
  "circuit-ic": "Carefully lift the integrated circuit module free.",
  "crystal-quartz": "Remove the quartz crystal oscillator.",
  "coil-stepper": "Unscrew the stepper coil from the main plate.",
  "stepper-motor": "Lift the stepper motor rotor from its jewel.",
  "wheel-fourth": "Remove the fourth wheel from the train.",
  "wheel-third": "Remove the third wheel from the train.",
  "wheel-center": "Remove the center wheel from the train.",
  mainplate: "Set aside the main plate — the foundation of the movement.",
  "barrel-mainspring": "Lift out the mainspring barrel.",
  mainspring: "Carefully release the mainspring from the barrel.",
  "rotor-automatic": "Unscrew the oscillating weight from the automatic module.",
  "rotor-bearing": "Remove the rotor bearing after the rotor clears the bridge.",
  "automatic-bridge": "Lift the automatic winding bridge to expose the self-winding train.",
  "reverser-wheel": "Remove the reverser wheel from the automatic winding bridge.",
  "winding-wheel": "Lift the automatic winding wheel from the module.",
  "reduction-wheel": "Remove the reduction wheel that steps rotor motion down into winding torque.",
  "bridge-train": "Unscrew the train wheel bridge to free the gear train.",
  "wheel-escape": "Lift the escape wheel from its jewel.",
  "pallet-fork": "Remove the pallet fork from the pallet bridge.",
  "wheel-balance": "Lift the balance wheel assembly free of the balance cock.",
  "spring-hairspring": "Detach the hairspring stud from the balance cock.",
  "jewel-bearing": "Inspect and remove a representative jewel bearing.",
  "screw-movement": "Remove a representative movement screw.",
}

function buildStepsForMovement(movementType: MovementType): TeardownStep[] {
  return partCatalog
    .filter((part) => part.movementTypes.includes(movementType))
    .slice()
    .sort((a, b) => a.disassemblyStep - b.disassemblyStep)
    .map((part) => ({
      step: part.disassemblyStep,
      partId: part.id,
      instruction: STEP_INSTRUCTIONS[part.id] ?? `Remove the ${part.label.toLowerCase()}.`,
      movementTypes: [movementType],
    }))
}

export const teardownSteps: Record<MovementType, TeardownStep[]> = {
  manual: buildStepsForMovement("manual"),
  automatic: buildStepsForMovement("automatic"),
  quartz: buildStepsForMovement("quartz"),
  exterior: buildStepsForMovement("exterior"),
}
