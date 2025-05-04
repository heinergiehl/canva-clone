import { useCanvasStore } from "@/lib/canvas-store"
import { drawTools, DrawTool } from "./config"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

export function DrawToolbar({
  onSelect,
}: {
  onSelect: (tool: DrawTool) => void
}) {
  const current = useCanvasStore((s) => s.drawTool)
  const setDraw = useCanvasStore((s) => s.setDrawTool)

  const drawTool = useCanvasStore((s) => s.drawTool)
  const canvas = useCanvasStore((s) => s.canvas)

  useEffect(() => {
    if (
      drawTool === "Pen" ||
      drawTool === "Marker" ||
      drawTool === "Highlighter"
    ) {
      if (canvas) {
        canvas.selection = false
        canvas.isDrawingMode = true
      }
    }
    if (canvas && drawTool === "Eraser") {
      canvas.isDrawingMode = false
      canvas.hoverCursor = "none"
      canvas.selection = false
    }
    return () => {
      if (canvas) {
        canvas.isDrawingMode = false
        canvas.hoverCursor = "move"
      }
    }
  }, [drawTool, canvas, setDraw, onSelect])
  return (
    <div className="w-[56px] flex flex-col space-y-2 bg-gray-50 p-2 rounded-lg shadow-lg">
      {drawTools.map(({ label, svg, color }) => (
        <button
          key={label}
          title={label}
          onClick={() => onSelect(label)}
          className={cn(
            "p-1 rounded-lg transition-all duration-400",
            current === label
              ? "translate-x-[-15px]  scale-110"
              : "translate-x-[-24px] hover:translate-x-[-20px]"
          )}
        >
          <span style={{ color }}>{svg}</span>
        </button>
      ))}
    </div>
  )
}
