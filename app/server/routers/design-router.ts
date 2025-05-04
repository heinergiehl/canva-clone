// src/server/trpc/design.ts
import { z } from "zod"
import { and, count, desc, eq, sql } from "drizzle-orm"
import { protectedProcedure, publicProcedure, router } from "../trpc"
import { designs, SelectDesign, templates } from "@/db"
// your Canvas state schema…
const CanvasState = z
  .object({
    version: z.union([z.number(), z.string()]).optional(),
    objects: z.array(z.record(z.any())),
    background: z.string().nullable(),
  })
  .optional()

export type CanvasState = z.infer<typeof CanvasState>
interface GetDesignsInput {
  page: number
  totalItems: number
}

export interface GetDesignResponse {
  items: SelectDesign[]
  totalPages: number
}
const AspectPreset = z.enum(["16:9", "4:5", "1:1"])
export const designRouter = router({
  getTemplates: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(templates)
  }),
  getDesign: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const row = await ctx.db
        .select()
        .from(designs)
        .where(and(eq(designs.id, input.id), eq(designs.userId, ctx.user!.id)))
        .limit(1)
        .then((r) => r[0])
      if (!row) throw new Error("Design not found")
      return { ...row, canvas: CanvasState.parse(row.canvas) }
    }),
  getDesigns: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        perPage: z.number().min(1).default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, perPage } = input
      // total count:
      const [{ count }] = await ctx.db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(designs)
        .where(eq(designs.userId, ctx.user!.id))

      // fetch this page:
      const items = await ctx.db
        .select()
        .from(designs)
        .where(eq(designs.userId, ctx.user!.id))
        .orderBy(desc(designs.createdAt))
        .limit(perPage)
        .offset((page - 1) * perPage)

      return {
        items: items.map((r) => ({
          ...r,
          canvas: CanvasState.parse(r.canvas),
        })),
        totalPages: Math.ceil(count / perPage),
      }
    }),
  createDesign: protectedProcedure
    .input(
      z.object({
        templateId: z.number().optional(),
        title: z.string().optional(),
        ratio: AspectPreset.optional(),
        width: z.number().optional(),
        height: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let canvasData: CanvasState = {
        version: 4,
        objects: [],
        background: null,
      }
      if (input.templateId) {
        const tpl = await ctx.db
          .select({ canvas: templates.canvas })
          .from(templates)
          .where(eq(templates.id, input.templateId))
          .limit(1)
          .then((r) => r[0])
        if (!tpl) throw new Error("Invalid template")
        canvasData = tpl.canvas as CanvasState
      }
      // determine final dimensions
      let w: number, h: number
      if (input.ratio) {
        switch (input.ratio) {
          case "16:9":
            w = 1920
            h = 1080
            break
          case "4:5":
            w = 1080
            h = 1350
            break
          case "1:1":
            w = 1080
            h = 1080
            break
        }
      } else if (input.width && input.height) {
        w = input.width
        h = input.height
      } else {
        // fallback default
        w = 1080
        h = 1080
      }
      const [newRow] = await ctx.db
        .insert(designs)
        .values({
          userId: ctx.user!.id,
          templateId: input.templateId ?? null,
          title:
            input.title ??
            (input.templateId ? "Template Design" : "Untitled design"),
          width: w,
          height: h,
          canvas: canvasData,
        })
        .returning()
      return { id: newRow.id }
    }),
  updateDesign: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        canvas: CanvasState,
        title: z.string().optional(),
        designImage: z.string().optional(), // ← NEW
      })
    )
    .mutation(async ({ input, ctx }) => {
      // build up the SET payload
      console.log("updating design", input)
      const patch: Partial<{
        canvas: any
        title: string
        designImage: string
      }> = {}
      console.log("canvas", input)
      if (input.title != null) patch.title = input.title
      if (input.designImage != null) patch.designImage = input.designImage
      if (input.canvas != null) patch.canvas = input.canvas
      console.log("patch", patch)
      await ctx.db
        .update(designs)
        .set(patch)
        .where(and(eq(designs.id, input.id), eq(designs.userId, ctx.user!.id)))
      return { id: input.id }
    }),

  deleteDesign: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(designs)
        .where(and(eq(designs.id, input.id), eq(designs.userId, ctx.user!.id)))
      return { id: input.id }
    }),
})
