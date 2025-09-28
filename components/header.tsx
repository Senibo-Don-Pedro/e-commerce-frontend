"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import UserNav from "./user-nav";
import { useCartStore } from "@/store/cart-store"; // 1. Import the cart store

export const Header = () => {
  // 2. Get the item count from the store
  const itemCount = useCartStore((state) => state.getItemCount());

  // 3. Hydration fix: This prevents a mismatch between server and client render
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 transition-colors hover:text-blue-700"
        >
          ShopEasy
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/cart" // We'll build this page next
            className="relative p-2 text-gray-600 hover:text-blue-600 rounded-full transition-colors duration-300"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-6 w-6" />

            {/* 4. Conditionally render the count only after the component has mounted */}
            {hasMounted && itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          <UserNav />
        </div>
      </div>
    </header>
  );
};
