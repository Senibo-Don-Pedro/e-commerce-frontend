"use client";

import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { getCart } from "@/actions/cart-actions";
import { useEffect, useRef } from "react";

// This component's only job is to initialize the cart store from the server.
export default function CartInitializer() {
  const { accessToken, isAuthenticated } = useAuthStore();
  const { cart, setCart } = useCartStore();
  
  // We use a ref to make sure this initialization effect runs only ONCE.
  const hasInitialized = useRef(false);

  useEffect(() => {
    // We only run this if:
    // 1. The user is logged in.
    // 2. We don't already have cart data in our store.
    // 3. We haven't already run this initialization.
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