import { Search } from "lucide-react"
import { useViewerStore } from "@/store/viewerStore"
import { searchParts } from "@/utils/partLookup"

export function PartSearchPanel() {
  const searchQuery = useViewerStore((state) => state.searchQuery)
  const setSearchQuery = useViewerStore((state) => state.setSearchQuery)
  const movementType = useViewerStore((state) => state.movementType)
  const selectPart = useViewerStore((state) => state.selectPart)
  const hoverPart = useViewerStore((state) => state.hoverPart)

  const results = searchQuery.trim() ? searchParts(searchQuery, movementType) : []

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="part-search" className="text-xs font-semibold uppercase tracking-wide text-bench-300">
        Find a Part
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-bench-700 bg-bench-900 px-3 py-2">
        <Search size={16} className="text-bench-400" aria-hidden="true" />
        <input
          id="part-search"
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search parts (e.g. balance wheel)"
          className="w-full bg-transparent text-sm text-bench-50 outline-none placeholder:text-bench-500"
        />
      </div>
      {results.length > 0 && (
        <ul className="flex max-h-48 flex-col gap-1 overflow-y-auto">
          {results.map((part) => (
            <li key={part.id}>
              <button
                type="button"
                onClick={() => selectPart(part.id)}
                onMouseEnter={() => hoverPart(part.id)}
                onMouseLeave={() => hoverPart(null)}
                className="w-full rounded-md px-2 py-1.5 text-left text-sm text-bench-200 hover:bg-bench-800 hover:text-brass-200"
              >
                {part.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {searchQuery.trim() && results.length === 0 && (
        <p className="px-2 text-xs text-bench-500">No parts match "{searchQuery}".</p>
      )}
    </div>
  )
}
