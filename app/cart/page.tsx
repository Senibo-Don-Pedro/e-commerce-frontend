"use client"; // This must be a client component to access the auth store

import { Suspense } from "react";
import { useAuthStore } from "@/store/auth-store";
import CartPageSkeleton from "@/components/cart/cart-page-skeleton";
import CartData from "@/components/cart/cart-data";

export default function CartPage() {
  // We get the token from our client-side auth store
  const { accessToken } = useAuthStore();

  return (
    // The Suspense boundary shows the skeleton while the CartData component fetches information
    <Suspense fallback={<CartPageSkeleton />}>
      {/* We pass the access token to our data-fetching component */}
      <CartData accessToken={accessToken} />
    </Suspense>
  );
}