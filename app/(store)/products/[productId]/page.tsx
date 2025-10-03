import { Suspense } from "react"; // 1. Import Suspense
import ProductDetailsData from "@/components/products/product-details-data"; // 2. Import our new data component
import ProductDetailsSkeleton from "@/components/products/product-details-skeleton"; // 3. Import our new skeleton component

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

// 4. The page is NO LONGER async. It renders instantly.
export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  return (
    // You can wrap this in any parent layout components if you have them
    <div className="w-full bg-white">
      {/* 5. We wrap the data-fetching component in Suspense */}
      <Suspense fallback={<ProductDetailsSkeleton />}>
        {/* The component that actually fetches the data */}
        <ProductDetailsData productId={productId} />
      </Suspense>
    </div>
  );
}
