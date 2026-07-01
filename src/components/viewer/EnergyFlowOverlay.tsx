import { Zap } from "lucide-react"
import { useViewerStore } from "@/store/viewerStore"
import { listPartsForMovement } from "@/utils/partLookup"

export function EnergyFlowOverlay() {
  const viewerMode = useViewerStore((state) => state.viewerMode)
  const movementType = useViewerStore((state) => state.movementType)
  const selectPart = useViewerStore((state) => state.selectPart)

  if (viewerMode !== "energy") return null

  const flowParts = listPartsForMovement(movementType)
    .filter((part) => part.energyFlowOrder !== undefined)
    .sort((a, b) => (a.energyFlowOrder ?? 0) - (b.energyFlowOrder ?? 0))

  return (
    <div className="pointer-events-auto absolute left-3 top-3 flex max-w-xs flex-col gap-2 rounded-lg border border-bench-700 bg-bench-900/90 p-3 backdrop-blur">
      <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brass-300">
        <Zap size={14} aria-hidden="true" />
        Energy Flow
      </h3>
      <ol className="flex flex-col gap-1">
        {flowParts.map((part, index) => (
          <li key={part.id}>
            <button
              type="button"
              onClick={() => selectPart(part.id)}
              className="flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left text-xs text-bench-200 hover:bg-bench-800 hover:text-brass-200"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brass-400/20 text-[10px] text-brass-300">
                {index + 1}
              </span>
              {part.label}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
