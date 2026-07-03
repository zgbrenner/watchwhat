import { Link2, Zap } from "lucide-react"
import { useViewerStore } from "@/store/viewerStore"
import { listPartsForMovement } from "@/utils/partLookup"

const FLOW_COPY = {
  mechanical:
    "Energy starts in the mainspring, passes through the gear train, is metered by the escapement, and reaches the hands.",
  quartz:
    "The battery feeds the timing circuit, the quartz crystal supplies a steady timing signal, and the motor advances the gears and hands.",
  exterior:
    "Exterior mode maps assembly relationships: strap to spring bars, spring bars to lugs, crystal and bezel to case, and crown to the movement inside.",
}

export function EnergyFlowOverlay() {
  const viewerMode = useViewerStore((state) => state.viewerMode)
  const movementType = useViewerStore((state) => state.movementType)
  const selectedPartId = useViewerStore((state) => state.selectedPartId)
  const selectPart = useViewerStore((state) => state.selectPart)

  if (viewerMode !== "energy") return null

  const flowParts = listPartsForMovement(movementType)
    .filter((part) => part.energyFlowOrder !== undefined)
    .sort((a, b) => (a.energyFlowOrder ?? 0) - (b.energyFlowOrder ?? 0))

  const isExterior = movementType === "exterior"
  const Icon = isExterior ? Link2 : Zap
  const title = isExterior ? "Assembly Map" : "Energy Flow"
  const description =
    movementType === "quartz" ? FLOW_COPY.quartz : isExterior ? FLOW_COPY.exterior : FLOW_COPY.mechanical

  return (
    <div className="pointer-events-auto absolute left-3 top-3 flex max-w-sm flex-col gap-3 rounded-xl border border-bench-700 bg-bench-900/92 p-3 shadow-2xl shadow-black/25 backdrop-blur">
      <div>
        <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brass-300">
          <Icon size={14} aria-hidden="true" />
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-bench-300">{description}</p>
      </div>

      {flowParts.length > 0 ? (
        <ol className="flex flex-col gap-1">
          {flowParts.map((part, index) => {
            const isSelected = selectedPartId === part.id
            return (
              <li key={part.id}>
                <button
                  type="button"
                  onClick={() => selectPart(part.id)}
                  className={`flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left text-xs transition ${
                    isSelected
                      ? "bg-brass-400/15 text-brass-100"
                      : "text-bench-200 hover:bg-bench-800 hover:text-brass-200"
                  }`}
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brass-400/20 text-[10px] text-brass-300">
                    {index + 1}
                  </span>
                  <span>{part.label}</span>
                </button>
              </li>
            )
          })}
        </ol>
      ) : (
        <p className="rounded-lg border border-bench-700 bg-bench-950/70 p-2 text-xs text-bench-300">
          This mode has no ordered path yet. Use it as an assembly relationship view for now.
        </p>
      )}
    </div>
  )
}