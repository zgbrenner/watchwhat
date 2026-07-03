import { PartInfoPanel } from "@/components/panels/PartInfoPanel"
import { QuizPanel } from "@/components/panels/QuizPanel"
import { useViewerStore } from "@/store/viewerStore"

export function RightPanel() {
  const viewerMode = useViewerStore((state) => state.viewerMode)

  return (
    <aside className="w-full flex-shrink-0 overflow-y-auto border-t border-bench-800 bg-bench-900/40 md:h-full md:w-80 md:border-t-0 md:border-l">
      {viewerMode === "quiz" ? <QuizPanel /> : <PartInfoPanel />}
    </aside>
  )
}
