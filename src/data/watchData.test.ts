import { describe, expect, it } from "vitest"
import { movementConfigs } from "@/data/movementConfigs"
import { getCatalogPartById, partCatalog } from "@/data/partCatalog"
import { teardownSteps } from "@/data/teardownSteps"
import type { MovementType } from "@/types/watch"

const movementTypes: MovementType[] = ["manual", "automatic", "quartz", "exterior"]

describe("catalog integrity", () => {
  it("has educational copy for every catalog item", () => {
    for (const part of partCatalog) {
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
        expect(getCatalogPartById(step.partId)).toBeDefined()
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

  it("has a usable flow path for powered movement modes", () => {
    for (const movementType of ["manual", "automatic", "quartz"] satisfies MovementType[]) {
      const flowParts = movementConfigs[movementType].partIds
        .map((partId) => getCatalogPartById(partId))
        .filter((part) => part?.energyFlowOrder !== undefined)
        .sort((a, b) => (a?.energyFlowOrder ?? 0) - (b?.energyFlowOrder ?? 0))

      expect(flowParts.length).toBeGreaterThan(3)
      expect(flowParts[0]?.energyFlowOrder).toBeGreaterThanOrEqual(0)
    }
  })

  it("adds a real automatic winding module on top of the manual movement", () => {
    const automaticPartIds = new Set(movementConfigs.automatic.partIds)

    expect(automaticPartIds.has("rotor-automatic")).toBe(true)
    expect(automaticPartIds.has("rotor-bearing")).toBe(true)
    expect(automaticPartIds.has("automatic-bridge")).toBe(true)
    expect(automaticPartIds.has("reverser-wheel")).toBe(true)
    expect(automaticPartIds.has("winding-wheel")).toBe(true)
    expect(automaticPartIds.has("reduction-wheel")).toBe(true)
  })
})
