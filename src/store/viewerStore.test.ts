import { beforeEach, describe, expect, it } from "vitest"
import { useViewerStore } from "./viewerStore"

const initialState = useViewerStore.getState()

beforeEach(() => {
  useViewerStore.setState(initialState, true)
})

describe("useViewerStore", () => {
  it("has sensible defaults", () => {
    const state = useViewerStore.getState()
    expect(state.movementType).toBe("manual")
    expect(state.viewerMode).toBe("assembled")
    expect(state.selectedPartId).toBeNull()
    expect(state.hoveredPartId).toBeNull()
    expect(state.teardownStep).toBe(0)
    expect(state.showLabels).toBe(true)
    expect(state.isolatedPartId).toBeNull()
  })

  it("changes movement type and clears selection state", () => {
    useViewerStore.getState().selectPart("wheel-balance")
    useViewerStore.getState().setViewerMode("teardown")
    useViewerStore.getState().nextTeardownStep()

    useViewerStore.getState().setMovementType("quartz")

    const state = useViewerStore.getState()
    expect(state.movementType).toBe("quartz")
    expect(state.selectedPartId).toBeNull()
    expect(state.isolatedPartId).toBeNull()
    expect(state.teardownStep).toBe(0)
  })

  it("selects and hovers parts independently", () => {
    useViewerStore.getState().selectPart("mainspring")
    useViewerStore.getState().hoverPart("wheel-escape")

    const state = useViewerStore.getState()
    expect(state.selectedPartId).toBe("mainspring")
    expect(state.hoveredPartId).toBe("wheel-escape")
  })

  it("also isolates the selected part when in isolate mode", () => {
    useViewerStore.getState().setViewerMode("isolate")
    useViewerStore.getState().selectPart("wheel-balance")

    const state = useViewerStore.getState()
    expect(state.selectedPartId).toBe("wheel-balance")
    expect(state.isolatedPartId).toBe("wheel-balance")
  })

  it("does not isolate the selected part outside isolate mode", () => {
    useViewerStore.getState().selectPart("wheel-balance")
    expect(useViewerStore.getState().isolatedPartId).toBeNull()
  })

  it("steps forward and backward through teardown steps within bounds", () => {
    useViewerStore.getState().previousTeardownStep()
    expect(useViewerStore.getState().teardownStep).toBe(0)

    useViewerStore.getState().nextTeardownStep()
    useViewerStore.getState().nextTeardownStep()
    expect(useViewerStore.getState().teardownStep).toBe(2)

    useViewerStore.getState().previousTeardownStep()
    expect(useViewerStore.getState().teardownStep).toBe(1)
  })

  it("clamps teardown step at the last step for the movement type", () => {
    const { setMovementType } = useViewerStore.getState()
    setMovementType("quartz")

    for (let i = 0; i < 100; i += 1) {
      useViewerStore.getState().nextTeardownStep()
    }

    const state = useViewerStore.getState()
    expect(state.teardownStep).toBeGreaterThan(0)
    expect(state.teardownStep).toBeLessThan(100)
  })

  it("resets view state but keeps the movement type", () => {
    useViewerStore.getState().setMovementType("automatic")
    useViewerStore.getState().selectPart("rotor-automatic")
    useViewerStore.getState().setViewerMode("exploded")
    useViewerStore.getState().setSearchQuery("rotor")
    useViewerStore.getState().nextTeardownStep()

    useViewerStore.getState().resetViewState()

    const state = useViewerStore.getState()
    expect(state.movementType).toBe("automatic")
    expect(state.viewerMode).toBe("assembled")
    expect(state.selectedPartId).toBeNull()
    expect(state.teardownStep).toBe(0)
    expect(state.searchQuery).toBe("")
  })
})
