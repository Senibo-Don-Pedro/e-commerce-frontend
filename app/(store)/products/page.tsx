import { Suspense } from "react"; // 1. Import Suspense from React
import { ProductResponseParams } from "@/types/products";
import ProductFilters from "@/components/products/product-filters";
import ProductListSkeleton from "@/components/products/product-list-skeleton"; // 2. Import our list skeleton
import ProductData from "@/components/products/product-data"; // 3. Import our new data component

type ProductsPageProps = {
  searchParams: Promise<ProductResponseParams>;
};

// 4. The page is NO LONGER an async function. It renders instantly.
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // We don't need `await searchParams` here.
  // We pass the searchParams object directly down.

  const params = await searchParams;

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Here Are Our Products
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Browse our curated collection of high-quality items, selected just
            for you.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8">
          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <ProductFilters />
          </aside>

          {/* SCROLLABLE PRODUCT LIST */}
          <main className="lg:col-span-3">
            {/* 5. THIS IS THE MAGIC */}
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductData searchParams={params} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
