import { db, users } from "@/db"
import { currentUser } from "@clerk/nextjs/server"

import { publicProcedure, router } from "../trpc"
import { eq } from "drizzle-orm"

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ ctx }) => {
    console.log("ctx", ctx)
    const auth = ctx.auth
    const userId = auth.userId
    if (!userId) {
      return {
        isSynched: false,
      }
    }
    console.log("userId", userId)
    const userDb = db.select().from(users).where(eq(users.clerkUserId, userId))

    if (!userDb) {
      console.log("userDb", userDb)
      const newUser = await db.insert(users).values({
        clerkUserId: userId,
        email: await currentUser().then(
          (user) => user!.emailAddresses[0].emailAddress
        ),
      })
      return {
        isSynched: false,
      }
    }

    return {
      isSynched: true,
    }
  }),
})

// route.ts
