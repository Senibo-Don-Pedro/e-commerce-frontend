import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/placeholder-data";
import ProductDetailsClient from "@/components/products/product-details";

type ProductPageProps = {
  params: {
    productId: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params;

  // --- Data Fetching ---
  // In a real app, you would fetch this from your API:
  // const product = await api.products.getById(productId);

  // For now, we'll find the product in our mock data.
  const product = mockProducts.find((p) => p.id === productId);

  // If no product is found for the ID, show a 404 page.
  if (!product) {
    notFound();
  }

  // We pass the fetched data to the client component that handles interaction.
  return <ProductDetailsClient product={product} />;
}
