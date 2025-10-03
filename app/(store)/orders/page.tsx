import { Suspense } from "react";
import OrderFilters from "@/components/order/order-filters";
import OrderListSkeleton from "@/components/order/order-list-skeleton";
import OrderData from "@/components/order/order-data";
import { OrderResponseParams } from "@/types/order";

// 1. Correct the type for searchParams. It's an object, not a promise.
type OrdersPageProps = {
  searchParams: Promise<OrderResponseParams>;
};

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section (no change) */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Your Order History
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Review your past purchases and track the status of current orders.
          </p>
        </div>
      </section>

      {/* Main Content Area (no change) */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8">
          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <OrderFilters />
          </aside>

          <main className="lg:col-span-3">
            <Suspense fallback={<OrderListSkeleton />}>
              {/* 2. Pass the searchParams down to the data component */}
              <OrderData searchParams={params} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
