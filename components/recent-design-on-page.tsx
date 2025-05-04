// src/components/recent-design-on-page.tsx
"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
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
import { SelectDesign } from "@/db"
import { cn } from "@/lib/utils"

interface Props {
  design: SelectDesign
}

export function RecentDesignOnPage({ design }: Props) {
  const trpcUtils = trpc.useUtils()

  const updateDesign = trpc.design.updateDesign.useMutation({
    onSettled: () => void trpcUtils.design.getDesigns.invalidate(),
  })

  const deleteDesign = trpc.design.deleteDesign.useMutation({
    onSuccess: () => {
      trpcUtils.design.getDesigns.invalidate()
      setEditable(false)
      setDeleting(false)
      setOpen(false)
    },
  })

  const [open, setOpen] = useState(false)
  const [editable, setEditable] = useState(false)
  const [title, setTitle] = useState(design.title)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setTitle(design.title)
  }, [design.title])

  const handleBlur = () => {
    if (title !== design.title) {
      updateDesign.mutate({ id: design.id, title })
    }
    setEditable(false)
  }

  const handleDelete = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    deleteDesign.mutate({ id: design.id })
  }

  const handleDownload = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    // trigger download logic here, e.g. window.open(design.designImage!)
  }

  return (
    <div className="w-[219px] h-[274px] cursor-pointer flex flex-col">
      <div className="relative h-full group bg-gray-200 rounded-md">
        {/** only the image + overlay is a link now */}
        <Link
          href={`/design/${design.id}`}
          className="block overflow-hidden rounded-md h-full"
        >
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 hover:bg-gray-400/40 transition duration-200" />
            <Image
              src={
                design.designImage
                  ? design.designImage
                  : "/designs/default_thumbnail.webp"
              }
              width={200}
              height={200}
              alt={design.title}
              style={{ aspectRatio: `${design.width}/${design.height}` }}
              className="w-[200px] h-auto object-cover rounded-md"
            />
          </div>
        </Link>

        {/** dropdown sits on top as a sibling */}
        <div className="absolute top-2 right-2">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                className={cn(
                  "cursor-pointer opacity-0  group-hover:opacity-100 transition-opacity duration-200",
                  open && "opacity-100"
                )}
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(!open)
                }}
              >
                {deleting ? <Loader2 className="animate-spin" /> : <Ellipsis />}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuLabel className="px-2 py-1 flex items-center justify-between">
                {editable ? (
                  <Input
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-grow bg-transparent border-b border-dashed focus:ring-0"
                  />
                ) : (
                  <>
                    <span className="truncate max-w-[70%]">{design.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditable(true)
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </>
                )}
              </DropdownMenuLabel>

              <p className="px-2 text-xs text-gray-600">
                {design.width}×{design.height}px • Edited at{" "}
                {new Date(design.updatedAt).toLocaleTimeString()}
              </p>
              <Separator className="my-1" />

              <DropdownMenuItem onSelect={handleDelete}>
                <Trash2Icon />
                <span className="ml-2">Move to trash</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleDownload}>
                <DownloadIcon />
                <span className="ml-2">Download</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <h3 className="mt-2 font-semibold text-md truncate">{title}</h3>
      <p className="text-xs text-gray-600">
        {design.width}×{design.height}px • Edited at{" "}
        {new Date(design.updatedAt).toLocaleTimeString()}
      </p>
    </div>
  )
}
