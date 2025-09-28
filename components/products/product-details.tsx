"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { addItemToCart } from "@/actions/cart-actions";

import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Product } from "@/types/products";
import { formatCurrency } from "@/lib/utils";
import SubmittableButton from "@/components/ui/button-with-submit"; // Using your reusable button

type ProductDetailsClientProps = {
  product: Product;
};

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  // 1. Get what we need from our Zustand stores
  const { accessToken, isAuthenticated } = useAuthStore();
  const setCart = useCartStore((state) => state.setCart);

  // 2. The handler function for the "Add to Cart" button click
  const handleAddToCart = async () => {
    // First, check if the user is logged in
    if (!isAuthenticated() || !accessToken) {
      toast.error("Please sign in to add items to your cart.");
      router.push("/auth"); // Redirect to the authentication page
      return;
    }

    setIsAdding(true);

    // Call the server action with the selected quantity and the auth token
    const response = await addItemToCart(
      { productId: product.id, quantity },
      accessToken
    );

    if (response.success && response.data) {
      // 3. On success, update the global cart store with the fresh data
      setCart(response.data);
      toast.success(`${quantity} x ${product.name} added to your cart!`);
    } else {
      toast.error(response.message || "Could not add item to cart.");
    }

    setIsAdding(false);
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

          <p className="text-3xl font-bold text-blue-600 mb-4">
            {formatCurrency(product.price)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold text-sm">QUANTITY:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <SubmittableButton
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isAdding}
              >
                <Minus className="h-4 w-4" />
              </SubmittableButton>
              <span className="px-4 font-bold">{quantity}</span>
              <SubmittableButton
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                disabled={isAdding}
              >
                <Plus className="h-4 w-4" />
              </SubmittableButton>
            </div>
          </div>

          {/* 4. Use the reusable submittable button and connect the handler */}
          <SubmittableButton
            onClick={handleAddToCart}
            isSubmitting={isAdding}
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Add to Cart
          </SubmittableButton>
        </div>
      </div>
    </div>
  );
}