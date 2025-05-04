// src/server/trpc/context.ts
import { db, users } from "@/db"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function createContext() {
  // 1) Get Clerk session
  const { userId } = await auth()

  // 2) Optionally load your user record
  let user = null
  if (userId) {
    const [u] = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1)
    user = u || null
  }

  // 3) Return auth + db + user
  return {
    auth: { userId },
    db,
    user,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
