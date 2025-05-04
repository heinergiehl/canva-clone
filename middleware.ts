// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// 1️⃣ define which routes are public (no auth check)
const publicRoutes = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/(.*)", // if you want all API open—or lock them down separately
])

export default clerkMiddleware(
  // 2️⃣ your custom auth hook
  async (auth, req: NextRequest) => {
    // if this request is NOT one of our public routes...
    if (!publicRoutes(req)) {
      // protect() will
      //  • redirect to sign‑in if it's a page request
      //  • return 404 for API calls
      await auth.protect()
    }
  },
  {
    // optional: turn on console.debug for Clerk internals in dev
    debug: false,
  }
)

// 3️⃣ which incoming requests hit this middleware
export const config = {
  matcher: [
    // skip all Next.js internals & static files:
    "/((?!_next/static|_next/image|favicon.ico|robots.txt).*)",
    // still run on API routes if you want to guard them:
    "/api/:path*",
  ],
}
