import { Eye, EyeOff, RotateCcw } from "lucide-react"
import { useViewerStore } from "@/store/viewerStore"

export function ViewerToolbar() {
  const showLabels = useViewerStore((state) => state.showLabels)
  const setShowLabels = useViewerStore((state) => state.setShowLabels)
  const resetViewState = useViewerStore((state) => state.resetViewState)

  const buttonClass =
    "flex items-center gap-1.5 rounded-full border border-bench-800/80 bg-bench-900/70 px-3 py-1.5 text-xs font-medium text-bench-200 shadow-lg shadow-black/20 backdrop-blur-md transition hover:border-bench-600 hover:text-bench-50"

  return (
    <div className="pointer-events-auto absolute right-4 top-4 flex gap-2">
      <button
        type="button"
        onClick={() => setShowLabels(!showLabels)}
        className={buttonClass}
        aria-pressed={showLabels}
      >
        {showLabels ? <Eye size={14} aria-hidden="true" /> : <EyeOff size={14} aria-hidden="true" />}
        Labels
      </button>
      <button type="button" onClick={resetViewState} className={buttonClass}>
        <RotateCcw size={14} aria-hidden="true" />
        Reset View
      </button>
    </div>
  )
}
