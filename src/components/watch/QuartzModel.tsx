import { PartMesh } from "@/components/viewer/PartMesh"
import { getTransformForPart, listPartsForMovement } from "@/utils/partLookup"

export function QuartzModel() {
  const parts = listPartsForMovement("quartz")

  return (
    <group>
      {parts.map((part) => {
        const transform = getTransformForPart("quartz", part.id)
        if (!transform) return null
        return <PartMesh key={part.id} part={part} transform={transform} />
      })}
    </group>
  )
}
