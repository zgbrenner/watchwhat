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
  const active = movementConfigs[movementType]

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-bench-400">
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
              className={`group flex flex-col items-start gap-2 rounded-xl border px-3 py-2.5 text-left transition-all ${
                isActive
                  ? "border-brass-400/60 bg-gradient-to-br from-brass-400/15 to-transparent text-brass-100 shadow-md shadow-black/30"
                  : "border-bench-800 bg-bench-900/50 text-bench-200 hover:border-bench-600 hover:bg-bench-900"
              }`}
            >
              <Icon
                size={18}
                aria-hidden="true"
                className={isActive ? "text-brass-300" : "text-bench-400 group-hover:text-bench-200"}
              />
              <span className="text-sm font-medium">{config.label}</span>
            </button>
          )
        })}
      </div>
      <div className="ww-animate-in rounded-xl border border-bench-800 bg-bench-900/50 p-3" key={movementType}>
        <p className="text-xs font-medium text-brass-200">{active.tagline}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-bench-400">{active.description}</p>
      </div>
    </div>
  )
}
