// src/server/db/index.ts
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  jsonb,
  integer,
} from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
export const db = drizzle(pool)

// Now store Clerk’s user ID as the external ID:
export const users = pgTable("users_table", {
  id: serial("id").primaryKey(),
  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
})

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  preview: varchar("preview_url", { length: 255 }).notNull(),
  canvas: jsonb("canvas").notNull(), // the JSON state for this template
})

// alter designs:
export const designs = pgTable("designs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    // ⇣ cascade delete when the parent user is removed
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  templateId: integer("template_id").references(() => templates.id, {
    onDelete: "set null",
  }),
  title: varchar("title", { length: 255 }).notNull(),
  canvas: jsonb("canvas").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  designImage: text("design_image").default("").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect
export type InsertTemplate = typeof templates.$inferInsert
export type SelectTemplate = typeof templates.$inferSelect
export type InsertDesign = typeof designs.$inferInsert
export type SelectDesign = typeof designs.$inferSelect
