import { ChevronLeft, ChevronRight } from "lucide-react"
import { teardownSteps } from "@/data/teardownSteps"
import { useViewerStore } from "@/store/viewerStore"

export function TeardownControls() {
  const viewerMode = useViewerStore((state) => state.viewerMode)
  const movementType = useViewerStore((state) => state.movementType)
  const teardownStep = useViewerStore((state) => state.teardownStep)
  const nextTeardownStep = useViewerStore((state) => state.nextTeardownStep)
  const previousTeardownStep = useViewerStore((state) => state.previousTeardownStep)

  if (viewerMode !== "teardown") return null

  const steps = teardownSteps[movementType]
  const currentStep = steps[teardownStep]

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-3 mx-auto flex w-fit max-w-[90%] items-center gap-3 rounded-full border border-bench-700 bg-bench-900/90 px-4 py-2 backdrop-blur">
      <button
        type="button"
        onClick={previousTeardownStep}
        disabled={teardownStep === 0}
        aria-label="Previous teardown step"
        className="rounded-full p-1 text-bench-200 hover:text-brass-300 disabled:opacity-30"
      >
        <ChevronLeft size={18} />
      </button>
      <div className="flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-wide text-bench-400">
          Step {teardownStep + 1} of {steps.length}
        </span>
        <span className="text-sm text-bench-100">{currentStep?.instruction}</span>
      </div>
      <button
        type="button"
        onClick={nextTeardownStep}
        disabled={teardownStep >= steps.length - 1}
        aria-label="Next teardown step"
        className="rounded-full p-1 text-bench-200 hover:text-brass-300 disabled:opacity-30"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
