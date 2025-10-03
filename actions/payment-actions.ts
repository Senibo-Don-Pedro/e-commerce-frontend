"use server";

import { API_BASE_URL } from "@/types";
import { PaymentInitializationResponse } from "@/types/payment";

import { getAuthToken } from "@/lib/auth-cookies";

/**
 * Calls the backend to initialize a Paystack payment transaction.
 * This should only be called when the user's cart is not empty.
 * @param accessToken - The user's JWT for authentication.
 * @returns The response from the backend, containing the Paystack authorization URL.
 */
export async function initializePayment(): Promise<PaymentInitializationResponse> {
  const accessToken = await getAuthToken();

  try {
    console.log(accessToken);
    const response = await fetch(`${API_BASE_URL}/payments/initialize`, {
      method: "POST",
      headers: {
        // We don't need a Content-Type here since we are not sending a body.
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: PaymentInitializationResponse = await response.json();

    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      // Create a specific error object to match your ApiResponse type
      const errorResponse: PaymentInitializationResponse = {
        success: false,
        message: data.message || "Failed to initialize payment.",
        errors: data.errors,
      };
      return errorResponse;
    }

    return data;
  } catch (error) {
    console.error("[INITIALIZE_PAYMENT_ACTION] Error:", error);
    // Return a generic error that matches your ApiResponse shape
    return {
      success: false,
      message: "An unexpected network error occurred.",
      errors: null,
    };
  }
}
