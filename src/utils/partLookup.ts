import { movementConfigs } from "@/data/movementConfigs"
import { getCatalogPartById, partCatalog } from "@/data/partCatalog"
import type { MovementType, PartTransform, WatchPart } from "@/types/watch"

/**
 * Returns every part that belongs to the given movement type, in
 * ascending disassembly order.
 */
export function listPartsForMovement(movementType: MovementType): WatchPart[] {
  return movementConfigs[movementType].partIds
    .map((id) => getCatalogPartById(id))
    .filter((part): part is WatchPart => part !== undefined)
}

/**
 * Looks up the transform (assembled/exploded position) for a part within
 * a specific movement config.
 */
export function getTransformForPart(
  movementType: MovementType,
  partId: string,
): PartTransform | undefined {
  return movementConfigs[movementType].transforms.find((transform) => transform.partId === partId)
}

/**
 * Returns the parts a given part connects to, resolved to full WatchPart
 * records (skipping any dangling IDs).
 */
export function getConnectedParts(partId: string): WatchPart[] {
  const part = getCatalogPartById(partId)
  if (!part) return []
  return part.connectsTo
    .map((id) => getCatalogPartById(id))
    .filter((connected): connected is WatchPart => connected !== undefined)
}

/**
 * Simple case-insensitive search across a part's label and short
 * definition, used by the part search panel.
 */
export function searchParts(query: string, movementType?: MovementType): WatchPart[] {
  const normalized = query.trim().toLowerCase()
  const scope = movementType ? listPartsForMovement(movementType) : partCatalog
  if (!normalized) return scope
  return scope.filter(
    (part) =>
      part.label.toLowerCase().includes(normalized) ||
      part.shortDefinition.toLowerCase().includes(normalized) ||
      part.id.toLowerCase().includes(normalized),
  )
}

export { getCatalogPartById as getPartById }
