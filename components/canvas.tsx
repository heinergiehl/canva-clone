"use client"

import React, { act, useEffect, useRef, useState } from "react"
import {
  Canvas,
  CanvasEvents,
  IText,
  Image as FabricImage,
  Object as FabricObject,
} from "fabric"
import * as fabric from "fabric"
import { useCanvasStore } from "@/lib/canvas-store"
import { cn } from "@/lib/utils"
import { wrap } from "lodash"

export type CanvasContainerProps = {
  width: number
  height: number
  canvasState: any
  onCanvasBackgroundChange: (color: string) => void
  onSelectionChange: (obj: FabricObject | null) => void
  onTextSync: (obj: IText) => void
  onImageShapeSync: (obj: FabricObject) => void
  toolbarRef: React.RefObject<HTMLDivElement | null>
}
const ERASER_CURSOR = "url('fabric/eraser.svg') 16 16, auto"
export function CanvasContainer({
  width,
  height,
  canvasState,
  onSelectionChange,
  onTextSync,
  onImageShapeSync,
  onCanvasBackgroundChange,
  toolbarRef,
}: CanvasContainerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const setCanvas = useCanvasStore((s) => s.setCanvas)
  const canvas = useCanvasStore((s) => s.canvas)
  const isCanvasSelected = useCanvasStore((s) => s.isCanvasSelected)
  const drawTool = useCanvasStore((s) => s.drawTool)
  const setCanvasAsSelected = useCanvasStore((s) => s.setCanvasAsSelected)
  const [cursor, setCursor] = useState("")
  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return

    // dispose prior instance
    const prev = useCanvasStore.getState().canvas
    if (prev) prev.dispose()

    // create new Fabric.Canvas
    const c = new Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: canvasState?.background || "#ffffff",
      preserveObjectStacking: true,
      statefullCache: true,
    })
    setCanvas(c)

    // load JSON + padding
    if (canvasState) {
      c.loadFromJSON(canvasState, () => {
        c.getObjects().forEach((o) => {
          if (o instanceof IText) o.set({ padding: 10 })
        })
        c.requestRenderAll()
      })
    }

    // fit-to-container
    const fit = () => {
      const { width: cw, height: ch } =
        wrapperRef.current!.getBoundingClientRect()
      const zoom = Math.min(cw / width, ch / height)

      c.setZoom(zoom)

      // multiply by zoom so the <canvas> CSS matches what the user actually sees
      c.setDimensions({ width: width * zoom, height: height * zoom })

      c.requestRenderAll()
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(wrapperRef.current!)

    // bake drag-scaling into fontSize
    const bakeTextScale = () => {
      const o = c.getActiveObject()
      if (o instanceof IText) {
        const sX = o.scaleX ?? 1
        const base = o.fontSize ?? 16
        o.set({ fontSize: base * sX, scaleX: 1, scaleY: 1 })
        o.setCoords()
      }
    }

    // sync toolbar state (including cleared selection → null)
    const sync = () => {
      const o = c.getActiveObject()
      if (!o) {
        onSelectionChange(null)
        return
      }
      console.log("sync", o)
      onSelectionChange(o)
      if (o instanceof IText) onTextSync(o)
      else if (o instanceof FabricImage) onImageShapeSync(o)
      else onImageShapeSync(o)
    }

    // listen for mouse down so background clicks immediately fire null
    const onMouseDown = (evt: any) => {
      if (!evt.target) {
        onSelectionChange(null)
      }
    }

    const events: (keyof CanvasEvents)[] = [
      "selection:created",
      "selection:updated",
      "selection:cleared",
      "object:added",
      "object:modified",
      "object:removed",
      "object:rotating",
      "object:scaling",
      "canvas:modified",
    ]
    events.forEach((e) => c.on(e, sync))
    c.on("object:scaling", bakeTextScale)
    c.on("mouse:down", onMouseDown)

    return () => {
      ro.disconnect()
      events.forEach((e) => c.off(e, sync))
      c.off("object:scaling", bakeTextScale)
      c.off("mouse:down", onMouseDown)
      c.dispose()
      setCanvas(null)
    }
  }, [canvasRef, wrapperRef, width, height, canvasState])

  useEffect(() => {
    if (canvas?.getActiveObjects().length) {
      setCanvasAsSelected(false)
    }

    console.log(
      "canvas selected",
      isCanvasSelected,
      canvas?.getActiveObjects().length
    )
  }, [canvas?.getActiveObjects().length, isCanvasSelected])

  useEffect(() => {
    const handleDocMouseDown = (e: MouseEvent) => {
      const clickIsInCanvas = wrapperRef.current?.contains(e.target as Node)
      const clickIsInToolbar = toolbarRef?.current?.contains(e.target as Node)
      if (!clickIsInCanvas && !clickIsInToolbar) {
        // user clicked somewhere else: clear selection
        canvas?.discardActiveObject()
        canvas?.renderAll()
        onSelectionChange(null)
        setCanvasAsSelected(false)
      }
    }

    document.addEventListener("mousedown", handleDocMouseDown)
    return () => {
      document.removeEventListener("mousedown", handleDocMouseDown)
    }
  }, [canvas, onSelectionChange, setCanvasAsSelected])

  //experimenting with erasing feature
  // …
  // 1️⃣ keep a real ref for our custom cursor
  const cursorRef = useRef<fabric.FabricObject | null>(null)

  const activeToolTab = useCanvasStore((s) => s.toolTab)
  useEffect(() => {
    if (!canvas || drawTool !== "Eraser" || !wrapperRef.current) return
    if (activeToolTab === "Select") {
      canvas.isDrawingMode = false
      canvas.selection = true
      canvas.defaultCursor = "default"
      canvas.hoverCursor = "move"
      wrapperRef.current.style.cursor = "default"
      return
    }

    const wrapper = wrapperRef.current

    // disable default cursors & selection
    canvas.isDrawingMode = false
    canvas.selection = false
    canvas.defaultCursor = "none"
    canvas.hoverCursor = "none"
    wrapper.style.cursor = "none"

    // 2️⃣ helper to promise-ify loadSVGFromURL

    // load and install our cursor
    async function loadSVG(url: string) {
      const { objects, options } = await fabric.loadSVGFromURL(
        "/fabric/eraser.svg"
      )
      const nonNullObjects = objects.filter(
        (o) => o !== null
      ) as fabric.Object[]
      const group = fabric.util.groupSVGElements(nonNullObjects, options)
      group.set({
        selectable: false,
        evented: false,
        originX: "center",
        originY: "center",
      })

      group.scaleToWidth(32)
      ;(group as any).__isCustomCursor = true
      console.log("group", group)
      canvas?.add(group)
      canvas?.requestRenderAll()
      cursorRef.current = group
    }
    loadSVG("/fabric/eraser.svg")
    // 3️⃣ handlers that always read from cursorRef.current
    const onMove = (ev: CanvasEvents["mouse:move"]) => {
      const g = cursorRef.current
      console.log("onMove", g)
      if (!g) return
      const p = canvas.getScenePoint(ev.e)
      g.set({ left: p.x, top: p.y }).setCoords()
      canvas.requestRenderAll()
    }
    const onOut = () => {
      const g = cursorRef.current
      if (!g) return
      g.set({ top: -999 }).setCoords()
      canvas.requestRenderAll()
    }
    canvas.on("mouse:move", onMove)
    canvas.on("mouse:out", onOut)

    // 4️⃣ erase-on-click: capture phase
    const eraseHandler = (e: MouseEvent) => {
      const target = canvas.findTarget(e)
      if (target) {
        canvas.remove(target)
        canvas.discardActiveObject()
        canvas.requestRenderAll()
      }
      e.stopImmediatePropagation()
      e.preventDefault()
    }
    wrapper.addEventListener("mousedown", eraseHandler, { capture: true })

    return () => {
      // clean up everything
      canvas.off("mouse:move", onMove)
      canvas.off("mouse:out", onOut)
      wrapper.removeEventListener("mousedown", eraseHandler, { capture: true })

      // remove custom cursor object
      canvas.getObjects().forEach((o) => {
        if (o.__isCustomCursor) canvas.remove(o)
      })

      // restore defaults
      canvas.isDrawingMode = false
      canvas.selection = true
      canvas.defaultCursor = "default"
      wrapper.style.cursor = ""
      canvas.requestRenderAll()
    }
  }, [canvas, drawTool, cursorRef, activeToolTab, wrapperRef])
  console.log(canvas?.getActiveObject()?.type)
  return (
    <div
      onClick={() => {
        !canvas?.isDrawingMode && setCanvasAsSelected(true)
      }}
      ref={wrapperRef}
      className={cn(
        "max-h-[calc(70dvh)]  cursor-pointer max-w-[43dvw] md:max-w-[48dvw] lg:max-w-[61dvw]  shadow-lg overflow-hidden border-transparent",
        isCanvasSelected
          ? "border-purple-400 border-2 "
          : " hover:border-purple-400 border-2"
      )}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
