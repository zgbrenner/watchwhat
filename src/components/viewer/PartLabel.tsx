import { Html } from "@react-three/drei"

type PartLabelProps = {
  label: string
  highlighted?: boolean
}

export function PartLabel({ label, highlighted = false }: PartLabelProps) {
  return (
    <Html center distanceFactor={2.4} zIndexRange={[10, 0]}>
      <span
        className={`pointer-events-none whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-semibold shadow-lg backdrop-blur-sm ${
          highlighted
            ? "border-brass-300 bg-brass-400 text-bench-950"
            : "border-bench-700 bg-bench-900/85 text-bench-50"
        }`}
      >
        {label}
      </span>
    </Html>
  )
}
