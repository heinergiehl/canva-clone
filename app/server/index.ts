import { helloRouter } from "./routers/hello"

import { router } from "./trpc"
import { authRouter } from "./routers/auth-router"
import { designRouter } from "./routers/design-router"
import { iconsRouter } from "./routers/icons-router"

const appRouter = router({
  hello: helloRouter,
  auth: authRouter,
  design: designRouter,
  icons: iconsRouter,
})
export { appRouter }
export type AppRouter = typeof appRouter
