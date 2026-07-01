import { Watch } from "lucide-react"
import { ModeSwitcher } from "@/components/panels/ModeSwitcher"

export function TopBar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-bench-800 bg-bench-900/60 px-4 py-3">
      <div className="flex items-center gap-2">
        <Watch size={22} className="text-brass-400" aria-hidden="true" />
        <span className="text-base font-semibold tracking-tight text-bench-50">WatchWhat</span>
      </div>
      <ModeSwitcher />
    </header>
  )
}
