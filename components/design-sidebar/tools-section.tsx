import { XIcon } from "lucide-react"
import { Button } from "../ui/button"
import { SidebarTab, toolItems, ToolTab } from "./config"
import { DrawToolbar } from "./draw-toolbar"
import { cn } from "@/lib/utils"
import { useCanvasStore } from "@/lib/canvas-store"
import { useEffect } from "react"

export function ToolsSection({
  activeTool,
  onChangeTool,
  onChangeActiveSidebarTab,
  activeSibarTab,
}: {
  activeTool: ToolTab
  onChangeTool: (t: ToolTab) => void
  onChangeActiveSidebarTab: (t: SidebarTab) => void
  activeSibarTab: SidebarTab
}) {
  const setDraw = useCanvasStore((s) => s.setDrawTool)
  const close = () => onChangeTool("Select")
  const drawTool = useCanvasStore((s) => s.drawTool)
  const canvas = useCanvasStore((s) => s.canvas)

  useEffect(() => {
    if (activeTool === "Select") {
      if (canvas) {
        canvas.isDrawingMode = false
        canvas.selection = true
      }
    }
    if (activeTool === "Draw" && drawTool !== "Eraser") {
      setDraw(drawTool)
      if (canvas) {
        canvas.selection = false
        canvas.isDrawingMode = true
      }
    } else {
      if (canvas) {
        canvas.selection = false
        canvas.isDrawingMode = false
        canvas.hoverCursor = "move"
      }
    }

    return () => {
      if (canvas) canvas.isDrawingMode = false
    }
  }, [drawTool, canvas, setDraw, activeTool])
  return (
    <section className="h-full flex items-center z-10  w-[120px]">
      {/* shift everything right so it sits next to the sidebar */}
      <div className="flex flex-col items-start space-y-4 fixed ">
        {/* close button */}
        {drawTool}
        <Button
          size="icon"
          variant="ghost"
          onClick={close}
          className="bg-white rounded-full shadow-[0_0_0_1px_rgba(64,87,109,0.04),0_6px_20px_-4px_rgba(64,87,109,0.3)]"
        >
          <XIcon className="w-6 h-6" />
        </Button>

        {/* tools + optional DrawToolbar */}
        <div className="flex items-center justify-center  ">
          {/* vertical list of tool buttons */}
          <div className="flex flex-col items-center justify-center  space-y-3 bg-white p-3 rounded-xl z-20 shadow-lg">
            {toolItems.map(({ label, icon: Icon }) => (
              <Button
                key={label}
                size="icon"
                variant="ghost"
                onClick={() => {
                  onChangeTool(label)
                  if (label === "Shapes") {
                    onChangeActiveSidebarTab("Elements")
                  }
                }}
                className={cn(
                  "p-1 transition-colors duration-150 ease-out",
                  label === activeTool
                    ? "bg-[rgba(165,112,255,0.15)] text-purple-500"
                    : "hover:bg-gray-200"
                )}
              >
                <Icon />
              </Button>
            ))}
          </div>

          {/* only render DrawToolbar if Draw is active */}
          {activeTool === "Draw" && (
            <DrawToolbar
              onSelect={(tool) => {
                setDraw(tool)
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
