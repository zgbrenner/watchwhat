import { PartMesh } from "@/components/viewer/PartMesh"
import { getTransformForPart, listPartsForMovement } from "@/utils/partLookup"

export function MechanicalAutomaticModel() {
  const parts = listPartsForMovement("automatic")

  return (
    <group>
      {parts.map((part) => {
        const transform = getTransformForPart("automatic", part.id)
        if (!transform) return null
        return <PartMesh key={part.id} part={part} transform={transform} />
      })}
    </group>
  )
}
