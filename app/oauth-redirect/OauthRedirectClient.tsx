"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore, User } from "@/store/auth-store";
import { API_BASE_URL } from "@/types";
import { Loader2 } from "lucide-react";
import { setSessionCookie } from "@/actions/set-session-cookie";
import { toast } from "sonner";

export default function OauthRedirectClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser); // ✅ Use setUser

  const token = searchParams.get("token");
  const error = searchParams.get("error");

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (error) {
        toast.error(`Authentication failed: ${error}`);
        router.push("/auth");
        return;
      }

      if (!token) {
        toast.error("Authentication failed: No token was provided.");
        router.push("/auth");
        return;
      }

      try {
        // 1. Set the httpOnly cookie first (server action)
        const cookieResult = await setSessionCookie(token);
        if (!cookieResult.success) {
          throw new Error("Failed to set authentication cookie");
        }

        // 2. Fetch user profile
        const response = await fetch(`${API_BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const apiResponse = await response.json();

        if (apiResponse?.success && apiResponse?.data) {
          const profile: User = apiResponse.data;

          // ✅ Store only user data (not token)
          setUser(profile);
          
          toast.success("Login successful! Welcome back.");
          router.push("/products");
        } else {
          throw new Error(apiResponse?.message || "Invalid user profile data");
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        const msg = err instanceof Error ? err.message : "An unknown error occurred";
        toast.error(`Login failed: ${msg}`);
        router.push("/auth");
      }
    };

    handleAuthCallback();
  }, [token, error, router, setUser]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center p-4">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-6" />
      <h1 className="text-2xl font-bold text-gray-800">
        Finalizing your secure login...
      </h1>
      <p className="text-gray-500">Please wait a moment.</p>
    </div>
  );
}