// src/app/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth, UserButton } from "@clerk/nextjs"
import { trpc } from "../_trpc/client"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { RecentDesignOnPage } from "@/components/recent-design-on-page"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Trash2Icon, Variable } from "lucide-react"

const PAGE_SIZE = 6

function DeleteAccountDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const authMutation = trpc.auth.deleteUser.useMutation()
  const { signOut } = useAuth()
  console.log("DeleteAccountDialog", open, authMutation.isPending)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="ml-2"
            disabled={authMutation.isPending || authMutation.isSuccess}
            onClick={() => {
              // Call the delete account mutation
              authMutation.mutate(undefined, {
                onSuccess: () => {
                  signOut()
                },
              })
            }}
          >
            {authMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash2Icon className="mr-2" />
            )}
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function Home() {
  const searchParams = useSearchParams()

  // read `?page=...` from the URL, default to 1
  const pageParam = parseInt(searchParams.get("page") ?? "1", 10)
  const [page, setPage] = useState(pageParam)

  // keep state in sync if the user clicks browser back/forward
  useEffect(() => {
    setPage(pageParam)
  }, [pageParam])

  const {
    data: { items: recentDesigns = [], totalPages = 1 } = {},
    isFetching: isFetchingRecentDesigns,
  } = trpc.design.getDesigns.useQuery({ page, perPage: PAGE_SIZE })
  const authQuery = trpc.auth.getDatabaseSyncStatus.useQuery()
  const authMutation = trpc.auth.deleteUser.useMutation()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-gray-100 shadow-lg rounded-md w-[calc(100dvw-6rem)] h-[97dvh] p-4 ">
        {/* top bar */}
        <header className="h-[56px] flex justify-end items-center">
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
        </header>

        {/* banner */}
        <div className="relative h-[180px] mb-6 rounded-md overflow-hidden">
          <Image
            src="/pages/projects.webp"
            alt="Projects"
            fill
            className="object-cover"
          />
          <h1 className="absolute text-4xl font-bold text-white left-5 bottom-5">
            Projects
          </h1>
        </div>

        {/* recent designs */}
        <section
          aria-label="Recent Designs"
          className="flex flex-col justify-between items-center space-y-8 w-full "
        >
          {isFetchingRecentDesigns ? (
            <Skeleton className="w-[166px] h-[32px] mb-4" />
          ) : (
            <h3 className="font-semibold text-2xl mb-4 inline-block">
              Recent Designs
            </h3>
          )}

          <div className="flex gap-4 flex-wrap w-full">
            {isFetchingRecentDesigns ? (
              Array.from({ length: PAGE_SIZE }).map((_, idx) => (
                <div key={idx} className="w-[219px] h-[217px] ">
                  <Skeleton className="h-[193px] w-full rounded-md" />
                  <Skeleton className="mt-2 h-[24px] w-full" />
                </div>
              ))
            ) : (
              <ScrollArea className="h-[38dvh] w-full">
                <div className="flex justify-start items-center flex-wrap w-full gap-4">
                  {recentDesigns.map((design) => (
                    <RecentDesignOnPage key={design.id} design={design} />
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {/* pagination */}
          {isFetchingRecentDesigns ? (
            <div className="flex justify-center items-center mt-6">
              <Skeleton className="w-[300px] h-[32px]" />
            </div>
          ) : (
            <Pagination className="flex justify-center items-center mt-6">
              <PaginationContent>
                {page !== 1 && !!totalPages && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={`?page=${Math.max(1, page - 1)}`}
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <PaginationItem key={num}>
                      <PaginationLink
                        href={`?page=${num}`}
                        isActive={num === page}
                      >
                        {num}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  {page !== totalPages && !!totalPages && (
                    <PaginationNext
                      href={`?page=${Math.min(totalPages, page + 1)}`}
                    />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </section>
      </div>
      <DeleteAccountDialog
        open={openDeleteDialog}
        onOpenChange={(open) => {
          setOpenDeleteDialog(open)
        }}
      />
    </div>
  )
}
