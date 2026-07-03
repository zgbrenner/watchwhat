import type { MovementType, WatchPart } from "@/types/watch"
import { automaticParts } from "./automaticParts"
import { watchParts } from "./watchParts"

export const partCatalog: WatchPart[] = [...watchParts, ...automaticParts]

export function getCatalogPartById(id: string): WatchPart | undefined {
  return partCatalog.find((part) => part.id === id)
}

export function getCatalogPartsForMovement(movementType: MovementType): WatchPart[] {
  return partCatalog.filter((part) => part.movementTypes.includes(movementType))
}
