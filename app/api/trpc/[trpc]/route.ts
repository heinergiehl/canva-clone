import { appRouter } from "@/app/server"
import { Hono } from "hono"
import { trpcServer } from "@hono/trpc-server"
import { handle } from "hono/vercel"
import { createContext } from "@/app/server/context"
const app = new Hono()
app.use(
  "/api/trpc/*",
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
  })
)

export const GET = handle(app)
export const POST = handle(app)
