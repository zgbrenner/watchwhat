import { describe, expect, it } from "vitest"
import { movementConfigs } from "@/data/movementConfigs"
import { teardownSteps } from "@/data/teardownSteps"
import { getPartById, watchParts } from "@/data/watchParts"
import type { MovementType } from "@/types/watch"

const movementTypes: MovementType[] = ["manual", "automatic", "quartz", "exterior"]

describe("catalog integrity", () => {
  it("has educational copy for every catalog item", () => {
    for (const part of watchParts) {
      expect(part.label.length).toBeGreaterThan(0)
      expect(part.shortDefinition.length).toBeGreaterThan(0)
      expect(part.function.length).toBeGreaterThan(0)
      expect(part.howItWorks.length).toBeGreaterThan(0)
      expect(part.movementTypes.length).toBeGreaterThan(0)
    }
  })

  it("has one transform for each configured item", () => {
    for (const movementType of movementTypes) {
      const config = movementConfigs[movementType]
      const transformedIds = new Set(config.transforms.map((transform) => transform.partId))

      for (const partId of config.partIds) {
        expect(transformedIds.has(partId)).toBe(true)
      }
    }
  })

  it("uses valid catalog IDs in teardown steps", () => {
    for (const movementType of movementTypes) {
      for (const step of teardownSteps[movementType]) {
        expect(getPartById(step.partId)).toBeDefined()
        expect(step.movementTypes).toContain(movementType)
      }
    }
  })

  it("orders teardown steps by configured step number", () => {
    for (const movementType of movementTypes) {
      const steps = teardownSteps[movementType]

      for (let index = 1; index < steps.length; index += 1) {
        expect(steps[index].step).toBeGreaterThanOrEqual(steps[index - 1].step)
      }
    }
  })

  it("does not duplicate flow order values within a movement", () => {
    for (const movementType of movementTypes) {
      const flowOrders = movementConfigs[movementType].partIds
        .map((partId) => getPartById(partId)?.energyFlowOrder)
        .filter((flowOrder): flowOrder is number => flowOrder !== undefined)

      expect(new Set(flowOrders).size).toBe(flowOrders.length)
    }
  })
})