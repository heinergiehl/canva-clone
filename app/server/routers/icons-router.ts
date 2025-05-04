// src/server/trpc/icons.ts
import { z } from "zod"
import { publicProcedure, router } from "../trpc"

const ICONS_PER_PAGE = 50

export const iconsRouter = router({
  search: publicProcedure
    .input(
      z.object({
        q: z.string().min(1),
        limit: z.number().min(1).max(100).default(ICONS_PER_PAGE),
        cursor: z.number().nullish(), // <-- cursor defined!
      })
    )
    .query(async ({ input }) => {
      const { q, limit, cursor } = input
      const offset = cursor ?? 0

      // build Iconify search URL
      const url = new URL("https://api.iconify.design/search")
      url.searchParams.set("query", q)
      url.searchParams.set("limit", `${limit}`)
      url.searchParams.set("offset", `${offset}`)

      const res = await fetch(url.toString())
      if (!res.ok) throw new Error(`Iconify API ${res.status}`)

      const json = (await res.json()) as { icons: string[] }
      // map to our shape
      const data = json.icons.map((full) => {
        const [prefix, name] = full.split(":")
        return {
          id: full,
          previewURL: `https://api.iconify.design/${prefix}/${name}.svg?height=80`,
          svgURL: `https://api.iconify.design/${prefix}/${name}.svg`,
        }
      })

      // if we got exactly `limit`, assume there *might* be more
      const nextCursor = data.length === limit ? offset + limit : undefined

      return { data, nextCursor }
    }),
})
