"use client";

import { useAuthStore } from "@/store/auth-store";
import CartData from "./cart-data";

// This component is our bridge. It connects to the client-side Zustand store.
export default function CartLoader() {
  // It gets the accessToken from the store.
  const { isAuthenticated } = useAuthStore();

  // It then renders the actual data-fetching component, passing the token as a prop.
  return <CartData isAuthenticated={isAuthenticated()} />;
}
