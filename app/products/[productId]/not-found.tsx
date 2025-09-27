import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackageSearch } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center p-4">
      <PackageSearch className="h-24 w-24 text-gray-300 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Product Not Found
      </h1>
      <p className="text-lg text-gray-500 mb-8 max-w-md">
        Sorry, we couldn't find the product you were looking for. It might be
        out of stock or no longer available.
      </p>
      <Button asChild>
        <Link href="/products">Browse All Products</Link>
      </Button>
    </div>
  );
}
