import { describe, expect, it } from "vitest"
import type { MovementType } from "@/types/watch"
import { getQuizQuestion, getQuizQuestionsForMovement, isCorrectQuizAnswer } from "./quiz"

const movementTypes: MovementType[] = ["manual", "automatic", "quartz", "exterior"]

describe("quiz utilities", () => {
  it("creates questions for every movement type", () => {
    for (const movementType of movementTypes) {
      expect(getQuizQuestionsForMovement(movementType).length).toBeGreaterThan(0)
    }
  })

  it("returns deterministic wrapped questions by index", () => {
    const questions = getQuizQuestionsForMovement("manual")
    const firstQuestion = getQuizQuestion("manual", 0)
    const wrappedQuestion = getQuizQuestion("manual", questions.length)

    expect(firstQuestion).toBeDefined()
    expect(wrappedQuestion?.id).toBe(firstQuestion?.id)
  })

  it("checks correct and incorrect answers", () => {
    const question = getQuizQuestion("manual", 0)
    expect(question).toBeDefined()
    if (!question) return

    expect(isCorrectQuizAnswer(question, question.targetPartId)).toBe(true)
    expect(isCorrectQuizAnswer(question, "not-the-right-part")).toBe(false)
    expect(isCorrectQuizAnswer(question, null)).toBe(false)
  })
})
