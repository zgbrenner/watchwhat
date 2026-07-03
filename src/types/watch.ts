export type MovementType = "manual" | "automatic" | "quartz" | "exterior"

export type ViewerMode =
  | "assembled"
  | "exploded"
  | "teardown"
  | "energy"
  | "isolate"

export type WatchPartCategory =
  | "case"
  | "dial"
  | "movement"
  | "power"
  | "regulation"
  | "display"
  | "strap"
  | "electronics"
  | "setting"

export type WatchPart = {
  id: string
  label: string
  category: WatchPartCategory
  movementTypes: MovementType[]
  shortDefinition: string
  function: string
  howItWorks: string
  connectsTo: string[]
  failureMode?: string
  disassemblyStep: number
  energyFlowOrder?: number
  quizPrompt?: string
}

export type Vector3Tuple = [number, number, number]

export type PartTransform = {
  partId: string
  assembledPosition: Vector3Tuple
  explodedPosition: Vector3Tuple
  assembledRotation?: Vector3Tuple
  explodedRotation?: Vector3Tuple
  scale?: Vector3Tuple | number
}

export type MovementConfig = {
  id: MovementType
  label: string
  tagline: string
  description: string
  partIds: string[]
  transforms: PartTransform[]
}

export type TeardownStep = {
  step: number
  partId: string
  instruction: string
  movementTypes: MovementType[]
}

export type GlossaryEntry = {
  term: string
  definition: string
  relatedPartIds?: string[]
}
