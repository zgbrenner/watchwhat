import { Box, Focus, Layers, Wrench, Zap } from "lucide-react"
import { useViewerStore } from "@/store/viewerStore"
import type { ViewerMode } from "@/types/watch"

const MODE_ICONS: Record<ViewerMode, typeof Box> = {
  assembled: Box,
  exploded: Layers,
  teardown: Wrench,
  energy: Zap,
  isolate: Focus,
}

const MODE_LABELS: Record<ViewerMode, string> = {
  assembled: "Assembled",
  exploded: "Exploded",
  teardown: "Teardown",
  energy: "Energy Flow",
  isolate: "Isolate",
}

const MODE_ORDER: ViewerMode[] = ["assembled", "exploded", "teardown", "energy", "isolate"]

export function ModeSwitcher() {
  const viewerMode = useViewerStore((state) => state.viewerMode)
  const setViewerMode = useViewerStore((state) => state.setViewerMode)

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-bench-800 bg-bench-900/70 p-1 shadow-lg shadow-black/20"
      role="radiogroup"
      aria-label="Viewer mode"
    >
      {MODE_ORDER.map((mode) => {
        const Icon = MODE_ICONS[mode]
        const isActive = viewerMode === mode
        return (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setViewerMode(mode)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              isActive
                ? "bg-brass-400/15 text-brass-200 shadow-sm ring-1 ring-brass-400/40"
                : "text-bench-300 hover:bg-bench-800/70 hover:text-bench-100"
            }`}
          >
            <Icon size={14} aria-hidden="true" />
            <span className="hidden sm:inline">{MODE_LABELS[mode]}</span>
          </button>
        )
      })}
    </div>
  )
}
