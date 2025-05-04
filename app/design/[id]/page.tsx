"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { IText } from "fabric"
import { debounce } from "lodash"
import { trpc } from "@/app/_trpc/client"
import { useCanvasStore } from "@/lib/canvas-store"
import * as fabric from "fabric"

import { CanvasContainer } from "@/components/canvas"
import { EditActionsBar } from "@/components/edit-actions-bar"

declare module "fabric" {
  interface CanvasEvents {
    "canvas:modified": Partial<fabric.TEvent> & {
      target: fabric.FabricObject
      anydata: string
    }
  }
}
export default function DesignPage() {
  const { id } = useParams()
  const { data: design, isSuccess } = trpc.design.getDesign.useQuery({
    id: Number(id),
  })
  const updateDesign = trpc.design.updateDesign.useMutation()

  const canvas = useCanvasStore.getState().canvas

  // toolbar state
  const [activeObj, setActiveObj] = useState<fabric.Object | null>(null)

  // text state
  const [fontFamily, setFontFamily] = useState("Arial")
  const [fontSize, setFontSize] = useState(16)
  const [fontColor, setFontColor] = useState("#000000")
  const [textStrokeColor, setTextStrokeColor] = useState("#000000")
  const [textStrokeWidth, setTextStrokeWidth] = useState(0)

  // image state
  const [opacity, setOpacity] = useState(1)

  // shape state
  const [shapeFill, setShapeFill] = useState("#000000")
  const [shapeStroke, setShapeStroke] = useState("#000000")
  const [shapeStrokeWidth, setShapeStrokeWidth] = useState(1)
  const [canvasBackground, setCanvasBackground] = useState("#ffffff")

  // auto-save
  useEffect(() => {
    if (!canvas || !design) return
    const saver = debounce(() => {
      console.log("saving...")
      const json: any = canvas.toDatalessJSON()
      json.background = canvas.backgroundColor ?? null

      const thumbDataUrl = canvas.toDataURL({
        format: "png",
        quality: 0.8,
        multiplier: 1,
      })

      updateDesign.mutate({
        id: design.id,
        canvas: json,
        designImage: thumbDataUrl,
      })
      console.log("saved")
    }, 1000)

    ;(
      [
        "object:added",
        "object:modified",
        "object:removed",
        "object:rotated",
        "object:scaling",
        "canvas:modified",
      ] as (keyof fabric.CanvasEvents)[]
    ).forEach((evt) => canvas.on(evt, saver))

    return () => {
      ;(
        [
          "object:added",
          "object:modified",
          "object:removed",
          "object:rotated",
          "object:scaled",
          "canvas:modified",
        ] as (keyof fabric.CanvasEvents)[]
      ).forEach((evt) => canvas.off(evt, saver))

      saver.cancel()
    }
  }, [canvas, design])
  const editActionsBarRef = React.useRef<HTMLDivElement>(null)
  if (!isSuccess) return null

  return (
    <main className="max-w-[43dvw] md:max-w-[48dvw] lg:max-w-[61dvw] lg:w-full  p-4 rounded-md ">
      <div
        className=" flex flex-col items-center justify-between lg:justify-center p-4 "
        ref={editActionsBarRef}
      >
        {/* fixed-height toolbar placeholder */}

        <EditActionsBar
          activeObj={activeObj}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontColor={fontColor}
          textStrokeColor={textStrokeColor}
          textStrokeWidth={textStrokeWidth}
          opacity={opacity}
          shapeFill={shapeFill}
          shapeStroke={shapeStroke}
          shapeStrokeWidth={shapeStrokeWidth}
          onFontFamilyChange={(f) => {
            if (activeObj instanceof IText) activeObj.set("fontFamily", f)
            setFontFamily(f)
            canvas?.requestRenderAll()
          }}
          onFontSizeChange={(s) => {
            if (activeObj instanceof IText) {
              activeObj.set("fontSize", s)
              activeObj.setCoords()
            }
            setFontSize(s)
            canvas?.fire("object:modified", {
              target: activeObj!,
            })
            canvas?.requestRenderAll()
          }}
          onFontColorChange={(c) => {
            if (activeObj instanceof IText) activeObj.set("fill", c)
            setFontColor(c)
            canvas?.requestRenderAll()
            canvas?.fire("object:modified", {
              target: activeObj!,
            })
          }}
          onTextStrokeColorChange={(c) => {
            if (activeObj instanceof IText) activeObj.set("stroke", c)
            setTextStrokeColor(c)
            canvas?.requestRenderAll()
            canvas?.fire("object:modified", {
              target: activeObj!,
            })
          }}
          onTextStrokeWidthChange={(w) => {
            if (activeObj instanceof IText) activeObj.set("strokeWidth", w)
            setTextStrokeWidth(w)
            canvas?.requestRenderAll()
            canvas?.fire("object:modified", {
              target: activeObj!,
            })
          }}
          onOpacityChange={(o) => {
            if (activeObj) {
              activeObj.dirty = true
              activeObj.set("opacity", o)
              setOpacity(o)
              activeObj?.setCoords()
              canvas?.requestRenderAll()
              canvas?.fire("object:modified", {
                target: activeObj!,
              })
            }
          }}
          onShapeFillChange={(c) => {
            if (activeObj) {
              activeObj.set("fill", c)
              console.log(activeObj, "fill", c)
              setShapeFill(c)
              canvas?.requestRenderAll()
              canvas?.fire("object:modified", {
                target: activeObj!,
              })
            }
          }}
          onShapeStrokeChange={(c) => {
            if (activeObj) activeObj.set("stroke", c)
            setShapeStroke(c)
            canvas?.requestRenderAll()
            canvas?.fire("object:modified", {
              target: activeObj!,
            })
          }}
          onShapeStrokeWidthChange={(w) => {
            if (activeObj) activeObj.set("strokeWidth", w)
            setShapeStrokeWidth(w)
            canvas?.requestRenderAll()
          }}
          onCanvasBackgroundChange={(bg) => {
            canvas?.set({ backgroundColor: bg })
            setCanvasBackground(bg)

            canvas?.requestRenderAll()
            canvas?.fire("canvas:modified")
            console.log("canvas background changed", bg)
          }}
        />
      </div>
      <div className="w-full flex justify-center ">
        {/* canvas itself */}
        <CanvasContainer
          toolbarRef={editActionsBarRef}
          width={design.width}
          height={design.height}
          canvasState={design.canvas!}
          onSelectionChange={setActiveObj}
          onTextSync={(o) => {
            setFontFamily((o.fontFamily as string) || "Arial")
            setFontSize(o.fontSize ?? 16)
            setFontColor(o.fill?.toString() || "#000000")
            setTextStrokeColor(o.stroke?.toString() || "#000000")
            setTextStrokeWidth(o.strokeWidth ?? 0)
          }}
          onImageShapeSync={(o) => {
            setOpacity(o.opacity ?? 1)
            setShapeFill((o.fill as string) || "#000000")
            setShapeStroke((o.stroke as string) || "#000000")
            setShapeStrokeWidth(o.strokeWidth ?? 1)
          }}
          onCanvasBackgroundChange={(bg) => {}}
        />
      </div>
    </main>
  )
}
