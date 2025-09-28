"use client"; // This component now needs to be a client component for the onClick handler

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Import the Button component
import { Product } from "@/types/products";
import { formatCurrency } from "@/lib/utils";
import React from "react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const placeholderImageUrl = `https://placehold.co/600x600/e2e8f0/64748b?text=${encodeURIComponent(
    product.name
  )}`;

  // Handle the Add to Cart button click
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Stop the event from propagating to the parent <Link> component
    e.stopPropagation();
    e.preventDefault();

    console.log(`Added ${product.name} to cart!`);
    // Here you would call your global state management function for the cart
  };

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <Card className="h-full w-full flex flex-col overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="p-0">
          <div className="aspect-square w-full bg-gray-100 relative overflow-hidden">
            <Image
              src={product.imageUrl || placeholderImageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          </div>
        </CardHeader>

        {/* Use flex-grow to make this section fill available space */}
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold leading-tight mb-1">
            {product.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </CardContent>

        {/* Footer now contains price and the button */}
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-lg font-bold text-primary">
            {formatCurrency(product.price)}
          </p>
          
        </CardFooter>
      </Card>
    </Link>
  );
}
