// src/components/ui/modal.tsx
"use client"

import * as React from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export interface ModalProps {
  /** What the trigger looks like (button, icon, etc) */
  trigger: React.ReactNode
  /** Title shown at top of modal */
  title: React.ReactNode
  /** Optional description under the title */
  description?: React.ReactNode
  /** Footer area (e.g. action buttons) */
  footer?: React.ReactNode
  /** The body of the modal */
  children: React.ReactNode
}

export function CustomModal({
  trigger,
  title,
  description,
  children,
  footer,
}: ModalProps) {
  return (
    <Dialog>
      {/* You wrap whatever you want to act as the “open” button here */}
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* Your custom content */}
        <div className="py-4 ">{children}</div>

        {/* Optional footer (e.g. Save / Cancel buttons) */}
        {footer && <div className="pt-4 border-t">{footer}</div>}
      </DialogContent>
    </Dialog>
  )
}
