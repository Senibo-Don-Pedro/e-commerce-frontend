"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { removeItemFromCart } from "@/actions/cart-actions";
import { CartItem } from "@/types/cart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type CartItemCardProps = {
  item: CartItem;
};

export default function CartItemCard({ item }: CartItemCardProps) {
  const { accessToken } = useAuthStore();
  const { setCart } = useCartStore();
  const [isRemoving, setIsRemoving] = useState(false);

  const placeholderImageUrl = `https://placehold.co/150x150/e2e8f0/64748b?text=${encodeURIComponent(
    item.productName
  )}`;

  const handleRemoveItem = async () => {
    if (!accessToken) {
      toast.error("You must be signed in to modify your cart.");
      return;
    }

    setIsRemoving(true);
    const response = await removeItemFromCart(item.itemId, accessToken);

    if (response.success && response.data) {
      setCart(response.data);
      toast.success(`${item.productName} removed from cart.`);
    } else {
      toast.error(response.message || "Failed to remove item.");
    }
    setIsRemoving(false);
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg relative">
      <Link href={`/products/${item.productId}`}>
        <div className="relative h-24 w-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={item.imageUrl || placeholderImageUrl}
            alt={item.productName}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </Link>
      <div className="flex-grow">
        <Link href={`/products/${item.productId}`}>
          <h3 className="font-semibold hover:underline">{item.productName}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          Unit Price: {formatCurrency(item.unitPrice)}
        </p>
        <p className="text-sm text-muted-foreground">
          Quantity: {item.quantity}
        </p>
        <p className="font-semibold mt-1">
          Total: {formatCurrency(item.lineTotal)}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        onClick={handleRemoveItem}
        disabled={isRemoving}
        aria-label="Remove item"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}