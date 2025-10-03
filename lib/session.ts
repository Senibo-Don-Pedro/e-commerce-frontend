import "server-only";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * Verifies the JWT token from the request cookies and returns the payload.
 * Throws an error if the token is invalid or missing.
 * @returns The decoded JWT payload.
 */
export async function verifyAuth() {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    throw new Error("Missing user token");
  }

  try {
    const verified = await jwtVerify(
      token,
      // new TextEncoder().encode(process.env.JWT_SECRET)
      // ✅ Correct
      Buffer.from(process.env.JWT_SECRET!, "base64")
    );

    console.log("JWT Payload:", verified.payload);

    // ✅ FIX: Handle both "role" and "roles" from JWT
    const payload = verified.payload;
    const role = payload.roles || payload.role; // Try "roles" first, fallback to "role"

    return {
      ...payload,
      role: role, // Normalize to "role"
      uid: payload.uid,
      sub: payload.sub,
    };

    return verified.payload; // This is the decoded user data
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    throw new Error("Your token has expired or is invalid.");
  }
}
