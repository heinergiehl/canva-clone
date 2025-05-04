import { RefObject } from "react"

import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export function ElementsSection({
  search,
  onSearch,
  icons,
  loading,
  error,
  loadMoreRef,
  onSelect,
  isFetchingNextPage,
}: {
  search: string
  onSearch: (s: string) => void
  icons: { id: string; previewURL: string; svgURL: string }[]
  loading: boolean
  error: boolean
  loadMoreRef: RefObject<HTMLDivElement | null>
  onSelect: (url: string) => void
  isFetchingNextPage: boolean
}) {
  return (
    <section className="flex flex-col bg-gray-50 px-4   border-r-1 border-gray-300  w-[40dvw]  md:w-[35dvw] lg:w-[20dvw] ">
      <h1 className="text-2xl font-semibold mb-4">Elements</h1>
      <Input
        placeholder="Search shapes…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="mb-4 max-w-sm w-full"
      />
      {loading && (
        <div className="flex items-center justify-start">
          <Loader2 className="animate-spin text-gray-500 w-10 h-10 b" />
          <span className="text-gray-500 text-sm">Loading icons…</span>
        </div>
      )}
      {error && <p className="text-red-500">Error loading icons.</p>}
      <ScrollArea className="h-[76dvh] w-full" type="always">
        <div className="flex flex-wrap gap-2">
          {icons.map(({ id, previewURL, svgURL }, index) => (
            <Image
              key={index}
              src={previewURL}
              alt={id}
              width={100}
              height={100}
              className="w-[52px] h-auto object-contain cursor-pointer border hover:ring-2 ring-indigo-300 transition"
              onClick={() => onSelect(svgURL)}
            />
          ))}
        </div>
        <div ref={loadMoreRef} className="h-1" />
        {isFetchingNextPage && (
          <Loader2 className="animate-spin text-gray-500 w-10 h-10 mx-auto mt-2" />
        )}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </section>
  )
}
