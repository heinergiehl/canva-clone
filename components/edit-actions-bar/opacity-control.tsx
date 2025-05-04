import { CustomTooltip } from "../custom-tooltip"
import { Input } from "../ui/input"

export function OpacityControl({
  value,
  onChange,
}: {
  value: number
  onChange: (val: number) => void
}) {
  return (
    <CustomTooltip content="Opacity">
      <Input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-32"
      />
    </CustomTooltip>
  )
}
