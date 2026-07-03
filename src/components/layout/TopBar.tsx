import { Watch } from "lucide-react"
import { ModeSwitcher } from "@/components/panels/ModeSwitcher"

export function TopBar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-bench-800/80 bg-bench-950/60 px-5 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brass-500/40 bg-gradient-to-br from-brass-400/25 to-brass-700/10 shadow-inner">
          <Watch size={20} className="text-brass-300" aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <span className="block text-[15px] font-semibold tracking-tight text-bench-50">
            Watch<span className="text-brass-300">What</span>
          </span>
          <span className="block text-[11px] text-bench-400">Interactive watch anatomy</span>
        </div>
      </div>
      <ModeSwitcher />
    </header>
  )
}
