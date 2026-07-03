import { create } from "zustand"
import { teardownSteps } from "@/data/teardownSteps"
import type { MovementType, ViewerMode } from "@/types/watch"

export type ViewerState = {
  movementType: MovementType
  viewerMode: ViewerMode
  selectedPartId: string | null
  hoveredPartId: string | null
  teardownStep: number
  showLabels: boolean
  searchQuery: string
  isolatedPartId: string | null

  setMovementType: (movementType: MovementType) => void
  setViewerMode: (viewerMode: ViewerMode) => void
  selectPart: (partId: string | null) => void
  hoverPart: (partId: string | null) => void
  nextTeardownStep: () => void
  previousTeardownStep: () => void
  setTeardownStep: (stepIndex: number) => void
  setShowLabels: (showLabels: boolean) => void
  setSearchQuery: (searchQuery: string) => void
  resetViewState: () => void
}

const initialState = {
  movementType: "manual" as MovementType,
  viewerMode: "assembled" as ViewerMode,
  selectedPartId: null as string | null,
  hoveredPartId: null as string | null,
  teardownStep: 0,
  showLabels: true,
  searchQuery: "",
  isolatedPartId: null as string | null,
}

function lastTeardownStepIndex(movementType: MovementType): number {
  return Math.max(0, teardownSteps[movementType].length - 1)
}

function clampTeardownStep(movementType: MovementType, stepIndex: number): number {
  return Math.min(lastTeardownStepIndex(movementType), Math.max(0, stepIndex))
}

export const useViewerStore = create<ViewerState>((set, get) => ({
  ...initialState,

  setMovementType: (movementType) =>
    set({
      movementType,
      selectedPartId: null,
      hoveredPartId: null,
      isolatedPartId: null,
      teardownStep: 0,
    }),

  setViewerMode: (viewerMode) =>
    set((state) => ({
      viewerMode,
      isolatedPartId: viewerMode === "isolate" ? state.selectedPartId : null,
    })),

  selectPart: (partId) =>
    set((state) => ({
      selectedPartId: partId,
      isolatedPartId: state.viewerMode === "isolate" ? partId : state.isolatedPartId,
    })),

  hoverPart: (partId) => set({ hoveredPartId: partId }),

  nextTeardownStep: () => {
    const { movementType, teardownStep } = get()
    set({ teardownStep: clampTeardownStep(movementType, teardownStep + 1) })
  },

  previousTeardownStep: () => {
    const { movementType, teardownStep } = get()
    set({ teardownStep: clampTeardownStep(movementType, teardownStep - 1) })
  },

  setTeardownStep: (stepIndex) => {
    const { movementType } = get()
    set({ teardownStep: clampTeardownStep(movementType, stepIndex) })
  },

  setShowLabels: (showLabels) => set({ showLabels }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  resetViewState: () =>
    set({
      viewerMode: initialState.viewerMode,
      selectedPartId: initialState.selectedPartId,
      hoveredPartId: initialState.hoveredPartId,
      teardownStep: initialState.teardownStep,
      isolatedPartId: initialState.isolatedPartId,
      searchQuery: initialState.searchQuery,
    }),
}))