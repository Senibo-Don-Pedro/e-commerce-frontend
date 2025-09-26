"use client";

import Link from "next/link";
// Assuming you're using lucide-react for icons, which is common with shadcn/ui
import { ShoppingCart } from "lucide-react";

export const Header = () => {
  // This is a placeholder to show how the cart count would look.
  // In a real app, this would come from your state management (e.g., Context, Zustand).
  const getTotalItems = () => 3;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600 transition-colors hover:text-blue-700">
          ShopEasy
        </Link>
        
        <Link 
          href="/cart" 
          className="relative p-2 text-gray-600 hover:text-blue-600 rounded-full transition-colors duration-300"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="h-6 w-6" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};