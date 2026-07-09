import { AppShell } from "@/components/layout/AppShell"
import { WatchViewer } from "@/components/viewer/WatchViewer"
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts"

export function App() {
  useKeyboardShortcuts()

  return (
    <AppShell>
      <WatchViewer />
    </AppShell>
  )
}
