// lib/auth-cookies.ts
"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "access_token";

/**
 * Retrieves the authentication token from the server's cookies.
 * This function can only be used in a server-side context.
 * @returns The access token string or `undefined` if not found.
 */
export async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  console.log(token)

  return token ? token.trim() : undefined;
}

/**
 * Sets the authentication token in a secure, httpOnly cookie.
 * This function can only be used in a server-side context.
 * @param token - The access token to set.
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Clears the authentication cookie, effectively logging the user out from the server's perspective.
 * This function can only be used in a server-side context.
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  // Set the cookie with a maxAge of 0 to delete it
  cookieStore.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
