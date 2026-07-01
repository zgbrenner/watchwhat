import { Cog, RotateCw, Watch, Zap } from "lucide-react"
import { movementConfigs } from "@/data/movementConfigs"
import { useViewerStore } from "@/store/viewerStore"
import type { MovementType } from "@/types/watch"

const MOVEMENT_ICONS: Record<MovementType, typeof Cog> = {
  manual: Cog,
  automatic: RotateCw,
  quartz: Zap,
  exterior: Watch,
}

const MOVEMENT_ORDER: MovementType[] = ["manual", "automatic", "quartz", "exterior"]

export function MovementPicker() {
  const movementType = useViewerStore((state) => state.movementType)
  const setMovementType = useViewerStore((state) => state.setMovementType)

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-bench-300">
        Movement Type
      </h2>
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Movement type">
        {MOVEMENT_ORDER.map((type) => {
          const config = movementConfigs[type]
          const Icon = MOVEMENT_ICONS[type]
          const isActive = movementType === type
          return (
            <button
              key={type}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setMovementType(type)}
              className={`flex flex-col items-start gap-1 rounded-lg border px-3 py-2 text-left transition-colors ${
                isActive
                  ? "border-brass-400 bg-brass-400/10 text-brass-200"
                  : "border-bench-700 bg-bench-900 text-bench-200 hover:border-bench-500"
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              <span className="text-sm font-medium">{config.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
