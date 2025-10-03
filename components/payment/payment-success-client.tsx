"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();

  // Get the transaction reference to display to the user
  const transactionRef = searchParams.get("trxref");

  // When this component loads, the payment was successful, so we clear the cart.
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Card className="w-full max-w-lg mx-auto text-center">
      <CardHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="mt-4 text-2xl">Thank You For Your Order!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">
          Your payment was successful and your order is now being processed.
          Your backend is confirming the final details. You will see your order
          in your account shortly.
        </p>

        {transactionRef && (
          <div className="border-t border-b py-4">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <dt className="text-muted-foreground">Transaction Ref:</dt>
                <dd className="font-mono text-gray-800">{transactionRef}</dd>
              </div>
            </dl>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button asChild className="flex-1">
            <Link href="/orders">View My Orders</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}