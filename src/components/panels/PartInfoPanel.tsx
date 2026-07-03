import { AlertTriangle, HelpCircle, Link2, Route, X } from "lucide-react"
import { useViewerStore } from "@/store/viewerStore"
import type { WatchPartCategory } from "@/types/watch"
import { getConnectedParts, getPartById } from "@/utils/partLookup"

const CATEGORY_STYLES: Record<WatchPartCategory, string> = {
  case: "bg-slate-400/15 text-slate-200 ring-slate-400/30",
  dial: "bg-amber-400/15 text-amber-200 ring-amber-400/30",
  movement: "bg-brass-400/15 text-brass-200 ring-brass-400/30",
  power: "bg-orange-400/15 text-orange-200 ring-orange-400/30",
  regulation: "bg-sky-400/15 text-sky-200 ring-sky-400/30",
  display: "bg-rose-400/15 text-rose-200 ring-rose-400/30",
  strap: "bg-stone-400/15 text-stone-200 ring-stone-400/30",
  electronics: "bg-emerald-400/15 text-emerald-200 ring-emerald-400/30",
  setting: "bg-violet-400/15 text-violet-200 ring-violet-400/30",
}

export function PartInfoPanel() {
  const selectedPartId = useViewerStore((state) => state.selectedPartId)
  const selectPart = useViewerStore((state) => state.selectPart)
  const hoverPart = useViewerStore((state) => state.hoverPart)
  const part = selectedPartId ? getPartById(selectedPartId) : undefined

  if (!part) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-bench-800 bg-bench-900/60">
          <Route size={22} className="text-brass-400/80" aria-hidden="true" />
        </div>
        <div className="rounded-full border border-bench-700 bg-bench-900 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-bench-400">
          WatchWhat Bench
        </div>
        <p className="max-w-[15rem] text-sm leading-relaxed text-bench-400">
          Click a part of the watch to learn what it is, what it does, and how it fits into the whole mechanism.
        </p>
      </div>
    )
  }

  const connectedParts = getConnectedParts(part.id)

  return (
    <div className="ww-animate-in flex h-full flex-col gap-5 overflow-y-auto p-5" key={part.id}>
      <div>
        <div className="flex items-start justify-between gap-2">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${CATEGORY_STYLES[part.category]}`}
          >
            {part.category}
          </span>
          <button
            type="button"
            onClick={() => selectPart(null)}
            aria-label="Close part details"
            className="rounded-full p-1 text-bench-500 transition hover:bg-bench-800 hover:text-bench-200"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-bench-50">{part.label}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-bench-300">{part.shortDefinition}</p>
      </div>

      <section className="rounded-xl border border-bench-800 bg-bench-900/40 p-3.5">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brass-300/90">Function</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-bench-100">{part.function}</p>
      </section>

      <section className="rounded-xl border border-bench-800 bg-bench-900/40 p-3.5">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brass-300/90">How It Works</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-bench-100">{part.howItWorks}</p>
      </section>

      {connectedParts.length > 0 && (
        <section>
          <h3 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-bench-400">
            <Link2 size={13} aria-hidden="true" />
            Connects To
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {connectedParts.map((connected) => (
              <button
                key={connected.id}
                type="button"
                onClick={() => selectPart(connected.id)}
                onMouseEnter={() => hoverPart(connected.id)}
                onMouseLeave={() => hoverPart(null)}
                className="rounded-full border border-bench-700 bg-bench-900 px-2.5 py-1 text-xs text-bench-200 transition hover:border-brass-400 hover:bg-brass-400/10 hover:text-brass-200"
              >
                {connected.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {part.energyFlowOrder !== undefined && (
        <section className="rounded-xl border border-brass-700/40 bg-brass-500/[0.06] p-3.5">
          <h3 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brass-300">
            <Route size={13} aria-hidden="true" />
            System Role
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-bench-200">
            This part sits in the ordered power or timing path. Switch to Energy Flow to see exactly where in the sequence it falls.
          </p>
        </section>
      )}

      {part.failureMode && (
        <section className="rounded-xl border border-amber-800/40 bg-amber-950/25 p-3.5">
          <h3 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-400">
            <AlertTriangle size={13} aria-hidden="true" />
            Failure Mode
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-amber-100/90">{part.failureMode}</p>
        </section>
      )}

      {part.quizPrompt && (
        <section className="mt-auto rounded-xl border border-bench-800 bg-bench-950/60 p-3.5">
          <h3 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-bench-400">
            <HelpCircle size={13} aria-hidden="true" />
            Test Yourself
          </h3>
          <p className="mt-1.5 text-sm italic leading-relaxed text-bench-300">{part.quizPrompt}</p>
        </section>
      )}
    </div>
  )
}
