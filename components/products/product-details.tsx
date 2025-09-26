"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// Star import is now removed
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Product } from "@/types/products";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ProductDetailsClientProps = {
  product: Product;
};

export default function ProductDetailsClient({
  product,
}: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart.`);
    // In a real app, you'd call a function here to update your cart state.
  };

  const placeholderImageUrl = `https://placehold.co/600x600/e2e8f0/64748b?text=${encodeURIComponent(
    product.name
  )}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        href="/products"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-0 sm:mt-6 mb-6 group"
      >
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="aspect-square w-full bg-gray-100 rounded-lg shadow-lg relative overflow-hidden">
          <Image
            src={product.imageUrl || placeholderImageUrl}
            alt={product.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Details Section */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-muted-foreground mb-4">
            {product.category}
          </p>

          {/* --- STAR RATING SECTION REMOVED --- */}

          <p className="text-3xl font-bold text-blue-600 mb-4">
            {formatCurrency(product.price)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold text-sm">QUANTITY:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 font-bold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button onClick={handleAddToCart} size="lg" className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
