// components/order/order-data.tsx

import { getOrders } from "@/actions/get-orders";
import { OrderResponseParams } from "@/types/order";
import ApiErrorDisplay from "@/components/ui/api-error-display"; // 2. Import a component to show API errors
import OrderList from "./order-list";
import PaginationControls from "@/components/products/pagination-controls";

// 3. Define the props for this component
type OrderDataProps = {
  searchParams: OrderResponseParams;
};

export default async function OrderData({ searchParams }: OrderDataProps) {
  // 5. Call your server action with the searchParams from the page
  const response = await getOrders(searchParams);

  // 6. Handle potential API errors gracefully
  if (!response.success || !response.data) {
    return <ApiErrorDisplay message={response.message} errors={response.errors} />;
  }

  // 7. Render the list and pagination controls with REAL data
  return (
    <>
      <OrderList orders={response.data.items} />
      <PaginationControls
        hasNext={response.data.has_next}
        hasPrev={response.data.has_prev}
      />
    </>
  );
}