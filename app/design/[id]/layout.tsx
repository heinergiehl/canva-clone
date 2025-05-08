//create nextjs layout
"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { ShareIcon, Trash2Icon } from "lucide-react"
import { trpc } from "@/app/_trpc/client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DesignSidebar } from "@/components/design-sidebar"
import { useCanvasStore } from "@/lib/canvas-store"
import { Skeleton } from "@/components/ui/skeleton"
import { DeleteAccountDialog } from "@/app/(home)/page"
function Layout({ children }: { children: React.ReactNode }) {
  const updateDesign = trpc.design.updateDesign.useMutation()
  const { id } = useParams()
  const { data: design, isSuccess } = trpc.design.getDesign.useQuery({
    id: Number(id),
  })
  // Title state
  const [title, setTitle] = useState("")
  useEffect(() => {
    if (design?.title) setTitle(design.title)
  }, [design?.title])
  const handleTitleBlur = () => {
    if (title !== design?.title) {
      updateDesign.mutate({ id: Number(id), title })
    }
  }
  const canvas = useCanvasStore((state) => state.canvas)
  // Download the _rendered_ canvas as a PNG
  const downloadPNG = () => {
    if (!canvas) return
    // toDataURL captures the current canvas drawing
    const dataUrl = canvas.toDataURL({ format: "png", multiplier: 1 })
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = `${title || "design"}.png`
    link.click()
  }
  // Delete account dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  return (
    <div className="flex flex-col  antialiased items-center justify-around ">
      <header className="h-14 w-screen flex items-center justify-end bg-gradient-to-r from-teal-400 to-purple-600 px-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          className="w-1/4 text-white border-0 focus:ring-0"
        />
        <UserButton
          showName
          fallback={<Skeleton className="w-[100px] h-[32px] rounded-lg" />}
        >
          <UserButton.MenuItems>
            <UserButton.Action
              label="Delete Account"
              labelIcon={
                <Trash2Icon style={{ width: "16px", height: "16px" }} />
              }
              onClick={() => {
                setOpenDeleteDialog(true)
              }}
            />
          </UserButton.MenuItems>
        </UserButton>

        <Button variant="secondary" className="ml-2" onClick={downloadPNG}>
          <ShareIcon className="mr-1" />
          Share
        </Button>
      </header>
      <div className="flex  w-screen h-[calc(100dvh-57px)] ">
        <DesignSidebar />
        {children}
      </div>
      <DeleteAccountDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
      />
    </div>
  )
}
export default Layout
