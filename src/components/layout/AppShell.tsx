import type { ReactNode } from "react"
import { LeftPanel } from "./LeftPanel"
import { RightPanel } from "./RightPanel"
import { TopBar } from "./TopBar"

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen flex-col text-bench-50">
      <TopBar />
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <LeftPanel />
        <main className="relative flex-1 overflow-hidden">{children}</main>
        <RightPanel />
      </div>
    </div>
  )
}
