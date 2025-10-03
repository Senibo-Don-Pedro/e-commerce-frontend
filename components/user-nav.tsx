"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useState, useEffect, useTransition } from "react";
import { signOut } from "@/actions/signout-user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut, ShoppingBag, User } from "lucide-react";

export default function UserNav() {
  // ✅ Updated: Use clearUser instead of logout
  const { user, clearUser, isAuthenticated } = useAuthStore();
  const { clearCart } = useCartStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Hydration fix - ensures consistent rendering
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Render a placeholder during SSR and initial hydration
    return <div className="h-10 w-10" />;
  }

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    startTransition(async () => {
      try {
        // 1. Clear user from Zustand store first (before redirect)
        clearUser();

        // 2. Clear cart
        clearCart();

        // 3. Call the server action to clear the httpOnly cookie
        // Note: signOut() will automatically redirect, so no need for router.push()
        await signOut();

        // 4. Show success message (may not be visible due to redirect)
        toast.success("Logged out successfully");
      } catch (error) {
        toast.error("Failed to logout. Please try again.");
        console.error("Logout error:", error);
      }
    });
  };

  // Show sign in button if not authenticated
  if (!isAuthenticated() || !user) {
    return (
      <Button variant="default" asChild>
        <Link href="/auth">
          <User className="mr-2 h-4 w-4" />
          Sign In
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full"
          disabled={isPending}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt={`@${user.firstname}`} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(user.firstname)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              Hello, {user.firstname}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            {user.role && (
              <p className="text-xs leading-none text-muted-foreground mt-1">
                Role: {user.role}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View Orders
            </Link>
          </DropdownMenuItem>
          
          {/* Optional: Add admin link if user is admin */}
          {user.role === "ADMIN" && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/admin">
                <User className="mr-2 h-4 w-4" />
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onSelect={handleLogout} 
          className="cursor-pointer text-red-600 focus:text-red-600"
          disabled={isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isPending ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}