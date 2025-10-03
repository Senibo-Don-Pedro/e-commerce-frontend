import { Order } from "@/types/order";
import OrderCard from "./order-card";

type OrderListProps = {
  orders: Order[];
};

export default function OrderList({ orders }: OrderListProps) {
  // Handle the case where there are no orders to display
  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p className="text-lg font-medium">No orders found.</p>
        <p className="text-sm">It looks like you haven't placed any orders yet.</p>
      </div>
    );
  }

  // Render a list of OrderCard components
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}