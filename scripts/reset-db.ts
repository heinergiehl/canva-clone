// scripts/reset-db.js
import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const db = drizzle(pool)

  // drop + recreate public schema (cascades everything)
  await db.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`)

  console.log("✔️  Schema reset!")
  await pool.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
