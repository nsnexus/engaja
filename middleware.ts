// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes requiring admin role — enforced client-side with layout guard
// Middleware handles the initial redirect if no session cookie exists.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    // Firebase Auth uses client-side tokens; session cookie approach needed
    // for SSR auth. For now: client AdminGuard handles the redirect.
    // Uncomment below to add a cookie-based check once Firebase session cookies are configured.
    // const session = request.cookies.get("__session");
    // if (!session) return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
