import { CustomTooltip } from "../custom-tooltip"
import { ColorControl } from "./color-control"

export function CanvasControls({
  bgColor,
  onBgChange,
}: {
  bgColor: string
  onBgChange: (col: string) => void
}) {
  return (
    <CustomTooltip content="Canvas background">
      <ColorControl label="Background" color={bgColor} onChange={onBgChange} />
    </CustomTooltip>
  )
}
