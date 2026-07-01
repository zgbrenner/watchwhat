import { PartMesh } from "@/components/viewer/PartMesh"
import { getTransformForPart, listPartsForMovement } from "@/utils/partLookup"

export function ExteriorModel() {
  const parts = listPartsForMovement("exterior")

  return (
    <group>
      {parts.map((part) => {
        const transform = getTransformForPart("exterior", part.id)
        if (!transform) return null
        return <PartMesh key={part.id} part={part} transform={transform} />
      })}
    </group>
  )
}
