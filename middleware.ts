// ============================================
// 2. FIX: middleware.ts (Updated)
// ============================================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/session";

export const config = {
  matcher: ["/orders/:path*", "/cart", "/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  try {
    const payload = await verifyAuth();
    const { pathname } = request.nextUrl;
    
    // ✅ FIX: Handle the "roles" field from your JWT
    const userRole = (payload.roles || payload.role) as string;

    console.log(`Middleware: User role is ${userRole} for path ${pathname}`);

    // Block non-admins from admin routes
    if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
      console.log(`Unauthorized: ${userRole} tried to access ${pathname}`);
      return NextResponse.redirect(new URL("/products", request.url));
    }

    // Optional: Redirect admins from customer routes
    if ((pathname.startsWith("/cart") || pathname.startsWith("/orders")) && userRole === "ADMIN") {
      console.log(`Admin redirected from ${pathname} to /admin`);
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Authentication error in middleware:", err);

    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);

    const response = NextResponse.redirect(loginUrl);
    response.cookies.set("accessToken", "", { maxAge: 0 });

    return response;
  }
}
