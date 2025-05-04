import { CustomSidebarWithSheet } from "@/components/custom-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col w-full h-full bg-[rgba(43,59,74,0.1)] antialiased items-center justify-around">
      <SidebarProvider>
        <CustomSidebarWithSheet />
        {children}
      </SidebarProvider>
    </div>
  )
}
export default HomeLayout
