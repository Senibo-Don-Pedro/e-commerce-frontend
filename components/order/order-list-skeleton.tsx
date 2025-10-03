import OrderCardSkeleton from "./order-card-skeleton";

export default function OrderListSkeleton() {
  // Display a few skeletons to give a sense of a list loading
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </div>
  );
}