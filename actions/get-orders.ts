"use server";

import { getAuthToken } from "@/lib/auth-cookies";
import { API_BASE_URL } from "@/types";
import { OrderResponseParams, PaginatedOrderResponse } from "@/types/order";

export async function getOrders(
  params: OrderResponseParams
): Promise<PaginatedOrderResponse> {

  const accessToken = await getAuthToken();
  
  const query = new URLSearchParams();

  if (params.page) query.append("page", params.page.toString());
  if (params.pageSize) query.append("pageSize", params.pageSize.toString());
  if (params.sortBy) query.append("sortBy", params.sortBy);
  if (params.sortDirection) query.append("sortDirection", params.sortDirection);
  if (params.status) query.append("status", params.status);

  const url = `${API_BASE_URL}/orders?${query.toString()}`;
  console.log(`Fetching from: ${url}`); // Good for debugging

  try {
    const res = await fetch(url, {
      // Use Next.js caching for performance
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseBody = (await res.json()) as PaginatedOrderResponse;

    return responseBody;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    // In a real app, you might want a more robust error state
    // For now, we return a default "empty" response
    return {
      success: false,
      message: "Could not connect to the server.",
      errors: null,
    };
  }
}
