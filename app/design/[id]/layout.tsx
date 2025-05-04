//create nextjs layout
"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { ShareIcon } from "lucide-react"
import { trpc } from "@/app/_trpc/client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DesignSidebar } from "@/components/design-sidebar"

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
          appearance={{
            variables: { colorPrimary: "blue", colorText: "white" },
          }}
        />

        <Button variant="secondary" className="ml-2">
          <ShareIcon className="mr-1" />
          Share
        </Button>
      </header>
      <div className="flex  w-screen h-[calc(100dvh-57px)] ">
        <DesignSidebar />
        {children}
      </div>
    </div>
  )
}
export default Layout
