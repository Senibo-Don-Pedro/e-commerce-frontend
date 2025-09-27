import { getProducts } from "@/api/get-products";
import ProductList from "@/components/products/product-list";
import ApiErrorDisplay from "@/components/ui/api-error-display";
import { ProductResponseParams } from "@/types/products";
import ProductFilters from "@/components/products/product-filters";
import PaginationControls from "@/components/products/pagination-controls";

type ProductsPageProps = {
  searchParams: ProductResponseParams;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {

  const params = await searchParams;

  const response = await getProducts(params);

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
          {/* STICKY SIDEBAR */}
          {/* On large screens, this sidebar will stick to the top as you scroll */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <ProductFilters />
          </aside>

          {/* SCROLLABLE PRODUCT LIST */}
          <main className="lg:col-span-3">
            {response.success ? (
              <>
                <ProductList products={response.data.items} />
                <PaginationControls
                  hasNext={response.data.has_next}
                  hasPrev={response.data.has_prev}
                />
              </>
            ) : (
              <ApiErrorDisplay
                message={response.message}
                errors={response.errors}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
