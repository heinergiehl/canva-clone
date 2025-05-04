import { MinusIcon, PlusIcon } from "lucide-react"
import { CustomTooltip } from "../custom-tooltip"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type NumberControlProps = {
  value: number
  min?: number
  max?: number
  step?: number
  label: string
  onChange: (v: number) => void
}
function NumberControl({
  value,
  min = -Infinity,
  max = Infinity,
  step = 1,
  label,
  onChange,
}: NumberControlProps) {
  const dec = () => onChange(Math.max(min, value - step))
  const inc = () => onChange(Math.min(max, value + step))
  return (
    <CustomTooltip content={label}>
      <div className="flex items-center border rounded-lg">
        <Button
          size="icon"
          variant="ghost"
          onClick={dec}
          className="rounded-r-none"
        >
          <MinusIcon />
        </Button>
        <Input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="hover:bg-gray-200 transition-colors duration-300 rounded-none border-0 w-12"
          aria-label={label}
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={inc}
          className="rounded-l-none"
        >
          <PlusIcon />
        </Button>
      </div>
    </CustomTooltip>
  )
}

export { NumberControl }
