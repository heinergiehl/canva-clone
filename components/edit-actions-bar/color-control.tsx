import { useRef } from "react"
import { CustomTooltip } from "../custom-tooltip"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type ColorControlProps = {
  color: string
  label: string
  onChange: (c: string) => void
}
function ColorControl({ color, label, onChange }: ColorControlProps) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <CustomTooltip content={label}>
      <div className="relative flex items-center ">
        <Button variant="ghost" size="sm" onClick={() => ref.current?.click()}>
          <div
            className="w-6 h-6 rounded border"
            style={{ backgroundColor: color }}
          />
        </Button>
        <Input
          ref={ref}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </CustomTooltip>
  )
}

export { ColorControl }
