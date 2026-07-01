import { PartMesh } from "@/components/viewer/PartMesh"
import { getTransformForPart, listPartsForMovement } from "@/utils/partLookup"

export function MechanicalManualModel() {
  const parts = listPartsForMovement("manual")

  return (
    <group>
      {parts.map((part) => {
        const transform = getTransformForPart("manual", part.id)
        if (!transform) return null
        return <PartMesh key={part.id} part={part} transform={transform} />
      })}
    </group>
  )
}
