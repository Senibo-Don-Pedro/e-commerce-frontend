// This file re-exports the `auth` function from our main auth.ts file.
// NextAuth.js automatically recognizes this and applies authentication protection.
export { auth as middleware } from "@/auth";

// Optionally, you can use a matcher to specify which routes to protect.
// If you don't include this, all routes will be protected by default.
export const config = {
  matcher: ["/cart", "/orders", "/profile"], // Example: protect these pages
};