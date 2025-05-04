import { publicProcedure, router } from "../trpc"

export const helloRouter = router({
  getHelloWorld: publicProcedure.query(async () => {
    return await "Hello World!"
  }),
})
