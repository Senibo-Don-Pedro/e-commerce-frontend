"use server";

import { setAuthCookie } from "@/lib/auth-cookies";

export async function setSessionCookie(token: string) {
  try {
    await setAuthCookie(token);
    return { success: true };
  } catch (error) {
    console.error("Failed to set session cookie:", error);
    return { 
      success: false, 
      message: "Failed to set authentication cookie" 
    };
  }
}