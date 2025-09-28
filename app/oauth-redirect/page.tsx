"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore, User } from "@/store/auth-store";
import { API_BASE_URL } from "@/types";
import { Loader2 } from "lucide-react";
import FormError from "@/components/auth/form-error";

// This must match the UserDto from your Spring Boot backend

export default function OauthRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const loginToStore = useAuthStore((state) => state.login);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");

    // We define an async function inside the useEffect
    const handleAuthCallback = async () => {
      if (!token) {
        setError(
          "Authentication failed. No token was provided in the redirect."
        );
        return;
      }

      try {
        // --- THIS IS THE NEW LOGIC ---
        // 1. We start the `try` block for our network call.
        const response = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // If the response is not OK, we throw an error to be caught by the `catch` block.
          throw new Error("Failed to fetch user profile from the backend.");
        }

        const apiResponse = await response.json();

        if (apiResponse.success && apiResponse.data) {
          const profile: User = apiResponse.data;

          // 2. Success! Save the user and token to the store.
          loginToStore(profile, token);

          // 3. Redirect to the homepage.
          router.push("/products");
        } else {
          throw new Error(apiResponse.message || "Invalid user profile data.");
        }
      } catch (err) {
        // 4. Any error from the `try` block will be caught here.
        console.error("OAuth callback error:", err);
        // We check if 'err' is an Error object to safely access its message property
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred.";
        setError(`Could not verify your login. ${errorMessage}`);
      }
    };

    // We call the async function to execute it.
    handleAuthCallback();
  }, [searchParams, router, loginToStore]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center p-4">
      {error ? (
        <FormError message={error} />
      ) : (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-6" />
          <h1 className="text-2xl font-bold text-gray-800">
            Finalizing your secure login...
          </h1>
          <p className="text-gray-500">Please wait a moment.</p>
        </>
      )}
    </div>
  );
}
