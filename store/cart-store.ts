import { create } from 'zustand';
import { Cart, CartItem } from '@/types/cart'; // Import your cart types

// 1. Define the shape of our cart state and actions
type CartState = {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  clearCart: () => void;
  getItemCount: () => number;
};

// 2. Create the store
export const useCartStore = create<CartState>((set, get) => ({
  cart: null,

  // Action to completely replace the cart with new data from the API
  setCart: (cartData) => set({ cart: cartData }),

  // Action to clear the cart, typically used on logout
  clearCart: () => set({ cart: null }),

  // A convenient helper function to get the total number of items
  getItemCount: () => {
    const cart = get().cart;
    return cart?.totalItems || 0;
  },
}));