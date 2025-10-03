import PaymentSuccessClient from "@/components/payment/payment-success-client";
import { Suspense } from "react";

// A simple fallback for when the client component is loading
function Loading() {
  return <div className="text-lg font-semibold">Loading your confirmation...</div>;
}

export default function PaymentSuccessPage() {
  return (
    <div className="w-full min-h-[calc(100vh-72px)] flex items-center justify-center bg-gray-50 p-4">
      <Suspense fallback={<Loading />}>
        <PaymentSuccessClient />
      </Suspense>
    </div>
  );
}