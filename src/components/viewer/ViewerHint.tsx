import { useEffect, useState } from "react"
import { Hand, Layers, MousePointerClick } from "lucide-react"
import { useViewerStore } from "@/store/viewerStore"

/**
 * A lightweight first-run coach mark. It only appears on the default
 * assembled view with nothing selected, and latches off for the session the
 * first time the user selects a part or leaves the assembled view.
 */
export function ViewerHint() {
  const viewerMode = useViewerStore((state) => state.viewerMode)
  const selectedPartId = useViewerStore((state) => state.selectedPartId)
  const [dismissed, setDismissed] = useState(false)

  useEffect(
    () =>
      useViewerStore.subscribe((state) => {
        if (state.selectedPartId || state.viewerMode !== "assembled") setDismissed(true)
      }),
    [],
  )

  if (dismissed || viewerMode !== "assembled" || selectedPartId) return null

  return (
    <div className="ww-animate-in pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
      <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-bench-700/80 bg-bench-900/70 px-5 py-2.5 text-xs text-bench-200 shadow-xl shadow-black/40 backdrop-blur-md">
        <span className="flex items-center gap-1.5">
          <Hand size={14} className="text-brass-300" aria-hidden="true" />
          Drag to orbit
        </span>
        <span className="h-3 w-px bg-bench-700" aria-hidden="true" />
        <span className="flex items-center gap-1.5">
          <MousePointerClick size={14} className="text-brass-300" aria-hidden="true" />
          Click a part
        </span>
        <span className="h-3 w-px bg-bench-700" aria-hidden="true" />
        <span className="flex items-center gap-1.5">
          <Layers size={14} className="text-brass-300" aria-hidden="true" />
          Explode to look inside
        </span>
      </div>
    </div>
  )
}
