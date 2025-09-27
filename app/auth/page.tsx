"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react"; // Or your own logo icon
import { LoginForm } from "@/components/auth/login-form";
import { SignUpForm } from "@/components/auth/signup-form";

export default function AuthenticationPage() {
  const [view, setView] = useState<"login" | "signup">("login");

  const toggleView = () => {
    setView(view === "login" ? "signup" : "login");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form Section */}
      <div className="flex flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          {view === "login" ? (
            <LoginForm onToggleView={toggleView} />
          ) : (
            <SignUpForm onToggleView={toggleView} />
          )}
        </div>
      </div>

      {/* Themed Gradient Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 relative hidden lg:flex flex-col items-center justify-center text-white p-12">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-3xl font-bold mb-4"
          >
            <ShoppingCart className="h-8 w-8" />
            ShopEasy
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Discover Your Next Favorite Thing
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-md mx-auto">
            Join our community and get access to exclusive deals, fast shipping,
            and a world of amazing products.
          </p>
        </div>
      </div>
    </div>
  );
}
