import { API_BASE_URL, ApiResponse } from "@/types";
import {
  PaginatedProductsResponse,
  Product,
  ProductResponseParams,
} from "@/types/products";

export async function getProducts(
  params: ProductResponseParams
): Promise<PaginatedProductsResponse> {

  

  const query = new URLSearchParams();

  // Append parameters to the query string if they exist
  if (params.page) query.append("page", params.page.toString());
  if (params.pageSize) query.append("pageSize", params.pageSize.toString());
  if (params.sortBy) query.append("sortBy", params.sortBy);
  if (params.sortDirection) query.append("sortDirection", params.sortDirection);
  if (params.searchTerm) query.append("searchTerm", params.searchTerm);
  if (params.category) query.append("category", params.category);
  if (params.minPrice) query.append("minPrice", params.minPrice.toString());
  if (params.maxPrice) query.append("maxPrice", params.maxPrice.toString());

  const url = `${API_BASE_URL}/products?${query.toString()}`;
  console.log(`Fetching from: ${url}`); // Good for debugging

  try {
    const res = await fetch(url, {
      // Use Next.js caching for performance
      next: { revalidate: 3600 }, // Re-fetch data at most once per hour
    });

    const responseBody = (await res.json()) as PaginatedProductsResponse;

    return responseBody;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // In a real app, you might want a more robust error state
    // For now, we return a default "empty" response
    return {
      success: false,
      message: "Could not connect to the server.",
      errors: null,
    };
  }
}
