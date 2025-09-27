import { notFound } from "next/navigation";
// Import your actual fetching function
import { getProductById } from "@/api/get-single-product";
import ProductDetailsClient from "@/components/products/product-details"; // Make sure this path is correct

type ProductPageProps = {
  params: {
    productId: string;
  };
};

// This component now becomes async to allow for data fetching
export default async function ProductPage({ params }: ProductPageProps) {
  const awaitedParams = await params;
  const { productId } = awaitedParams;

  // --- Live Data Fetching ---
  // 1. We call our robust function to get the product data.
  const response = await getProductById(productId);

  // 2. We check the 'success' flag from the API response.
  //    If the call failed or the product was not found, we show a 404 page.
  if (!response || !response.success) {
    notFound(); // This is a special Next.js function that renders the 404 page.
  }

  // 3. If the call was successful, we know `response.data` contains our product.
  //    We pass the live product data to our client component.
  return <ProductDetailsClient product={response.data} />;
}
