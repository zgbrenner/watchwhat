import { Html } from "@react-three/drei"

type PartLabelProps = {
  label: string
  highlighted?: boolean
}

export function PartLabel({ label, highlighted = false }: PartLabelProps) {
  return (
    <Html center distanceFactor={2.2} zIndexRange={[10, 0]}>
      <span
        className={`pointer-events-none whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium shadow-sm ${
          highlighted
            ? "border-brass-400 bg-brass-400/90 text-bench-950"
            : "border-bench-700 bg-bench-900/90 text-bench-100"
        }`}
      >
        {label}
      </span>
    </Html>
  )
}
