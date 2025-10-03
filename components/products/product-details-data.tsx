import { notFound } from "next/navigation";
import { getProductById } from "@/actions/get-single-product";
import ProductDetailsClient from "./product-details"; // Your original client component

type ProductDetailsDataProps = {
  productId: string;
};

// This async component fetches the data and will be suspended by Suspense
export default async function ProductDetailsData({ productId }: ProductDetailsDataProps) {
  const response = await getProductById(productId);

  // If the product isn't found or an error occurs, we trigger the not-found page.
  if (!response || !response.success || !response.data) {
    notFound();
  }

  // Once the data is ready, we render the real client component with the data.
  return <ProductDetailsClient product={response.data} />;
}