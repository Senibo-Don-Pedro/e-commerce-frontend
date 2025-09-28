import { getProducts } from "@/api/get-products";
import { ProductResponseParams } from "@/types/products";
import ApiErrorDisplay from "@/components/ui/api-error-display";
import ProductList from "./product-list";
import PaginationControls from "./pagination-controls";

type ProductDataProps = {
  searchParams: ProductResponseParams;
};

// This is an async component that will be "suspended" while it fetches data.
export default async function ProductData({ searchParams }: ProductDataProps) {
  const response = await getProducts(searchParams);

  if (!response.success || !response.data) {
    return (
      <ApiErrorDisplay message={response.message} errors={response.errors} />
    );
  }

  return (
    <>
      <ProductList products={response.data.items} />
      <PaginationControls
        hasNext={response.data.has_next}
        hasPrev={response.data.has_prev}
      />
    </>
  );
}