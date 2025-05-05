"use client"
import { CustomSidebarWithSheet } from "@/components/custom-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Suspense } from "react"
function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col w-full h-full bg-[rgba(43,59,74,0.1)] antialiased items-center justify-around">
      <Suspense fallback={<div className="w-full h-full" />}>
        <SidebarProvider>
          <CustomSidebarWithSheet />
          {children}
        </SidebarProvider>
      </Suspense>
    </div>
  )
}
export default HomeLayout
