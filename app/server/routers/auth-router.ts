import { db, users } from "@/db"
import { clerkClient, currentUser } from "@clerk/nextjs/server"

import { protectedProcedure, publicProcedure, router } from "../trpc"
import { eq } from "drizzle-orm"

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ ctx }) => {
    const auth = ctx.auth
    const userId = auth.userId
    if (!userId) {
      return {
        isSynched: false,
      }
    }
    console.log("userId", userId)
    const userDb = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1)
      .then((r) => r[0])

    if (!userDb) {
      const newUser = await db.insert(users).values({
        clerkUserId: userId,
        email: await currentUser().then(
          (user) => user!.emailAddresses[0].emailAddress
        ),
      })
      console.log("newUser69", newUser)
      return {
        isSynched: false,
      }
    }

    return {
      isSynched: true,
    }
  }),
  deleteUser: protectedProcedure.mutation(async ({ ctx }) => {
    const auth = ctx.auth
    const userId = auth.userId
    if (!userId) {
      return {
        isSynched: false,
      }
    }
    console.log("userId", userId)
    const userDb = await db
      .delete(users)
      .where(eq(users.clerkUserId, userId))
      .returning()
      .then((r) => r[0])

    const newClerkClient = await clerkClient()
    const result = await newClerkClient.users.deleteUser(userId)
    console.log("result", result)
    return {
      isSynched: true,
    }
  }),
})

// route.ts
