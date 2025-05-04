import { FabricImage, FabricObject, Group, IText, Path } from "fabric"

export const FONTS = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Verdana",
  "Montserrat",
]
// Identify which control set to render
export type ObjType = "canvas" | "text" | "image" | "shape" | "group" | null

export function getObjType(
  obj: FabricObject | null,
  isCanvasSelected: boolean
): ObjType {
  if (isCanvasSelected && !obj) return "canvas"
  if (!obj) return "canvas"
  if (obj instanceof IText) return "text"
  if (obj instanceof FabricImage) return "image"
  if (obj instanceof Path) return "shape"
  if (obj instanceof Group) return "group"
  return null
}
// ... NumberControl & ColorControl stay the same ...

export type EditActionsBarProps = {
  activeObj: FabricObject | null

  // text
  fontFamily: string
  fontSize: number
  fontColor: string
  textStrokeColor: string
  textStrokeWidth: number

  // image & shape
  opacity: number
  shapeFill: string
  shapeStroke: string
  shapeStrokeWidth: number

  // callbacks
  onFontFamilyChange: (f: string) => void
  onFontSizeChange: (s: number) => void
  onFontColorChange: (c: string) => void
  onTextStrokeColorChange: (c: string) => void
  onTextStrokeWidthChange: (w: number) => void

  onOpacityChange: (v: number) => void

  onShapeFillChange: (c: string) => void
  onShapeStrokeChange: (c: string) => void
  onShapeStrokeWidthChange: (w: number) => void
  onCanvasBackgroundChange: (c: string) => void
}
