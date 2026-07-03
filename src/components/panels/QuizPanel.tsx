import { CheckCircle2, HelpCircle, RotateCcw, XCircle } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useViewerStore } from "@/store/viewerStore"
import { getQuizQuestion, getQuizQuestionsForMovement, isCorrectQuizAnswer } from "@/utils/quiz"
import { getPartById } from "@/utils/partLookup"

type QuizResult = "idle" | "correct" | "incorrect"

export function QuizPanel() {
  const movementType = useViewerStore((state) => state.movementType)
  const selectedPartId = useViewerStore((state) => state.selectedPartId)
  const selectPart = useViewerStore((state) => state.selectPart)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [result, setResult] = useState<QuizResult>("idle")
  const [streak, setStreak] = useState(0)

  const questionCount = useMemo(() => getQuizQuestionsForMovement(movementType).length, [movementType])
  const question = getQuizQuestion(movementType, questionIndex)
  const selectedPart = selectedPartId ? getPartById(selectedPartId) : undefined
  const targetPart = question ? getPartById(question.targetPartId) : undefined

  useEffect(() => {
    setQuestionIndex(0)
    setResult("idle")
    setStreak(0)
    selectPart(null)
  }, [movementType, selectPart])

  useEffect(() => {
    if (!question || !selectedPartId || result !== "idle") return

    const isCorrect = isCorrectQuizAnswer(question, selectedPartId)
    setResult(isCorrect ? "correct" : "incorrect")
    setStreak((current) => (isCorrect ? current + 1 : 0))
  }, [question, result, selectedPartId])

  const handleNext = () => {
    setResult("idle")
    selectPart(null)
    setQuestionIndex((current) => current + 1)
  }

  const handleRestart = () => {
    setQuestionIndex(0)
    setResult("idle")
    setStreak(0)
    selectPart(null)
  }

  if (!question || !targetPart) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-sm text-bench-400">
        <HelpCircle className="text-brass-300" size={28} aria-hidden="true" />
        <p>No quiz questions are available for this movement yet.</p>
      </div>
    )
  }

  const answered = result !== "idle"
  const ResultIcon = result === "correct" ? CheckCircle2 : XCircle

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-brass-400">Quiz Mode</span>
        <h2 className="text-lg font-semibold text-bench-50">Find the part</h2>
        <p className="mt-1 text-sm text-bench-300">
          Read the prompt, then click the matching part in the 3D watch.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-bench-700 bg-bench-900 p-2">
          <span className="block text-[10px] uppercase tracking-wide text-bench-500">Question</span>
          <span className="text-bench-100">
            {(questionIndex % Math.max(questionCount, 1)) + 1} of {questionCount}
          </span>
        </div>
        <div className="rounded-lg border border-bench-700 bg-bench-900 p-2">
          <span className="block text-[10px] uppercase tracking-wide text-bench-500">Streak</span>
          <span className="text-bench-100">{streak}</span>
        </div>
      </div>

      <section className="rounded-xl border border-brass-700/60 bg-brass-950/20 p-4">
        <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brass-300">
          <HelpCircle size={14} aria-hidden="true" />
          Prompt
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-bench-50">{question.prompt}</p>
      </section>

      {!answered && (
        <p className="rounded-lg border border-bench-700 bg-bench-900 p-3 text-sm text-bench-300">
          Waiting for your click in the 3D viewer.
        </p>
      )}

      {answered && selectedPart && (
        <section
          className={`rounded-xl border p-4 ${
            result === "correct"
              ? "border-emerald-700/60 bg-emerald-950/20"
              : "border-red-700/60 bg-red-950/20"
          }`}
        >
          <h3
            className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${
              result === "correct" ? "text-emerald-300" : "text-red-300"
            }`}
          >
            <ResultIcon size={14} aria-hidden="true" />
            {result === "correct" ? "Correct" : "Not quite"}
          </h3>
          <p className="mt-2 text-sm text-bench-100">
            You clicked <strong>{selectedPart.label}</strong>. The answer is <strong>{targetPart.label}</strong>.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-bench-200">{question.explanation}</p>
        </section>
      )}

      <div className="mt-auto flex gap-2">
        <button
          type="button"
          onClick={handleRestart}
          className="inline-flex items-center gap-1.5 rounded-full border border-bench-700 px-3 py-1.5 text-xs font-medium text-bench-200 transition hover:border-bench-500"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Restart
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="ml-auto rounded-full border border-brass-500 bg-brass-400/10 px-3 py-1.5 text-xs font-medium text-brass-100 transition hover:bg-brass-400/20"
        >
          Next question
        </button>
      </div>
    </div>
  )
}
