#!/usr/bin/env bunx
import "dotenv/config"
import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"

import fs from "fs/promises"
import path from "path"
import { templates } from "@/db"

async function seedTemplates() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const db = drizzle(pool)

  const templatesDir = path.join(process.cwd(), "public", "templates")
  const dirents = await fs.readdir(templatesDir, { withFileTypes: true })

  for (const dirent of dirents.filter((d) => d.isDirectory())) {
    const slug = dirent.name
    const folder = path.join(templatesDir, slug)

    // read thumbnail + JSON
    const previewUrl = `/templates/${slug}/preview.png`
    const jsonRaw = await fs.readFile(
      path.join(folder, "template.json"),
      "utf-8"
    )
    const canvasObj = JSON.parse(jsonRaw)

    // upsert by name
    await db
      .insert(templates)
      .values({
        name: slug.replace(/[-_]/g, " "),
        preview: previewUrl,
        canvas: canvasObj,
      })
      .onConflictDoNothing({ target: templates.name })

    console.log(`✅ Seeded template “${slug}”`)
  }

  await pool.end()
}

seedTemplates().catch((err) => {
  console.error(err)
  process.exit(1)
})
