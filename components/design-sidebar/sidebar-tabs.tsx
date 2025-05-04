import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { sidebarItems, SidebarTab } from "./config"

export function SidebarTabs({
  active,
  onChange,
}: {
  active: SidebarTab
  onChange: (t: SidebarTab) => void
}) {
  return (
    <aside className="flex flex-col items-center p-4 space-y-2">
      {sidebarItems.map(({ label, icon: Icon }) => {
        const isActive = label === active
        return (
          <div
            key={label}
            className="flex flex-col items-center space-y-2 text-gray-700"
          >
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onChange(label)}
              aria-selected={isActive}
              role="tab"
              className={cn(
                " flex items-center justify-center transition-shadow",
                isActive
                  ? "bg-white text-[#8b3dff] shadow-[0_0_0_1px_rgba(64,87,109,0.04),0_6px_20px_-4px_rgba(64,87,109,0.3)]"
                  : "hover:bg-gray-300 hover:shadow-md"
              )}
            >
              <Icon style={{ width: "24px", height: "24px" }} />
            </Button>
            <span className="text-xs">{label}</span>
          </div>
        )
      })}
    </aside>
  )
}
