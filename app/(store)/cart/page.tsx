import { Suspense } from "react";
import CartPageSkeleton from "@/components/cart/cart-page-skeleton";
import CartLoader from "@/components/cart/cart-loader";

// This is a pure Server Component. It renders instantly.
export default function CartPage() {
  return (
    <div className="w-full bg-white">
      {/* The Suspense boundary shows the skeleton immediately */}
      <Suspense fallback={<CartPageSkeleton />}>
        {/* We delegate the client-side work to our Loader component */}
        <CartLoader />
      </Suspense>

      
    </div>
  );
}