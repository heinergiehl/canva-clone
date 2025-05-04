import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsDownIcon,
  ChevronsUpIcon,
  CopyIcon,
  Trash2Icon,
} from "lucide-react"
import { CustomTooltip } from "../custom-tooltip"
import { Button } from "../ui/button"

// Generic object controls (z-order + dup/delete)
export function GenericControls({
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
  onDuplicate,
  onDelete,
}: {
  onBringForward: () => void
  onSendBackward: () => void
  onBringToFront: () => void
  onSendToBack: () => void
  onDuplicate: () => void
  onDelete: () => void
}) {
  return (
    <>
      <div className="flex items-center space-x-1">
        <CustomTooltip content="Bring forward">
          <Button size="icon" variant="ghost" onClick={onBringForward}>
            <ArrowUpIcon />
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Send backward">
          <Button size="icon" variant="ghost" onClick={onSendBackward}>
            <ArrowDownIcon />
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Bring to front">
          <Button size="icon" variant="ghost" onClick={onBringToFront}>
            <ChevronsUpIcon />
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Send to back">
          <Button size="icon" variant="ghost" onClick={onSendToBack}>
            <ChevronsDownIcon />
          </Button>
        </CustomTooltip>
      </div>
      <div className="ml-auto flex space-x-2">
        <Button size="icon" variant="outline" onClick={onDuplicate}>
          <CopyIcon />
        </Button>
        <Button size="icon" variant="destructive" onClick={onDelete}>
          <Trash2Icon />
        </Button>
      </div>
    </>
  )
}
