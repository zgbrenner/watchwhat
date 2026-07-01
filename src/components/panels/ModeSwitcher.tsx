import { Box, Focus, HelpCircle, Layers, Wrench, Zap } from "lucide-react"
import { useViewerStore } from "@/store/viewerStore"
import type { ViewerMode } from "@/types/watch"

const MODE_ICONS: Record<ViewerMode, typeof Box> = {
  assembled: Box,
  exploded: Layers,
  teardown: Wrench,
  energy: Zap,
  isolate: Focus,
  quiz: HelpCircle,
}

const MODE_LABELS: Record<ViewerMode, string> = {
  assembled: "Assembled",
  exploded: "Exploded",
  teardown: "Teardown",
  energy: "Energy Flow",
  isolate: "Isolate",
  quiz: "Quiz",
}

const MODE_ORDER: ViewerMode[] = ["assembled", "exploded", "teardown", "energy", "isolate", "quiz"]

export function ModeSwitcher() {
  const viewerMode = useViewerStore((state) => state.viewerMode)
  const setViewerMode = useViewerStore((state) => state.setViewerMode)

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-bench-300">View Mode</h2>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Viewer mode">
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
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "border-brass-400 bg-brass-400/10 text-brass-200"
                  : "border-bench-700 bg-bench-900 text-bench-200 hover:border-bench-500"
              }`}
            >
              <Icon size={14} aria-hidden="true" />
              {MODE_LABELS[mode]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
