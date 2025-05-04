"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"
import { CustomAccordionTrigger } from "./custom-accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CustomModal } from "./custom-modal"
import {
  Menu,
  PlusIcon,
  Home,
  Folder,
  LayoutGrid,
  Crown,
  Star,
  Ellipsis,
} from "lucide-react"
import { trpc } from "@/app/_trpc/client"
import { RecentDesignItem } from "./recent-design-item"
const PRESETS = [
  {
    label: "Instagram Post (4 : 5)",
    width: 1080,
    height: 1350,
    preview: "/designs/instagrampost4_5.svg",
  },
  {
    label: "Square Logo (1 : 1)",
    width: 500,
    height: 500,
    preview: "/designs/logo_500_500.svg",
  },
  {
    label: "Presentation (16 : 9)",
    width: 1920,
    height: 1080,
    preview: "/designs/presentation_16_9.svg",
  },
  {
    label: "YouTube Thumbnail (1280 × 720)",
    width: 1280,
    height: 720,
    preview: "/designs/Youtube-Thumbnail_1280_720.svg",
  },
]
const navItems = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Projects", icon: Folder, href: "/projects" },
  { title: "Templates", icon: LayoutGrid, href: "/templates" },
  { title: "Brand", icon: Crown, href: "/brand", iconClass: "text-yellow-500" },
  { title: "Apps", icon: Star, href: "/apps" },
]
export function CustomSidebarWithSheet() {
  const pathname = usePathname()
  const router = useRouter()
  // sheet open
  const [openSheet, setOpenSheet] = useState(false)
  // carousel preset index
  const [presetIndex, setPresetIndex] = useState(0)
  // track which recent‐design dropdown is open
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  // create plus navigate
  const createDesign = trpc.design.createDesign.useMutation()
  const handleCreate = async () => {
    const { width, height } = PRESETS[presetIndex]
    const { id } = await createDesign.mutateAsync({
      title: "Untitled design",
      width,
      height,
    })
    router.push(`/design/${id}`)
  }
  // fetch recent designs
  const { data: recentDesigns } = trpc.design.getDesigns.useQuery({})
  return (
    <Sidebar className="w-20 border-r">
      <SidebarContent className="bg-[rgba(43,59,74,0.1)]">
        <SidebarGroup>
          <SidebarGroupContent className="space-y-2">
            {/* Top menu + sheet */}
            <SidebarMenu>
              <Sheet modal={false} open={openSheet} onOpenChange={setOpenSheet}>
                <SidebarMenuItem>
                  <SheetTrigger asChild>
                    <button
                      onClick={() => setOpenSheet((o) => !o)}
                      className="p-3 rounded-lg w-full hover:bg-[#7731d81a] flex items-center justify-center"
                      aria-label="Open menu"
                    >
                      <Menu size={24} className="text-[#4a2e7fcc]" />
                    </button>
                  </SheetTrigger>
                </SidebarMenuItem>
                <SheetContent
                  side="left"
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onInteractOutside={(e) => e.preventDefault()}
                  className={cn(
                    "left-20 w-64 h-full bg-white p-4 shadow-lg z-50",
                    "transition-opacity duration-200",
                    "data-[state=closed]:opacity-0 data-[state=open]:opacity-100"
                  )}
                  style={{ transform: "none" }}
                >
                  <SheetHeader>
                    <SheetTitle>Create a design</SheetTitle>
                  </SheetHeader>
                  {/* Canvas size modal */}
                  <CustomModal
                    trigger={
                      <Button className="my-4 flex w-full items-center justify-center bg-[#8b3dff] hover:bg-[#7731d8]">
                        <PlusIcon />
                        <span className="ml-2">New blank design</span>
                      </Button>
                    }
                    title="Choose your canvas size"
                    description="Select one of the common aspect ratios"
                    footer={
                      <Button
                        onClick={handleCreate}
                        disabled={createDesign.isPending}
                        className="w-full"
                      >
                        Create {PRESETS[presetIndex].label}
                      </Button>
                    }
                  >
                    <div className="relative px-2">
                      <Carousel opts={{ align: "start" }} className="flex">
                        <CarouselContent>
                          {PRESETS.map((p, i) => (
                            <CarouselItem
                              key={i}
                              onClick={() => setPresetIndex(i)}
                              className={cn(
                                "group cursor-pointer md:basis-1/2 lg:basis-1/3",
                                presetIndex === i
                                  ? "border-purple-500 bg-purple-50"
                                  : "border-gray-200"
                              )}
                            >
                              <div className="h-32 w-full relative">
                                <Image
                                  src={p.preview}
                                  alt={p.label}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <p className="py-1 text-center group-hover:opacity-100 opacity-0 duration-500 text-sm">
                                {p.label}
                              </p>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
                        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
                      </Carousel>
                    </div>
                  </CustomModal>
                  {/* Recent designs */}
                  <Accordion type="single" collapsible className="mt-6">
                    <AccordionItem value="recent">
                      <CustomAccordionTrigger>
                        Recent Designs
                      </CustomAccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {recentDesigns?.items.map((d) => (
                          <RecentDesignItem
                            key={d.id}
                            design={d}
                            isOpen={openMenuId === d.id}
                            onOpenChange={(open) =>
                              setOpenMenuId(open ? d.id : null)
                            }
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <SheetFooter className="mt-auto">
                    <SheetClose asChild>
                      <Button variant="outline" className="w-full">
                        Close
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </SidebarMenu>
            {/* Main nav */}
            <SidebarMenu className="space-y-2">
              {navItems.map(({ title, icon: Icon, href, iconClass }) => {
                const active =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href))
                return (
                  <SidebarMenuItem
                    key={title}
                    className="flex flex-col items-center"
                  >
                    <Link
                      href={href}
                      className={cn(
                        "p-3 rounded-lg hover:bg-[#7731d81a]",
                        active && "bg-[#7731d81a]"
                      )}
                    >
                      <Icon
                        size={24}
                        className={cn(
                          iconClass ?? "text-[#4a2e7fcc]",
                          active && "text-[#7731d8]"
                        )}
                      />
                    </Link>
                    <span className="mt-1 text-xs">{title}</span>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
