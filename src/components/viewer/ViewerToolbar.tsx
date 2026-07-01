import { Eye, EyeOff, RotateCcw } from "lucide-react"
import { useViewerStore } from "@/store/viewerStore"

export function ViewerToolbar() {
  const showLabels = useViewerStore((state) => state.showLabels)
  const setShowLabels = useViewerStore((state) => state.setShowLabels)
  const resetViewState = useViewerStore((state) => state.resetViewState)

  return (
    <div className="pointer-events-auto absolute right-3 top-3 flex gap-2">
      <button
        type="button"
        onClick={() => setShowLabels(!showLabels)}
        className="flex items-center gap-1.5 rounded-full border border-bench-700 bg-bench-900/80 px-3 py-1.5 text-xs font-medium text-bench-200 backdrop-blur hover:border-bench-500"
        aria-pressed={showLabels}
      >
        {showLabels ? <Eye size={14} aria-hidden="true" /> : <EyeOff size={14} aria-hidden="true" />}
        Labels
      </button>
      <button
        type="button"
        onClick={resetViewState}
        className="flex items-center gap-1.5 rounded-full border border-bench-700 bg-bench-900/80 px-3 py-1.5 text-xs font-medium text-bench-200 backdrop-blur hover:border-bench-500"
      >
        <RotateCcw size={14} aria-hidden="true" />
        Reset View
      </button>
    </div>
  )
}
