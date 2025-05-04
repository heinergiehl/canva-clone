import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Ellipsis,
  EditIcon,
  Trash2Icon,
  DownloadIcon,
  Loader2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { trpc } from "@/app/_trpc/client"
type Props = {
  design: {
    id: number
    title: string
    type: string
    imagePath?: string
  }
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}
export function RecentDesignItem({ design, isOpen, onOpenChange }: Props) {
  const trpcUtils = trpc.useUtils()
  const updateDesign = trpc.design.updateDesign.useMutation({
    onSettled: (_, ctx) => {
      // Refetch designs after updating
      trpcUtils.design.getDesigns.invalidate()
    },
  })
  const deleteDesign = trpc.design.deleteDesign.useMutation({
    onSuccess: () => {
      trpcUtils.design.getDesigns.invalidate()
      setEditable(false)
    },
  })
  const [editable, setEditable] = useState(false)
  const [title, setTitle] = useState(design.title)
  // Sync local title if prop changes (e.g. refetch)
  useEffect(() => {
    setTitle(design.title)
  }, [design.title])
  // Save on blur
  const handleBlur = () => {
    if (title !== design.title) {
      updateDesign.mutate({ id: design.id, title })
    }
    setEditable(false)
  }
  return (
    <div className="flex items-center justify-between w-full">
      <Link
        href={`/projects/${design.id}`}
        className="flex items-center gap-2 flex-grow"
      >
        <Image
          src={
            design.imagePath
              ? design.imagePath
              : "/designs/default_thumbnail.webp"
          }
          width={100}
          height={100}
          alt={design.title}
          className="rounded-md object-cover w-6 h-6"
        />
        <span className="truncate">{design.title}</span>
      </Link>
      <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              onOpenChange(!isOpen)
            }}
          >
            {deleteDesign.isPending ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <Ellipsis />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="flex items-center justify-between space-x-2">
            {editable ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => {
                  handleBlur()
                  setEditable(false)
                }}
                className="flex-grow"
              />
            ) : (
              <>
                <span className="flex-1 truncate">{design.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditable(true)}
                >
                  <EditIcon />
                </Button>
              </>
            )}
          </DropdownMenuLabel>
          <div className="px-2 py-1 text-xs text-gray-600">{design.type}</div>
          <Separator className="my-1" />
          <DropdownMenuItem
            onClick={() => deleteDesign.mutate({ id: design.id })}
          >
            <Trash2Icon />
            <span className="ml-2">Move to trash</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Download", design.id)}>
            <DownloadIcon />
            <span className="ml-2">Download</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
