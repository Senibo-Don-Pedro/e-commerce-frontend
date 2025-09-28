import { Product } from "@/types/products";
import { ApiResponse } from "@/types";
import { API_BASE_URL } from "@/types";

export async function getProductById(
  productId: string
): Promise<ApiResponse<Product>> {
  // The promise is simpler now

  const url = `${API_BASE_URL}/products/${productId}`;

  try {
    const res = await fetch(url);

    // We read the JSON body, which will be EITHER the success data
    // OR the "Product not found" error object.
    const responseBody = (await res.json()) as ApiResponse<Product>;

    // We return whatever the server sent. Simple and clean.
    return responseBody;
  } catch (error) {
    // The safety net for network disasters is the same.
    console.error(
      `A network disaster occurred for product ${productId}:`,
      error
    );
    return {
      success: false,
      message: "Could not connect to the server.",
      errors: null,
    };
  }
}
