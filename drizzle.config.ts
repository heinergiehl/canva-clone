import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env" })
console.log(process.env.DATABASE_URL)
export default defineConfig({
  schema: "./db/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
