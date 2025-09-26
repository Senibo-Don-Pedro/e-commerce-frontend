import { mockProducts } from "@/lib/placeholder-data";
import ProductCard from "./product-card";




export default async function ProductList() {
  // In a real app, you would fetch this data from an API.
  const products = mockProducts;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
