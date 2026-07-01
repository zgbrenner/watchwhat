import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it } from "vitest"
import { useViewerStore } from "@/store/viewerStore"
import { ModeSwitcher } from "./ModeSwitcher"

const initialState = useViewerStore.getState()

beforeEach(() => {
  useViewerStore.setState(initialState, true)
})

describe("ModeSwitcher", () => {
  it("marks the current viewer mode as checked", () => {
    render(<ModeSwitcher />)
    expect(screen.getByRole("radio", { name: /assembled/i })).toHaveAttribute("aria-checked", "true")
    expect(screen.getByRole("radio", { name: /exploded/i })).toHaveAttribute("aria-checked", "false")
  })

  it("updates the store when a mode is clicked", async () => {
    const user = userEvent.setup()
    render(<ModeSwitcher />)

    await user.click(screen.getByRole("radio", { name: /teardown/i }))

    expect(useViewerStore.getState().viewerMode).toBe("teardown")
  })
})
