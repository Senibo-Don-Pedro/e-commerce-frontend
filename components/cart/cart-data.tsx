"use client";

import { useEffect, useTransition } from "react";
import { useCartStore } from "@/store/cart-store";
import { getCart } from "@/actions/cart-actions";
import CartItemCard from "./cart-item-card";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { initializePayment } from "@/actions/payment-actions";
import SubmittableButton from "../ui/button-with-submit";
import { toast } from "sonner";

type CartDataProps = {
  isAuthenticated: boolean; // ✅ Changed from accessToken to isAuthenticated
};

export default function CartData({ isAuthenticated }: CartDataProps) {
  const { cart, setCart } = useCartStore();
  const [isRedirecting, startTransition] = useTransition();

  useEffect(() => {
    // ✅ Fetch cart only if authenticated and cart not loaded
    if (isAuthenticated && !cart) {
      getCart().then((response) => {
        if (response.success && response.data) {
          setCart(response.data);
        } else {
          console.error("Failed to fetch cart:", response.message);
        }
      });
    }
  }, [isAuthenticated, cart, setCart]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("You must be signed in to proceed to checkout.");
      return;
    }

    startTransition(async () => {
      toast.info("Redirecting to payment gateway...");
      const response = await initializePayment();

      if (response.success && response.data) {
        window.location.href = response.data.authorizationUrl;
      } else {
        toast.error(
          response.message || "Could not proceed to checkout. Please try again."
        );
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <ShoppingCart className="h-24 w-24 text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Your Cart Awaits
        </h1>
        <p className="text-gray-500 mb-6">Please sign in to view your items.</p>
        <Button asChild>
          <Link href="/auth">Sign In</Link>
        </Button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <ShoppingCart className="h-24 w-24 text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItemCard key={item.itemId} item={item} />
          ))}
        </div>
        <aside className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(cart.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Items</span>
                <span className="font-medium">{cart.totalItems}</span>
              </div>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-between font-bold text-lg">
              <span>Order Total</span>
              <span>{formatCurrency(cart.subtotal)}</span>
            </div>

            <SubmittableButton
              isSubmitting={isRedirecting}
              onClick={handleCheckout}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
            >
              Proceed to Checkout
            </SubmittableButton>
          </div>
        </aside>
      </div>
    </div>
  );
}