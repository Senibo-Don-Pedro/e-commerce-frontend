"use server";

import { API_BASE_URL } from "@/types";
import { AddToCartPayload, CartResponse } from "@/types/cart";

export async function addItemToCart(
  payload: AddToCartPayload,
  accessToken: string
): Promise<CartResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });
    // We can directly return the JSON body, as its shape matches our CartResponse.
    return response.json();
  } catch (error) {
    console.error("[ADD_TO_CART_ACTION] Error:", error);
    // Return an error object that matches the universal ApiResponse shape.
    return {
      success: false,
      message: "An unexpected network error occurred.",
      data: null,
      errors: null,
    };
  }
}


/**
 * Gets the current user's cart.
 * @param accessToken - The user's JWT for authentication.
 * @returns The user's cart object or an error response.
 */
export async function getCart(accessToken: string): Promise<CartResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      next: { revalidate: 0 }, // Ensure cart is never cached
    });

    return response.json();

  } catch (error) {
    console.error("[GET_CART_ACTION] Error:", error);
    return {
      success: false,
      message: "An unexpected network error occurred.",
      data: null,
      errors: null,
    };
  }
}

/**
 * Removes an entire line item from the user's cart.
 * @param itemId - The ID of the cart item to remove.
 * @param accessToken - The user's JWT for authentication.
 * @returns The updated cart object or an error response.
 */
export async function removeItemFromCart(
  itemId: string,
  accessToken: string
): Promise<CartResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    return response.json();
    
  } catch (error) { // Corrected the typo here
    console.error("[REMOVE_FROM_CART_ACTION] Error:", error);
    return {
      success: false,
      message: "An unexpected network error occurred.",
      data: null,
      errors: null,
    };
  }
}