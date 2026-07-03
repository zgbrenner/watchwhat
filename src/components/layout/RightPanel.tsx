import { PartInfoPanel } from "@/components/panels/PartInfoPanel"

export function RightPanel() {
  return (
    <aside className="w-full flex-shrink-0 overflow-y-auto border-t border-bench-800/70 bg-bench-950/40 backdrop-blur-xl md:h-full md:w-80 md:border-t-0 md:border-l">
      <PartInfoPanel />
    </aside>
  )
}
