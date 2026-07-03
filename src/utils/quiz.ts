import type { MovementType, WatchPart } from "@/types/watch"
import { listPartsForMovement } from "./partLookup"

export type QuizQuestionType = "identify" | "function" | "connection"

export type QuizQuestion = {
  id: string
  type: QuizQuestionType
  movementType: MovementType
  targetPartId: string
  prompt: string
  explanation: string
}

function hasUsableConnection(part: WatchPart, movementParts: Set<string>): boolean {
  return part.connectsTo.some((partId) => movementParts.has(partId))
}

function buildQuestionForPart(
  movementType: MovementType,
  part: WatchPart,
  movementPartIds: Set<string>,
): QuizQuestion {
  if (part.quizPrompt) {
    return {
      id: `${movementType}-${part.id}-custom`,
      type: "identify",
      movementType,
      targetPartId: part.id,
      prompt: part.quizPrompt,
      explanation: part.shortDefinition,
    }
  }

  if (part.energyFlowOrder !== undefined) {
    return {
      id: `${movementType}-${part.id}-function`,
      type: "function",
      movementType,
      targetPartId: part.id,
      prompt: `Click the part that does this: ${part.function}`,
      explanation: part.howItWorks,
    }
  }

  if (hasUsableConnection(part, movementPartIds)) {
    return {
      id: `${movementType}-${part.id}-connection`,
      type: "connection",
      movementType,
      targetPartId: part.id,
      prompt: `Find the part connected to ${part.connectsTo.slice(0, 2).join(" and ")}.`,
      explanation: `${part.label} connects to ${part.connectsTo.join(", ")}. ${part.shortDefinition}`,
    }
  }

  return {
    id: `${movementType}-${part.id}-identify`,
    type: "identify",
    movementType,
    targetPartId: part.id,
    prompt: `Click the ${part.label}.`,
    explanation: part.shortDefinition,
  }
}

export function getQuizQuestionsForMovement(movementType: MovementType): QuizQuestion[] {
  const parts = listPartsForMovement(movementType)
  const movementPartIds = new Set(parts.map((part) => part.id))

  return parts
    .filter((part) => part.category !== "case" && part.category !== "strap")
    .map((part) => buildQuestionForPart(movementType, part, movementPartIds))
}

export function getQuizQuestion(
  movementType: MovementType,
  questionIndex: number,
): QuizQuestion | undefined {
  const questions = getQuizQuestionsForMovement(movementType)
  if (questions.length === 0) return undefined
  const safeIndex = Math.abs(questionIndex) % questions.length
  return questions[safeIndex]
}

export function isCorrectQuizAnswer(question: QuizQuestion, selectedPartId: string | null): boolean {
  return question.targetPartId === selectedPartId
}
