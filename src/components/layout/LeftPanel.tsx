import { MovementPicker } from "@/components/panels/MovementPicker"
import { PartSearchPanel } from "@/components/panels/PartSearchPanel"

export function LeftPanel() {
  return (
    <aside className="flex w-full flex-col gap-6 overflow-y-auto border-b border-bench-800/70 bg-bench-950/40 p-5 backdrop-blur-xl md:w-72 md:border-b-0 md:border-r">
      <MovementPicker />
      <PartSearchPanel />
    </aside>
  )
}
