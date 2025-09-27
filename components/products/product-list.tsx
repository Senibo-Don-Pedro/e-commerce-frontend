import { Product } from "@/types/products";
import ProductCard from "./product-card";

// The component now expects a prop called "products"
type ProductListProps = {
  products: Product[];
};

export default async function ProductList({ products }: ProductListProps) {
  // This is a great check to have, in case the list is empty.
  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No products found.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
