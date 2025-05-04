// src/lib/canvas-store.ts
import { create } from "zustand"
import {
  Canvas as FabricCanvas,
  Object as FabricObject,
  Rect,
  IText,
  loadSVGFromURL,
  util,
  PencilBrush,
  CanvasEvents,
} from "fabric"

import { DrawTool, ToolTab } from "@/components/design-sidebar/config"
import { Tool } from "@/config"

export enum TextOptions {
  Heading = "Heading",
  Subheading = "Subheading",
  BodyText = "Body text",
}
type CanvasStore = {
  canvas: FabricCanvas | null
  isCanvasSelected: boolean
  setCanvas: (c: FabricCanvas | null) => void
  drawTool: DrawTool
  setDrawTool: (tool: DrawTool) => void
  setTool: (toolTab: ToolTab) => void
  toolTab: ToolTab
  deleteActive: () => void
  duplicateActive: () => void
  addText: (style: TextOptions) => void
  addSVG: (url: string) => Promise<void>
  bringForward: () => void
  sendBackward: () => void
  bringToFront: () => void
  sendToBack: () => void
  setActiveOpacity: (o: number) => void
  setActiveUnderline: (u: boolean) => void // ← new
  setCanvasAsSelected: (bool: boolean) => void // ← new
  setBackgroundColor: (color: string) => void // ← new
  // setActiveBackgroundColor: (color: string) => void // ← new
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  canvas: null,
  setCanvas: (c) => set({ canvas: c }),
  drawTool: "Pen",
  toolTab: "Select",
  setTool: (toolTab) => set({ toolTab }),

  isCanvasSelected: false,

  deleteActive: () => {
    const c = get().canvas
    const obj = c?.getActiveObject()
    if (c && obj) {
      c.remove(obj)
      c.discardActiveObject()
      c.requestRenderAll()
    }
  },

  duplicateActive: async () => {
    const c = get().canvas
    const obj = c?.getActiveObject()
    if (c && obj) {
      const cloned = await obj.clone()
      if (cloned) {
        c.add(cloned)
        c.setActiveObject(cloned)
        cloned.setCoords()
        c.requestRenderAll()
      }
    }
  },

  addText: (style) => {
    const c = get().canvas
    if (!c) return

    // pick style-specific options
    let opts: Partial<IText> = {
      fill: "#333333",
      objectCaching: false,
    }
    switch (style) {
      case "Heading":
        opts = { ...opts, fontSize: 42, fontWeight: "bold" }
        break
      case "Subheading":
        opts = { ...opts, fontSize: 24, fontWeight: "600" }
        break
      case "Body text":
        opts = { ...opts, fontSize: 16, fontWeight: "normal" }
        break
    }

    // create and center
    const txt = new IText(style, {
      left: 0,
      top: 0,
      ...opts,
    })
    c.add(txt)
    c.centerObject(txt)
    txt.setCoords()
    c.setActiveObject(txt)
    c.requestRenderAll()
  },

  addSVG: async (url) => {
    const c = get().canvas!
    const { objects, options } = await loadSVGFromURL(url)
    const safe = objects.filter((o): o is FabricObject => !!o)
    const group = util.groupSVGElements(safe, options)
    if ((group.width ?? 0) > (group.height ?? 0)) group.scaleToWidth(200)
    else group.scaleToHeight(200)
    group.set({
      fill: "#333333",
    })

    c.add(group)
    c.centerObject(group)
    group.setCoords()
    c.setActiveObject(group)
    c.requestRenderAll()
  },

  bringForward: () => {
    const c = get().canvas
    const obj = c?.getActiveObject()
    if (c && obj) {
      c.bringObjectForward(obj)
      c.requestRenderAll()
      c.fire("object:modified", { target: obj }) // ← so UI syncs
    }
  },

  sendBackward: () => {
    const c = get().canvas
    const obj = c?.getActiveObject()
    if (c && obj) {
      c.sendObjectBackwards(obj)

      c.requestRenderAll()
      c.fire("object:modified", { target: obj })
    }
  },

  bringToFront: () => {
    const c = get().canvas
    const obj = c?.getActiveObject()
    if (c && obj) {
      c.bringObjectToFront(obj)
      c.requestRenderAll()
      c.fire("object:modified", { target: obj })
    }
  },

  sendToBack: () => {
    const c = get().canvas
    const obj = c?.getActiveObject()
    if (c && obj) {
      c.sendObjectToBack(obj)
      c.requestRenderAll()
      c.fire("object:modified", { target: obj })
    }
  },

  setActiveOpacity: (o) => {
    const c = get().canvas
    const obj = c?.getActiveObject()
    if (c && obj) {
      obj.set("opacity", o)
      c.requestRenderAll()

      c.fire("object:modified", { target: obj })
    }
  },

  setActiveUnderline: (u) => {
    const c = get().canvas
    const obj = c?.getActiveObject()
    if (c && obj instanceof IText) {
      obj.set("underline", u)
      c.requestRenderAll()
      c.fire("object:modified", { target: obj })
    }
  },
  setDrawTool: (tool) => {
    set({ drawTool: tool })
    const c = get().canvas
    if (!c) return

    // disable object selection whenever drawing
    if (
      tool === "Pen" ||
      tool === "Marker" ||
      tool === "Highlighter" ||
      tool === "Eraser"
    ) {
      c.selection = false
    } else {
      c.selection = true
    }

    switch (tool) {
      case "Eraser":
        // get the object that is on the canvas, and delete it
        // get the object where the cursor clicks on and delete it

        c.isDrawingMode = false
        const target = c?.getActiveObject()
        if (target && get().drawTool === "Eraser") {
          c.remove(target)
        }

        c?.requestRenderAll()
        break

      case "Marker": {
        c.isDrawingMode = true
        const b = new PencilBrush(c)
        b.width = 12
        b.color = "rgba(255,153,0,0.5)"
        c.freeDrawingBrush = b
        break
      }

      case "Highlighter": {
        c.isDrawingMode = true
        const b = new PencilBrush(c)
        b.width = 24
        b.color = "rgba(255,255,0,0.4)"
        c.freeDrawingBrush = b
        break
      }

      case "Pen": {
        c.isDrawingMode = true
        const b = new PencilBrush(c)
        b.width = 2
        b.color = "#000000"
        c.freeDrawingBrush = b
        break
      }

      default: // "Select"
        c.isDrawingMode = false
        break
    }
  },
  setBackgroundColor: (color: string) => {
    const c = get().canvas
    if (!c) return
    // update fabric canvas background
    c.set({
      backgroundColor: color,
    })
    c.requestRenderAll()
  },
  setCanvasAsSelected: (bool: boolean) =>
    set((state) => ({ isCanvasSelected: bool })),
}))
