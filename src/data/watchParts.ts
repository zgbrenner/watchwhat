import type { WatchPart } from "@/types/watch"

/**
 * Master catalog of every part that can appear across the watch models.
 * Every entry here must be selectable and carry real educational content —
 * this list is the single source of truth for part IDs used by
 * movementConfigs.ts, teardownSteps.ts, and the 3D scene components.
 */
export const watchParts: WatchPart[] = [
  // ---- Exterior / case parts (shared across all movement types) ----
  {
    id: "case-crystal",
    label: "Crystal",
    category: "case",
    movementTypes: ["manual", "automatic", "quartz", "exterior"],
    shortDefinition: "The transparent cover protecting the dial.",
    function:
      "Shields the dial and hands from dust, moisture, and impact while keeping them visible.",
    howItWorks:
      "A disc of mineral glass, sapphire, or acrylic is pressed or glued into the case, forming a sealed, optically clear window.",
    connectsTo: ["case-middle", "dial-face"],
    disassemblyStep: 1,
    quizPrompt: "What part protects the dial while still letting you read the time?",
  },
  {
    id: "case-bezel",
    label: "Bezel",
    category: "case",
    movementTypes: ["manual", "automatic", "quartz", "exterior"],
    shortDefinition: "The ring surrounding the crystal.",
    function:
      "Holds the crystal in place and, on tool watches, can add a rotating timing or diving scale.",
    howItWorks:
      "Threaded, pressed, or friction-fit onto the case middle; some versions click into detents so they rotate in one direction only.",
    connectsTo: ["case-crystal", "case-middle"],
    disassemblyStep: 2,
  },
  {
    id: "case-middle",
    label: "Case Middle",
    category: "case",
    movementTypes: ["manual", "automatic", "quartz", "exterior"],
    shortDefinition: "The central body of the watch case.",
    function:
      "Provides the structural shell that holds the movement, dial, and crystal, and anchors the crown and strap.",
    howItWorks:
      "Machined or cast from steel, titanium, or brass, with a gasket-sealed opening for the crown and a rear opening for the case back.",
    connectsTo: ["case-back", "case-bezel", "crown-stem", "strap-lug"],
    disassemblyStep: 3,
  },
  {
    id: "case-back",
    label: "Case Back",
    category: "case",
    movementTypes: ["manual", "automatic", "quartz", "exterior"],
    shortDefinition: "The removable panel that seals the rear of the case.",
    function:
      "Encloses the movement, keeping out dust and moisture while allowing access for service.",
    howItWorks:
      "Screwed, snapped, or press-fit onto the case middle, often with a rubber gasket to maintain water resistance.",
    connectsTo: ["case-middle"],
    disassemblyStep: 0,
    quizPrompt: "Which part must usually be removed first to access a watch movement?",
  },
  {
    id: "dial-face",
    label: "Dial",
    category: "dial",
    movementTypes: ["manual", "automatic", "quartz", "exterior"],
    shortDefinition: "The face of the watch showing hour markers.",
    function: "Provides a fixed reference surface so the hands can indicate the time.",
    howItWorks:
      "A thin metal or composite plate is printed or applied with hour markers, then mounted over the movement using dial feet or clips.",
    connectsTo: ["case-crystal", "hand-hour", "hand-minute"],
    disassemblyStep: 8,
  },
  {
    id: "hand-hour",
    label: "Hour Hand",
    category: "display",
    movementTypes: ["manual", "automatic", "quartz", "exterior"],
    shortDefinition: "The short hand indicating the current hour.",
    function: "Points to the current hour on the dial.",
    howItWorks:
      "Friction-fit onto the hour wheel pipe, which turns once every twelve hours through the motion works.",
    connectsTo: ["dial-face", "hand-minute"],
    disassemblyStep: 7,
    energyFlowOrder: 9,
  },
  {
    id: "hand-minute",
    label: "Minute Hand",
    category: "display",
    movementTypes: ["manual", "automatic", "quartz", "exterior"],
    shortDefinition: "The long hand indicating the current minute.",
    function: "Points to the current minute on the dial.",
    howItWorks:
      "Friction-fit onto the center wheel's minute pipe, which the motion works turns once per hour.",
    connectsTo: ["dial-face", "hand-hour", "hand-second"],
    disassemblyStep: 6,
    energyFlowOrder: 8,
  },
  {
    id: "hand-second",
    label: "Second Hand",
    category: "display",
    movementTypes: ["manual", "automatic", "quartz", "exterior"],
    shortDefinition: "The thin hand sweeping or ticking through seconds.",
    function: "Points to the current second, revealing whether a movement is mechanical or quartz.",
    howItWorks:
      "Mounted on the fourth wheel pipe in a mechanical watch (smooth sweep) or driven directly by a stepper motor in a quartz watch (one tick per second).",
    connectsTo: ["hand-minute", "wheel-fourth", "stepper-motor"],
    disassemblyStep: 5,
    energyFlowOrder: 7,
  },
  {
    id: "strap-lug",
    label: "Strap / Bracelet",
    category: "strap",
    movementTypes: ["manual", "automatic", "quartz", "exterior"],
    shortDefinition: "The band that secures the watch to the wrist.",
    function: "Holds the watch on the wrist and completes its everyday wearability.",
    howItWorks:
      "Leather, rubber, or metal bracelet links attach to the case lugs via spring bars and fasten with a buckle or clasp.",
    connectsTo: ["case-middle"],
    disassemblyStep: 4,
  },
  {
    id: "crown-stem",
    label: "Crown",
    category: "setting",
    movementTypes: ["manual", "automatic", "quartz", "exterior"],
    shortDefinition: "The knob used to wind and set the watch.",
    function:
      "Lets the wearer wind the mainspring, set the time, and (on many watches) set the date by pulling it to different positions.",
    howItWorks:
      "Threaded onto a stem that passes through the case into the keyless works, engaging different gears depending on how far it is pulled out.",
    connectsTo: ["case-middle", "keyless-works"],
    disassemblyStep: 9,
    quizPrompt: "What single part lets you both wind and set a mechanical watch?",
  },
  {
    id: "keyless-works",
    label: "Keyless Works",
    category: "setting",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The gear cluster that translates crown movement into winding or setting.",
    function:
      "Switches the mainspring's power path between winding the mainspring and setting the hands, depending on the crown's position.",
    howItWorks:
      "A sliding clutch and setting lever shift a small gear train so turning the crown either turns the winding wheels or the motion works.",
    connectsTo: ["crown-stem", "crown-wheel", "wheel-center"],
    disassemblyStep: 10,
  },

  // ---- Mechanical (manual + automatic) movement parts ----
  {
    id: "mainspring",
    label: "Mainspring",
    category: "power",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The coiled spring that stores the watch's running energy.",
    function: "Stores mechanical energy from winding and releases it slowly to power the movement.",
    howItWorks:
      "A long ribbon of spring steel is coiled tightly inside the barrel; as it unwinds, it turns the barrel and drives the entire gear train.",
    connectsTo: ["barrel-mainspring", "crown-wheel"],
    failureMode: "A broken or set (fatigued) mainspring stops the watch or shortens its power reserve.",
    disassemblyStep: 14,
    energyFlowOrder: 1,
    quizPrompt: "What part stores the energy you put in when you wind a watch?",
  },
  {
    id: "barrel-mainspring",
    label: "Mainspring Barrel",
    category: "power",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The drum that houses the mainspring.",
    function: "Contains the mainspring and provides the geared drive that starts the gear train.",
    howItWorks:
      "The mainspring's outer end hooks to the barrel wall; as the spring unwinds, the barrel itself rotates and its teeth drive the center wheel.",
    connectsTo: ["mainspring", "wheel-center", "crown-wheel"],
    disassemblyStep: 13,
    energyFlowOrder: 2,
  },
  {
    id: "crown-wheel",
    label: "Crown Wheel",
    category: "power",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The small wheel that transfers winding force into the barrel.",
    function: "Passes torque from the winding stem to the ratchet wheel to wind the mainspring.",
    howItWorks:
      "Engages the ratchet wheel only when the crown is turned in the winding direction, thanks to its angled teeth.",
    connectsTo: ["keyless-works", "ratchet-wheel"],
    disassemblyStep: 12,
  },
  {
    id: "ratchet-wheel",
    label: "Ratchet Wheel",
    category: "power",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The toothed wheel that locks the mainspring's tension in place.",
    function: "Keeps the mainspring wound by preventing it from unwinding back through the crown.",
    howItWorks:
      "A spring-loaded click pawl engages the ratchet wheel's teeth, allowing rotation in the winding direction only.",
    connectsTo: ["crown-wheel", "barrel-mainspring"],
    disassemblyStep: 11,
  },
  {
    id: "rotor-automatic",
    label: "Rotor (Oscillating Weight)",
    category: "power",
    movementTypes: ["automatic"],
    shortDefinition: "The semicircular weight that winds the watch from wrist motion.",
    function: "Converts the natural motion of the wearer's arm into mainspring winding energy.",
    howItWorks:
      "A pivoted, off-center weight swings freely with wrist movement; through a reduction gear train and reversing wheels, it winds the mainspring in both swing directions.",
    connectsTo: ["barrel-mainspring", "ratchet-wheel"],
    disassemblyStep: 15,
    energyFlowOrder: 0,
    quizPrompt: "In an automatic watch, what part replaces manual winding with wrist motion?",
  },
  {
    id: "mainplate",
    label: "Main Plate",
    category: "movement",
    movementTypes: ["manual", "automatic", "quartz"],
    shortDefinition: "The base plate that all other movement parts are built upon.",
    function: "Provides the structural foundation and pivot holes for every wheel and lever in the movement.",
    howItWorks:
      "A flat brass or nickel-plated plate is drilled and jeweled with precisely spaced holes so each wheel's pivot can turn with minimal friction.",
    connectsTo: ["bridge-train", "wheel-center"],
    disassemblyStep: 20,
  },
  {
    id: "bridge-train",
    label: "Train Wheel Bridge",
    category: "movement",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The plate that caps the gear train's upper pivots.",
    function: "Holds the upper pivots of the gear train wheels in place, sandwiching them against the main plate.",
    howItWorks:
      "Screwed over the wheel train, it carries jeweled bearings that align precisely with the holes in the main plate below.",
    connectsTo: ["mainplate", "wheel-center", "wheel-third", "wheel-fourth"],
    disassemblyStep: 19,
  },
  {
    id: "wheel-center",
    label: "Center Wheel",
    category: "movement",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The first wheel in the gear train, turning once per hour.",
    function: "Receives power from the barrel and begins dividing it down through the gear train, also driving the minute hand.",
    howItWorks:
      "Meshes directly with the mainspring barrel's teeth; its own pinion drives the third wheel while its arbor extends to the dial side to turn the minute hand.",
    connectsTo: ["barrel-mainspring", "wheel-third", "hand-minute"],
    disassemblyStep: 18,
    energyFlowOrder: 3,
  },
  {
    id: "wheel-third",
    label: "Third Wheel",
    category: "movement",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The middle wheel of the gear train.",
    function: "Passes energy from the center wheel to the fourth wheel, continuing the speed increase.",
    howItWorks: "Its pinion meshes with the center wheel while its teeth drive the fourth wheel's pinion.",
    connectsTo: ["wheel-center", "wheel-fourth"],
    disassemblyStep: 17,
    energyFlowOrder: 4,
  },
  {
    id: "wheel-fourth",
    label: "Fourth Wheel",
    category: "movement",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The gear train wheel that typically carries the seconds hand.",
    function: "Drives the escape wheel and, in most movements, directly carries the second hand.",
    howItWorks:
      "Rotates once per minute; its arbor often extends through the dial to mount the second hand directly.",
    connectsTo: ["wheel-third", "wheel-escape", "hand-second"],
    disassemblyStep: 16,
    energyFlowOrder: 5,
  },
  {
    id: "wheel-escape",
    label: "Escape Wheel",
    category: "regulation",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The wheel that releases energy in small, regular impulses.",
    function: "Meters the mainspring's power into precise, evenly timed impulses that keep the watch running at a steady rate.",
    howItWorks:
      "Its specially shaped teeth are locked and released by the pallet fork, tick by tick, converting continuous rotation into a controlled stop-and-go motion.",
    connectsTo: ["wheel-fourth", "pallet-fork"],
    failureMode: "Worn or chipped escape wheel teeth cause the watch to run erratically or stop.",
    disassemblyStep: 21,
    energyFlowOrder: 6,
  },
  {
    id: "pallet-fork",
    label: "Pallet Fork",
    category: "regulation",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The lever that locks and releases the escape wheel.",
    function: "Transfers tiny impulses from the escape wheel to the balance wheel while keeping the gear train's speed under control.",
    howItWorks:
      "Two jeweled pallets alternately lock and unlock the escape wheel's teeth as the balance wheel swings back and forth, giving it a small push each time.",
    connectsTo: ["wheel-escape", "wheel-balance"],
    disassemblyStep: 22,
    quizPrompt: "What part 'ticks' back and forth to release the escape wheel one tooth at a time?",
  },
  {
    id: "wheel-balance",
    label: "Balance Wheel",
    category: "regulation",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The oscillating wheel that acts as the watch's timekeeper.",
    function: "Swings back and forth at a constant rate, acting as the mechanical equivalent of a clock's pendulum.",
    howItWorks:
      "Paired with the balance spring, it oscillates at a fixed frequency (commonly 4-5 times per second); each swing releases the pallet fork to advance the gear train by one step.",
    connectsTo: ["pallet-fork", "spring-hairspring"],
    disassemblyStep: 23,
    energyFlowOrder: 7,
  },
  {
    id: "spring-hairspring",
    label: "Balance Spring (Hairspring)",
    category: "regulation",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "The delicate coiled spring that regulates the balance wheel's swing.",
    function: "Returns the balance wheel to center after each swing, giving it a natural, repeatable oscillation rate.",
    howItWorks:
      "A hair-thin coil of spring alloy is fixed to the balance staff at its center and to a stud at its outer end, storing and releasing energy each half-swing like a tiny mechanical spring.",
    connectsTo: ["wheel-balance"],
    failureMode: "A bent or magnetized hairspring makes the watch run fast, slow, or stop.",
    disassemblyStep: 24,
    energyFlowOrder: 8,
    quizPrompt: "What tiny spring gives the balance wheel its steady beat?",
  },
  {
    id: "jewel-bearing",
    label: "Jewel Bearing",
    category: "movement",
    movementTypes: ["manual", "automatic"],
    shortDefinition: "A synthetic ruby bearing that reduces pivot friction.",
    function: "Provides a hard, low-friction surface for fast-spinning wheel pivots, reducing wear.",
    howItWorks:
      "A synthetic sapphire or ruby disc with a polished hole is set into the plate or bridge; the wheel's pivot spins inside it with minimal friction and no lubricant breakdown.",
    connectsTo: ["mainplate", "bridge-train", "wheel-balance"],
    disassemblyStep: 25,
  },
  {
    id: "screw-movement",
    label: "Movement Screw",
    category: "movement",
    movementTypes: ["manual", "automatic", "quartz"],
    shortDefinition: "A small screw fastening bridges and components to the main plate.",
    function: "Holds bridges, plates, and other components firmly in place against the main plate.",
    howItWorks:
      "A blued or polished steel screw threads into a tapped hole, clamping a bridge or component at a precise, repeatable position.",
    connectsTo: ["mainplate", "bridge-train"],
    disassemblyStep: 26,
  },

  // ---- Quartz movement parts ----
  {
    id: "battery-cell",
    label: "Battery",
    category: "power",
    movementTypes: ["quartz"],
    shortDefinition: "The silver-oxide cell that powers a quartz movement.",
    function: "Supplies the electrical energy that drives the entire quartz movement.",
    howItWorks:
      "A small silver-oxide or lithium cell sits in a battery bracket, completing a circuit through contact springs to the integrated circuit.",
    connectsTo: ["circuit-ic", "clip-battery"],
    failureMode: "A depleted battery stops the watch entirely and can leak if left installed too long.",
    disassemblyStep: 11,
    energyFlowOrder: 1,
    quizPrompt: "What single component provides all the energy in a quartz watch?",
  },
  {
    id: "clip-battery",
    label: "Battery Clip",
    category: "electronics",
    movementTypes: ["quartz"],
    shortDefinition: "The spring contact that holds the battery and completes the circuit.",
    function: "Secures the battery in place and conducts current from it to the circuit board.",
    howItWorks: "A springy metal bracket presses against the battery's terminals, maintaining contact under vibration.",
    connectsTo: ["battery-cell", "circuit-ic"],
    disassemblyStep: 12,
  },
  {
    id: "circuit-ic",
    label: "Integrated Circuit",
    category: "electronics",
    movementTypes: ["quartz"],
    shortDefinition: "The chip that counts quartz oscillations and drives the motor.",
    function: "Divides the quartz crystal's oscillations down to one pulse per second and sends drive pulses to the stepper motor.",
    howItWorks:
      "The circuit amplifies the crystal's tiny oscillating signal, counts it down through binary dividers (32,768 Hz to 1 Hz), and outputs a timed electrical pulse.",
    connectsTo: ["crystal-quartz", "clip-battery", "coil-stepper"],
    disassemblyStep: 13,
    energyFlowOrder: 3,
  },
  {
    id: "crystal-quartz",
    label: "Quartz Crystal Oscillator",
    category: "regulation",
    movementTypes: ["quartz"],
    shortDefinition: "The tiny tuning-fork crystal that sets a quartz watch's timekeeping rate.",
    function: "Vibrates at an extremely precise, stable frequency that the circuit uses as a timebase.",
    howItWorks:
      "An electric current applied to a synthetic quartz tuning fork makes it vibrate at exactly 32,768 times per second via the piezoelectric effect.",
    connectsTo: ["circuit-ic"],
    failureMode: "Physical shock or temperature extremes can shift the crystal's frequency, causing drift.",
    disassemblyStep: 14,
    energyFlowOrder: 2,
    quizPrompt: "What tiny vibrating crystal keeps time in a quartz watch?",
  },
  {
    id: "coil-stepper",
    label: "Stepper Motor Coil",
    category: "electronics",
    movementTypes: ["quartz"],
    shortDefinition: "The wound coil that turns electrical pulses into rotation.",
    function: "Generates a magnetic pulse each second that turns the stepper motor's rotor by a fixed angle.",
    howItWorks:
      "Fine copper wire is wound around a core; each electrical pulse from the IC creates a brief magnetic field that pushes the adjacent rotor magnet exactly one step.",
    connectsTo: ["circuit-ic", "stepper-motor"],
    disassemblyStep: 15,
    energyFlowOrder: 4,
  },
  {
    id: "stepper-motor",
    label: "Stepper Motor",
    category: "movement",
    movementTypes: ["quartz"],
    shortDefinition: "The small motor that converts electrical pulses into precise rotation.",
    function: "Advances the gear train by one exact step per pulse, ultimately moving the second hand.",
    howItWorks:
      "A magnetized rotor sits inside the coil's field; each pulse flips the field's polarity, rotating the magnet a fixed 180 degrees, which a gear train reduces further.",
    connectsTo: ["coil-stepper", "wheel-fourth", "hand-second"],
    disassemblyStep: 16,
    energyFlowOrder: 5,
  },

  // ---- Automatic-specific setting parts (reuses keyless-works from manual set) ----
]

export function getPartById(id: string): WatchPart | undefined {
  return watchParts.find((part) => part.id === id)
}

export function getPartsForMovement(movementType: WatchPart["movementTypes"][number]): WatchPart[] {
  return watchParts.filter((part) => part.movementTypes.includes(movementType))
}
