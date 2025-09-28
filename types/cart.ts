import { ApiResponse } from ".";

// The shape of a single item within the cart
export type CartItem = {
  itemId: string;
  productId: string;
  productName: string;

  imageUrl: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

// The shape of the entire cart object
export type Cart = {
  id: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
};

// The shape of the data needed to add an item to the cart
export type AddToCartPayload = {
  productId: string;
  quantity: number;
};

// The final, specific type for API responses that return a Cart object
export type CartResponse = ApiResponse<Cart>;
