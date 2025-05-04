import { OpacityControl } from "./opacity-control"

export function ImageControls({
  opacity,
  onOpacityChange,
}: {
  opacity: number
  onOpacityChange: (val: number) => void
}) {
  return <OpacityControl value={opacity} onChange={onOpacityChange} />
}
