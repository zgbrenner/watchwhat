import type { GlossaryEntry } from "@/types/watch"

export const glossary: GlossaryEntry[] = [
  {
    term: "Amplitude",
    definition:
      "The angular distance a balance wheel swings from its resting position during each oscillation, used to judge a movement's health.",
    relatedPartIds: ["wheel-balance"],
  },
  {
    term: "Beat Rate",
    definition:
      "The frequency at which a balance wheel oscillates, usually measured in beats per hour (e.g. 28,800 bph).",
    relatedPartIds: ["wheel-balance", "spring-hairspring"],
  },
  {
    term: "Escapement",
    definition:
      "The mechanism — pallet fork and escape wheel — that releases the gear train's energy in small, regular impulses.",
    relatedPartIds: ["wheel-escape", "pallet-fork"],
  },
  {
    term: "Gear Train",
    definition:
      "The series of wheels and pinions that transmits energy from the power source to the escapement, increasing speed at each stage.",
    relatedPartIds: ["wheel-center", "wheel-third", "wheel-fourth"],
  },
  {
    term: "Jewel",
    definition:
      "A synthetic ruby or sapphire bearing that reduces friction and wear at fast-moving pivot points.",
    relatedPartIds: ["jewel-bearing"],
  },
  {
    term: "Keyless Works",
    definition:
      "The gear cluster behind the crown that switches between winding the mainspring and setting the hands.",
    relatedPartIds: ["keyless-works", "crown-stem"],
  },
  {
    term: "Motion Works",
    definition:
      "The set of gears beneath the dial that keeps the hour and minute hands turning in the correct 12-to-1 ratio.",
    relatedPartIds: ["hand-hour", "hand-minute"],
  },
  {
    term: "Piezoelectric Effect",
    definition:
      "The property of quartz crystal that makes it vibrate at a precise frequency when an electric current is applied.",
    relatedPartIds: ["crystal-quartz"],
  },
  {
    term: "Power Reserve",
    definition:
      "The length of time a fully wound mainspring can keep a mechanical watch running before it needs winding again.",
    relatedPartIds: ["mainspring", "barrel-mainspring"],
  },
  {
    term: "Rotor",
    definition:
      "The semicircular oscillating weight in an automatic movement that winds the mainspring using wrist motion.",
    relatedPartIds: ["rotor-automatic"],
  },
  {
    term: "Stepper Motor",
    definition:
      "A small electromagnetic motor that converts electrical pulses from a quartz circuit into precise, stepped rotation.",
    relatedPartIds: ["stepper-motor", "coil-stepper"],
  },
  {
    term: "Water Resistance",
    definition:
      "A case's ability to resist water ingress, achieved through gaskets at the case back, crown, and crystal.",
    relatedPartIds: ["case-back", "case-crystal", "crown-stem"],
  },
]
