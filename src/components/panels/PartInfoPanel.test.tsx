import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { useViewerStore } from "@/store/viewerStore"
import { PartInfoPanel } from "./PartInfoPanel"

const initialState = useViewerStore.getState()

beforeEach(() => {
  useViewerStore.setState(initialState, true)
})

describe("PartInfoPanel", () => {
  it("shows a placeholder prompt when no part is selected", () => {
    render(<PartInfoPanel />)
    expect(screen.getByText(/click a part of the watch/i)).toBeInTheDocument()
  })

  it("shows educational content for the selected part", () => {
    useViewerStore.getState().selectPart("mainspring")
    render(<PartInfoPanel />)

    expect(screen.getByRole("heading", { name: "Mainspring" })).toBeInTheDocument()
    expect(screen.getByText(/stores mechanical energy/i)).toBeInTheDocument()
  })
})
