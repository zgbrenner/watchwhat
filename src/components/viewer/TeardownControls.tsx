import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { teardownSteps } from "@/data/teardownSteps"
import { useViewerStore } from "@/store/viewerStore"
import { getPartById } from "@/utils/partLookup"

export function TeardownControls() {
  const viewerMode = useViewerStore((state) => state.viewerMode)
  const movementType = useViewerStore((state) => state.movementType)
  const teardownStep = useViewerStore((state) => state.teardownStep)
  const nextTeardownStep = useViewerStore((state) => state.nextTeardownStep)
  const previousTeardownStep = useViewerStore((state) => state.previousTeardownStep)
  const setTeardownStep = useViewerStore((state) => state.setTeardownStep)
  const selectPart = useViewerStore((state) => state.selectPart)

  if (viewerMode !== "teardown") return null

  const steps = teardownSteps[movementType]
  const currentStep = steps[teardownStep]
  const currentPart = currentStep ? getPartById(currentStep.partId) : undefined

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-3 mx-auto flex w-fit max-w-[94%] flex-col gap-3 rounded-2xl border border-bench-700 bg-bench-900/92 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={previousTeardownStep}
          disabled={teardownStep === 0}
          aria-label="Previous teardown step"
          className="rounded-full p-1.5 text-bench-200 transition hover:bg-bench-800 hover:text-brass-300 disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => currentPart && selectPart(currentPart.id)}
          className="flex min-w-0 flex-col items-center text-center"
        >
          <span className="text-[10px] uppercase tracking-wide text-bench-400">
            Step {teardownStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-bench-50">
            {currentPart ? currentPart.label : "Teardown Step"}
          </span>
          <span className="max-w-xl truncate text-xs text-bench-300">{currentStep?.instruction}</span>
        </button>

        <button
          type="button"
          onClick={nextTeardownStep}
          disabled={teardownStep >= steps.length - 1}
          aria-label="Next teardown step"
          className="rounded-full p-1.5 text-bench-200 transition hover:bg-bench-800 hover:text-brass-300 disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTeardownStep(0)}
          className="rounded-full border border-bench-700 px-2 py-1 text-[10px] uppercase tracking-wide text-bench-300 transition hover:border-brass-400 hover:text-brass-200"
        >
          <RotateCcw size={12} className="mr-1 inline" aria-hidden="true" />
          Restart
        </button>
        <div className="flex max-w-xl flex-1 flex-wrap justify-center gap-1.5">
          {steps.map((step, index) => {
            const part = getPartById(step.partId)
            const isActive = index === teardownStep
            const isPast = index < teardownStep
            return (
              <button
                key={`${step.partId}-${index}`}
                type="button"
                onClick={() => setTeardownStep(index)}
                aria-label={`Jump to ${part?.label ?? "teardown step"}`}
                className={`h-2.5 rounded-full transition-all ${
                  isActive
                    ? "w-8 bg-brass-300"
                    : isPast
                      ? "w-4 bg-brass-500/50 hover:bg-brass-400"
                      : "w-2.5 bg-bench-700 hover:bg-bench-500"
                }`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
