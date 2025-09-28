import { getCart } from "@/actions/cart-actions";
import CartItemCard from "./cart-item-card";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
// This is a placeholder for a function that would securely get the session from cookies on the server.
// In a real app, this would be provided by your auth library (e.g., `auth()` from NextAuth.js).
async function getServerSideAuthToken(): Promise<string | null> {
    // For now, we can't implement this without an auth library, but this is where it would go.
    // We'll need to pass the token from the page for now.
    return null; 
}


type CartDataProps = {
    accessToken: string | null;
}


export default async function CartData({ accessToken }: CartDataProps) {
  // If there's no token, the user is not logged in. Show the empty state.
  if (!accessToken) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
            <ShoppingCart className="h-24 w-24 text-gray-300 mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-500 mb-6">Log in to see your items and start shopping.</p>
            <Button asChild><Link href="/auth">Sign In</Link></Button>
        </div>
    );
  }

  
  const response = await getCart(accessToken);

  // Handle API errors or an empty cart
  if (!response.success || !response.data || response.data.items.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
            <ShoppingCart className="h-24 w-24 text-gray-300 mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
            <Button asChild><Link href="/products">Start Shopping</Link></Button>
        </div>
    );
  }

  const cart = response.data;

  // Render the full cart UI
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => <CartItemCard key={item.itemId} item={item} />)}
        </div>
        <aside className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">{formatCurrency(cart.subtotal)}</span></div>
              <div className="flex justify-between"><span>Items</span><span className="font-medium">{cart.totalItems}</span></div>
              <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg"><span>Total</span><span>{formatCurrency(cart.subtotal)}</span></div>
            </div>
            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Proceed to Checkout</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}