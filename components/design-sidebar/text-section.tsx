// src/components/TextSection.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TextOptions, useCanvasStore } from "@/lib/canvas-store"
import { cn } from "@/lib/utils"

const PRESETS = [
  { label: "Add a heading", type: TextOptions["Heading"] },
  { label: "Add a subheading", type: TextOptions["Subheading"] },
  { label: "Add a little bit of body text", type: TextOptions["BodyText"] },
]

export function TextSection() {
  const addText = useCanvasStore((s) => s.addText)

  return (
    <section className="p-4 bg-gray-50 h-full  border-r-1 border-gray-300  w-[40dvw]  md:w-[35dvw] lg:w-[20dvw]">
      <div className="space-y-2">
        {PRESETS.map(({ label, type }) => (
          <Card
            key={type}
            onClick={() => addText(type)}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <CardContent className="py-3 px-4">
              <span
                className={cn(
                  // choose your text sizes/weights per preset
                  type === "Heading"
                    ? "text-xl font-bold"
                    : type === "Subheading"
                    ? "text-lg font-medium"
                    : "text-base",
                  "text-gray-900"
                )}
              >
                {label}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
