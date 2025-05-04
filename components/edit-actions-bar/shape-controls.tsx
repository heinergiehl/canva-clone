import { ColorControl } from "./color-control"
import { EditActionsBarProps } from "./config"
import { NumberControl } from "./number-control"
import { OpacityControl } from "./opacity-control"

export function ShapeControls({
  shapeFill,
  onShapeFillChange,
  shapeStroke,
  onShapeStrokeChange,
  shapeStrokeWidth,
  onShapeStrokeWidthChange,
  opacity,
  onOpacityChange,
}: Pick<
  EditActionsBarProps,
  | "shapeFill"
  | "onShapeFillChange"
  | "shapeStroke"
  | "onShapeStrokeChange"
  | "shapeStrokeWidth"
  | "onShapeStrokeWidthChange"
  | "opacity"
  | "onOpacityChange"
>) {
  return (
    <>
      <ColorControl
        label="Fill"
        color={shapeFill}
        onChange={onShapeFillChange}
      />
      <ColorControl
        label="Stroke"
        color={shapeStroke}
        onChange={onShapeStrokeChange}
      />
      <NumberControl
        label="Stroke width"
        value={shapeStrokeWidth}
        min={0}
        step={1}
        onChange={onShapeStrokeWidthChange}
      />
      <OpacityControl value={opacity} onChange={onOpacityChange} />
    </>
  )
}
