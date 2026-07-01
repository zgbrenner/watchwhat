import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it } from "vitest"
import { useViewerStore } from "@/store/viewerStore"
import { MovementPicker } from "./MovementPicker"

const initialState = useViewerStore.getState()

beforeEach(() => {
  useViewerStore.setState(initialState, true)
})

describe("MovementPicker", () => {
  it("selects a movement type and resets dependent state", async () => {
    const user = userEvent.setup()
    useViewerStore.getState().selectPart("wheel-balance")

    render(<MovementPicker />)
    await user.click(screen.getByRole("radio", { name: /quartz/i }))

    const state = useViewerStore.getState()
    expect(state.movementType).toBe("quartz")
    expect(state.selectedPartId).toBeNull()
  })
})
