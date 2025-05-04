// src/components/DesignSidebar.tsx
"use client"

import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  RefObject,
  useMemo,
} from "react"
import { trpc } from "@/app/_trpc/client"

import { useCanvasStore } from "@/lib/canvas-store"

import { SidebarTab, ToolTab } from "./config"
import { SidebarTabs } from "./sidebar-tabs"
import { ElementsSection } from "./elements-section"
import { TextSection } from "./text-section"
import { ToolsSection } from "./tools-section"

/** ─── CUSTOM HOOKS ─────────────────────────────────────── */
function useDebounced<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value)
  useEffect(() => {
    const h = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(h)
  }, [value, delay])
  return debounced
}

function useInfiniteScroll(
  ref: RefObject<HTMLElement | null>,
  fetchMore: () => void,
  hasMore: boolean
) {
  useEffect(() => {
    if (!hasMore || !ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && fetchMore(),
      { rootMargin: "200px" }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, fetchMore, hasMore])
}

/** ─── MAIN COMPONENT ─────────────────────────────────────── */
export function DesignSidebar() {
  const [activeTab, setActiveTab] = useState<SidebarTab>("Design")
  const setActiveToolTab = useCanvasStore((s) => s.setTool)
  const activeToolTab = useCanvasStore((s) => s.toolTab)
  const [search, setSearch] = useState("dog")
  const debouncedSearch = useDebounced(search, 300)

  const addSVG = useCanvasStore((s) => s.addSVG)
  const addText = useCanvasStore((s) => s.addText)

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.icons.search.useInfiniteQuery(
    { q: debouncedSearch },
    {
      getNextPageParam: (last) => last.nextCursor,
      enabled: activeTab === "Elements" && debouncedSearch.length > 0,
    }
  )

  const icons = useMemo(() => data?.pages.flatMap((p) => p.data) ?? [], [data])
  const loadMoreRef = useRef<HTMLDivElement>(null)
  useInfiniteScroll(loadMoreRef, fetchNextPage, hasNextPage)

  return (
    <div className=" flex  h-full">
      <SidebarTabs active={activeTab} onChange={setActiveTab} />
      <main className="overflow-auto ">
        {activeTab === "Design" && (
          <section className="px-4">
            <h1 className="text-2xl font-semibold mb-4">Design</h1>
            <p>This is your main design palette…</p>
          </section>
        )}
        {activeTab === "Elements" && (
          <ElementsSection
            search={search}
            onSearch={setSearch}
            icons={icons}
            loading={isLoading}
            error={isError}
            loadMoreRef={loadMoreRef}
            onSelect={addSVG}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
        {activeTab === "Text" && <TextSection onAddText={addText} />}
        {activeTab === "Brand" && (
          <section className="px-4">
            <h1 className="text-2xl font-semibold mb-4">Brand</h1>
            <p className="text-muted-foreground">Brand assets go here…</p>
          </section>
        )}
        {activeTab === "Tools" && (
          <ToolsSection
            onChangeActiveSidebarTab={setActiveTab}
            activeSibarTab={activeTab}
            setActiveTool={setActiveTab}
            activeTool={activeToolTab}
            onChangeTool={setActiveToolTab}
          />
        )}
      </main>
    </div>
  )
}
