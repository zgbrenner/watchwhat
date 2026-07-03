import { AlertTriangle, HelpCircle, Link2, Route } from "lucide-react"
import { getPartById } from "@/data/watchParts"
import { useViewerStore } from "@/store/viewerStore"
import { getConnectedParts } from "@/utils/partLookup"

export function PartInfoPanel() {
  const selectedPartId = useViewerStore((state) => state.selectedPartId)
  const selectPart = useViewerStore((state) => state.selectPart)
  const part = selectedPartId ? getPartById(selectedPartId) : undefined

  if (!part) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-sm text-bench-400">
        <div className="rounded-full border border-bench-700 bg-bench-900 px-3 py-1 text-[10px] uppercase tracking-wide text-bench-300">
          WatchWhat Bench
        </div>
        <p>Click a part of the watch to learn what it is, what it does, and how it fits into the whole mechanism.</p>
      </div>
    )
  }

  const connectedParts = getConnectedParts(part.id)

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-brass-400">
          {part.category}
        </span>
        <h2 className="text-lg font-semibold text-bench-50">{part.label}</h2>
        <p className="mt-1 text-sm text-bench-300">{part.shortDefinition}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-bench-700 bg-bench-900 p-2">
          <span className="block text-[10px] uppercase tracking-wide text-bench-500">Teardown</span>
          <span className="text-bench-100">Step {part.disassemblyStep}</span>
        </div>
        <div className="rounded-lg border border-bench-700 bg-bench-900 p-2">
          <span className="block text-[10px] uppercase tracking-wide text-bench-500">Flow</span>
          <span className="text-bench-100">
            {part.energyFlowOrder === undefined ? "Not in path" : `Order ${part.energyFlowOrder + 1}`}
          </span>
        </div>
      </div>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-bench-400">Function</h3>
        <p className="mt-1 text-sm text-bench-100">{part.function}</p>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-bench-400">
          How It Works
        </h3>
        <p className="mt-1 text-sm text-bench-100">{part.howItWorks}</p>
      </section>

      {connectedParts.length > 0 && (
        <section>
          <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-bench-400">
            <Link2 size={14} aria-hidden="true" />
            Connects To
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {connectedParts.map((connected) => (
              <button
                key={connected.id}
                type="button"
                onClick={() => selectPart(connected.id)}
                className="rounded-full border border-bench-700 bg-bench-900 px-2.5 py-1 text-xs text-bench-200 hover:border-brass-400 hover:text-brass-200"
              >
                {connected.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {part.energyFlowOrder !== undefined && (
        <section className="rounded-lg border border-brass-700/50 bg-brass-950/20 p-3">
          <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brass-300">
            <Route size={14} aria-hidden="true" />
            System Role
          </h3>
          <p className="mt-1 text-sm text-bench-100">
            This part appears in the ordered power or timing path. Switch to Energy Flow to see where it sits in the sequence.
          </p>
        </section>
      )}

      {part.failureMode && (
        <section className="rounded-lg border border-amber-800/50 bg-amber-950/30 p-3">
          <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-400">
            <AlertTriangle size={14} aria-hidden="true" />
            Failure Mode
          </h3>
          <p className="mt-1 text-sm text-amber-100">{part.failureMode}</p>
        </section>
      )}

      {part.quizPrompt && (
        <section className="rounded-lg border border-bench-700 bg-bench-900 p-3">
          <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-bench-400">
            <HelpCircle size={14} aria-hidden="true" />
            Quiz
          </h3>
          <p className="mt-1 text-sm text-bench-100">{part.quizPrompt}</p>
        </section>
      )}
    </div>
  )
}