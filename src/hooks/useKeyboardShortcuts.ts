import { useEffect } from "react"
import { useViewerStore } from "@/store/viewerStore"
import type { ViewerMode } from "@/types/watch"

const NUMBER_TO_MODE: Record<string, ViewerMode> = {
  "1": "assembled",
  "2": "exploded",
  "3": "teardown",
  "4": "energy",
  "5": "isolate",
}

/**
 * Global keyboard shortcuts for power users:
 *   1–5  switch view mode        Space  play / pause the movement
 *   L    toggle labels           Esc    clear the current selection
 *   ← →  step through teardown (when in teardown mode)
 * Ignores keystrokes while a text field is focused.
 */
export function useKeyboardShortcuts() {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const store = useViewerStore.getState()

      if (event.key in NUMBER_TO_MODE) {
        store.setViewerMode(NUMBER_TO_MODE[event.key])
        return
      }

      switch (event.key) {
        case " ":
          event.preventDefault()
          store.toggleRunning()
          break
        case "l":
        case "L":
          store.setShowLabels(!store.showLabels)
          break
        case "Escape":
          store.selectPart(null)
          break
        case "ArrowRight":
          if (store.viewerMode === "teardown") store.nextTeardownStep()
          break
        case "ArrowLeft":
          if (store.viewerMode === "teardown") store.previousTeardownStep()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])
}
