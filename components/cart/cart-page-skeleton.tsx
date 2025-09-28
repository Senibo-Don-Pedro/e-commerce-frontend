import { Skeleton } from "@/components/ui/skeleton";

// A skeleton for a single cart item
const CartItemSkeleton = () => (
  <div className="flex items-center gap-4 p-4 border rounded-lg">
    <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
    <div className="flex-grow space-y-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  </div>
);

// The full page skeleton
export default function CartPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Skeleton className="h-8 w-1/3 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Items List Skeleton */}
        <div className="md:col-span-2 space-y-4">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>

        {/* Order Summary Skeleton */}
        <aside className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <Skeleton className="h-6 w-1/2 mb-4" />
            <div className="space-y-3">
              <div className="flex justify-between"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-4 w-1/3" /></div>
              <div className="flex justify-between"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-4 w-1/3" /></div>
              <div className="border-t pt-4 mt-4 flex justify-between"><Skeleton className="h-6 w-1/3" /><Skeleton className="h-6 w-1/4" /></div>
            </div>
            <Skeleton className="h-10 w-full mt-6" />
          </div>
        </aside>
      </div>
    </div>
  );
}