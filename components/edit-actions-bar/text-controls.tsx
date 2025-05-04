import { useCanvasStore } from "@/lib/canvas-store"
import { EditActionsBarProps, FONTS } from "./config"
import { IText } from "fabric"
import { CustomTooltip } from "../custom-tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { NumberControl } from "./number-control"
import { ColorControl } from "./color-control"
import { Button } from "../ui/button"
import { UnderlineIcon } from "lucide-react"

export function TextControls({
  activeObj,
  fontFamily,
  onFontFamilyChange,
  fontSize,
  onFontSizeChange,
  fontColor,
  onFontColorChange,
  textStrokeColor,
  onTextStrokeColorChange,
  textStrokeWidth,
  onTextStrokeWidthChange,
}: Pick<
  EditActionsBarProps,
  | "fontFamily"
  | "onFontFamilyChange"
  | "fontSize"
  | "onFontSizeChange"
  | "fontColor"
  | "onFontColorChange"
  | "textStrokeColor"
  | "onTextStrokeColorChange"
  | "textStrokeWidth"
  | "onTextStrokeWidthChange"
> & { activeObj: IText }) {
  const api = useCanvasStore()
  const isUnderlined = activeObj.underline

  return (
    <>
      <CustomTooltip content="Font family">
        <Select value={fontFamily} onValueChange={onFontFamilyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Font…" />
          </SelectTrigger>
          <SelectContent>
            {FONTS.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CustomTooltip>
      <NumberControl
        label="Font size"
        value={fontSize}
        min={1}
        step={1}
        onChange={onFontSizeChange}
      />
      <ColorControl
        label="Color"
        color={fontColor}
        onChange={onFontColorChange}
      />
      <ColorControl
        label="Outline"
        color={textStrokeColor}
        onChange={onTextStrokeColorChange}
      />
      <NumberControl
        label="Outline width"
        value={textStrokeWidth}
        min={0}
        step={1}
        onChange={onTextStrokeWidthChange}
      />
      <CustomTooltip content="Underline">
        <Button
          size="icon"
          variant={isUnderlined ? "default" : "ghost"}
          onClick={() => api.setActiveUnderline(!isUnderlined)}
        >
          <UnderlineIcon />
        </Button>
      </CustomTooltip>
    </>
  )
}
