"use client";

import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { getCart } from "@/actions/cart-actions";
import { useEffect, useRef, useState } from "react";
import { getAuthToken } from "@/lib/auth-cookies";

// This component's only job is to initialize the cart store from the server.
export default function CartInitializer() {
  const { isAuthenticated } = useAuthStore();
  const { cart, setCart } = useCartStore();
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  async function fetchAccessToken() {
    const token = await getAuthToken();
    setAccessToken(token);
  }

  // We use a ref to make sure this initialization effect runs only ONCE.
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Fetch the access token when the component mounts
    fetchAccessToken();
  }, []); // Empty dependency array means this runs only once when the component mounts

  useEffect(() => {
    // We only run this if:
    // 1. The user is logged in.
    // 2. We have an access token.
    // 3. We don't already have cart data in our store.
    // 4. We haven't already run this initialization.
    if (isAuthenticated() && accessToken && !cart && !hasInitialized.current) {
      // Mark as initialized so it doesn't run again on navigation.
      hasInitialized.current = true;

      getCart().then((response) => {
        if (response.success && response.data) {
          // Put the fresh cart data into our global store.
          setCart(response.data);
        }
      });
    }
  }, [isAuthenticated, accessToken, cart, setCart]);

  // This component renders nothing. It's for logic only.
  return null;
}
