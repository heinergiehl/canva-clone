"use client"

import React from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useCanvasStore } from "@/lib/canvas-store"
import { cn } from "@/lib/utils"
import { EditActionsBarProps, FONTS, getObjType, ObjType } from "./config"

import { CanvasControls } from "./canvas-controls"
import { GenericControls } from "./generic-controls"
import { TextControls } from "./text-controls"
import { ImageControls } from "./image-controls"
import { ShapeControls } from "./shape-controls"

// Shared opacity slider

// Text-specific controls

// Image-specific controls

// Shape-specific controls

// Map types to components
const ControlMap: Record<ObjType, React.FC<any>> = {
  canvas: CanvasControls,
  text: TextControls,
  image: ImageControls,
  shape: ShapeControls,
  group: ShapeControls,
}

export function EditActionsBar(props: EditActionsBarProps) {
  const api = useCanvasStore()
  const {
    canvas,
    isCanvasSelected,
    bringForward,
    sendBackward,
    bringToFront,
    sendToBack,
    duplicateActive,
    deleteActive,
  } = api
  const obj = canvas?.getActiveObject() ?? null
  const type = getObjType(obj, isCanvasSelected)
  if (!type) return
  const SpecificControls = ControlMap[type]

  // handlers passed to generic controls (others will ignore)
  const handlers = {
    onBringForward: bringForward,
    onSendBackward: sendBackward,
    onBringToFront: bringToFront,
    onSendToBack: sendToBack,
    onDuplicate: duplicateActive,
    onDelete: deleteActive,
  }

  return (
    <div
      id="edit-actions-bar"
      className="mb-4 h-15 flex items-center bg-white rounded-xl shadow-md"
    >
      {type === "canvas" ? (
        <CanvasControls
          bgColor={canvas?.backgroundColor as string}
          onBgChange={props.onCanvasBackgroundChange}
        />
      ) : (
        <ScrollArea
          className="max-w-[43dvw] md:max-w-[48dvw] lg:max-w-[61dvw] lg:w-full"
          type="hover"
        >
          <div className={cn("flex items-center space-x-3 my-2 px-2")}>
            <SpecificControls {...props} activeObj={obj} {...handlers} />
            <GenericControls
              {...handlers}
              onBringForward={bringForward}
              onSendBackward={sendBackward}
              onBringToFront={bringToFront}
              onSendToBack={sendToBack}
              onDuplicate={duplicateActive}
              onDelete={deleteActive}
            />
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  )
}
