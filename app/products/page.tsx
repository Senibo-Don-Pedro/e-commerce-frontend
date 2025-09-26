import ProductList from "@/components/products/product-list";

export default function ProductsPage() {
  return (
    // Set a light, neutral background for the entire page content area
    <div className="w-full bg-gray-50">
      {/* Hero Section with the vibrant gradient */}
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

      {/* Product list section remains clean to focus on the products */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-gray-500">
            <ProductList />
          </div>
        </div>
      </section>
    </div>
  );
}
