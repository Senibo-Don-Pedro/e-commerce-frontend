// actions/signout-user.ts
"use server";

import { clearAuthCookie } from "@/lib/auth-cookies";
import { revalidatePath } from "next/cache";

export async function signOut() {
  await clearAuthCookie();
  // Optional: revalidate pages that depend on auth state
  revalidatePath("/products");
}