import type { WatchPart } from "@/types/watch"

export const automaticParts: WatchPart[] = [
  {
    id: "rotor-bearing",
    label: "Rotor Bearing",
    category: "movement",
    movementTypes: ["automatic"],
    shortDefinition: "The central bearing that lets the rotor swing freely.",
    function: "Supports the automatic rotor while allowing it to spin with low friction as the wrist moves.",
    howItWorks:
      "The rotor pivots around this bearing. A low-friction race or jeweled bearing carries the rotor's weight while letting its off-center mass swing around the movement.",
    connectsTo: ["rotor-automatic", "automatic-bridge"],
    failureMode: "A worn rotor bearing can make the rotor wobble, scrape the case back, or wind inefficiently.",
    disassemblyStep: 15.5,
    energyFlowOrder: 1,
    quizPrompt: "What part lets the automatic rotor spin around the center of the movement?",
  },
  {
    id: "automatic-bridge",
    label: "Automatic Winding Bridge",
    category: "movement",
    movementTypes: ["automatic"],
    shortDefinition: "The bridge that holds the self-winding module above the movement.",
    function: "Carries the rotor bearing and the automatic winding wheels that transfer wrist motion into mainspring winding.",
    howItWorks:
      "The bridge sits over the train side of the movement. It positions the rotor and winding wheels so the rotor can feed motion into the ratchet and barrel system underneath.",
    connectsTo: ["rotor-bearing", "reverser-wheel", "winding-wheel", "mainplate"],
    disassemblyStep: 16,
    quizPrompt: "Which bridge carries the automatic winding system above the base movement?",
  },
  {
    id: "reverser-wheel",
    label: "Reverser Wheel",
    category: "power",
    movementTypes: ["automatic"],
    shortDefinition: "A wheel that helps turn rotor motion into useful winding motion.",
    function: "Routes rotor movement into the winding train, often allowing winding from rotor movement in either direction.",
    howItWorks:
      "Small internal clutches or angled teeth engage when the rotor turns one way and slip or redirect when it turns the other way, so random wrist motion becomes organized winding torque.",
    connectsTo: ["rotor-automatic", "winding-wheel", "automatic-bridge"],
    failureMode: "Worn reverser wheels can cause weak automatic winding even if the watch still runs when wound by hand.",
    disassemblyStep: 17,
    energyFlowOrder: 2,
    quizPrompt: "Which automatic part helps convert rotor motion into winding torque?",
  },
  {
    id: "winding-wheel",
    label: "Automatic Winding Wheel",
    category: "power",
    movementTypes: ["automatic"],
    shortDefinition: "A transfer wheel in the automatic winding train.",
    function: "Carries torque from the reverser system toward the ratchet wheel and mainspring barrel.",
    howItWorks:
      "The wheel meshes with the reverser system and downstream winding components, reducing and redirecting rotor motion until it can tighten the mainspring.",
    connectsTo: ["reverser-wheel", "ratchet-wheel", "barrel-mainspring"],
    disassemblyStep: 18,
    energyFlowOrder: 3,
  },
  {
    id: "reduction-wheel",
    label: "Reduction Wheel",
    category: "power",
    movementTypes: ["automatic"],
    shortDefinition: "A small wheel that trades speed for usable winding torque.",
    function: "Helps reduce the rotor's fast, irregular movement into slower, stronger motion for winding the mainspring.",
    howItWorks:
      "By changing gear size and mesh direction inside the automatic module, the reduction wheel makes rotor movement better suited to turning the barrel and ratchet system.",
    connectsTo: ["winding-wheel", "barrel-mainspring"],
    disassemblyStep: 18.5,
    energyFlowOrder: 4,
  },
]
