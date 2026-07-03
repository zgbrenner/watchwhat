import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { useViewerStore } from "@/store/viewerStore"
import { getQuizQuestion } from "@/utils/quiz"
import { QuizPanel } from "./QuizPanel"

const initialState = useViewerStore.getState()

beforeEach(() => {
  useViewerStore.setState(initialState, true)
})

describe("QuizPanel", () => {
  it("renders a quiz prompt", () => {
    render(<QuizPanel />)

    expect(screen.getByRole("heading", { name: /find the part/i })).toBeInTheDocument()
    expect(screen.getByText(/waiting for your click/i)).toBeInTheDocument()
  })

  it("marks a clicked target part correct", () => {
    const question = getQuizQuestion("manual", 0)
    expect(question).toBeDefined()
    if (!question) return

    render(<QuizPanel />)
    useViewerStore.getState().selectPart(question.targetPartId)

    expect(screen.getByText(/correct/i)).toBeInTheDocument()
  })

  it("advances to the next question", () => {
    render(<QuizPanel />)

    fireEvent.click(screen.getByRole("button", { name: /next question/i }))

    expect(screen.getByText(/2 of/i)).toBeInTheDocument()
  })
})
